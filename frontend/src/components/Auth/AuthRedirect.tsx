import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const AuthRedirect = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only redirect from /login page after successful authentication
    // Don't redirect from other pages like home
    if (!loading && user && location.pathname === "/login") {
      try {
        navigate("/protected", { replace: true });
      } catch (error) {
        console.error("Error during redirect:", error);
      }
    }
  }, [user, loading, navigate, location.pathname]);

  return null;
};

// force or push the user to be redirected to the protected route if they are already logged in