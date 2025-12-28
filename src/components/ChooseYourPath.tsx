import { Rocket, TrendingUp, HeartHandshake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const paths = [
  {
    icon: Rocket,
    title: "Launch",
    subtitle: "I'm just starting out",
    description: "I'm just starting out and need a clear roadmap to build my career with confidence.",
    gradient: "from-primary to-teal-dark",
    hoverBg: "hover:bg-primary/5",
  },
  {
    icon: TrendingUp,
    title: "Progress",
    subtitle: "I'm ready to grow",
    description: "I'm in my career and ready to scale my impact with advanced strategies and networks.",
    gradient: "from-teal-light to-primary",
    hoverBg: "hover:bg-teal-light/5",
  },
  {
    icon: HeartHandshake,
    title: "Invest",
    subtitle: "I want to give back",
    description: "I want to sponsor underserved talent or become a mentor for the next generation.",
    gradient: "from-accent to-amber-dark",
    hoverBg: "hover:bg-accent/5",
  },
];

const ChooseYourPath = () => {
  return (
    <section id="choose-path" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 bg-accent/15 text-amber-dark rounded-full text-sm font-semibold mb-4">
            Choose Your Path
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            "I am looking to..."
          </h2>
          <p className="text-lg text-muted-foreground">
            Select the journey that matches where you are today. Each path begins with a quick self-assessment.
          </p>
        </div>

        {/* Paths Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {paths.map((path, index) => (
            <button
              key={path.title}
              className={`group relative bg-card rounded-2xl p-8 border border-border/60 shadow-soft hover:shadow-medium transition-all duration-300 text-left ${path.hoverBg}`}
            >
              {/* Gradient bar */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${path.gradient} rounded-t-2xl`} />

              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${path.gradient} text-primary-foreground mb-6 shadow-lg group-hover:scale-105 transition-transform`}>
                <path.icon className="w-8 h-8" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-foreground mb-1">
                {path.title}
              </h3>
              <p className="text-primary font-semibold text-sm mb-4">
                {path.subtitle}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {path.description}
              </p>

              {/* CTA Arrow */}
              <div className="flex items-center text-primary font-semibold">
                Start here
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </button>
          ))}
        </div>

        {/* Alternative CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Not sure which path is right for you?
          </p>
          <Button variant="outline" size="lg">
            Take Our Quick Assessment First
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ChooseYourPath;
