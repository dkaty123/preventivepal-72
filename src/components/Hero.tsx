
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarCheck, Bell, Activity } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50 to-transparent -z-10" />
      
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-600 px-4 py-1.5 rounded-full text-sm font-medium">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </div>
              Now available in Canada
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Your personal health guardian
            </h1>
            <p className="text-xl text-muted-foreground max-w-[600px]">
              Never miss important check-ups again. PreventivePal reminds you of essential health screenings and helps you maximize your insurance benefits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/dashboard">Get started for free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/">Learn more</Link>
              </Button>
            </div>
            <div className="pt-4 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CalendarCheck className="h-5 w-5 text-brand-500" />
                <span>Smart reminders</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bell className="h-5 w-5 text-brand-500" />
                <span>Customizable alerts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Activity className="h-5 w-5 text-brand-500" />
                <span>Health insights</span>
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
      </div>
    </section>
  );
};

export default Hero;
