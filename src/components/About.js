import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import styles from './About.module.css';

const About = () => {
  const { isDark } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className={`${styles.about} ${isDark ? '' : styles.lightMode}`} id="about">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className={styles.title}>About Me</h2>
        </motion.div>

        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className={styles.card} variants={itemVariants}>
            <p className={styles.text}>
              I am a Computer Science student with a strong interest in building efficient,
              scalable, and user-focused software solutions. I enjoy working across the stack,
              from designing clean front-end interfaces to developing reliable back-end systems.
            </p>
            <p className={styles.text}>
              Currently, I am seeking internship opportunities where I can apply my
              problem-solving skills, strengthen my software engineering fundamentals,
              and contribute to real-world projects.
            </p>
          </motion.div>

          <motion.div className={styles.stats} variants={itemVariants}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>150+</div>
              <div className={styles.statLabel}>DSA Problems</div>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>6+</div>
              <div className={styles.statLabel}>Projects</div>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>2026</div>
              <div className={styles.statLabel}>Graduation</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
