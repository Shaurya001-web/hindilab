import React, { useState, useRef, useEffect } from 'react';

/**
 * Inline modal for completing daily synonym/antonym exercises.
 * Supports: synonym_mcq, antonym_mcq, matching, fill_blank, challenge
 */
export default function DailyTaskModal({ task, onComplete, onClose }) {
  const dialogRef = useRef(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  // Matching state
  const [matchSelected, setMatchSelected] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [shuffledRight, setShuffledRight] = useState([]);

  useEffect(() => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, []);

  // Initialize matching shuffle
  useEffect(() => {
    if (task.id === 'matching' && task.questions?.[0]?.pairs) {
      const rights = task.questions[0].pairs.map(p => p[1]);
      setShuffledRight([...rights].sort(() => Math.random() - 0.5));
    }
  }, [task]);

  const questions = task.questions || [];
  const totalQ = task.id === 'matching' 
    ? (questions[0]?.pairs?.length || 0) 
    : questions.length;

  const handleClose = () => {
    dialogRef.current?.close();
    onClose();
  };

  const handleSelect = (option) => {
    if (isCorrect !== null) return; // Already answered
    setSelected(option);

    let correct;
    if (task.id === 'challenge') {
      correct = questions[currentQ]?.answer === option;
    } else if (task.id === 'fill_blank') {
      correct = questions[currentQ]?.answer === option;
    } else {
      correct = questions[currentQ]?.answer === option;
    }

    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentQ + 1 >= questions.length) {
      setFinished(true);
      return;
    }
    setCurrentQ(q => q + 1);
    setSelected(null);
    setIsCorrect(null);
  };

  const handleFinish = () => {
    onComplete(task.id);
    handleClose();
  };

  // ── Matching logic ──
  const handleMatchLeft = (leftWord) => {
    setMatchSelected(leftWord);
  };

  const handleMatchRight = (rightWord) => {
    if (!matchSelected) return;
    const pairs = questions[0]?.pairs || [];
    const isMatch = pairs.some(p => p[0] === matchSelected && p[1] === rightWord);
    if (isMatch) {
      setMatchedPairs(prev => [...prev, { left: matchSelected, right: rightWord }]);
      setScore(s => s + 1);
    }
    setMatchSelected(null);

    // Check if all matched
    if (matchedPairs.length + (isMatch ? 1 : 0) >= pairs.length) {
      setTimeout(() => setFinished(true), 500);
    }
  };

  // ── Render question content ──
  const renderQuestion = () => {
    if (task.id === 'matching') {
      return renderMatching();
    }

    const q = questions[currentQ];
    if (!q) return null;

    let questionText = '';
    if (task.id === 'synonym_mcq') {
      questionText = `"${q.word}" का समानार्थी शब्द कौन-सा है?`;
    } else if (task.id === 'antonym_mcq') {
      questionText = `"${q.word}" का विलोम शब्द क्या है?`;
    } else if (task.id === 'fill_blank') {
      questionText = q.sentence;
    } else if (task.id === 'challenge') {
      questionText = q.question;
    }

    const options = q.options ? [...q.options].sort(() => Math.random() - 0.5) : [];
    // Use a stable sort based on question to avoid re-shuffling on re-render
    const stableOptions = q.options || [];

    return (
      <>
        {/* Question */}
        <div className="text-center mb-5">
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
            Question {currentQ + 1} of {questions.length}
          </span>
          <h3 className="text-lg font-bold text-gray-800 mt-2 hindi-text leading-relaxed">
            {questionText}
          </h3>
          {task.id === 'fill_blank' && q.hint && (
            <p className="text-xs text-[#FF6B35] mt-1 hindi-text">💡 संकेत: {q.hint}</p>
          )}
        </div>

        {/* Options */}
        <div className="space-y-2">
          {stableOptions.map((opt, i) => {
            const isSelected = selected === opt;
            const isAnswer = q.answer === opt;
            let btnClass = 'bg-gray-50 hover:bg-[#FFF8F0] border-gray-200 text-gray-800';
            
            if (isCorrect !== null) {
              if (isAnswer) {
                btnClass = 'bg-green-50 border-green-400 text-green-800';
              } else if (isSelected && !isCorrect) {
                btnClass = 'bg-red-50 border-red-400 text-red-700';
              } else {
                btnClass = 'bg-gray-50 border-gray-200 text-gray-400';
              }
            } else if (isSelected) {
              btnClass = 'bg-[#FFF3E0] border-[#FF6B35] text-[#FF6B35]';
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(opt)}
                disabled={isCorrect !== null}
                className={`w-full px-4 py-3 rounded-xl border-2 text-left font-semibold text-sm hindi-text transition-all duration-200 ${btnClass}`}
              >
                <span className="mr-2 text-xs text-gray-400 font-bold">
                  {String.fromCharCode(65 + i)}.
                </span>
                {opt}
                {isCorrect !== null && isAnswer && (
                  <span className="float-right text-green-500">✓</span>
                )}
                {isCorrect !== null && isSelected && !isCorrect && (
                  <span className="float-right text-red-500">✗</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback + Next */}
        {isCorrect !== null && (
          <div className="mt-4 flex items-center justify-between">
            <span className={`text-sm font-bold ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
              {isCorrect ? '🎉 सही जवाब!' : `❌ सही जवाब: ${q.answer}`}
            </span>
            <button
              onClick={handleNext}
              className="px-5 py-2 bg-[#FF6B35] text-white font-bold rounded-full text-sm hover:bg-[#F25A24] transition-colors shadow-sm"
            >
              {currentQ + 1 >= questions.length ? 'Finish' : 'Next →'}
            </button>
          </div>
        )}
      </>
    );
  };

  const renderMatching = () => {
    const pairs = questions[0]?.pairs || [];
    const leftWords = pairs.map(p => p[0]);
    const matchedLeftWords = matchedPairs.map(m => m.left);
    const matchedRightWords = matchedPairs.map(m => m.right);

    return (
      <>
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold text-gray-800 hindi-text">
            {questions[0]?.type === 'synonym' ? 'समानार्थी शब्द जोड़ी मिलाइए' : 'विलोम शब्द जोड़ी मिलाइए'}
          </h3>
          <p className="text-xs text-gray-400 mt-1">बाएँ शब्द चुनें, फिर दाएँ से मिलाएँ</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Left column */}
          <div className="space-y-2">
            {leftWords.map((w, i) => {
              const isMatched = matchedLeftWords.includes(w);
              return (
                <button
                  key={i}
                  onClick={() => !isMatched && handleMatchLeft(w)}
                  disabled={isMatched}
                  className={`w-full px-3 py-2.5 rounded-xl border-2 text-sm font-semibold hindi-text transition-all
                    ${isMatched 
                      ? 'bg-green-50 border-green-300 text-green-700' 
                      : matchSelected === w 
                        ? 'bg-[#FFF3E0] border-[#FF6B35] text-[#FF6B35]'
                        : 'bg-gray-50 border-gray-200 text-gray-800 hover:bg-[#FFF8F0]'
                    }`}
                >
                  {isMatched && '✓ '}{w}
                </button>
              );
            })}
          </div>

          {/* Right column */}
          <div className="space-y-2">
            {shuffledRight.map((w, i) => {
              const isMatched = matchedRightWords.includes(w);
              return (
                <button
                  key={i}
                  onClick={() => !isMatched && handleMatchRight(w)}
                  disabled={isMatched || !matchSelected}
                  className={`w-full px-3 py-2.5 rounded-xl border-2 text-sm font-semibold hindi-text transition-all
                    ${isMatched 
                      ? 'bg-green-50 border-green-300 text-green-700' 
                      : matchSelected 
                        ? 'bg-gray-50 border-gray-200 text-gray-800 hover:bg-[#FFF8F0] cursor-pointer'
                        : 'bg-gray-50 border-gray-200 text-gray-500 cursor-default'
                    }`}
                >
                  {isMatched && '✓ '}{w}
                </button>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  const renderFinished = () => (
    <div className="text-center py-4">
      <div className="text-4xl mb-3">
        {score >= totalQ ? '🌟' : score >= totalQ * 0.6 ? '👏' : '💪'}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-1">
        {score >= totalQ ? 'Perfect!' : score >= totalQ * 0.6 ? 'Well Done!' : 'Keep Practicing!'}
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        {score} / {totalQ} correct
      </p>
      
      {/* Score bar */}
      <div className="w-48 mx-auto h-2 bg-gray-100 rounded-full overflow-hidden mb-5">
        <div 
          className="h-full rounded-full transition-all duration-700"
          style={{ 
            width: `${(score / Math.max(totalQ, 1)) * 100}%`,
            background: score >= totalQ 
              ? 'linear-gradient(90deg, #4CAF50, #66BB6A)' 
              : 'linear-gradient(90deg, #FF6B35, #FFB74D)'
          }}
        />
      </div>

      <button
        onClick={handleFinish}
        className="px-6 py-2.5 bg-[#FF6B35] text-white font-bold rounded-full text-sm hover:bg-[#F25A24] transition-colors shadow-md"
      >
        ✓ Mark Complete
      </button>
    </div>
  );

  return (
    <dialog 
      ref={dialogRef}
      className="fixed inset-0 z-[200] m-auto w-[90vw] max-w-md bg-white rounded-2xl shadow-2xl p-0 backdrop:bg-black/40 backdrop:backdrop-blur-sm"
      onClose={handleClose}
    >
      <div className="p-5">
        {/* Modal header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">{task.icon}</span>
            <h2 className="font-bold text-sm text-gray-800 hindi-text">{task.label}</h2>
          </div>
          <button
            onClick={handleClose}
            className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-sm hover:bg-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        {finished ? renderFinished() : renderQuestion()}
      </div>
    </dialog>
  );
}
