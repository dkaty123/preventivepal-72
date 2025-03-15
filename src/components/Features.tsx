
import { 
  CalendarCheck, 
  MessageCircle, 
  BarChart, 
  CreditCard, 
  Shield, 
  Heart, 
  BellRing, 
  RefreshCw 
} from "lucide-react";

const features = [
  {
    icon: <BellRing className="h-10 w-10 text-brand-500" />,
    title: "Smart Reminders",
    description: "Receive personalized notifications for check-ups, screenings, and preventive care based on your health profile."
  },
  {
    icon: <CalendarCheck className="h-10 w-10 text-brand-500" />,
    title: "Appointment Tracking",
    description: "Keep all your health appointments organized in one place with automatic calendar integration."
  },
  {
    icon: <CreditCard className="h-10 w-10 text-brand-500" />,
    title: "Insurance Optimization",
    description: "Never waste your benefits again. We'll help you maximize your insurance coverage before deadlines."
  },
  {
    icon: <MessageCircle className="h-10 w-10 text-brand-500" />,
    title: "Customizable Notifications",
    description: "Choose how you want to be reminded - email, text, or calendar alerts with the frequency that works for you."
  },
  {
    icon: <BarChart className="h-10 w-10 text-brand-500" />,
    title: "Health Analytics",
    description: "Gain insights into your preventative care history and track your progress over time."
  },
  {
    icon: <RefreshCw className="h-10 w-10 text-brand-500" />,
    title: "Continuous Learning",
    description: "Our system improves recommendations based on user feedback and healthcare guidelines."
  },
  {
    icon: <Shield className="h-10 w-10 text-brand-500" />,
    title: "Privacy Focused",
    description: "Your health data is encrypted and secure. We never share your information without permission."
  },
  {
    icon: <Heart className="h-10 w-10 text-brand-500" />,
    title: "Healthier Living",
    description: "Take proactive steps towards better health with guidance tailored to your personal needs."
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need for preventative healthcare</h2>
          <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
            PreventivePal helps you stay on top of your health with smart features designed around your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">
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

export default Features;
