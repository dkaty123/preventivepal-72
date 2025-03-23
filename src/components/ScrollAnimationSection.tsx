
import React, { useEffect, useRef } from "react";
import { Activity, BarChart4, Brain, CalendarCheck, Clock, FileText, PieChart, Stethoscope } from "lucide-react";

const ScrollAnimationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-scale-in");
            entry.target.classList.add("opacity-100");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".scroll-animation-item");
    elements.forEach((el) => {
      el.classList.add("opacity-0");
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const features = [
    {
      icon: <CalendarCheck className="h-12 w-12 text-brand-500" />,
      title: "Smart Reminders",
      description: "Get timely notifications for your upcoming health check-ups and appointments.",
      delay: 100
    },
    {
      icon: <Stethoscope className="h-12 w-12 text-brand-500" />,
      title: "Preventative Care",
      description: "Stay on top of all your preventative healthcare needs with personalized schedules.",
      delay: 200
    },
    {
      icon: <FileText className="h-12 w-12 text-brand-500" />,
      title: "Insurance Tracking",
      description: "Maximize your insurance benefits before they expire with smart recommendations.",
      delay: 300
    },
    {
      icon: <Activity className="h-12 w-12 text-brand-500" />,
      title: "Health Analytics",
      description: "Visualize your health journey and track progress towards your wellness goals.",
      delay: 400
    },
    {
      icon: <BarChart4 className="h-12 w-12 text-brand-500" />,
      title: "Progress Reports",
      description: "Receive detailed reports on your preventative healthcare journey.",
      delay: 500
    },
    {
      icon: <Brain className="h-12 w-12 text-brand-500" />,
      title: "AI Recommendations",
      description: "Get intelligent suggestions based on your health profile and history.",
      delay: 600
    },
    {
      icon: <Clock className="h-12 w-12 text-brand-500" />,
      title: "Time-Based Alerts",
      description: "Reminders adjust based on your schedule and provider availability.",
      delay: 700
    },
    {
      icon: <PieChart className="h-12 w-12 text-brand-500" />,
      title: "Benefit Optimization",
      description: "Visualize and optimize your healthcare spending and benefits.",
      delay: 800
    }
  ];

  return (
    <section className="py-20 bg-white" ref={sectionRef}>
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-700 to-brand-500">
            Powerful Features for Your Health
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover all the ways PreventivePal can help you take control of your preventative healthcare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="scroll-animation-item p-6 rounded-xl border border-brand-100 bg-white shadow-soft hover-lift transition-all duration-300"
              style={{ transitionDelay: `${feature.delay}ms` }}
            >
              <div className="mb-4 bg-brand-50 w-16 h-16 rounded-lg flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollAnimationSection;
