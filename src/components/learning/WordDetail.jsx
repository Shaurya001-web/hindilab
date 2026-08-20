import Badge from '../ui/Badge';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';

/**
 * Expanded word detail view showing full information:
 * word, meaning, synonyms, antonyms, and teacher audio.
 */
export default function WordDetail({ word }) {
  const { speakHindi, isPlaying } = useAudioPlayer();

  if (!word) return null;

  return (
    <div className="card-static p-6 sm:p-8 animate-[scale-in_0.3s_ease-out]">
      {/* Header with image and word */}
      <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
        {/* Image / Emoji */}
        <div className="w-32 h-32 rounded-2xl gradient-card-warm border border-border flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
          {word.image ? (
            <img
              src={word.image}
              alt={word.english}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div
            className={`${word.image ? 'hidden' : 'flex'} items-center justify-center w-full h-full text-6xl`}
            style={{ display: word.image ? 'none' : 'flex' }}
          >
            {word.emoji}
          </div>
        </div>

        {/* Word info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="hindi-text text-3xl sm:text-4xl font-bold text-text-primary">
              {word.word}
            </h2>
            <button
              onClick={() => speakHindi(word.word)}
              className="w-10 h-10 rounded-full gradient-primary text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200 cursor-pointer border-0 text-lg"
              title="Listen to pronunciation"
            >
              {isPlaying ? '⏸' : '🔊'}
            </button>
          </div>
          <p className="text-text-muted text-sm italic mb-1">{word.wordRoman}</p>
          <p className="text-text-secondary font-medium text-lg">{word.english}</p>
        </div>
      </div>

      {/* Meaning Section */}
      <div className="mb-6 p-4 rounded-xl bg-primary-50/50 border border-primary-100">
        <h4 className="hindi-text text-sm font-semibold text-primary-600 mb-2 flex items-center gap-2">
          📝 अर्थ <span className="text-text-muted font-normal">(Meaning)</span>
        </h4>
        <p className="hindi-text text-text-primary leading-relaxed">
          {word.meaning}
        </p>
        {word.meaningEnglish && (
          <p className="text-text-secondary text-sm mt-2 italic">
            {word.meaningEnglish}
          </p>
        )}
      </div>

      {/* Synonyms & Antonyms */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Synonyms */}
        <div className="p-4 rounded-xl bg-success-400/5 border border-success-400/20">
          <h4 className="hindi-text text-sm font-semibold text-success-600 mb-3 flex items-center gap-2">
            🔄 समानार्थी <span className="text-text-muted font-normal">(Synonyms)</span>
          </h4>
          {word.synonyms && word.synonyms.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {word.synonyms.map((syn, i) => (
                <Badge key={i} color="#4CAF50" className="hindi-text">
                  {syn}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="hindi-text text-text-muted text-sm">कोई समानार्थी शब्द नहीं</p>
          )}
        </div>

        {/* Antonyms */}
        <div className="p-4 rounded-xl bg-error-400/5 border border-error-400/20">
          <h4 className="hindi-text text-sm font-semibold text-error-500 mb-3 flex items-center gap-2">
            ↔️ विलोम <span className="text-text-muted font-normal">(Antonyms)</span>
          </h4>
          {word.antonyms && word.antonyms.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {word.antonyms.map((ant, i) => (
                <Badge key={i} color="#F44336" className="hindi-text">
                  {ant}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="hindi-text text-text-muted text-sm flex items-center gap-1">
              ❌ इस शब्द का कोई सामान्य विलोम नहीं है
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
