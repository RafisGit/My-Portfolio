import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EDUCATION_DATA } from '../data/portfolioData';
import styles from './Education.module.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Education & Academic Foundations
 * Details Rafi's formal Computer Science & Engineering degree,
 * key milestones, and rigorous coursework foundations.
 */
const Education = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        '[data-animate="edu-header"] > *',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Card reveal
      gsap.fromTo(
        '[data-animate="education-card"]',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-animate="education-card"]',
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
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={`site-container ${styles.educationContainer}`}>
        {/* Section Header */}
        <div data-animate="edu-header" className={styles.header}>
          <div className={styles.sectionMetaTag}>
            <span className={styles.metaDot} />
            <span className={styles.metaLabel}>05 / ACADEMIC FOUNDATIONS</span>
          </div>
          <h2 className={`editorial-headline ${styles.title}`}>
            EDUCATION & CORE CS
          </h2>
          <p className={styles.subtitle}>
            Formal academic background in Computer Science and Engineering, focusing on foundational algorithms, software engineering principles, and systems architecture.
          </p>
        </div>

        {/* Technical Résumé Card List */}
        <div className={styles.cardsList}>
          {EDUCATION_DATA.map((edu, idx) => (
            <div key={idx} data-animate="education-card" className={`${styles.educationCard} glass-panel`}>
              <div className={styles.cardTop}>
                <div className={styles.degreeInfo}>
                  <h3 className={styles.degreeTitle}>{edu.degree}</h3>
                  <div className={styles.institutionRow}>
                    <span className={styles.institution}>{edu.institution}</span>
                    <span className={styles.dotSeparator}>•</span>
                    <span className={styles.location}>{edu.location}</span>
                  </div>
                </div>

                <div className={styles.periodBadge}>
                  <span className={styles.statusDot} />
                  <span className={styles.statusText}>{edu.status || 'GRADUATED'}</span>
                  {edu.period && (
                    <>
                      <span className={styles.badgeDivider}>•</span>
                      <span className={styles.periodText}>{edu.period}</span>
                    </>
                  )}
                </div>
              </div>

              <div className={styles.divider} />

              <div className={styles.highlightsContainer}>
                <h4 className={styles.highlightsHeading}>CORE CS DOMAINS & MILESTONES</h4>
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
