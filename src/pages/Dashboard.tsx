import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AICareerChat } from '@/components/AICareerChat';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabase';
import {
  Rocket,
  TrendingUp,
  HeartHandshake,
  Target,
  Calendar,
  Award,
  BookOpen,
  MessageCircle,
  Loader2,
  ArrowRight,
  CheckCircle,
  Users,
  Clock,
  Zap,
  Bell,
  Trophy,
  Star,
  Flame,
  Crown,
  Camera,
  Edit3,
  Sparkles,
} from 'lucide-react';

interface Milestone {
  id: string;
  type: string;
  title: string;
  description: string;
  achieved_at: string;
}

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
}

interface AssessmentResult {
  id: string;
  quadrant: number;
  pathway: string;
  completed_at: string;
  ai_insights: any;
  cad_results: any;
}

const quadrantInfo: Record<number, {
  icon: any;
  title: string;
  subtitle: string;
  color: string;
  bgColor: string;
}> = {
  1: {
    icon: Rocket,
    title: 'Q1: The New Traveler',
    subtitle: 'Awareness + No System',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  2: {
    icon: Clock,
    title: 'Q2: The Steady Support',
    subtitle: 'Awareness + System',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  3: {
    icon: Zap,
    title: 'Q3: The Independent Starter',
    subtitle: 'Command + No System',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  4: {
    icon: HeartHandshake,
    title: 'Q4: Systemic Leverage Peak',
    subtitle: 'Command + System',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
};

const Dashboard = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState<AssessmentResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const avatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  // Avatar upload handler
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate file
    if (!file.type.startsWith('image/')) {
      const { toast } = await import('sonner');
      toast.error('Please select an image file');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      const { toast } = await import('sonner');
      toast.error('Image must be under 2MB');
      return;
    }

    setAvatarUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const filePath = `${user.id}/avatar.${ext}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update profile
      await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', user.id);
      setProfile((prev: any) => ({ ...prev, avatar_url: publicUrl }));

      const { toast } = await import('sonner');
      toast.success('Profile picture updated!');
    } catch (error) {
      console.error('Avatar upload error:', error);
      const { toast } = await import('sonner');
      toast.error('Failed to upload image. Make sure the avatars bucket exists in Supabase Storage.');
    } finally {
      setAvatarUploading(false);
    }
  };

  // Update display name
  const handleNameUpdate = async () => {
    if (!nameInput.trim() || !user) return;
    await supabase.from('profiles').update({ full_name: nameInput.trim() }).eq('id', user.id);
    setProfile((prev: any) => ({ ...prev, full_name: nameInput.trim() }));
    setEditingName(false);
    const { toast } = await import('sonner');
    toast.success('Name updated!');
  };

  const loadDashboardData = async () => {
    try {
      // Load profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      setProfile(profileData);

      // Load assessments
      const { data: assessmentData } = await supabase
        .from('assessments')
        .select('*')
        .eq('user_id', user?.id)
        .order('completed_at', { ascending: false });

      setAssessments(assessmentData || []);

      // Load milestones
      const { data: milestoneData } = await supabase
        .from('milestones')
        .select('*')
        .eq('user_id', user?.id)
        .order('achieved_at', { ascending: false });

      setMilestones(milestoneData || []);

      // Load notifications
      const { data: notifData } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user?.id)
        .eq('for_admin', false)
        .order('created_at', { ascending: false })
        .limit(10);

      setNotifications(notifData || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getQuadrantDisplay = (quadrant: number) => {
    return quadrantInfo[quadrant] || quadrantInfo[1];
  };

  const latestAssessment = assessments[0];
  const hasAssessment = assessments.length > 0;
  const unreadNotifs = notifications.filter(n => !n.read).length;

  const markNotificationRead = async (id: string) => {
    await supabase.from('notifications').update({ read: true }).eq('id', id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = async () => {
    const ids = notifications.filter(n => !n.read).map(n => n.id);
    if (ids.length > 0) {
      await supabase.from('notifications').update({ read: true }).in('id', ids);
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    }
  };

  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case 'first_assessment': return <Rocket className="w-5 h-5 text-blue-500" />;
      case 'reached_q4': return <Crown className="w-5 h-5 text-purple-500" />;
      case 'readiness_above_75': return <Flame className="w-5 h-5 text-orange-500" />;
      case 'quadrant_upgrade': return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'all_pillars_above_50': return <Star className="w-5 h-5 text-yellow-500" />;
      default: return <Trophy className="w-5 h-5 text-primary" />;
    }
  };

  // Extract pillar scores from latest assessment
  const pillarScores = latestAssessment?.cad_results?.pillarScores || {
    Capability: 0,
    Competence: 0,
    Character: 0,
    Capacity: 0,
  };
  const maxPillarScore = 80; // 20 questions * 4 max per question, divided by 4 pillars ≈ 80 max

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Premium Profile Header */}
          <div className="mb-8">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-border/50 p-6 md:p-8">
              {/* Subtle decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/3 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Avatar */}
                <div className="relative group">
                  <div 
                    className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-primary/20 bg-primary/10 flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
                    onClick={() => avatarInputRef.current?.click()}
                    title="Click to upload profile photo"
                  >
                    {avatarUploading ? (
                      <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    ) : profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl md:text-4xl font-bold text-primary">
                        {(profile?.full_name?.[0] || user?.email?.[0] || 'U').toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary text-primary-foreground rounded-lg flex items-center justify-center shadow-sm cursor-pointer" onClick={() => avatarInputRef.current?.click()}>
                    <Camera className="w-3.5 h-3.5" />
                  </div>
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                </div>

                {/* User Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    {editingName ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={nameInput}
                          onChange={(e) => setNameInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleNameUpdate()}
                          className="text-2xl font-bold bg-transparent border-b-2 border-primary outline-none text-foreground"
                          autoFocus
                        />
                        <Button size="sm" onClick={handleNameUpdate}>Save</Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditingName(false)}>Cancel</Button>
                      </div>
                    ) : (
                      <>
                        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                          {assessments.length > 0 ? 'Welcome back' : 'Welcome'}, {profile?.full_name?.split(' ')[0] || 'there'}! 👋
                        </h1>
                        <button
                          onClick={() => { setNameInput(profile?.full_name || ''); setEditingName(true); }}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                          title="Edit your name"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                  <p className="text-muted-foreground mt-1">
                    {user?.email}
                  </p>
                  <div className="flex items-center gap-4 mt-3 justify-center md:justify-start text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      Joined {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '...'}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5" />
                      {milestones.length} badge{milestones.length !== 1 ? 's' : ''}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      {assessments.length} assessment{assessments.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  {/* Notification Bell */}
                  <div className="relative">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="relative rounded-xl"
                    >
                      <Bell className="w-4 h-4" />
                      {unreadNotifs > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center animate-pulse">
                          {unreadNotifs}
                        </span>
                      )}
                    </Button>
                  </div>

              {/* Notification Slide-out Panel */}
              {showNotifications && (
                <>
                  {/* Backdrop */}
                  <div 
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60]" 
                    onClick={() => setShowNotifications(false)} 
                  />
                  {/* Panel */}
                  <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-card border-l border-border shadow-2xl z-[70] flex flex-col animate-slide-in-right">
                    {/* Header */}
                    <div className="p-5 border-b border-border flex items-center justify-between flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <Bell className="w-5 h-5 text-primary" />
                        <h3 className="text-lg font-semibold">Notifications</h3>
                        {unreadNotifs > 0 && (
                          <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                            {unreadNotifs} new
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {unreadNotifs > 0 && (
                          <button 
                            onClick={markAllRead} 
                            className="text-xs text-primary hover:underline font-medium"
                          >
                            Mark all read
                          </button>
                        )}
                        <button 
                          onClick={() => setShowNotifications(false)} 
                          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                    {/* Notification List */}
                    <div className="flex-1 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map(notif => (
                          <div
                            key={notif.id}
                            className={`p-4 border-b border-border last:border-0 cursor-pointer hover:bg-muted/50 transition-colors ${
                              !notif.read ? 'bg-primary/5' : ''
                            }`}
                            onClick={() => markNotificationRead(notif.id)}
                          >
                            <div className="flex items-start gap-3">
                              {!notif.read && <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />}
                              <div className={!notif.read ? '' : 'ml-[22px]'}>
                                <p className="text-sm font-semibold">{notif.title}</p>
                                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{notif.message}</p>
                                <p className="text-xs text-muted-foreground/70 mt-2">
                                  {new Date(notif.created_at).toLocaleDateString('en-US', { 
                                    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full p-12 text-center">
                          <Bell className="w-12 h-12 text-muted-foreground/30 mb-4" />
                          <p className="text-sm font-medium text-muted-foreground">All caught up!</p>
                          <p className="text-xs text-muted-foreground/70 mt-1">No notifications yet</p>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
                  <Button variant="outline" onClick={signOut} className="rounded-xl">
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          {!hasAssessment ? (
            <div className="max-w-2xl mx-auto text-center py-12">
              <div className="bg-gradient-hero rounded-2xl p-12 text-primary-foreground mb-8">
                <Target className="w-16 h-16 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">
                  Ready to discover your quadrant?
                </h2>
                <p className="text-lg mb-6 text-primary-foreground/90">
                  Take the CAD Diagnostic to discover where you are on the journey
                  from Point A (Potential) to Point B (Power).
                </p>
                <Button
                  size="lg"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  onClick={() => navigate('/assessment')}
                >
                  Start Assessment
                  <ArrowRight className="ml-2" />
                </Button>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader>
                    <Rocket className="w-8 h-8 text-blue-500 mb-2" />
                    <CardTitle className="text-sm">Q1: The New Traveler</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-xs">
                      Awareness + No System
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Clock className="w-8 h-8 text-green-500 mb-2" />
                    <CardTitle className="text-sm">Q2: The Steady Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-xs">
                      Awareness + System
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Zap className="w-8 h-8 text-orange-500 mb-2" />
                    <CardTitle className="text-sm">Q3: The Independent Starter</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-xs">
                      Command + No System
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <HeartHandshake className="w-8 h-8 text-purple-500 mb-2" />
                    <CardTitle className="text-sm">Q4: Systemic Leverage Peak</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-xs">
                      Command + System
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="insights">AI Insights</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="actions">Action Plan</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Current Quadrant */}
                <Card>
                  <CardHeader>
                    <CardTitle>Your Current Quadrant</CardTitle>
                    <CardDescription>
                      Based on your latest CAD Diagnostic
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {latestAssessment && (() => {
                      const info = getQuadrantDisplay(latestAssessment.quadrant);
                      const QuadIcon = info.icon;
                      return (
                        <div className="flex items-start gap-4">
                          <div className={`p-4 rounded-xl ${info.bgColor}`}>
                            <QuadIcon className={`w-8 h-8 ${info.color}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-1">
                              {info.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-1">
                              {info.subtitle}
                            </p>
                            {latestAssessment.pathway && (
                              <p className="text-sm text-primary font-medium mb-2">
                                Strategic Pathway: {latestAssessment.pathway}
                              </p>
                            )}
                            <p className="text-muted-foreground text-sm mb-4">
                              Completed on{' '}
                              {new Date(latestAssessment.completed_at).toLocaleDateString()}
                            </p>
                            <Button onClick={() => navigate('/assessment')}>
                              Retake Assessment
                            </Button>
                          </div>
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => navigate('/resources')}>
                    <CardHeader>
                      <BookOpen className="w-6 h-6 text-primary mb-2" />
                      <CardTitle className="text-base">Resources</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        Explore curated learning materials
                      </CardDescription>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => navigate('/mentors')}>
                    <CardHeader>
                      <Users className="w-6 h-6 text-primary mb-2" />
                      <CardTitle className="text-base">Find Mentors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>Connect with industry experts</CardDescription>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => navigate('/events')}>
                    <CardHeader>
                      <Calendar className="w-6 h-6 text-primary mb-2" />
                      <CardTitle className="text-base">Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>Join workshops and meetups</CardDescription>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => document.getElementById('ai-coach-section')?.scrollIntoView({ behavior: 'smooth' })}>
                    <CardHeader>
                      <MessageCircle className="w-6 h-6 text-primary mb-2" />
                      <CardTitle className="text-base">AI Coach</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>Get instant career guidance</CardDescription>
                    </CardContent>
                  </Card>
                </div>

                {/* Pillar Scores */}
                <Card>
                  <CardHeader>
                    <CardTitle>Your Pillar Scores</CardTitle>
                    <CardDescription>Performance across the 3Cs + Capacity framework</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(pillarScores).map(([pillar, score]) => {
                      const percentage = Math.round(((score as number) / maxPillarScore) * 100);
                      return (
                        <div key={pillar}>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">{pillar}</span>
                            <span className="text-sm text-muted-foreground">{percentage}%</span>
                          </div>
                          <Progress value={percentage} />
                        </div>
                      );
                    })}
                    {latestAssessment?.cad_results?.readinessForQ4 != null && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-semibold">Readiness for Mastery (Q4)</span>
                          <span className="text-sm font-semibold text-primary">
                            {latestAssessment.cad_results.readinessForQ4.toFixed(1)}%
                          </span>
                        </div>
                        <Progress value={latestAssessment.cad_results.readinessForQ4} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Progress & Milestones Tab */}
              <TabsContent value="progress" className="space-y-6">
                {/* Animated Journey Tower */}
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Your Mastery Voyage
                    </CardTitle>
                    <CardDescription>
                      Building your way from Potential to Power, one block at a time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-8 items-center">

                      {/* Building Block Tower */}
                      <div className="flex-1 w-full">
                        <div className="flex flex-col-reverse gap-0 max-w-sm mx-auto">
                          {[1, 2, 3, 4].map((q) => {
                            const info = quadrantInfo[q];
                            const QuadIcon = info.icon;
                            const isReached = latestAssessment && latestAssessment.quadrant >= q;
                            const isCurrent = latestAssessment && latestAssessment.quadrant === q;
                            const blockWidth = `${55 + (4 - q) * 15}%`;

                            return (
                              <div key={q} className="flex justify-center" style={{ 
                                animation: isReached ? `buildUp 0.5s ease-out ${(q - 1) * 0.15}s both` : 'none'
                              }}>
                                <div
                                  className={`relative rounded-lg border-2 transition-all duration-500 px-4 py-3 ${
                                    isCurrent
                                      ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                                      : isReached
                                      ? 'border-green-500/40 bg-green-500/5'
                                      : 'border-border/50 bg-muted/20 opacity-40'
                                  }`}
                                  style={{ width: blockWidth }}
                                >
                                  {isCurrent && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-ping" />
                                  )}
                                  {isCurrent && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />
                                  )}

                                  <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                      isCurrent ? 'bg-primary/20' : isReached ? 'bg-green-500/10' : 'bg-muted'
                                    }`}>
                                      <QuadIcon className={`w-4 h-4 ${
                                        isCurrent ? info.color : isReached ? 'text-green-500' : 'text-muted-foreground'
                                      }`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className={`text-xs font-bold ${isCurrent ? 'text-primary' : 'text-foreground'}`}>
                                        Q{q}: {info.title.replace(/Q\d:\s/, '')}
                                      </p>
                                      <p className="text-[10px] text-muted-foreground truncate">
                                        {q === 1 ? 'Foundation laid' : q === 2 ? 'Skills growing' : q === 3 ? 'Independence rising' : 'Systemic mastery'}
                                      </p>
                                    </div>
                                    {isReached && !isCurrent && (
                                      <span className="text-green-500 text-xs">✓</span>
                                    )}
                                    {isCurrent && (
                                      <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-semibold">You</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Journey connector line */}
                        {latestAssessment && (
                          <div className="max-w-sm mx-auto mt-4 flex items-center gap-2 px-4">
                            <div className="h-1 flex-1 rounded-full bg-muted overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full transition-all duration-1000 ease-out"
                                style={{ 
                                  width: `${((latestAssessment.quadrant - 1) / 3) * 100}%`,
                                  animation: 'growWidth 1s ease-out 0.3s both'
                                }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {latestAssessment.quadrant}/4 reached
                            </span>
                          </div>
                        )}
                      </div>

                      {/* SVG Progress Ring */}
                      {latestAssessment?.cad_results?.readinessForQ4 != null && (
                        <div className="flex flex-col items-center gap-3">
                          <div className="relative w-36 h-36">
                            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                              <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" className="text-muted" strokeWidth="8" />
                              <circle
                                cx="60" cy="60" r="50" fill="none" stroke="currentColor"
                                className="text-primary" strokeWidth="8" strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 50}`}
                                strokeDashoffset={`${2 * Math.PI * 50 * (1 - (latestAssessment.cad_results.readinessForQ4 / 100))}`}
                                style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
                              />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-2xl font-bold text-foreground">
                                {latestAssessment.cad_results.readinessForQ4.toFixed(0)}%
                              </span>
                              <span className="text-[10px] text-muted-foreground">Readiness</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground text-center max-w-[150px]">
                            Mastery readiness based on your CAD diagnostic
                          </p>
                        </div>
                      )}
                    </div>

                    {assessments.length > 1 && (
                      <div className="mt-6 pt-4 border-t border-border flex items-center gap-6 text-sm text-muted-foreground">
                        <span><strong className="text-foreground">{assessments.length}</strong> assessments</span>
                        <span>First: {new Date(assessments[assessments.length - 1].completed_at).toLocaleDateString()}</span>
                        <span>Latest: {new Date(assessments[0].completed_at).toLocaleDateString()}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Quick Stats as animated mini-cards */}
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { value: assessments.length, label: 'Assessments Taken', color: 'text-primary', bgColor: 'bg-primary/5', borderColor: 'border-primary/10' },
                    { value: milestones.length, label: 'Badges Earned', color: 'text-amber-500', bgColor: 'bg-amber-500/5', borderColor: 'border-amber-500/10' },
                    { value: `${latestAssessment?.cad_results?.readinessForQ4?.toFixed(0) || '0'}%`, label: 'Mastery Readiness', color: 'text-green-500', bgColor: 'bg-green-500/5', borderColor: 'border-green-500/10' },
                  ].map((stat, i) => (
                    <Card key={stat.label} className={`${stat.borderColor} ${stat.bgColor} border`} style={{ animation: `fadeSlideUp 0.4s ease-out ${i * 0.1}s both` }}>
                      <CardContent className="pt-6 text-center">
                        <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                        <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Achievement Badges */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-primary" />
                      Achievement Badges
                    </CardTitle>
                    <CardDescription>
                      Milestones earned on your mastery voyage
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {milestones.length > 0 ? (
                      <div className="grid sm:grid-cols-2 gap-4">
                        {milestones.map((milestone, index) => (
                          <div
                            key={milestone.id}
                            className="group relative overflow-hidden rounded-xl border border-primary/10 bg-gradient-to-br from-primary/5 via-background to-background p-5 transition-all duration-300 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
                            <div className="relative flex items-start gap-4">
                              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/10">
                                {getMilestoneIcon(milestone.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm text-foreground">{milestone.title}</p>
                                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{milestone.description}</p>
                                <p className="text-xs text-primary/60 mt-2 flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {new Date(milestone.achieved_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/5 mb-4">
                          <Trophy className="w-8 h-8 text-primary/30" />
                        </div>
                        <p className="text-muted-foreground text-sm font-medium">No badges yet</p>
                        <p className="text-muted-foreground text-xs mt-1 mb-6">
                          Complete assessments and progress to earn badges!
                        </p>
                        <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
                          {[
                            { icon: <Rocket className="w-4 h-4" />, label: 'First Assessment' },
                            { icon: <TrendingUp className="w-4 h-4" />, label: 'Quadrant Upgrade' },
                            { icon: <Crown className="w-4 h-4" />, label: 'Reached Mastery' },
                          ].map((badge) => (
                            <div key={badge.label} className="flex flex-col items-center gap-2 p-3 rounded-xl border border-dashed border-border opacity-40">
                              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                                {badge.icon}
                              </div>
                              <span className="text-[10px] text-muted-foreground text-center leading-tight">{badge.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-3xl font-bold text-primary">{assessments.length}</div>
                      <p className="text-sm text-muted-foreground mt-1">Assessments Taken</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-3xl font-bold text-amber-500">{milestones.length}</div>
                      <p className="text-sm text-muted-foreground mt-1">Milestones Earned</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-3xl font-bold text-green-500">
                        {latestAssessment?.cad_results?.readinessForQ4?.toFixed(0) || '0'}%
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Mastery Readiness</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="insights">
                <Card>
                  <CardHeader>
                    <CardTitle>AI-Powered Insights</CardTitle>
                    <CardDescription>
                      Personalized guidance based on your CAD Diagnostic
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {latestAssessment?.ai_insights ? (
                      <>
                        <div>
                          <h3 className="font-semibold mb-2">Summary</h3>
                          <p className="text-muted-foreground">
                            {latestAssessment.ai_insights.summary}
                          </p>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-3">Your Strengths</h3>
                          <div className="space-y-2">
                            {latestAssessment.ai_insights.strengths?.map(
                              (strength: string, i: number) => (
                                <div key={i} className="flex items-start gap-2">
                                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{strength}</span>
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-3">Areas for Growth</h3>
                          <div className="space-y-2">
                            {latestAssessment.ai_insights.areasForGrowth?.map(
                              (area: string, i: number) => (
                                <div key={i} className="flex items-start gap-2">
                                  <Target className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{area}</span>
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                          <p className="text-sm italic text-foreground">
                            "{latestAssessment.ai_insights.motivationalMessage}"
                          </p>
                        </div>
                      </>
                    ) : (
                      <p className="text-muted-foreground">
                        No insights available yet. Complete an assessment to get
                        personalized guidance.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Assessment History</CardTitle>
                    <CardDescription>
                      View your previous CAD Diagnostics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {assessments.map((assessment) => {
                        const info = getQuadrantDisplay(assessment.quadrant);
                        const QuadIcon = info.icon;
                        return (
                          <div
                            key={assessment.id}
                            className="flex items-center gap-4 p-4 border border-border rounded-lg"
                          >
                            <div className={`p-3 rounded-lg ${info.bgColor}`}>
                              <QuadIcon className={`w-6 h-6 ${info.color}`} />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold">{info.title}</h4>
                              <p className="text-xs text-muted-foreground mb-1">
                                {info.subtitle}
                              </p>
                              {assessment.pathway && (
                                <p className="text-xs text-primary">
                                  {assessment.pathway}
                                </p>
                              )}
                              <p className="text-sm text-muted-foreground">
                                {new Date(assessment.completed_at).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </p>
                            </div>
                            <Award className="w-5 h-5 text-muted-foreground" />
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="actions">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Action Plan</CardTitle>
                    <CardDescription>
                      Recommended next steps based on your quadrant
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {latestAssessment?.ai_insights?.actionSteps ? (
                      <div className="space-y-3">
                        {latestAssessment.ai_insights.actionSteps.map(
                          (step: string, i: number) => (
                            <div
                              key={i}
                              className="flex items-start gap-3 p-4 border border-border rounded-lg hover:border-primary transition-colors"
                            >
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                                {i + 1}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm">{step}</p>
                              </div>
                              <Button size="sm" variant="outline">
                                Start
                              </Button>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">
                        Complete an assessment to get your personalized action plan.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
      <Footer />
      <div id="ai-coach-section">
        <AICareerChat />
      </div>
    </div>
  );
};

export default Dashboard;
