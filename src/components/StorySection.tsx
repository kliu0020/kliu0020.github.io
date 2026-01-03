const StorySection = () => {
  return (
    <section id="story" className="py-32 bg-charcoal relative">
      {/* Texture overlay */}
      <div className="absolute inset-0 texture-overlay" />

      <div className="container mx-auto px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section Label */}
          <span className="text-xs uppercase tracking-[0.25em] text-gold-muted mb-8 block">
            Our Story
          </span>

          {/* Divider */}
          <div className="w-12 h-px bg-gold-muted mx-auto mb-12" />

          {/* Main Text */}
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed mb-8">
            Founded on the belief that exceptional spirits deserve exceptional care.
          </h2>

          {/* Body Copy */}
          <p className="text-muted-foreground font-sans text-base leading-loose max-w-2xl mx-auto">
            Loyal Liquor is not a catalogue. It is a curation. Every bottle on our shelves 
            has been selected with intention—sourced from distilleries that honor tradition 
            and craft. We serve those who understand that the finest moments are not rushed, 
            but savored.
          </p>

          {/* Signature */}
          <div className="mt-16 flex items-center justify-center gap-6">
            <div className="w-16 h-px bg-gold-muted" />
            <span className="font-serif text-gold italic text-lg">Est. 2024</span>
            <div className="w-16 h-px bg-gold-muted" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
