import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/loyal-liquor-logo.png";

interface AgeVerificationProps {
  onVerified: () => void;
}

const AgeVerification = ({ onVerified }: AgeVerificationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if already verified in session
    const verified = sessionStorage.getItem("ageVerified");
    if (verified === "true") {
      onVerified();
    } else {
      setIsVisible(true);
    }
  }, [onVerified]);

  const handleVerify = () => {
    sessionStorage.setItem("ageVerified", "true");
    setIsVisible(false);
    onVerified();
  };

  const handleDecline = () => {
    window.location.href = "https://www.responsibility.org/";
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-deep">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 texture-overlay" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 animate-fade-in">
        {/* Logo */}
        <div className="mb-12">
          <img 
            src={logo} 
            alt="Loyal Liquor" 
            className="w-32 h-32 object-contain"
          />
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-gold mb-10" />

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-serif text-gold tracking-[0.25em] mb-6">
          AGE VERIFICATION
        </h1>

        {/* Message */}
        <p className="text-muted-foreground font-sans text-sm max-w-md mb-10 leading-relaxed">
          You must be of legal drinking age in your country of residence to enter this site.
        </p>

        {/* Question */}
        <p className="text-foreground font-serif text-lg tracking-[0.15em] mb-8">
          Are you of legal drinking age?
        </p>

        {/* Buttons */}
        <div className="flex gap-6">
          <Button
            variant="luxury"
            size="lg"
            onClick={handleVerify}
            className="min-w-[140px]"
          >
            Yes
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={handleDecline}
            className="min-w-[140px]"
          >
            No
          </Button>
        </div>

        {/* Legal text */}
        <p className="mt-12 text-xs text-muted-foreground/60 max-w-sm">
          By entering this site, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default AgeVerification;
