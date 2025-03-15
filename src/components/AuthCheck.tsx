
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface AuthCheckProps {
  children: React.ReactNode;
  fallback?: string;
}

const AuthCheck = ({ children, fallback = "/login" }: AuthCheckProps) => {
  const { toast } = useToast();
  
  // This is a simplified mock authentication check
  // In a real app, you would check a global auth state
  const isLoggedIn = localStorage.getItem("auth") === "true";
  
  useEffect(() => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication required",
        description: "Please log in to access this page",
        variant: "destructive",
      });
    }
  }, [isLoggedIn, toast]);
  
  if (!isLoggedIn) {
    return <Navigate to={fallback} replace />;
  }
  
  return <>{children}</>;
};

export default AuthCheck;
