import Hero from '../components/home/Hero';
import FeatureGrid from '../components/home/FeatureGrid';
import InteractiveFeatures from '../components/home/InteractiveFeatures';

/**
 * Landing page with hero, features, and interactive widgets sections.
 */
export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeatureGrid />
      <InteractiveFeatures />
    </main>
  );
}
