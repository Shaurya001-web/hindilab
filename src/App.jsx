import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LearnPage from './pages/LearnPage';
import PracticePage from './pages/PracticePage';
import ReadingPracticePage from './pages/ReadingPracticePage';
import DashboardPage from './pages/DashboardPage';
import ConversationPage from './pages/ConversationPage';

/**
 * Root application component with routing.
 */
export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-surface">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/practice/:wordId" element={<PracticePage />} />
            <Route path="/reading" element={<ReadingPracticePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/conversation" element={<ConversationPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
