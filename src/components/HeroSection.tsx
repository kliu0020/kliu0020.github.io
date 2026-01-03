import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/loyal-liquor-logo.png";
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBackground}
          alt="Premium spirits collection"
          className="w-full h-full object-cover opacity-40"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-deep/80 via-charcoal-deep/60 to-charcoal-deep" />
      </div>

      {/* Texture overlay */}
      <div className="absolute inset-0 texture-overlay" />

      {/* Content */}
      <div className="relative z-10 text-center px-8 animate-fade-in">
        {/* Logo Emblem */}
        <div className="mb-16">
          <img
            src={logo}
            alt="Loyal Liquor Emblem"
            className="w-40 h-40 mx-auto object-contain"
          />
        </div>

        {/* Tagline */}
        <h1 className="font-serif text-xl md:text-2xl lg:text-3xl text-gold tracking-[0.25em] mb-6">
          Curated Spirits. No Compromise.
        </h1>

        {/* Subtle divider */}
        <div className="w-24 h-px bg-gold-muted mx-auto mb-10" />

        {/* CTA */}
        <Link to="/collections">
          <Button
            variant="hero"
            size="xl"
          >
            Explore Collection
          </Button>
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-gold-muted to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
