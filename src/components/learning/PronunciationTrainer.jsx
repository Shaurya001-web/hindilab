import { usePronunciation } from '../../hooks/usePronunciation';
import { RECORDING_STATES } from '../../utils/constants';
import WaveformVisualizer from '../ui/WaveformVisualizer';
import ScoreDisplay from './ScoreDisplay';
import LoadingSpinner from '../ui/LoadingSpinner';
import Button from '../ui/Button';

/**
 * Core pronunciation training component.
 * Flow: idle → recording → analyzing → result
 */
export default function PronunciationTrainer({ word }) {
  const {
    state,
    scoreResult,
    analyserData,
    isRecording,
    error,
    startPractice,
    stopAndAnalyze,
    reset,
  } = usePronunciation();

  return (
    <div className="card-static p-6 sm:p-8">
      <h3 className="hindi-text text-lg font-semibold text-text-primary mb-6 flex items-center gap-2">
        🎤 उच्चारण अभ्यास
        <span className="text-text-muted text-sm font-normal">(Pronunciation Practice)</span>
      </h3>

      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 rounded-xl bg-error-400/10 border border-error-400/20 text-error-500 text-sm hindi-text">
          ⚠️ {error}
        </div>
      )}

      {/* IDLE STATE */}
      {state === RECORDING_STATES.IDLE && (
        <div className="flex flex-col items-center gap-6 py-4">
          <p className="hindi-text text-text-secondary text-center">
            नीचे बटन दबाकर <strong className="text-primary-500">"{word.word}"</strong> बोलें
          </p>
          <p className="text-text-muted text-sm text-center">
            Press the mic button and say <strong>"{word.english}"</strong> in Hindi
          </p>

          {/* Big mic button */}
          <button
            onClick={startPractice}
            className="mic-button idle"
            title="Start recording"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </button>

          <p className="hindi-text text-text-muted text-xs">रिकॉर्ड करने के लिए टैप करें</p>
        </div>
      )}

      {/* RECORDING STATE */}
      {state === RECORDING_STATES.RECORDING && (
        <div className="flex flex-col items-center gap-6 py-4">
          <div className="flex items-center gap-2 text-error-500">
            <span className="w-3 h-3 rounded-full bg-error-500 animate-pulse" />
            <span className="hindi-text font-medium">सुन रहा हूँ...</span>
            <span className="text-text-muted text-sm">(Listening...)</span>
          </div>

          {/* Waveform */}
          <WaveformVisualizer analyserData={analyserData} isActive={isRecording} />

          {/* Stop button */}
          <button
            onClick={() => stopAndAnalyze(word.word)}
            className="mic-button recording"
            title="Stop recording"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
          </button>

          <p className="hindi-text text-text-muted text-xs">रोकने के लिए टैप करें</p>
        </div>
      )}

      {/* ANALYZING STATE */}
      {state === RECORDING_STATES.ANALYZING && (
        <div className="py-8">
          <LoadingSpinner text="विश्लेषण हो रहा है..." size="lg" />
          <p className="text-text-muted text-sm text-center mt-2">Analyzing your pronunciation...</p>
        </div>
      )}

      {/* RESULT STATE */}
      {state === RECORDING_STATES.RESULT && scoreResult && (
        <div className="flex flex-col items-center gap-6 py-4">
          <ScoreDisplay
            score={scoreResult.finalScore}
            accuracy={scoreResult.accuracy}
            fluency={scoreResult.fluency}
            completeness={scoreResult.completeness}
            transcript={scoreResult.transcript}
          />

          {/* Action buttons */}
          <div className="flex items-center gap-3 mt-4">
            <Button variant="primary" icon="🔄" onClick={reset}>
              <span className="hindi-text">फिर से करें</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
