/**
 * App-wide constants for HindiLab.
 */

export const APP_NAME = 'HindiLab';
export const APP_TAGLINE = 'AI-powered Hindi learning for children';

export const API_BASE_URL = '/api';

export const ROUTES = {
  HOME: '/',
  LEARN: '/learn',
  PRACTICE: '/practice/:wordId',
  READING: '/reading',
};

export const RECORDING_STATES = {
  IDLE: 'idle',
  LISTENING: 'listening',
  RECORDING: 'recording',
  ANALYZING: 'analyzing',
  RESULT: 'result',
};

export const DIFFICULTY_LABELS = {
  easy: { label: 'Easy', color: '#4CAF50' },
  medium: { label: 'Medium', color: '#FF9800' },
  hard: { label: 'Hard', color: '#F44336' },
};

export const FEATURES = [
  {
    id: 1,
    title: 'चित्र से शब्द सीखें',
    titleEnglish: 'Image to Word',
    description: 'AI-powered image recognition identifies objects and teaches Hindi vocabulary with meanings, synonyms, and antonyms.',
    icon: '🖼️',
    color: '#FF6B35',
  },
  {
    id: 2,
    title: 'उच्चारण अभ्यास',
    titleEnglish: 'Pronunciation Practice',
    description: 'Record your pronunciation and get instant AI feedback with a score out of 100. Practice until you get it perfect!',
    icon: '🎤',
    color: '#4CAF50',
  },
  {
    id: 3,
    title: 'शब्द शक्ति',
    titleEnglish: 'Word Power',
    description: 'Build your vocabulary with daily words. Learn meanings, synonyms, and usage in fun, interactive exercises.',
    icon: '📚',
    color: '#2196F3',
  },
  {
    id: 4,
    title: 'शिक्षक की आवाज़',
    titleEnglish: 'Teacher Voice',
    description: 'Listen to correct pronunciation from expert teachers anytime. Replay as many times as you need to master the word.',
    icon: '🔊',
    color: '#9C27B0',
  },
  {
    id: 5,
    title: 'समानार्थी और विलोम',
    titleEnglish: 'Synonyms & Antonyms',
    description: 'Expand your Hindi vocabulary by learning related words. Understand word relationships and usage in context.',
    icon: '🔄',
    color: '#FF9800',
  },
  {
    id: 6,
    title: 'मेरा शब्दकोश',
    titleEnglish: 'My Dictionary',
    description: 'Build your personal Hindi dictionary as you learn. Review difficult words anytime and track your progress.',
    icon: '📖',
    color: '#00BCD4',
  },
];
