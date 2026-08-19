import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EDUCATION_DATA } from '../data/portfolioData';
import styles from './Education.module.css';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-animate="education-card"]',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.educationSection} id="education">
      <div className={`site-container ${styles.educationContainer}`}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className="section-label">Academic Background</span>
          <h2 className={`editorial-subheadline ${styles.title}`}>
            EDUCATION & FOUNDATIONS
          </h2>
        </div>

        {/* Editorial Education Cards */}
        <div className={styles.cardsList}>
          {EDUCATION_DATA.map((edu, idx) => (
            <div key={idx} data-animate="education-card" className={`${styles.educationCard} glass-panel`}>
              <div className={styles.cardTop}>
                <div>
                  <h3 className={styles.degreeTitle}>{edu.degree}</h3>
                  <div className={styles.institutionRow}>
                    <span className={styles.institution}>{edu.institution}</span>
                    <span className={styles.dotSeparator}>•</span>
                    <span className={styles.location}>{edu.location}</span>
                  </div>
                </div>

                <div className={styles.periodBadge}>
                  <span className={styles.periodText}>{edu.period}</span>
                </div>
              </div>

              <div className={styles.divider} />

              <div className={styles.highlightsContainer}>
                <h4 className={styles.highlightsHeading}>Core Focus & Milestones</h4>
                <ul className={styles.highlightsList}>
                  {edu.highlights.map((item, hIdx) => (
                    <li key={hIdx} className={styles.highlightItem}>
                      <span className={styles.checkmark}>▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Education);
