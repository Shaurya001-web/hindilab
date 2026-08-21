import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../ui/Button';
import PillNav from '../ui/PillNav';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Learn', href: '/learn' },
  { label: 'Reading', href: '/reading' },
  { label: 'Dashboard', href: '/dashboard' }
];

// A simple SVG data URI for the "हि" logo to pass to PillNav
const logoSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='25' fill='url(%23grad)'/%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23FF9800;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23FF5722;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ctext x='50' y='70' font-size='60' font-family='sans-serif' font-weight='bold' fill='white' text-anchor='middle'%3Eहि%3C/text%3E%3C/svg%3E";

/**
 * Top navigation bar with logo and navigation links.
 */
export default function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 relative min-h-[64px] ${
      isScrolled ? 'border-b border-gray-100 backdrop-blur-md bg-white/80 shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo - kept for visual consistency, PillNav will be centered or placed next to it */}
          <Link to="/" className="flex items-center gap-2 no-underline z-[100]">
            <span className="text-xl font-bold text-text-primary ml-10">
              <span className="hindi-text text-primary-500">हिंदी</span>{' '}
              <span>Lab</span>
            </span>
          </Link>

          {/* Navigation Links using PillNav */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-xl h-full flex items-center justify-center">
              <PillNav
                logo={logoSvg}
                logoAlt="Hindi Lab Logo"
                items={navItems}
                activeHref={location.pathname}
                baseColor="#FF6B35"
                pillColor="#FFFDF9"
                hoveredPillTextColor="#ffffff"
                pillTextColor="#FF6B35"
              />
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3 z-[100]">
            <Button variant="secondary" size="sm" className="hidden sm:inline-flex">
              Sign In
            </Button>
            <Button size="sm">
              Try Free
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
