
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Bell, Menu, MessageSquare, Calendar, ChevronDown, CircleUser, LogOut, Settings, Shield, Stethoscope, Brain, Activity, BellRing, MapPin, Dna, Target } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

const Header = () => {
  const [isLoggedIn] = useState(true);
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <div className="px-7">
              <Link to="/" className="flex items-center">
                <Shield className="h-6 w-6 text-brand-500" />
                <span className="font-bold ml-2 text-xl">HealthGuard</span>
              </Link>
              <Separator className="my-4" />
            </div>
            <div className="flex flex-col gap-2 px-2">
              <Link to="/dashboard">
                <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
              </Link>
              <Link to="/calendar">
                <Button variant="ghost" className="w-full justify-start">Appointments</Button>
              </Link>
              <Link to="/recommended">
                <Button variant="ghost" className="w-full justify-start">Checkups</Button>
              </Link>
              <Link to="/preventative-care">
                <Button variant="ghost" className="w-full justify-start">Preventative Care</Button>
              </Link>
              <Link to="/health-insights">
                <Button variant="ghost" className="w-full justify-start">Health Insights</Button>
              </Link>
              <Link to="/benefits">
                <Button variant="ghost" className="w-full justify-start">Insurance Benefits</Button>
              </Link>
              <Link to="/symptom-checker">
                <Button variant="ghost" className="w-full justify-start">Symptom Checker</Button>
              </Link>
              <Link to="/location-alerts">
                <Button variant="ghost" className="w-full justify-start">Health Alerts</Button>
              </Link>
              <Link to="/genetic-risk">
                <Button variant="ghost" className="w-full justify-start">Genetic Risk</Button>
              </Link>
              <Link to="/health-goals">
                <Button variant="ghost" className="w-full justify-start">Health Goals</Button>
              </Link>
              <Link to="/reminders">
                <Button variant="ghost" className="w-full justify-start">Reminders</Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" className="w-full justify-start">Profile</Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
        
        {/* Logo */}
        <Link to="/" className="flex items-center mr-4">
          <Shield className="h-6 w-6 text-brand-500" />
          <span className="font-bold ml-2 text-lg hidden md:inline-block">HealthGuard</span>
        </Link>
        
        {/* Desktop Navigation */}
        {isLoggedIn && (
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Button variant={location.pathname === "/dashboard" ? "default" : "ghost"} size="sm" asChild>
              <Link to="/dashboard">Dashboard</Link>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Appointments</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link to="/calendar" className="flex items-center gap-2 cursor-pointer">
                    <Calendar className="h-4 w-4" />
                    <span>Calendar</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/recommended" className="flex items-center gap-2 cursor-pointer">
                    <Stethoscope className="h-4 w-4" />
                    <span>Recommended Checkups</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/preventative-care" className="flex items-center gap-2 cursor-pointer">
                    <Shield className="h-4 w-4" />
                    <span>Preventative Care Plan</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <Brain className="h-4 w-4" />
                  <span>AI Health</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link to="/health-insights" className="flex items-center gap-2 cursor-pointer">
                    <Brain className="h-4 w-4" />
                    <span>Health Insights</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/symptom-checker" className="flex items-center gap-2 cursor-pointer">
                    <MessageSquare className="h-4 w-4" />
                    <span>Symptom Checker</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <Activity className="h-4 w-4" />
                  <span>Features</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link to="/location-alerts" className="flex items-center gap-2 cursor-pointer">
                    <MapPin className="h-4 w-4" />
                    <span>Location Alerts</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/genetic-risk" className="flex items-center gap-2 cursor-pointer">
                    <Dna className="h-4 w-4" />
                    <span>Genetic Risk</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/health-goals" className="flex items-center gap-2 cursor-pointer">
                    <Target className="h-4 w-4" />
                    <span>Health Goals</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/reminders" className="flex items-center gap-2 cursor-pointer">
                    <BellRing className="h-4 w-4" />
                    <span>Reminders</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="ghost" size="sm" asChild>
              <Link to="/benefits" className="flex items-center gap-1">
                <Shield className="h-4 w-4" />
                <span>Benefits</span>
              </Link>
            </Button>
          </nav>
        )}
        
        <div className="flex-1"></div>
        
        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          <LanguageSelector variant="default" />
          
          {isLoggedIn ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 px-1 h-4 w-4 flex items-center justify-center" variant="destructive">3</Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="flex items-center justify-between px-4 py-2 border-b">
                    <h3 className="font-medium">Notifications</h3>
                    <Button variant="ghost" size="sm">Mark all as read</Button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    <div className="px-4 py-3 border-b bg-slate-50">
                      <div className="flex items-start gap-2">
                        <div className="bg-blue-100 rounded-full p-1.5">
                          <Calendar className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">Appointment Reminder</p>
                          <p className="text-xs text-muted-foreground">Your dental cleaning is scheduled for tomorrow at 10:00 AM.</p>
                          <p className="text-xs text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 border-b">
                      <div className="flex items-start gap-2">
                        <div className="bg-red-100 rounded-full p-1.5">
                          <Shield className="h-4 w-4 text-red-600" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">Preventative Care Due</p>
                          <p className="text-xs text-muted-foreground">Your annual physical exam is overdue by 2 weeks.</p>
                          <p className="text-xs text-muted-foreground">1 day ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3">
                      <div className="flex items-start gap-2">
                        <div className="bg-green-100 rounded-full p-1.5">
                          <Brain className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">New Health Insight</p>
                          <p className="text-xs text-muted-foreground">Based on your recent activity, we've generated a new health recommendation.</p>
                          <p className="text-xs text-muted-foreground">3 days ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 border-t">
                    <Button variant="outline" size="sm" className="w-full">View All Notifications</Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline-block">Jane Doe</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                      <CircleUser className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center gap-2 cursor-pointer">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/login" className="flex items-center gap-2 cursor-pointer">
                      <LogOut className="h-4 w-4" />
                      <span>Log out</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button asChild>
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
