import { Link } from 'react-router-dom';

/**
 * Site footer with links and branding.
 */
export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-primary-50 to-primary-100/50 border-t border-primary-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white font-bold text-sm hindi-text shadow-sm">
                हि
              </div>
              <span className="text-lg font-bold text-text-primary">
                <span className="hindi-text text-primary-500">हिंदी</span> Lab
              </span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              AI-powered Hindi learning for children. Making हिंदी practice a happy habit.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-text-primary mb-3">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-text-secondary text-sm hover:text-primary-500 transition-colors no-underline">
                Home
              </Link>
              <Link to="/learn" className="text-text-secondary text-sm hover:text-primary-500 transition-colors no-underline">
                Learn Words
              </Link>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-text-primary mb-3 hindi-text">विशेषताएं</h3>
            <div className="flex flex-col gap-2 text-text-secondary text-sm">
              <span className="hindi-text">🖼️ चित्र से शब्द सीखें</span>
              <span className="hindi-text">🎤 उच्चारण अभ्यास</span>
              <span className="hindi-text">🔊 शिक्षक की आवाज़</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-primary-200/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-muted text-xs">
            © {new Date().getFullYear()} HindiLab. Built with ❤️ for Hindi learners.
          </p>
          <div className="flex items-center gap-4 text-text-muted text-xs">
            <a href="#" className="hover:text-primary-500 transition-colors no-underline">Terms</a>
            <a href="#" className="hover:text-primary-500 transition-colors no-underline">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
