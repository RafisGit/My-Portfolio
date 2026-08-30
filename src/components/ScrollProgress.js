import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './ScrollProgress.module.css';

/**
 * ScrollProgress Telemetry Rail
 * Minimalist desktop telemetry indicator displaying current section
 * and scroll progress through the engineering journey.
 */
const SECTIONS = [
  { id: 'top', label: 'HERO', num: '01' },
  { id: 'projects', label: 'WORK', num: '02' },
  { id: 'process', label: 'WORKFLOW', num: '03' },
  { id: 'about', label: 'ABOUT', num: '04' },
  { id: 'skills', label: 'MATRIX', num: '05' },
  { id: 'education', label: 'ACADEMIC', num: '06' },
  { id: 'contact', label: 'CONTACT', num: '07' },
];

const ScrollProgress = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('top');
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    if (location.pathname !== '/') return;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const handleScroll = () => {
      // Calculate global scroll percentage
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollPercent(Math.min(100, Math.max(0, scrolled)));

      // Determine active section based on midpoint intersection
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const sec = SECTIONS[i];
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeIndex = SECTIONS.findIndex((s) => s.id === activeSection);
  const currentNum = String((activeIndex !== -1 ? activeIndex : 0) + 1).padStart(2, '0');
  const totalNum = String(SECTIONS.length).padStart(2, '0');

  if (location.pathname !== '/') {
    return null;
  }

  return (
    <aside className={styles.progressRail} aria-label="Page scroll position">
      <div className={styles.railInner}>
        {/* Section Counter Badge */}
        <div className={styles.counterBadge}>
          <span className={styles.activeNum}>{currentNum}</span>
          <span className={styles.numDivider}>/</span>
          <span className={styles.totalNum}>{totalNum}</span>
        </div>

        {/* Vertical Track Line */}
        <div className={styles.trackLine}>
          <div
            className={styles.fillLine}
            style={{ height: `${scrollPercent}%` }}
          />
        </div>

        {/* Section Interactive Markers */}
        <nav className={styles.markersNav} aria-label="Section shortcuts">
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`${styles.markerBtn} ${isActive ? styles.activeMarker : ''}`}
                aria-label={`Jump to ${sec.label} section`}
                aria-current={isActive ? 'true' : undefined}
                data-cursor="hover"
              >
                <span className={styles.markerDot} />
                <span className={styles.markerLabel}>{sec.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default React.memo(ScrollProgress);
