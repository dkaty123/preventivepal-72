import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Brain, HeartHandshake, ListChecks, Info, Star, AlertCircle, ChevronRight, MessageSquare, Calendar, Shield, Activity } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { useHealthData } from "@/contexts/HealthDataContext";
import HealthPlatformConnect from "./HealthPlatformConnect";

interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  category: "lifestyle" | "nutrition" | "mental" | "checkup" | "specialist" | "preventative";
  urgency: "low" | "medium" | "high";
  confidence: number; // 0-100
  reasoning: string;
  action?: {
    type: "appointment" | "habit" | "education";
    text: string;
    link?: string;
  };
  isPremiumFeature: boolean;
  completionProgress?: number; // 0-100
  personalizationFactors?: string[];
  healthDataBased?: boolean;
}

const AIHealthRecommendations = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { healthData, connectedPlatform, hasConsented } = useHealthData();
  const [isPremium, setIsPremium] = useState(false); // Simulated premium status
  const [activeTab, setActiveTab] = useState("all");
  const [userProfile, setUserProfile] = useState({
    age: 42,
    gender: "female",
    conditions: ["hypertension", "elevated cholesterol"],
    medications: ["Lisinopril"],
    familyHistory: ["diabetes", "heart disease"],
    lastCheckups: {
      physical: "2023-05-15",
      dental: "2023-01-10",
      vision: "2022-09-05"
    }
  });
  
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
    },
    {
      id: "7",
      title: "Preventative Screening: Mammogram",
      description: "Based on your age and family history, annual mammogram screening is recommended.",
      category: "preventative",
      urgency: "high",
      confidence: 95,
      reasoning: "Guidelines recommend mammograms for women age 40+ annually, especially with your family history of breast cancer.",
      action: {
        type: "appointment",
        text: "Schedule Mammogram",
        link: "/calendar"
      },
      isPremiumFeature: false,
      completionProgress: 0,
      personalizationFactors: ["Age: 42", "Gender: Female", "Family history of breast cancer"]
    },
    {
      id: "8",
      title: "Heart Health Checkup",
      description: "Your profile indicates elevated risk factors for cardiovascular disease.",
      category: "preventative",
      urgency: "medium",
      confidence: 88,
      reasoning: "Hypertension and elevated cholesterol are significant risk factors for heart disease, combined with your family history.",
      action: {
        type: "appointment",
        text: "Find Cardiologist",
        link: "/calendar"
      },
      isPremiumFeature: false,
      completionProgress: 0,
      personalizationFactors: ["Condition: Hypertension", "Condition: Elevated cholesterol", "Family history of heart disease"]
    },
    {
      id: "9",
      title: "Diabetes Screening",
      description: "Regular A1C testing is recommended based on your risk profile.",
      category: "preventative",
      urgency: "medium",
      confidence: 82,
      reasoning: "Family history of diabetes combined with your age and cardiac risk factors suggest regular screening.",
      action: {
        type: "appointment",
        text: "Schedule Lab Work",
        link: "/calendar"
      },
      isPremiumFeature: false,
      completionProgress: 0,
      personalizationFactors: ["Family history of diabetes", "Age: 42", "BMI: 26.4"]
    },
    {
      id: "10",
      title: "Personalized Exercise Program",
      description: "A tailored exercise regimen for hypertension management.",
      category: "lifestyle",
      urgency: "medium",
      confidence: 90,
      reasoning: "Regular physical activity is shown to reduce blood pressure and improve cardiovascular health.",
      action: {
        type: "education",
        text: "View Program",
      },
      isPremiumFeature: true,
      completionProgress: 30,
      personalizationFactors: ["Condition: Hypertension", "Age: 42", "Activity level: Moderate"]
    },
    {
      id: "11",
      title: "DASH Diet Plan",
      description: "Dietary Approaches to Stop Hypertension diet customized to your preferences.",
      category: "nutrition",
      urgency: "medium",
      confidence: 88,
      reasoning: "The DASH diet is clinically proven to help manage hypertension and cholesterol levels.",
      action: {
        type: "education",
        text: "View Meal Plan",
      },
      isPremiumFeature: true,
      completionProgress: 15,
      personalizationFactors: ["Condition: Hypertension", "Condition: Elevated cholesterol", "Food preferences considered"]
    },
    {
      id: "12",
      title: "Bone Density Scan",
      description: "Preventative scan to establish baseline bone health.",
      category: "preventative",
      urgency: "low",
      confidence: 75,
      reasoning: "Recommended for women approaching perimenopause to establish baseline measurements.",
      action: {
        type: "appointment",
        text: "Learn More",
      },
      isPremiumFeature: false,
      completionProgress: 0,
      personalizationFactors: ["Age: 42", "Gender: Female"]
    }
  ]);
  
  const togglePremium = () => {
    setIsPremium(!isPremium);
    toast({
      title: isPremium ? "Switched to Basic Mode" : "Premium Mode Activated",
      description: isPremium ? "Premium features are now hidden." : "You now have access to premium features.",
    });
  };
  
  const getFilteredRecommendations = () => {
    const allAccessible = isPremium 
      ? recommendations 
      : recommendations.filter(rec => !rec.isPremiumFeature);
    
    if (activeTab === "all") return allAccessible;
    return allAccessible.filter(rec => rec.category === activeTab);
  };
  
  const sortedRecommendations = getFilteredRecommendations().sort((a, b) => {
    const urgencyOrder = { high: 0, medium: 1, low: 2 };
    const urgencyDiff = urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
    if (urgencyDiff !== 0) return urgencyDiff;
    
    return b.confidence - a.confidence;
  });
  
  const handleAction = (recommendation: AIRecommendation) => {
    if (recommendation.action?.link) {
      navigate(recommendation.action.link);
    } else {
      console.log("Action taken on:", recommendation.title);
    }
  };
  
  const updateProgress = (id: string, progress: number) => {
    setRecommendations(
      recommendations.map(rec => 
        rec.id === id ? { ...rec, completionProgress: progress } : rec
      )
    );
    
    if (progress === 100) {
      toast({
        title: "Recommendation Completed!",
        description: "Great job taking care of your health."
      });
    } else {
      toast({
        title: "Progress Updated",
        description: `You're ${progress}% through this recommendation.`
      });
    }
  };
  
  useEffect(() => {
    if (healthData && connectedPlatform !== "none" && hasConsented) {
      const healthDataRecommendations: AIRecommendation[] = [];
      
      if (healthData.sleepHours && healthData.sleepHours < 7) {
        healthDataRecommendations.push({
          id: "health-1",
          title: "Improve Sleep Duration",
          description: `Your average sleep of ${healthData.sleepHours} hours is below recommended levels for your age.`,
          category: "lifestyle",
          urgency: "medium",
          confidence: 90,
          reasoning: "Sleep data from your health profile indicates consistently less than 7 hours of sleep per night.",
          action: {
            type: "education",
            text: "Sleep Improvement Plan",
          },
          isPremiumFeature: false,
          healthDataBased: true,
          personalizationFactors: [`Current sleep: ${healthData.sleepHours} hours`, "Recommendation: 7-8 hours"]
        });
      }
      
      if (healthData.heartRate && healthData.heartRate.resting > 80) {
        healthDataRecommendations.push({
          id: "health-2",
          title: "Heart Health Check Recommended",
          description: `Your resting heart rate of ${healthData.heartRate.resting} bpm is elevated.`,
          category: "checkup",
          urgency: healthData.heartRate.resting > 90 ? "high" : "medium",
          confidence: 85,
          reasoning: "Elevated resting heart rate may indicate cardiovascular strain or other health issues.",
          action: {
            type: "appointment",
            text: "Schedule Checkup",
            link: "/calendar"
          },
          isPremiumFeature: false,
          healthDataBased: true,
          personalizationFactors: [`Resting HR: ${healthData.heartRate.resting} bpm`, "Optimal range: 60-80 bpm"]
        });
      }
      
      if (healthData.steps && healthData.steps < 5000) {
        healthDataRecommendations.push({
          id: "health-3",
          title: "Increase Daily Activity",
          description: `Your average of ${healthData.steps.toLocaleString()} steps is below recommended levels.`,
          category: "lifestyle",
          urgency: "medium",
          confidence: 92,
          reasoning: "Low daily step count may contribute to decreased cardiovascular health and metabolic issues.",
          action: {
            type: "habit",
            text: "Activity Plan",
          },
          isPremiumFeature: false,
          healthDataBased: true,
          personalizationFactors: [`Current steps: ${healthData.steps.toLocaleString()}/day`, "Target: 7,500-10,000 steps"]
        });
      }
      
      if (healthData.bloodPressure && healthData.bloodPressure.systolic > 130) {
        healthDataRecommendations.push({
          id: "health-4",
          title: "Blood Pressure Management",
          description: `Your blood pressure of ${healthData.bloodPressure.systolic}/${healthData.bloodPressure.diastolic} mmHg is elevated.`,
          category: "checkup",
          urgency: healthData.bloodPressure.systolic > 140 ? "high" : "medium",
          confidence: 88,
          reasoning: "Elevated blood pressure increases risk of cardiovascular disease and other health issues.",
          action: {
            type: "appointment",
            text: "Consult Doctor",
            link: "/calendar"
          },
          isPremiumFeature: false,
          healthDataBased: true,
          personalizationFactors: [`BP: ${healthData.bloodPressure.systolic}/${healthData.bloodPressure.diastolic} mmHg`, "Optimal: <120/80 mmHg"]
        });
      }
      
      if (healthData.cholesterol && healthData.cholesterol.ldl > 130) {
        healthDataRecommendations.push({
          id: "health-5",
          title: "Cholesterol Management Plan",
          description: `Your LDL cholesterol of ${healthData.cholesterol.ldl} mg/dL is above recommended levels.`,
          category: "nutrition",
          urgency: "medium",
          confidence: 87,
          reasoning: "Elevated LDL cholesterol is associated with increased cardiovascular risk.",
          action: {
            type: "education",
            text: "Dietary Guidance",
          },
          isPremiumFeature: false,
          healthDataBased: true,
          personalizationFactors: [`LDL: ${healthData.cholesterol.ldl} mg/dL`, "HDL: ${healthData.cholesterol.hdl} mg/dL", "Target LDL: <100 mg/dL"]
        });
      }
      
      if (healthDataRecommendations.length > 0) {
        setRecommendations(prevRecs => {
          const newRecs = [...prevRecs];
          
          healthDataRecommendations.forEach(newRec => {
            const existingIndex = newRecs.findIndex(rec => 
              rec.category === newRec.category && 
              rec.title.toLowerCase().includes(newRec.title.toLowerCase().substring(0, 10))
            );
            
            if (existingIndex >= 0) {
              newRecs[existingIndex] = newRec;
            } else {
              newRecs.push(newRec);
            }
          });
          
          return newRecs;
        });
      }
    }
  }, [healthData, connectedPlatform, hasConsented]);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
            <Brain className="h-6 w-6 text-brand-500" />
            <span>Personalized Health Insights</span>
          </h1>
          <p className="text-muted-foreground">
            AI-powered preventative care recommendations based on your health profile.
          </p>
        </div>
        
        <Button variant="outline" size="sm" onClick={togglePremium}>
          {isPremium ? "Disable Premium (Demo)" : "Enable Premium (Demo)"}
        </Button>
      </div>
      
      {!isPremium && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Basic Recommendations</AlertTitle>
          <AlertDescription>
            You're seeing general recommendations. Upgrade to Premium for deeper preventative care insights and personalized action plans.
            <Button variant="link" className="p-0 h-auto font-semibold">Upgrade Now</Button>
          </AlertDescription>
        </Alert>
      )}
      
      <Card className="bg-slate-50 border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg">Your Health Profile Summary</CardTitle>
          <CardDescription>Recommendations are based on these factors</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <div className="text-sm font-medium">Demographics</div>
            <ul className="text-sm space-y-1">
              <li className="flex items-center gap-2">
                <Badge variant="outline">Age</Badge>
                <span>{userProfile.age}</span>
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline">Gender</Badge>
                <span>{userProfile.gender}</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm font-medium">Health Conditions</div>
            <ul className="text-sm space-y-1">
              {userProfile.conditions.map((condition, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Badge variant="destructive">{condition}</Badge>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm font-medium">Family History</div>
            <ul className="text-sm space-y-1">
              {userProfile.familyHistory.map((condition, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Badge variant="secondary">{condition}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <HealthPlatformConnect />
      
      <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 md:grid-cols-6 lg:w-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="preventative">Preventative</TabsTrigger>
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
                  <div className="flex gap-1">
                    {recommendation.healthDataBased && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Health Data
                      </Badge>
                    )}
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
                </div>
                <CardDescription>{recommendation.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendation.completionProgress !== undefined && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Completion Progress</span>
                        <span className="font-medium">{recommendation.completionProgress}%</span>
                      </div>
                      <Progress value={recommendation.completionProgress} className="h-2" />
                    </div>
                  )}
                
                  <div className="flex items-center text-sm">
                    <Brain className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>AI Confidence: {recommendation.confidence}%</span>
                  </div>
                  
                  {recommendation.personalizationFactors && (
                    <div className="flex flex-wrap gap-1">
                      {recommendation.personalizationFactors.map((factor, i) => (
                        <Badge key={i} variant="outline" className="text-xs bg-slate-50">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
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
                
                {recommendation.completionProgress !== undefined && (
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button 
                      variant="outline" 
                      className="w-full sm:w-auto"
                      onClick={() => updateProgress(recommendation.id, Math.min(100, (recommendation.completionProgress || 0) + 25))}
                    >
                      Update Progress
                    </Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
          
          {!isPremium && (
            <Card className="bg-gradient-to-br from-brand-50 to-slate-50 border border-brand-100">
              <CardHeader>
                <CardTitle className="text-lg">Premium Preventative Care</CardTitle>
                <CardDescription>
                  Unlock advanced personalized health recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Brain className="h-4 w-4 text-brand-500 mt-0.5" />
                    <span>Personalized care plans based on your complete health profile</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <HeartHandshake className="h-4 w-4 text-brand-500 mt-0.5" />
                    <span>Tailored recommendations for your specific conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-brand-500 mt-0.5" />
                    <span>Optimized preventative care scheduling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-brand-500 mt-0.5" />
                    <span>Early risk detection and prevention strategies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Activity className="h-4 w-4 text-brand-500 mt-0.5" />
                    <span>Condition-specific exercise and nutrition plans</span>
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
