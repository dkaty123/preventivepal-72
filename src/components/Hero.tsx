
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarCheck, Bell, Activity, Shield, Heart, UserCheck, CheckCircle } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50 to-transparent -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-100 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute top-40 right-10 w-24 h-24 bg-brand-200 rounded-full blur-xl opacity-60 animate-pulse-gentle -z-10" />
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-brand-300 rounded-full blur-xl opacity-40 animate-pulse-gentle [animation-delay:1.5s] -z-10" />
      
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-600 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">
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
              <Button size="lg" className="relative overflow-hidden bg-brand-600 hover:bg-brand-700 text-white shadow-lg group" asChild>
                <Link to="/login?tab=register">
                  <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full bg-brand-700 group-hover:translate-x-0"></span>
                  <span className="relative flex items-center gap-2">
                    Get started for free
                    <CheckCircle className="h-4 w-4" />
                  </span>
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-brand-200 hover:bg-brand-50 shadow-sm" asChild>
                <Link to="/login">Sign in to account</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-3 rounded-lg border border-brand-100 p-3 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-50 text-brand-500">
                  <CalendarCheck className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">Smart reminders</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-brand-100 p-3 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-50 text-brand-500">
                  <Bell className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">Custom alerts</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-brand-100 p-3 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-50 text-brand-500">
                  <Activity className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">Health insights</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-brand-100 p-3 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-50 text-brand-500">
                  <Shield className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">Private & secure</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-brand-100 p-3 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-50 text-brand-500">
                  <Heart className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">Wellness tracking</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-brand-100 p-3 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-50 text-brand-500">
                  <UserCheck className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">Family accounts</span>
              </div>
            </div>
          </div>
          
          <div className="relative w-full max-w-[500px] mx-auto lg:mx-0">
            <div className="relative z-10 bg-white rounded-2xl shadow-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=800&h=600" 
                alt="Person using PreventivePal app" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-brand-500 rounded-full p-3">
                    <Bell className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-white">
                    <h3 className="font-medium">Upcoming Reminder</h3>
                    <p className="text-sm opacity-90">Annual wellness checkup next week</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-brand-100 rounded-xl rotate-12 shadow-inner z-0"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-brand-200 rounded-xl -rotate-12 shadow-inner z-0"></div>
          </div>
        </div>
        
        <div className="mt-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Trusted by healthcare professionals</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="relative h-12 w-32">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-100 to-brand-200 rounded-lg blur-sm"></div>
              <div className="relative flex items-center justify-center h-full bg-white/90 backdrop-blur-sm rounded-lg border border-brand-100 px-4 py-2">
                <span className="font-bold text-brand-800">MediTrack</span>
              </div>
            </div>
            <div className="relative h-12 w-40">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-100 to-brand-200 rounded-lg blur-sm"></div>
              <div className="relative flex items-center justify-center h-full bg-white/90 backdrop-blur-sm rounded-lg border border-brand-100 px-4 py-2">
                <span className="font-bold text-brand-800">HealthGuard Pro</span>
              </div>
            </div>
            <div className="relative h-12 w-36">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-100 to-brand-200 rounded-lg blur-sm"></div>
              <div className="relative flex items-center justify-center h-full bg-white/90 backdrop-blur-sm rounded-lg border border-brand-100 px-4 py-2">
                <span className="font-bold text-brand-800">MediSolutions</span>
              </div>
            </div>
            <div className="relative h-12 w-32">
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
