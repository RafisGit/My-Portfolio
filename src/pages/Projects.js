import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useContact } from '../context/ContactContext';
import styles from './Projects.module.css';

const Projects = () => {
  const { isDark } = useTheme();
  const { openContact } = useContact();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedScreenshot, setSelectedScreenshot] = useState(0);

  // AI CV Maker Project Data
  const project = {
    name: 'AI CV Maker',
    tagline: 'Build ATS-friendly, professional resumes using AI.',
    type: 'AI-powered Full-Stack Web Application',
    description: `AI CV Maker is an intelligent resume-building web application that enables users to create professional, ATS-optimized resumes using AI. Users provide their personal details, education, skills, and experience, and the system generates tailored resume content, suggests improvements, and formats the CV professionally. The platform supports resume editing, draft saving, and export-ready layouts, simulating a real production-level product.`,
    techStack: [
      { category: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS'] },
      { category: 'Backend', items: ['Node.js', 'Express.js'] },
      { category: 'Database', items: ['MongoDB'] },
      { category: 'AI', items: ['Large Language Model'] },
      { category: 'Tools', items: ['Git', 'GitHub'] },
    ],
    features: [
      { icon: '🤖', title: 'AI-powered Resume Generation', description: 'Generate professional resume content using AI' },
      { icon: '✓', title: 'ATS-friendly Resume Structure', description: 'Optimized for Applicant Tracking Systems' },
      { icon: '💡', title: 'Skill-based Content Suggestions', description: 'AI recommends improvements for each section' },
      { icon: '✏️', title: 'Resume Section Customization', description: 'Edit and customize every section easily' },
      { icon: '💾', title: 'Save & Edit Resume Drafts', description: 'Save your work and come back anytime' },
      { icon: '📥', title: 'Export-ready Professional Layout', description: 'Download as PDF with professional formatting' },
    ],
    screenshots: [
      { id: 1, title: 'Landing Page', description: 'CV Builder landing / start screen' },
      { id: 2, title: 'Resume Input Form', description: 'User information input interface' },
      { id: 3, title: 'AI Preview', description: 'AI-generated resume preview' },
      { id: 4, title: 'Edit & Save', description: 'Edit & save draft interface' },
      { id: 5, title: 'Export Resume', description: 'Export / final resume view' },
    ],
    links: {
      github: 'https://github.com/RafisGit',
      demo: '#',
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

  const screenVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  const openLightbox = (index) => {
    setSelectedScreenshot(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const nextScreenshot = () => {
    setSelectedScreenshot((prev) => (prev + 1) % project.screenshots.length);
  };

  const prevScreenshot = () => {
    setSelectedScreenshot((prev) => (prev - 1 + project.screenshots.length) % project.screenshots.length);
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
            <span className={styles.badge}>Featured Project</span>
            <h1 className={styles.title}>{project.name}</h1>
            <p className={styles.tagline}>{project.tagline}</p>
            <p className={styles.type}>{project.type}</p>
          </motion.div>
        </div>
      </section>

      {/* Project Overview */}
      <section className={styles.overview}>
        <div className={styles.container}>
          <motion.div
            className={styles.descriptionBox}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2>Project Overview</h2>
            <p>{project.description}</p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className={styles.actionButtons}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.button} ${styles.primary}`}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              🔗 View GitHub
            </motion.a>
            <motion.button
              className={`${styles.button} ${styles.secondary}`}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              disabled
            >
              🌐 Live Demo (Coming Soon)
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className={styles.techSection}>
        <div className={styles.container}>
          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Tech Stack
          </motion.h2>

          <motion.div
            className={styles.techGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {project.techStack.map((stack, idx) => (
              <motion.div key={idx} className={styles.techCategory} variants={itemVariants}>
                <h3>{stack.category}</h3>
                <div className={styles.techItems}>
                  {stack.items.map((item, i) => (
                    <span key={i} className={styles.techBadge}>
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Key Features
          </motion.h2>

          <motion.div
            className={styles.featuresGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {project.features.map((feature, idx) => (
              <motion.div
                key={idx}
                className={styles.featureCard}
                variants={featureVariants}
                custom={idx}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 212, 255, 0.2)' }}
              >
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Screenshots Gallery */}
      <section className={styles.gallerySection}>
        <div className={styles.container}>
          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Project Showcase
          </motion.h2>

          {/* Main Screenshot Display */}
          <motion.div
            className={styles.mainScreenshot}
            variants={screenVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            onClick={() => openLightbox(0)}
          >
            <div className={styles.screenshotFrame}>
              <div className={styles.mockupHeader}>
                <span>cv-maker.app</span>
              </div>
              <div className={styles.mockupContent}>
                <div className={styles.placeholderImage}>
                  <span>{project.screenshots[0].title}</span>
                  <p>{project.screenshots[0].description}</p>
                </div>
              </div>
            </div>
            <p className={styles.clickHint}>Click to view details</p>
          </motion.div>

          {/* Thumbnail Gallery */}
          <motion.div
            className={styles.thumbnailGallery}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {project.screenshots.map((screenshot, idx) => (
              <motion.div
                key={idx}
                className={styles.thumbnail}
                variants={itemVariants}
                onClick={() => openLightbox(idx)}
                whileHover={{ scale: 1.08, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={styles.thumbnailImage}>
                  <span>{screenshot.title}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <>
            <motion.div
              className={styles.lightboxBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            />
            <motion.div
              className={styles.lightboxModal}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <button className={styles.closeBtn} onClick={closeLightbox}>
                ✕
              </button>
              <div className={styles.lightboxContent}>
                <h3>{project.screenshots[selectedScreenshot].title}</h3>
                <div className={styles.lightboxImage}>
                  <span>{project.screenshots[selectedScreenshot].description}</span>
                </div>
              </div>
              <button className={styles.navBtn} onClick={prevScreenshot}>
                ←
              </button>
              <button className={styles.navBtn} onClick={nextScreenshot}>
                →
              </button>
              <p className={styles.slideCounter}>
                {selectedScreenshot + 1} / {project.screenshots.length}
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.ctaContent}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <h2>Let's Work Together</h2>
            <p>
              This project demonstrates my ability to design, build, and integrate AI-powered full-stack applications. I am actively seeking internship opportunities where I can contribute to real-world products and systems.
            </p>
            <motion.button
              className={`${styles.button} ${styles.ctaButton}`}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={openContact}
            >
              ✉️ Contact Me
            </motion.button>
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
