import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import styles from './Education.module.css';

const Education = () => {
  const { isDark } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className={`${styles.education} ${isDark ? '' : styles.lightMode}`} id="education">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className={styles.title}>Education</h2>
        </motion.div>

        <motion.div
          className={styles.timeline}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className={styles.timelineItem} variants={itemVariants}>
            <motion.div
              className={styles.marker}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            />

            <motion.div
              className={styles.line}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            />

            <div className={styles.content}>
              <motion.div
                className={styles.card}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className={styles.degree}>
                  BSc in Computer Science & Engineering
                </h3>
                <p className={styles.institution}>North South University</p>
                <p className={styles.years}>2021 – Expected 2026</p>

                <div className={styles.highlights}>
                  <p className={styles.highlight}>
                    • Focused on full-stack development and algorithms
                  </p>
                  <p className={styles.highlight}>
                    • Strong foundation in DSA, OOP, and system design
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
