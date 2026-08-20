import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "./PillNav.css";

export default function PillNav({
  logo,
  logoAlt = 'Logo',
  items,
  activeHref,
  className = '',
  baseColor = '#fff',
  pillColor = '#120F17',
  hoveredPillTextColor = '#120F17',
  pillTextColor,
  onMobileMenuClick
}) {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pillRefs = useRef([]);
  const circleRefs = useRef([]);
  const logoImgRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  
  const ease = "power2.inOut";

  const handleEnter = (i) => {
    const pill = pillRefs.current[i];
    const circle = circleRefs.current[i];
    if (!pill || !circle) return;

    const label = pill.querySelector('.pill-label');
    const white = pill.querySelector('.pill-label-hover');
    const h = pill.offsetHeight;

    // Animate background circle
    gsap.to(circle, {
      scale: 1,
      duration: .3,
      ease: "power2.out",
      overwrite: "auto"
    });

    // Animate primary label up
    if (label) {
      gsap.to(label, {
        y: -(h + 8),
        duration: .3,
        ease,
        overwrite: "auto"
      });
    }

    // Animate hover label up
    if (white) {
      // If it was completely hidden, ensure it starts from below
      if (gsap.getProperty(white, "opacity") === 0) {
        gsap.set(white, { y: h + 12 });
      }
      gsap.to(white, {
        y: 0,
        opacity: 1,
        duration: .3,
        ease,
        overwrite: "auto"
      });
    }
  };

  const handleLeave = (i) => {
    const pill = pillRefs.current[i];
    const circle = circleRefs.current[i];
    if (!pill || !circle) return;

    const label = pill.querySelector('.pill-label');
    const white = pill.querySelector('.pill-label-hover');
    const h = pill.offsetHeight;

    // Animate background circle back to scale 0
    gsap.to(circle, {
      scale: 0,
      duration: .2,
      ease: "power2.out",
      overwrite: "auto"
    });

    // Reset primary label to center
    if (label) {
      gsap.to(label, {
        y: 0,
        duration: .2,
        ease,
        overwrite: "auto"
      });
    }

    // Hide hover label below
    if (white) {
      gsap.to(white, {
        y: h + 12,
        opacity: 0,
        duration: .2,
        ease,
        overwrite: "auto"
      });
    }
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    gsap.set(img, { rotate: 0 });
    gsap.to(img, {
      rotate: 360,
      duration: 0.3,
      ease,
      overwrite: 'auto'
    });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10, scaleY: 1 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.3,
            ease,
            transformOrigin: 'top center'
          }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          scaleY: 1,
          duration: 0.2,
          ease,
          transformOrigin: 'top center',
          onComplete: () => {
            gsap.set(menu, { visibility: 'hidden' });
          }
        });
      }
    }

    onMobileMenuClick?.();
  };

  // Set initial positions on mount
  useEffect(() => {
    const layout = () => {
      items.forEach((_, i) => {
        const pill = pillRefs.current[i];
        const circle = circleRefs.current[i];
        if (!pill || !circle) return;

        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector('.pill-label');
        const white = pill.querySelector('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });
      });
    };

    layout();
    
    // Slight delay to ensure fonts/layout are ready
    setTimeout(layout, 100);
    
    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [items]);

  const cssVars = {
    ['--base']: baseColor,
    ['--pill-bg']: pillColor,
    ['--hover-text']: hoveredPillTextColor,
    ['--pill-text']: resolvedPillTextColor
  };

  const isExternalLink = href =>
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#');

  const isRouterLink = href => href && !isExternalLink(href);

  return (
    <div className="pill-nav-container">
      <nav className={`pill-nav ${className}`} aria-label="Primary" style={cssVars}>
        {isRouterLink(items?.[0]?.href) ? (
          <Link
            className="pill-logo"
            to={items[0].href}
            aria-label="Home"
            onMouseEnter={handleLogoEnter}
            role="menuitem"
          >
            <img src={logo} alt={logoAlt} ref={logoImgRef} />
          </Link>
        ) : (
          <a
            className="pill-logo"
            href={items?.[0]?.href || '#'}
            aria-label="Home"
            onMouseEnter={handleLogoEnter}
          >
            <img src={logo} alt={logoAlt} ref={logoImgRef} />
          </a>
        )}

        <div className="pill-nav-items desktop-only">
          <ul className="pill-list" role="menubar">
            {items.map((item, i) => {
              const isActive = activeHref === item.href;
              const linkClass = `pill${isActive ? " is-active" : ""}`;
              
              if (isRouterLink(item.href)) {
                return (
                  <li key={item.href || `item-${i}`} role="none">
                    <Link
                      role="menuitem"
                      to={item.href}
                      className={linkClass}
                      ref={(el) => (pillRefs.current[i] = el)}
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                    >
                      <span
                        className="hover-circle"
                        aria-hidden="true"
                        ref={el => {
                          circleRefs.current[i] = el;
                        }}
                      />
                      <span className="label-stack">
                        <span className="pill-label">{item.label}</span>
                        <span className="pill-label-hover" aria-hidden="true">
                          {item.label}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              } else {
                return (
                  <li key={item.href || `item-${i}`} role="none">
                    <a
                      role="menuitem"
                      href={item.href}
                      className={linkClass}
                      ref={(el) => (pillRefs.current[i] = el)}
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                    >
                      <span
                        className="hover-circle"
                        aria-hidden="true"
                        ref={el => {
                          circleRefs.current[i] = el;
                        }}
                      />
                      <span className="label-stack">
                        <span className="pill-label">{item.label}</span>
                        <span className="pill-label-hover" aria-hidden="true">
                          {item.label}
                        </span>
                      </span>
                    </a>
                  </li>
                );
              }
            })}
          </ul>
        </div>

        <button
          className="mobile-menu-button mobile-only"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          ref={hamburgerRef}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      <div className="mobile-menu-popover mobile-only" ref={mobileMenuRef} style={cssVars}>
        <ul className="mobile-menu-list">
          {items.map((item, i) => (
            <li key={item.href || `mobile-item-${i}`}>
              {isRouterLink(item.href) ? (
                <Link
                  to={item.href}
                  className={`mobile-menu-link${activeHref === item.href ? ' is-active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  className={`mobile-menu-link${activeHref === item.href ? ' is-active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
