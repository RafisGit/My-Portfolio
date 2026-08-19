import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useContact } from '../context/ContactContext';
import { useMagnetic } from '../hooks/useMagnetic';
import { PERSONAL_INFO } from '../data/portfolioData';
import styles from './Hero.module.css';

const Hero = () => {
  const { openContact } = useContact();
  const heroRef = useRef(null);
  const magneticWorkRef = useMagnetic(0.25);
  const magneticCvRef = useMagnetic(0.25);
  const magneticTalkRef = useMagnetic(0.25);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '[data-animate="hero-label"]',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.1 }
      )
        .fromTo(
          '[data-animate="hero-name"] span',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 },
          '-=0.4'
        )
        .fromTo(
          '[data-animate="hero-role"]',
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          '[data-animate="hero-text"]',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.3'
        )
        .fromTo(
          '[data-animate="hero-cta"] > *',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          '-=0.3'
        )
        .fromTo(
          '[data-animate="hero-scroll"]',
          { opacity: 0 },
          { opacity: 0.8, duration: 0.5 },
          '-=0.2'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = (e) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} className={styles.heroSection} id="top">
      <div className={`site-container ${styles.heroContainer}`}>
        {/* Availability / Status Tag */}
        <div data-animate="hero-label" className={styles.labelTag}>
          <span className={styles.statusDot}></span>
          <span className={styles.statusText}>{PERSONAL_INFO.status}</span>
        </div>

        {/* Large Confident Editorial Name */}
        <h1 data-animate="hero-name" className={`editorial-headline ${styles.nameHeading}`}>
          <span>MD. RAFI</span> <span>HOQUE</span>
        </h1>

        {/* Role & Specialization Badges */}
        <div data-animate="hero-role" className={styles.roleContainer}>
          <div className={styles.rolePill}>
            <span className={styles.rolePrimary}>{PERSONAL_INFO.role}</span>
            <span className={styles.roleSeparator}>/</span>
            <span className={styles.roleFocus}>{PERSONAL_INFO.focus}</span>
          </div>
        </div>

        {/* Concise Supporting Statement */}
        <p data-animate="hero-text" className={styles.supportingText}>
          {PERSONAL_INFO.headline}
        </p>

        {/* Primary, CV, and Talk CTAs */}
        <div data-animate="hero-cta" className={styles.ctaGroup}>
          <a
            ref={magneticWorkRef}
            href="#projects"
            onClick={scrollToProjects}
            className={`${styles.primaryCta} magnetic-btn primary`}
            data-cursor="hover"
          >
            VIEW MY WORK <span className={styles.btnArrow}>↓</span>
          </a>

          <a
            ref={magneticCvRef}
            href={PERSONAL_INFO.cvUrl}
            download="MD_Rafi_Hoque_CV.pdf"
            className={`${styles.cvCta} magnetic-btn secondary`}
            data-cursor="link"
            title="Download Full Resume / CV"
          >
            DOWNLOAD CV <span className={styles.btnArrow}>↓</span>
          </a>

          <button
            ref={magneticTalkRef}
            onClick={openContact}
            className={`${styles.secondaryCta} magnetic-btn secondary`}
            data-cursor="hover"
          >
            LET'S TALK <span className={styles.btnArrow}>→</span>
          </button>
        </div>

        {/* Subtle Scroll Indicator */}
        <div
          data-animate="hero-scroll"
          className={styles.scrollIndicator}
          onClick={scrollToProjects}
          role="button"
          tabIndex={0}
          aria-label="Scroll to featured projects"
        >
          <span className={styles.scrollText}>SCROLL TO EXPLORE</span>
          <div className={styles.scrollMouse}>
            <span className={styles.scrollWheel}></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);
