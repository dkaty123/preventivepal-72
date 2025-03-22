
import { useState } from "react";
import { useHealthData } from "@/contexts/HealthDataContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Shield, AlertTriangle, CheckCircle } from "lucide-react";

interface HealthDataConsentProps {
  onComplete?: () => void;
}

const HealthDataConsent = ({ onComplete }: HealthDataConsentProps) => {
  const { hasConsented, updateConsent } = useHealthData();
  const [open, setOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(hasConsented);
  
  const handleComplete = () => {
    updateConsent(isAgreed);
    setOpen(false);
    if (onComplete) {
      onComplete();
    }
  };
  
  return (
    <>
      <Button 
        variant={hasConsented ? "outline" : "default"} 
        onClick={() => setOpen(true)}
        className="flex items-center gap-2"
      >
        <Shield className="h-4 w-4" />
        {hasConsented ? "Update Data Sharing Preferences" : "Health Data Consent"}
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Health Data Sharing Consent</DialogTitle>
            <DialogDescription>
              Please review how we'll use your health data to provide personalized recommendations.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 my-2">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">What data will be accessed?</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Basic health metrics (height, weight, activity level)</li>
                <li>Heart rate and blood pressure readings</li>
                <li>Sleep patterns and duration</li>
                <li>Exercise and activity history</li>
                <li>Medical history from connected health platforms</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">How we'll use your data:</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Create personalized preventative care recommendations</li>
                <li>Suggest optimal check-up schedules based on your health profile</li>
                <li>Identify potential health risks before they become serious</li>
                <li>Track your progress towards health goals</li>
              </ul>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-md">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800">Important Privacy Information</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    Your health data is encrypted and stored securely. We never sell your personal information 
                    or share it with third parties without your explicit permission. You can revoke access 
                    at any time.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="consent-checkbox" 
                checked={isAgreed}
                onCheckedChange={(checked) => setIsAgreed(checked === true)}
              />
              <label
                htmlFor="consent-checkbox"
                className="text-sm leading-tight"
              >
                I consent to PreventivePal accessing and analyzing my health data to provide personalized 
                preventative care recommendations. I understand I can withdraw consent at any time.
              </label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleComplete}
              disabled={!isAgreed}
              className="flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              {hasConsented ? "Update Consent" : "Provide Consent"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HealthDataConsent;
