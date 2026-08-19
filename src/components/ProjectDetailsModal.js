import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import ProjectStatusBadge from './ProjectStatusBadge';
import ProjectImage from './ProjectImage';
import SystemArchitectureDiagram from './SystemArchitectureDiagram';
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

  // Focus trap
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
    visible: { opacity: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      y: 15,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className={styles.overlay} onClick={onClose}>
            <motion.div
              className={`${styles.modal} glass-panel ${!isDark ? styles.lightMode : ''}`}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Header Bar */}
              <div className={styles.header}>
                <div className={styles.headerMeta}>
                  <div className={styles.categoryBadgeRow}>
                    <span className={styles.projectNumber}>{project.number || '01'}</span>
                    <span className={styles.categoryBadge}>{project.category}</span>
                    <span className={styles.yearBadge}>{project.year}</span>
                    <ProjectStatusBadge status={project.status || 'LIVE DEMO'} />
                  </div>
                  <h2 id="modal-title" className={styles.title}>
                    {project.name}
                  </h2>
                  <p className={styles.tagline}>{project.tagline}</p>
                </div>

                <button
                  className={styles.closeBtn}
                  onClick={onClose}
                  aria-label="Close modal"
                  data-cursor="hover"
                >
                  ✕
                </button>
              </div>

              {/* Scrollable Case Study Body */}
              <div className={styles.content}>
                {/* Hero Media Preview */}
                <div className={styles.imageContainer}>
                  <ProjectImage project={project} showBadge={false} loading="eager" />
                </div>

                {/* Executive Summary & Role */}
                <div className={styles.section}>
                  <div className={styles.roleBanner}>
                    <span className={styles.roleLabel}>ENGINEERING ROLE:</span>
                    <span className={styles.roleValue}>{project.role || 'Full-Stack Engineer'}</span>
                  </div>
                  <h3 className={styles.sectionTitle}>Overview</h3>
                  <p className={styles.descriptionText}>
                    {project.overview || project.fullDescription || project.shortDescription}
                  </p>
                </div>

                {/* Problem & Solution Analysis */}
                {(project.problem || project.solution) && (
                  <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Problem & Engineered Solution</h3>
                    <div className={styles.problemSolutionGrid}>
                      <div className={styles.problemBox}>
                        <div className={styles.boxHeader}>
                          <span className={styles.boxTagRed}>CHALLENGE / PROBLEM</span>
                        </div>
                        <p className={styles.boxText}>{project.problem}</p>
                      </div>

                      <div className={styles.solutionBox}>
                        <div className={styles.boxHeader}>
                          <span className={styles.boxTagGreen}>TECHNICAL SOLUTION</span>
                        </div>
                        <p className={styles.boxText}>{project.solution}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Visual Architecture Diagram */}
                {project.architecture && (
                  <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>System Architecture</h3>
                    <SystemArchitectureDiagram
                      architecture={project.architecture}
                      projectName={project.name}
                    />
                  </div>
                )}

                {/* Key Engineering Decisions */}
                {project.engineeringDecisions && project.engineeringDecisions.length > 0 && (
                  <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Key Engineering Decisions</h3>
                    <div className={styles.decisionsList}>
                      {project.engineeringDecisions.map((item, idx) => (
                        <div key={idx} className={styles.decisionCard}>
                          <div className={styles.decisionHeader}>
                            <span className={styles.decisionNumber}>0{idx + 1}</span>
                            <h4 className={styles.decisionTitle}>{item.title}</h4>
                          </div>
                          <p className={styles.decisionBody}>
                            <strong>Decision: </strong>
                            {item.decision}
                          </p>
                          <div className={styles.decisionGrid}>
                            <div className={styles.decisionWhy}>
                              <span className={styles.subLabel}>Rationale:</span>
                              <p>{item.why}</p>
                            </div>
                            <div className={styles.decisionAlternative}>
                              <span className={styles.subLabel}>Alternative Considered:</span>
                              <p>{item.alternative}</p>
                            </div>
                          </div>
                          {item.outcome && (
                            <div className={styles.decisionOutcome}>
                              <span className={styles.subLabel}>Measured Impact:</span>
                              <p>{item.outcome}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Engineering Trade-Offs */}
                {project.tradeOffs && project.tradeOffs.length > 0 && (
                  <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Engineering Trade-Offs</h3>
                    <div className={styles.tradeOffsGrid}>
                      {project.tradeOffs.map((item, idx) => (
                        <div key={idx} className={styles.tradeOffCard}>
                          <div className={styles.tradeOffHeader}>
                            <span className={styles.tradeOffArea}>{item.area}</span>
                          </div>
                          <div className={styles.tradeOffRow}>
                            <span className={styles.tradeOffBadgeChosen}>CHOSEN:</span>
                            <span className={styles.tradeOffText}>{item.chosen}</span>
                          </div>
                          <div className={styles.tradeOffRow}>
                            <span className={styles.tradeOffBadgeAlt}>ALTERNATIVE:</span>
                            <span className={styles.tradeOffText}>{item.alternative}</span>
                          </div>
                          <div className={styles.tradeOffReason}>
                            <strong>Why: </strong>
                            {item.reason}
                          </div>
                          <div className={styles.tradeOffCompromise}>
                            <strong>Accepted Compromise: </strong>
                            {item.compromise}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Technical Challenges */}
                {project.challenges && project.challenges.length > 0 && (
                  <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Technical Obstacles & Solutions</h3>
                    <div className={styles.challengesList}>
                      {project.challenges.map((c, idx) => (
                        <div key={idx} className={styles.challengeItem}>
                          <div className={styles.challengeHeader}>
                            <span className={styles.challengeDot}>⚠️</span>
                            <span className={styles.challengeTitle}>{c.challenge}</span>
                          </div>
                          <div className={styles.challengeSolution}>
                            <strong>Resolution: </strong>
                            {c.solution}
                          </div>
                          <div className={styles.challengeImpact}>
                            <strong>Result: </strong>
                            {c.impact}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Core Features */}
                {project.features && project.features.length > 0 && (
                  <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Key Capabilities & Features</h3>
                    <ul className={styles.featuresList}>
                      {project.features.map((feature, idx) => (
                        <li key={idx} className={styles.featureItem}>
                          <span className={styles.bulletPoint}>▹</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Full Tech Stack */}
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Technologies & Tooling</h3>
                  <div className={styles.techStackGrid}>
                    {(project.technologies || project.techStackList || []).map((tech, idx) => (
                      <span key={idx} className={styles.techBadge}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className={styles.footer}>
                <div className={styles.actionLinks}>
                  {project.links?.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.demoBtn} magnetic-btn primary`}
                      data-cursor="link"
                    >
                      View Live Project ↗
                    </a>
                  )}

                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.githubBtn} magnetic-btn secondary`}
                      data-cursor="link"
                    >
                      Source Code ↗
                    </a>
                  )}
                </div>

                <button onClick={onClose} className={styles.dismissBtn} data-cursor="hover">
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default React.memo(ProjectDetailsModal);
