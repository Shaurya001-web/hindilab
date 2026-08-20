import { useState, useEffect } from 'react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import WidgetCard from './WidgetCard';

export default function SpellingBuildWidget() {
  const { playAudio, isPlaying, currentWord } = useAudioPlayer();
  
  const targetEnglish = "indispensable";
  const targetHindi = "अपरिहार्य";
  const initialTiles = ['हा', 'र्य', 'अ', 'रि', 'प'];
  
  const [availableTiles, setAvailableTiles] = useState(initialTiles);
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [status, setStatus] = useState('idle'); // idle, correct, incorrect

  const handleSelectTile = (tile, index) => {
    if (status !== 'idle') return;
    
    const newAvailable = [...availableTiles];
    newAvailable.splice(index, 1);
    setAvailableTiles(newAvailable);
    
    const newSelected = [...selectedTiles, tile];
    setSelectedTiles(newSelected);
    
    // Check if finished
    if (newAvailable.length === 0) {
      const spelled = newSelected.join('');
      if (spelled === targetHindi) {
        setStatus('correct');
      } else {
        setStatus('incorrect');
      }
    }
  };

  const handleDeselectTile = (tile, index) => {
    if (status !== 'idle') return;
    
    const newSelected = [...selectedTiles];
    newSelected.splice(index, 1);
    setSelectedTiles(newSelected);
    
    setAvailableTiles([...availableTiles, tile]);
  };

  const reset = () => {
    setAvailableTiles(initialTiles);
    setSelectedTiles([]);
    setStatus('idle');
  };

  return (
    <WidgetCard
      icon="ह"
      title="शब्द चुनौती"
      category="Spelling build"
      level="Achiever (P5–P6)"
    >
      <div className="flex flex-col h-full">
        {/* Word Header */}
        <div className="flex justify-between items-center mb-6 mt-2">
          <h3 className="text-xl font-bold text-text-primary">{targetEnglish}</h3>
          <button 
            onClick={() => playAudio(null, targetHindi)}
            className="w-8 h-8 rounded-full border border-primary-200 text-primary-500 flex items-center justify-center hover:bg-primary-50 transition-colors cursor-pointer bg-transparent"
          >
            {isPlaying && currentWord === targetHindi ? '🔊' : '🔈'}
          </button>
        </div>

        <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold mb-3">
          TAP TILES TO SPELL IN HINDI
        </p>

        {/* Selected Area */}
        <div className="h-14 bg-primary-50 border-b-2 border-primary-200 mb-6 flex items-center px-2 gap-2 overflow-x-auto rounded-t-lg">
          {selectedTiles.map((tile, idx) => (
            <button
              key={`sel-${idx}`}
              onClick={() => handleDeselectTile(tile, idx)}
              className="w-10 h-10 shrink-0 bg-white border border-primary-200 rounded shadow-sm text-lg font-bold hindi-text text-primary-600 animate-[fade-in_0.2s_ease-out] cursor-pointer hover:bg-error-50 hover:border-error-200 hover:text-error-500"
            >
              {tile}
            </button>
          ))}
        </div>

        {/* Available Tiles */}
        <div className="flex flex-wrap gap-3 mb-6">
          {availableTiles.map((tile, idx) => (
            <button
              key={`avail-${idx}`}
              onClick={() => handleSelectTile(tile, idx)}
              className="w-[50px] h-[50px] bg-white border-2 border-border rounded-xl shadow-sm text-xl font-bold hindi-text text-text-primary hover:border-primary-400 hover:text-primary-500 transition-all cursor-pointer"
            >
              {tile}
            </button>
          ))}
        </div>

        {/* Status Banner */}
        {status === 'incorrect' && (
          <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg flex items-center gap-2 mb-6 text-sm font-bold animate-[slide-up_0.2s_ease-out]">
            <span className="text-lg">⊗</span> Correct: {targetHindi}
          </div>
        )}
        {status === 'correct' && (
          <div className="bg-success-50 border border-success-200 text-success-700 px-4 py-3 rounded-lg flex items-center gap-2 mb-6 text-sm font-bold animate-[slide-up_0.2s_ease-out]">
            <span className="text-lg">🎉</span> Perfect spelling!
          </div>
        )}

        {/* Action Button */}
        <div className="mt-auto">
          {status !== 'idle' ? (
            <button
              onClick={reset}
              className={`w-full py-3 rounded-lg font-bold text-sm text-white cursor-pointer transition-colors ${
                status === 'correct' ? 'bg-success-500 hover:bg-success-600' : 'bg-error-500 hover:bg-error-600'
              }`}
            >
              {status === 'correct' ? 'Next Word' : 'Try again'}
            </button>
          ) : (
            <div className="w-full py-3 border-2 border-transparent text-transparent text-sm">Spacer</div>
          )}
        </div>
      </div>
    </WidgetCard>
  );
}
