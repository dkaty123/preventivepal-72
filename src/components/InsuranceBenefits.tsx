
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, DollarSign, Plus, Shield, AlertCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Benefit {
  id: string;
  name: string;
  category: string;
  amountTotal: number;
  amountUsed: number;
  renewal: string;
  claimType: "manual" | "automatic";
}

interface BenefitClaim {
  id: string;
  benefitId: string;
  amount: number;
  date: Date;
  provider: string;
  description: string;
  status: "pending" | "approved" | "denied";
}

const InsuranceBenefits = () => {
  const isPremium = false; // Simulate user subscription level
  
  const [benefits, setBenefits] = useState<Benefit[]>([
    {
      id: "1",
      name: "Medical Office Visits",
      category: "Medical",
      amountTotal: 1000,
      amountUsed: 350,
      renewal: "January 1, 2024",
      claimType: "manual"
    },
    {
      id: "2",
      name: "Dental Coverage",
      category: "Dental",
      amountTotal: 1500,
      amountUsed: 450,
      renewal: "January 1, 2024",
      claimType: "manual"
    },
    {
      id: "3",
      name: "Vision Care",
      category: "Vision",
      amountTotal: 500,
      amountUsed: 200,
      renewal: "January 1, 2024",
      claimType: "manual"
    },
    {
      id: "4",
      name: "Mental Health Services",
      category: "Mental Health",
      amountTotal: 2000,
      amountUsed: 600,
      renewal: "January 1, 2024",
      claimType: "manual"
    }
  ]);
  
  const [claims, setClaims] = useState<BenefitClaim[]>([
    {
      id: "1",
      benefitId: "1",
      amount: 150,
      date: new Date(2023, 4, 15),
      provider: "Dr. Smith Medical Group",
      description: "Annual physical examination",
      status: "approved"
    },
    {
      id: "2",
      benefitId: "1",
      amount: 200,
      date: new Date(2023, 6, 22),
      provider: "Urgent Care Center",
      description: "Urgent care visit for fever",
      status: "approved"
    },
    {
      id: "3",
      benefitId: "2",
      amount: 450,
      date: new Date(2023, 5, 10),
      provider: "Smile Dental Group",
      description: "Dental cleaning and X-rays",
      status: "approved"
    }
  ]);
  
  const [newBenefit, setNewBenefit] = useState<Partial<Benefit>>({
    name: "",
    category: "",
    amountTotal: 0,
    amountUsed: 0,
    renewal: "",
    claimType: "manual"
  });
  
  const [newClaim, setNewClaim] = useState<Partial<BenefitClaim>>({
    benefitId: "",
    amount: 0,
    date: new Date(),
    provider: "",
    description: "",
    status: "pending"
  });
  
  const [openBenefitDialog, setOpenBenefitDialog] = useState(false);
  const [openClaimDialog, setOpenClaimDialog] = useState(false);
  
  const handleAddBenefit = () => {
    if (!newBenefit.name || !newBenefit.category || !newBenefit.amountTotal || !newBenefit.renewal) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const benefitToAdd: Benefit = {
      id: Math.random().toString(36).substring(2, 9),
      name: newBenefit.name,
      category: newBenefit.category,
      amountTotal: newBenefit.amountTotal,
      amountUsed: newBenefit.amountUsed || 0,
      renewal: newBenefit.renewal,
      claimType: "manual"
    };
    
    setBenefits([...benefits, benefitToAdd]);
    setNewBenefit({
      name: "",
      category: "",
      amountTotal: 0,
      amountUsed: 0,
      renewal: "",
      claimType: "manual"
    });
    
    setOpenBenefitDialog(false);
    
    toast({
      title: "Success",
      description: "Benefit added successfully",
    });
  };
  
  const handleAddClaim = () => {
    if (!newClaim.benefitId || !newClaim.amount || !newClaim.provider || !newClaim.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const claimToAdd: BenefitClaim = {
      id: Math.random().toString(36).substring(2, 9),
      benefitId: newClaim.benefitId,
      amount: newClaim.amount,
      date: newClaim.date || new Date(),
      provider: newClaim.provider,
      description: newClaim.description,
      status: "pending"
    };
    
    setClaims([...claims, claimToAdd]);
    
    // Update the benefit used amount
    setBenefits(benefits.map(benefit => {
      if (benefit.id === claimToAdd.benefitId) {
        return {
          ...benefit,
          amountUsed: benefit.amountUsed + claimToAdd.amount
        };
      }
      return benefit;
    }));
    
    setNewClaim({
      benefitId: "",
      amount: 0,
      date: new Date(),
      provider: "",
      description: "",
      status: "pending"
    });
    
    setOpenClaimDialog(false);
    
    toast({
      title: "Success",
      description: "Claim submitted successfully",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Insurance Benefits</h1>
          <p className="text-muted-foreground">Track and manage your healthcare benefits.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Dialog open={openBenefitDialog} onOpenChange={setOpenBenefitDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Add Benefit
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Benefit</DialogTitle>
                <DialogDescription>
                  Add a new insurance benefit to track.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Benefit Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Medical Office Visits"
                    value={newBenefit.name}
                    onChange={e => setNewBenefit({...newBenefit, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Input 
                    id="category" 
                    placeholder="Medical, Dental, Vision, etc."
                    value={newBenefit.category}
                    onChange={e => setNewBenefit({...newBenefit, category: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="amountTotal">Total Amount ($)</Label>
                  <Input 
                    id="amountTotal" 
                    type="number"
                    placeholder="1000"
                    value={newBenefit.amountTotal || ""}
                    onChange={e => setNewBenefit({...newBenefit, amountTotal: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="amountUsed">Amount Used ($)</Label>
                  <Input 
                    id="amountUsed" 
                    type="number"
                    placeholder="0"
                    value={newBenefit.amountUsed || ""}
                    onChange={e => setNewBenefit({...newBenefit, amountUsed: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="renewal">Renewal Date</Label>
                  <Input 
                    id="renewal" 
                    placeholder="January 1, 2024"
                    value={newBenefit.renewal}
                    onChange={e => setNewBenefit({...newBenefit, renewal: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenBenefitDialog(false)}>Cancel</Button>
                <Button onClick={handleAddBenefit}>Add Benefit</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={openClaimDialog} onOpenChange={setOpenClaimDialog}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Submit Claim
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Submit New Claim</DialogTitle>
                <DialogDescription>
                  Add a new claim against one of your benefits.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="benefitId">Select Benefit</Label>
                  <select 
                    id="benefitId" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newClaim.benefitId}
                    onChange={e => setNewClaim({...newClaim, benefitId: e.target.value})}
                  >
                    <option value="">Select a benefit</option>
                    {benefits.map(benefit => (
                      <option key={benefit.id} value={benefit.id}>
                        {benefit.name} (${benefit.amountTotal - benefit.amountUsed} remaining)
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="amount">Claim Amount ($)</Label>
                  <Input 
                    id="amount" 
                    type="number"
                    placeholder="100"
                    value={newClaim.amount || ""}
                    onChange={e => setNewClaim({...newClaim, amount: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">Date of Service</Label>
                  <Input 
                    id="date" 
                    type="date"
                    value={newClaim.date ? new Date(newClaim.date).toISOString().split('T')[0] : ""}
                    onChange={e => setNewClaim({...newClaim, date: new Date(e.target.value)})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="provider">Healthcare Provider</Label>
                  <Input 
                    id="provider" 
                    placeholder="Dr. Smith Medical Group"
                    value={newClaim.provider}
                    onChange={e => setNewClaim({...newClaim, provider: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input 
                    id="description" 
                    placeholder="Annual physical examination"
                    value={newClaim.description}
                    onChange={e => setNewClaim({...newClaim, description: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenClaimDialog(false)}>Cancel</Button>
                <Button onClick={handleAddClaim}>Submit Claim</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {!isPremium && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Basic Plan</AlertTitle>
          <AlertDescription>
            You're on the Basic plan. Upgrade to Premium for automatic insurance integration and benefit tracking.
            <Button variant="link" className="p-0 h-auto font-semibold">Upgrade Now</Button>
          </AlertDescription>
        </Alert>
      )}
      
      <Tabs defaultValue="summary" className="w-full">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="space-y-4 mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Total Benefits</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${benefits.reduce((acc, benefit) => acc + benefit.amountTotal, 0).toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Across {benefits.length} categories</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Used Benefits</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${benefits.reduce((acc, benefit) => acc + benefit.amountUsed, 0).toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">From {claims.length} claims</p>
                <Progress value={benefits.reduce((acc, benefit) => acc + benefit.amountUsed, 0) / benefits.reduce((acc, benefit) => acc + benefit.amountTotal, 0) * 100} className="mt-3 h-1" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Remaining Benefits</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${(benefits.reduce((acc, benefit) => acc + benefit.amountTotal, 0) - benefits.reduce((acc, benefit) => acc + benefit.amountUsed, 0)).toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Available to use</p>
                <Progress value={(1 - benefits.reduce((acc, benefit) => acc + benefit.amountUsed, 0) / benefits.reduce((acc, benefit) => acc + benefit.amountTotal, 0)) * 100} className="mt-3 h-1" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Pending Claims</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{claims.filter(claim => claim.status === "pending").length}</div>
                <p className="text-xs text-muted-foreground">Awaiting processing</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Benefit Utilization</CardTitle>
              <CardDescription>Track your benefit usage across categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {benefits.map(benefit => (
                  <div key={benefit.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{benefit.name}</span>
                      <span className="text-sm text-muted-foreground">${benefit.amountUsed} of ${benefit.amountTotal}</span>
                    </div>
                    <Progress value={(benefit.amountUsed / benefit.amountTotal) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="benefits" className="space-y-4 mt-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {benefits.map(benefit => (
              <Card key={benefit.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{benefit.name}</CardTitle>
                    <Badge variant="outline">{benefit.category}</Badge>
                  </div>
                  <CardDescription>Renews: {benefit.renewal}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Usage</span>
                        <span className="text-sm text-muted-foreground">${benefit.amountUsed} of ${benefit.amountTotal}</span>
                      </div>
                      <Progress value={(benefit.amountUsed / benefit.amountTotal) * 100} className="h-2" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Remaining</span>
                      <span className="font-medium">${benefit.amountTotal - benefit.amountUsed}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Claim Type</span>
                      <Badge variant={benefit.claimType === "automatic" ? "default" : "secondary"}>
                        {benefit.claimType === "automatic" ? "Auto" : "Manual"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => {
                    setNewClaim({...newClaim, benefitId: benefit.id});
                    setOpenClaimDialog(true);
                  }}>
                    Submit a Claim
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="claims" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Claims</CardTitle>
              <CardDescription>Track your submitted claims and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {claims.length > 0 ? (
                  claims.map(claim => {
                    const relatedBenefit = benefits.find(b => b.id === claim.benefitId);
                    
                    return (
                      <div key={claim.id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium">{claim.description}</h3>
                          <p className="text-sm text-muted-foreground">{claim.provider}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(claim.date).toLocaleDateString()} • 
                            {relatedBenefit ? ` ${relatedBenefit.name}` : ''}
                          </p>
                        </div>
                        <div className="flex flex-col items-end justify-center">
                          <div className="text-lg font-bold">${claim.amount}</div>
                          <Badge variant={
                            claim.status === "approved" ? "success" : 
                            claim.status === "denied" ? "destructive" : 
                            "outline"
                          }>
                            {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No claims submitted yet</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={() => setOpenClaimDialog(true)}
                    >
                      Submit Your First Claim
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InsuranceBenefits;
