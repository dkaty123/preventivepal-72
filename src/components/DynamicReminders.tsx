
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, Bell, Clock, CalendarClock, Check, Trash2, 
  Plus, AlarmClock, Settings, PhoneCall, MessageCircle, Mail, BellRing
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type ReminderUrgency = "low" | "medium" | "high" | "emergency";

interface DynamicReminder {
  id: string;
  title: string;
  description?: string;
  date: string;
  time?: string;
  urgency: ReminderUrgency;
  category: "checkup" | "medication" | "vaccination" | "follow-up" | "lab" | "other";
  notificationFrequency: string;
  notificationMethods: Array<"push" | "email" | "sms">;
  snoozeCount: number;
  completed: boolean;
}

const DynamicReminders = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false
  });
  
  // Mock reminders with varying urgency levels
  const [reminders, setReminders] = useState<DynamicReminder[]>([
    {
      id: "1",
      title: "Annual Flu Vaccination",
      description: "Due based on your health profile and local flu activity",
      date: "2023-09-15",
      time: "13:30",
      urgency: "medium",
      category: "vaccination",
      notificationFrequency: "Weekly until 3 days before, then daily",
      notificationMethods: ["push", "email"],
      snoozeCount: 0,
      completed: false
    },
    {
      id: "2",
      title: "Medication: Refill Prescription",
      description: "Your prescription will run out in 5 days",
      date: "2023-09-10",
      time: "09:00",
      urgency: "high",
      category: "medication",
      notificationFrequency: "Daily until completed",
      notificationMethods: ["push", "email", "sms"],
      snoozeCount: 1,
      completed: false
    },
    {
      id: "3",
      title: "Blood Test Results Follow-up",
      description: "Discuss recent abnormal lab results with your doctor",
      date: "2023-09-25",
      time: "14:45",
      urgency: "medium",
      category: "follow-up",
      notificationFrequency: "Weekly until 1 week before, then every 2 days",
      notificationMethods: ["push", "email"],
      snoozeCount: 0,
      completed: false
    },
    {
      id: "4",
      title: "Dental Cleaning",
      description: "Regular 6-month dental checkup and cleaning",
      date: "2023-10-05",
      time: "10:15",
      urgency: "low",
      category: "checkup",
      notificationFrequency: "Once a month until 2 weeks before, then weekly",
      notificationMethods: ["push"],
      snoozeCount: 0,
      completed: false
    },
    {
      id: "5",
      title: "Take Blood Pressure Medication",
      description: "Critical: Your doctor flagged this as high priority",
      date: "2023-09-05",
      time: "08:00",
      urgency: "emergency",
      category: "medication",
      notificationFrequency: "Multiple times daily until taken",
      notificationMethods: ["push", "sms", "email"],
      snoozeCount: 2,
      completed: false
    }
  ]);
  
  // New reminder template
  const [newReminder, setNewReminder] = useState<Omit<DynamicReminder, "id" | "snoozeCount" | "completed">>({
    title: "",
    description: "",
    date: "",
    time: "",
    urgency: "medium",
    category: "checkup",
    notificationFrequency: "Weekly",
    notificationMethods: ["push"]
  });
  
  // Add a new reminder
  const handleAddReminder = () => {
    if (!newReminder.title || !newReminder.date) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    const reminderToAdd: DynamicReminder = {
      ...newReminder,
      id: Math.random().toString(36).substring(2, 9),
      snoozeCount: 0,
      completed: false
    };
    
    setReminders([...reminders, reminderToAdd]);
    
    // Reset form and close dialog
    setNewReminder({
      title: "",
      description: "",
      date: "",
      time: "",
      urgency: "medium",
      category: "checkup",
      notificationFrequency: "Weekly",
      notificationMethods: ["push"]
    });
    
    setOpenAddDialog(false);
    
    toast({
      title: "Reminder Added",
      description: "Your new reminder has been created with dynamic urgency.",
    });
  };
  
  // Mark a reminder as completed
  const markAsCompleted = (id: string) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id ? { ...reminder, completed: true } : reminder
    ));
    
    toast({
      title: "Reminder Completed",
      description: "Great job! The reminder has been marked as completed.",
    });
  };
  
  // Delete a reminder
  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
    
    toast({
      title: "Reminder Deleted",
      description: "The reminder has been permanently removed.",
    });
  };
  
  // Snooze a reminder
  const snoozeReminder = (id: string) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id 
        ? { 
            ...reminder, 
            snoozeCount: reminder.snoozeCount + 1,
            date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]
          } 
        : reminder
    ));
    
    toast({
      title: "Reminder Snoozed",
      description: "The reminder has been snoozed for 24 hours.",
    });
  };
  
  // Toggle notification method
  const toggleNotificationMethod = (method: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [method]: !notifications[method]
    });
    
    toast({
      title: `${method.charAt(0).toUpperCase() + method.slice(1)} Notifications ${notifications[method] ? 'Disabled' : 'Enabled'}`,
      description: `You will ${notifications[method] ? 'no longer' : 'now'} receive ${method} notifications for reminders.`,
    });
  };
  
  // Helper function to get urgency styling
  const getUrgencyStyling = (urgency: ReminderUrgency) => {
    switch (urgency) {
      case "low":
        return {
          badge: <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">Low</Badge>,
          border: "border-blue-200",
          bg: "bg-blue-50",
          icon: <Clock className="h-5 w-5 text-blue-500" />
        };
      case "medium":
        return {
          badge: <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">Medium</Badge>,
          border: "border-amber-200",
          bg: "bg-amber-50",
          icon: <Bell className="h-5 w-5 text-amber-500" />
        };
      case "high":
        return {
          badge: <Badge variant="destructive">High</Badge>,
          border: "border-red-200",
          bg: "bg-red-50",
          icon: <AlertTriangle className="h-5 w-5 text-red-500" />
        };
      case "emergency":
        return {
          badge: <Badge className="bg-red-500 text-white hover:bg-red-600">Emergency</Badge>,
          border: "border-red-300",
          bg: "bg-red-100",
          icon: <AlertTriangle className="h-5 w-5 text-red-600" />
        };
      default:
        return {
          badge: <Badge>Unknown</Badge>,
          border: "border-gray-200",
          bg: "bg-gray-50",
          icon: <Bell className="h-5 w-5 text-gray-500" />
        };
    }
  };
  
  // Helper function to get category icon
  const getCategoryIcon = (category: DynamicReminder["category"]) => {
    switch (category) {
      case "checkup":
        return <CalendarClock className="h-4 w-4 text-muted-foreground" />;
      case "medication":
        return <AlarmClock className="h-4 w-4 text-muted-foreground" />;
      case "vaccination":
        return <Check className="h-4 w-4 text-muted-foreground" />;
      case "follow-up":
        return <PhoneCall className="h-4 w-4 text-muted-foreground" />;
      case "lab":
        return <Bell className="h-4 w-4 text-muted-foreground" />;
      case "other":
        return <Bell className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };
  
  // Sort reminders by urgency and date
  const sortedReminders = [...reminders].sort((a, b) => {
    const urgencyOrder = { emergency: 0, high: 1, medium: 2, low: 3 };
    const urgencyDiff = urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
    if (urgencyDiff !== 0) return urgencyDiff;
    
    // Then sort by date
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  
  const upcomingReminders = sortedReminders.filter(r => !r.completed);
  const completedReminders = sortedReminders.filter(r => r.completed);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <BellRing className="h-5 w-5 text-primary" />
            Dynamic Urgency Reminders
          </h2>
          <p className="text-muted-foreground text-sm">
            Smart notifications that adapt based on urgency and priority
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
            <DialogTrigger asChild>
              <Button size="sm" className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span>Add Reminder</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Reminder</DialogTitle>
                <DialogDescription>
                  Add a health reminder with dynamic urgency-based notifications.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Reminder Title</Label>
                  <Input 
                    id="title" 
                    placeholder="E.g., Annual Physical Exam"
                    value={newReminder.title}
                    onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Input 
                    id="description" 
                    placeholder="Additional details"
                    value={newReminder.description}
                    onChange={(e) => setNewReminder({...newReminder, description: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input 
                      id="date" 
                      type="date"
                      value={newReminder.date}
                      onChange={(e) => setNewReminder({...newReminder, date: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time (Optional)</Label>
                    <Input 
                      id="time" 
                      type="time"
                      value={newReminder.time}
                      onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <Select 
                    value={newReminder.urgency} 
                    onValueChange={(value: ReminderUrgency) => setNewReminder({...newReminder, urgency: value})}
                  >
                    <SelectTrigger id="urgency">
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Occasional Reminders</SelectItem>
                      <SelectItem value="medium">Medium - Regular Reminders</SelectItem>
                      <SelectItem value="high">High - Frequent Reminders</SelectItem>
                      <SelectItem value="emergency">Emergency - Persistent Alerts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={newReminder.category} 
                    onValueChange={(value: DynamicReminder["category"]) => setNewReminder({...newReminder, category: value})}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checkup">General Checkup</SelectItem>
                      <SelectItem value="medication">Medication</SelectItem>
                      <SelectItem value="vaccination">Vaccination</SelectItem>
                      <SelectItem value="follow-up">Follow-up Appointment</SelectItem>
                      <SelectItem value="lab">Lab Test</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="notifications">Notification Methods</Label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="push-notification" 
                        checked={newReminder.notificationMethods.includes("push")}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewReminder({
                              ...newReminder, 
                              notificationMethods: [...newReminder.notificationMethods, "push"]
                            });
                          } else {
                            setNewReminder({
                              ...newReminder, 
                              notificationMethods: newReminder.notificationMethods.filter(m => m !== "push")
                            });
                          }
                        }}
                      />
                      <Label htmlFor="push-notification">App</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="email-notification" 
                        checked={newReminder.notificationMethods.includes("email")}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewReminder({
                              ...newReminder, 
                              notificationMethods: [...newReminder.notificationMethods, "email"]
                            });
                          } else {
                            setNewReminder({
                              ...newReminder, 
                              notificationMethods: newReminder.notificationMethods.filter(m => m !== "email")
                            });
                          }
                        }}
                      />
                      <Label htmlFor="email-notification">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="sms-notification" 
                        checked={newReminder.notificationMethods.includes("sms")}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewReminder({
                              ...newReminder, 
                              notificationMethods: [...newReminder.notificationMethods, "sms"]
                            });
                          } else {
                            setNewReminder({
                              ...newReminder, 
                              notificationMethods: newReminder.notificationMethods.filter(m => m !== "sms")
                            });
                          }
                        }}
                      />
                      <Label htmlFor="sms-notification">SMS</Label>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddReminder}>Create Reminder</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" size="sm" asChild>
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Push Notifications</CardTitle>
              <Switch 
                checked={notifications.push} 
                onCheckedChange={() => toggleNotificationMethod("push")}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Enabled</div>
            <p className="text-xs text-muted-foreground">For all urgency levels</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Email Alerts</CardTitle>
              <Switch 
                checked={notifications.email} 
                onCheckedChange={() => toggleNotificationMethod("email")}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Enabled</div>
            <p className="text-xs text-muted-foreground">For medium+ urgency</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">SMS Notifications</CardTitle>
              <Switch 
                checked={notifications.sms} 
                onCheckedChange={() => toggleNotificationMethod("sms")}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Disabled</div>
            <p className="text-xs text-muted-foreground">Enable for high urgency items</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Emergency Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1 Contact</div>
            <p className="text-xs text-muted-foreground">For emergency-level reminders</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Reminders</TabsTrigger>
          <TabsTrigger value="high">High Urgency</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <div className="space-y-4">
            {upcomingReminders.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Bell className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <h3 className="text-lg font-medium">No reminders</h3>
                <p className="max-w-md mx-auto mt-2">
                  You don't have any active reminders. Add one to get started.
                </p>
                <Button className="mt-4" onClick={() => setOpenAddDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Reminder
                </Button>
              </div>
            ) : (
              upcomingReminders.map((reminder) => {
                const styling = getUrgencyStyling(reminder.urgency);
                return (
                  <Card 
                    key={reminder.id} 
                    className={`border-l-4 ${styling.border} ${
                      reminder.urgency === 'emergency' ? 'animate-pulse' : ''
                    }`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          {styling.icon}
                          <CardTitle className="ml-2 text-lg">{reminder.title}</CardTitle>
                        </div>
                        {styling.badge}
                      </div>
                      {reminder.description && (
                        <CardDescription>{reminder.description}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        <div className="flex items-center text-sm">
                          <CalendarClock className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span>
                            {new Date(reminder.date).toLocaleDateString()} 
                            {reminder.time && ` at ${reminder.time}`}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          {getCategoryIcon(reminder.category)}
                          <span className="ml-1 capitalize">{reminder.category}</span>
                        </div>
                        
                        <div className="text-sm text-muted-foreground mt-1">
                          <p><strong>Notification:</strong> {reminder.notificationFrequency}</p>
                          <div className="flex items-center mt-1">
                            <strong className="mr-2">Via:</strong>
                            <div className="flex space-x-2">
                              {reminder.notificationMethods.includes("push") && (
                                <Bell className="h-4 w-4" />
                              )}
                              {reminder.notificationMethods.includes("email") && (
                                <Mail className="h-4 w-4" />
                              )}
                              {reminder.notificationMethods.includes("sms") && (
                                <MessageCircle className="h-4 w-4" />
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {reminder.snoozeCount > 0 && (
                          <p className="text-xs text-amber-600">
                            Snoozed {reminder.snoozeCount} {reminder.snoozeCount === 1 ? 'time' : 'times'}
                          </p>
                        )}
                        
                        <div className="flex gap-2 mt-2">
                          <Button 
                            size="sm" 
                            onClick={() => markAsCompleted(reminder.id)}
                          >
                            <Check className="mr-1 h-4 w-4" />
                            Complete
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => snoozeReminder(reminder.id)}
                          >
                            Snooze 24h
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => deleteReminder(reminder.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="high" className="mt-4">
          <div className="space-y-4">
            {upcomingReminders.filter(r => r.urgency === "high" || r.urgency === "emergency").length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <h3 className="text-lg font-medium">No high urgency reminders</h3>
                <p className="max-w-md mx-auto mt-2">
                  You don't have any high urgency reminders at the moment.
                </p>
              </div>
            ) : (
              upcomingReminders
                .filter(r => r.urgency === "high" || r.urgency === "emergency")
                .map((reminder) => {
                  const styling = getUrgencyStyling(reminder.urgency);
                  return (
                    <Card 
                      key={reminder.id} 
                      className={`border-l-4 ${styling.border} ${
                        reminder.urgency === 'emergency' ? 'animate-pulse' : ''
                      }`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            {styling.icon}
                            <CardTitle className="ml-2 text-lg">{reminder.title}</CardTitle>
                          </div>
                          {styling.badge}
                        </div>
                        {reminder.description && (
                          <CardDescription>{reminder.description}</CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-2">
                          <div className="flex items-center text-sm">
                            <CalendarClock className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span>
                              {new Date(reminder.date).toLocaleDateString()} 
                              {reminder.time && ` at ${reminder.time}`}
                            </span>
                          </div>
                          
                          <div className="flex items-center text-sm">
                            {getCategoryIcon(reminder.category)}
                            <span className="ml-1 capitalize">{reminder.category}</span>
                          </div>
                          
                          <div className="text-sm text-muted-foreground mt-1">
                            <p><strong>Notification:</strong> {reminder.notificationFrequency}</p>
                            <div className="flex items-center mt-1">
                              <strong className="mr-2">Via:</strong>
                              <div className="flex space-x-2">
                                {reminder.notificationMethods.includes("push") && (
                                  <Bell className="h-4 w-4" />
                                )}
                                {reminder.notificationMethods.includes("email") && (
                                  <Mail className="h-4 w-4" />
                                )}
                                {reminder.notificationMethods.includes("sms") && (
                                  <MessageCircle className="h-4 w-4" />
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {reminder.snoozeCount > 0 && (
                            <p className="text-xs text-amber-600">
                              Snoozed {reminder.snoozeCount} {reminder.snoozeCount === 1 ? 'time' : 'times'}
                            </p>
                          )}
                          
                          <div className="flex gap-2 mt-2">
                            <Button 
                              size="sm" 
                              onClick={() => markAsCompleted(reminder.id)}
                            >
                              <Check className="mr-1 h-4 w-4" />
                              Complete
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => snoozeReminder(reminder.id)}
                            >
                              Snooze 24h
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => deleteReminder(reminder.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          {completedReminders.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Check className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <h3 className="text-lg font-medium">No completed reminders</h3>
              <p className="max-w-md mx-auto mt-2">
                You haven't completed any reminders yet. Mark reminders as complete to see them here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {completedReminders.map((reminder) => {
                return (
                  <Card key={reminder.id} className="border-l-4 border-green-200 opacity-75">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <Check className="h-5 w-5 text-green-500" />
                          <CardTitle className="ml-2 text-lg line-through">{reminder.title}</CardTitle>
                        </div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                          Completed
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        <div className="flex items-center text-sm">
                          <CalendarClock className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span>
                            {new Date(reminder.date).toLocaleDateString()} 
                            {reminder.time && ` at ${reminder.time}`}
                          </span>
                        </div>
                        
                        <div className="flex gap-2 mt-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => deleteReminder(reminder.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="settings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you receive reminders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Notification Methods</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                    </div>
                    <Switch 
                      id="push-notifications" 
                      checked={notifications.push} 
                      onCheckedChange={() => toggleNotificationMethod("push")}
                    />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                    </div>
                    <Switch 
                      id="email-notifications" 
                      checked={notifications.email} 
                      onCheckedChange={() => toggleNotificationMethod("email")}
                    />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    </div>
                    <Switch 
                      id="sms-notifications" 
                      checked={notifications.sms} 
                      onCheckedChange={() => toggleNotificationMethod("sms")}
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-3">Urgency Settings</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <div className="bg-blue-100 text-blue-800 p-1 rounded-full mr-2">
                        <Clock className="h-4 w-4" />
                      </div>
                      Low Urgency
                    </h4>
                    <Select defaultValue="monthly">
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Reminders</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <div className="bg-amber-100 text-amber-800 p-1 rounded-full mr-2">
                        <Bell className="h-4 w-4" />
                      </div>
                      Medium Urgency
                    </h4>
                    <Select defaultValue="weekly">
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="twice-weekly">Twice Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <div className="bg-red-100 text-red-800 p-1 rounded-full mr-2">
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      High Urgency
                    </h4>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="twice-weekly">Twice Weekly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="twice-daily">Twice Daily</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <div className="bg-red-500 text-white p-1 rounded-full mr-2">
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      Emergency
                    </h4>
                    <Select defaultValue="hourly">
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="twice-daily">Twice Daily</SelectItem>
                        <SelectItem value="four-times-daily">Four Times Daily</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-3">Emergency Contacts</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">John Doe (Emergency Contact)</p>
                      <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Emergency Contact
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DynamicReminders;
