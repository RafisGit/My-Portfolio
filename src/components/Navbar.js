import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useContact } from '../context/ContactContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { openContact } = useContact();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
  ];

  return (
    <motion.nav
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''} ${isDark ? '' : styles.lightMode}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <motion.img
            src="/logo.svg"
            alt="Rafi Hoque Logo"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={styles.logoBadge}
          />
          <span className={styles.logoText}>MD. Rafi Hoque</span>
        </Link>

        {/* Desktop Menu */}
        <div className={styles.desktopMenu}>
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className={styles.navLink}>
              <motion.div
                className={`${styles.linkLabel} ${
                  location.pathname === item.path ? styles.active : ''
                }`}
                whileHover={{ color: '#e94560' }}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    className={styles.activeIndicator}
                    layoutId="activeLink"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            </Link>
          ))}
          <a
            href="https://github.com/RafisGit"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            <motion.div whileHover={{ color: '#e94560' }}>GitHub</motion.div>
          </a>
          <motion.button
            onClick={openContact}
            className={styles.navLink}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div whileHover={{ color: '#e94560' }}>Contact</motion.div>
          </motion.button>
          <motion.a
            href="/cv.pdf"
            download
            className={styles.cvButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download CV
          </motion.a>
        </div>

        {/* Theme Toggle & Mobile Menu */}
        <div className={styles.controls}>
          <motion.button
            onClick={toggleTheme}
            className={styles.themeToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Toggle theme"
          >
            {isDark ? '☀️' : '🌙'}
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className={`${styles.menuButton} ${isMenuOpen ? styles.open : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <span></span>
            <span></span>
            <span></span>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.active : ''}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          height: isMenuOpen ? 'auto' : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={styles.mobileLink}
            onClick={() => setIsMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <a
          href="https://github.com/RafisGit"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mobileLink}
        >
          GitHub
        </a>
        <button
          onClick={() => {
            openContact();
            setIsMenuOpen(false);
          }}
          className={`${styles.mobileLink} ${styles.mobileContactBtn}`}
        >
          Contact
        </button>
        <a
          href="/cv.pdf"
          download
          className={`${styles.mobileLink} ${styles.mobileCvBtn}`}
          onClick={() => setIsMenuOpen(false)}
        >
          Download CV
        </a>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
