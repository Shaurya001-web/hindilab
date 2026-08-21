import { useReadingPractice } from '../../hooks/useReadingPractice';
import { RECORDING_STATES } from '../../utils/constants';
import { PASSAGE_CATEGORIES, READING_DIFFICULTY } from '../../data/passages';
import WaveformVisualizer from '../ui/WaveformVisualizer';
import LoadingSpinner from '../ui/LoadingSpinner';
import ReadingScoreDisplay from './ReadingScoreDisplay';
import Button from '../ui/Button';

/**
 * Core reading practice trainer.
 * Displays a passage, provides reference audio, recording UI,
 * assessment results with word-level feedback, and retry controls.
 */
export default function ReadingTrainer({ passage, onNewPassage }) {
  const {
    state,
    scoreResult,
    attempts,
    analyserData,
    isRecording,
    error,
    isPlayingReference,
    startRecording,
    stopAndAnalyze,
    playReference,
    stopAudio,
    reset,
    resetFull,
  } = useReadingPractice();

  const category = PASSAGE_CATEGORIES[passage.category] || {};
  const difficulty = READING_DIFFICULTY[passage.difficulty] || {};

  const handleNewPassage = () => {
    resetFull();
    onNewPassage?.();
  };

  return (
    <div className="card-static overflow-hidden">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-border/50 bg-gradient-to-r from-primary-50/50 to-transparent">
        <div className="flex items-start justify-between gap-3 mb-1">
          <h2 className="text-lg sm:text-xl font-bold text-text-primary flex items-center gap-2">
            📖 Practice Reading
          </h2>
          <span
            className="shrink-0 px-2.5 py-1 rounded-full text-[11px] font-bold text-white hindi-text"
            style={{ backgroundColor: difficulty.color }}
          >
            {difficulty.emoji} {difficulty.label}
          </span>
        </div>
        <p className="text-sm text-text-muted">
          Read this passage aloud.
        </p>
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6">
        {/* Error */}
        {error && (
          <div className="mb-5 p-4 rounded-xl bg-error-400/10 border border-error-400/20 text-error-500 text-sm hindi-text flex items-start gap-2">
            <span className="shrink-0">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Passage text */}
        <div className="mb-6 p-5 sm:p-6 rounded-xl border-2 border-primary-100 bg-primary-50/30">
          <div className="flex items-center gap-2 mb-3 text-xs text-text-muted">
            <span>{category.emoji}</span>
            <span className="hindi-text">{passage.title}</span>
          </div>
          <p className="hindi-text text-lg sm:text-xl leading-loose text-text-primary font-medium">
            {passage.text}
          </p>
        </div>

        {/* Reference audio */}
        <div className="mb-6">
          <button
            onClick={() => isPlayingReference ? stopAudio() : playReference(passage.text)}
            className="w-full sm:w-auto inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border-2 border-primary-200 text-primary-600 font-semibold text-sm hover:border-primary-400 hover:bg-primary-50 transition-all duration-200 cursor-pointer"
          >
            <span className="text-lg">{isPlayingReference ? '⏹' : '🔊'}</span>
            <span>{isPlayingReference ? 'Stop' : 'Listen to correct pronunciation'}</span>
          </button>
        </div>

        {/* ===== IDLE STATE ===== */}
        {state === RECORDING_STATES.IDLE && (
          <div className="flex flex-col items-center gap-5 py-4">
            <p className="text-text-secondary text-center text-sm">
              Press the microphone to start recording
            </p>

            {/* Big mic button */}
            <button
              onClick={startRecording}
              className="mic-button idle"
              title="Start recording"
              aria-label="Start recording"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </button>

            <p className="text-text-muted text-xs font-medium">
              🎤 Start Recording
            </p>
          </div>
        )}

        {/* ===== RECORDING STATE ===== */}
        {state === RECORDING_STATES.RECORDING && (
          <div className="flex flex-col items-center gap-5 py-4">
            <div className="flex items-center gap-2 text-error-500">
              <span className="w-3 h-3 rounded-full bg-error-500 animate-pulse" />
              <span className="font-medium text-lg">Recording...</span>
            </div>

            <WaveformVisualizer analyserData={analyserData} isActive={isRecording} />

            {/* Stop button */}
            <button
              onClick={() => stopAndAnalyze(passage.text)}
              className="mic-button recording"
              title="Stop recording"
              aria-label="Stop recording"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
            </button>

            <p className="text-text-muted text-xs font-medium">⏹ Stop Recording</p>
          </div>
        )}

        {/* ===== ANALYZING STATE ===== */}
        {state === RECORDING_STATES.ANALYZING && (
          <div className="py-8">
            <LoadingSpinner text="Analyzing your voice..." size="lg" />
          </div>
        )}

        {/* ===== RESULT STATE ===== */}
        {state === RECORDING_STATES.RESULT && scoreResult && (
          <div className="flex flex-col items-center gap-6 py-4">
            {/* Attempt history */}
            {attempts.length > 1 && (
              <div className="w-full max-w-sm">
                <p className="text-xs text-text-muted mb-2 text-center font-medium">Attempts</p>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {attempts.map((a, i) => (
                    <div
                      key={i}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                        i === attempts.length - 1
                          ? 'gradient-primary text-white shadow-sm'
                          : 'bg-primary-50 text-primary-600 border border-primary-200'
                      }`}
                    >
                      {i + 1}. {a.score}%
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Score display */}
            <ReadingScoreDisplay
              score={scoreResult.finalScore}
              accuracy={scoreResult.accuracy}
              fluency={scoreResult.fluency}
              completeness={scoreResult.completeness}
              transcript={scoreResult.transcript}
              wordResults={scoreResult.wordResults}
              readingSpeed={scoreResult.readingSpeed}
              tutorFeedbackText={scoreResult.tutorFeedbackText}
              tutorFeedbackAudio={scoreResult.tutorFeedbackAudio}
            />

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 mt-4">
              <button
                onClick={() => isPlayingReference ? stopAudio() : playReference(passage.text)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white border-2 border-primary-200 text-primary-600 font-semibold text-sm hover:border-primary-400 hover:bg-primary-50 transition-all duration-200 cursor-pointer"
              >
                <span>🔊</span>
                <span>Listen to passage</span>
              </button>

              <Button variant="primary" icon="🎤" onClick={reset} className="w-full sm:w-auto">
                <span>Try Again</span>
              </Button>

              <Button variant="secondary" icon="🔄" onClick={handleNewPassage} className="w-full sm:w-auto">
                <span>New Passage</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
