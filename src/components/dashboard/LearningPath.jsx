import React from 'react';
import { Link } from 'react-router-dom';
import { LEARNING_MODULES } from '../../data/dailyTasks';

/**
 * Compact vertical learning pathway with connected cards.
 * States: completed, current, locked.
 */
export default function LearningPath({ moduleProgress = {} }) {
  // Determine state for each module
  const getState = (index) => {
    const mod = LEARNING_MODULES[index];
    if (moduleProgress[mod.id] === 'completed') return 'completed';
    
    // First incomplete module is "current"
    const firstIncomplete = LEARNING_MODULES.findIndex(
      m => moduleProgress[m.id] !== 'completed'
    );
    if (index === firstIncomplete) return 'current';
    if (index < firstIncomplete) return 'completed';
    return 'locked';
  };

  return (
    <div className="relative">
      {LEARNING_MODULES.map((mod, i) => {
        const state = getState(i);
        const isLast = i === LEARNING_MODULES.length - 1;

        return (
          <div key={mod.id} className="relative">
            {/* Connector line */}
            {!isLast && (
              <div className="absolute left-[27px] top-[68px] w-[2px] h-[28px] z-0"
                style={{ 
                  background: state === 'completed' || state === 'current' 
                    ? 'linear-gradient(to bottom, #FF6B35, #FFB74D)' 
                    : '#E5E7EB' 
                }}
              />
            )}

            {/* Card */}
            <Link
              to={state !== 'locked' ? mod.href : '#'}
              className={`relative z-10 flex items-center gap-4 p-4 rounded-2xl mb-3 transition-all duration-300 no-underline group
                ${state === 'current' 
                  ? 'bg-white border-2 border-[#FF6B35] shadow-[0_4px_20px_rgba(255,107,53,0.15)] hover:shadow-[0_6px_28px_rgba(255,107,53,0.22)]' 
                  : state === 'completed'
                    ? 'bg-white border border-green-200 hover:border-green-300 shadow-sm hover:shadow-md'
                    : 'bg-gray-50 border border-gray-200 opacity-60 cursor-not-allowed'
                }`}
              onClick={e => state === 'locked' && e.preventDefault()}
            >
              {/* Step number circle */}
              <div className={`w-[54px] h-[54px] rounded-xl flex items-center justify-center text-2xl shrink-0 transition-transform duration-300
                ${state === 'current' 
                  ? 'bg-gradient-to-br from-[#FF6B35] to-[#FF8E53] shadow-md group-hover:scale-105' 
                  : state === 'completed'
                    ? 'bg-green-50'
                    : 'bg-gray-100'
                }`}>
                {state === 'completed' ? (
                  <span className="text-green-500 text-xl">✓</span>
                ) : state === 'locked' ? (
                  <span className="text-gray-400 text-lg">🔒</span>
                ) : (
                  <span>{mod.icon}</span>
                )}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full
                    ${state === 'current' 
                      ? 'bg-[#FFF3E0] text-[#FF6B35]' 
                      : state === 'completed'
                        ? 'bg-green-50 text-green-600'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                    {state === 'current' ? '● CURRENT' : state === 'completed' ? '✓ Done' : 'Locked'}
                  </span>
                </div>
                <h3 className={`font-bold text-[15px] leading-tight mb-0.5
                  ${state === 'locked' ? 'text-gray-400' : 'text-gray-800'}`}>
                  {mod.label}
                </h3>
                <p className={`text-xs leading-snug
                  ${state === 'locked' ? 'text-gray-300' : 'text-gray-500'}`}>
                  {mod.description}
                </p>
              </div>

              {/* Arrow */}
              {state !== 'locked' && (
                <div className={`text-lg transition-transform duration-200 group-hover:translate-x-1
                  ${state === 'current' ? 'text-[#FF6B35]' : 'text-gray-400'}`}>
                  →
                </div>
              )}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
