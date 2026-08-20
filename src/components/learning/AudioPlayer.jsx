import { useAudioPlayer } from '../../hooks/useAudioPlayer';

/**
 * Custom audio player for teacher pronunciation.
 * Falls back to browser speech synthesis if audio file is unavailable.
 */
export default function AudioPlayer({ src, word, label = 'शिक्षक का उच्चारण सुनें' }) {
  const { isPlaying, progress, play, pause, stop, speakHindi } = useAudioPlayer();

  const handlePlay = () => {
    if (isPlaying) {
      pause();
      return;
    }

    if (src) {
      play(src);
    } else {
      // Fallback to speech synthesis
      speakHindi(word);
    }
  };

  return (
    <div className="card-static p-4">
      <div className="flex items-center gap-4">
        {/* Play button */}
        <button
          onClick={handlePlay}
          className="w-12 h-12 rounded-full gradient-primary text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200 cursor-pointer border-0 text-xl shrink-0"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>

        <div className="flex-1 min-w-0">
          {/* Label */}
          <p className="hindi-text text-sm font-medium text-text-primary mb-2 flex items-center gap-2">
            🔊 {label}
          </p>

          {/* Progress bar */}
          <div className="w-full h-2 bg-primary-100 rounded-full overflow-hidden">
            <div
              className="h-full gradient-primary rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Repeat button */}
        <button
          onClick={() => {
            stop();
            setTimeout(() => {
              if (src) play(src);
              else speakHindi(word);
            }, 100);
          }}
          className="w-9 h-9 rounded-full border-2 border-primary-200 flex items-center justify-center hover:border-primary-400 hover:bg-primary-50 transition-all duration-200 cursor-pointer bg-transparent text-sm"
          title="Repeat"
        >
          🔁
        </button>
      </div>
    </div>
  );
}
