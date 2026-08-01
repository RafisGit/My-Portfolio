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
      heroImage: '/images/projects/cv-maker-hero.png',
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
        demo: 'https://cvmakerweb.vercel.app/',
      },
    },
    {
      id: 'valtorn-web',
      name: 'Valtorn Web Platform',
      shortDescription: 'Modern, high-performance web platform featuring intuitive UX, fast transitions, and interactive digital interfaces.',
      cardIcon: '⚡',
      heroImage: '/images/projects/valtorn-web-hero.png',
      techStackList: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
      techStackFull: [
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Framer Motion',
        'Node.js',
        'REST API',
        'Vercel Deployment',
      ],
      fullDescription: 'A sleek, modern web platform engineered for optimal user engagement and lightning-fast load times. Built with a modular component architecture, Valtorn Web delivers smooth animations, dynamic layout rendering, and optimized performance metrics.',
      features: [
        'Modular & reusable component design system',
        'Dynamic routing and responsive layout structures',
        'Optimized asset loading and render speeds',
        'Smooth micro-interactions and page transitions',
        'Cross-browser and mobile-first responsive support',
      ],
      links: {
        github: 'https://github.com/RafisGit/valtornweb',
        demo: 'https://valtornweb.vercel.app/',
      },
    },
    {
      id: 'ai-c-vmaker',
      name: 'AI Resume Suite & Career Assistant',
      shortDescription: 'Intelligent career suite for automated resume crafting, smart content generation, and instant ATS analysis.',
      cardIcon: '✨',
      heroImage: '/images/projects/ai-c-vmaker-hero.png',
      techStackList: ['React', 'Next.js', 'OpenAI API', 'Tailwind CSS'],
      techStackFull: [
        'React',
        'Next.js',
        'OpenAI API',
        'TypeScript',
        'Tailwind CSS',
        'PDF Generation Engine',
      ],
      fullDescription: 'An AI-driven career suite designed to empower job seekers by automating resume creation. It uses natural language processing to suggest impactful bullet points, format professional resume templates, and generate tailored applications.',
      features: [
        'AI-powered bullet point generator based on job roles',
        'Instant resume analysis and formatting feedback',
        'Custom section customization and dynamic layout engine',
        'One-click PDF document generation and export',
        'Clean, distraction-free user interface',
      ],
      links: {
        github: 'https://github.com/RafisGit/ai-c-vmaker',
        demo: 'https://ai-c-vmaker.vercel.app/',
      },
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
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
      transition={{ duration: 0.4 }}
    >
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={styles.title}>Featured Projects</h1>
            <p className={styles.subtitle}>
              Production-grade applications built with modern frameworks and AI capabilities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className={styles.moreProjectsSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.projectsGrid}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {moreProjects.map((project) => (
              <motion.div
                key={project.id}
                className={styles.projectCardWrapper}
                variants={cardVariants}
              >
                <div className={styles.projectCard}>
                  {/* Header Row: Title & Description */}
                  <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>{project.name}</h2>
                    <p className={styles.cardDescription}>{project.shortDescription}</p>
                  </div>

                  {/* Hero Preview Image Container */}
                  <div
                    className={styles.cardImageContainer}
                    onClick={() => openModal(project)}
                    title="Click to view full project breakdown"
                  >
                    <img
                      src={project.heroImage}
                      alt={`${project.name} Demo`}
                      className={styles.cardHeroImage}
                    />
                    <div className={styles.imageOverlay}>
                      <span>View Project Details ↗</span>
                    </div>
                  </div>

                  <div className={styles.cardDivider} />

                  {/* Tech Stack Tags */}
                  <div className={styles.cardTechStack}>
                    {project.techStackList.map((tech, idx) => (
                      <span key={idx} className={styles.cardTechBadge}>
                        {tech.toUpperCase()}
                      </span>
                    ))}
                  </div>

                  <div className={styles.cardDivider} />

                  {/* Bottom Actions */}
                  <div className={styles.cardActions}>
                    <button
                      className={styles.viewDetailsBtn}
                      onClick={() => openModal(project)}
                    >
                      View Details <span className={styles.arrow}>→</span>
                    </button>

                    <div className={styles.actionLinks}>
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.liveDemoBtn}
                        >
                          Live Demo ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
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
        <div className={styles.container}>
          <a href="/" className={styles.backLink}>
            <span>←</span> Back to Home
          </a>
        </div>
      </section>
    </motion.main>
  );
};

export default Projects;
