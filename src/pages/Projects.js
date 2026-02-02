import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import styles from './Projects.module.css';

const Projects = () => {
  const { isDark } = useTheme();

  const projects = [
    {
      title: 'DSA Practice (Ongoing)',
      category: 'Data Structures & Algorithms',
      description:
        'Building a strong foundation in algorithms and data structures through regular problem-solving on LeetCode and HackerRank.',
      status: 'in-progress',
      skills: ['C++', 'Python', 'Problem Solving'],
      highlights: ['150+ problems solved', 'Focus on optimization', 'Multiple approaches'],
    },
    {
      title: 'React Learning Projects',
      category: 'Frontend Development',
      description:
        'Exploring component-based architecture, state management, and animation libraries through hands-on projects.',
      status: 'in-progress',
      skills: ['React', 'Framer Motion', 'CSS'],
      highlights: ['Reusable components', 'Animation patterns', 'Responsive design'],
    },
    {
      title: 'Backend Practice with Node.js',
      category: 'Backend Development',
      description:
        'Building RESTful APIs and understanding database management, middleware, and server-side architecture.',
      status: 'in-progress',
      skills: ['Node.js', 'Express.js', 'MongoDB'],
      highlights: ['RESTful APIs', 'Database design', 'Authentication'],
    },
  ];

  const roadmap = [
    { icon: '⚡', title: 'Advanced React', description: 'Context API, Hooks, Performance optimization' },
    { icon: '🔌', title: 'Backend APIs', description: 'Scalable server architecture and design patterns' },
    { icon: '🏗️', title: 'System Fundamentals', description: 'Databases, caching, deployment strategies' },
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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <motion.main
      className={`${styles.projects} ${isDark ? '' : styles.lightMode}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={styles.title}>My Projects</h1>
            <p className={styles.subtitle}>
              Currently building and learning through hands-on practice.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className={styles.projectsSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.grid}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className={styles.projectCard}
                variants={cardVariants}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.cardHeader}>
                  <motion.div
                    className={`${styles.status} ${styles[project.status]}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className={styles.statusDot}></span>
                    {project.status === 'in-progress' ? 'In Progress' : 'Completed'}
                  </motion.div>
                </div>

                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectCategory}>{project.category}</p>
                <p className={styles.projectDescription}>{project.description}</p>

                <div className={styles.skills}>
                  {project.skills.map((skill, idx) => (
                    <span key={idx} className={styles.skillBadge}>
                      {skill}
                    </span>
                  ))}
                </div>

                <div className={styles.highlights}>
                  {project.highlights.map((highlight, idx) => (
                    <p key={idx} className={styles.highlight}>
                      ✓ {highlight}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className={styles.roadmapSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.roadmapHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.roadmapTitle}>Future Roadmap</h2>
            <p className={styles.roadmapSubtitle}>
              What I'm actively preparing for next
            </p>
          </motion.div>

          <motion.div
            className={styles.roadmapGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {roadmap.map((item, index) => (
              <motion.div
                key={index}
                className={styles.roadmapCard}
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className={styles.roadmapIcon}>{item.icon}</div>
                <h3 className={styles.roadmapItemTitle}>{item.title}</h3>
                <p className={styles.roadmapDescription}>{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Back Link */}
      <section className={styles.backSection}>
        <motion.div
          className={styles.container}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="/"
            className={styles.backLink}
            whileHover={{ x: -5 }}
            transition={{ duration: 0.3 }}
          >
            <span>←</span> Back to Home
          </motion.a>
        </motion.div>
      </section>
    </motion.main>
  );
};

export default Projects;
