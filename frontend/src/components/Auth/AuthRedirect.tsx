import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const AuthRedirect = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/protected");
    }
  }, [user, navigate]);

  return null;
};

// force or push the user to be redirected to the protected route if they are already logged in