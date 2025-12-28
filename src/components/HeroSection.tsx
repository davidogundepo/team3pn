import { Play, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden pt-20">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-foreground/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-5rem)] py-12">
          <div className="flex flex-col justify-center text-primary-foreground">
            <div className="inline-flex items-center gap-3 mb-6 opacity-0 animate-fade-up">
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-primary-foreground/15 rounded-full text-sm font-medium backdrop-blur-sm">People</span>
                <span className="px-3 py-1 bg-primary-foreground/15 rounded-full text-sm font-medium backdrop-blur-sm">Passion</span>
                <span className="px-3 py-1 bg-primary-foreground/15 rounded-full text-sm font-medium backdrop-blur-sm">Purpose</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 opacity-0 animate-fade-up delay-100">
              From Feeling Stuck to Steering Your Own Future
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/85 leading-relaxed mb-8 max-w-xl opacity-0 animate-fade-up delay-200">
              Are you starting out in your career or business? Want to learn new skills? 
              Or feeling unsure even with qualifications and experience? 3PN offers a clear, 
              three-step journey to help you find your direction, build real evidence of 
              your skills, and step confidently into leadership.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up delay-300">
              <Link to="/about">
                <Button variant="hero" size="lg" className="group w-full sm:w-auto">
                  Begin Your Journey
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/assessment">
                <Button variant="heroOutline" size="lg" className="w-full sm:w-auto">
                  Take Self-Assessment
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end opacity-0 animate-fade-up delay-400">
            <div className="relative w-full max-w-lg">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-charcoal/20 backdrop-blur-sm border border-primary-foreground/10">
                <div className="aspect-video bg-gradient-to-br from-charcoal/40 to-charcoal/60 flex items-center justify-center">
                  <button 
                    className="group relative w-20 h-20 rounded-full bg-primary-foreground flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300"
                    aria-label="Play video: How we work"
                  >
                    <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                    <span className="absolute inset-0 rounded-full bg-primary-foreground animate-ping opacity-30" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm text-primary-foreground/80 font-medium">Watch: How We Work</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/30 rounded-xl blur-xl" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary-foreground/10 rounded-full blur-xl" />
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
