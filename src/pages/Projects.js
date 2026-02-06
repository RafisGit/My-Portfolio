import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import styles from './Projects.module.css';

const Projects = () => {
  const { isDark } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);

  // Dhakaiaa Jamdani E-commerce Project Data
  const project = {
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

  const tagVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.4 },
    }),
  };

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
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
                onClick={openModal}
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
                {project.label}
              </motion.span>

              <h2 className={styles.projectTitle}>{project.name}</h2>

              <p className={styles.projectDescription}>{project.shortDescription}</p>

              {/* Tech Stack (Preview) */}
              <div className={styles.techStackPreview}>
                <p className={styles.techLabel}>Tech Stack:</p>
                <div className={styles.techListPreview}>
                  {project.techStackList.map((tech, idx) => (
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
                  href={project.links.github}
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
                  onClick={openModal}
                  variants={itemVariants}
                >
                  Live Demo
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Modal Overlay */}
      <AnimatePresence>
        {modalOpen && (
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
                      <span>🛍️ E-commerce Platform</span>
                      <p>Dhakaiaa Jamdani Shop</p>
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
                  {project.name}
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
                    {project.techStackFull.map((tech, idx) => (
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
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.button} ${styles.viewCodeBtn}`}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🔗 View Code
                  </motion.a>
                  <motion.a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.button} ${styles.liveDemoBtn}`}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🌐 Live Demo
                  </motion.a>
                </motion.div>

                {/* Description */}
                <motion.div
                  className={styles.descriptionSection}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <h3>About the Project</h3>
                  <p>{project.fullDescription}</p>
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
                    {project.features.map((feature, idx) => (
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
