import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import styles from './Footer.module.css';

const Footer = () => {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className={`${styles.footer} ${isDark ? '' : styles.lightMode}`}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.div className={styles.section} variants={itemVariants}>
            <h4>Contact</h4>
            <a href="mailto:hrafi0445@gmail.com">hrafi0445@gmail.com</a>
          </motion.div>

          <motion.div className={styles.section} variants={itemVariants}>
            <h4>Links</h4>
            <a href="https://www.linkedin.com/in/rafihoque/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com/RafisGit" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </motion.div>

          <motion.div className={styles.section} variants={itemVariants}>
            <h4>Location</h4>
            <p>Dhaka, Bangladesh</p>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.divider}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />

        <motion.div
          className={styles.bottom}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p>
            © {currentYear} MD. Rafi Hoque. Designed & Built with
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ display: 'inline-block', margin: '0 0.25rem' }}
            >
              ❤️
            </motion.span>
          </p>
          <p className={styles.stack}>React • Framer Motion • Modern CSS</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
