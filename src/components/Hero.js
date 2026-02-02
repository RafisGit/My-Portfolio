import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUpVariants } from '../utils/animations';
import { useTheme } from '../context/ThemeContext';
import styles from './Hero.module.css';

const Hero = () => {
  const { isDark } = useTheme();

  return (
    <section className={`${styles.hero} ${isDark ? '' : styles.lightMode}`}>
      {/* Animated background elements */}
      <div className={styles.bgElements}>
        <motion.div
          className={styles.orb1}
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className={styles.orb2}
          animate={{
            y: [0, -30, 0],
            x: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className={styles.orb3}
          animate={{
            y: [0, 20, 0],
            x: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.15, delayChildren: 0.2 },
            },
          }}
        >
          {/* Intro Text */}
          <motion.p
            className={styles.intro}
            variants={fadeInUpVariants}
            custom={0}
          >
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            className={styles.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span className={styles.firstName}>MD.</span>
            <span className={styles.lastName}>RAFI HOQUE</span>
          </motion.h1>

          {/* Title */}
          <motion.div
            className={styles.title}
            variants={fadeInUpVariants}
            custom={1}
          >
            <span className={styles.titleGradient}>Computer Science Student</span>
            <span className={styles.divider}>|</span>
            <span>Aspiring Full-Stack Developer</span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className={styles.tagline}
            variants={fadeInUpVariants}
            custom={2}
          >
            Building scalable and efficient software solutions
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className={styles.cta}
            variants={fadeInUpVariants}
            custom={3}
          >
          

            <motion.a
              href="https://github.com/RafisGit"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.button} ${styles.secondary}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>GitHub Profile</span>
              <span>↗</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className={styles.scrollIndicator}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className={styles.mouse}>
            <motion.div
              className={styles.wheel}
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <p>Scroll to explore</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
