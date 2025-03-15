
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
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
  },
  {
    quote: "I love how easy it is to keep track of my whole family's preventive care needs in one place.",
    author: "James L.",
    role: "Healthcare Professional",
    avatar: "https://i.pravatar.cc/100?img=4"
  },
  {
    quote: "The reminders arrive at just the right time. I'm never caught off guard by an appointment anymore.",
    author: "Elena R.",
    role: "Teacher",
    avatar: "https://i.pravatar.cc/100?img=5"
  }
];

const TestimonialCarousel = () => {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container px-4 md:px-6 relative">
        <div className="absolute top-0 left-20 w-72 h-72 bg-brand-100 rounded-full blur-3xl opacity-30 -z-10"></div>
        <div className="absolute bottom-0 right-20 w-72 h-72 bg-brand-200 rounded-full blur-3xl opacity-30 -z-10"></div>
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-1 mb-4 rounded-full bg-brand-50 border border-brand-100">
            <span className="px-3 py-0.5 text-sm font-medium text-brand-700 bg-white rounded-full shadow-sm">
              Testimonials
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-700 to-brand-500">
            What our users are saying
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of people who have improved their preventative healthcare routine with PreventivePal.
          </p>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="bg-white border-none shadow-md h-full">
                  <CardContent className="p-6">
                    <div className="mb-4 text-brand-500">
                      <Quote className="h-8 w-8" />
                    </div>
                    <p className="mb-6 text-lg italic">{testimonial.quote}</p>
                    <div className="flex items-center">
                      <div className="rounded-full overflow-hidden h-12 w-12 mr-4 border-2 border-brand-100">
                        <img src={testimonial.avatar} alt={testimonial.author} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-2">
            <CarouselPrevious className="relative static transform-none h-10 w-10" />
            <CarouselNext className="relative static transform-none h-10 w-10" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
