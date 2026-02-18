import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Sparkles, ArrowRight, Video, Users, Mic } from "lucide-react";
import { Link } from "react-router-dom";

const Events = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        {/* Coming Soon Hero */}
        <div className="max-w-2xl mx-auto text-center">
          {/* Animated Logo */}
          <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/10 to-orange-500/10 mb-8">
            <Calendar className="w-12 h-12 text-primary" />
            <div className="absolute -top-1 -right-1">
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Events & Workshops
          </h1>
          <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
            Coming Soon
          </p>
          <p className="text-muted-foreground mb-12 max-w-xl mx-auto">
            Live workshops, masterclasses, and networking events designed to accelerate your journey 
            from Point A (Potential) to Point B (Power). Stay tuned for our launch calendar.
          </p>

          {/* Feature Preview Cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {[
              { icon: Video, title: "Live Workshops", desc: "Interactive sessions with industry leaders" },
              { icon: Users, title: "Networking Events", desc: "Connect with peers on similar journeys" },
              { icon: Mic, title: "Podcast Live", desc: "Live recordings and Q&A sessions" },
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
                Take Your Assessment
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground">
              Get started while you wait
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;

/* ─────────────────────────────────────────────────────────
 * ORIGINAL EVENT DATA (commented out for reference)
 * Uncomment and integrate when events feature goes live
 * ─────────────────────────────────────────────────────────
 *
 * const upcomingEvents = [
 *   {
 *     id: 1,
 *     title: "Breaking into Tech: A Masterclass",
 *     type: "Workshop",
 *     date: "15 January 2025",
 *     time: "18:00 - 20:00 GMT",
 *     location: "Online (Zoom)",
 *     isOnline: true,
 *     spots: 50,
 *     spotsLeft: 12,
 *     image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=300&fit=crop",
 *     description: "Learn the insider strategies for transitioning into tech roles.",
 *   },
 *   {
 *     id: 2,
 *     title: "Networking Power Hour",
 *     type: "Networking",
 *     date: "22 January 2025",
 *     time: "19:00 - 20:00 GMT",
 *     location: "Online (Zoom)",
 *     isOnline: true,
 *     spots: 30,
 *     spotsLeft: 8,
 *     image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&h=300&fit=crop",
 *     description: "Connect with like-minded professionals in a structured networking session.",
 *   },
 *   {
 *     id: 3,
 *     title: "CV & Interview Bootcamp",
 *     type: "Workshop",
 *     date: "5 February 2025",
 *     time: "10:00 - 13:00 GMT",
 *     location: "Online (Zoom)",
 *     isOnline: true,
 *     spots: 20,
 *     spotsLeft: 5,
 *     image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=300&fit=crop",
 *     description: "Get personalised feedback on your CV from experienced recruiters.",
 *   },
 *   {
 *     id: 4,
 *     title: "Leadership Summit 2025",
 *     type: "Conference",
 *     date: "15 February 2025",
 *     time: "09:00 - 17:00 GMT",
 *     location: "Birmingham Conference Centre",
 *     isOnline: false,
 *     spots: 200,
 *     spotsLeft: 67,
 *     image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=300&fit=crop",
 *     description: "Our flagship annual event bringing together leaders, mentors, and rising talent.",
 *   },
 * ];
 *
 * const pastEvents = [
 *   {
 *     id: 5,
 *     title: "Podcast Live: Career Journeys",
 *     type: "Live Event",
 *     date: "10 December 2024",
 *     attendees: 120,
 *     image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=200&fit=crop",
 *   },
 *   {
 *     id: 6,
 *     title: "Finance Industry Night",
 *     type: "Networking",
 *     date: "28 November 2024",
 *     attendees: 45,
 *     image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=200&fit=crop",
 *   },
 *   {
 *     id: 7,
 *     title: "Consulting Case Study Workshop",
 *     type: "Workshop",
 *     date: "12 November 2024",
 *     attendees: 35,
 *     image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
 *   },
 * ];
 */
