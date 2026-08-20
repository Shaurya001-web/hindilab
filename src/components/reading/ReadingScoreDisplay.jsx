import ProgressRing from '../ui/ProgressRing';
import { getReadingFeedback } from '../../utils/scoreUtils';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import CountUp from '../ui/CountUp';

/**
 * Reading assessment score display.
 * Shows overall score, child-friendly feedback, component breakdown,
 * word-level results, and reading speed.
 */
export default function ReadingScoreDisplay({
  score,
  accuracy,
  fluency,
  completeness,
  transcript,
  wordResults = [],
  readingSpeed,
  tutorFeedbackText,
  tutorFeedbackAudio,
}) {
  const { playAudio, isPlaying } = useAudioPlayer();
  const feedback = getReadingFeedback(score);
  const mispronounced = wordResults.filter((w) => w.status === 'mispronounced');
  const missing = wordResults.filter((w) => w.status === 'missing');
  const needsPractice = [...mispronounced, ...missing];

  return (
    <div className="flex flex-col items-center gap-5 animate-[bounce-in_0.6s_cubic-bezier(0.68,-0.55,0.265,1.55)] w-full">
      {/* Transcript — what the student said */}
      {transcript && (
        <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 w-full text-center">
          <p className="text-xs text-primary-500 font-bold tracking-wider mb-2 uppercase">
            You said
          </p>
          <p className="hindi-text text-base text-primary-900 font-medium leading-relaxed">
            {transcript}
          </p>
        </div>
      )}

      {/* AI Tutor Feedback */}
      {tutorFeedbackText && (
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-xl p-5 w-full text-left relative overflow-hidden shadow-sm">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary-400 to-secondary-400" />
          <div className="flex items-start gap-4">
            <div className="text-3xl shrink-0 mt-1">🤖</div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-primary-600 font-bold tracking-wider uppercase">
                  AI Tutor Feedback
                </p>
                {tutorFeedbackAudio && (
                  <button 
                    onClick={() => playAudio(tutorFeedbackAudio)}
                    className="w-8 h-8 rounded-full bg-white border border-primary-200 flex items-center justify-center text-sm hover:bg-primary-50 transition-colors"
                    title="Replay Feedback"
                  >
                    🔊
                  </button>
                )}
              </div>
              <p className="hindi-text text-lg text-text-primary font-medium leading-relaxed">
                {tutorFeedbackText}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main score ring */}
      <div className="py-2">
        <ProgressRing score={score} size={160} strokeWidth={12} color={feedback.color} />
      </div>

      {/* Emoji and feedback message */}
      <div className="text-center">
        <div className="text-4xl mb-2">{feedback.emoji}</div>
        <h3 className="hindi-text text-xl font-bold" style={{ color: feedback.color }}>
          {feedback.message}
        </h3>
        <p className="text-text-muted text-sm mt-1">{feedback.messageEnglish}</p>
      </div>

      {/* Component scores */}
      {(accuracy !== undefined || fluency !== undefined || completeness !== undefined) && (
        <div className="w-full max-w-sm grid grid-cols-3 gap-3 mt-2">
          <ScoreItem label="सटीकता" labelEn="Accuracy" value={accuracy} color="#4CAF50" />
          <ScoreItem label="प्रवाह" labelEn="Fluency" value={fluency} color="#2196F3" />
          <ScoreItem label="पूर्णता" labelEn="Completeness" value={completeness} color="#FF9800" />
        </div>
      )}

      {/* Reading speed */}
      {readingSpeed && readingSpeed > 0 && (
        <div className="w-full max-w-sm text-center p-3 rounded-xl bg-white border border-border">
          <div className="text-text-muted text-xs mb-1 font-medium">Reading Speed</div>
          <div className="font-bold text-lg text-primary-500">{readingSpeed} <span className="text-sm font-normal text-text-muted">words/min</span></div>
        </div>
      )}

      {/* Word-level feedback — words needing practice */}
      {needsPractice.length > 0 && (
        <div className="w-full max-w-sm mt-2">
          <div className="p-4 rounded-xl bg-warning-400/10 border border-warning-400/20">
            <h4 className="text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
              ⚠️ Words to practice
            </h4>
            <p className="text-xs text-text-muted mb-4 font-medium">
              Click a word to hear its correct pronunciation.
            </p>
            <div className="flex flex-col gap-3">
              {needsPractice.map((w, i) => (
                <button
                  key={i}
                  onClick={() => playAudio(null, w.word)}
                  className={`hindi-text text-left w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl text-sm transition-transform hover:scale-[1.02] cursor-pointer border-0 ${
                    w.status === 'missing'
                      ? 'bg-error-400/15 text-error-600 shadow-sm'
                      : 'bg-warning-400/20 text-warning-700 shadow-sm'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-base flex items-center gap-2">
                      <span>{w.status === 'missing' ? '✗' : '~'}</span>
                      <span>{w.word}</span>
                    </span>
                    {w.status === 'mispronounced' && w.heard && (
                      <span className="text-xs opacity-80 mt-1 font-medium">
                        You said: <strong className="text-error-600 hindi-text font-normal">{w.heard}</strong>
                      </span>
                    )}
                    {w.status === 'missing' && (
                      <span className="text-xs opacity-80 mt-1 font-medium">
                        Missed word
                      </span>
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.05)] text-lg hover:bg-white transition-colors">
                    🔊
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ScoreItem({ label, labelEn, value, color }) {
  return (
    <div className="text-center p-3 rounded-xl bg-white border border-border">
      <div className="font-bold text-lg" style={{ color }}>
        {value !== undefined ? (
          <CountUp from={0} to={value} duration={1.5} />
        ) : (
          '—'
        )}
      </div>
      <div className="hindi-text text-xs text-text-secondary mt-1">{label}</div>
      <div className="text-[10px] text-text-muted">{labelEn}</div>
    </div>
  );
}
