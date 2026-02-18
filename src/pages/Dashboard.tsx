import { useEffect, useState } from 'react';
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
} from 'lucide-react';

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
    title: 'Q1: The Unsure',
    subtitle: 'Awareness + No System',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  2: {
    icon: Clock,
    title: 'Q2: The Specialist',
    subtitle: 'Awareness + System',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  3: {
    icon: Zap,
    title: 'Q3: The Dependable',
    subtitle: 'Command + No System',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  4: {
    icon: HeartHandshake,
    title: 'Q4: Mastery',
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
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Welcome back, {profile?.full_name?.split(' ')[0] || 'there'}! 👋
                </h1>
                <p className="text-muted-foreground">
                  Here's your CAD Diagnostic dashboard
                </p>
              </div>
              <Button variant="outline" onClick={signOut}>
                Sign Out
              </Button>
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
                    <CardTitle className="text-sm">Q1: The Unsure</CardTitle>
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
                    <CardTitle className="text-sm">Q2: The Specialist</CardTitle>
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
                    <CardTitle className="text-sm">Q3: The Dependable</CardTitle>
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
                    <CardTitle className="text-sm">Q4: Mastery</CardTitle>
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

                  <Card className="cursor-pointer hover:border-primary transition-colors">
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
      <AICareerChat />
    </div>
  );
};

export default Dashboard;
