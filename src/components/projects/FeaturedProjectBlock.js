import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMagnetic } from '../../hooks/useMagnetic';
import ProjectStatusBadge from '../ProjectStatusBadge';
import ProjectImage from '../ProjectImage';
import styles from './ProjectsSection.module.css';

/**
 * FeaturedProjectBlock
 * High-impact, editorial project preview block for the Selected Work showcase.
 * Features balanced 2-column desktop composition, dominant 16:9 visual media,
 * concise 1-2 line summaries, and direct case study access.
 */
const FeaturedProjectBlock = ({
  project,
  index,
  total,
  layoutVariant = 'split-left',
}) => {
  const blockRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const magneticCtaRef = useMagnetic(0.3);
  const magneticDemoRef = useMagnetic(0.2);
  const magneticCodeRef = useMagnetic(0.2);

  const formattedIndex = String(index + 1).padStart(2, '0');

  // Primary 3-4 key technologies for fast scanning
  const displayTechnologies =
    project.techStackSummary || (project.technologies ? project.technologies.slice(0, 4) : []);

  return (
    <article
      ref={blockRef}
      id={`project-${project.id}`}
      className={`${styles.projectBlock} ${styles[layoutVariant]} glass-panel`}
      data-project-id={project.id}
      aria-labelledby={`project-heading-${project.id}`}
    >
      <div className={styles.blockInner}>
        {/* ============================================================
            1. PROJECT INFORMATION COLUMN
            ============================================================ */}
        <div className={styles.infoCol}>
          {/* Metadata Row: Number, Category, Year, Status */}
          <div className={styles.metaRow}>
            <span className={styles.projectNumberBadge}>{formattedIndex}</span>
            <span className={styles.categoryBadge}>{project.category}</span>
            <span className={styles.metaDivider}>•</span>
            <span className={styles.yearBadge}>{project.year}</span>
            <div className={styles.statusWrapper}>
              <ProjectStatusBadge status={project.status || 'LIVE DEMO'} />
            </div>
          </div>

          {/* Title & Tagline */}
          <div className={styles.titleGroup}>
            <h3 id={`project-heading-${project.id}`} className={styles.projectName}>
              <Link to={`/projects/${project.id}`} className={styles.titleLink}>
                {project.name}
              </Link>
            </h3>
            <p className={styles.projectTagline}>{project.tagline}</p>
          </div>

          {/* Concise 1-2 Line Description */}
          <p className={styles.projectDescription}>
            {project.shortDescription || project.overview}
          </p>

          {/* Key Technologies (Compact Pills) */}
          <div className={styles.techSection}>
            <span className={styles.techLabel}>STACK</span>
            <div className={styles.techPills}>
              {displayTechnologies.map((tech, tIdx) => (
                <span key={tIdx} className={styles.techPill}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className={styles.actionGroup}>
            <Link
              ref={magneticCtaRef}
              to={`/projects/${project.id}`}
              className={`${styles.caseStudyBtn} magnetic-btn primary`}
              data-cursor="hover"
            >
              VIEW CASE STUDY <span className={styles.btnArrow}>→</span>
            </Link>

            {project.links?.demo && (
              <a
                ref={magneticDemoRef}
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.demoBtn} magnetic-btn secondary`}
                data-cursor="link"
                title={`Open ${project.name} live application`}
                aria-label={`Open ${project.name} live application`}
              >
                LIVE SITE <span className={styles.btnArrow}>↗</span>
              </a>
            )}

            {project.links?.github && (
              <a
                ref={magneticCodeRef}
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.codeBtn} magnetic-btn secondary`}
                data-cursor="link"
                title={`View ${project.name} source code on GitHub`}
                aria-label={`View ${project.name} source code on GitHub`}
              >
                CODE <span className={styles.btnArrow}>↗</span>
              </a>
            )}
          </div>
        </div>

        {/* ============================================================
            2. DOMINANT VISUAL MEDIA COLUMN (16:9 Aspect Ratio)
            ============================================================ */}
        <div className={styles.mediaCol}>
          <Link
            to={`/projects/${project.id}`}
            className={`${styles.mediaViewport} ${isHovered ? styles.mediaHovered : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label={`Explore ${project.name} full case study`}
            data-cursor="project"
          >
            <ProjectImage
              project={project}
              loading={index < 2 ? 'eager' : 'lazy'}
              showBadge={false}
              className={styles.projectImageFrame}
            />
            <div className={styles.mediaHoverOverlay}>
              <span className={styles.exploreBadge}>VIEW CASE STUDY →</span>
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default React.memo(FeaturedProjectBlock);
