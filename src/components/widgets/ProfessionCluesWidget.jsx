import { useState } from 'react';
import WidgetCard from './WidgetCard';

export default function ProfessionCluesWidget() {
  const [selected, setSelected] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const clues = [
    "मैं भोजनालय में मेज़ों पर खाना परोसता हूँ।",
    "मैं ग्राहकों के साथ विनम्रता से पेश आता हूँ।"
  ];

  const options = [
    { id: 'baira', label: 'बैरा' }, // Waiter (Correct)
    { id: 'rasoiya', label: 'रसोइया' }, // Chef
    { id: 'prabandhak', label: 'प्रबंधक' }, // Manager
    { id: 'atithi', label: 'अतिथि' } // Guest
  ];

  const handleSelect = (id) => {
    if (!isSubmitted) setSelected(id);
  };

  const handleSubmit = () => {
    if (selected) setIsSubmitted(true);
  };

  return (
    <WidgetCard
      icon="ह"
      title="शब्द चुनौती"
      category="Profession clues"
      level="Achiever (P5–P6)"
    >
      <div className="flex flex-col h-full">
        <h4 className="hindi-text text-xl font-bold text-center text-text-primary mb-1 mt-2">
          मैं कौन हूँ?
        </h4>
        <p className="text-[10px] text-text-muted text-center uppercase tracking-wider font-bold mb-6">
          Read the clues, then pick the profession
        </p>

        {/* Clues */}
        <div className="bg-[#fffaf5] border border-primary-100 rounded-xl p-4 mb-6 relative">
          <div className="absolute left-0 top-2 bottom-2 w-1 bg-primary-200 rounded-r" />
          <ul className="space-y-3 list-none pl-2 m-0">
            {clues.map((clue, idx) => (
              <li key={idx} className="hindi-text text-[14px] font-medium text-text-primary">
                {clue}
              </li>
            ))}
          </ul>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6 mt-auto">
          {options.map((opt) => {
            let stateClass = "border-border text-text-secondary hover:border-primary-300";
            
            if (selected === opt.id) {
              stateClass = "border-primary-500 text-primary-600 bg-primary-50";
            }
            if (isSubmitted) {
              if (opt.id === 'baira') {
                stateClass = "border-success-500 text-success-700 bg-success-50";
              } else if (selected === opt.id) {
                stateClass = "border-error-500 text-error-700 bg-error-50";
              } else {
                stateClass = "border-border/50 text-text-muted opacity-50";
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className={`py-3 rounded-lg border-2 font-bold transition-all cursor-pointer ${stateClass}`}
              >
                <span className="hindi-text">{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!selected || isSubmitted}
          className={`w-full py-3 rounded-lg font-bold text-sm transition-all ${
            isSubmitted
              ? selected === 'baira' ? 'bg-success-500 text-white' : 'bg-error-500 text-white'
              : selected
                ? 'gradient-primary text-white cursor-pointer hover:shadow-md'
                : 'bg-primary-100 text-primary-400 cursor-not-allowed'
          }`}
        >
          {isSubmitted 
            ? selected === 'baira' ? 'Correct!' : 'Try Again' 
            : 'Pick an answer'}
        </button>
      </div>
    </WidgetCard>
  );
}
