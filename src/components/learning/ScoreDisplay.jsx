import ProgressRing from '../ui/ProgressRing';
import { getFeedback } from '../../utils/scoreUtils';

/**
 * Score display with animated ring, number, and Hindi feedback.
 */
export default function ScoreDisplay({ score, accuracy, fluency, completeness, transcript }) {
  const feedback = getFeedback(score);

  return (
    <div className="flex flex-col items-center gap-5 animate-[bounce-in_0.6s_cubic-bezier(0.68,-0.55,0.265,1.55)]">
      {/* Transcript Display */}
      {transcript && (
        <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 w-full text-center">
          <p className="text-xs text-primary-500 font-bold tracking-wider mb-2 uppercase">You said</p>
          <p className="hindi-text text-lg text-primary-900 font-medium">{transcript}</p>
        </div>
      )}
      {/* Main score ring */}
      <ProgressRing score={score} size={160} strokeWidth={12} color={feedback.color} />

      {/* Emoji and message */}
      <div className="text-center">
        <div className="text-4xl mb-2">{feedback.emoji}</div>
        <h3 className="hindi-text text-xl font-bold" style={{ color: feedback.color }}>
          {feedback.message}
        </h3>
        <p className="text-text-muted text-sm mt-1">{feedback.messageEnglish}</p>
      </div>

      {/* Detailed breakdown */}
      {(accuracy !== undefined || fluency !== undefined || completeness !== undefined) && (
        <div className="w-full max-w-xs grid grid-cols-3 gap-3 mt-2">
          <ScoreItem label="सटीकता" labelEn="Accuracy" value={accuracy} color="#4CAF50" />
          <ScoreItem label="प्रवाह" labelEn="Fluency" value={fluency} color="#2196F3" />
          <ScoreItem label="पूर्णता" labelEn="Completeness" value={completeness} color="#FF9800" />
        </div>
      )}
    </div>
  );
}

function ScoreItem({ label, labelEn, value, color }) {
  return (
    <div className="text-center p-3 rounded-xl bg-white border border-border">
      <div className="font-bold text-lg" style={{ color }}>
        {value ?? '—'}
      </div>
      <div className="hindi-text text-xs text-text-secondary mt-1">{label}</div>
      <div className="text-[10px] text-text-muted">{labelEn}</div>
    </div>
  );
}
