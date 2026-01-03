import { useState } from 'react';
import { Link } from 'react-router-dom';
import AgeVerification from '@/components/AgeVerification';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { createCheckoutSession } from '@/lib/api';

const Cart = () => {
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCart();
  const [isVerified, setIsVerified] = useState(() => {
    return sessionStorage.getItem('ageVerified') === 'true';
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleProceedToCheckout = async () => {
    if (items.length === 0) {
      return;
    }

    setIsLoading(true);

    try {
      // Prepare items for checkout (only id and qty, no prices)
      const checkoutItems = items.map((item) => ({
        id: item.id,
        qty: item.quantity,
      }));

      // Call backend to create Stripe Checkout session
      const { url } = await createCheckoutSession(checkoutItems);

      if (url) {
        // Redirect browser to Stripe Checkout
        window.location.href = url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert(error instanceof Error ? error.message : 'Failed to start checkout. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isVerified && <AgeVerification onVerified={() => setIsVerified(true)} />}
      {isVerified && (
        <div className="min-h-screen bg-charcoal-deep">
          <Header />
          <main className="pt-24">
            <section className="py-20 bg-charcoal-deep relative">
              <div className="absolute inset-0 texture-overlay" />

              <div className="container mx-auto px-8 relative z-10">
                <div className="mb-12">
                  <h1 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide">
                    Cart
                  </h1>
                  <div className="w-12 h-px bg-gold-muted mt-6" />
                </div>

                {items.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground mb-8">Your cart is empty.</p>
                    <Link to="/collections">
                      <Button variant="luxury">Browse Collections</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                    <div className="lg:col-span-2 space-y-8">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-6 pb-8 border-b border-border">
                          <Link
                            to={`/product/${item.slug}`}
                            className="w-24 h-32 flex-shrink-0 overflow-hidden bg-secondary"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </Link>

                          <div className="flex-1 flex flex-col">
                            <Link
                              to={`/product/${item.slug}`}
                              className="font-serif text-lg text-foreground tracking-[0.1em] mb-2 hover:text-gold transition-colors duration-300"
                            >
                              {item.name}
                            </Link>
                            <p className="text-sm text-muted-foreground mb-4">
                              {formatPrice(item.price)}
                            </p>

                            <div className="mt-auto flex items-center gap-6">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="text-gold hover:text-gold-light transition-colors duration-300 text-lg"
                                  aria-label="Decrease quantity"
                                >
                                  −
                                </button>
                                <span className="text-foreground w-8 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="text-gold hover:text-gold-light transition-colors duration-300 text-lg"
                                  aria-label="Increase quantity"
                                >
                                  +
                                </button>
                              </div>

                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-gold transition-colors duration-300 ml-auto"
                              >
                                Remove
                              </button>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-foreground">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="lg:col-span-1">
                      <div className="sticky top-32">
                        <div className="border border-border p-8 bg-card">
                          <h2 className="font-serif text-xl text-foreground tracking-wide mb-6">
                            Summary
                          </h2>

                          <Separator className="mb-6 bg-border" />

                          <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Subtotal</span>
                              <span className="text-foreground">{formatPrice(getTotal())}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Shipping</span>
                              <span className="text-foreground">Calculated at checkout</span>
                            </div>
                          </div>

                          <Separator className="mb-6 bg-border" />

                          <div className="flex justify-between mb-8">
                            <span className="font-serif text-lg text-foreground">Total</span>
                            <span className="font-serif text-lg text-foreground">
                              {formatPrice(getTotal())}
                            </span>
                          </div>

                          <Button
                            variant="luxury"
                            size="lg"
                            onClick={handleProceedToCheckout}
                            disabled={isLoading}
                            className="w-full mb-4"
                          >
                            {isLoading ? 'Processing...' : 'Proceed to Checkout'}
                          </Button>

                          <button
                            onClick={clearCart}
                            className="text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-gold transition-colors duration-300 w-full text-center"
                          >
                            Clear Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Cart;




