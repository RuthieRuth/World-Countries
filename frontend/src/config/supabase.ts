// This runs superbase connection. Also attached the open weather api key to the export

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const weatherAPI =import.meta.env.VITE_OPEN_WEATHER_API;
const googleMapAPI = import.meta.env.VITE_GOOGLE_MAP_API;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

// Debug: Log Supabase URL and check anon key format
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key exists:', !!supabaseAnonKey);
console.log('Supabase Anon Key starts with:', supabaseAnonKey?.substring(0, 10));
// Anon keys should start with "eyJ" (JWT format)
if (supabaseAnonKey && !supabaseAnonKey.startsWith('eyJ')) {
  console.warn('⚠️ WARNING: Anon key does not start with "eyJ" - this might be incorrect!');
  console.warn('Expected format: eyJ... (JWT token)');
  console.warn('Your key starts with:', supabaseAnonKey.substring(0, 5));
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    // Try without PKCE first - PKCE requires specific redirect URL configuration
    // flowType: 'pkce'
  }
});
export { weatherAPI , googleMapAPI };