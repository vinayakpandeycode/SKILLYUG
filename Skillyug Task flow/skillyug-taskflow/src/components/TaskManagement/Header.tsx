import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Calendar } from "lucide-react";

const Header = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="bg-gradient-primary text-primary-foreground shadow-strong">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-xl">
                <Building2 className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Skillyug</h1>
                <p className="text-primary-foreground/80">Task Management System</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/10 border-white/20 text-primary-foreground hover:bg-white/20"
              onClick={() => window.open('https://docs.google.com/spreadsheets/d/1W7OvTPyZwGpUNiCYB8We5inbt-AqWQ7Ytx9XgkIyoTs/edit', '_blank')}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Task Tracker Form
            </Button>
            <div className="flex items-center gap-2 text-sm bg-white/10 px-3 py-2 rounded-lg">
              <Calendar className="h-4 w-4" />
              {currentDate}
            </div>
            <Badge variant="secondary" className="bg-white/20 text-primary-foreground hover:bg-white/30">
              <Users className="h-3 w-3 mr-1" />
              Team Dashboard
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;