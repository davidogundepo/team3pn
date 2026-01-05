import { Compass, BookOpen, Key, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const offerings = [
  {
    icon: Compass,
    title: "Core Scan",
    tagline: "A quick starting point",
    description:
      "A simple self-assessment that helps you understand where you are and what to focus on next. No commitment—just clarity.",
    cta: "Take the Scan",
  },
  {
    icon: BookOpen,
    title: "Resource Hub",
    tagline: "Learn, explore and connect",
    description:
      "On-demand tools, learning resources, events, and peer networks to help you explore options, build skills, and gain confidence.",
    cta: "Explore Resources",
  },
  {
    icon: Key,
    title: "The Access Engine",
    tagline: "Purposeful relationships and opportunities",
    description:
      "Curated access to senior mentors, professional allies, and insider opportunities—when you're ready to take focused steps toward leadership.",
    cta: "Unlock Access",
  },
];

const WhatWeOffer = () => {
  return (
    <section id="what-we-offer" className="py-20 md:py-28 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What We Offer
          </h2>
          <p className="text-lg text-muted-foreground">
            Three powerful tools designed to meet you wherever you are in your journey.
          </p>
        </div>

        {/* Offerings Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {offerings.map((offer, index) => (
            <div
              key={offer.title}
              className="group relative bg-card rounded-2xl p-8 border-2 border-border shadow-soft hover:shadow-medium hover:border-primary transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <offer.icon className="w-7 h-7" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-2">
                {offer.title}
              </h3>
              <p className="text-primary font-medium text-sm mb-3">
                {offer.tagline}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {offer.description}
              </p>

              {/* CTA */}
              <Button variant="ghost" className="group/btn p-0 h-auto font-semibold text-primary hover:bg-transparent hover:text-primary">
                {offer.cta}
                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>

              {/* Hover accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-primary rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;