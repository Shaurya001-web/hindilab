import { usePronunciation } from '../../hooks/usePronunciation';
import { RECORDING_STATES } from '../../utils/constants';
import WidgetCard from './WidgetCard';
import WaveformVisualizer from '../ui/WaveformVisualizer';
import LoadingSpinner from '../ui/LoadingSpinner';
import ScoreDisplay from '../learning/ScoreDisplay';

export default function ReadingAloudWidget() {
  const {
    state,
    scoreResult,
    analyserData,
    isRecording,
    startPractice,
    stopAndAnalyze,
    reset,
  } = usePronunciation();

  const referenceText = "नींद कोई एक-सी अवस्था नहीं, बल्कि कई चक्रों में पूर्ण होती है";

  return (
    <WidgetCard
      icon="ह"
      title="Reading Aloud"
      category="Sleep"
      level="Achiever (P5–P6)"
    >
      {/* Dynamic Header/Button */}
      <div className="mb-6">
        {state === RECORDING_STATES.IDLE && (
          <button
            onClick={startPractice}
            className="w-full py-3 rounded-lg gradient-primary text-white font-semibold text-sm flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-sm border-0 cursor-pointer"
          >
            <span className="text-lg">🎤</span> Read Aloud - Get a Score
          </button>
        )}

        {state === RECORDING_STATES.RECORDING && (
          <button
            onClick={() => stopAndAnalyze(referenceText)}
            className="w-full py-3 rounded-lg bg-error-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm border-0 cursor-pointer animate-pulse"
          >
            <span className="w-2 h-2 rounded-full bg-white mr-1" /> Stop Recording
          </button>
        )}

        {state === RECORDING_STATES.ANALYZING && (
          <div className="w-full py-3 rounded-lg bg-primary-50 border border-primary-100 flex justify-center items-center">
            <LoadingSpinner text="Scoring..." size="sm" />
          </div>
        )}

        {state === RECORDING_STATES.RESULT && (
          <button
            onClick={reset}
            className="w-full py-3 rounded-lg bg-white border border-primary-200 text-primary-600 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary-50 transition-colors cursor-pointer"
          >
            <span>🔄</span> Try Again
          </button>
        )}
      </div>

      {/* Recording Visualizer */}
      {state === RECORDING_STATES.RECORDING && (
        <div className="mb-4 h-12 bg-surface rounded-lg overflow-hidden border border-border">
          <WaveformVisualizer analyserData={analyserData} isActive={isRecording} />
        </div>
      )}

      {/* Result Display */}
      {state === RECORDING_STATES.RESULT && scoreResult && (
        <div className="mb-6 scale-90 origin-top">
          <ScoreDisplay
            score={scoreResult.finalScore}
            accuracy={scoreResult.accuracy}
            fluency={scoreResult.fluency}
            completeness={scoreResult.completeness}
            transcript={scoreResult.transcript}
          />
        </div>
      )}

      {/* Text Content */}
      <div className="flex-1 border-l-4 border-primary-100 pl-4 py-1">
        <p className="hindi-text text-[15px] leading-relaxed text-text-primary mb-4 font-medium">
          हम समझते हैं कि नींद में हमारा मस्तिष्क विश्राम करता है, परंतु उस समय वह दिन की अपेक्षा कहीं अधिक सक्रिय रहता है।
        </p>
        <p className="hindi-text text-[15px] leading-relaxed text-text-primary mb-4 font-medium">
          एक मनुष्य अपने पूरे जीवन का लगभग एक तिहाई भाग, अर्थात् कई वर्ष, निद्रा में ही व्यतीत कर देता है।
        </p>
        <p className="hindi-text text-[15px] leading-relaxed text-text-primary font-medium">
          {referenceText}
        </p>
      </div>
    </WidgetCard>
  );
}
