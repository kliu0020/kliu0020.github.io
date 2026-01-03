import { Link } from "react-router-dom";
import logo from "@/assets/loyal-liquor-logo.png";

const Footer = () => {
  return (
    <footer id="contact" className="py-24 bg-charcoal-deep border-t border-border relative">
      {/* Texture overlay */}
      <div className="absolute inset-0 texture-overlay" />

      <div className="container mx-auto px-8 relative z-10">
        {/* Top Section */}
        <div className="flex flex-col items-center mb-16">
          <img
            src={logo}
            alt="Loyal Liquor"
            className="w-20 h-20 object-contain opacity-70 mb-8"
          />
          <p className="font-serif text-lg text-gold-muted italic">
            "Where tradition meets discernment."
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-12 mb-16">
          <a
            href="#"
            className="text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-gold transition-colors duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-xs uppercase tracking-ultra-wide text-muted-foreground hover:text-gold transition-colors duration-300"
          >
            Terms of Service
          </a>
          <Link
            to="/legal"
            className="text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-gold transition-colors duration-300"
          >
            Legal
          </Link>
          <a
            href="#contact"
            className="text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-gold transition-colors duration-300"
          >
            Contact
          </a>
        </div>

        {/* Divider */}
        <div className="w-24 h-px bg-gold-muted/30 mx-auto mb-12" />

        {/* Bottom Section */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground/60 mb-4">
            © {new Date().getFullYear()} Loyal Liquor. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/40">
            Please drink responsibly. Must be of legal drinking age.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
