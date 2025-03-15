
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MenuIcon, X, Bell, User, Calendar, BarChart, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check authentication state from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("auth") === "true");
  
  // Update auth state when localStorage changes
  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(localStorage.getItem("auth") === "true");
    };
    
    // Check initially
    checkAuth();
    
    // Listen for storage events (if user logs in/out in another tab)
    window.addEventListener("storage", checkAuth);
    
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("auth");
    setIsLoggedIn(false);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="font-bold text-primary-foreground">P</span>
            </div>
            <span className="font-semibold text-xl hidden sm:inline-block">PreventivePal</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground/80 hover:text-foreground transition">Home</Link>
          {isLoggedIn && (
            <>
              <Link to="/dashboard" className="text-foreground/80 hover:text-foreground transition">Dashboard</Link>
              <Link to="/profile" className="text-foreground/80 hover:text-foreground transition">Profile</Link>
            </>
          )}
          <div className="flex items-center gap-4 ml-4">
            {isLoggedIn ? (
              <>
                <Button variant="outline" size="sm" className="gap-1" onClick={() => navigate('/profile')}>
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">My Account</span>
                </Button>
                <Button size="sm" onClick={handleLogout}>Log out</Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => navigate('/login')}>Log in</Button>
                <Button size="sm" onClick={() => navigate('/login?tab=register')}>Sign up</Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile menu */}
        {isOpen && (
          <div className="fixed inset-0 top-16 z-50 bg-background md:hidden">
            <nav className="flex flex-col gap-6 p-6">
              <Link 
                to="/" 
                className="text-foreground/80 hover:text-foreground transition text-lg py-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              {isLoggedIn && (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-foreground/80 hover:text-foreground transition text-lg py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/profile" 
                    className="text-foreground/80 hover:text-foreground transition text-lg py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                </>
              )}
              <div className="flex flex-col gap-4 mt-4">
                {isLoggedIn ? (
                  <>
                    <Button variant="outline" size="lg" onClick={() => { setIsOpen(false); navigate('/profile'); }}>
                      <User className="h-4 w-4 mr-2" />
                      My Account
                    </Button>
                    <Button size="lg" onClick={() => { setIsOpen(false); handleLogout(); }}>
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="lg" onClick={() => { setIsOpen(false); navigate('/login'); }}>
                      Log in
                    </Button>
                    <Button size="lg" onClick={() => { setIsOpen(false); navigate('/login?tab=register'); }}>
                      Sign up
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
