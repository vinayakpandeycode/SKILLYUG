import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, CheckCircle2, AlertCircle } from "lucide-react";

interface TaskCardProps {
  task: {
    timestamp: string;
    name: string;
    role: string;
    taskDescription: string;
    status?: "completed" | "in-progress" | "pending";
  };
  memberImage?: string;
}

const TaskCard = ({ task, memberImage }: TaskCardProps) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-foreground";
      case "in-progress":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-info text-info-foreground";
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4" />;
      case "in-progress":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="shadow-soft hover:shadow-medium transition-all duration-300 border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={memberImage} alt={task.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {task.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">{task.name}</h3>
              <p className="text-sm text-muted-foreground">{task.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={`${getStatusColor(task.status)} flex items-center gap-1`}>
              {getStatusIcon(task.status)}
              {task.status || 'pending'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-foreground mb-3 leading-relaxed">{task.taskDescription}</p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          {formatDate(task.timestamp)}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;