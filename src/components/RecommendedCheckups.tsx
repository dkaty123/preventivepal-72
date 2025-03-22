
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Calendar, Check, Clock, Star, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  frequency: string;
  lastCompleted?: string;
  dueDate: string;
  importance: "routine" | "recommended" | "high-priority";
  category: string;
  insuranceSavings?: number;
  isPremiumFeature: boolean;
}

const RecommendedCheckups = () => {
  const isPremium = false; // Simulate user subscription level
  
  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      id: "1",
      title: "Annual Physical Examination",
      description: "Comprehensive annual physical with your primary care physician",
      frequency: "Annual",
      lastCompleted: "March 15, 2023",
      dueDate: "March 15, 2024",
      importance: "high-priority",
      category: "Primary Care",
      insuranceSavings: 150,
      isPremiumFeature: false
    },
    {
      id: "2",
      title: "Dental Cleaning",
      description: "Regular dental cleaning and checkup",
      frequency: "Every 6 months",
      lastCompleted: "January 10, 2023",
      dueDate: "July 10, 2023",
      importance: "recommended",
      category: "Dental",
      insuranceSavings: 80,
      isPremiumFeature: false
    },
    {
      id: "3",
      title: "Eye Examination",
      description: "Comprehensive eye exam for vision and eye health",
      frequency: "Annual",
      lastCompleted: "September 5, 2022",
      dueDate: "September 5, 2023",
      importance: "routine",
      category: "Vision",
      insuranceSavings: 65,
      isPremiumFeature: false
    },
    {
      id: "4",
      title: "Blood Glucose Test",
      description: "Check for diabetes or prediabetes",
      frequency: "Every 2 years",
      dueDate: "December 1, 2023",
      importance: "recommended",
      category: "Laboratory",
      insuranceSavings: 120,
      isPremiumFeature: false
    },
    {
      id: "5",
      title: "Mammogram",
      description: "Preventive screening for breast cancer",
      frequency: "Annual",
      dueDate: "October 15, 2023",
      importance: "high-priority",
      category: "Radiology",
      insuranceSavings: 250,
      isPremiumFeature: true
    },
    {
      id: "6",
      title: "Colonoscopy",
      description: "Preventive screening for colorectal cancer",
      frequency: "Every 10 years",
      dueDate: "November 30, 2023",
      importance: "high-priority",
      category: "Specialist",
      insuranceSavings: 800,
      isPremiumFeature: true
    }
  ]);
  
  const markCompleted = (id: string) => {
    setRecommendations(recommendations.map(recommendation => {
      if (recommendation.id === id) {
        return {
          ...recommendation,
          lastCompleted: new Date().toISOString().split('T')[0],
          dueDate: "Recalculating..."
        };
      }
      return recommendation;
    }));
  };
  
  // Filter recommendations to show non-premium ones for basic users
  const filteredRecommendations = isPremium 
    ? recommendations 
    : recommendations.filter(recommendation => !recommendation.isPremiumFeature);
  
  // Sort by importance and due date
  const sortedRecommendations = [...filteredRecommendations].sort((a, b) => {
    // First by importance
    const importanceOrder = { "high-priority": 0, "recommended": 1, "routine": 2 };
    const importanceDiff = importanceOrder[a.importance] - importanceOrder[b.importance];
    if (importanceDiff !== 0) return importanceDiff;
    
    // Then by due date
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Recommended Checkups</h1>
          <p className="text-muted-foreground">
            Personalized preventative care recommendations based on your health profile.
          </p>
        </div>
      </div>
      
      {!isPremium && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Basic Plan</AlertTitle>
          <AlertDescription>
            You're seeing general recommendations. Upgrade to Premium for personalized recommendations based on your medical history and insurance benefits.
            <Button variant="link" className="p-0 h-auto font-semibold">Upgrade Now</Button>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedRecommendations.map(recommendation => (
          <Card key={recommendation.id} className={`border-l-4 ${
            recommendation.importance === 'high-priority' ? 'border-l-red-500'
            : recommendation.importance === 'recommended' ? 'border-l-amber-500'
            : 'border-l-blue-500'
          }`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{recommendation.title}</CardTitle>
                <Badge 
                  variant={
                    recommendation.importance === 'high-priority' ? 'destructive' 
                    : recommendation.importance === 'recommended' ? 'default' 
                    : 'secondary'
                  }
                >
                  {recommendation.importance === 'high-priority' ? 'High Priority' 
                   : recommendation.importance === 'recommended' ? 'Recommended' 
                   : 'Routine'}
                </Badge>
              </div>
              <CardDescription>{recommendation.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm">
                    <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>Frequency: {recommendation.frequency}</span>
                  </div>
                  <Badge variant="outline">{recommendation.category}</Badge>
                </div>
                
                <div className="flex items-center text-sm">
                  <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>Due: {recommendation.dueDate}</span>
                </div>
                
                {recommendation.lastCompleted && (
                  <div className="flex items-center text-sm">
                    <Check className="mr-1 h-4 w-4 text-green-500" />
                    <span>Last completed: {recommendation.lastCompleted}</span>
                  </div>
                )}
                
                {isPremium && recommendation.insuranceSavings && (
                  <div className="flex items-center text-sm">
                    <Star className="mr-1 h-4 w-4 text-amber-500" />
                    <span className="font-medium">Potential savings: ${recommendation.insuranceSavings}</span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2">
              <Button className="w-full sm:w-auto">Schedule</Button>
              <Button 
                variant="outline" 
                className="w-full sm:w-auto"
                onClick={() => markCompleted(recommendation.id)}
              >
                Mark Completed
              </Button>
            </CardFooter>
          </Card>
        ))}
        
        {!isPremium && (
          <Card className="bg-gradient-to-br from-brand-50 to-slate-50 border border-brand-100">
            <CardHeader>
              <CardTitle className="text-lg">Premium Recommendations</CardTitle>
              <CardDescription>
                Unlock personalized, high-value checkup recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-brand-500 mt-0.5" />
                  <span>Recommendations based on your complete health profile</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-brand-500 mt-0.5" />
                  <span>Optimize for maximum insurance benefit usage</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-brand-500 mt-0.5" />
                  <span>Age and risk-factor appropriate screenings</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-brand-500 mt-0.5" />
                  <span>Family history-based recommendations</span>
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
    </div>
  );
};

export default RecommendedCheckups;
