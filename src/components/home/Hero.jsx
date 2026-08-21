import { Link } from 'react-router-dom';
import Button from '../ui/Button';

/**
 * Hero section for the landing page.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-70" />

      {/* Decorative shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary-300/20 animate-[float_6s_ease-in-out_infinite]" />
      <div className="absolute top-40 right-20 w-14 h-14 rounded-full bg-primary-400/15 animate-[float_8s_ease-in-out_infinite_1s]" />
      <div className="absolute bottom-20 left-1/4 w-10 h-10 rounded-full bg-primary-200/25 animate-[float_7s_ease-in-out_infinite_2s]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-3xl mx-auto">

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary leading-tight mb-6 animate-[slide-up_0.6s_ease-out]">
            Making{' '}
            <span className="hindi-text relative inline-block">
              <span className="relative z-10 text-primary-500">हिंदी</span>
            </span>{' '}
            learning{' '}
            <span className="text-primary-500 italic">fun</span>{' '}
            with AI
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-text-secondary leading-relaxed mb-8 animate-[slide-up_0.6s_ease-out_0.15s_both]">
            Learn Hindi words through images, practice pronunciation with AI feedback,
            and build your vocabulary — all in one beautiful, interactive platform.
          </p>

          {/* Hindi subtitle */}
          <p className="hindi-text text-base text-text-muted mb-10 animate-[slide-up_0.6s_ease-out_0.25s_both]">
            चित्रों से शब्द सीखें, AI से उच्चारण सुधारें, और अपनी शब्दावली बढ़ाएं
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-[slide-up_0.6s_ease-out_0.35s_both]">
            <Link to="/learn" className="w-full sm:w-auto">
              <Button size="lg" icon="✨" className="w-full sm:w-auto">
                Start Learning
              </Button>
            </Link>
            <Link to="/learn" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" icon="👀" className="w-full sm:w-auto">
                See Demo
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 sm:gap-12 mt-12 animate-[fade-in_0.8s_ease-out_0.5s_both]">
            <StatItem number="6+" label="Hindi Words" />
            <div className="w-px h-10 bg-primary-200" />
            <StatItem number="🎤" label="AI Scoring" />
            <div className="w-px h-10 bg-primary-200" />
            <StatItem number="100%" label="Free Demo" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatItem({ number, label }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-primary-500">{number}</div>
      <div className="text-xs text-text-muted mt-1">{label}</div>
    </div>
  );
}
