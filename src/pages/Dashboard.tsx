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
} from 'lucide-react';

interface AssessmentResult {
  id: string;
  stage: string;
  completed_at: string;
  ai_insights: any;
  scores: any;
}

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

  const getStageInfo = (stage: string) => {
    const stages = {
      'know-yourself': {
        icon: Rocket,
        title: 'Know Yourself',
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
      },
      'build-yourself': {
        icon: TrendingUp,
        title: 'Build Yourself',
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
      },
      'multiply-impact': {
        icon: HeartHandshake,
        title: 'Multiply Impact',
        color: 'text-purple-500',
        bgColor: 'bg-purple-500/10',
      },
    };
    return stages[stage as keyof typeof stages] || stages['know-yourself'];
  };

  const latestAssessment = assessments[0];
  const hasAssessment = assessments.length > 0;

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
                  Here's your career development dashboard
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
                  Ready to discover your path?
                </h2>
                <p className="text-lg mb-6 text-primary-foreground/90">
                  Take the 3PN Self-Assessment to get personalized guidance powered
                  by AI.
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

              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <Rocket className="w-8 h-8 text-blue-500 mb-2" />
                    <CardTitle className="text-lg">Know Yourself</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Discover your strengths and career clarity
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <TrendingUp className="w-8 h-8 text-green-500 mb-2" />
                    <CardTitle className="text-lg">Build Yourself</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Develop skills and accelerate growth
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <HeartHandshake className="w-8 h-8 text-purple-500 mb-2" />
                    <CardTitle className="text-lg">Multiply Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Lead, mentor, and scale your influence
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
                {/* Current Stage */}
                <Card>
                  <CardHeader>
                    <CardTitle>Your Current Stage</CardTitle>
                    <CardDescription>
                      Based on your latest assessment
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {latestAssessment && (
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-4 rounded-xl ${
                            getStageInfo(latestAssessment.stage).bgColor
                          }`}
                        >
                          {(() => {
                            const StageIcon = getStageInfo(latestAssessment.stage).icon;
                            return (
                              <StageIcon
                                className={`w-8 h-8 ${
                                  getStageInfo(latestAssessment.stage).color
                                }`}
                              />
                            );
                          })()}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-1">
                            {getStageInfo(latestAssessment.stage).title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4">
                            Completed on{' '}
                            {new Date(latestAssessment.completed_at).toLocaleDateString()}
                          </p>
                          <Button onClick={() => navigate('/assessment')}>
                            Retake Assessment
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="cursor-pointer hover:border-primary transition-colors">
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

                  <Card className="cursor-pointer hover:border-primary transition-colors">
                    <CardHeader>
                      <Users className="w-6 h-6 text-primary mb-2" />
                      <CardTitle className="text-base">Find Mentors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>Connect with industry experts</CardDescription>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:border-primary transition-colors">
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

                {/* Progress Tracker */}
                <Card>
                  <CardHeader>
                    <CardTitle>Your Progress</CardTitle>
                    <CardDescription>Track your development journey</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Self-Awareness</span>
                        <span className="text-sm text-muted-foreground">75%</span>
                      </div>
                      <Progress value={75} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Skills Development</span>
                        <span className="text-sm text-muted-foreground">60%</span>
                      </div>
                      <Progress value={60} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Network Building</span>
                        <span className="text-sm text-muted-foreground">40%</span>
                      </div>
                      <Progress value={40} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="insights">
                <Card>
                  <CardHeader>
                    <CardTitle>AI-Powered Insights</CardTitle>
                    <CardDescription>
                      Personalized guidance based on your assessment
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
                      View your previous assessments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {assessments.map((assessment) => {
                        const stageInfo = getStageInfo(assessment.stage);
                        const StageIcon = stageInfo.icon;
                        return (
                          <div
                            key={assessment.id}
                            className="flex items-center gap-4 p-4 border border-border rounded-lg"
                          >
                            <div className={`p-3 rounded-lg ${stageInfo.bgColor}`}>
                              <StageIcon className={`w-6 h-6 ${stageInfo.color}`} />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold">{stageInfo.title}</h4>
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
                      Recommended next steps based on your stage
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
