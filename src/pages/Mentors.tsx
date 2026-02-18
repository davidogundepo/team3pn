import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Users, Sparkles, ArrowRight, Heart, Target, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Mentors = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        {/* Coming Soon Hero */}
        <div className="max-w-2xl mx-auto text-center">
          {/* Animated Logo */}
          <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/10 to-orange-500/10 mb-8">
            <Users className="w-12 h-12 text-primary" />
            <div className="absolute -top-1 -right-1">
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Mentor Matching
          </h1>
          <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
            Coming Soon
          </p>
          <p className="text-muted-foreground mb-12 max-w-xl mx-auto">
            We're building a powerful mentor network connecting you with professionals who've walked the path. 
            Get matched based on your CAD diagnostic results, industry goals, and growth areas.
          </p>

          {/* Feature Preview Cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {[
              { icon: Target, title: "Smart Matching", desc: "Paired by your quadrant, goals, and industry" },
              { icon: Heart, title: "1-on-1 Sessions", desc: "Private mentoring with experienced professionals" },
              { icon: BookOpen, title: "Growth Tracks", desc: "Structured paths from your mentor's guidance" },
            ].map((feature, i) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl border border-border bg-card hover:border-primary/20 hover:shadow-md transition-all duration-300"
                style={{ animation: `fadeSlideUp 0.4s ease-out ${i * 0.1}s both` }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 mx-auto">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm text-foreground mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/assessment">
              <Button size="lg" className="rounded-xl gap-2">
                Take Your Assessment First
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground">
              Your results will power your mentor match
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Mentors;

/* ─────────────────────────────────────────────────────────
 * ORIGINAL MENTOR DATA (commented out for reference)
 * Uncomment and integrate when mentor matching goes live
 * ─────────────────────────────────────────────────────────
 *
 * const industries = ["All", "Technology", "Finance", "Healthcare", "Law", "Media", "Consulting"];
 *
 * const mentors = [
 *   {
 *     id: 1,
 *     name: "Dr. Amara Okonkwo",
 *     title: "Chief Technology Officer",
 *     company: "TechCorp Global",
 *     industry: "Technology",
 *     expertise: ["Software Engineering", "Leadership", "Career Transitions"],
 *     image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
 *     bio: "With 15 years in tech leadership, Dr. Okonkwo guides aspiring CTOs and tech leads.",
 *     linkedin: "#",
 *   },
 *   {
 *     id: 2,
 *     name: "Marcus Thompson",
 *     title: "Managing Director",
 *     company: "Goldman Sachs",
 *     industry: "Finance",
 *     expertise: ["Investment Banking", "DEI Strategy", "Networking"],
 *     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
 *     bio: "Passionate about breaking barriers in finance for underrepresented professionals.",
 *     linkedin: "#",
 *   },
 *   {
 *     id: 3,
 *     name: "Dr. Zainab Adewale",
 *     title: "Consultant Surgeon",
 *     company: "NHS / King's College Hospital",
 *     industry: "Healthcare",
 *     expertise: ["Medical Career Paths", "NHS Navigation", "Work-Life Balance"],
 *     image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
 *     bio: "Helping aspiring medical professionals navigate the challenging path to consultancy.",
 *     linkedin: "#",
 *   },
 *   {
 *     id: 4,
 *     name: "Chidi Nnamdi",
 *     title: "Partner",
 *     company: "Clifford Chance",
 *     industry: "Law",
 *     expertise: ["Corporate Law", "Diversity & Inclusion", "Career Strategy"],
 *     image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
 *     bio: "Championing diversity in law and mentoring the next generation of legal professionals.",
 *     linkedin: "#",
 *   },
 *   {
 *     id: 5,
 *     name: "Folake Adeyemi",
 *     title: "Creative Director",
 *     company: "BBC Studios",
 *     industry: "Media",
 *     expertise: ["Creative Leadership", "Brand Strategy", "Content Creation"],
 *     image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
 *     bio: "Award-winning creative leader committed to amplifying Black voices in media.",
 *     linkedin: "#",
 *   },
 *   {
 *     id: 6,
 *     name: "David Afolabi",
 *     title: "Principal Consultant",
 *     company: "McKinsey & Company",
 *     industry: "Consulting",
 *     expertise: ["Strategy", "Problem Solving", "Interview Preparation"],
 *     image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
 *     bio: "Helping ambitious professionals break into top consulting firms.",
 *     linkedin: "#",
 *   },
 * ];
 */
