import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Stethoscope, Search, AlertCircle, Clock, MicIcon, ThumbsUp, ThumbsDown, Loader2, Hospital, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SymptomResult {
  id: string;
  condition: string;
  probability: number; // 0-100
  urgency: "low" | "medium" | "high" | "emergency";
  description: string;
  suggestedAction: string;
  symptoms: string[];
}

const SymptomChecker = () => {
  const navigate = useNavigate();
  const isPremium = false; // Simulated premium status
  
  const [searchInput, setSearchInput] = useState("");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<SymptomResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Add a symptom to the list
  const addSymptom = () => {
    if (searchInput.trim() && !symptoms.includes(searchInput.trim())) {
      setSymptoms([...symptoms, searchInput.trim()]);
      setSearchInput("");
    }
  };
  
  // Remove a symptom from the list
  const removeSymptom = (symptom: string) => {
    setSymptoms(symptoms.filter(s => s !== symptom));
  };
  
  // Analyze symptoms (simulated)
  const analyzeSymptoms = () => {
    setIsAnalyzing(true);
    setHasSearched(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Mock results based on symptoms
      const mockResults: SymptomResult[] = [
        {
          id: "1",
          condition: "Common Cold",
          probability: 78,
          urgency: "low" as const,
          description: "A viral infection causing sore throat, runny nose, and general discomfort.",
          suggestedAction: "Rest, hydration, and over-the-counter medication.",
          symptoms: ["cough", "runny nose", "sore throat", "fever"]
        },
        {
          id: "2",
          condition: "Seasonal Allergies",
          probability: 65,
          urgency: "low" as const,
          description: "An immune response to environmental allergens such as pollen or dust.",
          suggestedAction: "Antihistamines and avoiding triggers.",
          symptoms: ["runny nose", "sneezing", "itchy eyes", "congestion"]
        },
        {
          id: "3", 
          condition: "COVID-19",
          probability: 35,
          urgency: "medium" as const,
          description: "A viral infection that can cause respiratory symptoms and other effects.",
          suggestedAction: "Consider testing and contact your doctor if symptoms worsen.",
          symptoms: ["fever", "cough", "fatigue", "loss of taste", "loss of smell"]
        }
      ].filter(result => {
        // Only include results that match some of the user's symptoms
        return result.symptoms.some(s => 
          symptoms.some(userSymptom => 
            s.toLowerCase().includes(userSymptom.toLowerCase()) || 
            userSymptom.toLowerCase().includes(s.toLowerCase())
          )
        );
      });
      
      // Sort by probability
      mockResults.sort((a, b) => b.probability - a.probability);
      
      setResults(mockResults);
      setIsAnalyzing(false);
    }, 2000);
  };
  
  // Clear all data
  const resetSearch = () => {
    setSymptoms([]);
    setResults([]);
    setSearchInput("");
    setHasSearched(false);
  };
  
  // Get urgency color
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "emergency": return "bg-red-500 text-white";
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-brand-500" />
            <span>AI Symptom Checker</span>
          </h1>
          <p className="text-muted-foreground">
            Describe your symptoms to get AI-powered insights about possible conditions.
          </p>
        </div>
      </div>
      
      {!isPremium && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Basic AI Analysis</AlertTitle>
          <AlertDescription>
            You're using the basic version. Upgrade to Premium for more detailed analysis and medical insights.
            <Button variant="link" className="p-0 h-auto font-semibold">Upgrade Now</Button>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle>Describe Your Symptoms</CardTitle>
            <CardDescription>Enter symptoms one at a time for the most accurate results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input 
                placeholder="Enter a symptom (e.g., headache, fever)"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addSymptom()}
              />
              <Button onClick={addSymptom} className="shrink-0">
                <Search className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
            
            {symptoms.length > 0 && (
              <div className="border rounded-md p-4">
                <div className="text-sm font-medium mb-2">Current Symptoms:</div>
                <div className="flex flex-wrap gap-2">
                  {symptoms.map((symptom, index) => (
                    <Badge key={index} variant="secondary" className="py-1">
                      {symptom}
                      <button 
                        className="ml-1 hover:text-destructive" 
                        onClick={() => removeSymptom(symptom)}
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button 
                onClick={analyzeSymptoms} 
                disabled={symptoms.length === 0 || isAnalyzing}
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Stethoscope className="h-4 w-4 mr-2" />
                    Analyze Symptoms
                  </>
                )}
              </Button>
              {symptoms.length > 0 && (
                <Button 
                  variant="outline" 
                  onClick={resetSearch}
                  className="w-full"
                >
                  Clear All
                </Button>
              )}
            </div>
            
            {isPremium && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center gap-2 mb-2">
                  <MicIcon className="h-4 w-4 text-brand-500" />
                  <span className="font-medium">Voice Description</span>
                </div>
                <Button variant="outline" className="w-full" disabled={!isPremium}>
                  Describe Symptoms by Voice
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-7">
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>
              {hasSearched 
                ? `${results.length} possible conditions based on your symptoms` 
                : "Enter your symptoms for AI analysis"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 text-brand-500 animate-spin mb-4" />
                <div className="text-lg font-medium">Analyzing symptoms...</div>
                <p className="text-muted-foreground text-center max-w-md mt-2">
                  Our AI is analyzing your symptoms and comparing them with thousands of medical conditions.
                </p>
              </div>
            ) : results.length > 0 ? (
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {results.map((result) => (
                    <div 
                      key={result.id}
                      className="border rounded-lg overflow-hidden"
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg">{result.condition}</h3>
                          <Badge className={getUrgencyColor(result.urgency)}>
                            {result.urgency.charAt(0).toUpperCase() + result.urgency.slice(1)} Urgency
                          </Badge>
                        </div>
                        <div className="mb-2">
                          <div className="text-sm text-muted-foreground mb-1">AI Confidence</div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-brand-500 h-2.5 rounded-full" 
                              style={{ width: `${result.probability}%` }}
                            ></div>
                          </div>
                          <div className="text-right text-xs mt-1">{result.probability}%</div>
                        </div>
                        <p className="text-sm mt-3">{result.description}</p>
                        
                        <div className="mt-4 bg-muted/50 p-3 rounded-md">
                          <div className="text-sm font-medium mb-1">Suggested Action:</div>
                          <p className="text-sm">{result.suggestedAction}</p>
                        </div>
                        
                        <div className="mt-4 flex flex-wrap gap-1">
                          {result.symptoms.map((symptom, index) => (
                            <Badge key={index} variant="outline" className="bg-background">
                              {symptom}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="mt-4 pt-3 border-t flex justify-between items-center">
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" className="h-8">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              Helpful
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8">
                              <ThumbsDown className="h-4 w-4 mr-1" />
                              Not Helpful
                            </Button>
                          </div>
                          
                          {result.urgency === "high" || result.urgency === "emergency" ? (
                            <Button size="sm" onClick={() => navigate("/calendar")}>
                              <Clock className="h-4 w-4 mr-1" />
                              Schedule Doctor
                            </Button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : hasSearched ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <div className="text-lg font-medium">No matching conditions</div>
                <p className="text-muted-foreground max-w-md mt-2">
                  Try adding more specific symptoms or different symptoms for better results.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <div className="text-lg font-medium">Enter your symptoms</div>
                <p className="text-muted-foreground max-w-md mt-2">
                  Add specific symptoms on the left to get AI-powered health insights.
                </p>
              </div>
            )}
          </CardContent>
          {results.length > 0 && results.some(r => r.urgency === "emergency") && (
            <CardFooter className="bg-red-50 border-t border-red-100">
              <div className="flex items-center gap-3 w-full">
                <Hospital className="h-6 w-6 text-red-600 shrink-0" />
                <div className="flex-1">
                  <h4 className="font-medium text-red-700">Emergency Warning</h4>
                  <p className="text-sm text-red-600">Some symptoms suggest urgent medical attention may be needed.</p>
                </div>
                <Button className="shrink-0 bg-red-600 hover:bg-red-700">
                  Find ER
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
      
      {!isPremium && (
        <Card className="bg-gradient-to-br from-brand-50 to-slate-50 border border-brand-100">
          <CardHeader>
            <CardTitle>Upgrade to Premium AI Health Analysis</CardTitle>
            <CardDescription>
              Get more accurate diagnosis suggestions and detailed health insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Stethoscope className="h-4 w-4 text-brand-500 mt-1" />
                  <div>
                    <h4 className="font-medium">Advanced Medical Analysis</h4>
                    <p className="text-sm text-muted-foreground">More accurate condition matching with detailed medical explanations</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MicIcon className="h-4 w-4 text-brand-500 mt-1" />
                  <div>
                    <h4 className="font-medium">Voice Symptom Description</h4>
                    <p className="text-sm text-muted-foreground">Describe symptoms naturally with your voice for easier input</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Hospital className="h-4 w-4 text-brand-500 mt-1" />
                  <div>
                    <h4 className="font-medium">Doctor Appointment Integration</h4>
                    <p className="text-sm text-muted-foreground">Seamlessly schedule appointments based on analysis results</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-brand-500 mt-1" />
                  <div>
                    <h4 className="font-medium">Unlimited Symptom Checks</h4>
                    <p className="text-sm text-muted-foreground">Run as many symptom analyses as you need for you and your family</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-brand-500 hover:bg-brand-600">
              Upgrade to Premium
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <div className="pt-4 text-xs text-muted-foreground text-center">
        <p className="mb-1">Disclaimer: This symptom checker provides general guidance only and is not a substitute for professional medical advice.</p>
        <p>Always consult with a healthcare professional for proper diagnosis and treatment.</p>
      </div>
    </div>
  );
};

export default SymptomChecker;
