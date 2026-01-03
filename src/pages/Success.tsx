import { useSearchParams, Link } from 'react-router-dom';
import AgeVerification from '@/components/AgeVerification';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [isVerified, setIsVerified] = useState(() => {
    return sessionStorage.getItem('ageVerified') === 'true';
  });

  if (!isVerified) {
    return <AgeVerification onVerified={() => setIsVerified(true)} />;
  }

  return (
    <div className="min-h-screen bg-charcoal-deep">
      <Header />
      <main className="pt-24">
        <section className="py-20 bg-charcoal-deep relative">
          <div className="absolute inset-0 texture-overlay" />

          <div className="container mx-auto px-8 relative z-10">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <CheckCircle2 className="w-16 h-16 text-gold mx-auto mb-6" />
                <h1 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide mb-4">
                  Payment Successful
                </h1>
                <p className="text-muted-foreground">
                  Thank you for your purchase. Your order has been confirmed.
                </p>
                <div className="w-12 h-px bg-gold-muted mt-6 mx-auto" />
              </div>

              <div className="border border-border p-8 bg-card space-y-6">
                <div>
                  <h2 className="font-serif text-xl text-foreground tracking-wide mb-4">
                    Order Confirmation
                  </h2>
                  <Separator className="mb-4 bg-border" />

                  {sessionId && (
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Session ID</span>
                        <span className="text-foreground font-mono text-xs break-all">
                          {sessionId}
                        </span>
                      </div>
                    </div>
                  )}

                  <p className="text-sm text-muted-foreground mt-4">
                    A confirmation email has been sent to your email address.
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center space-y-4">
                <div className="flex gap-4 justify-center">
                  <Link to="/collections">
                    <Button variant="outline">Continue Shopping</Button>
                  </Link>
                  <Link to="/">
                    <Button variant="luxury">Return Home</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Success;

