import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getFeaturedPassages, READING_DIFFICULTY } from '../../data/passages';
import Button from '../ui/Button';

/**
 * "Try It Yourself" demo preview section.
 * Shows interactive passage cards organized by difficulty tabs.
 */
export default function DemoPreview() {
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  const passages = getFeaturedPassages();

  const tabs = [
    { key: 'all', label: 'All', hindi: 'सभी' },
    { key: 'easy', label: 'Easy', hindi: 'आसान' },
    { key: 'medium', label: 'Medium', hindi: 'मध्यम' },
    { key: 'advanced', label: 'Advanced', hindi: 'कठिन' }
  ];

  const filteredPassages = activeTab === 'all'
    ? passages
    : passages.filter((p) => p.difficulty === activeTab);

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-transparent via-primary-50/30 to-primary-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-500 mb-2">
            Try It Yourself
          </h2>
          <p className="text-text-secondary">
            Real practice. Real content. Pick a passage and start reading.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer border-0 ${
                activeTab === tab.key
                  ? 'gradient-primary text-white shadow-md'
                  : 'bg-white text-text-secondary border border-primary-200 hover:border-primary-400'
              }`}
            >
              <span className="hindi-text">{tab.hindi}</span>
              <span className="text-xs ml-1.5 opacity-70">({tab.label})</span>
            </button>
          ))}
        </div>

        {/* Passage preview cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPassages.map((passage, i) => {
            const difficulty = READING_DIFFICULTY[passage.difficulty];
            return (
              <div
                key={passage.id}
                className="card p-5 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow"
                style={{ animation: `slide-up 0.4s ease-out ${i * 0.08}s both` }}
                onClick={() => navigate('/reading', { state: { selectedPassageId: passage.id } })}
              >
                {/* Image */}
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                  <img src={passage.image} alt={passage.title} className="w-full h-full object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="hindi-text text-lg font-bold text-text-primary truncate">
                      {passage.title}
                    </h4>
                  </div>
                  <p className="hindi-text text-text-muted text-sm line-clamp-1">{passage.text}</p>
                </div>

                {/* Practice button */}
                <div
                  className="w-10 h-10 rounded-full gradient-primary text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200 no-underline text-sm shrink-0"
                  title="Practice reading this passage"
                >
                  🎤
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link to="/learn">
            <Button size="lg" icon="📚">
              View All Words
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
