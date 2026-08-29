import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROCESS_STEPS } from '../data/portfolioData';
import styles from './HowIBuild.module.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * HowIBuild — Engineering Workflow
 * Demonstrates Rafi's structured software development lifecycle from
 * problem analysis to performance monitoring and edge deployment
 * with animated line drawing on scroll.
 */
const HowIBuild = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        '[data-animate="workflow-header"] > *',
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

      // Steps reveal
      gsap.fromTo(
        '[data-animate="step-card"]',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-animate="steps-grid"]',
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Connector line drawing animation
      gsap.fromTo(
        `.${styles.stepConnectorLine}`,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '[data-animate="steps-grid"]',
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.processSection} id="process">
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={`site-container ${styles.processContainer}`}>
        {/* Section Header */}
        <div data-animate="workflow-header" className={styles.header}>
          <div className={styles.sectionMetaTag}>
            <span className={styles.metaDot} />
            <span className={styles.metaLabel}>04 / WORKFLOW</span>
          </div>
          <h2 className={`editorial-headline ${styles.title}`}>
            HOW I BUILD SOFTWARE
          </h2>
          <p className={styles.subtitle}>
            A systematic engineering approach from conceptual requirements to scalable, high-performance production deployment.
          </p>
        </div>

        {/* Process Steps Timeline Grid */}
        <div data-animate="steps-grid" className={styles.stepsGrid}>
          {PROCESS_STEPS.map((step, idx) => (
            <div key={idx} data-animate="step-card" className={`${styles.stepCard} glass-panel`}>
              <div className={styles.stepTop}>
                <span className={styles.stepNumber}>{step.number}</span>
                <span className={styles.stepConnectorLine} />
              </div>

              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepSubtitle}>{step.subtitle}</p>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(HowIBuild);
