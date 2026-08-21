import React from 'react';

/**
 * Compact streak display card showing current and best streak.
 */
export default function StreakCard({ current = 0, best = 0, todayCompleted = false }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Streak</h3>
        {todayCompleted && (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-50 text-green-600">
            ✓ Today done
          </span>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Main streak number */}
        <div className="flex items-center gap-2">
          <span className="text-3xl">🔥</span>
          <div>
            <div className="text-3xl font-extrabold text-[#FF6B35] leading-none">{current}</div>
            <div className="text-xs text-gray-500 font-medium mt-0.5">
              {current === 1 ? 'day' : 'days'}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-10 bg-gray-200" />

        {/* Best streak */}
        <div className="text-center">
          <div className="text-lg font-bold text-gray-700 leading-none">{best}</div>
          <div className="text-[10px] text-gray-400 font-medium mt-0.5 uppercase tracking-wide">Best</div>
        </div>
      </div>

      {/* Motivational text */}
      {current > 0 && (
        <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
          {current >= 7 
            ? '🌟 Amazing! Keep this streak going!' 
            : current >= 3 
              ? '💪 Great consistency! Almost a week!'
              : '🚀 Good start! Practice daily to grow!'}
        </p>
      )}
      {current === 0 && (
        <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
          Complete all 5 daily tasks to start your streak!
        </p>
      )}
    </div>
  );
}
