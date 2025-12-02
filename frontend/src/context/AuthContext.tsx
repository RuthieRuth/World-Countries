import { Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import {supabase} from "../config/supabase";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize: Get current session
    const initializeAuth = async () => {
      // First, check if there's a hash (OAuth callback)
      const hash = window.location.hash;
      
      if (hash && hash.includes('access_token')) {
        console.log('Hash fragments detected, manually processing...');
        
        try {
          // Parse hash fragments
          const hashParams = new URLSearchParams(hash.substring(1));
          const accessToken = hashParams.get('access_token');
          const refreshToken = hashParams.get('refresh_token');
          
          if (accessToken && refreshToken) {
            console.log('Found tokens in hash, setting session...');
            
            // Set the session using Supabase's method
            const { data, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken
            });
            
            if (error) {
              console.error('Error setting session from hash:', error);
              // If setSession fails, try getSession in case Supabase processed it anyway
              const { data: { session } } = await supabase.auth.getSession();
              if (session) {
                console.log('Session found via getSession after setSession error');
                setSession(session);
                setUser(session.user ?? null);
                window.history.replaceState(null, '', window.location.pathname);
                setLoading(false);
                return;
              }
            } else if (data?.session) {
              console.log('Session set successfully from hash!', data.session);
              setSession(data.session);
              setUser(data.user);
              window.history.replaceState(null, '', window.location.pathname);
              setLoading(false);
              return;
            }
          } else {
            console.warn('Missing tokens in hash:', { accessToken: !!accessToken, refreshToken: !!refreshToken });
          }
        } catch (error) {
          console.error('Error parsing hash:', error);
        }
      }
      
      // Fallback: Try to get session normally
      const { data: { session }, error } = await supabase.auth.getSession();
      console.log('Initial session:', session);
      console.log('Session error:', error);
      
      if (session) {
        setSession(session);
        setUser(session.user ?? null);
        // Clear hash if it exists
        if (hash) {
          window.history.replaceState(null, '', window.location.pathname);
        }
      }
      setLoading(false);
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change event:', event);
      console.log('Session from onAuthStateChange:', session);
      
      // Handle SIGNED_IN event explicitly
      if (event === 'SIGNED_IN' && session) {
        // Clear hash fragments from URL after successful sign in
        if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname);
        }
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    session,
    user,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}