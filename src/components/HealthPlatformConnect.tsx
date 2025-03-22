
import { useState } from "react";
import { useHealthData } from "@/contexts/HealthDataContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Activity, RefreshCw, Loader2, AlertTriangle, Smartphone, Check } from "lucide-react";
import HealthDataConsent from "./HealthDataConsent";

const HealthPlatformConnect = () => {
  const { 
    connectedPlatform, 
    isConnecting, 
    hasConsented,
    healthData,
    connectHealthPlatform, 
    disconnectHealthPlatform,
    refreshHealthData
  } = useHealthData();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<"apple_health" | "google_fit">("apple_health");
  
  const handleConnect = async () => {
    if (!hasConsented) {
      return;
    }
    
    await connectHealthPlatform(selectedPlatform);
    setIsDialogOpen(false);
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Health Data Integration</CardTitle>
            <CardDescription>Connect your health platforms for personalized recommendations</CardDescription>
          </div>
          {connectedPlatform !== "none" && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => refreshHealthData()}
              disabled={isConnecting}
              className="flex items-center gap-1"
            >
              {isConnecting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              <span>Sync</span>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!hasConsented && (
          <Alert variant="default" className="bg-amber-50 text-amber-800 border-amber-200">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Consent Required</AlertTitle>
            <AlertDescription>
              To connect your health data, we need your consent for how we'll use this information.
              <div className="mt-2">
                <HealthDataConsent />
              </div>
            </AlertDescription>
          </Alert>
        )}
        
        {hasConsented && connectedPlatform === "none" && (
          <div className="flex flex-col items-center py-4 space-y-4">
            <div className="rounded-full p-3 bg-brand-100">
              <Activity className="h-8 w-8 text-brand-600" />
            </div>
            <div className="text-center">
              <h3 className="font-medium">No Health Platform Connected</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Connect to Apple Health or Google Fit to receive personalized recommendations
              </p>
            </div>
            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="mt-2"
            >
              Connect Platform
            </Button>
          </div>
        )}
        
        {hasConsented && connectedPlatform !== "none" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-green-50 p-3 rounded-md border border-green-200">
              <div className="flex items-center gap-2">
                <div className="rounded-full p-1.5 bg-green-500">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium text-green-800">
                  Connected to {connectedPlatform === "apple_health" ? "Apple Health" : "Google Fit"}
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={disconnectHealthPlatform}
              >
                Disconnect
              </Button>
            </div>
            
            {healthData && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Health Data Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {healthData.steps && (
                    <div className="p-3 bg-slate-50 rounded-md">
                      <div className="text-sm text-muted-foreground">Steps (daily avg)</div>
                      <div className="text-lg font-medium">{healthData.steps.toLocaleString()}</div>
                    </div>
                  )}
                  {healthData.heartRate && (
                    <div className="p-3 bg-slate-50 rounded-md">
                      <div className="text-sm text-muted-foreground">Heart Rate (avg)</div>
                      <div className="text-lg font-medium">{healthData.heartRate.average} bpm</div>
                    </div>
                  )}
                  {healthData.sleepHours && (
                    <div className="p-3 bg-slate-50 rounded-md">
                      <div className="text-sm text-muted-foreground">Sleep (daily avg)</div>
                      <div className="text-lg font-medium">{healthData.sleepHours} hours</div>
                    </div>
                  )}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Last synced: {healthData.lastSynced.toLocaleString()}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-xs text-muted-foreground">
          Your data is encrypted and secure
        </div>
        {connectedPlatform !== "none" && (
          <HealthDataConsent />
        )}
      </CardFooter>
      
      {/* Connect Platform Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect Health Platform</DialogTitle>
            <DialogDescription>
              Choose a health platform to connect for personalized recommendations
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="apple_health" value={selectedPlatform} onValueChange={(v) => setSelectedPlatform(v as "apple_health" | "google_fit")}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="apple_health">Apple Health</TabsTrigger>
              <TabsTrigger value="google_fit">Google Fit</TabsTrigger>
            </TabsList>
            
            <TabsContent value="apple_health" className="space-y-4 mt-4">
              <div className="flex items-center gap-3">
                <div className="bg-black rounded-full p-2">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Apple Health</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect to your Apple Health data from your iPhone
                  </p>
                </div>
              </div>
              
              <div className="text-sm space-y-2">
                <p>By connecting, you'll allow PreventivePal to access:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Activity and exercise data</li>
                  <li>Heart rate and vital signs</li>
                  <li>Sleep information</li>
                  <li>Medical records (if available)</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="google_fit" className="space-y-4 mt-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 rounded-full p-2">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Google Fit</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect to your Google Fit data from Android devices
                  </p>
                </div>
              </div>
              
              <div className="text-sm space-y-2">
                <p>By connecting, you'll allow PreventivePal to access:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Activity and fitness tracking</li>
                  <li>Weight and body measurements</li>
                  <li>Nutrition information</li>
                  <li>Sleep patterns</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleConnect}
              disabled={isConnecting || !hasConsented}
              className="flex items-center gap-2"
            >
              {isConnecting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Smartphone className="h-4 w-4" />
              )}
              {isConnecting ? "Connecting..." : "Connect"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default HealthPlatformConnect;
