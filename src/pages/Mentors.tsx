import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Linkedin, Briefcase, GraduationCap, ArrowRight, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const industries = ["All", "Technology", "Finance", "Healthcare", "Law", "Media", "Consulting"];

const mentors = [
  {
    id: 1,
    name: "Dr. Amara Okonkwo",
    title: "Chief Technology Officer",
    company: "TechCorp Global",
    industry: "Technology",
    expertise: ["Software Engineering", "Leadership", "Career Transitions"],
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face",
    bio: "20+ years in tech leadership, passionate about developing the next generation of Black tech leaders.",
    linkedin: "#",
  },
  {
    id: 2,
    name: "Michael Adeyemi",
    title: "Managing Director",
    company: "Goldman Sachs",
    industry: "Finance",
    expertise: ["Investment Banking", "Wealth Management", "Networking"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "Breaking barriers in finance for over 15 years, now helping others navigate the industry.",
    linkedin: "#",
  },
  {
    id: 3,
    name: "Dr. Ngozi Eze",
    title: "Consultant Surgeon",
    company: "NHS",
    industry: "Healthcare",
    expertise: ["Medicine", "Work-Life Balance", "Academic Career"],
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    bio: "Helping aspiring medical professionals navigate the challenging path to consultancy.",
    linkedin: "#",
  },
  {
    id: 4,
    name: "Chidi Nnamdi",
    title: "Partner",
    company: "Clifford Chance",
    industry: "Law",
    expertise: ["Corporate Law", "Diversity & Inclusion", "Career Strategy"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "First Black partner at my firm, dedicated to creating pathways for diverse legal talent.",
    linkedin: "#",
  },
  {
    id: 5,
    name: "Zainab Hassan",
    title: "Executive Producer",
    company: "BBC",
    industry: "Media",
    expertise: ["Broadcasting", "Content Creation", "Personal Branding"],
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    bio: "Award-winning producer helping creatives break into the media industry.",
    linkedin: "#",
  },
  {
    id: 6,
    name: "Olumide Bakare",
    title: "Senior Consultant",
    company: "McKinsey & Company",
    industry: "Consulting",
    expertise: ["Strategy", "Problem Solving", "Case Interviews"],
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    bio: "Helping ambitious professionals break into top consulting firms.",
    linkedin: "#",
  },
];

const Mentors = () => {
  const [activeIndustry, setActiveIndustry] = useState("All");

  const filteredMentors = mentors.filter((mentor) => 
    activeIndustry === "All" || mentor.industry === activeIndustry
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 md:py-20 bg-gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 bg-primary-foreground/15 rounded-full text-sm font-semibold mb-6">
                The Access Engine
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Connect with Industry Leaders
              </h1>
              <p className="text-xl text-primary-foreground/85 leading-relaxed mb-8">
                Curated access to senior mentors, professional allies, and insider opportunities. 
                Our mentors are leaders who've walked the path and are ready to guide you.
              </p>
              <Link to="/assessment">
                <Button variant="hero" size="lg" className="group">
                  Get Matched with a Mentor
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Mentors Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            {/* Industry Filter */}
            <div className="flex flex-wrap gap-3 mb-10">
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => setActiveIndustry(industry)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeIndustry === industry
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMentors.map((mentor) => (
                <div
                  key={mentor.id}
                  className="group bg-card rounded-2xl p-6 border border-border/60 shadow-soft hover:shadow-medium transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground">{mentor.name}</h3>
                      <p className="text-sm text-primary font-medium">{mentor.title}</p>
                      <p className="text-sm text-muted-foreground">{mentor.company}</p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4">{mentor.bio}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {mentor.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">
                      {mentor.industry}
                    </span>
                    <a
                      href={mentor.linkedin}
                      className="text-primary hover:text-primary/80 transition-colors"
                      aria-label={`${mentor.name}'s LinkedIn`}
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Become a Mentor CTA */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="bg-gradient-hero rounded-3xl p-8 md:p-12 text-primary-foreground text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to Give Back?</h2>
              <p className="text-xl text-primary-foreground/85 mb-8 max-w-2xl mx-auto">
                Join our network of mentors and help shape the next generation of Black professionals.
              </p>
              <Link to="/assessment">
                <Button variant="hero" size="lg">
                  Become a Mentor
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Mentors;
