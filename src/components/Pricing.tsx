
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, X } from "lucide-react";

const tiers = [
  {
    name: "Basic",
    price: "Free",
    description: "Essential preventative care tracking for individuals",
    features: [
      "Personal health profile",
      "Basic preventative care reminders",
      "Standard appointment tracking",
      "Email notifications",
      "Limited health analytics",
    ],
    limitations: [
      "No insurance optimization",
      "Limited reminder customization",
      "No premium integrations",
    ],
    buttonText: "Get started",
    buttonVariant: "outline",
    popular: false,
  },
  {
    name: "Premium",
    price: "$5.99",
    period: "per month",
    description: "Advanced health tracking with insurance optimization",
    features: [
      "Everything in Basic",
      "Insurance benefit tracking",
      "Premium reminder system (SMS, email, calendar)",
      "Advanced health analytics dashboard",
      "Customized care recommendations",
      "Family member profiles (up to 5)",
      "Priority support",
    ],
    limitations: [],
    buttonText: "Subscribe now",
    buttonVariant: "default",
    popular: true,
  },
  {
    name: "Business",
    price: "Contact us",
    description: "Employee wellness plans for companies",
    features: [
      "Everything in Premium",
      "Bulk employee enrollment",
      "Admin dashboard",
      "Custom branding options",
      "Wellness program integration",
      "Detailed analytics & reporting",
      "Dedicated account manager",
    ],
    limitations: [],
    buttonText: "Contact sales",
    buttonVariant: "outline",
    popular: false,
  }
];

const Pricing = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
            Choose the plan that's right for you and start taking control of your preventative healthcare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <div 
              key={index} 
              className={`bg-white p-8 rounded-xl border ${tier.popular ? 'border-brand-500 ring-2 ring-brand-500/20' : 'border-border'} shadow-sm relative flex flex-col`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <div className="bg-brand-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Popular
                  </div>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  {tier.period && <span className="text-muted-foreground ml-2">{tier.period}</span>}
                </div>
                <p className="text-muted-foreground">{tier.description}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-5 w-5 flex-shrink-0 text-health-check" />
                    <span>{feature}</span>
                  </li>
                ))}
                
                {tier.limitations.map((limitation, i) => (
                  <li key={`limit-${i}`} className="flex items-center gap-2 text-muted-foreground">
                    <X className="h-5 w-5 flex-shrink-0" />
                    <span>{limitation}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={tier.buttonVariant as "outline" | "default"} 
                size="lg" 
                className="w-full"
                asChild
              >
                <Link to="/dashboard">{tier.buttonText}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
