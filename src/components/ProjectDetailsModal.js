import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import styles from './ProjectDetailsModal.module.css';

const ProjectDetailsModal = ({ isOpen, project, onClose }) => {
  const { isDark } = useTheme();

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Focus trap - trap focus inside modal
  useEffect(() => {
    if (isOpen) {
      const focusableElements = document.querySelectorAll(
        `button, a, [tabindex]:not([tabindex="-1"])`
      );
      const firstElement = focusableElements[0];
      firstElement?.focus();
    }
  }, [isOpen]);

  if (!project) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.25, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={`${styles.backdrop} ${!isDark ? styles.lightModeBg : ''}`}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            className={styles.overlay}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={`${styles.modal} ${!isDark ? styles.lightMode : ''}`}
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Header */}
              <div className={styles.header}>
                <h2 id="modal-title" className={styles.title}>
                  {project.name}
                </h2>
                <motion.button
                  className={styles.closeBtn}
                  onClick={onClose}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close modal"
                >
                  ✕
                </motion.button>
              </div>

              {/* Body - Scrollable Content */}
              <div className={styles.content}>
                {/* Project Image */}
                <motion.div
                  className={styles.imageContainer}
                  variants={itemVariants}
                >
                  <div className={styles.image}>
                    <span className={styles.imageIcon}>
                      {project.cardIcon || '📦'}
                    </span>
                    <p className={styles.imageText}>{project.name}</p>
                  </div>
                </motion.div>

                {/* Description */}
                <motion.div
                  className={styles.section}
                  variants={itemVariants}
                >
                  <p className={styles.description}>
                    {project.fullDescription}
                  </p>
                </motion.div>

                {/* Tech Stack */}
                <motion.div
                  className={styles.section}
                  variants={itemVariants}
                >
                  <h3 className={styles.sectionTitle}>Tech Stack</h3>
                  <motion.div
                    className={styles.techStack}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {project.techStackFull.map((tech, idx) => (
                      <motion.span
                        key={idx}
                        className={styles.techBadge}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Features */}
                <motion.div
                  className={styles.section}
                  variants={itemVariants}
                >
                  <h3 className={styles.sectionTitle}>Key Features</h3>
                  <motion.ul
                    className={styles.featuresList}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {project.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        className={styles.featureItem}
                        variants={itemVariants}
                      >
                        <span className={styles.checkmark}>✓</span>
                        {feature}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </div>

              {/* Footer - Action Buttons */}
              <div className={styles.footer}>
                <motion.a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.btn} ${styles.btnGithub}`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className={styles.btnIcon}>🔗</span>
                  View Code
                </motion.a>

                {project.links.demo !== '#' ? (
                  <motion.a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.btn} ${styles.btnDemo}`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className={styles.btnIcon}>🌐</span>
                    Live Demo
                  </motion.a>
                ) : (
                  <button
                    className={`${styles.btn} ${styles.btnDisabled}`}
                    disabled
                  >
                    <span className={styles.btnIcon}>🌐</span>
                    Coming Soon
                  </button>
                )}

                <motion.button
                  onClick={onClose}
                  className={`${styles.btn} ${styles.btnClose}`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailsModal;
