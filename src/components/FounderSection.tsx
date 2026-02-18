import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import founderPhoto from "@/assets/founder-gbenga.jpg";

const FounderSection = () => {
  return (
    <section id="founder" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-medium">
              <img
                src={founderPhoto}
                alt="Gbenga, Founder of 3PN"
                className="w-full h-auto object-cover aspect-[3/4] max-h-[600px]"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-full -z-10" />
          </div>

          {/* Content */}
          <div>
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
              Hear from the Founder
            </span>

            {/* Handwritten-style quote */}
            <p className="font-handwritten text-3xl md:text-4xl text-accent mb-8">
              "I built what I couldn't find."
            </p>

            <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
              <p>
                When I was starting out, I did everything I was told to do—studied hard, 
                earned qualifications, worked relentlessly. But what I didn't have was 
                clarity, access, or a clear path forward. Too much depended on luck.
              </p>
              
              <p className="font-semibold text-foreground">
                3PN was born from that gap.
              </p>

              <p>
                A platform that gives every ambitious Black professional what I wish I'd had: 
                diagnostic clarity, a structured pathway, and a community of mentors and peers 
                who've walked the road before you. No gatekeeping. No guesswork. Just a clear 
                voyage from potential to power.
              </p>
            </div>

            {/* CTA to assessment instead of dead link */}
            <div className="mt-8">
              <a href="/about">
                <Button variant="outline" size="lg" className="group">
                  Learn More About 3PN
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>

            {/* Signature */}
            <div className="mt-10 pt-6 border-t border-border">
              <p className="font-handwritten text-2xl text-foreground">— Gbenga</p>
              <p className="text-sm text-muted-foreground mt-1">Founder, 3PN</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
