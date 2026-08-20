import ReadingAloudWidget from '../widgets/ReadingAloudWidget';
import PictureDescriptionWidget from '../widgets/PictureDescriptionWidget';
import WordPowerWidget from '../widgets/WordPowerWidget';
import ProfessionCluesWidget from '../widgets/ProfessionCluesWidget';
import SynonymMatchWidget from '../widgets/SynonymMatchWidget';
import SpellingBuildWidget from '../widgets/SpellingBuildWidget';
import ReadingPracticeWidget from '../widgets/ReadingPracticeWidget';

/**
 * Interactive Demos section replacing the static demo preview.
 * Shows real working widgets replicating The Hindi Lab experience.
 */
export default function InteractiveFeatures() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-transparent via-primary-50/30 to-primary-50/50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-500 mb-3">
            Interactive Learning Demos
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Try out our core learning systems right here. Record your voice, match synonyms, spell words, and interact with the AI to improve your Hindi.
          </p>
        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 h-auto lg:h-[480px]">
          <ReadingAloudWidget />
          <PictureDescriptionWidget />
          <WordPowerWidget />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 h-auto lg:h-[480px]">
          <ProfessionCluesWidget />
          <SynonymMatchWidget />
          <SpellingBuildWidget />
        </div>

        {/* Row 3 — Reading Practice */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[480px]">
          <ReadingPracticeWidget />
        </div>

      </div>
    </section>
  );
}
