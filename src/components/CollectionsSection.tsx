import { Link } from "react-router-dom";
import whiskyImage from "@/assets/whisky-collection.jpg";
import cognacImage from "@/assets/cognac-collection.jpg";
import champagneImage from "@/assets/champagne-collection.jpg";
import rareSpiritsImage from "@/assets/rare-spirits.jpg";
import { categories } from "@/data/products";

const categoryImages: Record<string, string> = {
  whisky: whiskyImage,
  cognac: cognacImage,
  champagne: champagneImage,
  'rare-spirits': rareSpiritsImage,
};

const CollectionsSection = () => {
  return (
    <section id="collections" className="py-32 bg-charcoal-deep relative">
      {/* Texture overlay */}
      <div className="absolute inset-0 texture-overlay" />

      <div className="container mx-auto px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-muted mb-6 block">
            The Collection
          </span>
          <div className="w-12 h-px bg-gold-muted mx-auto mb-10" />
          <h2 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide">
            Curated Categories
          </h2>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((collection, index) => (
            <Link
              key={collection.slug}
              to={`/collections/${collection.slug}`}
              className="group relative overflow-hidden cursor-pointer block"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Container */}
              <div className="aspect-[3/4] overflow-hidden bg-secondary">
                <img
                  src={categoryImages[collection.slug]}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-transparent to-transparent opacity-80" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-xl text-foreground tracking-[0.15em] mb-2 group-hover:text-gold transition-colors duration-300">
                  {collection.name}
                </h3>
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {collection.description.split('.')[0]}
                </p>

                {/* Hover line */}
                <div className="mt-4 w-0 group-hover:w-full h-px bg-gold transition-all duration-500" />
              </div>

              {/* Border on hover */}
              <div className="absolute inset-0 border border-transparent group-hover:border-gold/30 transition-colors duration-500" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;
