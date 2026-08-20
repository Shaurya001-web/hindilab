import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';
import { DIFFICULTY_LABELS } from '../../utils/constants';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';

/**
 * Card component displaying a Hindi word with image, meaning preview, and actions.
 */
export default function WordCard({ word }) {
  const { speakHindi, isPlaying } = useAudioPlayer();
  const difficulty = DIFFICULTY_LABELS[word.difficulty] || DIFFICULTY_LABELS.easy;

  return (
    <div className="card group overflow-hidden">
      {/* Image / Emoji Section */}
      <div className="relative h-44 gradient-card-warm flex items-center justify-center overflow-hidden">
        {word.image ? (
          <img
            src={word.image}
            alt={word.english}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              // Fallback to emoji if image fails
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div
          className={`${word.image ? 'hidden' : 'flex'} items-center justify-center w-full h-full text-7xl`}
          style={{ display: word.image ? 'none' : 'flex' }}
        >
          {word.emoji}
        </div>

        {/* Difficulty badge */}
        <div className="absolute top-3 right-3">
          <Badge color={difficulty.color} size="sm" className="hindi-text backdrop-blur-sm">
            {difficulty.label}
          </Badge>
        </div>

        {/* Listen button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            speakHindi(word.word);
          }}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200 cursor-pointer border-0"
          title="Listen to pronunciation"
        >
          {isPlaying ? '⏸' : '🔊'}
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Hindi word */}
        <h3 className="hindi-text text-2xl font-bold text-text-primary mb-1">
          {word.word}
        </h3>

        {/* Romanized */}
        <p className="text-text-muted text-sm italic mb-2">{word.wordRoman}</p>

        {/* English */}
        <p className="text-text-secondary text-sm font-medium mb-3">
          {word.english}
        </p>

        {/* Meaning preview */}
        <p className="hindi-text text-text-secondary text-sm line-clamp-2 mb-4">
          {word.meaning}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            to={`/practice/${word.id}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-primary-500 to-primary-400 text-white text-sm font-semibold shadow-[var(--shadow-button)] hover:shadow-[0_6px_20px_rgba(255,107,53,0.4)] hover:scale-[1.02] transition-all duration-250 no-underline"
          >
            🎤 Practice
          </Link>
          <Link
            to={`/practice/${word.id}`}
            className="w-10 h-10 rounded-full border-2 border-primary-200 flex items-center justify-center hover:border-primary-400 hover:bg-primary-50 transition-all duration-200 no-underline text-sm"
          >
            →
          </Link>
        </div>
      </div>
    </div>
  );
}
