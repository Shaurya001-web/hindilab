import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import passages, {
  getPassagesByDifficulty,
  getPassageOfTheDay,
  READING_DIFFICULTY,
  PASSAGE_CATEGORIES,
  getPassageById,
} from '../data/passages';
import PassageCard from '../components/reading/PassageCard';
import ReadingTrainer from '../components/reading/ReadingTrainer';

/**
 * Full reading practice page.
 * Shows "Passage of the Day", difficulty filters, passage library,
 * and the ReadingTrainer for the selected passage.
 */
export default function ReadingPracticePage() {
  const location = useLocation();
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedPassage, setSelectedPassage] = useState(null);
  const [trainerKey, setTrainerKey] = useState(0); // force re-mount on new passage

  // Auto-select passage from router state
  useEffect(() => {
    if (location.state?.selectedPassageId) {
      const p = getPassageById(location.state.selectedPassageId);
      if (p) {
        setSelectedPassage(p);
        setTrainerKey((k) => k + 1);
        setTimeout(() => {
          document.getElementById('reading-trainer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
      // Clear state so it doesn't re-trigger on reload
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const { passage: dailyPassage, dayNumber } = getPassageOfTheDay();

  const filteredPassages = useMemo(
    () => getPassagesByDifficulty(selectedDifficulty),
    [selectedDifficulty]
  );

  const difficultyTabs = [
    { key: 'all', label: 'सभी', labelEn: 'All', color: '#FF6B35' },
    ...Object.entries(READING_DIFFICULTY).map(([key, val]) => ({
      key,
      label: val.label,
      labelEn: val.labelEn,
      color: val.color,
    })),
  ];

  const handleSelectPassage = (passage) => {
    setSelectedPassage(passage);
    setTrainerKey((k) => k + 1);
    // Scroll to trainer
    setTimeout(() => {
      document.getElementById('reading-trainer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleNewPassage = () => {
    setSelectedPassage(null);
    // Scroll back to top of passage list
    setTimeout(() => {
      document.getElementById('passage-library')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <main className="min-h-screen">
      {/* Page header */}
      <div className="gradient-hero py-10 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">
            <span className="text-primary-500">📖 Reading Practice</span>
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto mb-1">
            Choose a Hindi passage, listen to the correct pronunciation, then read it aloud and get AI-powered feedback.
          </p>
          <p className="text-text-muted text-sm font-medium">
            Choose a passage, listen to the pronunciation, read aloud, and check your score.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 pb-16">

        {/* ===== Passage of the Day ===== */}
        {!selectedPassage && (
          <div className="mb-8 card-static p-5 sm:p-6 gradient-card-warm border-2 border-primary-200 animate-[slide-up_0.5s_ease-out]">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">📅</span>
              <div>
                <h2 className="text-base font-bold text-primary-600">Passage of the Day</h2>
                <p className="text-text-muted text-xs font-medium">Day {dayNumber}</p>
              </div>
            </div>
            <p className="hindi-text text-lg leading-relaxed text-text-primary font-medium mb-4 pl-2 border-l-4 border-primary-200">
              {dailyPassage.text}
            </p>
            <button
              onClick={() => handleSelectPassage(dailyPassage)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full gradient-primary text-white font-semibold text-sm shadow-md hover:scale-[1.03] transition-transform duration-200 cursor-pointer border-0"
            >
              <span>🎤</span>
              <span>Practice Reading</span>
            </button>
          </div>
        )}

        {/* ===== Selected passage — ReadingTrainer ===== */}
        {selectedPassage && (
          <div id="reading-trainer" className="mb-8 animate-[slide-up_0.4s_ease-out]">
            <ReadingTrainer
              key={trainerKey}
              passage={selectedPassage}
              onNewPassage={handleNewPassage}
            />
          </div>
        )}

        {/* ===== Passage Library ===== */}
        <div id="passage-library">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
              📚 Choose a Passage
            </h2>

            {/* Difficulty filter tabs */}
            <div className="flex items-center gap-2 flex-wrap">
              {difficultyTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedDifficulty(tab.key)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer border-0 ${
                    selectedDifficulty === tab.key
                      ? 'text-white shadow-md'
                      : 'bg-white text-text-secondary border border-primary-200 hover:border-primary-400'
                  }`}
                  style={
                    selectedDifficulty === tab.key
                      ? { backgroundColor: tab.color }
                      : { borderWidth: '1px', borderStyle: 'solid', borderColor: '#F0E6D9' }
                  }
                >
                  <span className="hindi-text">{tab.label}</span>
                  <span className="ml-1 opacity-70">({tab.labelEn})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Passage cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredPassages.map((passage, index) => (
              <div
                key={passage.id}
                style={{ animation: `slide-up 0.4s ease-out ${index * 0.05}s both` }}
              >
                <PassageCard
                  passage={passage}
                  isActive={selectedPassage?.id === passage.id}
                  onClick={handleSelectPassage}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
