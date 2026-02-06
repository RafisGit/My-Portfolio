import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import styles from './Projects.module.css';

const Projects = () => {
  const { isDark } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Featured Project: Dhakaiaa Jamdani E-commerce
  const featuredProject = {
    id: 'dhakaiaa',
    name: 'Dhakaiaa Jamdani E-commerce',
    label: 'Featured Project',
    shortDescription: 'A modern e-commerce platform specializing in traditional Dhakaiaa Jamdani products with advanced features.',
    fullDescription: 'A comprehensive e-commerce solution built with Next.js and modern web technologies. This platform showcases traditional Dhakaiaa Jamdani products with a seamless shopping experience.',
    techStackList: ['Next.js', 'React', 'TypeScript', 'Supabase'],
    techStackFull: [
      'Next.js',
      'React',
      'TypeScript',
      'Supabase',
      'PostgreSQL',
      'Tailwind CSS',
      'Redux Toolkit',
      'DaisyUI',
      'Resend',
      'Nodemailer',
    ],
    features: [
      'Modern, responsive UI',
      'Product filtering & sorting',
      'Secure authentication',
      'Cart & checkout flow',
      'Email notifications',
      'Admin-ready architecture',
    ],
    links: {
      github: 'https://github.com/RafisGit/Dhakaiaa-Jamdani-Ecommerce',
      demo: 'https://dhakaiaa-jamdani.vercel.app/',
    },
  };

  // More Projects
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
  };

  const detailsVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.1 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const tagVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.4 },
    }),
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
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

      {/* Featured Project Preview Layout */}
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.projectPreviewLayout}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Left: Project Image */}
            <motion.div
              className={styles.projectImageWrapper}
              variants={imageVariants}
            >
              <motion.div
                className={styles.projectImageContainer}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
                onClick={() => openModal(featuredProject)}
                role="button"
                tabIndex={0}
              >
                <div className={styles.projectImage}>
                  <div className={styles.imagePlaceholder}>
                    <span>🛍️ E-commerce Platform</span>
                    <p>Dhakaiaa Jamdani Shop</p>
                  </div>
                </div>
                <div className={styles.imageGlow}></div>
              </motion.div>
              <p className={styles.clickHint}>Click to view case study</p>
            </motion.div>

            {/* Right: Project Details */}
            <motion.div className={styles.projectDetails} variants={detailsVariants}>
              <motion.span
                className={styles.featuredLabel}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {featuredProject.label}
              </motion.span>

              <h2 className={styles.projectTitle}>{featuredProject.name}</h2>

              <p className={styles.projectDescription}>{featuredProject.shortDescription}</p>

              {/* Tech Stack (Preview) */}
              <div className={styles.techStackPreview}>
                <p className={styles.techLabel}>Tech Stack:</p>
                <div className={styles.techListPreview}>
                  {featuredProject.techStackList.map((tech, idx) => (
                    <span key={idx} className={styles.techItemPreview}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <motion.div
                className={styles.actionButtonsPreview}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.a
                  href={featuredProject.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.button} ${styles.viewCodeBtn}`}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  variants={itemVariants}
                >
                  View Code
                </motion.a>
                <motion.button
                  className={`${styles.button} ${styles.liveDemoBtn}`}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal(featuredProject)}
                  variants={itemVariants}
                >
                  Live Demo
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* More Projects Section */}
      <section className={styles.moreProjectsSection}>
        <div className={styles.container}>
          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            More Projects
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
                onClick={() => openModal(project)}
                role="button"
                tabIndex={0}
              >
                <motion.div
                  className={styles.projectCard}
                  whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(0, 212, 255, 0.15)' }}
                  transition={{ duration: 0.3 }}
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

      {/* Modal Overlay */}
      <AnimatePresence>
        {modalOpen && selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              className={styles.modalBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeModal}
            />

            {/* Modal */}
            <motion.div
              className={styles.modalContainer}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Close Button */}
              <motion.button
                className={styles.closeButton}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeModal}
                aria-label="Close modal"
              >
                ✕
              </motion.button>

              {/* Scrollable Content */}
              <div className={styles.modalContent}>
                {/* Project Image */}
                <motion.div
                  className={styles.modalImageContainer}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className={styles.modalImage}>
                    <div className={styles.imagePlaceholder}>
                      <span>{selectedProject.cardIcon || '📦'}</span>
                      <p>{selectedProject.name}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Project Title */}
                <motion.h2
                  className={styles.modalTitle}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {selectedProject.name}
                </motion.h2>

                {/* Tech Stack Tags */}
                <motion.div
                  className={styles.techStackFull}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <p className={styles.techStackTitle}>Tech Stack</p>
                  <motion.div
                    className={styles.techTagsContainer}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {selectedProject.techStackFull.map((tech, idx) => (
                      <motion.span
                        key={idx}
                        className={styles.techTag}
                        custom={idx}
                        variants={tagVariants}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  className={styles.modalButtons}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <motion.a
                    href={selectedProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.button} ${styles.viewCodeBtn}`}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🔗 View Code
                  </motion.a>
                  {selectedProject.links.demo !== '#' && (
                    <motion.a
                      href={selectedProject.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.button} ${styles.liveDemoBtn}`}
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      🌐 Live Demo
                    </motion.a>
                  )}
                  {selectedProject.links.demo === '#' && (
                    <motion.button
                      className={`${styles.button} ${styles.liveDemoBtn}`}
                      disabled
                      style={{ opacity: 0.6, cursor: 'not-allowed' }}
                    >
                      🌐 Coming Soon
                    </motion.button>
                  )}
                </motion.div>

                {/* Description */}
                <motion.div
                  className={styles.descriptionSection}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <h3>About the Project</h3>
                  <p>{selectedProject.fullDescription}</p>
                </motion.div>

                {/* Key Features */}
                <motion.div
                  className={styles.featuresSection}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <h3>Key Features</h3>
                  <motion.ul
                    className={styles.featuresList}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {selectedProject.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        className={styles.featureItem}
                        variants={itemVariants}
                      >
                        <span className={styles.featureDot}>✓</span>
                        {feature}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
