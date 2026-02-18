import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Search, Play, FileText, Calendar, Users, ArrowRight, Filter } from "lucide-react";
import { toast } from "sonner";

const categories = ["All", "Articles", "Videos", "Podcasts", "Guides", "Templates"];

const resources = [
  {
    id: 1,
    type: "article",
    category: "Articles",
    title: "Understanding the CAD Diagnostic Framework",
    description: "Learn how Capability, Competence, Character, and Capacity work together to map your journey from Point A (Potential) to Point B (Power).",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
    featured: true,
  },
  {
    id: 2,
    type: "video",
    category: "Videos",
    title: "The Un-Outsourcing Philosophy — Taking Back Control",
    description: "A deep dive into transitioning from passenger to pilot in your career. Discover what it means to stop outsourcing your growth and own your trajectory.",
    duration: "38 min",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=250&fit=crop",
    featured: true,
  },
  {
    id: 3,
    type: "guide",
    category: "Guides",
    title: "From New Traveler to Systemic Leverage Peak — Your Quadrant Roadmap",
    description: "A step-by-step guide to navigating Q1 through Q4, with actionable milestones for each stage of your mastery voyage.",
    readTime: "20 min read",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=250&fit=crop",
    featured: false,
  },
  {
    id: 4,
    type: "article",
    category: "Articles",
    title: "Building Capability — The Foundation of Career Mastery",
    description: "Capability is the first pillar of the 3Cs. Learn how to identify your core skills, address gaps, and build a solid professional foundation.",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
    featured: false,
  },
  {
    id: 5,
    type: "podcast",
    category: "Podcasts",
    title: "3PN Voices: Black Professionals Navigating Corporate & Entrepreneurial Pathways",
    description: "Real conversations with professionals who've walked Route A (System-First) and Route B (Command-First), sharing lessons from their quadrant journey.",
    duration: "45 min",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=250&fit=crop",
    featured: false,
  },
  {
    id: 6,
    type: "template",
    category: "Templates",
    title: "Personal Development Plan — 3PN Edition",
    description: "Download our structured PDP template built around the four CAD pillars. Set quarterly goals aligned to your quadrant and strategic pathway.",
    downloadable: true,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop",
    featured: false,
  },
  {
    id: 7,
    type: "article",
    category: "Articles",
    title: "Character as a Career Accelerator",
    description: "Why integrity, resilience, and self-leadership are non-negotiable for reaching Q4. Explore how character underpins sustainable career growth.",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
    featured: false,
  },
  {
    id: 8,
    type: "video",
    category: "Videos",
    title: "Competence vs Capability — What's the Difference?",
    description: "Understanding the distinction between what you know (Capability) and how well you execute (Competence) is key to unlocking your next quadrant.",
    duration: "22 min",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=250&fit=crop",
    featured: false,
  },
  {
    id: 9,
    type: "guide",
    category: "Guides",
    title: "Building Your Capacity — Systems That Scale Your Impact",
    description: "Capacity is what separates Q3 from Q4. Learn how to build reliable systems, delegate effectively, and create leverage in your career or business.",
    readTime: "15 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    featured: false,
  },
];

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = resources.filter((resource) => {
    const matchesCategory = activeCategory === "All" || resource.category === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredResources = resources.filter((r) => r.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 md:py-20 bg-gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 bg-primary-foreground/15 rounded-full text-sm font-semibold mb-6">
                Resource Hub
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Learn, Explore & Connect
              </h1>
              <p className="text-xl text-primary-foreground/85 leading-relaxed mb-8">
                On-demand tools, learning resources, and peer networks to help you explore options, 
                build skills, and gain confidence.
              </p>
              
              {/* Search */}
              <div className="relative max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-background text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured */}
        <section className="py-16 bg-cream">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold text-foreground mb-8">Featured Resources</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredResources.map((resource) => (
                <div
                  key={resource.id}
                  className="group bg-card rounded-2xl overflow-hidden border border-border/60 shadow-soft hover:shadow-medium transition-shadow cursor-pointer"
                  onClick={() => toast.info(`"${resource.title}" — full content coming soon!`)}
                >
                  <div className="relative">
                    <img
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {resource.type === "video" && (
                      <div className="absolute inset-0 bg-charcoal/40 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-primary-foreground flex items-center justify-center">
                          <Play className="w-6 h-6 text-primary ml-1" fill="currentColor" />
                        </div>
                      </div>
                    )}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-semibold">
                      Featured
                    </span>
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                      {resource.category}
                    </span>
                    <h3 className="text-xl font-bold text-foreground mt-2 mb-2">{resource.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {resource.readTime || resource.duration}
                      </span>
                      <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Resources */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-10">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Resources Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <div
                  key={resource.id}
                  className="group bg-card rounded-xl overflow-hidden border border-border/60 shadow-soft hover:shadow-medium transition-shadow cursor-pointer"
                  onClick={() => toast.info(`"${resource.title}" — full content coming soon!`)}
                >
                  <div className="relative h-40">
                    <img
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {resource.type === "video" && (
                      <div className="absolute inset-0 bg-charcoal/40 flex items-center justify-center">
                        <Play className="w-10 h-10 text-primary-foreground" fill="currentColor" />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                      {resource.category}
                    </span>
                    <h3 className="text-lg font-bold text-foreground mt-1 mb-2 line-clamp-2">
                      {resource.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                      {resource.description}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {resource.readTime || resource.duration || "Download"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No resources found matching your criteria.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
