import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-charcoal-deep texture-overlay">
      <div className="text-center relative z-10">
        <h1 className="mb-4 text-6xl font-serif text-gold">404</h1>
        <p className="mb-8 text-lg text-muted-foreground font-serif">Page not found</p>
        <Button variant="luxury" size="lg" asChild>
          <Link to="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
