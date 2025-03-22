import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import ReminderCard from "./ReminderCard";
import { 
  Bell, Calendar, Settings, PlusCircle, ListChecks, Calendar as CalendarIcon, 
  CheckCircle, Shield, Stethoscope, Languages, Brain, MessageSquareQuestion, 
  Activity, HeartHandshake 
} from "lucide-react";
import { Link } from "react-router-dom";
import AppointmentCalendar from "./AppointmentCalendar";
import InsuranceBenefits from "./InsuranceBenefits";
import RecommendedCheckups from "./RecommendedCheckups";
import LanguageSelector from "./LanguageSelector";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type ReminderStatus = "upcoming" | "due" | "overdue" | "completed";

interface Reminder {
  id: string;
  title: string;
  date: string;
  type: string;
  status: ReminderStatus;
  description?: string;
}

const UserDashboard = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newReminder, setNewReminder] = useState<Omit<Reminder, "id">>({
    title: "",
    date: "",
    type: "",
    status: "upcoming",
    description: ""
  });

  const handleAddReminder = () => {
    if (!newReminder.title || !newReminder.date || !newReminder.type) {
      return;
    }
    
    addReminder(newReminder);
    setNewReminder({
      title: "",
      date: "",
      type: "",
      status: "upcoming",
      description: ""
    });
    setOpenAddDialog(false);
  };

  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: "1",
      title: "Annual Physical Exam",
      date: "June 15, 2023",
      type: "Primary Care",
      status: "upcoming",
      description: "Regular check-up with your primary care physician"
    },
    {
      id: "2",
      title: "Dental Cleaning",
      date: "July 3, 2023",
      type: "Dental",
      status: "due",
      description: "Regular dental cleaning and check-up"
    },
    {
      id: "3",
      title: "Flu Vaccination",
      date: "October 10, 2023",
      type: "Immunization",
      status: "upcoming"
    },
    {
      id: "4",
      title: "Eye Examination",
      date: "February 20, 2023",
      type: "Vision",
      status: "completed"
    },
    {
      id: "5",
      title: "Blood Test",
      date: "January 12, 2023",
      type: "Laboratory",
      status: "completed",
      description: "Complete blood count (CBC) and metabolic panel"
    }
  ]);

  const markComplete = (id: string) => {
    setReminders(
      reminders.map(reminder => 
        reminder.id === id 
          ? { ...reminder, status: "completed" as const } 
          : reminder
      )
    );
  };

  const addReminder = (reminder: Omit<Reminder, "id">) => {
    const newReminder = {
      ...reminder,
      id: Math.random().toString(36).substring(2, 9),
    };
    
    setReminders([...reminders, newReminder]);
  };

  const upcomingReminders = reminders.filter(reminder => 
    reminder.status === "upcoming" || reminder.status === "due" || reminder.status === "overdue"
  );
  
  const completedReminders = reminders.filter(reminder => 
    reminder.status === "completed"
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Track and manage your preventative healthcare journey.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1" asChild>
            <Link to="/calendar">
              <Calendar className="h-4 w-4" />
              <span>Calendar</span>
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1" asChild>
            <Link to="/profile">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </Button>
          <LanguageSelector variant="small" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Check-ups</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reminders.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last year</p>
            <Progress value={75} className="mt-3 h-1" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <ListChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedReminders.length}</div>
            <p className="text-xs text-muted-foreground">{Math.round((completedReminders.length / reminders.length) * 100)}% completion rate</p>
            <Progress value={(completedReminders.length / reminders.length) * 100} className="mt-3 h-1" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingReminders.length}</div>
            <p className="text-xs text-muted-foreground">Next in 2 weeks</p>
            <Progress value={(upcomingReminders.length / reminders.length) * 100} className="mt-3 h-1" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Benefits Used</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65%</div>
            <p className="text-xs text-muted-foreground">$650 of $1,000</p>
            <Progress value={65} className="mt-3 h-1" />
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">AI-Powered Features</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Health Insights</CardTitle>
                <Brain className="h-5 w-5 text-blue-500" />
              </div>
              <CardDescription>AI-powered health recommendations</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm">Get personalized health recommendations based on your health profile and history.</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/health-insights">
                  View Insights
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Symptom Checker</CardTitle>
                <MessageSquareQuestion className="h-5 w-5 text-emerald-500" />
              </div>
              <CardDescription>AI diagnostic assistant</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm">Describe your symptoms and get AI-powered insights about possible conditions.</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                <Link to="/symptom-checker">
                  Check Symptoms
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Appointment Optimizer</CardTitle>
                <Activity className="h-5 w-5 text-amber-500" />
              </div>
              <CardDescription>Premium feature</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm">Optimize your appointments to maximize insurance benefits and minimize costs.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Upgrade to Premium
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:w-auto lg:grid-cols-9">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="symptoms">Symptom Checker</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Upcoming Checkups</h2>
            <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-1">
                  <PlusCircle className="h-4 w-4" />
                  <span>Add Reminder</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Reminder</DialogTitle>
                  <DialogDescription>
                    Fill in the details to add a new healthcare reminder.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Reminder Title</Label>
                    <Input 
                      id="title" 
                      value={newReminder.title} 
                      onChange={e => setNewReminder({...newReminder, title: e.target.value})} 
                      placeholder="Annual Physical"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input 
                      id="date" 
                      value={newReminder.date} 
                      onChange={e => setNewReminder({...newReminder, date: e.target.value})} 
                      placeholder="June 15, 2023"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Type</Label>
                    <Input 
                      id="type" 
                      value={newReminder.type} 
                      onChange={e => setNewReminder({...newReminder, type: e.target.value})} 
                      placeholder="Primary Care"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      value={newReminder.status} 
                      onValueChange={(value: ReminderStatus) => 
                        setNewReminder({...newReminder, status: value})
                      }
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="due">Due</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea 
                      id="description" 
                      value={newReminder.description || ''} 
                      onChange={e => setNewReminder({...newReminder, description: e.target.value})} 
                      placeholder="Additional details about this reminder"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddReminder}>Add Reminder</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingReminders.map((reminder) => (
              <ReminderCard 
                key={reminder.id} 
                {...reminder} 
                onMarkComplete={() => markComplete(reminder.id)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Completed Checkups</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {completedReminders.map((reminder) => (
              <ReminderCard key={reminder.id} {...reminder} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="all" className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">All Checkups</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reminders.map((reminder) => (
              <ReminderCard 
                key={reminder.id} 
                {...reminder} 
                onMarkComplete={reminder.status !== "completed" ? () => markComplete(reminder.id) : undefined}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="calendar" className="mt-6" id="calendar">
          <AppointmentCalendar />
        </TabsContent>
        
        <TabsContent value="benefits" className="mt-6">
          <InsuranceBenefits />
        </TabsContent>
        
        <TabsContent value="recommended" className="mt-6">
          <RecommendedCheckups />
        </TabsContent>
        
        <TabsContent value="insights" className="mt-6">
          <AIHealthRecommendations />
        </TabsContent>
        
        <TabsContent value="symptoms" className="mt-6">
          <SymptomChecker />
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6 mt-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Dashboard Settings</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Customize your dashboard experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <Switch id="sms-notifications" />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="reminder-advance">Reminder Advance Notice</Label>
                    <Select defaultValue="7">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select days" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 day before</SelectItem>
                        <SelectItem value="3">3 days before</SelectItem>
                        <SelectItem value="7">1 week before</SelectItem>
                        <SelectItem value="14">2 weeks before</SelectItem>
                        <SelectItem value="30">1 month before</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-2">Language Preferences</h3>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Label>Display Language</Label>
                    <LanguageSelector />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;

