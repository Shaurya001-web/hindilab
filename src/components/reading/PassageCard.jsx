import { PASSAGE_CATEGORIES, READING_DIFFICULTY } from '../../data/passages';

/**
 * Card for selecting a passage from the library.
 * Shows title, category, difficulty badge, text preview, and reading time.
 */
export default function PassageCard({ passage, isActive, onClick }) {
  const category = PASSAGE_CATEGORIES[passage.category] || {};
  const difficulty = READING_DIFFICULTY[passage.difficulty] || {};

  return (
    <button
      onClick={() => onClick(passage)}
      className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer bg-white hover:shadow-md hover:scale-[1.01] ${
        isActive
          ? 'border-primary-400 shadow-md bg-primary-50/30'
          : 'border-border hover:border-primary-200'
      }`}
    >
      {/* Top row: title + badges */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="hindi-text text-base font-bold text-text-primary leading-tight">
          {category.emoji} {passage.title}
        </h4>
        <span
          className="shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white"
          style={{ backgroundColor: difficulty.color }}
        >
          {difficulty.label}
        </span>
      </div>

      {/* Text preview */}
      <p className="hindi-text text-sm text-text-secondary leading-relaxed line-clamp-2 mb-3">
        {passage.text}
      </p>

      {/* Meta row */}
      <div className="flex items-center gap-3 text-[11px] text-text-muted">
        <span className="flex items-center gap-1">
          📂 <span className="hindi-text">{category.label}</span>
        </span>
        <span className="w-1 h-1 rounded-full bg-border" />
        <span className="flex items-center gap-1">
          ⏱ ~{passage.estimated_reading_time}s
        </span>
      </div>
    </button>
  );
}
