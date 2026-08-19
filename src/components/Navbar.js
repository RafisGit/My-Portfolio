import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useContact } from '../context/ContactContext';
import { useMagnetic } from '../hooks/useMagnetic';
import { PERSONAL_INFO } from '../data/portfolioData';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { openContact } = useContact();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const magneticTalkRef = useMagnetic(0.25);
  const magneticCvRef = useMagnetic(0.2);
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Process', href: '#process' },
    { label: 'Education', href: '#education' },
  ];

  const handleNavClick = (e, href) => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      e.preventDefault();
      navigate('/' + href);
      return;
    }

    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${!isDark ? styles.lightMode : ''}`}>
      <div className={`site-container ${styles.navContainer}`}>
        {/* Brand Logo & Name */}
        <Link to="/" className={styles.brand} onClick={(e) => handleNavClick(e, '#top')} aria-label="Home">
          <span className={styles.brandLogo}>RH</span>
          <div className={styles.brandText}>
            <span className={styles.brandName}>{PERSONAL_INFO.name}</span>
            <span className={styles.brandRole}>{PERSONAL_INFO.role}</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className={styles.desktopNav} aria-label="Main Navigation">
          <div className={styles.linksWrapper}>
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={styles.navLink}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}
            <Link
              to="/projects"
              className={`${styles.navLink} ${location.pathname === '/projects' ? styles.activeLink : ''}`}
            >
              All Projects
            </Link>
          </div>

          {/* Action CTAs & Controls */}
          <div className={styles.actionGroup}>
            <a
              ref={magneticCvRef}
              href={PERSONAL_INFO.cvUrl}
              download="MD_Rafi_Hoque_CV.pdf"
              className={`${styles.cvBtn} magnetic-btn secondary`}
              data-cursor="link"
              title="Download Full Resume / CV"
              aria-label="Download CV PDF"
            >
              CV <span>↓</span>
            </a>

            <button
              ref={magneticTalkRef}
              onClick={openContact}
              className={`${styles.talkBtn} magnetic-btn primary`}
              data-cursor="hover"
            >
              Let's Talk <span className={styles.arrowIcon}>→</span>
            </button>

            <button
              onClick={toggleTheme}
              className={styles.themeToggle}
              aria-label="Toggle theme"
              title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </nav>

        {/* Mobile Controls */}
        <div className={styles.mobileControls}>
          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label="Toggle theme"
            title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          <button
            className={`${styles.hamburger} ${isMenuOpen ? styles.isOpen : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        ref={menuRef}
        className={`${styles.mobileDrawer} ${isMenuOpen ? styles.drawerOpen : ''}`}
        aria-hidden={!isMenuOpen}
      >
        <div className={styles.mobileDrawerInner}>
          <div className={styles.mobileNavLinks}>
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={styles.mobileNavLink}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}
            <Link
              to="/projects"
              className={styles.mobileNavLink}
              onClick={() => setIsMenuOpen(false)}
            >
              All Projects Archive
            </Link>
          </div>

          <div className={styles.mobileDrawerActions}>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                openContact();
              }}
              className={`${styles.mobileTalkBtn} magnetic-btn primary`}
            >
              Let's Talk →
            </button>
            <a
              href={PERSONAL_INFO.cvUrl}
              download="MD_Rafi_Hoque_CV.pdf"
              className={`${styles.mobileCvBtn} magnetic-btn secondary`}
              onClick={() => setIsMenuOpen(false)}
              aria-label="Download CV PDF"
            >
              Download CV ↓
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Navbar);
