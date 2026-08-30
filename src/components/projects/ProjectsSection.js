import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS_DATA } from '../../data/portfolioData';
import FeaturedProjectBlock from './FeaturedProjectBlock';
import styles from './ProjectsSection.module.css';

/**
 * ProjectsSection — Editorial Selected Work Showcase
 * Clean, sequential, high-impact portfolio showcase with natural vertical scrolling.
 * Features balanced two-column desktop composition, dominant visual media,
 * and concise engineering summaries.
 */
const ProjectsSection = () => {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className={styles.projectsSection} id="projects">
      {/* Subtle Background Ambient Depth Glow */}
      <div className={styles.sectionAmbientGlow} aria-hidden="true" />

      <div className={`site-container ${styles.projectsContainer}`}>
        {/* ============================================================
            COMPACT EDITORIAL SECTION HEADER
            ============================================================ */}
        <header className={styles.sectionHeader}>
          <div className={styles.headerTopRow}>
            <div className={styles.sectionLabelGroup}>
              <span className={styles.metaDot} />
              <span className={styles.sectionLabelText}>01 // SELECTED WORK</span>
            </div>
            <div className={styles.projectCounterBadge}>
              <span className={styles.counterLabel}>FLAGSHIP SYSTEMS</span>
              <span className={styles.counterDivider}>•</span>
              <span className={styles.counterTotal}>0{PROJECTS_DATA.length} PROJECTS</span>
            </div>
          </div>

          <div className={styles.headerMainRow}>
            <h2 className={`editorial-headline ${styles.sectionTitle}`}>
              SELECTED WORK
            </h2>
            <p className={styles.sectionSubtitle}>
              A curated selection of digital products, scalable platforms, and AI systems I've designed and engineered from the ground up.
            </p>
          </div>
        </header>

        {/* ============================================================
            SEQUENTIAL PROJECT BLOCKS LIST
            ============================================================ */}
        <div className={styles.projectsList}>
          {PROJECTS_DATA.map((project, index) => (
            <FeaturedProjectBlock
              key={project.id}
              project={project}
              index={index}
              total={PROJECTS_DATA.length}
              layoutVariant={index % 2 === 0 ? 'split-left' : 'split-right'}
            />
          ))}
        </div>

        {/* ============================================================
            SECTION FOOTER / ARCHIVE TEASER
            ============================================================ */}
        <footer className={styles.sectionFooter}>
          <div className={styles.archivePromptBox}>
            <div className={styles.archivePromptInfo}>
              <span className={styles.archivePromptLabel}>ENGINEERING ARCHIVE</span>
              <h3 className={styles.archivePromptTitle}>Looking for experimental builds & utilities?</h3>
              <p className={styles.archivePromptDesc}>
                Browse through algorithmic prototypes, utilities, and open-source repositories in the complete catalogue.
              </p>
            </div>
            <Link
              to="/projects"
              className={`${styles.archiveExploreBtn} magnetic-btn secondary`}
              data-cursor="hover"
            >
              EXPLORE ALL ARCHIVES ({PROJECTS_DATA.length}) ↗
            </Link>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default React.memo(ProjectsSection);
