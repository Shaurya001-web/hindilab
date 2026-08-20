import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import WidgetCard from './WidgetCard';

export default function PictureDescriptionWidget() {
  const { playAudio, isPlaying, currentWord } = useAudioPlayer();

  const sentences = [
    "यह एक साफ़-सुथरे भोजनालय का दृश्य है।",
    "बर्तन साफ़ करने का चिह्न दिखाई दे रहा है।",
    "यह भोजनालय में स्वच्छता का नियम बताता है।"
  ];

  return (
    <WidgetCard
      icon="ह"
      title="Picture Description"
      category="Restaurant"
      level="Achiever (P5–P6)"
    >
      {/* Image (Using a placeholder colored box matching the screenshot vibe) */}
      <div className="w-full h-40 bg-[#f5f5f5] border border-border rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
        <div className="text-[64px] absolute">🍽️</div>
        <div className="absolute top-2 right-2 text-xs text-text-muted bg-white/80 px-2 py-0.5 rounded-full">
          Part 1 / 7
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="hindi-text font-bold text-lg text-text-primary">यह कहाँ का चित्र है?</h4>
        <button 
          onClick={() => playAudio(null, "यह कहाँ का चित्र है?")}
          className="w-8 h-8 rounded-full border border-primary-200 text-primary-500 flex items-center justify-center hover:bg-primary-50 transition-colors cursor-pointer bg-transparent"
        >
          {isPlaying && currentWord === "यह कहाँ का चित्र है?" ? '🔊' : '🔈'}
        </button>
      </div>

      {/* Sentences list */}
      <div className="bg-primary-50/50 rounded-lg p-3 -mx-2">
        <div className="flex justify-between items-center mb-3 px-2 text-xs text-primary-600/70 font-medium">
          <span>Tap a sentence to hear it</span>
          <span>🔈</span>
        </div>
        
        <div className="flex flex-col gap-1">
          {sentences.map((sentence, idx) => {
            const isActive = isPlaying && currentWord === sentence;
            return (
              <button
                key={idx}
                onClick={() => playAudio(null, sentence)}
                className={`text-left px-2 py-2 rounded-md transition-colors cursor-pointer border-0 ${
                  isActive 
                    ? 'bg-primary-100 text-primary-800' 
                    : 'bg-transparent text-text-primary hover:bg-primary-100/50'
                }`}
              >
                <p className="hindi-text text-[15px] leading-snug">{sentence}</p>
              </button>
            );
          })}
        </div>
      </div>
    </WidgetCard>
  );
}
