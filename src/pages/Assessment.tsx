import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, CheckCircle, Rocket, TrendingUp, HeartHandshake, Clock, Zap, Target } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "Where are you in your career journey?",
    options: [
      { value: "starting", label: "Just starting out or exploring options", points: { launch: 3, progress: 0, invest: 0 } },
      { value: "early", label: "Early career (0-3 years experience)", points: { launch: 2, progress: 1, invest: 0 } },
      { value: "established", label: "Established professional (3+ years)", points: { launch: 0, progress: 3, invest: 1 } },
      { value: "senior", label: "Senior or want to give back", points: { launch: 0, progress: 1, invest: 3 } },
    ],
  },
  {
    id: 2,
    question: "What's your main goal right now?",
    options: [
      { value: "clarity", label: "Finding clarity and direction", points: { launch: 3, progress: 1, invest: 0 } },
      { value: "growth", label: "Growing my skills and network", points: { launch: 1, progress: 3, invest: 0 } },
      { value: "give-back", label: "Mentoring and giving back", points: { launch: 0, progress: 0, invest: 3 } },
    ],
  },
  {
    id: 3,
    question: "What would be most valuable to you?",
    options: [
      { value: "roadmap", label: "A clear step-by-step roadmap", points: { launch: 3, progress: 1, invest: 0 } },
      { value: "connections", label: "Access to mentors and opportunities", points: { launch: 1, progress: 3, invest: 0 } },
      { value: "impact", label: "Opportunity to shape others' careers", points: { launch: 0, progress: 0, invest: 3 } },
    ],
  },
];

const pathDetails = {
  launch: {
    icon: Rocket,
    title: "Launch",
    subtitle: "Perfect for those just starting out",
    description: "You're at the beginning of your journey and need a clear roadmap. The Launch path will give you clarity, foundational skills, and the confidence to take your first steps.",
    nextSteps: [
      "Complete your Core Scan profile",
      "Access our foundational resources",
      "Join our community of early-career professionals",
      "Get matched with a Launch mentor",
    ],
  },
  progress: {
    icon: TrendingUp,
    title: "Progress",
    subtitle: "For professionals ready to level up",
    description: "You've built a foundation and now it's time to scale your impact. The Progress path connects you with senior mentors and exclusive opportunities.",
    nextSteps: [
      "Access advanced career resources",
      "Get matched with industry-specific mentors",
      "Join exclusive networking events",
      "Receive curated opportunity alerts",
    ],
  },
  invest: {
    icon: HeartHandshake,
    title: "Invest",
    subtitle: "For leaders who want to give back",
    description: "You have experience and wisdom to share. The Invest path lets you mentor emerging talent and sponsor underserved professionals.",
    nextSteps: [
      "Complete your mentor profile",
      "Get matched with mentees",
      "Join our mentor community",
      "Access mentor training resources",
    ],
  },
};

const whatYouGet = [
  { icon: Zap, title: "Clarity", description: "Know exactly which path fits your current situation" },
  { icon: Target, title: "Next Action", description: "Get a clear first step to take right now" },
  { icon: CheckCircle, title: "Simple Plan", description: "A straightforward roadmap tailored to you" },
];

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [scores, setScores] = useState({ launch: 0, progress: 0, invest: 0 });
  const [showResults, setShowResults] = useState(false);
  const [captureInfo, setCaptureInfo] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });

  const handleAnswer = (value: string, points: { launch: number; progress: number; invest: number }) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: value }));
    setScores((prev) => ({
      launch: prev.launch + points.launch,
      progress: prev.progress + points.progress,
      invest: prev.invest + points.invest,
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      const prevAnswer = answers[currentQuestion - 1];
      const prevQuestion = questions[currentQuestion - 1];
      const prevPoints = prevQuestion.options.find((o) => o.value === prevAnswer)?.points;
      
      if (prevPoints) {
        setScores((prev) => ({
          launch: prev.launch - prevPoints.launch,
          progress: prev.progress - prevPoints.progress,
          invest: prev.invest - prevPoints.invest,
        }));
      }
      
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const getRecommendedPath = () => {
    if (scores.invest >= scores.launch && scores.invest >= scores.progress) return "invest";
    if (scores.progress >= scores.launch) return "progress";
    return "launch";
  };

  const handleSaveResults = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving results for:", userInfo);
    setCaptureInfo(false);
  };

  const recommendedPath = getRecommendedPath();
  const pathInfo = pathDetails[recommendedPath];

  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-2xl mx-auto text-center">
                <div className="mb-8">
                  <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Your Assessment is Complete!
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Based on your responses, we recommend the following path for you:
                  </p>
                </div>

                {/* Recommended Path Card */}
                <div className="bg-gradient-hero rounded-2xl p-8 text-primary-foreground mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-6">
                    <pathInfo.icon className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">{pathInfo.title}</h2>
                  <p className="text-primary-foreground/80 mb-4">{pathInfo.subtitle}</p>
                  <p className="text-lg leading-relaxed mb-8">{pathInfo.description}</p>

                  <div className="bg-primary-foreground/10 rounded-xl p-6 text-left">
                    <h3 className="font-semibold mb-4">Your Next Steps:</h3>
                    <ul className="space-y-3">
                      {pathInfo.nextSteps.map((step, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Capture Email */}
                {!captureInfo ? (
                  <div className="bg-muted rounded-xl p-6 mb-8">
                    <p className="text-foreground font-semibold mb-2">Want to save your results?</p>
                    <p className="text-muted-foreground text-sm mb-4">Get your personalized roadmap and updates sent to your inbox.</p>
                    <Button onClick={() => setCaptureInfo(true)}>
                      Save My Results
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSaveResults} className="bg-muted rounded-xl p-6 mb-8 space-y-4">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={userInfo.name}
                      onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="email"
                      placeholder="Your email"
                      value={userInfo.email}
                      onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button type="submit" className="w-full">
                      Send My Roadmap
                    </Button>
                  </form>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" onClick={() => navigate("/about")}>
                    Learn More About 3PN
                    <ArrowRight className="ml-2" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={() => {
                      setShowResults(false);
                      setCurrentQuestion(0);
                      setAnswers({});
                      setScores({ launch: 0, progress: 0, invest: 0 });
                      setCaptureInfo(false);
                      setUserInfo({ name: "", email: "" });
                    }}
                  >
                    Retake Assessment
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const question = questions[currentQuestion];

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
                    <span>10–20 seconds</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    No login. 3 quick questions. Instant result.
                  </p>
                </div>
              )}

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span className="font-semibold">Question {currentQuestion + 1} of {questions.length}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="text-center mb-10">
                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
                  Core Scan
                </span>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  {question.question}
                </h1>
              </div>

              {/* Options */}
              <div className="space-y-4 mb-8">
                {question.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value, option.points)}
                    className={`w-full p-5 rounded-xl border-2 text-left transition-all hover:border-primary hover:bg-primary/5 ${
                      answers[currentQuestion] === option.value
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                  >
                    <span className="text-lg font-medium text-foreground">{option.label}</span>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              {currentQuestion > 0 && (
                <div className="flex justify-center">
                  <Button variant="ghost" onClick={goBack}>
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Previous Question
                  </Button>
                </div>
              )}

              {/* What You Get - only on first question */}
              {currentQuestion === 0 && (
                <div className="mt-16 pt-8 border-t border-border">
                  <h3 className="text-lg font-bold text-foreground text-center mb-6">What You Get</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {whatYouGet.map((item) => (
                      <div key={item.title} className="text-center p-4">
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