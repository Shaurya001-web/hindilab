import { Link, useNavigate } from 'react-router-dom';
import Badge from '../ui/Badge';
import { READING_DIFFICULTY, PASSAGE_CATEGORIES } from '../../data/passages';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';

/**
 * Card component displaying a Hindi passage with a background image,
 * text preview, and actions for learning.
 */
export default function PassageLearnCard({ passage }) {
  const { playAudio, isPlaying } = useAudioPlayer();
  const navigate = useNavigate();
  
  const difficulty = READING_DIFFICULTY[passage.difficulty] || READING_DIFFICULTY.easy;
  const category = PASSAGE_CATEGORIES[passage.category] || {};

  const handlePractice = () => {
    // Navigate to reading page with state to select this passage
    navigate('/reading', { state: { selectedPassageId: passage.id } });
  };

  return (
    <div className="card group overflow-hidden flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-48 sm:h-56 gradient-card-warm flex items-center justify-center overflow-hidden shrink-0">
        {passage.image ? (
          <img
            src={passage.image}
            alt={passage.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="text-7xl">{category.emoji || '📖'}</div>
        )}
        
        {/* Gradient overlay for text readability if needed, or just let image shine */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Difficulty badge */}
        <div className="absolute top-3 right-3 z-10">
          <Badge color={difficulty.color} size="sm" className="hindi-text backdrop-blur-md bg-white/90">
            {difficulty.label}
          </Badge>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="hindi-text text-xs font-bold px-2 py-1 rounded-md bg-white/90 backdrop-blur-md shadow-sm flex items-center gap-1 text-text-primary">
            {category.emoji} {category.label}
          </span>
        </div>

        {/* Listen button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Call the Sarvam TTS backend endpoint
            playAudio(null, passage.text);
          }}
          className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200 cursor-pointer border-0 z-10 text-primary-600"
          title="Listen to pronunciation"
        >
          {isPlaying ? '⏸' : '🔊'}
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="hindi-text text-xl font-bold text-text-primary mb-3 line-clamp-1">
          {passage.title}
        </h3>

        {/* Text preview */}
        <p className="hindi-text text-text-secondary text-base leading-relaxed line-clamp-3 mb-5 flex-grow">
          {passage.text}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-auto pt-2 border-t border-border/50">
          <button
            onClick={handlePractice}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-400 text-white text-sm font-semibold shadow-[var(--shadow-button)] hover:shadow-[0_6px_20px_rgba(255,107,53,0.4)] hover:scale-[1.02] transition-all duration-250 cursor-pointer border-0"
          >
            <span className="text-lg">🎤</span>
            <span>Practice Reading</span>
          </button>
        </div>
      </div>
    </div>
  );
}
