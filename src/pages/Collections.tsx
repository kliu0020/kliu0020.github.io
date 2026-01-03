import { Link } from 'react-router-dom';
import { useState } from 'react';
import AgeVerification from '@/components/AgeVerification';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { categories } from '@/data/products';
import whiskyImage from '@/assets/whisky-collection.jpg';
import cognacImage from '@/assets/cognac-collection.jpg';
import champagneImage from '@/assets/champagne-collection.jpg';
import rareSpiritsImage from '@/assets/rare-spirits.jpg';

const categoryImages: Record<string, string> = {
  whisky: whiskyImage,
  cognac: cognacImage,
  champagne: champagneImage,
  'rare-spirits': rareSpiritsImage,
};

const Collections = () => {
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
            <section className="py-32 bg-charcoal-deep relative">
              <div className="absolute inset-0 texture-overlay" />

              <div className="container mx-auto px-8 relative z-10">
                <div className="text-center mb-20">
                  <span className="text-xs uppercase tracking-[0.25em] text-gold-muted mb-6 block">
                    The Collection
                  </span>
                  <div className="w-12 h-px bg-gold-muted mx-auto mb-10" />
                  <h1 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide">
                    Curated Categories
                  </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                  {categories.map((category, index) => (
                    <Link
                      key={category.slug}
                      to={`/collections/${category.slug}`}
                      className="group relative overflow-hidden cursor-pointer block"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="aspect-[3/4] overflow-hidden bg-secondary">
                        <img
                          src={categoryImages[category.slug]}
                          alt={category.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-transparent to-transparent opacity-80" />
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h2 className="font-serif text-xl text-foreground tracking-[0.15em] mb-2 group-hover:text-gold transition-colors duration-300">
                          {category.name}
                        </h2>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-1">
                          {category.description}
                        </p>

                        <div className="mt-4 w-0 group-hover:w-full h-px bg-gold transition-all duration-500" />
                      </div>

                      <div className="absolute inset-0 border border-transparent group-hover:border-gold/30 transition-colors duration-500" />
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

export default Collections;




