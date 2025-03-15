
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MenuIcon, X, Bell, User, Calendar, BarChart, Settings, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
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
    
    // Check auth status whenever location changes
    checkAuth();
    
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, [location]);
  
  const handleLogout = () => {
    localStorage.removeItem("auth");
    setIsLoggedIn(false);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    
    navigate("/");
  };

  const isActive = (path: string) => {
    return location.pathname === path 
      ? "font-medium text-primary hover:text-primary/90 transition border-b-2 border-primary pb-1" 
      : "text-foreground/80 hover:text-foreground transition";
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="font-bold text-primary-foreground">P</span>
            </div>
            <span className="font-semibold text-xl hidden sm:inline-block bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-500">PreventivePal</span>
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
          <Link to="/" className={isActive("/")}>Home</Link>
          <Link to="/faq" className={isActive("/faq")}>FAQ</Link>
          {isLoggedIn && (
            <>
              <Link to="/dashboard" className={isActive("/dashboard")}>Dashboard</Link>
              <Link to="/profile" className={isActive("/profile")}>Profile</Link>
            </>
          )}
          <div className="flex items-center gap-4 ml-4">
            {isLoggedIn ? (
              <>
                <Button variant="outline" size="sm" className="gap-1 border-brand-200 hover:bg-brand-50" onClick={() => navigate('/profile')}>
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">My Account</span>
                </Button>
                <Button size="sm" className="bg-brand-600 hover:bg-brand-700 text-white" onClick={handleLogout}>Log out</Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" className="border-brand-200 hover:bg-brand-50" onClick={() => navigate('/login')}>Log in</Button>
                <Button size="sm" className="bg-brand-600 hover:bg-brand-700 text-white" onClick={() => navigate('/login?tab=register')}>Sign up</Button>
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
                className={`text-lg py-2 ${isActive("/")}`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/faq" 
                className={`text-lg py-2 ${isActive("/faq")}`}
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>
              {isLoggedIn && (
                <>
                  <Link 
                    to="/dashboard" 
                    className={`text-lg py-2 ${isActive("/dashboard")}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/profile" 
                    className={`text-lg py-2 ${isActive("/profile")}`}
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
                    <Button size="lg" className="bg-brand-600 hover:bg-brand-700 text-white" onClick={() => { setIsOpen(false); handleLogout(); }}>
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="lg" className="border-brand-200 hover:bg-brand-50" onClick={() => { setIsOpen(false); navigate('/login'); }}>
                      Log in
                    </Button>
                    <Button size="lg" className="bg-brand-600 hover:bg-brand-700 text-white" onClick={() => { setIsOpen(false); navigate('/login?tab=register'); }}>
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
