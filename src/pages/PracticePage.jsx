import { useParams, Link, useNavigate } from 'react-router-dom';
import words from '../data/words.json';
import WordDetail from '../components/learning/WordDetail';
import AudioPlayer from '../components/learning/AudioPlayer';
import PronunciationTrainer from '../components/learning/PronunciationTrainer';
import Button from '../components/ui/Button';

/**
 * Full practice page for a specific word.
 * Shows word detail, teacher audio, and pronunciation trainer.
 */
export default function PracticePage() {
  const { wordId } = useParams();
  const navigate = useNavigate();
  const word = words.find((w) => w.id === parseInt(wordId));

  if (!word) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🤔</div>
          <h2 className="hindi-text text-2xl font-bold text-text-primary mb-2">
            शब्द नहीं मिला
          </h2>
          <p className="text-text-secondary mb-6">Word not found</p>
          <Link to="/learn">
            <Button icon="←">Back to Words</Button>
          </Link>
        </div>
      </main>
    );
  }

  // Find prev/next words for navigation
  const currentIndex = words.findIndex((w) => w.id === word.id);
  const prevWord = currentIndex > 0 ? words[currentIndex - 1] : null;
  const nextWord = currentIndex < words.length - 1 ? words[currentIndex + 1] : null;

  return (
    <main className="min-h-screen">
      {/* Page header */}
      <div className="gradient-hero py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-text-muted mb-4">
            <Link to="/learn" className="hover:text-primary-500 transition-colors no-underline text-text-muted">
              शब्द Gallery
            </Link>
            <span>→</span>
            <span className="hindi-text text-primary-500 font-medium">{word.word}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary flex items-center gap-3">
            <span className="text-4xl">{word.emoji}</span>
            <span className="hindi-text">{word.word}</span>
            <span className="text-text-muted text-lg font-normal">({word.english})</span>
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 pb-16">
        <div className="flex flex-col gap-6">
          {/* Word Detail */}
          <WordDetail word={word} />

          {/* Teacher Audio */}
          <AudioPlayer
            src={word.teacherAudio}
            word={word.word}
            label="शिक्षक का उच्चारण सुनें"
          />

          {/* Pronunciation Trainer */}
          <PronunciationTrainer word={word} />

          {/* Word Navigation */}
          <div className="flex items-center justify-between mt-4">
            {prevWord ? (
              <button
                onClick={() => navigate(`/practice/${prevWord.id}`)}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-white border-2 border-primary-200 text-text-secondary font-medium hover:border-primary-400 hover:bg-primary-50 transition-all duration-200 cursor-pointer"
              >
                <span>←</span>
                <span className="hindi-text">{prevWord.word}</span>
              </button>
            ) : (
              <div />
            )}

            {nextWord ? (
              <button
                onClick={() => navigate(`/practice/${nextWord.id}`)}
                className="flex items-center gap-2 px-5 py-3 rounded-full gradient-primary text-white font-medium shadow-md hover:scale-[1.03] transition-all duration-200 cursor-pointer border-0"
              >
                <span className="hindi-text">{nextWord.word}</span>
                <span>→</span>
              </button>
            ) : (
              <Link
                to="/learn"
                className="flex items-center gap-2 px-5 py-3 rounded-full gradient-primary text-white font-medium shadow-md hover:scale-[1.03] transition-all duration-200 no-underline"
              >
                <span>📚</span>
                <span>All Words</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
