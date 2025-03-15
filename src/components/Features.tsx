
import { 
  CalendarCheck, 
  MessageCircle, 
  BarChart, 
  CreditCard, 
  Shield, 
  Heart, 
  BellRing, 
  RefreshCw,
  Zap,
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <BellRing className="h-10 w-10 text-brand-500" />,
    title: "Smart Reminders",
    description: "Receive personalized notifications for check-ups, screenings, and preventive care based on your health profile.",
    color: "from-purple-400 to-purple-500"
  },
  {
    icon: <CalendarCheck className="h-10 w-10 text-brand-500" />,
    title: "Appointment Tracking",
    description: "Keep all your health appointments organized in one place with automatic calendar integration.",
    color: "from-teal-400 to-teal-500"
  },
  {
    icon: <CreditCard className="h-10 w-10 text-brand-500" />,
    title: "Insurance Optimization",
    description: "Never waste your benefits again. We'll help you maximize your insurance coverage before deadlines.",
    color: "from-blue-400 to-blue-500"
  },
  {
    icon: <MessageCircle className="h-10 w-10 text-brand-500" />,
    title: "Customizable Notifications",
    description: "Choose how you want to be reminded - email, text, or calendar alerts with the frequency that works for you.",
    color: "from-amber-400 to-amber-500"
  },
  {
    icon: <BarChart className="h-10 w-10 text-brand-500" />,
    title: "Health Analytics",
    description: "Gain insights into your preventative care history and track your progress over time.",
    color: "from-cyan-400 to-cyan-500"
  },
  {
    icon: <RefreshCw className="h-10 w-10 text-brand-500" />,
    title: "Continuous Learning",
    description: "Our system improves recommendations based on user feedback and healthcare guidelines.",
    color: "from-pink-400 to-pink-500"
  },
  {
    icon: <Shield className="h-10 w-10 text-brand-500" />,
    title: "Privacy Focused",
    description: "Your health data is encrypted and secure. We never share your information without permission.",
    color: "from-lime-400 to-lime-500"
  },
  {
    icon: <Heart className="h-10 w-10 text-brand-500" />,
    title: "Healthier Living",
    description: "Take proactive steps towards better health with guidance tailored to your personal needs.",
    color: "from-rose-400 to-rose-500"
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-1 mb-4 rounded-full bg-brand-50 border border-brand-100">
            <span className="px-3 py-0.5 text-sm font-medium text-brand-700 bg-white rounded-full shadow-sm">
              Powerful Features
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-700 to-brand-500">
            Everything you need for preventative healthcare
          </h2>
          <p className="text-xl text-muted-foreground">
            PreventivePal helps you stay on top of your health with smart features designed around your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-white p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px] relative overflow-hidden"
            >
              <div className="mb-4 relative z-10">
                <div className={`p-3 inline-flex rounded-lg bg-gradient-to-br ${feature.color} shadow-md`}>
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 relative z-10">{feature.title}</h3>
              <p className="text-muted-foreground relative z-10">{feature.description}</p>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-brand-50 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <div className="relative max-w-xl border border-brand-100 rounded-2xl p-8 shadow-lg bg-white">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-brand-500 text-white rounded-full p-4">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Ready to take control of your preventative healthcare?</h3>
            <p className="text-muted-foreground mb-6">Join thousands of users who are already benefiting from our powerful health management platform.</p>
            <Button size="lg" className="bg-brand-600 hover:bg-brand-700 text-white" asChild>
              <Link to="/login?tab=register" className="flex items-center gap-2">
                Get started today
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
