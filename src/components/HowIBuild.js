import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROCESS_STEPS } from '../data/portfolioData';
import styles from './HowIBuild.module.css';

gsap.registerPlugin(ScrollTrigger);

const HowIBuild = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-animate="step-card"]',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power3.out',
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
    <section ref={sectionRef} className={styles.processSection} id="process">
      <div className={`site-container ${styles.processContainer}`}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className="section-label">Engineering Workflow</span>
          <h2 className={`editorial-subheadline ${styles.title}`}>
            HOW I BUILD SOFTWARE
          </h2>
          <p className={styles.subtitle}>
            A systematic engineering approach from conceptual requirements to scalable, high-performance production deployment.
          </p>
        </div>

        {/* Process Steps Timeline Grid */}
        <div className={styles.stepsGrid}>
          {PROCESS_STEPS.map((step, idx) => (
            <div key={idx} data-animate="step-card" className={`${styles.stepCard} glass-panel`}>
              <div className={styles.stepTop}>
                <span className={styles.stepNumber}>{step.number}</span>
                <span className={styles.stepConnectorLine}></span>
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
