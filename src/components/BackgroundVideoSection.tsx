
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const BackgroundVideoSection = () => {
  return (
    <section className="relative overflow-hidden py-20">
      {/* Video Background with Overlay */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-brand-800/70 z-10"></div>
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-using-a-medical-app-8799/1080p.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="container relative z-20 px-4 md:px-6 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-1 mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="flex items-center gap-1.5 px-4 py-1 text-sm font-medium text-white">
              <Shield className="h-4 w-4" />
              Your booking data is secure and private
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight animate-fade-in">
            Take control of your appointments with ease
          </h2>

          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto animate-fade-in [animation-delay:0.2s]">
            Bookd helps you stay on top of your schedule with personalized reminders, 
            intelligent recommendations, and seamless booking management.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in [animation-delay:0.4s]">
            <Button
              size="lg"
              className="bg-white text-brand-700 hover:bg-white/90 shadow-lg group"
              asChild
            >
              <Link to="/dashboard" className="flex items-center gap-2">
                See how it works
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
              asChild
            >
              <Link to="/login?tab=register" className="flex items-center gap-2">
                Start free trial
                <CheckCircle className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BackgroundVideoSection;
