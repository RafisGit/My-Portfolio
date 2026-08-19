import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PERSONAL_INFO } from '../data/portfolioData';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header tag reveal
      gsap.fromTo(
        '[data-animate="about-label"]',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Statement reveal
      gsap.fromTo(
        '[data-animate="statement-line"]',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-animate="statement-box"]',
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Bio description and stats
      gsap.fromTo(
        '[data-animate="bio-text"], [data-animate="bio-text-secondary"], [data-animate="stat-card"]',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '[data-animate="content-grid"]',
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Currently exploring badges
      gsap.fromTo(
        '[data-animate="exploring-badge"]',
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.06,
          duration: 0.5,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: '[data-animate="exploring-section"]',
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.aboutSection} id="about">
      <div className={`site-container ${styles.aboutContainer}`}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <span data-animate="about-label" className={`${styles.sectionLabel} section-label`}>About Philosophy</span>
        </div>

        {/* Large Editorial Statement */}
        <div data-animate="statement-box" className={styles.statementBox}>
          <h2 className={styles.statementText}>
            <span data-animate="statement-line" className={styles.statementLine}>I BUILD DIGITAL EXPERIENCES</span>{' '}
            <span data-animate="statement-line" className={styles.statementLine}>THAT SOLVE REAL PROBLEMS</span>{' '}
            <span data-animate="statement-line" className={`${styles.statementLine} ${styles.accentHighlight}`}>WITH CLEAN CODE.</span>
          </h2>
        </div>

        {/* Content Grid: Bio + Statistics */}
        <div data-animate="content-grid" className={styles.contentGrid}>
          <div className={styles.bioColumn}>
            <p data-animate="bio-text" className={styles.bioText}>
              {PERSONAL_INFO.bioDescription}
            </p>
            <p data-animate="bio-text-secondary" className={styles.bioTextSecondary}>
              I bridge the gap between rigorous computer science engineering and intuitive, high-performance product design. My goal is to build web software that delivers tangible impact and exceptional user experiences.
            </p>
          </div>

          <div className={styles.statsColumn}>
            {PERSONAL_INFO.stats.map((stat, idx) => (
              <div key={idx} data-animate="stat-card" className={styles.statCard}>
                <div className={styles.statNumber}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Currently Exploring Grid */}
        <div data-animate="exploring-section" className={styles.exploringSection}>
          <div className={styles.exploringHeader}>
            <span className={styles.exploringIcon}>⚡</span>
            <span className={styles.exploringTitle}>CURRENTLY EXPLORING & PRACTICING</span>
          </div>
          <div className={styles.exploringGrid}>
            {PERSONAL_INFO.exploring.map((topic, idx) => (
              <div key={idx} data-animate="exploring-badge" className={styles.exploringBadge}>
                <span className={styles.exploringDot}></span>
                <span>{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(About);
