import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContact } from '../context/ContactContext';
import { useMagnetic } from '../hooks/useMagnetic';
import { PERSONAL_INFO } from '../data/portfolioData';
import styles from './ContactSection.module.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Contact Section
 * High-impact dramatic conclusion to the portfolio experience,
 * inviting technical discussions, software roles, and project collaborations
 * with sequential cinematic typography reveals.
 */
const ContactSection = () => {
  const { openContact } = useContact();
  const sectionRef = useRef(null);
  const magneticCtaRef = useMagnetic(0.35);
  const magneticEmailRef = useMagnetic(0.25);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Sequential headline line reveal with blur clearing
      gsap.fromTo(
        '[data-animate="contact-line"]',
        { opacity: 0, y: 35, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.15,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Actions reveal
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

      // Channels reveal
      gsap.fromTo(
        '[data-animate="channel-card"]',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '[data-animate="channels-grid"]',
            start: 'top 92%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.contactSection} id="contact">
      {/* Dramatic Atmosphere Glow */}
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={`site-container ${styles.contactContainer}`}>
        <div className={styles.tagWrapper}>
          <div className={styles.sectionMetaTag}>
            <span className={styles.metaDot} />
            <span className={styles.metaLabel}>06 / INITIATE CONTACT</span>
          </div>
        </div>

        {/* Large Bold Editorial Typography */}
        <div className={styles.headlineBox}>
          <h2 className={`editorial-headline ${styles.headlineText}`}>
            <span data-animate="contact-line" className={styles.headlineLine}>LET'S BUILD</span>{' '}
            <span data-animate="contact-line" className={styles.headlineLine}>SOMETHING</span>{' '}
            <span data-animate="contact-line" className={`${styles.headlineLine} ${styles.accentLine}`}>
              USEFUL.
            </span>
          </h2>
        </div>

        <p className={styles.leadText}>
          Whether you're looking for an ambitious software engineer, an engineering collaborator, or want to discuss full-stack & AI architecture, my inbox is always open.
        </p>

        {/* Action Triggers with Magnetic Interaction */}
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
            ref={magneticEmailRef}
            href={`mailto:${PERSONAL_INFO.email}`}
            className={`${styles.emailPill} magnetic-btn secondary`}
            data-cursor="link"
          >
            {PERSONAL_INFO.email}
          </a>
        </div>

        {/* Channels Grid */}
        <div data-animate="channels-grid" className={styles.channelsGrid}>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            data-animate="channel-card"
            className={`${styles.channelCard} glass-panel`}
            data-cursor="link"
            title="Explore Rafi's GitHub"
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
            data-animate="channel-card"
            className={`${styles.channelCard} glass-panel`}
            data-cursor="link"
            title="Connect with Rafi on LinkedIn"
          >
            <div className={styles.channelHeader}>
              <span className={styles.channelLabel}>LINKEDIN</span>
              <span className={styles.channelArrow}>↗</span>
            </div>
            <span className={styles.channelValue}>/in/rafihoque</span>
          </a>

          <div data-animate="channel-card" className={`${styles.channelCard} glass-panel`}>
            <div className={styles.channelHeader}>
              <span className={styles.channelLabel}>LOCATION</span>
              <span className={styles.statusDot} />
            </div>
            <span className={styles.channelValue}>{PERSONAL_INFO.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ContactSection);
