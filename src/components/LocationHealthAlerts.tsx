
import { useState, useEffect } from "react";
import { AlertCircle, MapPin, Wind, Thermometer } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface HealthAlert {
  id: string;
  title: string;
  description: string;
  type: "air-quality" | "disease-outbreak" | "weather" | "advisory";
  severity: "low" | "medium" | "high";
  location: string;
  date: string;
}

const LocationHealthAlerts = () => {
  const [locationPermission, setLocationPermission] = useState<boolean | "pending">(false);
  const [alerts, setAlerts] = useState<HealthAlert[]>([]);
  const [loading, setLoading] = useState(false);

  // Request location permission
  const requestLocationPermission = () => {
    setLocationPermission("pending");
    if (!navigator.geolocation) {
      toast({
        title: "Not Supported",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive",
      });
      setLocationPermission(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationPermission(true);
        fetchLocalHealthAlerts(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
        toast({
          title: "Location Access Denied",
          description: "We need your location to provide relevant health alerts.",
          variant: "destructive",
        });
        setLocationPermission(false);
      }
    );
  };

  // Fetch local health alerts based on location
  const fetchLocalHealthAlerts = async (latitude: number, longitude: number) => {
    setLoading(true);
    
    try {
      // In a real app, this would be an API call to a health alerts service
      // For demo purposes, we'll simulate with mock data
      
      console.log(`Fetching health alerts for coordinates: ${latitude}, ${longitude}`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data based on coordinates
      const mockAlerts: HealthAlert[] = [
        {
          id: "1",
          title: "Poor Air Quality Today",
          description: "Air quality index is above 150. People with respiratory conditions should limit outdoor activity.",
          type: "air-quality",
          severity: "medium",
          location: "Your Area",
          date: new Date().toLocaleDateString()
        },
        {
          id: "2",
          title: "Flu Season Alert",
          description: "Increased flu activity reported in your area. Consider getting a flu shot if you haven't already.",
          type: "disease-outbreak",
          severity: "medium",
          location: "Your Region",
          date: new Date().toLocaleDateString()
        },
        {
          id: "3",
          title: "Heat Advisory",
          description: "Temperatures expected to exceed 90°F. Stay hydrated and limit outdoor activities during peak hours.",
          type: "weather",
          severity: "high",
          location: "Your City",
          date: new Date().toLocaleDateString()
        }
      ];
      
      setAlerts(mockAlerts);
    } catch (error) {
      console.error("Error fetching health alerts:", error);
      toast({
        title: "Failed to Load Alerts",
        description: "We couldn't retrieve health alerts for your location.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Get the proper icon for each alert type
  const getAlertIcon = (type: HealthAlert["type"]) => {
    switch (type) {
      case "air-quality":
        return <Wind className="h-5 w-5 text-amber-500" />;
      case "disease-outbreak":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "weather":
        return <Thermometer className="h-5 w-5 text-blue-500" />;
      case "advisory":
        return <AlertCircle className="h-5 w-5 text-purple-500" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  // Get the proper style for severity
  const getSeverityStyle = (severity: HealthAlert["severity"]) => {
    switch (severity) {
      case "low":
        return "border-blue-300 bg-blue-50";
      case "medium":
        return "border-amber-300 bg-amber-50";
      case "high":
        return "border-red-300 bg-red-50";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center">
          <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
          Location-Based Health Alerts
        </h2>

        {!locationPermission && (
          <Button 
            onClick={requestLocationPermission} 
            size="sm" 
            variant="outline"
            disabled={locationPermission === "pending"}
          >
            {locationPermission === "pending" ? "Requesting..." : "Enable Location"}
          </Button>
        )}
      </div>

      {locationPermission === true ? (
        <>
          {loading ? (
            <div className="flex justify-center my-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : alerts.length > 0 ? (
            <div className="space-y-3">
              {alerts.map((alert) => (
                <Alert key={alert.id} className={`${getSeverityStyle(alert.severity)}`}>
                  <div className="flex items-start">
                    {getAlertIcon(alert.type)}
                    <div className="ml-3">
                      <AlertTitle className="font-medium">{alert.title}</AlertTitle>
                      <AlertDescription>
                        {alert.description}
                        <div className="mt-1 text-xs text-muted-foreground">
                          {alert.location} • {alert.date}
                        </div>
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              No active health alerts for your location.
            </div>
          )}
        </>
      ) : (
        <div className="bg-muted p-4 rounded-lg">
          <p className="text-sm text-center text-muted-foreground">
            Enable location access to receive health alerts relevant to your area, such as disease 
            outbreaks, air quality warnings, and local health advisories.
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationHealthAlerts;
