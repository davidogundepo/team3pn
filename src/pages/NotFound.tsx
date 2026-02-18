import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight, Home, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 pt-20">
        <div className="max-w-md text-center">
          {/* Animated 404 */}
          <div className="relative mb-8">
            <p className="text-[8rem] font-bold leading-none text-primary/10 select-none">404</p>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Compass className="w-10 h-10 text-primary animate-pulse" />
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-3">
            Page Not Found
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Looks like this page doesn't exist or has been moved. 
            Let's get you back on your mastery voyage.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button size="lg" className="gap-2">
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <Link to="/assessment">
              <Button variant="outline" size="lg" className="gap-2">
                Take the Assessment
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
