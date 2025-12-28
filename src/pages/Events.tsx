import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, ArrowRight, Video } from "lucide-react";

const upcomingEvents = [
  {
    id: 1,
    title: "Breaking into Tech: A Masterclass",
    type: "Workshop",
    date: "15 January 2025",
    time: "18:00 - 20:00 GMT",
    location: "Online (Zoom)",
    isOnline: true,
    spots: 50,
    spotsLeft: 12,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=300&fit=crop",
    description: "Learn practical strategies for breaking into the tech industry, regardless of your background.",
  },
  {
    id: 2,
    title: "Networking Night: Finance Edition",
    type: "Networking",
    date: "22 January 2025",
    time: "18:30 - 21:00 GMT",
    location: "London, EC2R",
    isOnline: false,
    spots: 80,
    spotsLeft: 23,
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=300&fit=crop",
    description: "Connect with professionals and recruiters from top financial institutions.",
  },
  {
    id: 3,
    title: "CV Surgery: One-on-One Sessions",
    type: "Workshop",
    date: "28 January 2025",
    time: "14:00 - 17:00 GMT",
    location: "Online (Google Meet)",
    isOnline: true,
    spots: 20,
    spotsLeft: 5,
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=300&fit=crop",
    description: "Get personalised feedback on your CV from experienced recruiters.",
  },
  {
    id: 4,
    title: "Leadership Summit 2025",
    type: "Conference",
    date: "15 February 2025",
    time: "09:00 - 17:00 GMT",
    location: "Birmingham Conference Centre",
    isOnline: false,
    spots: 200,
    spotsLeft: 67,
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=300&fit=crop",
    description: "Our flagship annual event bringing together leaders, mentors, and rising talent.",
  },
];

const pastEvents = [
  {
    id: 5,
    title: "Podcast Live: Career Journeys",
    type: "Live Event",
    date: "10 December 2024",
    attendees: 120,
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=200&fit=crop",
  },
  {
    id: 6,
    title: "Interview Skills Bootcamp",
    type: "Workshop",
    date: "25 November 2024",
    attendees: 45,
    image: "https://images.unsplash.com/photo-1560439514-4e9645039924?w=400&h=200&fit=crop",
  },
  {
    id: 7,
    title: "Consulting Case Study Workshop",
    type: "Workshop",
    date: "12 November 2024",
    attendees: 35,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
  },
];

const Events = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 md:py-20 bg-gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 bg-primary-foreground/15 rounded-full text-sm font-semibold mb-6">
                Events
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Learn, Connect & Grow
              </h1>
              <p className="text-xl text-primary-foreground/85 leading-relaxed">
                Join our workshops, networking events, and conferences designed to 
                accelerate your career and expand your professional network.
              </p>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Upcoming Events</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="group bg-card rounded-2xl overflow-hidden border border-border/60 shadow-soft hover:shadow-medium transition-all"
                >
                  <div className="relative h-48">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-semibold">
                        {event.type}
                      </span>
                      {event.isOnline && (
                        <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-semibold flex items-center gap-1">
                          <Video className="w-3 h-3" />
                          Online
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">{event.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{event.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 text-primary" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary" />
                        {event.location}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {event.spotsLeft} spots left
                        </span>
                      </div>
                      <Button size="sm" className="group">
                        Register
                        <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Past Events */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Past Events</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-card rounded-xl overflow-hidden border border-border/60 shadow-soft"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-32 object-cover grayscale opacity-80"
                  />
                  <div className="p-5">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                      {event.type}
                    </span>
                    <h3 className="text-lg font-bold text-foreground mt-1 mb-2">{event.title}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{event.date}</span>
                      <span>{event.attendees} attended</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Host CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="bg-gradient-hero rounded-3xl p-8 md:p-12 text-primary-foreground text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to Host an Event?</h2>
              <p className="text-xl text-primary-foreground/85 mb-8 max-w-2xl mx-auto">
                Partner with 3PN to bring career development opportunities to your community.
              </p>
              <Button variant="hero" size="lg">
                Get in Touch
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
