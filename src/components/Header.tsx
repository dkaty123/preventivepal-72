
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clipboard, User, Bell, Shield, Menu, Heart, LogOut, Brain, MessageSquareQuestion, ChevronDown } from "lucide-react";
import LanguageSelector from "./LanguageSelector";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, we would handle actual logout logic here
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-brand-500" />
            <span className="text-xl font-bold tracking-tight">HealthTrack</span>
          </Link>

          {isLoggedIn && (
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/dashboard"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Dashboard
              </Link>
              <Link
                to="/calendar"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Calendar
              </Link>
              <Link
                to="/benefits"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Benefits
              </Link>
              <Link
                to="/recommended"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Recommended
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1 p-0 font-medium">
                    AI Features
                    <ChevronDown className="h-4 w-4 opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/health-insights" className="cursor-pointer flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      Health Insights
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/symptom-checker" className="cursor-pointer flex items-center gap-2">
                      <MessageSquareQuestion className="h-4 w-4" />
                      Symptom Checker
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <LanguageSelector variant="button" />
              
              <div className="hidden md:flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" aria-label="Notifications">
                      <Bell className="h-[1.2rem] w-[1.2rem]" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Annual checkup due in 2 weeks</DropdownMenuItem>
                    <DropdownMenuItem>New insurance benefits available</DropdownMenuItem>
                    <DropdownMenuItem>Upcoming appointment tomorrow</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View all notifications</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 pl-2 pr-3"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">John Doe</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="cursor-pointer flex items-center gap-2">
                        <Clipboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/calendar" className="cursor-pointer flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Calendar
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/benefits" className="cursor-pointer flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Benefits
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="md:hidden"
                    aria-label="Menu"
                  >
                    <Menu className="h-[1.2rem] w-[1.2rem]" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="grid gap-4 py-4">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">John Doe</div>
                        <div className="text-sm text-muted-foreground">
                          john.doe@example.com
                        </div>
                      </div>
                    </div>
                    <nav className="grid gap-2">
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                      >
                        <Clipboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </Link>
                      <Link
                        to="/calendar"
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                      >
                        <Calendar className="h-4 w-4" />
                        Calendar
                      </Link>
                      <Link
                        to="/benefits"
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                      >
                        <Shield className="h-4 w-4" />
                        Benefits
                      </Link>
                      <Link
                        to="/recommended"
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                      >
                        <Heart className="h-4 w-4" />
                        Recommended
                      </Link>
                      <Link
                        to="/health-insights"
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                      >
                        <Brain className="h-4 w-4" />
                        Health Insights
                      </Link>
                      <Link
                        to="/symptom-checker"
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                      >
                        <MessageSquareQuestion className="h-4 w-4" />
                        Symptom Checker
                      </Link>
                      <Button 
                        variant="ghost" 
                        onClick={handleLogout}
                        className="flex items-center justify-start gap-2 text-sm font-medium text-red-600 transition-colors hover:text-red-700 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Button>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <LanguageSelector variant="button" />
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register" className="hidden sm:inline-block">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
