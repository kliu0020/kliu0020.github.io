import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AgeVerification from '@/components/AgeVerification';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getProductBySlug, getCategoryBySlug } from '@/data/products';
import { useCart } from '@/contexts/CartContext';

const Product = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [isVerified, setIsVerified] = useState(() => {
    return sessionStorage.getItem('ageVerified') === 'true';
  });

  if (!slug) {
    return null;
  }

  const product = getProductBySlug(slug);

  if (!product) {
    return null;
  }

  const category = getCategoryBySlug(product.category);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
    });
    navigate('/cart');
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
                <div className="mb-8">
                  <Link
                    to={category ? `/collections/${category.slug}` : '/collections'}
                    className="text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-gold transition-colors duration-300 inline-block"
                  >
                    ← Back to {category?.name || 'Collections'}
                  </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
                  <div className="aspect-[2/3] overflow-hidden bg-secondary">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col">
                    <h1 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide mb-6">
                      {product.name}
                    </h1>

                    <p className="text-lg text-muted-foreground mb-8">
                      {formatPrice(product.price)}
                    </p>

                    <Separator className="mb-8 bg-border" />

                    <div className="mb-8">
                      <h2 className="text-xs uppercase tracking-[0.25em] text-gold-muted mb-4">
                        Provenance
                      </h2>
                      <p className="text-sm text-foreground leading-relaxed">
                        {product.provenance}
                      </p>
                    </div>

                    <Separator className="mb-8 bg-border" />

                    <div className="mb-8">
                      <h2 className="text-xs uppercase tracking-[0.25em] text-gold-muted mb-4">
                        Tasting Notes
                      </h2>
                      <ul className="space-y-2">
                        {product.tastingNotes.map((note, index) => (
                          <li
                            key={index}
                            className="text-sm text-foreground flex items-center"
                          >
                            <span className="w-1.5 h-1.5 bg-gold-muted rounded-full mr-3" />
                            {note}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator className="mb-8 bg-border" />

                    <div className="mb-12">
                      <h2 className="text-xs uppercase tracking-[0.25em] text-gold-muted mb-4">
                        Details
                      </h2>
                      <div className="space-y-3 text-sm text-foreground">
                        {product.region && (
                          <div>
                            <span className="text-muted-foreground">Region:</span>{' '}
                            <span>{product.region}</span>
                          </div>
                        )}
                        {product.age && (
                          <div>
                            <span className="text-muted-foreground">Age:</span>{' '}
                            <span>{product.age}</span>
                          </div>
                        )}
                        <div>
                          <span className="text-muted-foreground">ABV:</span>{' '}
                          <span>{product.abv}</span>
                        </div>
                      </div>
                    </div>

                    {product.inStock ? (
                      <Button
                        variant="luxury"
                        size="lg"
                        onClick={handleAddToCart}
                        className="w-full"
                      >
                        Add to Cart
                      </Button>
                    ) : (
                      <Button variant="outline" size="lg" disabled className="w-full">
                        Out of Stock
                      </Button>
                    )}
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

export default Product;




