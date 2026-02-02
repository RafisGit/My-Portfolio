import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import styles from './Skills.module.css';

const Skills = () => {
  const { isDark } = useTheme();
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const skillsData = [
    {
      category: 'Programming Languages',
      skills: ['C++', 'Python', 'Java', 'JavaScript', 'HTML', 'CSS'],
      color: '#00d4ff',
    },
    {
      category: 'Frameworks & Libraries',
      skills: ['React', 'Node.js', 'Express.js'],
      color: '#0099ff',
    },
    {
      category: 'Tools & Technologies',
      skills: ['Git', 'GitHub', 'Docker', 'MongoDB'],
      color: '#6366f1',
    },
    {
      category: 'CS Fundamentals',
      skills: ['Data Structures', 'Algorithms', 'OOP', 'System Design'],
      color: '#00d4ff',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section className={`${styles.skills} ${isDark ? '' : styles.lightMode}`} id="skills">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className={styles.title}>Skills & Expertise</h2>
          <p className={styles.subtitle}>Technologies I work with</p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {skillsData.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className={`${styles.card} ${
                hoveredCategory === categoryIndex ? styles.hovered : ''
              }`}
              variants={cardVariants}
              onMouseEnter={() => setHoveredCategory(categoryIndex)}
              onMouseLeave={() => setHoveredCategory(null)}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
            >
              <div className={styles.categoryHeader}>
                <motion.div
                  className={styles.categoryIcon}
                  style={{ borderColor: category.color }}
                  animate={{
                    boxShadow:
                      hoveredCategory === categoryIndex
                        ? `0 0 20px ${category.color}40`
                        : 'none',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span style={{ color: category.color }}>◆</span>
                </motion.div>
                <h3 className={styles.categoryTitle}>{category.category}</h3>
              </div>

              <motion.div
                className={styles.skillsList}
                variants={containerVariants}
                initial="hidden"
                animate={hoveredCategory === categoryIndex ? 'visible' : 'hidden'}
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    className={styles.skillBadge}
                    variants={skillVariants}
                    custom={skillIndex}
                    style={{
                      borderColor: hoveredCategory === categoryIndex ? category.color : 'rgba(255, 255, 255, 0.1)',
                    }}
                    whileHover={{
                      backgroundColor: `${category.color}20`,
                      borderColor: category.color,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>

              {/* Default view */}
              {hoveredCategory !== categoryIndex && (
                <motion.div className={styles.skillsPreview}>
                  {category.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className={styles.previewBadge}>
                      {skill}
                    </span>
                  ))}
                  {category.skills.length > 3 && (
                    <span className={styles.moreIndicator}>
                      +{category.skills.length - 3}
                    </span>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
