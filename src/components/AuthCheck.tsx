
import { Navigate } from "react-router-dom";

interface AuthCheckProps {
  children: React.ReactNode;
  fallback?: string;
}

const AuthCheck = ({ children, fallback = "/login" }: AuthCheckProps) => {
  // This is a simplified mock authentication check
  // In a real app, you would check a global auth state
  const isLoggedIn = localStorage.getItem("auth") === "true";
  
  if (!isLoggedIn) {
    return <Navigate to={fallback} replace />;
  }
  
  return <>{children}</>;
};

export default AuthCheck;
