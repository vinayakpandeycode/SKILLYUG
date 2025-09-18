import { useState } from "react";
import Header from "@/components/TaskManagement/Header";
import TaskCard from "@/components/TaskManagement/TaskCard";
import TeamMemberCard from "@/components/TaskManagement/TeamMemberCard";
import StatsCard from "@/components/TaskManagement/StatsCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { teamMembers, taskData } from "@/data/teamData";
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Search, 
  Filter,
  Calendar,
  BarChart3
} from "lucide-react";

// Import team images
import vinayakImage from "@/assets/team/vinayak-pandey.jpg";
import ashishImage from "@/assets/team/ashish-dubey.jpg";
import vaibhavImage from "@/assets/team/vaibhav-kumar.jpg";
import vibhanshuImage from "@/assets/team/vibhanshu-mishra.jpg";
import shifaImage from "@/assets/team/shifa-praveen.jpg";
import omkarImage from "@/assets/team/omkar-pandey.jpg";
import yashImage from "@/assets/team/yash-pandey.jpg";
import akanshaImage from "@/assets/team/akansha-shukla.jpg";
import tanyaImage from "@/assets/team/tanya-ojha.jpg";
import aditiImage from "@/assets/team/aditi-mall.jpg";

const TaskDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Map team member names to images
  const imageMap: Record<string, string> = {
    "Vinayak Pandey": vinayakImage,
    "Ashish Dubey": ashishImage,
    "Vaibhav Kumar": vaibhavImage,
    "Vibhanshu Mishra": vibhanshuImage,
    "Shifa Praveen": shifaImage,
    "Omkar Pandey": omkarImage,
    "Yash Pandey": yashImage,
    "Akansha Shukla": akanshaImage,
    "Tanya Ojha": tanyaImage,
    "Aditi Mall": aditiImage,
  };

  // Enhanced team members with task counts and images
  const enhancedTeamMembers = teamMembers.map(member => {
    const memberTasks = taskData.filter(task => task.name === member.name);
    const recentTask = memberTasks[memberTasks.length - 1];
    
    return {
      ...member,
      image: imageMap[member.name],
      taskCount: memberTasks.length,
      recentActivity: recentTask?.taskDescription
    };
  });

  // Filter tasks based on search and status
  const filteredTasks = taskData.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.taskDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const totalTasks = taskData.length;
  const completedTasks = taskData.filter(task => task.status === "completed").length;
  const inProgressTasks = taskData.filter(task => task.status === "in-progress").length;
  const completionRate = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Team Members"
            value={teamMembers.length}
            description="Active members"
            icon={Users}
            trend="neutral"
          />
          <StatsCard
            title="Total Tasks"
            value={totalTasks}
            description="All time tasks"
            icon={BarChart3}
            trend="up"
          />
          <StatsCard
            title="Completed Tasks"
            value={completedTasks}
            description={`${completionRate}% completion rate`}
            icon={CheckCircle2}
            trend="up"
          />
          <StatsCard
            title="In Progress"
            value={inProgressTasks}
            description="Active tasks"
            icon={Clock}
            trend="neutral"
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="tasks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Recent Tasks
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Team Members
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search tasks or team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  onClick={() => setFilterStatus("all")}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === "completed" ? "default" : "outline"}
                  onClick={() => setFilterStatus("completed")}
                  size="sm"
                >
                  Completed
                </Button>
                <Button
                  variant={filterStatus === "in-progress" ? "default" : "outline"}
                  onClick={() => setFilterStatus("in-progress")}
                  size="sm"
                >
                  In Progress
                </Button>
                <Button
                  variant={filterStatus === "pending" ? "default" : "outline"}
                  onClick={() => setFilterStatus("pending")}
                  size="sm"
                >
                  Pending
                </Button>
              </div>
            </div>

            {/* Tasks Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  memberImage={imageMap[task.name]}
                />
              ))}
            </div>

            {filteredTasks.length === 0 && (
              <div className="text-center py-12">
                <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            {/* Team Members Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {enhancedTeamMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TaskDashboard;