import { Link } from 'react-router-dom';
import { getPassageOfTheDay, READING_DIFFICULTY, PASSAGE_CATEGORIES } from '../../data/passages';
import WidgetCard from './WidgetCard';

/**
 * Reading Practice widget for the Interactive Demos section on the home page.
 * Shows "Passage of the Day" preview with a link to the full reading page.
 */
export default function ReadingPracticeWidget() {
  const { passage, dayNumber } = getPassageOfTheDay();
  const difficulty = READING_DIFFICULTY[passage.difficulty] || {};
  const category = PASSAGE_CATEGORIES[passage.category] || {};

  return (
    <WidgetCard
      icon="📖"
      title="पढ़कर सुनाएँ"
      category="Reading Practice"
      level={`Day ${dayNumber}`}
    >
      {/* Daily badge */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-lg">📅</span>
        <span className="hindi-text text-xs font-bold text-primary-600">आज का अभ्यास</span>
        <span
          className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
          style={{ backgroundColor: difficulty.color }}
        >
          {difficulty.label}
        </span>
      </div>

      {/* Passage text */}
      <div className="flex-1 border-l-4 border-primary-100 pl-4 py-1 mb-5">
        <p className="hindi-text text-[15px] leading-relaxed text-text-primary font-medium">
          {passage.text}
        </p>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-2 text-[11px] text-text-muted mb-4">
        <span>{category.emoji}</span>
        <span className="hindi-text">{category.label}</span>
        <span className="w-1 h-1 rounded-full bg-border" />
        <span>~{passage.estimated_reading_time}s</span>
      </div>

      {/* CTA */}
      <Link
        to="/reading"
        className="w-full py-3 rounded-lg gradient-primary text-white font-semibold text-sm flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-sm no-underline"
      >
        <span className="text-lg">🎤</span>
        <span className="hindi-text">पढ़कर सुनाएँ</span>
      </Link>
    </WidgetCard>
  );
}
