import { useState } from 'react';
import WidgetCard from './WidgetCard';

export default function SynonymMatchWidget() {
  const [colA, setColA] = useState(null);
  const [colB, setColB] = useState(null);
  const [matches, setMatches] = useState([]);
  const [errorPair, setErrorPair] = useState(null);

  const pairs = {
    'कठिन': 'मुश्किल',
    'विनम्र': 'शिष्ट',
    'मेहनत': 'परिश्रम',
    'प्रगाढ़': 'गहरा'
  };

  const columnA = ['कठिन', 'विनम्र', 'मेहनत', 'प्रगाढ़'];
  const columnB = ['शिष्ट', 'गहरा', 'परिश्रम', 'मुश्किल'];

  const handleSelectA = (word) => {
    if (matches.includes(word)) return;
    setColA(colA === word ? null : word);
    setErrorPair(null);
  };

  const handleSelectB = (word) => {
    const isMatched = matches.some(m => pairs[m] === word);
    if (isMatched) return;
    
    setColB(colB === word ? null : word);
    setErrorPair(null);

    // If both are selected, check match
    if (colA) {
      if (pairs[colA] === word) {
        // Match!
        setMatches([...matches, colA]);
        setColA(null);
        setColB(null);
      } else {
        // Error
        setErrorPair({ a: colA, b: word });
        setTimeout(() => {
          setColA(null);
          setColB(null);
          setErrorPair(null);
        }, 800);
      }
    }
  };

  const isMatched = (wordA, wordB) => {
    if (wordA && matches.includes(wordA)) return true;
    if (wordB && matches.some(m => pairs[m] === wordB)) return true;
    return false;
  };

  return (
    <WidgetCard
      icon="ह"
      title="शब्द चुनौती"
      category="Synonym match"
      level="Achiever (P5–P6)"
    >
      <div className="flex flex-col h-full">
        <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold mb-4 mt-2">
          MATCH EACH PAIR
        </p>

        <div className="grid grid-cols-2 gap-4 flex-1">
          {/* Column A */}
          <div className="flex flex-col gap-3">
            <div className="text-[10px] text-text-muted font-bold text-center">COLUMN A</div>
            {columnA.map(word => {
              const matched = isMatched(word, null);
              const selected = colA === word;
              const error = errorPair?.a === word;
              
              let classes = "border-border text-text-secondary hover:border-primary-300";
              if (matched) classes = "border-success-500 text-success-600 bg-success-50 opacity-50 cursor-default";
              else if (error) classes = "border-error-500 text-error-600 bg-error-50 animate-shake";
              else if (selected) classes = "border-primary-500 text-primary-600 bg-primary-50 ring-2 ring-primary-100";

              return (
                <button
                  key={word}
                  onClick={() => handleSelectA(word)}
                  disabled={matched}
                  className={`py-2 rounded-full border-2 font-bold text-[15px] transition-all cursor-pointer ${classes}`}
                >
                  <span className="hindi-text">{word}</span>
                </button>
              );
            })}
          </div>

          {/* Column B */}
          <div className="flex flex-col gap-3">
            <div className="text-[10px] text-text-muted font-bold text-center">COLUMN B</div>
            {columnB.map(word => {
              const matched = isMatched(null, word);
              const selected = colB === word;
              const error = errorPair?.b === word;
              
              let classes = "border-border text-text-secondary hover:border-primary-300";
              if (matched) classes = "border-success-500 text-success-600 bg-success-50 opacity-50 cursor-default";
              else if (error) classes = "border-error-500 text-error-600 bg-error-50 animate-shake";
              else if (selected) classes = "border-primary-500 text-primary-600 bg-primary-50 ring-2 ring-primary-100";

              return (
                <button
                  key={word}
                  onClick={() => handleSelectB(word)}
                  disabled={matched}
                  className={`py-2 rounded-full border-2 font-bold text-[15px] transition-all cursor-pointer ${classes}`}
                >
                  <span className="hindi-text">{word}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Status Bar */}
        <div className={`mt-6 py-3 rounded-lg text-center text-sm font-bold transition-colors ${
          matches.length === 4 
            ? 'bg-success-500 text-white' 
            : 'border-2 border-primary-100 text-primary-400'
        }`}>
          {matches.length === 4 ? 'All Matched! 🎉' : 'Select a word from each column'}
        </div>
      </div>
    </WidgetCard>
  );
}
