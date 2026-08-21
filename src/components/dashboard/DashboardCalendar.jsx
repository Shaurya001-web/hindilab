import React, { useState } from 'react';
import { getCompletedCount } from '../../data/dailyTasks';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Compact LeetCode-style monthly calendar with date selection.
 */
export default function DashboardCalendar({ selectedDate, onDateSelect }) {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(y => y - 1);
    } else {
      setViewMonth(m => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(y => y + 1);
    } else {
      setViewMonth(m => m + 1);
    }
  };

  const getDateStr = (day) => {
    const m = String(viewMonth + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${viewYear}-${m}-${d}`;
  };

  const isFuture = (day) => {
    const date = new Date(viewYear, viewMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date > todayStart;
  };

  const isToday = (day) => {
    return getDateStr(day) === todayStr;
  };

  const getCompletionState = (day) => {
    if (isFuture(day)) return 'future';
    const dateStr = getDateStr(day);
    const count = getCompletedCount(dateStr);
    if (count >= 5) return 'complete';
    if (count > 0) return 'partial';
    return 'none';
  };

  // Build grid cells
  const cells = [];
  // Empty cells before first day
  for (let i = 0; i < firstDayOfWeek; i++) {
    cells.push(<div key={`empty-${i}`} className="w-8 h-8" />);
  }
  // Day cells
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = getDateStr(day);
    const isSelected = dateStr === selectedDate;
    const todayMark = isToday(day);
    const future = isFuture(day);
    const completion = getCompletionState(day);

    cells.push(
      <button
        key={day}
        onClick={() => !future && onDateSelect(dateStr)}
        disabled={future}
        className={`w-8 h-8 rounded-full text-xs font-medium flex items-center justify-center relative transition-all duration-200
          ${isSelected 
            ? 'bg-[#FF6B35] text-white font-bold shadow-md' 
            : todayMark 
              ? 'ring-2 ring-[#FF6B35] text-[#FF6B35] font-bold'
              : future 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-[#FFF3E0]'
          }`}
      >
        {day}
        {/* Completion indicator dot */}
        {!isSelected && !future && completion !== 'none' && (
          <span className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 rounded-full
            ${completion === 'complete' 
              ? 'w-1.5 h-1.5 bg-green-500' 
              : 'w-1.5 h-1.5 bg-orange-300'
            }`} 
          />
        )}
      </button>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button 
          onClick={prevMonth} 
          className="w-7 h-7 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors text-sm"
        >
          ‹
        </button>
        <h3 className="font-bold text-sm text-gray-800">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </h3>
        <button 
          onClick={nextMonth} 
          className="w-7 h-7 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors text-sm"
        >
          ›
        </button>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {WEEKDAYS.map((d, i) => (
          <div key={i} className="w-8 h-6 flex items-center justify-center text-[10px] font-bold text-gray-400 uppercase">
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {cells}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-[10px] text-gray-400">Done</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-orange-300" />
          <span className="text-[10px] text-gray-400">Partial</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 rounded-full ring-1 ring-[#FF6B35] flex items-center justify-center text-[8px] text-[#FF6B35] font-bold">T</span>
          <span className="text-[10px] text-gray-400">Today</span>
        </div>
      </div>
    </div>
  );
}
