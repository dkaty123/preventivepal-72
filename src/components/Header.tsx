
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  Menu,
  LogOut,
  User,
  Settings,
  Calendar,
  Shield,
  CheckSquare,
  Heart,
  Brain,
  MessageSquare,
  MapPin,
  Dna,
  Target,
  BellRing,
} from "lucide-react";
import LanguageSelector from "./LanguageSelector";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navigationLinks = [
    { name: "Home", path: "/dashboard", icon: <Home className="mr-2 h-4 w-4" /> },
    { name: "Calendar", path: "/calendar", icon: <Calendar className="mr-2 h-4 w-4" /> },
    { name: "Benefits", path: "/benefits", icon: <Shield className="mr-2 h-4 w-4" /> },
    { name: "Recommended", path: "/recommended", icon: <CheckSquare className="mr-2 h-4 w-4" /> },
    { name: "Health Profile", path: "/profile", icon: <Heart className="mr-2 h-4 w-4" /> },
    { name: "Health Insights", path: "/health-insights", icon: <Brain className="mr-2 h-4 w-4" /> },
    { name: "Symptom Checker", path: "/symptom-checker", icon: <MessageSquare className="mr-2 h-4 w-4" /> },
    { name: "Location Alerts", path: "/location-alerts", icon: <MapPin className="mr-2 h-4 w-4" /> },
    { name: "Genetic Risk", path: "/genetic-risk", icon: <Dna className="mr-2 h-4 w-4" /> },
    { name: "Health Goals", path: "/health-goals", icon: <Target className="mr-2 h-4 w-4" /> },
    { name: "Smart Reminders", path: "/reminders", icon: <BellRing className="mr-2 h-4 w-4" /> },
  ];

  return (
    <header className="bg-background border-b sticky top-0 z-40">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center mr-6">
            <Heart className="h-6 w-6 text-primary mr-2" />
            <span className="font-bold text-xl text-primary">PreventivePal</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navigationLinks.slice(0, 5).map((link) => (
              <Button
                key={link.path}
                variant={isActive(link.path) ? "default" : "ghost"}
                asChild
                size="sm"
              >
                <Link to={link.path} className="flex items-center">
                  {link.icon}
                  {link.name}
                </Link>
              </Button>
            ))}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  More <span className="sr-only">More menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {navigationLinks.slice(5).map((link) => (
                  <DropdownMenuItem key={link.path} asChild>
                    <Link to={link.path} className="flex items-center cursor-pointer w-full">
                      {link.icon}
                      {link.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSelector variant="default" />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholders/user.jpg" alt="User avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/login" className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader className="mb-4">
                <SheetTitle>PreventivePal</SheetTitle>
                <SheetDescription>
                  Your preventative healthcare companion
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col space-y-2">
                {navigationLinks.map((link) => (
                  <SheetClose key={link.path} asChild>
                    <Button
                      variant={isActive(link.path) ? "default" : "ghost"}
                      asChild
                      className="justify-start"
                    >
                      <Link to={link.path} className="flex items-center">
                        {link.icon}
                        {link.name}
                      </Link>
                    </Button>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    className="justify-start text-destructive"
                    asChild
                  >
                    <Link to="/login" className="flex items-center">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
