import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Briefcase } from "lucide-react";

interface TeamMemberCardProps {
  member: {
    name: string;
    role: string;
    image?: string;
    taskCount?: number;
    recentActivity?: string;
  };
}

const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  const getRoleColor = (role: string) => {
    if (role.toLowerCase().includes('founder') || role.toLowerCase().includes('ceo')) {
      return "bg-gradient-primary text-primary-foreground";
    }
    if (role.toLowerCase().includes('chief') || role.toLowerCase().includes('cto') || role.toLowerCase().includes('cdo')) {
      return "bg-info text-info-foreground";
    }
    return "bg-secondary text-secondary-foreground";
  };

  return (
    <Card className="shadow-soft hover:shadow-medium transition-all duration-300 group hover:scale-105">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <Avatar className="h-20 w-20 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
            <AvatarImage src={member.image} alt={member.name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg">
              {member.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-foreground">{member.name}</h3>
            <Badge className={`${getRoleColor(member.role)} px-3 py-1`}>
              <Briefcase className="h-3 w-3 mr-1" />
              {member.role}
            </Badge>
          </div>

          {member.taskCount !== undefined && (
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{member.taskCount} tasks</span>
              </div>
            </div>
          )}

          {member.recentActivity && (
            <p className="text-xs text-muted-foreground italic line-clamp-2">
              Latest: {member.recentActivity}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;