import React from 'react';
import { useContact } from '../../context/ContactContext';
import { useMagnetic } from '../../hooks/useMagnetic';
import { PERSONAL_INFO } from '../../data/portfolioData';
import styles from './HeroTypography.module.css';

/**
 * HeroTypography
 * Establishes MD. RAFI HOQUE as the unmistakable primary visual focal point.
 * Features an intelligent soft focal depth vignette, architectural two-line composition,
 * crisp off-white typography, and clear hierarchical subordination of secondary details.
 */
const HeroTypography = ({ onScrollToProjects }) => {
  const { openContact } = useContact();
  const magneticWorkRef = useMagnetic(0.25);
  const magneticCvRef = useMagnetic(0.25);
  const magneticTalkRef = useMagnetic(0.25);

  return (
    <div className={styles.typographyWrapper}>
      {/* Subtle Dynamic Focal Depth Vignette & Diffused Rim Glow */}
      <div className={styles.focalDepthVignette} aria-hidden="true" />
      <div className={styles.ambientTextRimLight} aria-hidden="true" />

      {/* Top Technical Telemetry HUD Bar */}
      <div data-animate="hero-hud" className={styles.hudTopBar}>
        <div className={styles.hudItem}>
          <span className={styles.hudDot}></span>
          <span className={styles.hudText}>SYS: ACTIVE // v2.6</span>
        </div>
        <div className={`${styles.hudItem} ${styles.hudDesktopOnly}`}>
          <span className={styles.hudText}>LOC: DHAKA, BD [23.81° N, 90.41° E]</span>
        </div>
        <div className={styles.hudItem}>
          <span className={styles.hudText}>PORTFOLIO 2026</span>
        </div>
      </div>

      {/* Availability / Status Pill */}
      <div data-animate="hero-label" className={styles.statusPill}>
        <span className={styles.statusPulseDot}></span>
        <span className={styles.statusText}>{PERSONAL_INFO.status}</span>
      </div>

      {/* PRIMARY FOCAL POINT: Two-Line Architectural Name */}
      <h1 data-animate="hero-name" className={styles.nameHeading} aria-label="Md. Rafi Hoque">
        <span className={`${styles.nameLine} ${styles.nameFirst}`}>MD. RAFI</span>
        <span className={`${styles.nameLine} ${styles.nameLast}`}>HOQUE</span>
      </h1>

      {/* Secondary: Role & Specialization Technical Pill */}
      <div data-animate="hero-role" className={styles.roleContainer}>
        <div className={styles.rolePill}>
          <span className={styles.rolePrimary}>{PERSONAL_INFO.role}</span>
          <span className={styles.roleSeparator}>•</span>
          <span className={styles.roleFocus}>{PERSONAL_INFO.focus}</span>
        </div>
      </div>

      {/* Tertiary: Supporting Editorial Headline */}
      <p data-animate="hero-text" className={styles.supportingStatement}>
        {PERSONAL_INFO.headline}
      </p>

      {/* Action CTAs */}
      <div data-animate="hero-cta" className={styles.ctaGroup}>
        <a
          ref={magneticWorkRef}
          href="#projects"
          onClick={onScrollToProjects}
          className={`${styles.primaryCta} magnetic-btn primary`}
          data-cursor="hover"
        >
          VIEW WORK <span className={styles.btnArrow}>↓</span>
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
          className={`${styles.talkCta} magnetic-btn secondary`}
          data-cursor="hover"
        >
          LET'S TALK <span className={styles.btnArrow}>→</span>
        </button>
      </div>

      {/* Subtle Scroll Indicator */}
      <div
        data-animate="hero-scroll"
        className={styles.scrollIndicator}
        onClick={onScrollToProjects}
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
  );
};

export default React.memo(HeroTypography);
