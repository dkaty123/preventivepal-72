
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useHealthData } from "@/contexts/HealthDataContext";
import HealthPlatformConnect from "./HealthPlatformConnect";

const healthProfileSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  dateOfBirth: z.string().min(1, {
    message: "Please enter your date of birth.",
  }),
  gender: z.string().min(1, {
    message: "Please select your gender.",
  }),
  height: z.string().min(1, {
    message: "Please enter your height.",
  }),
  weight: z.string().min(1, {
    message: "Please enter your weight.",
  }),
  medications: z.string().optional(),
  allergies: z.string().optional(),
  conditions: z.string().optional(),
  familyHistory: z.string().optional(),
  primaryCareProvider: z.string().optional(),
  emergencyContact: z.string().optional(),
  emailNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
  insuranceProvider: z.string().optional(),
  insurancePolicyNumber: z.string().optional(),
  insuranceGroupNumber: z.string().optional(),
});

type HealthProfileFormValues = z.infer<typeof healthProfileSchema>;

const defaultValues: Partial<HealthProfileFormValues> = {
  firstName: "",
  lastName: "",
  email: "",
  dateOfBirth: "",
  gender: "",
  height: "",
  weight: "",
  medications: "",
  allergies: "",
  conditions: "",
  familyHistory: "",
  primaryCareProvider: "",
  emergencyContact: "",
  emailNotifications: true,
  smsNotifications: false,
  insuranceProvider: "",
  insurancePolicyNumber: "",
  insuranceGroupNumber: "",
};

const HealthProfile = () => {
  const form = useForm<HealthProfileFormValues>({
    resolver: zodResolver(healthProfileSchema),
    defaultValues,
  });
  
  const { toast } = useToast();
  const { healthData } = useHealthData();

  function onSubmit(data: HealthProfileFormValues) {
    console.log(data);
    // Here you would typically send this data to your backend
    toast({
      title: "Profile updated successfully!",
      description: "Your health profile has been saved."
    });
  }
  
  React.useEffect(() => {
    if (healthData) {
      if (healthData.weight) {
        form.setValue('weight', String(healthData.weight));
      }
    }
  }, [healthData, form]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Health Profile</h1>
        <p className="text-muted-foreground">
          Complete your health profile to receive personalized preventative care recommendations.
        </p>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Health Data Connection</h2>
        <p className="text-muted-foreground mb-4">
          Connect your health platform to automatically import your health data and receive more personalized recommendations.
        </p>
        <HealthPlatformConnect />
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="medical">Medical History</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
        </TabsList>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <TabsContent value="personal" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john.doe@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="non-binary">Non-binary</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (cm)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="175" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="70" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4 mt-6">
                <h3 className="text-lg font-medium">Notification Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Email Notifications</FormLabel>
                          <FormDescription>
                            Receive updates and reminders via email
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="smsNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">SMS Notifications</FormLabel>
                          <FormDescription>
                            Receive updates and reminders via text message
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="medical" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 gap-6">
                <FormField
                  control={form.control}
                  name="medications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Medications</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List any medications you are currently taking..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Include dosage and frequency if known.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="allergies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Allergies</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List any allergies you have..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Include food, medication, and environmental allergies.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="conditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medical Conditions</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List any medical conditions you have..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Include past surgeries, chronic conditions, and ongoing health concerns.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="familyHistory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Family Medical History</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List relevant family medical history..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Include health conditions that run in your family.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="primaryCareProvider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Care Provider</FormLabel>
                      <FormControl>
                        <Input placeholder="Dr. Jane Smith" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your regular doctor or healthcare provider.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emergencyContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe, (555) 123-4567" {...field} />
                      </FormControl>
                      <FormDescription>
                        Name and phone number of your emergency contact.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>

            <TabsContent value="insurance" className="space-y-6 mt-6">
              <div>
                <p className="text-sm text-muted-foreground mb-6">
                  Adding your insurance information helps us optimize your preventative care recommendations based on your coverage.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="insuranceProvider"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Insurance Provider</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Blue Cross" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="insurancePolicyNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Policy Number</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., POL-123456789" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="insuranceGroupNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Group Number</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., GRP-987654" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-md">
                  <h4 className="font-medium text-amber-800 mb-2">Premium Feature</h4>
                  <p className="text-sm text-amber-700">
                    Full insurance benefit tracking and optimization is available with our Premium subscription. Upgrade to unlock these features.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <Separator />
            
            <div className="flex justify-end">
              <Button type="submit">Save Profile</Button>
            </div>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default HealthProfile;
