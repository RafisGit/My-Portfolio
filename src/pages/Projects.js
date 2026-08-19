import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS_DATA } from '../data/portfolioData';
import ProjectDetailsModal from '../components/ProjectDetailsModal';
import ProjectStatusBadge from '../components/ProjectStatusBadge';
import ProjectImage from '../components/ProjectImage';
import styles from './Projects.module.css';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <main className={styles.projectsPage}>
      {/* Header */}
      <section className={styles.headerSection}>
        <div className={`site-container ${styles.headerContainer}`}>
          <Link to="/" className={styles.backLink} data-cursor="hover">
            <span>←</span> Back to Main Showcase
          </Link>
          <span className="section-label">Engineering Archive</span>
          <h1 className={`editorial-headline ${styles.pageTitle}`}>
            ALL PROJECTS & CASE STUDIES
          </h1>
          <p className={styles.pageSubtitle}>
            A complete catalogue of full-stack web platforms, AI assistants, and production applications engineered with modern technologies.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className={styles.gridSection}>
        <div className={`site-container ${styles.gridContainer}`}>
          <div className={styles.projectsGrid}>
            {PROJECTS_DATA.map((project) => (
              <div key={project.id} className={`${styles.projectCard} glass-panel`}>
                {/* Media Preview */}
                <div className={styles.cardMedia}>
                  <ProjectImage
                    project={project}
                    loading="lazy"
                    onClick={() => openModal(project)}
                  />
                </div>

                {/* Content */}
                <div className={styles.cardContent}>
                  <div className={styles.cardMeta}>
                    <span className={styles.projectNumber}>{project.number}</span>
                    <span className={styles.projectCategory}>{project.category}</span>
                    <span className={styles.projectYear}>{project.year}</span>
                    <ProjectStatusBadge status={project.status || 'LIVE DEMO'} />
                  </div>

                  <h2 className={styles.projectName}>{project.name}</h2>
                  <p className={styles.projectTagline}>{project.tagline}</p>
                  <p className={styles.projectDescription}>{project.shortDescription}</p>

                  <div className={styles.techTags}>
                    {project.techStackSummary.map((tech, idx) => (
                      <span key={idx} className={styles.techBadge}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className={styles.cardFooter}>
                    <button
                      onClick={() => openModal(project)}
                      className={`${styles.detailsBtn} magnetic-btn primary`}
                      data-cursor="hover"
                    >
                      Case Study <span>→</span>
                    </button>

                    <div className={styles.linkGroup}>
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.externalLink}
                          data-cursor="link"
                        >
                          Demo ↗
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.externalLink}
                          data-cursor="link"
                        >
                          Code ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep-dive Case Study Modal */}
      <ProjectDetailsModal
        isOpen={modalOpen}
        project={selectedProject}
        onClose={closeModal}
      />
    </main>
  );
};

export default React.memo(Projects);
