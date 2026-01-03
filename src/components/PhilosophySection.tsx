const philosophyPoints = [
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Provenance",
    description: "Every bottle traced to its origin.",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Patience",
    description: "We wait for exceptional vintages.",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: "Excellence",
    description: "Only the finest make our selection.",
  },
];

const PhilosophySection = () => {
  return (
    <section id="philosophy" className="py-32 bg-charcoal relative">
      {/* Texture overlay */}
      <div className="absolute inset-0 texture-overlay" />

      <div className="container mx-auto px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-muted mb-6 block">
            Philosophy
          </span>
          <div className="w-12 h-px bg-gold-muted mx-auto mb-10" />
          <h2 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide max-w-2xl mx-auto">
            The Principles That Guide Our Curation
          </h2>
        </div>

        {/* Philosophy Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {philosophyPoints.map((point, index) => (
            <div
              key={point.title}
              className="text-center group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Icon */}
              <div className="mb-8 text-gold-muted group-hover:text-gold transition-colors duration-500 flex justify-center">
                {point.icon}
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl text-foreground tracking-[0.15em] mb-4">
                {point.title}
              </h3>

              {/* Divider */}
              <div className="w-8 h-px bg-gold-muted mx-auto mb-4 group-hover:w-12 group-hover:bg-gold transition-all duration-500" />

              {/* Description */}
              <p className="text-muted-foreground text-sm">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
