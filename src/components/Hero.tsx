
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarCheck, Bell, Activity, Shield, Heart, UserCheck } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50 to-transparent -z-10" />
      <div className="absolute inset-y-0 right-0 -z-10 w-full bg-[url('/placeholder.svg')] bg-no-repeat bg-right-top bg-contain opacity-10" />
      
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-600 px-4 py-1.5 rounded-full text-sm font-medium">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </div>
              Now available in Canada
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Your personal <span className="text-brand-500">health guardian</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-[600px]">
              Never miss important check-ups again. PreventivePal reminds you of essential health screenings and helps you maximize your insurance benefits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-brand-600 hover:bg-brand-700 text-white" asChild>
                <Link to="/login?tab=register">Get started for free</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-brand-200 hover:bg-brand-50" asChild>
                <Link to="/login">Sign in to account</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-2 rounded-lg border p-3 bg-white shadow-sm">
                <CalendarCheck className="h-5 w-5 text-brand-500" />
                <span className="text-sm font-medium">Smart reminders</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border p-3 bg-white shadow-sm">
                <Bell className="h-5 w-5 text-brand-500" />
                <span className="text-sm font-medium">Custom alerts</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border p-3 bg-white shadow-sm">
                <Activity className="h-5 w-5 text-brand-500" />
                <span className="text-sm font-medium">Health insights</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border p-3 bg-white shadow-sm">
                <Shield className="h-5 w-5 text-brand-500" />
                <span className="text-sm font-medium">Private & secure</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border p-3 bg-white shadow-sm">
                <Heart className="h-5 w-5 text-brand-500" />
                <span className="text-sm font-medium">Wellness tracking</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border p-3 bg-white shadow-sm">
                <UserCheck className="h-5 w-5 text-brand-500" />
                <span className="text-sm font-medium">Family accounts</span>
              </div>
            </div>
          </div>
          
          <div className="relative aspect-square w-full max-w-[500px] mx-auto lg:mx-0">
            <div className="absolute w-full h-full rounded-full bg-brand-100 animate-pulse-gentle" />
            <div className="absolute inset-4 rounded-full bg-brand-200 animate-pulse-gentle [animation-delay:0.3s]" />
            <div className="absolute inset-8 rounded-full bg-brand-300 animate-pulse-gentle [animation-delay:0.6s]" />
            <div className="absolute inset-12 rounded-full bg-brand-400 animate-pulse-gentle [animation-delay:0.9s]" />
            <div className="absolute inset-16 rounded-full bg-brand-500 flex items-center justify-center">
              <div className="text-white font-bold text-3xl md:text-4xl">
                PreventivePal
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Trusted by healthcare professionals</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
            <div className="h-8 w-24 bg-muted rounded animate-pulse"></div>
            <div className="h-8 w-32 bg-muted rounded animate-pulse"></div>
            <div className="h-8 w-28 bg-muted rounded animate-pulse"></div>
            <div className="h-8 w-20 bg-muted rounded animate-pulse"></div>
            <div className="h-8 w-36 bg-muted rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
