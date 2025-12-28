import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, Target, Heart, Award } from "lucide-react";
import founderPhoto from "@/assets/founder-gbenga.jpg";

const stats = [
  { value: "40+", label: "Professionals Supported" },
  { value: "10+", label: "Partner Organisations" },
  { value: "15+", label: "Mentors & Allies" },
  { value: "3+", label: "Years of Impact" },
];

const values = [
  {
    icon: Users,
    title: "People",
    description: "We recognise the challenges young people face and aspire to equip them with the mindset, behaviours, skills, and network needed to achieve their career goals.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "We desire to see a diverse range of enriched Black professionals changing the narrative, breaking boundaries, and taking control of their career journeys.",
  },
  {
    icon: Target,
    title: "Purpose",
    description: "We aim to inform, influence, guide, and support the Black community by enhancing career networks and nurturing relationships.",
  },
];

const team = [
  {
    name: "Gbenga",
    role: "Founder & CEO",
    image: founderPhoto,
    bio: "Built 3PN from lived experience to create the systems he wished existed when starting out.",
  },
  {
    name: "Efetive Oguko",
    role: "Head of Partnerships",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face",
    bio: "Connects 3PN with industry leaders and organisations committed to diversity.",
  },
  {
    name: "DK Jonah",
    role: "Mentorship Lead",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "Oversees our mentor network and ensures impactful connections.",
  },
  {
    name: "Lola Adewuyi",
    role: "Community Manager",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    bio: "Builds and nurtures the 3PN community across all platforms.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 md:py-28 bg-gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 bg-primary-foreground/15 rounded-full text-sm font-semibold mb-6">
                About 3PN
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                We Built the Bridge We Wished We Had
              </h1>
              <p className="text-xl text-primary-foreground/85 leading-relaxed">
                Born from the immigrant experience, 3PN exists to ensure the next generation 
                doesn't rely on chance—but on intentional systems for success.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-cream">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
                  Our Mission
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Creating Pathways Where None Existed
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    3PN is a non-profit social enterprise committed to developing and empowering 
                    young people in Black communities by creating opportunities for social and 
                    career development.
                  </p>
                  <p>
                    We provide clarity, access, and a clear path forward—the things too many 
                    talented people lack when starting their journeys.
                  </p>
                  <p>
                    Our three-step framework—Core Scan, Resource Hub, and The Access Engine—takes 
                    individuals from uncertainty to leadership, step by step.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                  alt="Team collaboration"
                  className="rounded-2xl shadow-medium"
                />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 md:py-28 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="inline-block px-4 py-1.5 bg-accent/15 text-amber-dark rounded-full text-sm font-semibold mb-4">
                The 3Ps
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-muted-foreground">
                The principles that guide everything we do.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="bg-card rounded-2xl p-8 border border-border/60 shadow-soft"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-6">
                    <value.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                Our Team
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Meet the People Behind 3PN
              </h2>
              <p className="text-lg text-muted-foreground">
                A dedicated team committed to your success.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <div key={member.name} className="text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-soft"
                  />
                  <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                  <p className="text-primary font-medium text-sm mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
