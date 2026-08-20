import { Link } from 'react-router-dom';
import PassageLearnCard from '../components/learning/PassageLearnCard';
import { getFeaturedPassages } from '../data/passages';

/**
 * Featured reading gallery page showing passages for learning.
 */
export default function LearnPage() {
  const passages = getFeaturedPassages();

  return (
    <main className="min-h-screen">
      {/* Page header */}
      <div className="gradient-hero py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">
            <span className="hindi-text text-primary-500">पढ़ने</span> Gallery
          </h1>
          <p className="text-text-secondary max-w-lg mx-auto mb-2">
            Choose a story or passage to learn new words, meaning, and practice pronunciation.
          </p>
          <p className="hindi-text text-text-muted text-sm">
            कहानी चुनें, अर्थ सीखें, और उच्चारण का अभ्यास करें
          </p>
        </div>
      </div>

      {/* Passage cards grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {passages.map((passage, index) => (
            <div
              key={passage.id}
              style={{ animation: `slide-up 0.5s ease-out ${index * 0.1}s both` }}
            >
              <PassageLearnCard passage={passage} />
            </div>
          ))}
        </div>

        {/* Info banner */}
        <div className="mt-12 card-static p-6 text-center gradient-card-warm">
          <div className="text-3xl mb-3">🖼️</div>
          <h3 className="font-bold text-text-primary mb-2">Image to Word AI</h3>
          <p className="text-text-secondary text-sm max-w-md mx-auto mb-1">
            Upload any image and our AI (powered by Google Gemini) will identify the object
            and teach you the Hindi word with meaning, synonyms, and antonyms.
          </p>
          <p className="hindi-text text-text-muted text-xs">
            कोई भी चित्र अपलोड करें और AI हिंदी शब्द सिखाएगा
          </p>
        </div>
      </div>
    </main>
  );
}
