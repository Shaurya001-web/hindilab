import React from 'react';
import { isTaskCompleted } from '../../data/dailyTasks';

/**
 * Daily task panel showing 5 tasks for the selected date.
 */
export default function DailyTaskPanel({ dateStr, tasks, onTaskClick, completedIds = [] }) {
  const today = new Date().toISOString().split('T')[0];
  const isToday = dateStr === today;
  const isFuture = dateStr > today;

  const completedCount = completedIds.length;
  const totalTasks = tasks.length;
  const allDone = completedCount >= totalTasks;

  // Format display date
  const displayDate = (() => {
    if (isToday) return "Today's Tasks";
    const d = new Date(dateStr + 'T00:00:00');
    const day = d.getDate();
    const month = d.toLocaleDateString('en-US', { month: 'short' });
    return `${day} ${month} Tasks`;
  })();

  return (
    <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm text-gray-800">📅 {displayDate}</h3>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full
          ${allDone 
            ? 'bg-green-50 text-green-600' 
            : 'bg-[#FFF3E0] text-[#FF6B35]'
          }`}>
          {completedCount}/{totalTasks}
        </span>
      </div>

      {isFuture ? (
        <div className="text-center py-6">
          <span className="text-2xl mb-2 block">🔒</span>
          <p className="text-sm text-gray-400 font-medium">Tasks not available yet</p>
        </div>
      ) : (
        <>
          {/* Task list */}
          <div className="space-y-1.5">
            {tasks.map((task, i) => {
              const done = completedIds.includes(task.id);
              return (
                <button
                  key={task.id}
                  onClick={() => !done && onTaskClick(task, i)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200
                    ${done 
                      ? 'bg-green-50 cursor-default' 
                      : 'bg-gray-50 hover:bg-[#FFF8F0] hover:shadow-sm cursor-pointer'
                    }`}
                >
                  {/* Checkbox */}
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 text-xs
                    ${done 
                      ? 'bg-green-500 text-white' 
                      : 'border-2 border-gray-300'
                    }`}>
                    {done && '✓'}
                  </div>

                  {/* Icon */}
                  <span className="text-lg">{task.icon}</span>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-semibold hindi-text leading-tight
                      ${done ? 'text-green-700 line-through' : 'text-gray-800'}`}>
                      {task.label}
                    </div>
                    <div className="text-[10px] text-gray-400">{task.description}</div>
                  </div>

                  {/* Arrow for incomplete */}
                  {!done && (
                    <span className="text-gray-400 text-sm">→</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{ 
                    width: `${(completedCount / totalTasks) * 100}%`,
                    background: allDone 
                      ? 'linear-gradient(90deg, #4CAF50, #66BB6A)' 
                      : 'linear-gradient(90deg, #FF6B35, #FFB74D)'
                  }}
                />
              </div>
              <span className="text-[10px] font-bold text-gray-400">
                {allDone ? '🎉 All done!' : `${completedCount} of ${totalTasks}`}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
