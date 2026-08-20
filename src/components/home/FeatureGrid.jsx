import { FEATURES } from '../../utils/constants';

/**
 * Feature grid section showing the 6 core features.
 * Inspired by The हिंदी Lab's feature card layout.
 */
export default function FeatureGrid() {
  return (
    <section className="py-16 sm:py-20 relative">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500 text-white text-sm font-semibold mb-4">
            <span>🎯</span>
            Inside HindiLab
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">
            <span className="hindi-text text-primary-500">हिंदी</span> Lab Features
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Everything you need to master Hindi vocabulary and pronunciation
          </p>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }) {
  return (
    <div
      className="card p-6 relative overflow-hidden group"
      style={{
        animationDelay: `${index * 0.1}s`,
        animation: 'slide-up 0.5s ease-out both',
      }}
    >
      {/* Number badge */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mb-4 shadow-sm"
        style={{ backgroundColor: feature.color }}
      >
        {feature.id}
      </div>

      {/* Icon + Title */}
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl">{feature.icon}</span>
        <div>
          <h3 className="hindi-text text-lg font-bold text-text-primary leading-snug">
            {feature.title}
          </h3>
          <p className="text-text-muted text-xs font-medium mt-0.5">{feature.titleEnglish}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-text-secondary text-sm leading-relaxed">
        {feature.description}
      </p>

      {/* Hover accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100"
        style={{ backgroundColor: feature.color }}
      />
    </div>
  );
}
