import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { 
  Users, FileText, TrendingUp, 
  LogOut, Home, BarChart3, Loader2,
  ArrowUpRight, Shield, Compass, Target
} from "lucide-react";

interface AssessmentRecord {
  id: string;
  user_id: string;
  quadrant: number;
  pathway: string;
  cad_results: any;
  completed_at: string;
  created_at: string;
}

interface ProfileRecord {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
}

const quadrantLabels: Record<number, string> = {
  1: "Q1: The Unsure",
  2: "Q2: The Specialist",
  3: "Q3: The Dependable",
  4: "Q4: Mastery",
};

const quadrantColors: Record<number, string> = {
  1: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  2: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  3: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  4: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
};

const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple admin auth — in production, use Supabase with admin role
    if (credentials.username === "admin" && credentials.password === "3pnadmin2025") {
      onLogin();
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center pt-32 pb-16">
        <div className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">3PN Admin</h1>
            <p className="text-muted-foreground">Sign in to access the admin dashboard</p>
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
                placeholder="Username"
              />
            </div>
          
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Password"
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
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAssessments, setTotalAssessments] = useState(0);
  const [recentUsers, setRecentUsers] = useState<ProfileRecord[]>([]);
  const [recentAssessments, setRecentAssessments] = useState<AssessmentRecord[]>([]);
  const [quadrantDistribution, setQuadrantDistribution] = useState<Record<number, number>>({ 1: 0, 2: 0, 3: 0, 4: 0 });
  const [avgReadiness, setAvgReadiness] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch profiles count & recent
      const { data: profiles, count: profileCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .limit(10);

      setTotalUsers(profileCount || 0);
      setRecentUsers((profiles as ProfileRecord[]) || []);

      // Fetch assessments count & recent
      const { data: assessments, count: assessmentCount } = await supabase
        .from('assessments')
        .select('*', { count: 'exact' })
        .order('completed_at', { ascending: false })
        .limit(10);

      setTotalAssessments(assessmentCount || 0);
      setRecentAssessments((assessments as AssessmentRecord[]) || []);

      // Calculate quadrant distribution
      if (assessments && assessments.length > 0) {
        const dist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
        let totalReadiness = 0;
        let readinessCount = 0;
        
        assessments.forEach((a: any) => {
          if (a.quadrant >= 1 && a.quadrant <= 4) {
            dist[a.quadrant] = (dist[a.quadrant] || 0) + 1;
          }
          if (a.cad_results?.readinessForQ4) {
            totalReadiness += a.cad_results.readinessForQ4;
            readinessCount++;
          }
        });
        
        setQuadrantDistribution(dist);
        setAvgReadiness(readinessCount > 0 ? totalReadiness / readinessCount : 0);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalQuadrantResponses = Object.values(quadrantDistribution).reduce((a, b) => a + b, 0);

  const stats = [
    { 
      label: "Total Users", 
      value: totalUsers.toLocaleString(), 
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    { 
      label: "Assessments", 
      value: totalAssessments.toLocaleString(), 
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    { 
      label: "Avg Readiness", 
      value: `${avgReadiness.toFixed(1)}%`, 
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    { 
      label: "Q4 Achievers", 
      value: quadrantDistribution[4]?.toString() || "0",
      icon: Target,
      color: "text-amber-600",
      bgColor: "bg-amber-100 dark:bg-amber-900/30",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Admin Header */}
      <header className="bg-charcoal text-primary-foreground py-4">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6" />
            <h1 className="text-xl font-bold">3PN Admin Dashboard</h1>
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
          <h2 className="text-2xl font-bold text-foreground mb-2">Mastery Voyage Analytics</h2>
          <p className="text-muted-foreground">Live data from your 3PN platform. All metrics update in real-time.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl p-6 border border-border shadow-soft">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quadrant Distribution */}
        <div className="bg-card rounded-xl border border-border shadow-soft p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Compass className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Quadrant Distribution</h3>
          </div>
          {totalQuadrantResponses > 0 ? (
            <div className="grid sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((q) => {
                const count = quadrantDistribution[q] || 0;
                const pct = totalQuadrantResponses > 0 ? (count / totalQuadrantResponses * 100) : 0;
                return (
                  <div key={q} className="text-center">
                    <div className="mb-3">
                      <div className="h-24 bg-muted rounded-lg relative overflow-hidden flex items-end">
                        <div 
                          className={`w-full rounded-t-lg transition-all duration-500 ${
                            q === 1 ? 'bg-blue-500' : q === 2 ? 'bg-green-500' : q === 3 ? 'bg-orange-500' : 'bg-purple-500'
                          }`}
                          style={{ height: `${Math.max(pct, 5)}%` }}
                        />
                      </div>
                    </div>
                    <p className="font-semibold text-foreground">{count}</p>
                    <p className="text-xs text-muted-foreground">{quadrantLabels[q]}</p>
                    <p className="text-xs font-medium text-muted-foreground">{pct.toFixed(0)}%</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No assessments completed yet. Data will appear here once users take the assessment.</p>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <div className="bg-card rounded-xl border border-border shadow-soft">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Recent Signups</h3>
              <span className="text-sm text-muted-foreground">{totalUsers} total</span>
            </div>
            <div className="divide-y divide-border">
              {recentUsers.length > 0 ? (
                recentUsers.slice(0, 5).map((user) => (
                  <div key={user.id} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{user.full_name || 'Anonymous'}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          {new Date(user.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <Users className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p>No users yet. They'll appear here once people sign up.</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Assessments */}
          <div className="bg-card rounded-xl border border-border shadow-soft">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Recent Assessments</h3>
              <span className="text-sm text-muted-foreground">{totalAssessments} total</span>
            </div>
            <div className="divide-y divide-border">
              {recentAssessments.length > 0 ? (
                recentAssessments.slice(0, 5).map((assessment) => (
                  <div key={assessment.id} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          quadrantColors[assessment.quadrant] || 'bg-muted text-muted-foreground'
                        }`}>
                          {quadrantLabels[assessment.quadrant] || `Q${assessment.quadrant}`}
                        </span>
                        <p className="text-sm text-muted-foreground mt-1">{assessment.pathway}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">
                          {assessment.cad_results?.readinessForQ4 
                            ? `${assessment.cad_results.readinessForQ4.toFixed(0)}% ready`
                            : '-'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(assessment.completed_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <FileText className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p>No assessments yet. Results will appear here as they come in.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-card rounded-xl border border-border shadow-soft p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start" onClick={() => navigate("/assessment")}>
              <FileText className="w-4 h-4 mr-2" />
              Try Assessment
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-2" />
              View Landing Page
            </Button>
            <Button variant="outline" className="justify-start" onClick={fetchDashboardData}>
              <BarChart3 className="w-4 h-4 mr-2" />
              Refresh Data
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
