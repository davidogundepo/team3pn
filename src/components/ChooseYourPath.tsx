import { Rocket, TrendingUp, HeartHandshake, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const paths = [
  {
    icon: Rocket,
    title: "Launch",
    subtitle: "I'm just starting out",
    description: "I'm just starting out and need a clear roadmap to build my career with confidence.",
    hoverBg: "hover:border-primary",
  },
  {
    icon: TrendingUp,
    title: "Progress",
    subtitle: "I'm ready to grow",
    description: "I'm in my career and ready to scale my impact with advanced strategies and networks.",
    hoverBg: "hover:border-primary",
  },
  {
    icon: HeartHandshake,
    title: "Invest",
    subtitle: "I want to give back",
    description: "I want to sponsor underserved talent or become a mentor for the next generation.",
    hoverBg: "hover:border-primary",
  },
];

const ChooseYourPath = () => {
  return (
    <section id="choose-path" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Choose Your Path
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            "I am looking to..."
          </h2>
          <p className="text-lg text-muted-foreground">
            Select the journey that matches where you are today. Each path begins with a quick self-assessment.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {paths.map((path) => (
            <Link
              key={path.title}
              to="/assessment"
              className={`group relative bg-card rounded-2xl p-8 border-2 border-border shadow-soft hover:shadow-medium transition-all duration-300 text-left ${path.hoverBg}`}
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground mb-6 shadow-lg group-hover:scale-105 transition-transform">
                <path.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-1">{path.title}</h3>
              <p className="text-primary font-semibold text-sm mb-4">{path.subtitle}</p>
              <p className="text-muted-foreground leading-relaxed mb-6">{path.description}</p>
              <div className="flex items-center text-primary font-semibold">
                Start here
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Not sure which path is right for you?</p>
          <Link to="/assessment">
            <Button variant="outline" size="lg">
              Take Our Quick Assessment First
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ChooseYourPath;