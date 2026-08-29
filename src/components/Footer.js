import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import styles from './Footer.module.css';

/**
 * Footer Component
 * Minimalist technical footer concluding the digital portfolio experience
 * with system telemetry status, direct links, and smooth navigation.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={`site-container ${styles.footerContainer}`}>
        <div className={styles.footerTop}>
          <div className={styles.brandCol}>
            <span className={styles.brandLogo}>RH</span>
            <div className={styles.brandInfo}>
              <span className={styles.brandName}>{PERSONAL_INFO.name}</span>
              <span className={styles.brandTagline}>
                {PERSONAL_INFO.role} • {PERSONAL_INFO.focus}
              </span>
            </div>
          </div>

          <div className={styles.linksGroup}>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLink}
              data-cursor="link"
              title="GitHub Profile"
            >
              GitHub ↗
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLink}
              data-cursor="link"
              title="LinkedIn Profile"
            >
              LinkedIn ↗
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className={styles.footerLink}
              data-cursor="link"
              title="Send Direct Email"
            >
              Email ↗
            </a>
            <button
              onClick={scrollToTop}
              className={styles.backToTopBtn}
              data-cursor="hover"
              aria-label="Scroll back to top of page"
            >
              Back to Top ↑
            </button>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {currentYear} {PERSONAL_INFO.name}. Engineered with React, Three.js & Modern Systems.
          </p>
          <div className={styles.systemStatus}>
            <span className={styles.statusPulse} />
            <span className={styles.statusText}>SYS: ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
