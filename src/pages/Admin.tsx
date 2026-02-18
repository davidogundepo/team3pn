import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { 
  Users, FileText, TrendingUp, 
  LogOut, Home, BarChart3, Loader2,
  Shield, Compass, Target,
  Bell, CheckCheck, Trash2, Send,
  Search, ChevronLeft, ChevronRight,
  Eye, RefreshCw, X, Mail, Settings, Lock
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────
interface AssessmentRecord {
  id: string;
  user_id: string;
  quadrant: number;
  pathway: string;
  cad_results: any;
  ai_insights: any;
  completed_at: string;
  created_at: string;
}

interface ProfileRecord {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

interface AdminNotification {
  id: string;
  type: string;
  title: string;
  message: string;
  metadata: any;
  read: boolean;
  created_at: string;
}

type AdminTab = 'overview' | 'users' | 'assessments' | 'notifications' | 'settings';

const quadrantLabels: Record<number, string> = {
  1: "Q1 · New Traveler",
  2: "Q2 · Steady Support",
  3: "Q3 · Independent Starter",
  4: "Q4 · Systemic Leverage",
};

const quadrantColors: Record<number, string> = {
  1: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  2: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
  3: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
  4: "bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400",
};

const quadrantBarColors: Record<number, string> = {
  1: "bg-blue-500",
  2: "bg-emerald-500",
  3: "bg-amber-500",
  4: "bg-violet-500",
};

// ─── Admin Login (Notion-inspired) ──────────────────────
const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setChecking(true);

    // 1. Always allow hardcoded fallback: admin / admin
    if (credentials.username === "admin" && credentials.password === "admin") {
      onLogin();
      return;
    }

    // 2. Try Supabase admin_settings table for configurable credentials
    try {
      const { data } = await supabase
        .from('admin_settings')
        .select('value')
        .eq('key', 'admin_password')
        .single();

      if (data && credentials.username === "admin" && credentials.password === data.value) {
        onLogin();
        return;
      }
    } catch {
      // Table may not exist yet — that's fine, fallback to hardcoded
    }

    setChecking(false);
    setError("Invalid credentials");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Clean Notion-style login */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-foreground/5 mb-5">
            <Shield className="w-6 h-6 text-foreground/70" />
          </div>
          <h1 className="text-xl font-semibold text-foreground mb-1">3PN Admin</h1>
          <p className="text-sm text-muted-foreground">Sign in to your admin dashboard</p>
        </div>
      
        <form onSubmit={handleSubmit} className="space-y-3">
          {error && (
            <div className="px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}
        
          <input
            type="text"
            value={credentials.username}
            onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
            className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/20 transition-all"
            placeholder="Username"
          />
        
          <input
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
            className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/20 transition-all"
            placeholder="Password"
          />
        
          <Button type="submit" className="w-full" size="default" disabled={checking}>
            {checking ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            {checking ? 'Checking...' : 'Continue'}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground/50 mt-8">
          Secured access for 3PN administrators
        </p>
      </div>
    </div>
  );
};

// ─── Admin Dashboard (Notion-inspired) ──────────────────
const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Stats
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAssessments, setTotalAssessments] = useState(0);
  const [quadrantDistribution, setQuadrantDistribution] = useState<Record<number, number>>({ 1: 0, 2: 0, 3: 0, 4: 0 });
  const [avgReadiness, setAvgReadiness] = useState(0);

  // Users
  const [allUsers, setAllUsers] = useState<ProfileRecord[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [userPage, setUserPage] = useState(0);
  const [selectedUser, setSelectedUser] = useState<ProfileRecord | null>(null);
  const [selectedUserAssessments, setSelectedUserAssessments] = useState<AssessmentRecord[]>([]);

  // Assessments
  const [allAssessments, setAllAssessments] = useState<AssessmentRecord[]>([]);
  const [assessmentSearch, setAssessmentSearch] = useState("");
  const [assessmentPage, setAssessmentPage] = useState(0);

  // Notifications
  const [adminNotifs, setAdminNotifs] = useState<AdminNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showSendNotif, setShowSendNotif] = useState(false);
  const [notifForm, setNotifForm] = useState({ userId: "", title: "", message: "" });
  const [sendingNotif, setSendingNotif] = useState(false);

  // Settings
  const [newPassword, setNewPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const { data: profiles, count: profileCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      setTotalUsers(profileCount || 0);
      setAllUsers((profiles as ProfileRecord[]) || []);

      const { data: assessments, count: assessmentCount } = await supabase
        .from('assessments')
        .select('*', { count: 'exact' })
        .order('completed_at', { ascending: false });

      setTotalAssessments(assessmentCount || 0);
      setAllAssessments((assessments as AssessmentRecord[]) || []);

      if (assessments && assessments.length > 0) {
        const dist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
        let totalReadiness = 0;
        let readinessCount = 0;
        assessments.forEach((a: any) => {
          if (a.quadrant >= 1 && a.quadrant <= 4) dist[a.quadrant]++;
          if (a.cad_results?.readinessForQ4) {
            totalReadiness += a.cad_results.readinessForQ4;
            readinessCount++;
          }
        });
        setQuadrantDistribution(dist);
        setAvgReadiness(readinessCount > 0 ? totalReadiness / readinessCount : 0);
      }

      const { data: notifs } = await supabase
        .from('notifications')
        .select('*')
        .eq('for_admin', true)
        .order('created_at', { ascending: false })
        .limit(50);

      setAdminNotifs((notifs as AdminNotification[]) || []);
      setUnreadCount((notifs || []).filter((n: any) => !n.read).length);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  // ─── Actions ───────────────────────────────────
  const viewUserDetails = async (user: ProfileRecord) => {
    setSelectedUser(user);
    const { data } = await supabase
      .from('assessments')
      .select('*')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false });
    setSelectedUserAssessments((data as AssessmentRecord[]) || []);
  };

  const deleteAssessment = async (id: string) => {
    if (!confirm('Delete this assessment? This cannot be undone.')) return;
    const { error } = await supabase.from('assessments').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete');
    } else {
      toast.success('Assessment deleted');
      setAllAssessments(prev => prev.filter(a => a.id !== id));
      setTotalAssessments(prev => prev - 1);
      setSelectedUserAssessments(prev => prev.filter(a => a.id !== id));
    }
  };

  const markAllNotificationsRead = async () => {
    const unreadIds = adminNotifs.filter(n => !n.read).map(n => n.id);
    if (unreadIds.length > 0) {
      await supabase.from('notifications').update({ read: true }).in('id', unreadIds);
      setAdminNotifs(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    }
  };

  const sendNotification = async () => {
    if (!notifForm.title.trim() || !notifForm.message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    setSendingNotif(true);
    try {
      if (notifForm.userId === 'all') {
        const inserts = allUsers.map(u => ({
          user_id: u.id, type: 'admin_message',
          title: notifForm.title, message: notifForm.message,
          for_admin: false, read: false,
        }));
        const { error } = await supabase.from('notifications').insert(inserts);
        if (error) throw error;
        toast.success(`Sent to ${allUsers.length} users`);
      } else if (notifForm.userId) {
        const { error } = await supabase.from('notifications').insert({
          user_id: notifForm.userId, type: 'admin_message',
          title: notifForm.title, message: notifForm.message,
          for_admin: false, read: false,
        });
        if (error) throw error;
        const name = allUsers.find(u => u.id === notifForm.userId)?.full_name || 'User';
        toast.success(`Sent to ${name}`);
      }
      setNotifForm({ userId: "", title: "", message: "" });
      setShowSendNotif(false);
    } catch {
      toast.error('Failed to send');
    } finally {
      setSendingNotif(false);
    }
  };

  const saveNewPassword = async () => {
    if (!newPassword.trim() || newPassword.length < 4) {
      toast.error('Password must be at least 4 characters');
      return;
    }
    setSavingPassword(true);
    try {
      // Upsert into admin_settings
      const { error } = await supabase
        .from('admin_settings')
        .upsert({ key: 'admin_password', value: newPassword }, { onConflict: 'key' });
      if (error) throw error;
      toast.success('Admin password updated! (admin/admin still works as fallback)');
      setNewPassword("");
    } catch {
      toast.error('Could not save. Make sure admin_settings table exists in Supabase.');
    } finally {
      setSavingPassword(false);
    }
  };

  // ─── Filtering ─────────────────────────────────
  const filteredUsers = allUsers.filter(u =>
    (u.full_name || '').toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );
  const pagedUsers = filteredUsers.slice(userPage * ITEMS_PER_PAGE, (userPage + 1) * ITEMS_PER_PAGE);
  const totalUserPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const getUserName = (userId: string) => {
    const user = allUsers.find(u => u.id === userId);
    return user?.full_name || user?.email || userId.slice(0, 8);
  };

  const filteredAssessments = allAssessments.filter(a => {
    const name = getUserName(a.user_id);
    return name.toLowerCase().includes(assessmentSearch.toLowerCase()) ||
      (quadrantLabels[a.quadrant] || '').toLowerCase().includes(assessmentSearch.toLowerCase());
  });
  const pagedAssessments = filteredAssessments.slice(assessmentPage * ITEMS_PER_PAGE, (assessmentPage + 1) * ITEMS_PER_PAGE);
  const totalAssessmentPages = Math.ceil(filteredAssessments.length / ITEMS_PER_PAGE);

  const totalQ = Object.values(quadrantDistribution).reduce((a, b) => a + b, 0);

  const stats = [
    { label: "Users", value: totalUsers, icon: Users, color: "text-blue-600 dark:text-blue-400" },
    { label: "Assessments", value: totalAssessments, icon: FileText, color: "text-emerald-600 dark:text-emerald-400" },
    { label: "Avg Readiness", value: `${avgReadiness.toFixed(0)}%`, icon: TrendingUp, color: "text-violet-600 dark:text-violet-400" },
    { label: "Q4 Achievers", value: quadrantDistribution[4] || 0, icon: Target, color: "text-primary" },
  ];

  const tabs: { id: AdminTab; label: string; icon: any; badge?: number }[] = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'assessments', label: 'Assessments', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadCount || undefined },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Notion-style minimal header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/60">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-12">
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">3PN Admin</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={fetchDashboardData} className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => navigate("/")} className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
              <Home className="w-3.5 h-3.5" />
            </button>
            <button onClick={onLogout} className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6">
        {/* Notion-style sidebar tabs (horizontal on mobile) */}
        <nav className="flex gap-0.5 border-b border-border/60 -mb-px overflow-x-auto py-1 pt-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-muted/70 text-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-primary text-primary-foreground font-medium">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <main className="py-6">
          {/* ─── OVERVIEW ─── */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats — clean Notion-style */}
              <div className="grid sm:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="p-4 rounded-lg border border-border/60 bg-card">
                    <div className="flex items-center gap-2 mb-2">
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                      <span className="text-xs text-muted-foreground">{stat.label}</span>
                    </div>
                    <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Quadrant Distribution */}
              <div className="p-5 rounded-lg border border-border/60 bg-card">
                <div className="flex items-center gap-2 mb-5">
                  <Compass className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium text-foreground">Quadrant Distribution</h3>
                </div>
                {totalQ > 0 ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((q) => {
                      const count = quadrantDistribution[q] || 0;
                      const pct = totalQ > 0 ? (count / totalQ * 100) : 0;
                      return (
                        <div key={q} className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground w-36 flex-shrink-0">{quadrantLabels[q]}</span>
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all duration-700 ${quadrantBarColors[q]}`} style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs font-medium text-foreground w-12 text-right">{count} ({pct.toFixed(0)}%)</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground py-4 text-center">No assessment data yet.</p>
                )}
              </div>

              {/* Recent Activity — side by side */}
              <div className="grid lg:grid-cols-2 gap-4">
                <div className="rounded-lg border border-border/60 bg-card">
                  <div className="px-4 py-3 border-b border-border/60 flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Recent Users</span>
                    <button onClick={() => setActiveTab('users')} className="text-xs text-primary hover:underline">View all</button>
                  </div>
                  <div className="divide-y divide-border/40">
                    {allUsers.slice(0, 5).map((user) => (
                      <div key={user.id} className="px-4 py-2.5 flex items-center justify-between hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                            {(user.full_name?.[0] || user.email[0]).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm text-foreground">{user.full_name || 'Anonymous'}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{new Date(user.created_at).toLocaleDateString()}</span>
                      </div>
                    ))}
                    {allUsers.length === 0 && <p className="p-6 text-center text-sm text-muted-foreground">No users yet</p>}
                  </div>
                </div>

                <div className="rounded-lg border border-border/60 bg-card">
                  <div className="px-4 py-3 border-b border-border/60 flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Recent Assessments</span>
                    <button onClick={() => setActiveTab('assessments')} className="text-xs text-primary hover:underline">View all</button>
                  </div>
                  <div className="divide-y divide-border/40">
                    {allAssessments.slice(0, 5).map((a) => (
                      <div key={a.id} className="px-4 py-2.5 flex items-center justify-between hover:bg-muted/30 transition-colors">
                        <div>
                          <p className="text-sm text-foreground">{getUserName(a.user_id)}</p>
                          <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium mt-0.5 ${quadrantColors[a.quadrant]}`}>
                            {quadrantLabels[a.quadrant]}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">
                            {a.cad_results?.readinessForQ4 ? `${a.cad_results.readinessForQ4.toFixed(0)}%` : '-'}
                          </p>
                          <p className="text-xs text-muted-foreground">{new Date(a.completed_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                    {allAssessments.length === 0 && <p className="p-6 text-center text-sm text-muted-foreground">No assessments yet</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── USERS ─── */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-foreground">Users <span className="text-muted-foreground font-normal text-sm">({filteredUsers.length})</span></h2>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={userSearch}
                    onChange={(e) => { setUserSearch(e.target.value); setUserPage(0); }}
                    className="w-full pl-9 pr-3 py-2 rounded-md border border-border/60 bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-foreground/10"
                  />
                </div>
              </div>

              <div className="rounded-lg border border-border/60 bg-card overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/60">
                      <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium">Name</th>
                      <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium hidden sm:table-cell">Email</th>
                      <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium hidden md:table-cell">Joined</th>
                      <th className="text-right px-4 py-2.5 text-xs text-muted-foreground font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {pagedUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground flex-shrink-0">
                              {(user.full_name?.[0] || user.email[0]).toUpperCase()}
                            </div>
                            <span className="text-sm text-foreground">{user.full_name || 'Anonymous'}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2.5 text-sm text-muted-foreground hidden sm:table-cell">{user.email}</td>
                        <td className="px-4 py-2.5 text-sm text-muted-foreground hidden md:table-cell">
                          {new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td className="px-4 py-2.5 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={() => viewUserDetails(user)} className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                setNotifForm({ userId: user.id, title: "", message: "" });
                                setShowSendNotif(true);
                                setActiveTab('notifications');
                              }}
                              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                            >
                              <Send className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {totalUserPages > 1 && (
                  <div className="px-4 py-2.5 border-t border-border/60 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {userPage * ITEMS_PER_PAGE + 1}–{Math.min((userPage + 1) * ITEMS_PER_PAGE, filteredUsers.length)} of {filteredUsers.length}
                    </span>
                    <div className="flex gap-1">
                      <button disabled={userPage === 0} onClick={() => setUserPage(p => p - 1)} className="p-1 rounded text-muted-foreground hover:text-foreground disabled:opacity-30">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button disabled={userPage >= totalUserPages - 1} onClick={() => setUserPage(p => p + 1)} className="p-1 rounded text-muted-foreground hover:text-foreground disabled:opacity-30">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
                {filteredUsers.length === 0 && (
                  <div className="p-8 text-center text-sm text-muted-foreground">No users found</div>
                )}
              </div>

              {/* User Detail Panel */}
              {selectedUser && (
                <div className="rounded-lg border border-border/60 bg-card">
                  <div className="px-4 py-3 border-b border-border/60 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground">
                        {(selectedUser.full_name?.[0] || selectedUser.email[0]).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{selectedUser.full_name || 'Anonymous'}</p>
                        <p className="text-xs text-muted-foreground">{selectedUser.email}</p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedUser(null)} className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="grid sm:grid-cols-3 gap-3">
                      <div className="p-3 rounded-md bg-muted/30">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">User ID</p>
                        <p className="text-xs font-mono text-foreground break-all">{selectedUser.id}</p>
                      </div>
                      <div className="p-3 rounded-md bg-muted/30">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Joined</p>
                        <p className="text-xs text-foreground">{new Date(selectedUser.created_at).toLocaleString()}</p>
                      </div>
                      <div className="p-3 rounded-md bg-muted/30">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Assessments</p>
                        <p className="text-xs font-semibold text-foreground">{selectedUserAssessments.length}</p>
                      </div>
                    </div>

                    {selectedUserAssessments.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">Assessment History</p>
                        <div className="space-y-1.5">
                          {selectedUserAssessments.map(a => (
                            <div key={a.id} className="flex items-center justify-between p-2.5 rounded-md bg-muted/20 border border-border/40">
                              <div className="flex items-center gap-2.5">
                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${quadrantColors[a.quadrant]}`}>
                                  {quadrantLabels[a.quadrant]}
                                </span>
                                <span className="text-xs text-muted-foreground">{a.pathway}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">{new Date(a.completed_at).toLocaleDateString()}</span>
                                <button onClick={() => deleteAssessment(a.id)} className="p-1 rounded text-muted-foreground hover:text-red-500 transition-colors">
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ─── ASSESSMENTS ─── */}
          {activeTab === 'assessments' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-foreground">Assessments <span className="text-muted-foreground font-normal text-sm">({filteredAssessments.length})</span></h2>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={assessmentSearch}
                    onChange={(e) => { setAssessmentSearch(e.target.value); setAssessmentPage(0); }}
                    className="w-full pl-9 pr-3 py-2 rounded-md border border-border/60 bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-foreground/10"
                  />
                </div>
              </div>

              <div className="rounded-lg border border-border/60 bg-card overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/60">
                      <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium">User</th>
                      <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium">Quadrant</th>
                      <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium hidden sm:table-cell">Readiness</th>
                      <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium hidden md:table-cell">Date</th>
                      <th className="text-right px-4 py-2.5 text-xs text-muted-foreground font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {pagedAssessments.map((a) => (
                      <tr key={a.id} className="hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-2.5 text-sm text-foreground">{getUserName(a.user_id)}</td>
                        <td className="px-4 py-2.5">
                          <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium ${quadrantColors[a.quadrant]}`}>
                            {quadrantLabels[a.quadrant]}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 hidden sm:table-cell">
                          <div className="flex items-center gap-2">
                            <div className="w-14 h-1.5 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: `${a.cad_results?.readinessForQ4 || 0}%` }} />
                            </div>
                            <span className="text-xs text-foreground">{a.cad_results?.readinessForQ4?.toFixed(0) || '0'}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-2.5 text-sm text-muted-foreground hidden md:table-cell">
                          {new Date(a.completed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </td>
                        <td className="px-4 py-2.5 text-right">
                          <button onClick={() => deleteAssessment(a.id)} className="p-1.5 rounded-md text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {totalAssessmentPages > 1 && (
                  <div className="px-4 py-2.5 border-t border-border/60 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {assessmentPage * ITEMS_PER_PAGE + 1}–{Math.min((assessmentPage + 1) * ITEMS_PER_PAGE, filteredAssessments.length)} of {filteredAssessments.length}
                    </span>
                    <div className="flex gap-1">
                      <button disabled={assessmentPage === 0} onClick={() => setAssessmentPage(p => p - 1)} className="p-1 rounded text-muted-foreground hover:text-foreground disabled:opacity-30">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button disabled={assessmentPage >= totalAssessmentPages - 1} onClick={() => setAssessmentPage(p => p + 1)} className="p-1 rounded text-muted-foreground hover:text-foreground disabled:opacity-30">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
                {filteredAssessments.length === 0 && (
                  <div className="p-8 text-center text-sm text-muted-foreground">No assessments found</div>
                )}
              </div>
            </div>
          )}

          {/* ─── NOTIFICATIONS ─── */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
                <div className="flex gap-2">
                  {unreadCount > 0 && (
                    <button onClick={markAllNotificationsRead} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground rounded-md hover:bg-muted/50 transition-colors">
                      <CheckCheck className="w-3.5 h-3.5" />
                      Mark all read
                    </button>
                  )}
                  <Button size="sm" variant="outline" onClick={() => setShowSendNotif(true)} className="text-xs gap-1.5">
                    <Send className="w-3 h-3" />
                    Send
                  </Button>
                </div>
              </div>

              {/* Send Form */}
              {showSendNotif && (
                <div className="rounded-lg border border-border/60 bg-card p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">New Notification</span>
                    </div>
                    <button onClick={() => setShowSendNotif(false)} className="p-1 rounded text-muted-foreground hover:text-foreground">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <select
                    value={notifForm.userId}
                    onChange={(e) => setNotifForm(prev => ({ ...prev, userId: e.target.value }))}
                    className="w-full px-3 py-2 rounded-md border border-border/60 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-foreground/10"
                  >
                    <option value="">Select recipient...</option>
                    <option value="all">All Users ({allUsers.length})</option>
                    {allUsers.map(u => (
                      <option key={u.id} value={u.id}>{u.full_name || 'Anonymous'} — {u.email}</option>
                    ))}
                  </select>
                  <input
                    type="text" value={notifForm.title}
                    onChange={(e) => setNotifForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Title"
                    className="w-full px-3 py-2 rounded-md border border-border/60 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-foreground/10"
                  />
                  <textarea
                    value={notifForm.message}
                    onChange={(e) => setNotifForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Message..."
                    rows={2}
                    className="w-full px-3 py-2 rounded-md border border-border/60 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-foreground/10 resize-none"
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setShowSendNotif(false)}>Cancel</Button>
                    <Button size="sm" onClick={sendNotification} disabled={sendingNotif || !notifForm.userId || !notifForm.title.trim()}>
                      {sendingNotif ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Send className="w-3 h-3 mr-1" />}
                      Send
                    </Button>
                  </div>
                </div>
              )}

              {/* Feed */}
              <div className="rounded-lg border border-border/60 bg-card overflow-hidden">
                <div className="divide-y divide-border/40 max-h-[500px] overflow-y-auto">
                  {adminNotifs.length > 0 ? adminNotifs.map((notif) => (
                    <div
                      key={notif.id}
                      className={`px-4 py-3 hover:bg-muted/20 transition-colors ${!notif.read ? 'bg-primary/3' : ''}`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className={`p-1.5 rounded-md mt-0.5 ${
                          notif.type === 'admin_new_signup' ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-emerald-50 dark:bg-emerald-900/20'
                        }`}>
                          {notif.type === 'admin_new_signup'
                            ? <Users className="w-3 h-3 text-blue-500" />
                            : <FileText className="w-3 h-3 text-emerald-500" />
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${!notif.read ? 'font-medium' : ''} text-foreground`}>{notif.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{notif.message}</p>
                          <p className="text-[10px] text-muted-foreground/60 mt-1">{new Date(notif.created_at).toLocaleString()}</p>
                        </div>
                        {!notif.read && <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />}
                      </div>
                    </div>
                  )) : (
                    <div className="p-8 text-center text-sm text-muted-foreground">
                      <Bell className="w-8 h-8 mx-auto mb-2 opacity-30" />
                      No notifications yet
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ─── SETTINGS ─── */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-lg">
              <h2 className="text-lg font-semibold text-foreground">Settings</h2>

              <div className="rounded-lg border border-border/60 bg-card p-5 space-y-4">
                <div className="flex items-center gap-2.5">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium text-foreground">Change Admin Password</h3>
                </div>
                <p className="text-xs text-muted-foreground">
                  Set a custom password that's stored in Supabase. The default <code className="bg-muted px-1 py-0.5 rounded text-[11px]">admin / admin</code> will always work as a fallback.
                </p>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password (min 4 characters)"
                    className="flex-1 px-3 py-2 rounded-md border border-border/60 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-foreground/10"
                  />
                  <Button size="sm" onClick={saveNewPassword} disabled={savingPassword || !newPassword.trim()}>
                    {savingPassword ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Save'}
                  </Button>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Requires an <code className="bg-muted px-1 py-0.5 rounded">admin_settings</code> table in Supabase with columns: <code className="bg-muted px-1 py-0.5 rounded">key</code> (text, primary) and <code className="bg-muted px-1 py-0.5 rounded">value</code> (text).
                </p>
              </div>

              <div className="rounded-lg border border-border/60 bg-card p-5 space-y-3">
                <h3 className="text-sm font-medium text-foreground">About</h3>
                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <p>3PN Admin Dashboard v2.0</p>
                  <p>From Feeling Stuck to Steering Your Own Future.</p>
                  <p className="text-[10px]">© {new Date().getFullYear()} 3PN. All rights reserved.</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────
const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  if (!isLoggedIn) return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  return <AdminDashboard onLogout={() => setIsLoggedIn(false)} />;
};

export default Admin;
