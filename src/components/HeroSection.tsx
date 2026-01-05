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
            <div className="inline-flex items-center gap-3 mb-6 opacity-0 animate-fade-up">
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-primary-foreground/15 rounded-full text-sm font-medium backdrop-blur-sm">People</span>
                <span className="px-3 py-1 bg-primary-foreground/15 rounded-full text-sm font-medium backdrop-blur-sm">Passion</span>
                <span className="px-3 py-1 bg-primary-foreground/15 rounded-full text-sm font-medium backdrop-blur-sm">Purpose</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 opacity-0 animate-fade-up delay-100">
              Find Your Direction. Build Your Future.
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/85 leading-relaxed mb-8 max-w-3xl opacity-0 animate-fade-up delay-200">
              Whether you're starting out, changing paths, or feeling stuck, 3PN offers a free, clear three-step journey to build skills, prove your experience, and grow into leadership. Get your next step in under a minute.
            </p>
          </div>

          {/* Video Section */}
          <div className="w-full max-w-2xl mx-auto opacity-0 animate-fade-up delay-300">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-charcoal/20 backdrop-blur-sm border border-primary-foreground/10">
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/TaHN5VIiMT4"
                  title="How We Work - 3PN"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* CTAs Below Video */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 opacity-0 animate-fade-up delay-400">
            <Link to="/about">
              <Button size="lg" className="group w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                Find Out More
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