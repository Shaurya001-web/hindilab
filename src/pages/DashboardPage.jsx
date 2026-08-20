import React from 'react';

/**
 * Static Dashboard Page based on design provided.
 */
export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF9] font-sans pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Left Column */}
        <div className="w-full md:w-80 shrink-0 flex flex-col gap-6">
          
          {/* Greeting section */}
          <div>
            <h1 className="text-3xl font-bold text-[#FF6B35] hindi-text flex items-center gap-2 mb-2">
              नमस्ते! <span className="text-sm font-semibold tracking-wide uppercase px-2 py-0.5 rounded text-[#FF6B35] bg-white border border-[#FF6B35]/20 ml-2">🔥 0-day streak</span>
            </h1>
            <p className="text-sm text-gray-500 mb-1">
              3 days left in trial · <button className="text-[#FF6B35] font-semibold hover:underline">Subscribe</button>
            </p>
            <p className="text-gray-600 font-medium">
              Let's get today's modules done
            </p>
          </div>

          {/* Progress Card */}
          <div className="bg-white rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center gap-5">
            <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-100"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#FF6B35]"
                  strokeWidth="4"
                  strokeDasharray="14, 100"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute font-bold text-lg text-gray-800">1/7</div>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Off to a great start!</h3>
              <p className="text-xs text-gray-500 font-medium">1 done · 6 to go today</p>
            </div>
          </div>

          {/* Translator Card */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col items-center text-center relative">
            <button className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#FFF5F0] text-[#FF6B35] text-xs font-bold flex items-center justify-center hover:bg-[#FF6B35] hover:text-white transition-colors">
              i
            </button>
            <div className="w-12 h-12 rounded-full bg-[#FF6B35] text-white flex items-center justify-center text-xl mb-4 shadow-sm">
              ↔
            </div>
            <h3 className="font-bold text-gray-800 mb-2">English ↔ Hindi Translator</h3>
            <p className="text-sm text-gray-500 mb-5">
              Find your Hindi word or English meaning
            </p>
            <button className="bg-[#FF6B35] hover:bg-[#F25A24] text-white font-bold py-2.5 px-6 rounded-full text-sm transition-colors shadow-md">
              Translate a word
            </button>
          </div>

          {/* Character / Skip */}
          <div className="flex items-center gap-4 mt-2 pl-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden flex items-end justify-center shrink-0">
              {/* Fallback avatar */}
              <div className="w-12 h-12 bg-gray-300 rounded-full mb-[-10px]"></div>
            </div>
            <button className="bg-white text-gray-600 font-bold py-2 px-6 rounded-full text-sm border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
              Skip
            </button>
          </div>

        </div>

        {/* Right Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          
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
            <button className="bg-[#FF6B35] hover:bg-[#F25A24] text-white font-bold py-2 px-6 rounded-full text-sm transition-colors shadow-sm self-start">
              Start
            </button>
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
    </div>
  );
}
