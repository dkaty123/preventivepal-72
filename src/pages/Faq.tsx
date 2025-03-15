
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, HelpCircle, Mail, ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "What is PreventivePal?",
    answer: "PreventivePal is a comprehensive health management platform designed to help you stay on top of your preventative healthcare needs. We provide smart reminders for check-ups, screenings, and other preventive care based on your personal health profile."
  },
  {
    question: "How does the reminder system work?",
    answer: "Our reminder system analyzes your health profile, including age, gender, family history, and past medical history, to generate personalized recommendations for preventative screenings and check-ups. You'll receive timely notifications through your preferred channels (email, SMS, or app notifications)."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We take data security and privacy extremely seriously. All your health information is encrypted and stored securely. We adhere to HIPAA regulations and never share your personal information with third parties without your explicit permission."
  },
  {
    question: "Can I add family members to my account?",
    answer: "Yes, our Premium plan allows you to add up to 5 family members to your account. You can manage preventative care schedules for your entire family from a single dashboard."
  },
  {
    question: "How does insurance optimization work?",
    answer: "Our system tracks your insurance benefits and sends timely reminders to help you utilize services before they expire. For example, if your dental plan covers two cleanings per year, we'll remind you to schedule them before the year ends."
  },
  {
    question: "Do I need a Premium account to use the basic features?",
    answer: "No, our Basic plan is completely free and includes essential preventative care tracking for individuals. Premium plans offer additional features like insurance optimization, customizable reminders, and family member profiles."
  },
  {
    question: "How can I cancel my subscription?",
    answer: "You can cancel your subscription at any time from your account settings. If you cancel, you'll retain access to Premium features until the end of your current billing period."
  },
  {
    question: "Is there a mobile app available?",
    answer: "Yes, we offer mobile apps for both iOS and Android platforms. You can download them from the respective app stores to access your PreventivePal account on the go."
  }
];

const FaqPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredFaqs = searchQuery.trim() === "" 
    ? faqs 
    : faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-brand-50 to-white py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center p-1 mb-4 rounded-full bg-white border border-brand-100">
                <span className="flex items-center gap-1 px-3 py-0.5 text-sm font-medium text-brand-700 bg-brand-50 rounded-full">
                  <HelpCircle className="h-3.5 w-3.5" />
                  Help Center
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Find answers to common questions about PreventivePal and how it can help you manage your preventative healthcare.
              </p>
              
              <div className="relative max-w-xl mx-auto">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  type="text"
                  placeholder="Search for answers..."
                  className="pl-10 h-12 shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Accordion */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              {filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="space-y-6">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg overflow-hidden shadow-sm bg-white">
                      <AccordionTrigger className="px-6 py-4 hover:bg-brand-50 transition-colors">
                        <h3 className="text-left font-medium text-lg">{faq.question}</h3>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 py-4 text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground mb-4">No results found for "{searchQuery}"</p>
                  <Button onClick={() => setSearchQuery("")} variant="outline">
                    Clear search
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-16 bg-brand-50">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our support team is always ready to help. Drop us a message and we'll get back to you as soon as possible.
              </p>
              <Button size="lg" className="bg-brand-600 hover:bg-brand-700 text-white">
                <Mail className="mr-2 h-5 w-5" /> Contact Support
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FaqPage;
