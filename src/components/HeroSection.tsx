import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden pt-20">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-foreground/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center min-h-[calc(100vh-5rem)] py-12">
          {/* Top Content */}
          <div className="flex flex-col items-center text-center text-primary-foreground max-w-4xl pt-8 md:pt-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 opacity-0 animate-fade-up">
              Your Mastery Voyage Starts Here.
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/85 leading-relaxed mb-8 max-w-3xl opacity-0 animate-fade-up delay-100">
              Stop outsourcing your potential. 3PN's CAD Diagnostic helps you discover your quadrant, unlock your strategic pathway, and journey from Point A (Potential) to Point B (Power), all completely free.
            </p>

            {/* Primary CTA Above Video */}
            <div className="opacity-0 animate-fade-up delay-200 mb-8">
              <Link to="/assessment">
                <Button size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground">
                  Begin Your Mastery Voyage
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Video Section */}
          <div className="w-full max-w-2xl mx-auto opacity-0 animate-fade-up delay-300">
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

          {/* Find Out More Below Video */}
          <div className="flex justify-center mt-8 opacity-0 animate-fade-up delay-400">
            <Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground underline underline-offset-4 font-medium transition-colors">
              Find out more
            </Link>
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