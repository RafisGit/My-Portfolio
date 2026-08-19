import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContact } from '../context/ContactContext';
import { useMagnetic } from '../hooks/useMagnetic';
import { PERSONAL_INFO } from '../data/portfolioData';
import styles from './ContactSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const { openContact } = useContact();
  const sectionRef = useRef(null);
  const magneticCtaRef = useMagnetic(0.3);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-animate="contact-line"]',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '[data-animate="contact-actions"] > *',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '[data-animate="contact-actions"]',
            start: 'top 90%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.contactSection} id="contact">
      <div className={`site-container ${styles.contactContainer}`}>
        <div className={styles.tagWrapper}>
          <span className="section-label">Get in Touch</span>
        </div>

        {/* Large Bold Editorial Typography */}
        <div className={styles.headlineBox}>
          <h2 className={`editorial-headline ${styles.headlineText}`}>
            <span data-animate="contact-line" className={styles.headlineLine}>HAVE A PROJECT</span>{' '}
            <span data-animate="contact-line" className={styles.headlineLine}>IN MIND?</span>
            <span data-animate="contact-line" className={`${styles.headlineLine} ${styles.accentLine}`}>
              LET'S BUILD SOMETHING GREAT.
            </span>
          </h2>
        </div>

        <p className={styles.leadText}>
          Whether you're looking for an ambitious software engineer, an internship collaborator, or want to discuss full-stack & AI architecture, my inbox is always open.
        </p>

        {/* Action Triggers */}
        <div data-animate="contact-actions" className={styles.contactActions}>
          <button
            ref={magneticCtaRef}
            onClick={openContact}
            className={`${styles.mainCtaBtn} magnetic-btn primary`}
            data-cursor="hover"
          >
            START A CONVERSATION <span className={styles.arrow}>→</span>
          </button>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className={`${styles.emailPill} magnetic-btn secondary`}
            data-cursor="link"
          >
            {PERSONAL_INFO.email}
          </a>
        </div>

        {/* Channels Grid */}
        <div className={styles.channelsGrid}>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.channelCard} glass-panel`}
            data-cursor="external"
          >
            <div className={styles.channelHeader}>
              <span className={styles.channelLabel}>GITHUB</span>
              <span className={styles.channelArrow}>↗</span>
            </div>
            <span className={styles.channelValue}>@RafisGit</span>
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.channelCard} glass-panel`}
            data-cursor="external"
          >
            <div className={styles.channelHeader}>
              <span className={styles.channelLabel}>LINKEDIN</span>
              <span className={styles.channelArrow}>↗</span>
            </div>
            <span className={styles.channelValue}>/in/rafihoque</span>
          </a>

          <div className={`${styles.channelCard} glass-panel`}>
            <div className={styles.channelHeader}>
              <span className={styles.channelLabel}>LOCATION</span>
              <span className={styles.statusDot}></span>
            </div>
            <span className={styles.channelValue}>{PERSONAL_INFO.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ContactSection);
