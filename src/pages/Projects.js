import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import ProjectDetailsModal from '../components/ProjectDetailsModal';
import styles from './Projects.module.css';

const Projects = () => {
  const { isDark } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // All Projects
  const moreProjects = [
    {
      id: 'ai-cv-maker',
      name: 'AI-Powered CV Maker & ATS Optimization Platform',
      shortDescription: 'Production-grade resume builder with structured JSON architecture and AI-assisted features for ATS optimization.',
      cardIcon: '📄',
      techStackList: ['Next.js', 'FastAPI', 'TypeScript', 'LangChain'],
      techStackFull: [
        'Next.js',
        'App Router',
        'TypeScript',
        'Tailwind CSS',
        'Framer Motion',
        'FastAPI',
        'Python',
        'LangChain',
        'LLMs',
        'JSON Persistence',
      ],
      fullDescription: 'A production-grade resume builder engineered with Next.js and FastAPI that leverages structured JSON architecture and AI capabilities. The system enables users to create pixel-accurate professional resumes, optimize content for Applicant Tracking Systems, and tailor applications for specific job descriptions. Through intelligent JSON-based data handling and AI-powered features, it delivers real-time ATS scoring, contextual bullet rewriting, and comprehensive skill gap analysis.',
      features: [
        'Draft save & load system with persistent storage',
        'Pixel-accurate template rendering with exact spacing control',
        'Live resume preview with real-time formatting updates',
        'PDF export with production-grade layout fidelity',
        'AI-powered bullet point optimization for impact & clarity',
        'ATS compatibility scoring with keyword density analysis',
        'Job-specific resume tailoring using extracted job descriptions',
        'Skill gap analysis with industry benchmark comparison',
      ],
      links: {
        github: 'https://github.com/RafisGit/AI-CVmaker',
        demo: '#',
      },
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
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
              Showcasing real products built with modern technologies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className={styles.moreProjectsSection}>
        <div className={styles.container}>
          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            My Projects
          </motion.h2>

          <motion.div
            className={styles.projectsGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {moreProjects.map((project) => (
              <motion.div
                key={project.id}
                className={styles.projectCardWrapper}
                variants={cardVariants}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openModal(project)}
              >
                <motion.div
                  className={styles.projectCard}
                  whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(0, 212, 255, 0.15)' }}
                  transition={{ duration: 0.3 }}
                  onClick={() => openModal(project)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={styles.cardIcon}>{project.cardIcon}</div>
                  <h3 className={styles.cardTitle}>{project.name}</h3>
                  <p className={styles.cardDescription}>{project.shortDescription}</p>

                  {/* Tech Stack */}
                  <div className={styles.cardTechStack}>
                    {project.techStackList.slice(0, 4).map((tech, idx) => (
                      <span key={idx} className={styles.cardTechBadge}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className={styles.cardCTA}>
                    <span className={styles.viewDetailsText}>View Details</span>
                    <span className={styles.arrowIcon}>→</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Project Details Modal */}
      <ProjectDetailsModal
        isOpen={modalOpen}
        project={selectedProject}
        onClose={closeModal}
      />

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
