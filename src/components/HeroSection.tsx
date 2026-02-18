import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden pt-20">
      {/* Animated ripple rings */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hero-ripple hero-ripple-1" />
        <div className="hero-ripple hero-ripple-2" />
        <div className="hero-ripple hero-ripple-3" />
        {/* Floating gradient orbs */}
        <div className="absolute top-1/4 left-[10%] w-80 h-80 bg-primary/5 rounded-full blur-[100px] animate-float-slow" />
        <div className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] animate-float-slower" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-foreground/[0.02] rounded-full blur-[80px] animate-pulse-soft" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center min-h-[calc(100vh-5rem)] py-12">
          {/* PAS Copy */}
          <div className="flex flex-col items-center text-center text-primary-foreground max-w-4xl pt-8 md:pt-12">
            
            {/* Problem */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6 opacity-0 animate-fade-up">
              Stuck Between{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Potential</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-primary/30 -rotate-1 rounded" />
              </span>
              {" "}and Progress?
            </h1>

            {/* Agitate + Solution in one punch */}
            <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed mb-10 max-w-2xl opacity-0 animate-fade-up delay-100">
              Most people know they're capable of more but have no roadmap to get there. Take our free 5-minute diagnostic and get a personalised action plan.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up delay-200 mb-10">
              <Link to="/assessment">
                <Button size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 py-6 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Take the Free Diagnostic
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10 text-base px-8 py-6 rounded-xl transition-all duration-300">
                  How It Works
                </Button>
              </Link>
            </div>
          </div>

          {/* Video Section */}
          <div className="w-full max-w-2xl mx-auto opacity-0 animate-fade-up delay-400">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-charcoal/20 backdrop-blur-sm border border-primary-foreground/10">
              <div className="aspect-video">
                <iframe
                  src="https://drive.google.com/file/d/1_SaGwSIltH7S9QdHGKoQUgbhmLC5NTyn/preview"
                  title="3PN - Your Mastery Voyage"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
          <div className="flex flex-col items-center gap-2 text-primary-foreground/60">
            <span className="text-xs font-medium">Scroll to explore</span>
            <div className="w-5 h-8 border-2 border-primary-foreground/40 rounded-full flex justify-center pt-1">
              <div className="w-1 h-2 bg-primary-foreground/60 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;