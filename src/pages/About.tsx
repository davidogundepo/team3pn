import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatWeOffer from "@/components/WhatWeOffer";
import { Users, Target, Heart, ChevronDown, ChevronUp, Briefcase, Award, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    fullProfile: {
      qualifications: "MBA, Certified Leadership Coach",
      experience: "15+ years in corporate leadership and entrepreneurship",
      industries: "Finance, Technology, Non-profit",
      seniorExposure: "Led transformation initiatives with C-suite executives across FTSE 100 companies",
      why: "After navigating my own career without a roadmap, I wanted to build the bridge I wished I had. Every young person deserves access to the networks and guidance that accelerate success.",
      roleModel: "Passionate about breaking barriers and creating pathways where none existed before."
    }
  },
  {
    name: "Efetive Oguko",
    role: "Head of Partnerships",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    bio: "Connects 3PN with industry leaders and organisations committed to diversity.",
    fullProfile: {
      qualifications: "BSc Business Management, Diversity & Inclusion Certification",
      experience: "10+ years in strategic partnerships and business development",
      industries: "Consulting, Corporate Affairs, Social Enterprise",
      seniorExposure: "Built relationships with senior leadership teams across multiple sectors",
      why: "I believe in the power of connections. The right introduction at the right time can change everything for a young professional.",
      roleModel: "Known for building authentic relationships that create mutual value and lasting impact."
    }
  },
  {
    name: "DK Jonah",
    role: "Mentorship Lead",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "Oversees our mentor network and ensures impactful connections.",
    fullProfile: {
      qualifications: "MA Education, Coaching Certification",
      experience: "12+ years in education and professional development",
      industries: "Education, Healthcare, Public Sector",
      seniorExposure: "Designed and delivered mentorship programmes for senior leaders in NHS and local government",
      why: "Having a mentor transformed my career trajectory. I want to ensure every person in our community has access to that same opportunity.",
      roleModel: "Committed to nurturing talent and unlocking potential through meaningful mentorship."
    }
  },
  {
    name: "Lola Adewuyi",
    role: "Community Manager",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    bio: "Builds and nurtures the 3PN community across all platforms.",
    fullProfile: {
      qualifications: "BA Communications, Digital Marketing Certification",
      experience: "8+ years in community building and digital engagement",
      industries: "Media, Technology, Non-profit",
      seniorExposure: "Collaborated with executive teams to build engaged communities for leading brands",
      why: "Community is everything. When people feel they belong, they thrive. I create spaces where our members can connect, grow, and support each other.",
      roleModel: "Creates inclusive environments where every voice matters and every journey is celebrated."
    }
  },
];

const About = () => {
  const [expandedMember, setExpandedMember] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  const toggleMember = (name: string) => {
    setExpandedMember(expandedMember === name ? null : name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Welcome to the community! 🎉', {
      description: 'Create an account to access all 3PN resources.',
    });
    setFormData({ name: "", email: "" });
    setTimeout(() => navigate('/login'), 1500);
  };

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
                Setting You Up for a Successful Career Journey
              </h1>
              <p className="text-xl text-primary-foreground/85 leading-relaxed">
                Born from the reality that many young adults are left without clear direction or support, 3PN exists to ensure the next generation doesn't rely on chance, but on intentional systems and structures designed to help them succeed.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-muted">
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
                    3P Network is a registered charity dedicated to helping young people, particularly those from underserved communities, build confidence, develop skills, and access opportunities for social and career growth.
                  </p>
                  <p>
                    Through our three-step framework, we guide individuals from uncertainty to confidence, empowering them to shape their career or business path and reach their full potential.
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
        <section className="py-20 md:py-28 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
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
                  className="bg-card rounded-2xl p-8 border-2 border-border shadow-soft hover:shadow-medium hover:border-primary transition-all"
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

        {/* What We Offer - moved from Index */}
        <WhatWeOffer />

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
                A dedicated team committed to your success. Click on any team member to learn more about their journey.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <div key={member.name} className="bg-card rounded-2xl border-2 border-border shadow-soft overflow-hidden transition-all hover:shadow-medium">
                  <div className="p-6 text-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-soft"
                    />
                    <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                    <p className="text-primary font-medium text-sm mb-2">{member.role}</p>
                    <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                    
                    <button
                      onClick={() => toggleMember(member.name)}
                      className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline"
                    >
                      {expandedMember === member.name ? "Show less" : "View full profile"}
                      {expandedMember === member.name ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  {expandedMember === member.name && (
                    <div className="border-t border-border bg-muted p-6 space-y-4 animate-fade-in">
                      <div className="flex items-start gap-3">
                        <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-sm text-foreground">Qualifications</p>
                          <p className="text-sm text-muted-foreground">{member.fullProfile.qualifications}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Briefcase className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-sm text-foreground">Experience</p>
                          <p className="text-sm text-muted-foreground">{member.fullProfile.experience}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Building2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-sm text-foreground">Industries</p>
                          <p className="text-sm text-muted-foreground">{member.fullProfile.industries}</p>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-border">
                        <p className="font-semibold text-sm text-foreground mb-2">Why I'm Here</p>
                        <p className="text-sm text-muted-foreground italic">"{member.fullProfile.why}"</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground mb-2">What Makes Them a Role Model</p>
                        <p className="text-sm text-muted-foreground">{member.fullProfile.roleModel}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Our Community Form */}
        <section className="py-20 md:py-28 bg-gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join Our Community
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Sign up to be part of a growing network of professionals, mentors, and allies committed to building brighter futures.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 focus:ring-1 focus:ring-primary-foreground/50"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 focus:ring-1 focus:ring-primary-foreground/50"
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Sign Up to Join
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;