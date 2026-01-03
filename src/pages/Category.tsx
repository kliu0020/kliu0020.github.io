import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import AgeVerification from '@/components/AgeVerification';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProductsByCategory, getCategoryBySlug } from '@/data/products';
import { Card } from '@/components/ui/card';

const Category = () => {
  const { category } = useParams<{ category: string }>();
  const [isVerified, setIsVerified] = useState(() => {
    return sessionStorage.getItem('ageVerified') === 'true';
  });

  if (!category) {
    return null;
  }

  const categoryData = getCategoryBySlug(category);
  const products = getProductsByCategory(category);

  if (!categoryData) {
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
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
                <div className="mb-16">
                  <Link
                    to="/collections"
                    className="text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-gold transition-colors duration-300 inline-block mb-8"
                  >
                    ← Collections
                  </Link>
                  <div className="text-center mb-12">
                    <h1 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide mb-4">
                      {categoryData.name}
                    </h1>
                    <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                      {categoryData.description}
                    </p>
                    <div className="w-12 h-px bg-gold-muted mx-auto mt-8" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.slug}`}
                      className="group block"
                    >
                      <Card className="bg-card border-border hover:border-gold/30 transition-all duration-300 overflow-hidden">
                        <div className="aspect-[2/3] overflow-hidden bg-secondary">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                          />
                        </div>
                        <div className="p-6">
                          <h2 className="font-serif text-lg text-foreground tracking-[0.1em] mb-3 group-hover:text-gold transition-colors duration-300">
                            {product.name}
                          </h2>
                          <p className="text-sm text-muted-foreground mb-4">
                            {formatPrice(product.price)}
                          </p>
                          <div className="w-0 group-hover:w-full h-px bg-gold transition-all duration-300" />
                        </div>
                      </Card>
                    </Link>
                  ))}
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

export default Category;




