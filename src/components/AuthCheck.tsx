
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface AuthCheckProps {
  children: React.ReactNode;
  fallback?: string;
}

const AuthCheck = ({ children, fallback = "/login" }: AuthCheckProps) => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("auth") === "true");
  
  useEffect(() => {
    // Check auth status on mount and when localStorage changes
    const checkAuth = () => {
      const authStatus = localStorage.getItem("auth") === "true";
      setIsLoggedIn(authStatus);
      
      if (!authStatus) {
        toast({
          title: "Authentication required",
          description: "Please log in to access this page",
          variant: "destructive",
        });
      }
    };
    
    checkAuth();
    
    // Listen for storage events (if user logs in/out in another tab)
    window.addEventListener("storage", checkAuth);
    
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, [toast]);
  
  if (!isLoggedIn) {
    return <Navigate to={fallback} replace />;
  }
  
  return <>{children}</>;
};

export default AuthCheck;
