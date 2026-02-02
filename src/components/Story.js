import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import styles from './Story.module.css';

const Story = () => {
  const { isDark } = useTheme();

  const storySteps = [
    {
      number: '01',
      title: 'Passion for Problem-Solving',
      description: 'I discovered my love for programming through solving complex problems. Every algorithm, every bug fix taught me something new about logic and persistence.',
    },
    {
      number: '02',
      title: 'Full-Stack Development',
      description: 'From frontend interfaces to backend systems, I found my calling in building complete solutions. The ability to see a product from conception to production fascinates me.',
    },
    {
      number: '03',
      title: 'Scalable Systems',
      description: 'I believe great software starts with strong fundamentals. DSA, system design, and clean code practices form the foundation of everything I build.',
    },
    {
      number: '04',
      title: 'Real-World Impact',
      description: 'Now I am seeking opportunities to apply my skills, learn from experienced engineers, and contribute to projects that matter. Internships are my pathway to growth.',
    },
  ];

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

  const stepVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className={`${styles.story} ${isDark ? '' : styles.lightMode}`}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className={styles.title}>My Journey</h2>
          <p className={styles.subtitle}>From curiosity to expertise</p>
        </motion.div>

        <motion.div
          className={styles.timeline}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {storySteps.map((step, index) => (
            <motion.div key={index} className={styles.step} variants={stepVariants}>
              <div className={styles.stepContent}>
                <div className={styles.number}>{step.number}</div>
                <div className={styles.textContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
              </div>
              {index < storySteps.length - 1 && (
                <motion.div
                  className={styles.connector}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Story;
