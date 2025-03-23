
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarCheck, Bell, Activity, Shield, Heart, UserCheck, CheckCircle, ChevronRight, BarChart, PieChart, TrendingUp } from "lucide-react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

const Hero = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background elements with parallax effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50 to-transparent -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-100 rounded-full blur-3xl opacity-30 -z-10 animate-pulse-gentle" style={{animationDuration: '15s'}} />
      <div className="absolute top-40 right-10 w-24 h-24 bg-brand-200 rounded-full blur-xl opacity-60 animate-pulse-gentle -z-10" />
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-brand-300 rounded-full blur-xl opacity-40 animate-pulse-gentle [animation-delay:1.5s] -z-10" />
      
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-600 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm hover-lift">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-500">Now available in Canada</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Your personal <span className="relative">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-brand-500 to-brand-700">health guardian</span>
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-brand-200 opacity-50 rounded-lg -z-0"></span>
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-[600px] leading-relaxed">
              Never miss important check-ups again. PreventivePal reminds you of essential health screenings and helps you maximize your insurance benefits.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="relative overflow-hidden bg-brand-600 hover:bg-brand-700 text-white shadow-lg group pulse-button" asChild>
                <Link to="/login?tab=register">
                  <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full bg-brand-700 group-hover:translate-x-0"></span>
                  <span className="relative flex items-center gap-2">
                    Get started for free
                    <CheckCircle className="h-4 w-4" />
                  </span>
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-brand-200 hover:bg-brand-50 shadow-sm hover-glow" asChild>
                <Link to="/login">Sign in to account</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
              {[
                { icon: <CalendarCheck className="h-4 w-4" />, text: "Smart reminders" },
                { icon: <Bell className="h-4 w-4" />, text: "Custom alerts" },
                { icon: <Activity className="h-4 w-4" />, text: "Health insights" },
                { icon: <Shield className="h-4 w-4" />, text: "Private & secure" },
                { icon: <Heart className="h-4 w-4" />, text: "Wellness tracking" },
                { icon: <UserCheck className="h-4 w-4" />, text: "Family accounts" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 rounded-lg border border-brand-100 p-3 bg-white shadow-sm hover-lift">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-50 text-brand-500">
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative w-full max-w-[500px] mx-auto lg:mx-0 animate-slide-in-right">
            {/* Interactive Dashboard Preview */}
            <div className="relative z-10 bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-brand-700 to-brand-600 p-4 text-white flex justify-between items-center">
                <h3 className="font-medium">Health Dashboard</h3>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/20"></div>
                  <div className="w-3 h-3 rounded-full bg-white/20"></div>
                  <div className="w-3 h-3 rounded-full bg-white/20"></div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="bg-brand-50 rounded-lg p-3 hover-lift cursor-pointer">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-medium">Check-ups</h4>
                          <BarChart className="h-4 w-4 text-brand-500" />
                        </div>
                        <div className="h-2 bg-brand-100 rounded-full">
                          <div className="h-full w-3/4 bg-gradient-to-r from-brand-400 to-brand-500 rounded-full"></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">3 of 4 completed</p>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-medium">Your Annual Check-ups</h4>
                        <p className="text-sm text-muted-foreground">You're doing great! Just one more check-up to complete this year.</p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                  
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="bg-brand-50 rounded-lg p-3 hover-lift cursor-pointer">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-medium">Benefits</h4>
                          <PieChart className="h-4 w-4 text-brand-500" />
                        </div>
                        <div className="h-2 bg-brand-100 rounded-full">
                          <div className="h-full w-1/3 bg-gradient-to-r from-brand-400 to-brand-500 rounded-full"></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">$450 of $1,200 used</p>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-medium">Insurance Benefits</h4>
                        <p className="text-sm text-muted-foreground">You still have $750 in unused benefits that expire this year!</p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
                
                <div className="bg-secondary/50 rounded-lg p-3 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium">Upcoming Appointments</h4>
                    <TrendingUp className="h-4 w-4 text-brand-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-health-check"></div>
                      <span>Annual Physical - May 15</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-health-warning"></div>
                      <span>Dental Cleaning - Jun 22</span>
                    </div>
                  </div>
                </div>
                
                <img 
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=800&h=300" 
                  alt="Person using PreventivePal app" 
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-brand-100 rounded-xl rotate-12 shadow-inner z-0 animate-float"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-brand-200 rounded-xl -rotate-12 shadow-inner z-0 animate-float [animation-delay:1s]"></div>
          </div>
        </div>
        
        <div className="mt-20 text-center animate-fade-in [animation-delay:0.3s]">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Trusted by healthcare professionals</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="relative h-12 w-32 hover-lift">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-100 to-brand-200 rounded-lg blur-sm"></div>
              <div className="relative flex items-center justify-center h-full bg-white/90 backdrop-blur-sm rounded-lg border border-brand-100 px-4 py-2">
                <span className="font-bold text-brand-800">MediTrack</span>
              </div>
            </div>
            <div className="relative h-12 w-40 hover-lift">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-100 to-brand-200 rounded-lg blur-sm"></div>
              <div className="relative flex items-center justify-center h-full bg-white/90 backdrop-blur-sm rounded-lg border border-brand-100 px-4 py-2">
                <span className="font-bold text-brand-800">HealthGuard Pro</span>
              </div>
            </div>
            <div className="relative h-12 w-36 hover-lift">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-100 to-brand-200 rounded-lg blur-sm"></div>
              <div className="relative flex items-center justify-center h-full bg-white/90 backdrop-blur-sm rounded-lg border border-brand-100 px-4 py-2">
                <span className="font-bold text-brand-800">MediSolutions</span>
              </div>
            </div>
            <div className="relative h-12 w-32 hover-lift">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-100 to-brand-200 rounded-lg blur-sm"></div>
              <div className="relative flex items-center justify-center h-full bg-white/90 backdrop-blur-sm rounded-lg border border-brand-100 px-4 py-2">
                <span className="font-bold text-brand-800">WellSync</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
