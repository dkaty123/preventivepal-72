import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Calendar as CalendarIcon, CheckCircle, Clock, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { useHealthData } from "@/contexts/HealthDataContext";

interface PreventativeEvent {
  id: string;
  title: string;
  date: Date;
  type: "checkup" | "screening" | "vaccination" | "lab" | "specialist";
  status: "upcoming" | "completed" | "missed";
  description: string;
  importance: "routine" | "recommended" | "high-priority";
  insuranceCoverage: number; // percentage
  notes?: string;
}

const PreventativeCareCalendar = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeView, setActiveView] = useState("calendar");
  const [isPremium, setIsPremium] = useState(false);
  
  const { healthData, connectedPlatform, hasConsented } = useHealthData();
  
  const [events, setEvents] = useState<PreventativeEvent[]>([
    {
      id: "1",
      title: "Annual Physical",
      date: new Date(new Date().setDate(new Date().getDate() + 15)),
      type: "checkup",
      status: "upcoming",
      description: "Comprehensive annual physical with blood pressure, cholesterol check",
      importance: "high-priority",
      insuranceCoverage: 100,
      notes: "Fast 12 hours before appointment for blood work"
    },
    {
      id: "2",
      title: "Mammogram",
      date: new Date(new Date().setDate(new Date().getDate() + 45)),
      type: "screening",
      status: "upcoming",
      description: "Breast cancer screening",
      importance: "high-priority",
      insuranceCoverage: 100
    },
    {
      id: "3",
      title: "Dental Cleaning",
      date: new Date(new Date().setDate(new Date().getDate() - 30)),
      type: "checkup",
      status: "completed",
      description: "Routine dental cleaning and examination",
      importance: "routine",
      insuranceCoverage: 80
    },
    {
      id: "4",
      title: "Flu Vaccination",
      date: new Date(new Date().setMonth(9, 15)), // October 15
      type: "vaccination",
      status: "upcoming",
      description: "Annual influenza vaccination",
      importance: "recommended",
      insuranceCoverage: 100
    },
    {
      id: "5",
      title: "A1C Blood Test",
      date: new Date(new Date().setDate(new Date().getDate() + 7)),
      type: "lab",
      status: "upcoming",
      description: "Diabetes screening test",
      importance: "recommended",
      insuranceCoverage: 100,
      notes: "Based on family history of diabetes"
    },
    {
      id: "6",
      title: "Skin Cancer Screening",
      date: new Date(new Date().setMonth(new Date().getMonth() + 3)),
      type: "screening",
      status: "upcoming",
      description: "Annual dermatology check for skin cancer",
      importance: "recommended",
      insuranceCoverage: 90
    },
    {
      id: "7",
      title: "Cholesterol Panel",
      date: new Date(new Date().setDate(new Date().getDate() - 90)),
      type: "lab",
      status: "completed",
      description: "Lipid panel blood test",
      importance: "high-priority",
      insuranceCoverage: 100,
      notes: "Follow-up recommended due to elevated LDL"
    }
  ]);
  
  useEffect(() => {
    if (healthData && connectedPlatform !== "none" && hasConsented) {
      const newEvents: PreventativeEvent[] = [];
      
      if (healthData.bloodPressure && healthData.bloodPressure.systolic > 130) {
        const checkupDate = new Date();
        checkupDate.setDate(checkupDate.getDate() + 14); // Two weeks from now
        
        newEvents.push({
          id: "health-bp-1",
          title: "Blood Pressure Check",
          date: checkupDate,
          type: "checkup",
          status: "upcoming",
          description: `Follow-up on elevated blood pressure (${healthData.bloodPressure.systolic}/${healthData.bloodPressure.diastolic} mmHg)`,
          importance: "high-priority",
          insuranceCoverage: 100,
          notes: "Based on your recent health data readings"
        });
      }
      
      if (healthData.cholesterol && healthData.cholesterol.total > 200) {
        const checkupDate = new Date();
        checkupDate.setDate(checkupDate.getDate() + 30); // Month from now
        
        newEvents.push({
          id: "health-chol-1",
          title: "Lipid Panel Follow-up",
          date: checkupDate,
          type: "lab",
          status: "upcoming",
          description: `Follow-up on elevated cholesterol levels (${healthData.cholesterol.total} mg/dL)`,
          importance: "recommended",
          insuranceCoverage: 90,
          notes: "Monitoring based on your connected health data"
        });
      }
      
      if (newEvents.length > 0) {
        setEvents(prevEvents => {
          const combinedEvents = [...prevEvents];
          
          newEvents.forEach(newEvent => {
            const existingIndex = combinedEvents.findIndex(event => 
              event.title.toLowerCase().includes(newEvent.title.toLowerCase().substring(0, 10))
            );
            
            if (existingIndex >= 0) {
              combinedEvents[existingIndex] = newEvent;
            } else {
              combinedEvents.push(newEvent);
            }
          });
          
          return combinedEvents;
        });
      }
    }
  }, [healthData, connectedPlatform, hasConsented]);
  
  const selectedDateEvents = events.filter(
    event => date && event.date.toDateString() === date.toDateString()
  );
  
  const upcomingEvents = [...events]
    .filter(event => event.status === "upcoming")
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  
  const eventDates = events.map(event => event.date);
  
  const markCompleted = (id: string) => {
    setEvents(
      events.map(event => 
        event.id === id 
          ? { ...event, status: "completed" as const } 
          : event
      )
    );
    
    toast({
      title: "Event Completed",
      description: "Your preventative care event has been marked as completed.",
    });
  };
  
  const togglePremium = () => {
    setIsPremium(!isPremium);
    toast({
      title: isPremium ? "Switched to Basic Mode" : "Premium Mode Activated",
      description: isPremium ? "Premium features are now hidden." : "You now have access to premium features.",
    });
  };

  const modifiers = {
    eventDay: eventDates
  };

  const modifiersStyles = {
    eventDay: { 
      fontWeight: 'bold',
      backgroundColor: 'rgba(59, 130, 246, 0.1)', // Light blue background
      border: '2px solid rgba(59, 130, 246, 0.5)', // Blue border
      borderRadius: '50%'
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
            <CalendarIcon className="h-6 w-6 text-brand-500" />
            <span>Preventative Care Planner</span>
          </h1>
          <p className="text-muted-foreground">
            Your personalized schedule of recommended preventative healthcare activities.
          </p>
        </div>
        
        <Button variant="outline" size="sm" onClick={togglePremium}>
          {isPremium ? "Disable Premium (Demo)" : "Enable Premium (Demo)"}
        </Button>
      </div>
      
      {!isPremium && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Basic Plan</AlertTitle>
          <AlertDescription>
            Upgrade to Premium for a comprehensive preventative care plan optimized for your health profile and insurance benefits.
            <Button variant="link" className="p-0 h-auto font-semibold">Upgrade Now</Button>
          </AlertDescription>
        </Alert>
      )}
      
      {connectedPlatform !== "none" && hasConsented && healthData && (
        <Alert className="bg-brand-50 border-brand-200">
          <Info className="h-4 w-4 text-brand-500" />
          <AlertTitle className="text-brand-700">Health Data Connected</AlertTitle>
          <AlertDescription className="text-brand-600">
            Your preventative care schedule has been optimized based on your connected health data from 
            {connectedPlatform === "apple_health" ? " Apple Health" : " Google Fit"}.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Care Calendar</CardTitle>
              <CardDescription>Track your preventative care events</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border w-full"
                modifiers={modifiers}
                modifiersStyles={modifiersStyles}
              />
            </CardContent>
            <CardFooter>
              <div className="w-full text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span>Event Date</span>
                  </div>
                  <span>{eventDates.length} scheduled</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="calendar" className="w-full" value={activeView} onValueChange={setActiveView}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="calendar">Selected Day</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="calendar" className="space-y-4 mt-4">
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Events for {date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </h3>
                  {selectedDateEvents.map(event => (
                    <Card key={event.id} className={`border-l-4 ${
                      event.importance === 'high-priority' ? 'border-l-red-500'
                      : event.importance === 'recommended' ? 'border-l-amber-500'
                      : 'border-l-blue-500'
                    }`}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <Badge 
                            variant={
                              event.status === 'completed' ? 'secondary' 
                              : event.importance === 'high-priority' ? 'destructive' 
                              : 'default'
                            }
                          >
                            {event.status === 'completed' ? 'Completed' : event.importance === 'high-priority' ? 'High Priority' : 'Recommended'}
                          </Badge>
                        </div>
                        <CardDescription>{event.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>Type: {event.type}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Info className="h-4 w-4 text-muted-foreground" />
                            <span>Coverage: {event.insuranceCoverage}%</span>
                          </div>
                          {event.notes && (
                            <div className="col-span-2 mt-2 bg-slate-50 p-2 rounded-md text-xs">
                              <strong>Notes:</strong> {event.notes}
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter>
                        {event.status !== 'completed' ? (
                          <Button 
                            className="w-full"
                            onClick={() => markCompleted(event.id)}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark as Completed
                          </Button>
                        ) : (
                          <div className="w-full flex items-center justify-center gap-2 text-sm text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span>Completed</span>
                          </div>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No events scheduled for this date</p>
                  <Button className="mt-4" variant="outline">
                    Schedule New Event
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="upcoming" className="space-y-4 mt-4">
              <h3 className="text-lg font-medium">Upcoming Preventative Care</h3>
              {upcomingEvents.length > 0 ? (
                <div className="space-y-4">
                  {upcomingEvents.slice(0, 5).map(event => (
                    <Card key={event.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4">
                      <div className="flex items-start gap-3">
                        <div className={`rounded-full p-2 ${
                          event.importance === 'high-priority' ? 'bg-red-100 text-red-600'
                          : event.importance === 'recommended' ? 'bg-amber-100 text-amber-600'
                          : 'bg-blue-100 text-blue-600'
                        }`}>
                          <CalendarIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline">{event.type}</Badge>
                            <Badge variant="outline">{event.insuranceCoverage}% covered</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-sm font-medium">
                          {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <Badge variant={
                          Math.floor((event.date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) < 7
                            ? 'destructive'
                            : 'secondary'
                        }>
                          {Math.floor((event.date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days away
                        </Badge>
                        <Button size="sm" className="w-full sm:w-auto">Schedule</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No upcoming events</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="recommendations" className="space-y-4 mt-4">
              <h3 className="text-lg font-medium">Recommended for Your Health Profile</h3>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Personalized Prevention Plan</CardTitle>
                    <CardDescription>Based on your age, gender, and health history</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Annual Physical Exam</p>
                          <p className="text-sm text-muted-foreground">Recommended every 12 months</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Mammogram</p>
                          <p className="text-sm text-muted-foreground">Recommended annually for women 40+</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Blood Glucose Test</p>
                          <p className="text-sm text-muted-foreground">Recommended annually due to family history</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Dental Cleaning</p>
                          <p className="text-sm text-muted-foreground">Recommended every 6 months</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Eye Examination</p>
                          <p className="text-sm text-muted-foreground">Recommended every 12 months</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                  {isPremium && (
                    <CardFooter>
                      <Button className="w-full">Create Full Prevention Schedule</Button>
                    </CardFooter>
                  )}
                </Card>
                
                {!isPremium && (
                  <Card className="bg-gradient-to-br from-brand-50 to-slate-50 border border-brand-100">
                    <CardHeader>
                      <CardTitle className="text-lg">Premium Prevention Features</CardTitle>
                      <CardDescription>
                        Unlock comprehensive preventative care management
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CalendarIcon className="h-4 w-4 text-brand-500 mt-0.5" />
                          <span>Advanced preventative care scheduling with reminders</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-brand-500 mt-0.5" />
                          <span>Insurance benefit optimization for preventative services</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-brand-500 mt-0.5" />
                          <span>Multi-year prevention planning based on age and risk factors</span>
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PreventativeCareCalendar;
