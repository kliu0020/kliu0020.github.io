import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import AgeVerification from '@/components/AgeVerification';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { Card } from '@/components/ui/card';

const checkoutSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
  country: z.string().min(1, 'Country is required'),
  cardNumber: z.string().min(16, 'Card number is required'),
  cardName: z.string().min(1, 'Cardholder name is required'),
  expiryDate: z.string().min(5, 'Expiry date is required'),
  cvv: z.string().min(3, 'CVV is required'),
  ageConfirmed: z.boolean().refine((val) => val === true, {
    message: 'You must confirm you are of legal drinking age',
  }),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const { items, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(() => {
    return sessionStorage.getItem('ageVerified') === 'true';
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      ageConfirmed: false,
    },
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const onSubmit = async (data: CheckoutFormData) => {
    if (items.length === 0) {
      navigate('/cart');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    clearCart();
    setIsProcessing(false);

    // In a real app, this would redirect to a success page
    navigate('/');
  };

  if (items.length === 0 && isVerified) {
    return (
      <div className="min-h-screen bg-charcoal-deep">
        <Header />
        <main className="pt-24">
          <section className="py-20 bg-charcoal-deep relative">
            <div className="absolute inset-0 texture-overlay" />
            <div className="container mx-auto px-8 relative z-10 text-center">
              <p className="text-muted-foreground mb-8">Your cart is empty.</p>
              <Button variant="luxury" onClick={() => navigate('/collections')}>
                Browse Collections
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

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
                    Checkout
                  </h1>
                  <div className="w-12 h-px bg-gold-muted mt-6" />
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                    <div className="lg:col-span-2 space-y-12">
                      <div>
                        <h2 className="text-xs uppercase tracking-[0.25em] text-gold-muted mb-6">
                          Shipping Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="firstName" className="text-foreground">
                              First Name
                            </Label>
                            <Input
                              id="firstName"
                              {...register('firstName')}
                              className="mt-2 bg-input border-border"
                            />
                            {errors.firstName && (
                              <p className="text-xs text-destructive mt-1">
                                {errors.firstName.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="lastName" className="text-foreground">
                              Last Name
                            </Label>
                            <Input
                              id="lastName"
                              {...register('lastName')}
                              className="mt-2 bg-input border-border"
                            />
                            {errors.lastName && (
                              <p className="text-xs text-destructive mt-1">
                                {errors.lastName.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="email" className="text-foreground">
                              Email
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              {...register('email')}
                              className="mt-2 bg-input border-border"
                            />
                            {errors.email && (
                              <p className="text-xs text-destructive mt-1">
                                {errors.email.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="phone" className="text-foreground">
                              Phone
                            </Label>
                            <Input
                              id="phone"
                              type="tel"
                              {...register('phone')}
                              className="mt-2 bg-input border-border"
                            />
                            {errors.phone && (
                              <p className="text-xs text-destructive mt-1">
                                {errors.phone.message}
                              </p>
                            )}
                          </div>

                          <div className="md:col-span-2">
                            <Label htmlFor="address" className="text-foreground">
                              Address
                            </Label>
                            <Input
                              id="address"
                              {...register('address')}
                              className="mt-2 bg-input border-border"
                            />
                            {errors.address && (
                              <p className="text-xs text-destructive mt-1">
                                {errors.address.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="city" className="text-foreground">
                              City
                            </Label>
                            <Input
                              id="city"
                              {...register('city')}
                              className="mt-2 bg-input border-border"
                            />
                            {errors.city && (
                              <p className="text-xs text-destructive mt-1">
                                {errors.city.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="state" className="text-foreground">
                              State
                            </Label>
                            <Input
                              id="state"
                              {...register('state')}
                              className="mt-2 bg-input border-border"
                            />
                            {errors.state && (
                              <p className="text-xs text-destructive mt-1">
                                {errors.state.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="zipCode" className="text-foreground">
                              Zip Code
                            </Label>
                            <Input
                              id="zipCode"
                              {...register('zipCode')}
                              className="mt-2 bg-input border-border"
                            />
                            {errors.zipCode && (
                              <p className="text-xs text-destructive mt-1">
                                {errors.zipCode.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="country" className="text-foreground">
                              Country
                            </Label>
                            <Input
                              id="country"
                              {...register('country')}
                              className="mt-2 bg-input border-border"
                            />
                            {errors.country && (
                              <p className="text-xs text-destructive mt-1">
                                {errors.country.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <Separator className="bg-border" />

                      <div>
                        <h2 className="text-xs uppercase tracking-[0.25em] text-gold-muted mb-6">
                          Payment Information
                        </h2>
                        <div className="space-y-6">
                          <div>
                            <Label htmlFor="cardNumber" className="text-foreground">
                              Card Number
                            </Label>
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              {...register('cardNumber')}
                              className="mt-2 bg-input border-border"
                            />
                            {errors.cardNumber && (
                              <p className="text-xs text-destructive mt-1">
                                {errors.cardNumber.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="cardName" className="text-foreground">
                              Cardholder Name
                            </Label>
                            <Input
                              id="cardName"
                              {...register('cardName')}
                              className="mt-2 bg-input border-border"
                            />
                            {errors.cardName && (
                              <p className="text-xs text-destructive mt-1">
                                {errors.cardName.message}
                              </p>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <Label htmlFor="expiryDate" className="text-foreground">
                                Expiry Date
                              </Label>
                              <Input
                                id="expiryDate"
                                placeholder="MM/YY"
                                {...register('expiryDate')}
                                className="mt-2 bg-input border-border"
                              />
                              {errors.expiryDate && (
                                <p className="text-xs text-destructive mt-1">
                                  {errors.expiryDate.message}
                                </p>
                              )}
                            </div>

                            <div>
                              <Label htmlFor="cvv" className="text-foreground">
                                CVV
                              </Label>
                              <Input
                                id="cvv"
                                type="password"
                                placeholder="123"
                                {...register('cvv')}
                                className="mt-2 bg-input border-border"
                              />
                              {errors.cvv && (
                                <p className="text-xs text-destructive mt-1">
                                  {errors.cvv.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator className="bg-border" />

                      <div>
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            id="ageConfirmed"
                            {...register('ageConfirmed')}
                            className="mt-1 w-4 h-4 border-border bg-input text-gold focus:ring-gold"
                          />
                          <Label htmlFor="ageConfirmed" className="text-sm text-foreground">
                            I confirm that I am of legal drinking age in my country of residence
                            and that the information provided is accurate.
                          </Label>
                        </div>
                        {errors.ageConfirmed && (
                          <p className="text-xs text-destructive mt-2">
                            {errors.ageConfirmed.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="lg:col-span-1">
                      <div className="sticky top-32">
                        <Card className="border-border p-8 bg-card">
                          <h2 className="font-serif text-xl text-foreground tracking-wide mb-6">
                            Order Summary
                          </h2>

                          <Separator className="mb-6 bg-border" />

                          <div className="space-y-4 mb-6">
                            {items.map((item) => (
                              <div key={item.id} className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                  {item.name} × {item.quantity}
                                </span>
                                <span className="text-foreground">
                                  {formatPrice(item.price * item.quantity)}
                                </span>
                              </div>
                            ))}
                          </div>

                          <Separator className="mb-6 bg-border" />

                          <div className="flex justify-between mb-8">
                            <span className="font-serif text-lg text-foreground">Total</span>
                            <span className="font-serif text-lg text-foreground">
                              {formatPrice(getTotal())}
                            </span>
                          </div>

                          <Button
                            type="submit"
                            variant="luxury"
                            size="lg"
                            disabled={isProcessing}
                            className="w-full"
                          >
                            {isProcessing ? 'Processing...' : 'Complete Purchase'}
                          </Button>
                        </Card>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Checkout;




