
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { CalendarPlus, Calendar as CalendarIcon, Plus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface Appointment {
  id: string;
  title: string;
  date: Date;
  provider: string;
  type: string;
  notes?: string;
}

const AppointmentCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      title: "Annual Physical",
      date: new Date(2023, 5, 15),
      provider: "Dr. Smith",
      type: "Primary Care",
      notes: "Fasting required"
    },
    {
      id: "2",
      title: "Dental Cleaning",
      date: new Date(2023, 6, 3),
      provider: "Dr. Johnson",
      type: "Dental",
      notes: "Remember to floss before appointment"
    }
  ]);
  
  const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({
    title: "",
    date: undefined,
    provider: "",
    type: "",
    notes: ""
  });
  
  const [open, setOpen] = useState(false);
  
  const handleAddAppointment = () => {
    if (!newAppointment.title || !newAppointment.date || !newAppointment.provider || !newAppointment.type) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const appointmentToAdd: Appointment = {
      id: Math.random().toString(36).substring(2, 9),
      title: newAppointment.title,
      date: newAppointment.date,
      provider: newAppointment.provider,
      type: newAppointment.type,
      notes: newAppointment.notes
    };
    
    setAppointments([...appointments, appointmentToAdd]);
    setNewAppointment({
      title: "",
      date: undefined,
      provider: "",
      type: "",
      notes: ""
    });
    
    setOpen(false);
    
    toast({
      title: "Success",
      description: "Appointment added successfully",
    });
  };
  
  const appointmentsOnSelectedDate = date 
    ? appointments.filter(appointment => 
        appointment.date.getDate() === date.getDate() &&
        appointment.date.getMonth() === date.getMonth() &&
        appointment.date.getFullYear() === date.getFullYear()
      )
    : [];
    
  // Function to determine if a date has appointments
  const hasAppointmentOn = (date: Date) => {
    return appointments.some(appointment => 
      appointment.date.getDate() === date.getDate() &&
      appointment.date.getMonth() === date.getMonth() &&
      appointment.date.getFullYear() === date.getFullYear()
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Health Calendar</h1>
          <p className="text-muted-foreground">Schedule and manage your healthcare appointments.</p>
        </div>
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <CalendarPlus className="h-4 w-4" />
                Add Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Appointment</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new healthcare appointment.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Appointment Title</Label>
                  <Input 
                    id="title" 
                    placeholder="Annual Physical"
                    value={newAppointment.title}
                    onChange={e => setNewAppointment({...newAppointment, title: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Appointment Date</Label>
                  <div className="border rounded-md p-2">
                    <Calendar
                      mode="single"
                      selected={newAppointment.date}
                      onSelect={(date) => setNewAppointment({...newAppointment, date})}
                      className="rounded-md border p-3 pointer-events-auto"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="provider">Healthcare Provider</Label>
                  <Input 
                    id="provider" 
                    placeholder="Dr. Smith"
                    value={newAppointment.provider}
                    onChange={e => setNewAppointment({...newAppointment, provider: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Appointment Type</Label>
                  <Select 
                    onValueChange={(value) => setNewAppointment({...newAppointment, type: value})}
                    value={newAppointment.type}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Primary Care">Primary Care</SelectItem>
                      <SelectItem value="Specialist">Specialist</SelectItem>
                      <SelectItem value="Dental">Dental</SelectItem>
                      <SelectItem value="Vision">Vision</SelectItem>
                      <SelectItem value="Mental Health">Mental Health</SelectItem>
                      <SelectItem value="Physical Therapy">Physical Therapy</SelectItem>
                      <SelectItem value="Laboratory">Laboratory</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Input 
                    id="notes" 
                    placeholder="Any additional notes"
                    value={newAppointment.notes}
                    onChange={e => setNewAppointment({...newAppointment, notes: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleAddAppointment}>Add Appointment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Appointment Calendar</CardTitle>
            <CardDescription>View and manage your healthcare appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border p-3 pointer-events-auto"
              modifiers={{
                hasAppointment: (date) => hasAppointmentOn(date),
              }}
              modifiersClassNames={{
                hasAppointment: "bg-blue-100 font-bold text-blue-700 hover:bg-blue-200",
              }}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>
              {date ? format(date, "MMMM d, yyyy") : "Select a Date"}
            </CardTitle>
            <CardDescription>
              {appointmentsOnSelectedDate.length 
                ? `${appointmentsOnSelectedDate.length} appointment(s) scheduled` 
                : "No appointments scheduled"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {appointmentsOnSelectedDate.length > 0 ? (
              <div className="space-y-4">
                {appointmentsOnSelectedDate.map(appointment => (
                  <div key={appointment.id} className="p-4 border rounded-lg bg-slate-50">
                    <h3 className="font-medium text-lg">{appointment.title}</h3>
                    <p className="text-sm text-muted-foreground">Provider: {appointment.provider}</p>
                    <p className="text-sm text-muted-foreground">Type: {appointment.type}</p>
                    {appointment.notes && (
                      <p className="text-sm text-muted-foreground mt-2">Notes: {appointment.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  {date 
                    ? "No appointments scheduled for this day"
                    : "Select a date to view appointments"
                  }
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4"
                  onClick={() => {
                    setNewAppointment({...newAppointment, date});
                    setOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Appointment
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AppointmentCalendar;
