import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StreakCard from '../components/dashboard/StreakCard';
import DashboardCalendar from '../components/dashboard/DashboardCalendar';
import DailyTaskPanel from '../components/dashboard/DailyTaskPanel';
import DailyTaskModal from '../components/dashboard/DailyTaskModal';
import { 
  getDailyTasks, 
  getProgress, 
  markTaskCompleted, 
  getCurrentStreak,
  getCompletedCount
} from '../data/dailyTasks';

/**
 * Dashboard Page combining the original 8-card grid on the left
 * with the new streak/calendar system on the right.
 */
export default function DashboardPage() {
  const todayStr = new Date().toISOString().split('T')[0];
  
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [progress, setProgress] = useState(getProgress());
  const [activeTask, setActiveTask] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const streak = getCurrentStreak();
  const dailyTasks = getDailyTasks(selectedDate);
  const completedIds = progress.completedTasks?.[selectedDate] || [];
  const todayCompletedCount = getCompletedCount(todayStr);

  const handleDateSelect = useCallback((dateStr) => {
    setSelectedDate(dateStr);
  }, []);

  const handleTaskClick = useCallback((task) => {
    setActiveTask(task);
  }, []);

  const handleTaskComplete = useCallback((taskId) => {
    const updated = markTaskCompleted(selectedDate, taskId);
    setProgress({ ...updated });
    setRefreshKey(k => k + 1);
  }, [selectedDate]);

  const handleModalClose = useCallback(() => {
    setActiveTask(null);
  }, []);

  // Refresh progress on mount
  useEffect(() => {
    setProgress(getProgress());
  }, [refreshKey]);

  return (
    <div className="min-h-screen bg-[#FFFDF9] font-sans pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col xl:flex-row gap-8">
        
        {/* =======================================
            LEFT COLUMN (Main Content & Grid)
            ======================================= */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          
          {/* Top Section: Greeting, Progress, Translator */}
          <div className="flex flex-col md:flex-row gap-6">
            
            {/* Greeting section */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-[#FF6B35] hindi-text flex items-center gap-2 mb-2">
                नमस्ते! 
                {streak.current > 0 && (
                  <span className="text-sm font-semibold tracking-wide uppercase px-2 py-0.5 rounded text-[#FF6B35] bg-white border border-[#FF6B35]/20 ml-2">
                    🔥 {streak.current}-day streak
                  </span>
                )}
              </h1>
              <p className="text-sm text-gray-500 mb-1">
                {todayCompletedCount >= 5 
                  ? "🎉 You've completed all today's tasks! Great job!" 
                  : `${5 - todayCompletedCount} tasks remaining today — let's go!`}
              </p>
              <p className="text-gray-600 font-medium mt-2">
                Pick an activity below to get started.
              </p>
            </div>

            {/* Translator Card (Smaller horizontal version) */}
            <div className="bg-white rounded-3xl p-4 shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center gap-4 md:w-80 shrink-0">
              <div className="w-12 h-12 rounded-full bg-[#FF6B35] text-white flex items-center justify-center text-xl shadow-sm shrink-0">
                ↔
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-sm">English ↔ Hindi</h3>
                <p className="text-xs text-gray-500 mb-2">Find a word's meaning</p>
                <button className="bg-[#FF6B35] hover:bg-[#F25A24] text-white font-bold py-1.5 px-4 rounded-full text-xs transition-colors shadow-sm w-full">
                  Translate
                </button>
              </div>
            </div>
            
          </div>

          {/* 8 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-2">
            
            {/* Card 1: Reading Aloud */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-2 border-[#FF6B35] relative flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="w-8 h-8 rounded-full bg-[#FF6B35] text-white font-bold flex items-center justify-center text-sm shadow-sm">
                  1
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-[#FF6B35] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
                    NEXT UP
                  </span>
                  <button className="w-6 h-6 rounded-full bg-[#FFF5F0] text-[#FF6B35] text-xs font-bold flex items-center justify-center hover:bg-[#FF6B35] hover:text-white transition-colors">
                    i
                  </button>
                </div>
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Reading Aloud</h3>
              <p className="text-sm text-gray-500 mb-6 flex-grow">
                Read passages aloud in Hindi & get a score.
              </p>
              <Link to="/reading" className="bg-[#FF6B35] hover:bg-[#F25A24] text-white font-bold py-2 px-6 rounded-full text-sm transition-colors shadow-sm self-start inline-block">
                Start
              </Link>
            </div>

            {/* Card 2: Picture Description */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="w-8 h-8 rounded-full bg-[#FF6B35] text-white font-bold flex items-center justify-center text-sm shadow-sm">
                  2
                </div>
                <button className="w-6 h-6 rounded-full bg-[#FFF5F0] text-[#FF6B35] text-xs font-bold flex items-center justify-center hover:bg-[#FF6B35] hover:text-white transition-colors">
                  i
                </button>
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Picture Description</h3>
              <p className="text-sm text-gray-500 mb-6 flex-grow">
                Describe pictures in Hindi & get your analysis
              </p>
              <p className="text-xs text-gray-400 font-semibold mt-auto">Due today</p>
            </div>

            {/* Card 3: शब्द शक्ति */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="w-8 h-8 rounded-full bg-[#FF6B35] text-white font-bold flex items-center justify-center text-sm shadow-sm">
                  3
                </div>
                <button className="w-6 h-6 rounded-full bg-[#FFF5F0] text-[#FF6B35] text-xs font-bold flex items-center justify-center hover:bg-[#FF6B35] hover:text-white transition-colors">
                  i
                </button>
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2 hindi-text">शब्द शक्ति</h3>
              <p className="text-sm text-gray-500 mb-6 flex-grow">
                Test your word meaning knowledge
              </p>
              <p className="text-xs text-gray-400 font-semibold mt-auto">Due today</p>
            </div>

            {/* Card 4: शब्द चुनौती */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="w-8 h-8 rounded-full bg-[#FF6B35] text-white font-bold flex items-center justify-center text-sm shadow-sm">
                  4
                </div>
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2 hindi-text">शब्द चुनौती</h3>
              <p className="text-sm text-gray-500 mb-6 flex-grow">
                Daily Vocabulary Games to test professions, synonyms, antonyms, fill in the blanks and spelling
              </p>
              <p className="text-xs text-gray-400 font-semibold mt-auto">Due today</p>
            </div>

            {/* Card 5: आज के मुहावरे */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="w-8 h-8 rounded-full bg-[#FF6B35] text-white font-bold flex items-center justify-center text-sm shadow-sm">
                  5
                </div>
                <button className="w-6 h-6 rounded-full bg-[#FFF5F0] text-[#FF6B35] text-xs font-bold flex items-center justify-center hover:bg-[#FF6B35] hover:text-white transition-colors">
                  i
                </button>
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2 hindi-text">आज के मुहावरे</h3>
              <p className="text-sm text-gray-500 mb-6 flex-grow">
                Test your Idioms knowledge
              </p>
              <p className="text-xs text-gray-400 font-semibold mt-auto">Due today</p>
            </div>

            {/* Card 6: Revision Drill */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="w-8 h-8 rounded-full bg-[#FF6B35] text-white font-bold flex items-center justify-center text-sm shadow-sm">
                  6
                </div>
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Revision Drill</h3>
              <p className="text-sm text-gray-500 mb-6 flex-grow hindi-text">
                Review today's tricky pronunciation, मुहावरे & शब्द शक्ति before you leave.
              </p>
              <div className="self-start px-3 py-1.5 rounded-full bg-green-50 text-green-600 text-xs font-bold flex items-center gap-1.5 mt-auto">
                <span>✓</span> Done today
              </div>
            </div>

            {/* Card 7: My Hindi Dictionary */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="w-8 h-8 rounded-full bg-[#FF6B35] text-white font-bold flex items-center justify-center text-sm shadow-sm">
                  7
                </div>
                <button className="w-6 h-6 rounded-full bg-[#FFF5F0] text-[#FF6B35] text-xs font-bold flex items-center justify-center hover:bg-[#FF6B35] hover:text-white transition-colors">
                  i
                </button>
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">My Hindi Dictionary</h3>
              <p className="text-sm text-gray-500 mb-6 flex-grow">
                Build it word-by-word & practise everyday
              </p>
              <p className="text-xs text-gray-400 font-semibold mt-auto">Due today</p>
            </div>

            {/* Card 8: The Hindi Games */}
            <div className="bg-gradient-to-br from-[#FF6B35] to-[#F25A24] rounded-3xl p-6 shadow-md text-white flex flex-col items-center justify-center text-center relative min-h-[220px]">
              <h3 className="font-bold text-xl mb-1 hindi-text">The हिंदी Games</h3>
              <p className="text-sm opacity-90 mb-6">
                Bonus games — 10 points per play
              </p>
              <button className="bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-6 rounded-full text-sm transition-colors border border-white/30 backdrop-blur-sm mt-auto">
                10 more to play!
              </button>
            </div>

          </div>
        </div>

        {/* =======================================
            RIGHT COLUMN (Sidebar: Streak/Calendar)
            ======================================= */}
        <div className="w-full xl:w-[340px] shrink-0 flex flex-col gap-4">
          
          {/* Streak */}
          <StreakCard 
            current={streak.current} 
            best={streak.best} 
            todayCompleted={todayCompletedCount >= 5}
          />

          {/* Calendar */}
          <DashboardCalendar 
            key={refreshKey}
            selectedDate={selectedDate} 
            onDateSelect={handleDateSelect}
          />

          {/* Daily Tasks */}
          <DailyTaskPanel 
            dateStr={selectedDate}
            tasks={dailyTasks}
            completedIds={completedIds}
            onTaskClick={handleTaskClick}
          />

        </div>
      </div>

      {/* Task Modal */}
      {activeTask && (
        <DailyTaskModal
          task={activeTask}
          onComplete={handleTaskComplete}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
