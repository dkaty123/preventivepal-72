
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

type HealthPlatform = "apple_health" | "google_fit" | "fhir" | "none";

type HealthDataContextType = {
  connectedPlatform: HealthPlatform;
  isConnecting: boolean;
  hasConsented: boolean;
  healthData: HealthDataType | null;
  connectHealthPlatform: (platform: HealthPlatform) => Promise<boolean>;
  disconnectHealthPlatform: () => void;
  refreshHealthData: () => Promise<void>;
  updateConsent: (consented: boolean) => void;
};

export interface HealthDataType {
  lastSynced: Date;
  steps?: number;
  heartRate?: {
    average: number;
    resting: number;
  };
  sleepHours?: number;
  weight?: number;
  bloodPressure?: {
    systolic: number;
    diastolic: number;
  };
  bloodGlucose?: number;
  cholesterol?: {
    total: number;
    hdl: number;
    ldl: number;
  };
}

const HealthDataContext = createContext<HealthDataContextType | undefined>(undefined);

export const HealthDataProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [connectedPlatform, setConnectedPlatform] = useState<HealthPlatform>("none");
  const [isConnecting, setIsConnecting] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  const [healthData, setHealthData] = useState<HealthDataType | null>(null);

  // Load saved platform and consent from localStorage on initial load
  useEffect(() => {
    const savedPlatform = localStorage.getItem("healthPlatform") as HealthPlatform;
    const savedConsent = localStorage.getItem("healthDataConsent") === "true";
    
    if (savedPlatform && savedPlatform !== "none") {
      setConnectedPlatform(savedPlatform);
    }
    
    if (savedConsent) {
      setHasConsented(true);
    }
    
    // Simulate loading existing health data from localStorage
    const savedHealthData = localStorage.getItem("healthData");
    if (savedHealthData) {
      try {
        setHealthData(JSON.parse(savedHealthData));
      } catch (error) {
        console.error("Failed to parse saved health data:", error);
      }
    }
  }, []);

  const connectHealthPlatform = async (platform: HealthPlatform): Promise<boolean> => {
    setIsConnecting(true);
    
    try {
      // This is a simulation of the API integration
      // In a real app, you would use the actual SDK/API for the platform
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      
      // Simulate successful connection
      setConnectedPlatform(platform);
      localStorage.setItem("healthPlatform", platform);
      
      // Generate mock health data for demo purposes
      if (hasConsented) {
        await refreshHealthData();
      }
      
      toast({
        title: "Connection Successful",
        description: `Your ${platform === "apple_health" ? "Apple Health" : "Google Fit"} account has been connected.`,
      });
      
      setIsConnecting(false);
      return true;
    } catch (error) {
      console.error("Failed to connect health platform:", error);
      
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: "We couldn't connect to the health platform. Please try again.",
      });
      
      setIsConnecting(false);
      return false;
    }
  };

  const disconnectHealthPlatform = () => {
    setConnectedPlatform("none");
    localStorage.removeItem("healthPlatform");
    setHealthData(null);
    localStorage.removeItem("healthData");
    
    toast({
      title: "Disconnected",
      description: "Your health data connection has been removed.",
    });
  };

  const refreshHealthData = async (): Promise<void> => {
    if (connectedPlatform === "none" || !hasConsented) {
      return;
    }
    
    setIsConnecting(true);
    
    try {
      // This is a simulation - in a real app, you would fetch actual data from the SDK/API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Mock data for demo
      const mockHealthData: HealthDataType = {
        lastSynced: new Date(),
        steps: Math.floor(Math.random() * 10000) + 2000,
        heartRate: {
          average: Math.floor(Math.random() * 20) + 65,
          resting: Math.floor(Math.random() * 10) + 60,
        },
        sleepHours: Math.floor(Math.random() * 3) + 6,
        weight: Math.floor(Math.random() * 30) + 60,
        bloodPressure: {
          systolic: Math.floor(Math.random() * 30) + 110,
          diastolic: Math.floor(Math.random() * 20) + 70,
        },
        cholesterol: {
          total: Math.floor(Math.random() * 100) + 150,
          hdl: Math.floor(Math.random() * 20) + 40,
          ldl: Math.floor(Math.random() * 50) + 90,
        },
      };
      
      setHealthData(mockHealthData);
      localStorage.setItem("healthData", JSON.stringify(mockHealthData));
      
      toast({
        title: "Health Data Updated",
        description: "Your health data has been synchronized.",
      });
    } catch (error) {
      console.error("Failed to refresh health data:", error);
      
      toast({
        variant: "destructive",
        title: "Sync Failed",
        description: "We couldn't sync your health data. Please try again.",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const updateConsent = (consented: boolean) => {
    setHasConsented(consented);
    localStorage.setItem("healthDataConsent", String(consented));
    
    if (consented && connectedPlatform !== "none") {
      refreshHealthData();
    }
  };

  return (
    <HealthDataContext.Provider
      value={{
        connectedPlatform,
        isConnecting,
        hasConsented,
        healthData,
        connectHealthPlatform,
        disconnectHealthPlatform,
        refreshHealthData,
        updateConsent,
      }}
    >
      {children}
    </HealthDataContext.Provider>
  );
};

export const useHealthData = (): HealthDataContextType => {
  const context = useContext(HealthDataContext);
  
  if (context === undefined) {
    throw new Error("useHealthData must be used within a HealthDataProvider");
  }
  
  return context;
};
