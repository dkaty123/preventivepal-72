
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from "recharts";
import { 
  Target, TrendingUp, Weight, Heart, Brain, Zap, 
  PlusCircle, Calendar, Medal, CheckCircle2, ChevronRight 
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

interface HealthGoal {
  id: string;
  title: string;
  category: "weight" | "fitness" | "sleep" | "nutrition" | "mental" | "medical";
  target: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  progress: number;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "paused";
  history: {
    date: string;
    value: number;
  }[];
}

const HealthGoalTracking = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<HealthGoal | null>(null);
  
  // Mock health goals
  const [goals, setGoals] = useState<HealthGoal[]>([
    {
      id: "1",
      title: "Weight Loss",
      category: "weight",
      target: "Lose 5kg",
      currentValue: 78,
      targetValue: 73,
      unit: "kg",
      progress: 40,
      startDate: "2023-07-01",
      endDate: "2023-09-30",
      status: "active",
      history: [
        { date: "Jul 1", value: 80 },
        { date: "Jul 15", value: 79.2 },
        { date: "Aug 1", value: 78.5 },
        { date: "Aug 15", value: 78 }
      ]
    },
    {
      id: "2",
      title: "Increase Daily Steps",
      category: "fitness",
      target: "Reach 10,000 steps daily",
      currentValue: 7500,
      targetValue: 10000,
      unit: "steps",
      progress: 75,
      startDate: "2023-08-01",
      endDate: "2023-10-31",
      status: "active",
      history: [
        { date: "Aug 1", value: 5000 },
        { date: "Aug 8", value: 5500 },
        { date: "Aug 15", value: 6200 },
        { date: "Aug 22", value: 7000 },
        { date: "Aug 29", value: 7500 }
      ]
    },
    {
      id: "3",
      title: "Improve Sleep Quality",
      category: "sleep",
      target: "Sleep 8 hours nightly",
      currentValue: 6.5,
      targetValue: 8,
      unit: "hours",
      progress: 60,
      startDate: "2023-07-15",
      endDate: "2023-09-15",
      status: "active",
      history: [
        { date: "Jul 15", value: 5.5 },
        { date: "Jul 22", value: 6 },
        { date: "Jul 29", value: 6.2 },
        { date: "Aug 5", value: 6.4 },
        { date: "Aug 12", value: 6.5 }
      ]
    },
    {
      id: "4",
      title: "Reduce Blood Pressure",
      category: "medical",
      target: "Below 120/80",
      currentValue: 130,
      targetValue: 120,
      unit: "systolic",
      progress: 50,
      startDate: "2023-06-01",
      endDate: "2023-12-31",
      status: "active",
      history: [
        { date: "Jun 1", value: 140 },
        { date: "Jul 1", value: 135 },
        { date: "Aug 1", value: 130 }
      ]
    }
  ]);
  
  // New goal template
  const [newGoal, setNewGoal] = useState<Omit<HealthGoal, "id" | "history" | "progress">>({
    title: "",
    category: "weight",
    target: "",
    currentValue: 0,
    targetValue: 0,
    unit: "",
    startDate: new Date().toISOString().split('T')[0],
    endDate: "",
    status: "active"
  });
  
  // Handle create new goal
  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.target || !newGoal.unit || !newGoal.endDate) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Calculate progress based on current and target values
    const progress = Math.round(((newGoal.currentValue - 0) / (newGoal.targetValue - 0)) * 100);
    
    const goalToAdd: HealthGoal = {
      ...newGoal,
      id: Math.random().toString(36).substring(2, 9),
      progress: Math.min(100, Math.max(0, progress)),
      history: [
        { date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), value: newGoal.currentValue }
      ]
    };
    
    setGoals([...goals, goalToAdd]);
    
    // Reset form and close dialog
    setNewGoal({
      title: "",
      category: "weight",
      target: "",
      currentValue: 0,
      targetValue: 0,
      unit: "",
      startDate: new Date().toISOString().split('T')[0],
      endDate: "",
      status: "active"
    });
    
    setOpenAddDialog(false);
    
    toast({
      title: "Goal Added",
      description: "Your new health goal has been created.",
    });
  };
  
  // Update goal progress (mock function)
  const updateGoalProgress = (goalId: string, newValue: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        // Calculate new progress
        const range = goal.targetValue - goal.history[0].value;
        const current = newValue - goal.history[0].value;
        const newProgress = Math.round((current / range) * 100);
        
        // Add to history
        const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const newHistory = [...goal.history, { date: today, value: newValue }];
        
        return {
          ...goal,
          currentValue: newValue,
          progress: Math.min(100, Math.max(0, newProgress)),
          history: newHistory
        };
      }
      return goal;
    }));
    
    toast({
      title: "Progress Updated",
      description: "Your goal progress has been updated.",
    });
  };
  
  // Get color scheme based on category
  const getCategoryColor = (category: HealthGoal["category"]) => {
    switch (category) {
      case "weight":
        return { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200", line: "#3b82f6" };
      case "fitness":
        return { bg: "bg-green-100", text: "text-green-700", border: "border-green-200", line: "#22c55e" };
      case "sleep":
        return { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-200", line: "#a855f7" };
      case "nutrition":
        return { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200", line: "#f59e0b" };
      case "mental":
        return { bg: "bg-indigo-100", text: "text-indigo-700", border: "border-indigo-200", line: "#6366f1" };
      case "medical":
        return { bg: "bg-red-100", text: "text-red-700", border: "border-red-200", line: "#ef4444" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-200", line: "#6b7280" };
    }
  };
  
  // Get icon for goal category
  const getCategoryIcon = (category: HealthGoal["category"]) => {
    switch (category) {
      case "weight":
        return <Weight className="h-5 w-5" />;
      case "fitness":
        return <Zap className="h-5 w-5" />;
      case "sleep":
        return <Brain className="h-5 w-5" />;
      case "nutrition":
        return <Heart className="h-5 w-5" />;
      case "mental":
        return <Brain className="h-5 w-5" />;
      case "medical":
        return <Heart className="h-5 w-5" />;
      default:
        return <Target className="h-5 w-5" />;
    }
  };
  
  // Update a goal with new progress
  const handleUpdateProgress = (goal: HealthGoal) => {
    if (!selectedGoal) return;
    
    // Just a simple mock implementation - would be more sophisticated in a real app
    const newValue = parseFloat(prompt(`Enter new value for ${selectedGoal.title} (current: ${selectedGoal.currentValue}${selectedGoal.unit}):`) || String(selectedGoal.currentValue));
    
    if (!isNaN(newValue)) {
      updateGoalProgress(selectedGoal.id, newValue);
      setSelectedGoal(null);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Health Goal Tracking
          </h2>
          <p className="text-muted-foreground text-sm">
            Set, track, and achieve your personal health goals
          </p>
        </div>
        
        <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              <span>Add Goal</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Health Goal</DialogTitle>
              <DialogDescription>
                Set a measurable health goal to track your progress over time.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Goal Title</Label>
                <Input 
                  id="title" 
                  placeholder="E.g., Weight Loss, Improve Sleep"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={newGoal.category} 
                  onValueChange={(value: HealthGoal["category"]) => setNewGoal({...newGoal, category: value})}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight">Weight</SelectItem>
                    <SelectItem value="fitness">Fitness</SelectItem>
                    <SelectItem value="sleep">Sleep</SelectItem>
                    <SelectItem value="nutrition">Nutrition</SelectItem>
                    <SelectItem value="mental">Mental Health</SelectItem>
                    <SelectItem value="medical">Medical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="target">Target Description</Label>
                <Input 
                  id="target" 
                  placeholder="E.g., Lose 5kg, Sleep 8 hours"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="currentValue">Current Value</Label>
                  <Input 
                    id="currentValue" 
                    type="number"
                    value={newGoal.currentValue}
                    onChange={(e) => setNewGoal({...newGoal, currentValue: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="targetValue">Target Value</Label>
                  <Input 
                    id="targetValue" 
                    type="number"
                    value={newGoal.targetValue}
                    onChange={(e) => setNewGoal({...newGoal, targetValue: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input 
                    id="unit" 
                    placeholder="kg, steps, etc."
                    value={newGoal.unit}
                    onChange={(e) => setNewGoal({...newGoal, unit: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input 
                    id="startDate" 
                    type="date"
                    value={newGoal.startDate}
                    onChange={(e) => setNewGoal({...newGoal, startDate: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endDate">Target Date</Label>
                  <Input 
                    id="endDate" 
                    type="date"
                    value={newGoal.endDate}
                    onChange={(e) => setNewGoal({...newGoal, endDate: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddGoal}>Create Goal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goals.filter(g => g.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">Goals in progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length)}%
            </div>
            <Progress 
              value={Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length)} 
              className="mt-2 h-2" 
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next: Weight goal (3 days)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goals.filter(g => g.status === "completed").length}</div>
            <p className="text-xs text-muted-foreground">Goals achieved</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Goals</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {goals.filter(goal => goal.status === "active").map((goal) => {
              const colors = getCategoryColor(goal.category);
              return (
                <Card key={goal.id} className={`border-l-4 ${colors.border}`} onClick={() => setSelectedGoal(goal)}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      <Badge className={`${colors.bg} ${colors.text} hover:${colors.bg} border-${colors.border}`}>
                        {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}
                      </Badge>
                    </div>
                    <CardDescription>{goal.target}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">{goal.currentValue}{goal.unit}</span>
                        <span className="text-sm font-medium">{goal.targetValue}{goal.unit}</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">Started: {new Date(goal.startDate).toLocaleDateString()}</span>
                        <span className="text-xs text-muted-foreground">Target: {new Date(goal.endDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="h-[100px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={goal.history}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" tick={{fontSize: 12}} />
                          <YAxis domain={['dataMin - 5', 'dataMax + 5']} tick={{fontSize: 12}} />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke={colors.line} 
                            activeDot={{ r: 8 }} 
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedGoal(goal);
                          handleUpdateProgress(goal);
                        }}
                      >
                        <TrendingUp className="h-4 w-4" />
                        Update Progress
                      </Button>
                      
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{goal.progress}%</span>
                        <span className="text-xs text-muted-foreground">complete</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          <div className="text-center py-12 text-muted-foreground">
            <Medal className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <h3 className="text-lg font-medium">No completed goals yet</h3>
            <p className="max-w-md mx-auto mt-2">
              Keep working on your active goals. Your achievements will be celebrated here.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="insights" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Health Insights</CardTitle>
              <CardDescription>
                Personalized recommendations based on your health goals and progress
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="text-lg font-medium text-blue-700 flex items-center gap-2 mb-2">
                  <Brain className="h-5 w-5" />
                  Progress Analysis
                </h3>
                <p className="text-blue-700 mb-4">
                  Based on your weight loss goal, you're making steady progress at 0.5kg per week. 
                  At this rate, you'll reach your target weight by October 15th.
                </p>
                <div className="h-[150px] mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart 
                      data={[
                        { date: "Jul 1", actual: 80, projected: 80 },
                        { date: "Jul 15", actual: 79.2, projected: 79.5 },
                        { date: "Aug 1", actual: 78.5, projected: 78.5 },
                        { date: "Aug 15", actual: 78, projected: 77.5 },
                        { date: "Sep 1", actual: null, projected: 76.5 },
                        { date: "Sep 15", actual: null, projected: 75.5 },
                        { date: "Oct 1", actual: null, projected: 74.5 },
                        { date: "Oct 15", actual: null, projected: 73 }
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[72, 81]} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="actual" 
                        stroke="#3b82f6" 
                        strokeWidth={2} 
                        name="Actual" 
                        dot={{ strokeWidth: 2, r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="projected" 
                        stroke="#93c5fd" 
                        strokeDasharray="5 5" 
                        name="Projected" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Recommendations</h3>
                <div className="space-y-3">
                  <div className="flex gap-3 p-3 border rounded-lg">
                    <div className="bg-green-100 text-green-700 p-2 rounded-full h-fit">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Add strength training</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        To accelerate your weight loss goal, add 2 days of strength training per week. 
                        This will boost your metabolism and preserve muscle mass.
                      </p>
                      <Button variant="outline" size="sm">View Exercise Plans</Button>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 p-3 border rounded-lg">
                    <div className="bg-amber-100 text-amber-700 p-2 rounded-full h-fit">
                      <Heart className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Adjust sleep schedule</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Your sleep goal progress has plateaued. Try going to bed 30 minutes earlier 
                        and creating a bedtime routine to improve sleep quality.
                      </p>
                      <Button variant="outline" size="sm">Sleep Tips</Button>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 p-3 border rounded-lg">
                    <div className="bg-indigo-100 text-indigo-700 p-2 rounded-full h-fit">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Sync your goals</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Connect your goals with your calendar to get timely reminders and better track your progress.
                      </p>
                      <Button variant="outline" size="sm">Connect Calendar</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Goal Completion Forecast</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[180px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { name: 'Weight', progress: 40, target: 100 },
                            { name: 'Steps', progress: 75, target: 100 },
                            { name: 'Sleep', progress: 60, target: 100 },
                            { name: 'BP', progress: 50, target: 100 },
                          ]}
                          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                        >
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="progress" fill="#3b82f6" name="Current Progress" />
                          <Bar dataKey="target" fill="#e5e7eb" name="Target" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Success Factors</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Consistency</span>
                      <div className="flex items-center">
                        <span className="mr-2 text-sm font-medium">High</span>
                        <div className="flex">
                          <div className="w-2 h-4 bg-green-500 rounded-l-sm"></div>
                          <div className="w-2 h-4 bg-green-500"></div>
                          <div className="w-2 h-4 bg-green-500"></div>
                          <div className="w-2 h-4 bg-green-500 rounded-r-sm"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Goal Setting</span>
                      <div className="flex items-center">
                        <span className="mr-2 text-sm font-medium">Medium</span>
                        <div className="flex">
                          <div className="w-2 h-4 bg-amber-500 rounded-l-sm"></div>
                          <div className="w-2 h-4 bg-amber-500"></div>
                          <div className="w-2 h-4 bg-amber-500"></div>
                          <div className="w-2 h-4 bg-muted rounded-r-sm"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Follow-through</span>
                      <div className="flex items-center">
                        <span className="mr-2 text-sm font-medium">Medium</span>
                        <div className="flex">
                          <div className="w-2 h-4 bg-amber-500 rounded-l-sm"></div>
                          <div className="w-2 h-4 bg-amber-500"></div>
                          <div className="w-2 h-4 bg-amber-500"></div>
                          <div className="w-2 h-4 bg-muted rounded-r-sm"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Tracking Habit</span>
                      <div className="flex items-center">
                        <span className="mr-2 text-sm font-medium">High</span>
                        <div className="flex">
                          <div className="w-2 h-4 bg-green-500 rounded-l-sm"></div>
                          <div className="w-2 h-4 bg-green-500"></div>
                          <div className="w-2 h-4 bg-green-500"></div>
                          <div className="w-2 h-4 bg-green-500 rounded-r-sm"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthGoalTracking;
