import beneficiaryPhoto from "@/assets/beneficiary-photo.jpg";

const RealStories = () => {
  return (
    <section id="our-story" className="py-20 md:py-28 bg-gradient-hero text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={beneficiaryPhoto}
                alt="3PN beneficiaries sharing their success stories in a professional setting"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
            </div>
            
            {/* Floating accent card */}
            <div className="absolute -bottom-6 -right-6 bg-card text-foreground rounded-xl p-4 shadow-medium max-w-[200px] hidden md:block">
              <p className="text-2xl font-bold text-primary">40+</p>
              <p className="text-sm text-muted-foreground">Lives transformed through our programmes</p>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-primary/30 rounded-full blur-xl" />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Real Stories, Real Purpose
            </h2>

            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8">
              Personal journeys of growth, confidence, and finding direction
            </p>

            <blockquote className="relative">
              <div className="absolute -left-4 top-0 text-6xl text-primary/50 leading-none">
                "
              </div>
              <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed pl-6 italic">
                Born from the immigrant experience, 3PN exists to ensure the next generation doesn't rely on chance, but on intentional systems for success.
              </p>
            </blockquote>

            {/* Testimonial cards */}
            <div className="mt-10 space-y-4">
              <div className="bg-primary-foreground/10 rounded-xl p-5 backdrop-blur-sm border border-primary-foreground/10">
                <p className="text-primary-foreground/85 mb-3">
                  "3PN gave me the clarity and connections I needed to transition from feeling stuck to leading my own team."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center font-bold">
                    AO
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Adaeze O.</p>
                    <p className="text-xs text-primary-foreground/60">Programme Graduate, 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealStories;