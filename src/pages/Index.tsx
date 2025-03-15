
import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "PreventivePal has transformed how I manage my family's healthcare. The reminders are a lifesaver!",
      author: "Sarah J.",
      role: "Mother of three",
      avatar: "https://i.pravatar.cc/100?img=1"
    },
    {
      quote: "As someone who always forgets my annual check-ups, this app has been revolutionary for my health routine.",
      author: "Michael T.",
      role: "Software Developer",
      avatar: "https://i.pravatar.cc/100?img=2"
    },
    {
      quote: "The insurance optimization feature alone has saved me hundreds of dollars this year.",
      author: "Priya K.",
      role: "Financial Advisor",
      avatar: "https://i.pravatar.cc/100?img=3"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What our users are saying</h2>
          <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
            Join thousands of people who have improved their preventative healthcare routine with PreventivePal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 pb-6">
                <div className="mb-4 text-brand-500">
                  <Quote className="h-8 w-8" />
                </div>
                <p className="mb-6 text-lg italic">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="rounded-full overflow-hidden h-12 w-12 mr-4">
                    <img src={testimonial.avatar} alt={testimonial.author} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create your health profile",
      description: "Enter your basic health information and preferences to get personalized recommendations."
    },
    {
      number: "02",
      title: "Set up your reminders",
      description: "Choose how and when you'd like to be reminded about important health check-ups."
    },
    {
      number: "03",
      title: "Track your progress",
      description: "Monitor your preventative health journey and never miss an important appointment."
    },
    {
      number: "04",
      title: "Optimize your benefits",
      description: "Make the most of your insurance benefits before they expire with smart recommendations."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How PreventivePal Works</h2>
          <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
            Taking control of your preventative healthcare has never been easier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-6xl font-bold text-brand-100/70">{step.number}</div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-full w-12 h-0.5 bg-brand-200">
                  <div className="absolute right-0 w-2 h-2 bg-brand-300 rounded-full -mt-0.5"></div>
                </div>
              )}
            </div>
          ))}
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
        <HowItWorks />
        <Features />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
