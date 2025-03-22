
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, CheckCircle } from "lucide-react";

export type ReminderStatus = "upcoming" | "due" | "overdue" | "completed";

interface ReminderCardProps {
  id: string;
  title: string;
  date: string;
  type: string;
  status: ReminderStatus;
  description?: string;
  onMarkComplete?: () => void;
}

const ReminderCard = ({ title, date, type, status, description, onMarkComplete }: ReminderCardProps) => {
  // Status specific styling
  const getStatusColor = (status: ReminderStatus) => {
    switch (status) {
      case "upcoming":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "due":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "overdue":
        return "bg-red-50 text-red-700 border-red-200";
      case "completed":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusBadge = (status: ReminderStatus) => {
    switch (status) {
      case "upcoming":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">Upcoming</Badge>;
      case "due":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">Due Soon</Badge>;
      case "overdue":
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">Overdue</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Completed</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className={`border-l-4 ${getStatusColor(status)} transition-all hover:shadow-md`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {getStatusBadge(status)}
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-1 h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-4 w-4" />
            <span>{type}</span>
          </div>
          {description && (
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          )}
          
          <div className="flex gap-2 mt-4">
            {status !== "completed" ? (
              <>
                <Button 
                  size="sm" 
                  variant="default" 
                  onClick={() => window.open("https://www.zocdoc.com", "_blank")}
                >
                  Schedule
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex items-center gap-1"
                  onClick={onMarkComplete}
                >
                  <CheckCircle className="h-4 w-4" />
                  Mark Complete
                </Button>
              </>
            ) : (
              <Button size="sm" variant="outline" disabled>Completed</Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReminderCard;
