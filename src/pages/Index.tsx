import { useState } from "react";
import AgeVerification from "@/components/AgeVerification";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import CollectionsSection from "@/components/CollectionsSection";
import PhilosophySection from "@/components/PhilosophySection";
import Footer from "@/components/Footer";

const Index = () => {
  const [isVerified, setIsVerified] = useState(false);

  return (
    <>
      {/* Age Verification Gate */}
      {!isVerified && (
        <AgeVerification onVerified={() => setIsVerified(true)} />
      )}

      {/* Main Site Content */}
      {isVerified && (
        <div className="min-h-screen bg-charcoal-deep">
          <Header />
          <main>
            <HeroSection />
            <StorySection />
            <CollectionsSection />
            <PhilosophySection />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;
