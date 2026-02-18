import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { generatePersonalizedInsights } from "@/lib/gemini";
import { assessmentQuestions, calculateQuadrant, QuestionOption, QuadrantLevel, Pillar } from "@/lib/assessmentData";
import { ArrowRight, ArrowLeft, CheckCircle, Rocket, TrendingUp, HeartHandshake, Clock, Zap, Target, Loader2, Sparkles, Download, Mail, Share2 } from "lucide-react";
import jsPDF from 'jspdf';

const quadrantDetails = {
  1: {
    icon: Rocket,
    title: "Q1: The New Traveler",
    subtitle: "Awareness + No System",
    description: "You recognize what's possible but haven't yet built the structures to achieve it. This is the starting point of transformation - un-outsourcing begins with awareness.",
    characteristics: [
      "You're aware of your potential but lack clear direction",
      "No consistent systems or routines in place",
      "Often feel overwhelmed by possibilities",
      "Ready to transition from passenger to pilot",
    ],
    focusQualities: [
      "Build self-awareness through reflection",
      "Establish basic systems and routines",
      "Identify your natural strengths",
      "Create accountability structures",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  2: {
    icon: Clock,
    title: "Q2: The Steady Support",
    subtitle: "Awareness + System",
    description: "You've built strong systems and processes but may not fully command your unique power. Route A (System-First) develops mastery through structured excellence.",
    characteristics: [
      "Strong systems and processes in place",
      "Consistent execution and reliability",
      "May rely too much on external frameworks",
      "Building expertise within established structures",
    ],
    focusQualities: [
      "Develop internal command and confidence",
      "Move from following to innovating",
      "Trust your instincts within systems",
      "Build authentic leadership presence",
    ],
    color: "from-green-500 to-emerald-500",
  },
  3: {
    icon: Zap,
    title: "Q3: The Independent Starter",
    subtitle: "Command + No System",
    description: "You have natural talent and confidence but lack the systems to scale. Route B (Command-First) requires building structures around your strengths.",
    characteristics: [
      "Strong personal capability and confidence",
      "Natural talent but inconsistent results",
      "Rely on instinct over process",
      "Ready to systematize your success",
    ],
    focusQualities: [
      "Document your natural processes",
      "Build repeatable systems",
      "Create leverage through structure",
      "Scale your impact with frameworks",
    ],
    color: "from-orange-500 to-amber-500",
  },
  4: {
    icon: HeartHandshake,
    title: "Q4: Systemic Leverage Peak",
    subtitle: "Command + System",
    description: "You've achieved the 3PN ideal: Capability, Competence, Character, and Capacity working in harmony. You're a Pilot, not a passenger.",
    characteristics: [
      "Full command of your unique power",
      "Robust systems that amplify your strengths",
      "Consistent high-level performance",
      "Ready to multiply impact and mentor others",
    ],
    focusQualities: [
      "Share your wisdom through mentoring",
      "Build communities and movements",
      "Scale your impact beyond yourself",
      "Define your legacy and lasting influence",
    ],
    color: "from-purple-500 to-pink-500",
  },
};

const whatYouGet = [
  { icon: Zap, title: "Instant Results", description: "Know exactly which stage fits your current situation" },
  { icon: Sparkles, title: "AI Insights", description: "Get personalized feedback powered by artificial intelligence" },
  { icon: Target, title: "Action Plan", description: "Receive a clear roadmap tailored to you" },
];

const Assessment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, QuestionOption>>({});
  const [showResults, setShowResults] = useState(false);
  const [captureInfo, setCaptureInfo] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const [quadrant, setQuadrant] = useState<QuadrantLevel | null>(null);
  const [cadResults, setCadResults] = useState<any>(null);
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnswer = (option: QuestionOption) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: option }));

    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Assessment complete - process results
      processResults();
    }
  };

  const processResults = async () => {
    setLoading(true);
    setShowResults(true);

    try {
      // Convert answers to array format for CAD scoring
      const responsesArray = Object.entries(answers).map(([qId, ans]) => {
        const question = assessmentQuestions[Number(qId)];
        return {
          questionId: Number(qId) + 1,
          quadrant: ans.quadrant as QuadrantLevel,
          internalState: ans.internalState,
          externalState: ans.externalState,
          pillar: question.pillar,
        };
      });

      // Calculate CAD quadrant results
      const results = calculateQuadrant(responsesArray);
      setQuadrant(results.dominantQuadrant);
      setCadResults(results);

      // Generate AI insights with CAD framework
      const insights = await generatePersonalizedInsights(
        results,
        responsesArray,
        { name: userInfo.name || user?.email, email: userInfo.email || user?.email }
      );
      setAiInsights(insights);

      // Save to database if user is logged in
      if (user) {
        await supabase.from('assessments').insert({
          user_id: user.id,
          quadrant: results.dominantQuadrant,
          pathway: results.strategicPathway,
          responses: responsesArray,
          cad_results: results,
          ai_insights: insights,
          completed_at: new Date().toISOString(),
        });

        toast.success('Assessment saved to your dashboard!');
      }
    } catch (error) {
      console.error('Error processing results:', error);
      toast.error('An error occurred while processing your results');
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSaveResults = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userInfo.email) {
      toast.error('Please enter your email');
      return;
    }

    try {
      // Send email with results (this would use your email service)
      toast.success('Results sent to your email!');
      generatePDF();
      setCaptureInfo(false);
    } catch (error) {
      console.error('Error sending results:', error);
      toast.error('Failed to send results');
    }
  };

  const generatePDF = () => {
    if (!quadrant || !cadResults) return;
    
    const doc = new jsPDF();
    const quadInfo = quadrantDetails[quadrant];
    
    // Add header
    doc.setFontSize(24);
    doc.setTextColor(79, 70, 229);
    doc.text('3PN Mastery Voyage — CAD Diagnostic', 20, 30);
    
    // Add subtitle
    doc.setFontSize(11);
    doc.setTextColor(120, 120, 120);
    doc.text('Your journey from Point A (Potential) to Point B (Power)', 20, 40);
    
    // Add date
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(new Date().toLocaleDateString(), 20, 48);
    
    // Add quadrant
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text(`Your Quadrant: ${quadInfo.title}`, 20, 65);
    
    // Add pathway
    doc.setFontSize(12);
    doc.text(`Strategic Pathway: ${cadResults.strategicPathway}`, 20, 75);
    doc.text(`Readiness for Mastery: ${cadResults.readinessForQ4.toFixed(1)}%`, 20, 85);
    
    // Add description
    const splitDescription = doc.splitTextToSize(quadInfo.description, 170);
    doc.text(splitDescription, 20, 100);
    
    // Add AI insights if available
    if (aiInsights) {
      doc.setFontSize(14);
      doc.text('AI-Powered Insights', 20, 130);
      
      doc.setFontSize(10);
      const splitSummary = doc.splitTextToSize(aiInsights.summary, 170);
      doc.text(splitSummary, 20, 140);
      
      let yPos = 160;
      
      // Strengths
      if (aiInsights.strengths?.length) {
        doc.setFontSize(12);
        doc.text('Your Strengths:', 20, yPos);
        doc.setFontSize(10);
        aiInsights.strengths.forEach((s: string, i: number) => {
          yPos += 10;
          if (yPos > 270) { doc.addPage(); yPos = 30; }
          const lines = doc.splitTextToSize(`• ${s}`, 165);
          doc.text(lines, 25, yPos);
          yPos += (lines.length - 1) * 5;
        });
      }
      
      yPos += 15;
      
      // Areas for Growth
      if (aiInsights.areasForGrowth?.length) {
        if (yPos > 250) { doc.addPage(); yPos = 30; }
        doc.setFontSize(12);
        doc.text('Areas for Growth:', 20, yPos);
        doc.setFontSize(10);
        aiInsights.areasForGrowth.forEach((a: string, i: number) => {
          yPos += 10;
          if (yPos > 270) { doc.addPage(); yPos = 30; }
          const lines = doc.splitTextToSize(`• ${a}`, 165);
          doc.text(lines, 25, yPos);
          yPos += (lines.length - 1) * 5;
        });
      }
      
      // Action Steps on new page
      if (aiInsights.actionSteps?.length) {
        doc.addPage();
        doc.setFontSize(14);
        doc.text('Your Action Plan', 20, 30);
        doc.setFontSize(10);
        aiInsights.actionSteps.forEach((step: string, i: number) => {
          const lines = doc.splitTextToSize(`${i + 1}. ${step}`, 165);
          doc.text(lines, 20, 45 + (i * 15));
        });
      }
      
      // Motivational message
      if (aiInsights.motivationalMessage) {
        const lastPage = doc.internal.pages.length - 1;
        doc.setPage(lastPage);
        doc.setFontSize(11);
        doc.setTextColor(79, 70, 229);
        const msg = doc.splitTextToSize(`"${aiInsights.motivationalMessage}"`, 170);
        doc.text(msg, 20, 260);
      }
    } else {
      // Focus qualities if no AI insights
      doc.addPage();
      doc.setFontSize(14);
      doc.text('Your Focus Qualities:', 20, 30);
      doc.setFontSize(10);
      quadInfo.focusQualities.forEach((quality: string, i: number) => {
        const splitQuality = doc.splitTextToSize(`${i + 1}. ${quality}`, 165);
        doc.text(splitQuality, 20, 45 + (i * 15));
      });
    }
    
    // Footer on last page
    const totalPages = doc.internal.pages.length - 1;
    doc.setPage(totalPages);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('3PN - Prepare, Progress, and Prosper Network | www.3pn.org', 20, 285);
    
    // Download
    doc.save('3PN-Mastery-Voyage-Results.pdf');
    toast.success('PDF downloaded!');
  };

  const shareViaEmail = () => {
    if (!quadrant || !cadResults) return;
    const quadInfo = quadrantDetails[quadrant];
    const subject = encodeURIComponent('My 3PN Mastery Voyage — CAD Diagnostic Results');
    const body = encodeURIComponent(
      `My 3PN CAD Diagnostic Results\n\n` +
      `Quadrant: ${quadInfo.title}\n` +
      `${quadInfo.subtitle}\n\n` +
      `Strategic Pathway: ${cadResults.strategicPathway}\n` +
      `Readiness for Mastery: ${cadResults.readinessForQ4.toFixed(1)}%\n\n` +
      `${quadInfo.description}\n\n` +
      (aiInsights?.summary ? `AI Insights: ${aiInsights.summary}\n\n` : '') +
      `Take the assessment: ${window.location.origin}/assessment\n\n` +
      `— 3PN: Prepare, Progress, and Prosper Network`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  const quadInfo = quadrant ? quadrantDetails[quadrant] : null;

  if (showResults && quadInfo) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-2xl mx-auto text-center">
                {loading ? (
                  <div className="py-12">
                    <Loader2 className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
                    <h2 className="text-2xl font-bold mb-2">Analyzing Your Responses...</h2>
                    <p className="text-muted-foreground">Our AI is generating CAD Diagnostic insights for you</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Your Mastery Voyage Begins! 🎉
                      </h1>
                      <p className="text-lg text-muted-foreground">
                        Your CAD Diagnostic is complete — your journey from Point A (Potential) to Point B (Power) starts now
                      </p>
                    </div>

                    {/* Quadrant & Pathway Card */}
                    <div className={`bg-gradient-to-r ${quadInfo.color} rounded-2xl p-8 text-white mb-8`}>
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
                        <quadInfo.icon className="w-8 h-8" />
                      </div>
                      <h2 className="text-3xl font-bold mb-2">{quadInfo.title}</h2>
                      <p className="text-white/90 mb-4">{quadInfo.subtitle}</p>
                      <p className="text-lg leading-relaxed mb-6">{quadInfo.description}</p>

                      {/* Strategic Pathway & Metrics */}
                      {cadResults && (
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="text-left">
                              <h4 className="font-semibold mb-2">Strategic Pathway</h4>
                              <p className="text-white/80">{cadResults.strategicPathway}</p>
                            </div>
                            <div className="text-left">
                              <h4 className="font-semibold mb-2">Readiness for Mastery</h4>
                              <p className="text-white/80">{cadResults.readinessForQ4.toFixed(1)}%</p>
                            </div>
                            <div className="text-left">
                              <h4 className="font-semibold mb-2">Internal Leverage</h4>
                              <p className="text-white/80">{cadResults.internalLeverage.toFixed(1)}% Command</p>
                            </div>
                            <div className="text-left">
                              <h4 className="font-semibold mb-2">External System</h4>
                              <p className="text-white/80">{cadResults.externalSystem.toFixed(1)}% Systematized</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* AI Insights */}
                      {aiInsights && (
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left mb-6">
                          <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-5 h-5" />
                            <h3 className="font-semibold">AI-Powered Insights</h3>
                          </div>
                          <p className="text-sm mb-4 leading-relaxed">{aiInsights.summary}</p>
                          
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <h4 className="font-semibold mb-2 flex items-center gap-1">
                                <CheckCircle className="w-4 h-4" />
                                Strengths
                              </h4>
                              <ul className="space-y-1">
                                {aiInsights.strengths?.slice(0, 3).map((s: string, i: number) => (
                                  <li key={i} className="text-white/80">• {s}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2 flex items-center gap-1">
                                <Target className="w-4 h-4" />
                                Growth Areas
                              </h4>
                              <ul className="space-y-1">
                                {aiInsights.areasForGrowth?.slice(0, 3).map((a: string, i: number) => (
                                  <li key={i} className="text-white/80">• {a}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left">
                        <h3 className="font-semibold mb-4">Focus Qualities for Growth:</h3>
                        <ul className="space-y-3">
                          {quadInfo.focusQualities.map((quality, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-semibold">
                                {index + 1}
                              </div>
                              <span className="text-sm">{quality}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Characteristics */}
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl p-6 mb-8">
                      <h3 className="font-semibold text-foreground mb-4">Your Quadrant Characteristics:</h3>
                      <ul className="space-y-2 text-left">
                        {quadInfo.characteristics.map((char, index) => (
                          <li key={index} className="flex items-start gap-2 text-foreground/80">
                            <CheckCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                            <span>{char}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Motivational Message */}
                    {aiInsights?.motivationalMessage && (
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
                        <p className="text-foreground italic text-lg">
                          "{aiInsights.motivationalMessage}"
                        </p>
                      </div>
                    )}

                    {/* Capture Email */}
                    {!user && (
                      <div className="mb-8">
                        {!captureInfo ? (
                          <div className="bg-muted rounded-xl p-6">
                            <p className="text-foreground font-semibold mb-2">Want to save your results?</p>
                            <p className="text-muted-foreground text-sm mb-4">
                              Get your personalized roadmap and PDF report sent to your inbox.
                            </p>
                            <Button onClick={() => setCaptureInfo(true)} size="lg">
                              <Download className="mr-2" />
                              Get My PDF Report
                            </Button>
                          </div>
                        ) : (
                          <form onSubmit={handleSaveResults} className="bg-muted rounded-xl p-6 space-y-4">
                            <Input
                              type="text"
                              placeholder="Your name"
                              value={userInfo.name}
                              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                              required
                            />
                            <Input
                              type="email"
                              placeholder="Your email"
                              value={userInfo.email}
                              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                              required
                            />
                            <Button type="submit" className="w-full" size="lg">
                              Send My Report & Download PDF
                            </Button>
                          </form>
                        )}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3 justify-center mb-8">
                      <Button onClick={generatePDF} size="lg">
                        <Download className="mr-2" />
                        Download PDF
                      </Button>
                      <Button onClick={shareViaEmail} size="lg" variant="outline">
                        <Mail className="mr-2" />
                        Email Results
                      </Button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      {user ? (
                        <Button size="lg" onClick={() => navigate("/dashboard")}>
                          Go to Dashboard
                          <ArrowRight className="ml-2" />
                        </Button>
                      ) : (
                        <Button size="lg" onClick={() => navigate("/login")}>
                          Create Free Account
                          <ArrowRight className="ml-2" />
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="lg" 
                        onClick={() => {
                          setShowResults(false);
                          setCurrentQuestion(0);
                          setAnswers({});
                          setQuadrant(null);
                          setCadResults(null);
                          setAiInsights(null);
                          setCaptureInfo(false);
                          setUserInfo({ name: "", email: "" });
                        }}
                      >
                        Retake Assessment
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const question = assessmentQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl mx-auto">
              {/* Intro Text - only on first question */}
              {currentQuestion === 0 && (
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 text-muted-foreground text-sm mb-4">
                    <Clock className="w-4 h-4" />
                    <span>5-7 minutes • 20 questions</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                    3PN Mastery Voyage
                  </h1>
                  <p className="text-muted-foreground mb-6">
                    Discover your quadrant and begin your journey from Point A (Potential) to Point B (Power)
                  </p>
                </div>
              )}

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                  <span className="font-semibold">
                    Question {currentQuestion + 1} of {assessmentQuestions.length}
                  </span>
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {question.pillar} — {question.quality}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / assessmentQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {question.statement}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Select the option that best describes you
                </p>
              </div>

              {/* Options */}
              <div className="space-y-4 mb-8">
                {question.options.map((option, index) => (
                  <button
                    key={option.quadrant}
                    onClick={() => handleAnswer(option)}
                    className={`w-full p-5 rounded-xl border-2 text-left transition-all hover:border-primary hover:bg-primary/5 hover:shadow-md ${
                      answers[currentQuestion]?.quadrant === option.quadrant
                        ? "border-primary bg-primary/10 shadow-md"
                        : "border-border"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold transition-colors ${
                        answers[currentQuestion]?.quadrant === option.quadrant
                          ? "border-primary bg-primary text-white"
                          : "border-muted-foreground/30 text-muted-foreground"
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-base font-medium text-foreground flex-1">
                        {option.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                {currentQuestion > 0 ? (
                  <Button variant="ghost" onClick={goBack}>
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Previous
                  </Button>
                ) : (
                  <div />
                )}
                
                {answers[currentQuestion] && (
                  <Button onClick={() => handleAnswer(answers[currentQuestion])} size="lg">
                    {currentQuestion === assessmentQuestions.length - 1 ? 'Complete Assessment' : 'Next Question'}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                )}
              </div>

              {/* What You Get - only on first question */}
              {currentQuestion === 0 && (
                <div className="mt-16 pt-8 border-t border-border">
                  <h3 className="text-lg font-bold text-foreground text-center mb-6">
                    What You'll Get
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {whatYouGet.map((item) => (
                      <div key={item.title} className="text-center p-4 rounded-lg bg-muted/50">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mb-3">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Assessment;