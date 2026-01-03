import { useState } from 'react';
import AgeVerification from '@/components/AgeVerification';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';

const Legal = () => {
  const [isVerified, setIsVerified] = useState(() => {
    return sessionStorage.getItem('ageVerified') === 'true';
  });

  return (
    <>
      {!isVerified && <AgeVerification onVerified={() => setIsVerified(true)} />}
      {isVerified && (
        <div className="min-h-screen bg-charcoal-deep">
          <Header />
          <main className="pt-24">
            <section className="py-20 bg-charcoal-deep relative">
              <div className="absolute inset-0 texture-overlay" />

              <div className="container mx-auto px-8 relative z-10 max-w-4xl">
                <div className="mb-12">
                  <h1 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide">
                    Legal Information
                  </h1>
                  <div className="w-12 h-px bg-gold-muted mt-6" />
                </div>

                <div className="space-y-12">
                  <div>
                    <h2 className="font-serif text-xl text-foreground tracking-wide mb-4">
                      Licensing Information
                    </h2>
                    <div className="w-8 h-px bg-gold-muted mb-6" />
                    <div className="text-sm text-foreground leading-relaxed space-y-4">
                      <p>
                        Loyal Liquor operates in compliance with all applicable federal, state, and
                        local laws regarding the sale and distribution of alcoholic beverages.
                      </p>
                      <p>
                        All products are sold and shipped in accordance with the regulations of the
                        jurisdiction in which they are delivered. It is the customer's responsibility
                        to ensure compliance with local laws regarding the purchase, possession, and
                        consumption of alcoholic beverages.
                      </p>
                      <p>
                        We reserve the right to refuse service to anyone who violates applicable laws
                        or regulations, or who provides false or misleading information.
                      </p>
                    </div>
                  </div>

                  <Separator className="bg-border" />

                  <div>
                    <h2 className="font-serif text-xl text-foreground tracking-wide mb-4">
                      Responsible Service
                    </h2>
                    <div className="w-8 h-px bg-gold-muted mb-6" />
                    <div className="text-sm text-foreground leading-relaxed space-y-4">
                      <p>
                        Loyal Liquor is committed to promoting the responsible consumption of alcohol.
                        We encourage our customers to drink responsibly and in moderation.
                      </p>
                      <p>
                        Alcohol should be consumed only by those of legal drinking age. Never drink
                        and drive. If you choose to drink, please do so responsibly and arrange for
                        a designated driver or alternative transportation.
                      </p>
                      <p>
                        Pregnant women should not consume alcohol. If you have a medical condition
                        or are taking medication, consult your physician before consuming alcoholic
                        beverages.
                      </p>
                      <p>
                        For information about alcohol and health, please visit responsible drinking
                        resources and consult with healthcare professionals.
                      </p>
                    </div>
                  </div>

                  <Separator className="bg-border" />

                  <div>
                    <h2 className="font-serif text-xl text-foreground tracking-wide mb-4">
                      Terms of Service
                    </h2>
                    <div className="w-8 h-px bg-gold-muted mb-6" />
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      <p>
                        By accessing and using this website, you agree to be bound by our Terms of
                        Service. A complete version of our Terms of Service is available upon request.
                        Please contact us for a full copy.
                      </p>
                    </div>
                  </div>

                  <Separator className="bg-border" />

                  <div>
                    <h2 className="font-serif text-xl text-foreground tracking-wide mb-4">
                      Privacy Policy
                    </h2>
                    <div className="w-8 h-px bg-gold-muted mb-6" />
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      <p>
                        We respect your privacy and are committed to protecting your personal
                        information. A complete version of our Privacy Policy is available upon
                        request. Please contact us for a full copy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Legal;




