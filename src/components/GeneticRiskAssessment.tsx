
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeartPulse, Dna, FileUpload, Shield, ExternalLink, Lock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";

interface GeneticRisk {
  condition: string;
  risk: "low" | "moderate" | "high";
  percentage: number;
  recommendations: string[];
  description: string;
}

const GeneticRiskAssessment = () => {
  const [dataUploaded, setDataUploaded] = useState(false);
  const [uploadStep, setUploadStep] = useState(1);
  const [isPremium, setIsPremium] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  
  // Mock genetic risk data
  const mockRisks: GeneticRisk[] = [
    {
      condition: "Type 2 Diabetes",
      risk: "high",
      percentage: 32,
      description: "Your genetic profile suggests an elevated risk of developing type 2 diabetes compared to the general population.",
      recommendations: [
        "Schedule regular blood glucose tests",
        "Consider meeting with a nutritionist",
        "Maintain a healthy weight through diet and exercise",
        "Monitor carbohydrate intake"
      ]
    },
    {
      condition: "Coronary Heart Disease",
      risk: "moderate",
      percentage: 18,
      description: "Your genetic markers indicate a moderate risk of coronary heart disease over your lifetime.",
      recommendations: [
        "Regular cholesterol screenings",
        "Heart-healthy Mediterranean diet",
        "Moderate cardiovascular exercise",
        "Consider discussing preventative medications with your doctor"
      ]
    },
    {
      condition: "Alzheimer's Disease",
      risk: "low",
      percentage: 6,
      description: "Your genetic profile suggests a below-average risk for developing Alzheimer's disease.",
      recommendations: [
        "Stay mentally active",
        "Regular physical activity",
        "Maintain social connections",
        "Follow a brain-healthy diet"
      ]
    }
  ];
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (isPremium) {
      // Simulate file processing
      toast({
        title: "Processing DNA Data",
        description: "Your genetic data is being analyzed..."
      });
      
      // Move to next step
      setUploadStep(2);
      setTimeout(() => {
        setUploadStep(3);
        setTimeout(() => {
          setDataUploaded(true);
          toast({
            title: "Analysis Complete",
            description: "Your genetic health profile is ready to view.",
          });
        }, 2000);
      }, 2000);
    } else {
      setShowUpgradeModal(true);
    }
  };
  
  const getRiskBadge = (risk: GeneticRisk["risk"]) => {
    switch (risk) {
      case "low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Low Risk</Badge>;
      case "moderate":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">Moderate Risk</Badge>;
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">High Risk</Badge>;
      default:
        return null;
    }
  };
  
  // For demonstration, let's add a button to simulate having premium access
  const togglePremium = () => {
    setIsPremium(!isPremium);
    if (!isPremium) {
      toast({
        title: "Premium Access Granted",
        description: "You now have access to genetic risk assessment."
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Dna className="h-5 w-5 text-indigo-500" />
            Genetic Risk Assessment
          </h2>
          <p className="text-muted-foreground text-sm">
            Upload genetic testing data to get personalized health insights
          </p>
        </div>
        
        {/* Demo toggle for premium access */}
        <Button variant="outline" size="sm" onClick={togglePremium}>
          {isPremium ? "Disable Premium (Demo)" : "Enable Premium (Demo)"}
        </Button>
      </div>
      
      {!isPremium && (
        <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-100">
          <CardHeader>
            <CardTitle className="text-lg">Premium Feature</CardTitle>
            <CardDescription>
              Unlock genetic risk assessment with Premium
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Dna className="h-5 w-5 text-indigo-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">DNA-Based Health Insights</h4>
                  <p className="text-sm text-muted-foreground">Get personalized health recommendations based on your genetic profile</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HeartPulse className="h-5 w-5 text-indigo-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Personalized Disease Risk Assessment</h4>
                  <p className="text-sm text-muted-foreground">Understand your genetic predispositions and take preventive action</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-indigo-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Privacy-Focused Analysis</h4>
                  <p className="text-sm text-muted-foreground">Your genetic data is encrypted and processed with the highest security standards</p>
                </div>
              </div>
              
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 mt-2">
                Upgrade to Premium
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {isPremium && !dataUploaded && (
        <Card>
          <CardHeader>
            <CardTitle>Upload Genetic Data</CardTitle>
            <CardDescription>
              Upload data from 23andMe, AncestryDNA, or other genetic testing services
            </CardDescription>
          </CardHeader>
          <CardContent>
            {uploadStep === 1 && (
              <div className="space-y-6">
                <Alert>
                  <Lock className="h-4 w-4" />
                  <AlertTitle>Your data is secure</AlertTitle>
                  <AlertDescription>
                    We use bank-level encryption to protect your genetic information.
                    Your data is never shared with third parties without your explicit consent.
                  </AlertDescription>
                </Alert>
                
                <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center">
                  <FileUpload className="h-10 w-10 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="font-medium mb-2">Drag and drop your genetic data file</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Supported formats: .txt, .csv, .zip from 23andMe, AncestryDNA
                  </p>
                  <div className="flex flex-col items-center gap-2">
                    <Button variant="secondary" className="relative">
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleFileUpload}
                        accept=".txt,.csv,.zip"
                      />
                      Choose File
                    </Button>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>How to export your data:</span>
                      <Button variant="link" className="h-auto p-0" asChild>
                        <a href="https://support.23andme.com/hc/en-us/articles/212196868-Accessing-Your-Raw-Data" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                          23andMe <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                      <Button variant="link" className="h-auto p-0" asChild>
                        <a href="https://support.ancestry.com/s/article/Downloading-DNA-Data" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                          AncestryDNA <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {uploadStep === 2 && (
              <div className="text-center py-8">
                <Dna className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
                <h3 className="font-medium mb-2">Processing your genetic data</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  This may take a few minutes. We're analyzing thousands of genetic markers.
                </p>
                <Progress value={45} className="max-w-md mx-auto" />
              </div>
            )}
            
            {uploadStep === 3 && (
              <div className="text-center py-8">
                <Dna className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-medium mb-2">Analysis complete!</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Your genetic health profile is ready to view.
                </p>
                <Progress value={100} className="max-w-md mx-auto mb-6" />
                <Button onClick={() => setDataUploaded(true)}>
                  View Results
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      
      {isPremium && dataUploaded && (
        <Tabs defaultValue="risks">
          <TabsList className="mb-4">
            <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="raw">Raw Data</TabsTrigger>
          </TabsList>
          
          <TabsContent value="risks" className="space-y-4">
            <Alert className="bg-blue-50 border-blue-200">
              <AlertTitle className="text-blue-800">Your Genetic Risk Profile</AlertTitle>
              <AlertDescription className="text-blue-700">
                Below are your personalized risk assessments based on your genetic profile.
                Remember that genetic risk is just one factor - lifestyle and environment also play major roles.
              </AlertDescription>
            </Alert>
            
            {mockRisks.map((risk) => (
              <Card key={risk.condition} className={`border-l-4 ${
                risk.risk === 'high' ? 'border-l-red-500' 
                : risk.risk === 'moderate' ? 'border-l-amber-500' 
                : 'border-l-green-500'
              }`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{risk.condition}</CardTitle>
                    {getRiskBadge(risk.risk)}
                  </div>
                  <CardDescription>{risk.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Risk Level</span>
                      <span className="text-sm font-medium">{risk.percentage}%</span>
                    </div>
                    <Progress 
                      value={risk.percentage} 
                      className={`h-2 ${
                        risk.risk === 'high' ? 'bg-red-100' 
                        : risk.risk === 'moderate' ? 'bg-amber-100' 
                        : 'bg-green-100'
                      }`} 
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Compared to general population average of {Math.floor(risk.percentage * 0.7)}%
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Recommended Action</h4>
                    <ul className="text-sm space-y-1">
                      {risk.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                            <Shield className="h-3 w-3 text-primary" />
                          </div>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Recommendations</CardTitle>
                <CardDescription>
                  Based on your genetic profile, we recommend these preventive measures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Priority Actions</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="bg-red-100 text-red-800 rounded-full p-1 mt-0.5">
                          <HeartPulse className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Schedule diabetes screening</h4>
                          <p className="text-sm text-muted-foreground">Your genetic profile indicates higher risk for Type 2 Diabetes</p>
                          <Button variant="outline" size="sm" className="mt-2">Schedule Now</Button>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="bg-amber-100 text-amber-800 rounded-full p-1 mt-0.5">
                          <HeartPulse className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Heart health assessment</h4>
                          <p className="text-sm text-muted-foreground">Recommended based on moderate genetic risk for coronary heart disease</p>
                          <Button variant="outline" size="sm" className="mt-2">Learn More</Button>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Lifestyle Recommendations</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Nutrition</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <ul className="space-y-2">
                            <li>Limit refined carbohydrates and sugars</li>
                            <li>Increase fiber intake to 30g daily</li>
                            <li>Consider Mediterranean diet approach</li>
                            <li>Moderate alcohol consumption</li>
                          </ul>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Exercise</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <ul className="space-y-2">
                            <li>150 minutes of moderate activity weekly</li>
                            <li>Include resistance training 2-3 times weekly</li>
                            <li>Consider supervised exercise for heart health</li>
                            <li>Track activity levels and heart rate</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="raw">
            <Card>
              <CardHeader>
                <CardTitle>Raw Genetic Data</CardTitle>
                <CardDescription>
                  Technical information about your genetic markers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-md p-4 text-sm font-mono overflow-x-auto">
                  <p>23andMe Data File (Processed)</p>
                  <p className="text-muted-foreground">4,781 markers analyzed</p>
                  <div className="mt-4 border-t pt-4">
                    <p># rsid chromosome position genotype</p>
                    <p>rs12345 1 12345678 AA</p>
                    <p>rs23456 2 23456789 GC</p>
                    <p>rs34567 3 34567890 TT</p>
                    <p>...</p>
                  </div>
                </div>
                <Button variant="outline" className="mt-4">
                  <FileUpload className="mr-2 h-4 w-4" />
                  Download Full Report
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default GeneticRiskAssessment;
