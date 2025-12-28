import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, CheckCircle, Rocket, TrendingUp, HeartHandshake } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "Where are you in your career journey?",
    options: [
      { value: "starting", label: "Just starting out or exploring options", points: { launch: 3, progress: 0, invest: 0 } },
      { value: "early", label: "Early career (0-3 years experience)", points: { launch: 2, progress: 1, invest: 0 } },
      { value: "mid", label: "Mid-career (3-10 years experience)", points: { launch: 0, progress: 3, invest: 1 } },
      { value: "senior", label: "Senior or leadership level", points: { launch: 0, progress: 1, invest: 3 } },
    ],
  },
  {
    id: 2,
    question: "What's your main goal right now?",
    options: [
      { value: "clarity", label: "Finding clarity and direction", points: { launch: 3, progress: 1, invest: 0 } },
      { value: "skills", label: "Building new skills", points: { launch: 2, progress: 2, invest: 0 } },
      { value: "network", label: "Expanding my professional network", points: { launch: 1, progress: 3, invest: 1 } },
      { value: "give-back", label: "Giving back and mentoring others", points: { launch: 0, progress: 0, invest: 3 } },
    ],
  },
  {
    id: 3,
    question: "How much time can you dedicate to your development?",
    options: [
      { value: "minimal", label: "A few hours per month", points: { launch: 1, progress: 1, invest: 2 } },
      { value: "moderate", label: "A few hours per week", points: { launch: 2, progress: 2, invest: 1 } },
      { value: "significant", label: "Several hours per week", points: { launch: 2, progress: 3, invest: 1 } },
      { value: "intensive", label: "I'm ready to fully commit", points: { launch: 3, progress: 2, invest: 1 } },
    ],
  },
  {
    id: 4,
    question: "What would be most valuable to you?",
    options: [
      { value: "roadmap", label: "A clear step-by-step roadmap", points: { launch: 3, progress: 1, invest: 0 } },
      { value: "mentor", label: "Access to a senior mentor", points: { launch: 1, progress: 3, invest: 0 } },
      { value: "opportunities", label: "Exclusive job opportunities", points: { launch: 2, progress: 3, invest: 0 } },
      { value: "impact", label: "Opportunity to shape others' careers", points: { launch: 0, progress: 0, invest: 3 } },
    ],
  },
  {
    id: 5,
    question: "What's your biggest challenge?",
    options: [
      { value: "direction", label: "Not knowing where to start", points: { launch: 3, progress: 0, invest: 0 } },
      { value: "visibility", label: "Getting noticed for opportunities", points: { launch: 1, progress: 3, invest: 0 } },
      { value: "network", label: "Lack of professional connections", points: { launch: 2, progress: 2, invest: 0 } },
      { value: "time", label: "Finding time to help others", points: { launch: 0, progress: 0, invest: 3 } },
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
    gradient: "from-primary to-teal-dark",
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
    gradient: "from-teal-light to-primary",
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
    gradient: "from-accent to-amber-dark",
  },
};

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [scores, setScores] = useState({ launch: 0, progress: 0, invest: 0 });
  const [showResults, setShowResults] = useState(false);

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

  const recommendedPath = getRecommendedPath();
  const pathInfo = pathDetails[recommendedPath];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

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
                <div className={`bg-gradient-to-br ${pathInfo.gradient} rounded-2xl p-8 text-primary-foreground mb-8`}>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/20 mb-6">
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
                          <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" onClick={() => navigate("/")}>
                    Get Started
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
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${progress}%` }}
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
                    className={`w-full p-5 rounded-xl border-2 text-left transition-all ${
                      answers[currentQuestion] === option.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
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
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Assessment;
