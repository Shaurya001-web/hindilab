import { useState } from 'react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import WidgetCard from './WidgetCard';

export default function WordPowerWidget() {
  const { playAudio, isPlaying, currentWord } = useAudioPlayer();
  const [showAnswer, setShowAnswer] = useState(false);

  const word = "अनुकरणीय";
  const english = "Exemplary / Imitable";

  return (
    <WidgetCard
      icon="ह"
      title="शब्द शक्ति"
      category="Word meanings quiz"
      level="Achiever (P5–P6)"
    >
      <div className="flex justify-between items-center text-xs text-text-muted mb-4 font-medium">
        <span>Word 1 of 5</span>
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
          <span className="w-1.5 h-1.5 rounded-full bg-primary-200" />
          <span className="w-1.5 h-1.5 rounded-full bg-primary-200" />
          <span className="w-1.5 h-1.5 rounded-full bg-primary-200" />
          <span className="w-1.5 h-1.5 rounded-full bg-primary-200" />
        </div>
      </div>

      <div className="flex-1 bg-[#fffaf5] rounded-xl border border-primary-100 flex flex-col items-center justify-center p-6 relative overflow-hidden transition-colors hover:border-primary-300 cursor-pointer" onClick={() => setShowAnswer(!showAnswer)}>
        
        {/* Question State */}
        <div className={`flex flex-col items-center transition-all duration-300 absolute ${showAnswer ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
          <p className="text-[10px] font-bold text-text-muted tracking-wider mb-4">
            WHAT DOES THIS MEAN IN ENGLISH?
          </p>
          <h2 className="hindi-text text-4xl font-black text-text-primary mb-6">
            {word}
          </h2>
          <button
            onClick={(e) => {
              e.stopPropagation();
              playAudio(null, word);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary-200 text-primary-500 bg-white hover:bg-primary-50 transition-colors text-sm font-medium cursor-pointer"
          >
            {isPlaying && currentWord === word ? '🔊' : '🔈'} Hear word
          </button>
        </div>

        {/* Answer State */}
        <div className={`flex flex-col items-center transition-all duration-300 absolute ${!showAnswer ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'}`}>
          <p className="text-[10px] font-bold text-primary-500 tracking-wider mb-2">
            ENGLISH MEANING
          </p>
          <h2 className="text-2xl font-bold text-text-primary text-center mb-6">
            {english}
          </h2>
          <p className="text-xs text-text-muted text-center max-w-[200px]">
            Tap anywhere to view the next word.
          </p>
        </div>

      </div>
    </WidgetCard>
  );
}
