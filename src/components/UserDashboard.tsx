
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import ReminderCard from "./ReminderCard";
import { Bell, Calendar, Settings, PlusCircle, ListChecks } from "lucide-react";

const UserDashboard = () => {
  // Demo data
  const upcomingReminders = [
    {
      title: "Annual Physical Exam",
      date: "June 15, 2023",
      type: "Primary Care",
      status: "upcoming" as const,
      description: "Regular check-up with your primary care physician"
    },
    {
      title: "Dental Cleaning",
      date: "July 3, 2023",
      type: "Dental",
      status: "due" as const,
      description: "Regular dental cleaning and check-up"
    },
    {
      title: "Flu Vaccination",
      date: "October 10, 2023",
      type: "Immunization",
      status: "upcoming" as const
    }
  ];

  const completedReminders = [
    {
      title: "Eye Examination",
      date: "February 20, 2023",
      type: "Vision",
      status: "completed" as const
    },
    {
      title: "Blood Test",
      date: "January 12, 2023",
      type: "Laboratory",
      status: "completed" as const,
      description: "Complete blood count (CBC) and metabolic panel"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Track and manage your preventative healthcare journey.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Calendar</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Check-ups</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
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
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">75% completion rate</p>
            <Progress value={75} className="mt-3 h-1" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Next in 2 weeks</p>
            <Progress value={33} className="mt-3 h-1" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Benefits Used</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65%</div>
            <p className="text-xs text-muted-foreground">$650 of $1,000</p>
            <Progress value={65} className="mt-3 h-1" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Upcoming Checkups</h2>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              <span>Add Reminder</span>
            </Button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingReminders.map((reminder, index) => (
              <ReminderCard key={index} {...reminder} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="completed" className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Completed Checkups</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {completedReminders.map((reminder, index) => (
              <ReminderCard key={index} {...reminder} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="all" className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">All Checkups</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...upcomingReminders, ...completedReminders].map((reminder, index) => (
              <ReminderCard key={index} {...reminder} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
