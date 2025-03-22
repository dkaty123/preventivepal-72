
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Brain, HeartHandshake, ListChecks, Info, Star, AlertCircle, ChevronRight, MessageSquareText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Types for AI-generated recommendations
interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  category: "lifestyle" | "nutrition" | "mental" | "checkup" | "specialist";
  urgency: "low" | "medium" | "high";
  confidence: number; // 0-100
  reasoning: string;
  action?: {
    type: "appointment" | "habit" | "education";
    text: string;
    link?: string;
  };
  isPremiumFeature: boolean;
}

const AIHealthRecommendations = () => {
  const navigate = useNavigate();
  const isPremium = false; // Simulated premium status
  const [activeTab, setActiveTab] = useState("all");
  
  // Simulated AI-generated recommendations
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([
    {
      id: "1",
      title: "Schedule Annual Blood Work",
      description: "Based on your age and family history, an annual blood panel is recommended.",
      category: "checkup",
      urgency: "medium",
      confidence: 89,
      reasoning: "Your profile indicates you're over 40 with a family history of diabetes.",
      action: {
        type: "appointment",
        text: "Schedule Blood Work",
        link: "/calendar"
      },
      isPremiumFeature: false
    },
    {
      id: "2",
      title: "Consider Nutritionist Consultation",
      description: "Your recent weight change may benefit from professional dietary guidance.",
      category: "nutrition",
      urgency: "low",
      confidence: 75,
      reasoning: "Your health profile shows a 12lb weight gain in the last 6 months.",
      action: {
        type: "appointment",
        text: "Find Nutritionist",
        link: "/calendar"
      },
      isPremiumFeature: false
    },
    {
      id: "3",
      title: "Add 30 Minutes of Walking Daily",
      description: "Increasing your daily activity could improve your cardiovascular health.",
      category: "lifestyle",
      urgency: "medium",
      confidence: 92,
      reasoning: "Your activity level is below recommended guidelines for your age group.",
      action: {
        type: "habit",
        text: "Track Progress"
      },
      isPremiumFeature: false
    },
    {
      id: "4",
      title: "Dental Check-up Overdue",
      description: "It's been over 12 months since your last dental visit.",
      category: "checkup",
      urgency: "high",
      confidence: 98,
      reasoning: "Regular dental check-ups are recommended every 6 months, and your profile shows your last visit was 14 months ago.",
      action: {
        type: "appointment",
        text: "Schedule Dental Visit",
        link: "/calendar"
      },
      isPremiumFeature: false
    },
    {
      id: "5",
      title: "Consider Heart Health Screening",
      description: "Based on your family history, a heart health screening is recommended.",
      category: "specialist",
      urgency: "medium",
      confidence: 82,
      reasoning: "Multiple family members with cardiovascular disease suggests heightened risk.",
      action: {
        type: "appointment",
        text: "Find Cardiologist",
        link: "/calendar"
      },
      isPremiumFeature: true
    },
    {
      id: "6",
      title: "Mindfulness Practice for Stress Management",
      description: "AI analysis suggests elevated stress levels based on your health patterns.",
      category: "mental",
      urgency: "medium",
      confidence: 77,
      reasoning: "Recent appointment notes mention stress, and your sleep patterns show disturbance.",
      action: {
        type: "education",
        text: "Learn Techniques",
      },
      isPremiumFeature: true
    }
  ]);
  
  // Filter recommendations by tab and premium status
  const getFilteredRecommendations = () => {
    const allAccessible = isPremium 
      ? recommendations 
      : recommendations.filter(rec => !rec.isPremiumFeature);
    
    if (activeTab === "all") return allAccessible;
    return allAccessible.filter(rec => rec.category === activeTab);
  };
  
  // Sort by urgency and confidence
  const sortedRecommendations = getFilteredRecommendations().sort((a, b) => {
    const urgencyOrder = { high: 0, medium: 1, low: 2 };
    const urgencyDiff = urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
    if (urgencyDiff !== 0) return urgencyDiff;
    
    return b.confidence - a.confidence;
  });
  
  // Handle recommendation action
  const handleAction = (recommendation: AIRecommendation) => {
    if (recommendation.action?.link) {
      navigate(recommendation.action.link);
    } else {
      // For actions without links, we could implement different behavior
      console.log("Action taken on:", recommendation.title);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
            <Brain className="h-6 w-6 text-brand-500" />
            <span>AI Health Insights</span>
          </h1>
          <p className="text-muted-foreground">
            Personalized health recommendations powered by AI analysis of your health profile.
          </p>
        </div>
      </div>
      
      {!isPremium && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Basic Recommendations</AlertTitle>
          <AlertDescription>
            You're seeing general recommendations. Upgrade to Premium for deeper health insights and personalized action plans.
            <Button variant="link" className="p-0 h-auto font-semibold">Upgrade Now</Button>
          </AlertDescription>
        </Alert>
      )}
      
      <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 md:grid-cols-6 lg:w-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="checkup">Checkups</TabsTrigger>
          <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="mental">Mental Health</TabsTrigger>
          <TabsTrigger value="specialist">Specialists</TabsTrigger>
        </TabsList>
        
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedRecommendations.map(recommendation => (
            <Card key={recommendation.id} className={`border-l-4 ${
              recommendation.urgency === 'high' ? 'border-l-red-500'
              : recommendation.urgency === 'medium' ? 'border-l-amber-500'
              : 'border-l-blue-500'
            }`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{recommendation.title}</CardTitle>
                  <Badge 
                    variant={
                      recommendation.urgency === 'high' ? 'destructive' 
                      : recommendation.urgency === 'medium' ? 'default' 
                      : 'secondary'
                    }
                  >
                    {recommendation.urgency === 'high' ? 'High Priority' 
                     : recommendation.urgency === 'medium' ? 'Recommended' 
                     : 'Optional'}
                  </Badge>
                </div>
                <CardDescription>{recommendation.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-sm">
                    <Brain className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>AI Confidence: {recommendation.confidence}%</span>
                  </div>
                  
                  <div className="bg-muted/50 p-3 rounded-md">
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div className="text-sm text-muted-foreground">
                        <strong>AI reasoning:</strong> {recommendation.reasoning}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2">
                {recommendation.action && (
                  <Button 
                    className="w-full sm:w-auto" 
                    onClick={() => handleAction(recommendation)}
                  >
                    {recommendation.action.text}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
                <Button variant="outline" className="w-full sm:w-auto">
                  <MessageSquareText className="mr-1 h-4 w-4" />
                  Feedback
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          {!isPremium && (
            <Card className="bg-gradient-to-br from-brand-50 to-slate-50 border border-brand-100">
              <CardHeader>
                <CardTitle className="text-lg">Premium AI Insights</CardTitle>
                <CardDescription>
                  Unlock advanced health analysis and personalized action plans
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Brain className="h-4 w-4 text-brand-500 mt-0.5" />
                    <span>Advanced analysis of your health patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <HeartHandshake className="h-4 w-4 text-brand-500 mt-0.5" />
                    <span>Genetic & family history-based insights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ListChecks className="h-4 w-4 text-brand-500 mt-0.5" />
                    <span>Personalized health optimization plans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-brand-500 mt-0.5" />
                    <span>Insurance benefit optimization</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-brand-500 hover:bg-brand-600">
                  Upgrade to Premium
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default AIHealthRecommendations;
