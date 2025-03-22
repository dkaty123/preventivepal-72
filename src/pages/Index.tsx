
import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Clock, CalendarCheck, Sparkles, Award, Check } from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create your health profile",
      description: "Enter your basic health information and preferences to get personalized recommendations.",
      icon: <Clock className="h-6 w-6 text-brand-500" />
    },
    {
      number: "02",
      title: "Set up your reminders",
      description: "Choose how and when you'd like to be reminded about important health check-ups.",
      icon: <CalendarCheck className="h-6 w-6 text-brand-500" />
    },
    {
      number: "03",
      title: "Track your progress",
      description: "Monitor your preventative health journey and never miss an important appointment.",
      icon: <Sparkles className="h-6 w-6 text-brand-500" />
    },
    {
      number: "04",
      title: "Optimize your benefits",
      description: "Make the most of your insurance benefits before they expire with smart recommendations.",
      icon: <Award className="h-6 w-6 text-brand-500" />
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-50 rounded-bl-full opacity-70 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-brand-50 rounded-tr-full opacity-70 -z-10"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-1 mb-4 rounded-full bg-brand-50 border border-brand-100">
            <span className="px-3 py-0.5 text-sm font-medium text-brand-700 bg-white rounded-full shadow-sm">
              Simple Process
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-700 to-brand-500">
            How PreventivePal Works
          </h2>
          <p className="text-xl text-muted-foreground">
            Taking control of your preventative healthcare has never been easier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-brand-100 blur-md transform scale-150"></div>
                  <div className="relative z-10 w-16 h-16 flex items-center justify-center bg-white rounded-full border border-brand-200 shadow-md mb-6">
                    {step.icon}
                  </div>
                </div>
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-3xl font-bold text-brand-200 -z-10">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-12 h-0.5 bg-brand-200 transform translate-x-[-8px]">
                  <div className="absolute right-0 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-brand-300 rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button size="lg" variant="outline" className="group" asChild>
            <Link to="/faq" className="flex items-center gap-2">
              Learn more about our process
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  return (
    <section className="py-16 bg-brand-500 text-white">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">15k+</div>
            <div className="text-brand-100">Active Users</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">98%</div>
            <div className="text-brand-100">User Satisfaction</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">300+</div>
            <div className="text-brand-100">Health Providers</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">$500</div>
            <div className="text-brand-100">Avg. Annual Savings</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-transparent -z-10"></div>
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to take control of your health?</h2>
              <p className="text-muted-foreground mb-6">
                Join thousands of users who are already benefiting from PreventivePal's smart reminders and health tracking.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center">
                    <ChevronRight className="h-3 w-3" />
                  </div>
                  <p>Personalized preventative care schedules</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center">
                    <ChevronRight className="h-3 w-3" />
                  </div>
                  <p>Smart reminders that fit your lifestyle</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center">
                    <ChevronRight className="h-3 w-3" />
                  </div>
                  <p>Insurance benefit optimization</p>
                </div>
              </div>
              <div className="mt-8">
                <Button size="lg" className="bg-brand-600 hover:bg-brand-700 text-white shadow-md" asChild>
                  <Link to="/login?tab=register">Get started for free</Link>
                </Button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-brand-400 to-brand-600 p-8 md:p-12 flex items-center">
              <div className="text-white">
                <div className="text-4xl font-bold mb-4">30-Day Free Trial</div>
                <p className="text-brand-100 mb-6">
                  Try all premium features risk-free. No credit card required.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-white/20 p-1">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>Full access to all premium features</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-white/20 p-1">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>Family member profiles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-white/20 p-1">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>Insurance benefit tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-white/20 p-1">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>Advanced health analytics</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Stats />
        <HowItWorks />
        <Features />
        <TestimonialCarousel />
        <CTASection />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
