import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Users, Calendar, FileText, TrendingUp, 
  LogOut, Home, Settings, BarChart3,
  ArrowUpRight, ArrowDownRight
} from "lucide-react";

// Mock data for the dashboard
const stats = [
  { 
    label: "Total Users", 
    value: "1,234", 
    change: "+12%", 
    trend: "up",
    icon: Users,
  },
  { 
    label: "Assessments Completed", 
    value: "856", 
    change: "+8%", 
    trend: "up",
    icon: FileText,
  },
  { 
    label: "Active Mentors", 
    value: "47", 
    change: "+3", 
    trend: "up",
    icon: TrendingUp,
  },
  { 
    label: "Upcoming Events", 
    value: "12", 
    change: "-2", 
    trend: "down",
    icon: Calendar,
  },
];

const recentUsers = [
  { id: 1, name: "Adaeze Okonkwo", email: "adaeze@email.com", path: "Launch", date: "28 Dec 2024" },
  { id: 2, name: "Marcus Johnson", email: "marcus.j@email.com", path: "Progress", date: "27 Dec 2024" },
  { id: 3, name: "Zainab Hassan", email: "zainab.h@email.com", path: "Invest", date: "27 Dec 2024" },
  { id: 4, name: "Chidi Nnamdi", email: "chidi.n@email.com", path: "Launch", date: "26 Dec 2024" },
  { id: 5, name: "Fatima Bakare", email: "fatima.b@email.com", path: "Progress", date: "26 Dec 2024" },
];

const recentMessages = [
  { id: 1, name: "John Smith", subject: "Partnership Inquiry", date: "28 Dec 2024", read: false },
  { id: 2, name: "Sarah Johnson", subject: "Mentorship Programme", date: "27 Dec 2024", read: true },
  { id: 3, name: "Michael Okafor", subject: "Event Sponsorship", date: "26 Dec 2024", read: true },
];

const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.username === "admin" && credentials.password === "admin") {
      onLogin();
    } else {
      setError("Invalid credentials. Use admin/admin");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center pt-32 pb-16">
        <div className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Admin Login</h1>
            <p className="text-muted-foreground">Use admin/admin to access the dashboard</p>
          </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="admin"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="admin"
            />
          </div>
          
          <Button type="submit" className="w-full" size="lg">
            Sign In
          </Button>
        </form>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Admin Header */}
      <header className="bg-charcoal text-primary-foreground py-4">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">3PN Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-2" />
              View Site
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Dashboard Overview</h2>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with 3PN.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl p-6 border border-border shadow-soft">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === "up" ? "text-green-600" : "text-red-500"
                }`}>
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <div className="bg-card rounded-xl border border-border shadow-soft">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Recent Users</h3>
            </div>
            <div className="divide-y divide-border">
              {recentUsers.map((user) => (
                <div key={user.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        user.path === "Launch" ? "bg-primary/10 text-primary" :
                        user.path === "Progress" ? "bg-teal-light/20 text-teal-dark" :
                        "bg-accent/20 text-amber-dark"
                      }`}>
                        {user.path}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">{user.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-border">
              <Button variant="ghost" size="sm" className="w-full">View All Users</Button>
            </div>
          </div>

          {/* Recent Messages */}
          <div className="bg-card rounded-xl border border-border shadow-soft">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Recent Messages</h3>
            </div>
            <div className="divide-y divide-border">
              {recentMessages.map((message) => (
                <div key={message.id} className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    {!message.read && (
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    )}
                    <div className={!message.read ? "" : "ml-5"}>
                      <p className={`font-medium ${!message.read ? "text-foreground" : "text-muted-foreground"}`}>
                        {message.name}
                      </p>
                      <p className="text-sm text-muted-foreground">{message.subject}</p>
                      <p className="text-xs text-muted-foreground mt-1">{message.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-border">
              <Button variant="ghost" size="sm" className="w-full">View All Messages</Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-card rounded-xl border border-border shadow-soft p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="justify-start">
              <Users className="w-4 h-4 mr-2" />
              Manage Users
            </Button>
            <Button variant="outline" className="justify-start">
              <Calendar className="w-4 h-4 mr-2" />
              Create Event
            </Button>
            <Button variant="outline" className="justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Add Resource
            </Button>
            <Button variant="outline" className="justify-start">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  return <AdminDashboard onLogout={() => setIsLoggedIn(false)} />;
};

export default Admin;
