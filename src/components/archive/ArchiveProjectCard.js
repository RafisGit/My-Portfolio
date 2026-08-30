import React from 'react';
import { Link } from 'react-router-dom';
import ProjectStatusBadge from '../ProjectStatusBadge';
import styles from './ArchiveProjectCard.module.css';

/**
 * ArchiveProjectCard
 * Dedicated, 100% isolated card component for the /projects Archive page.
 * Keeps Archive styling strictly decoupled from Home page project presentation.
 */
const ArchiveProjectCard = ({ project, index }) => {
  const images = project.images || {};
  const webpSrc = images.webp || `${project.heroImage?.replace(/\.(png|jpg|jpeg)$/, '.webp')}`;
  const pngSrc = images.png || images.fallback || project.heroImage;
  const altText = images.alt || `${project.name} preview showcase`;

  const displayTech =
    project.techStackSummary || (project.technologies ? project.technologies.slice(0, 4) : []);

  return (
    <article
      className={`${styles.archiveCard} glass-panel`}
      data-project-id={project.id}
    >
      {/* 1. Visual Media Viewport (Fixed 16:9 Aspect Ratio) */}
      <div className={styles.mediaContainer}>
        <Link
          to={`/projects/${project.id}`}
          className={styles.mediaLink}
          aria-label={`View ${project.name} case study`}
          data-cursor="project"
        >
          <picture className={styles.cardPicture}>
            {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
            {pngSrc && <source srcSet={pngSrc} type="image/png" />}
            <img
              src={pngSrc || project.heroImage}
              alt={altText}
              loading={index < 6 ? 'eager' : 'lazy'}
              decoding="async"
              className={styles.cardImage}
              width={images.width || 1200}
              height={images.height || 750}
            />
          </picture>
          <div className={styles.mediaHoverBadge}>
            <span>Case Study ↗</span>
          </div>
        </Link>

        {/* Status Overlay Badge */}
        <div className={styles.statusPillOverlay}>
          <ProjectStatusBadge status={project.status || 'LIVE DEMO'} />
        </div>
      </div>

      {/* 2. Compact Structured Information Body */}
      <div className={styles.cardBody}>
        {/* Top Metadata Row */}
        <div className={styles.metaRow}>
          <span className={styles.numberBadge}>{project.number}</span>
          <span className={styles.categoryTag}>{project.category}</span>
          <span className={styles.yearTag}>{project.year}</span>
        </div>

        {/* Title & Tagline */}
        <div className={styles.titleGroup}>
          <h2 className={styles.projectName}>
            <Link to={`/projects/${project.id}`} className={styles.titleLink}>
              {project.name}
            </Link>
          </h2>
          <p className={styles.tagline}>{project.tagline}</p>
        </div>

        {/* Clamped 2-line Description */}
        <p className={styles.description}>
          {project.shortDescription || project.overview}
        </p>

        {/* Key Tech Badges (1 Line Compact) */}
        <div className={styles.techRow}>
          {displayTech.slice(0, 3).map((tech, tIdx) => (
            <span key={tIdx} className={styles.techPill}>
              {tech}
            </span>
          ))}
          {displayTech.length > 3 && (
            <span className={styles.techMore}>
              +{displayTech.length - 3}
            </span>
          )}
        </div>

        {/* Action Row */}
        <div className={styles.actionRow}>
          <Link
            to={`/projects/${project.id}`}
            className={`${styles.caseStudyBtn} magnetic-btn primary`}
            data-cursor="hover"
          >
            Case Study <span className={styles.btnArrow}>→</span>
          </Link>

          <div className={styles.secondaryActions}>
            {project.links?.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconBtn}
                data-cursor="link"
                title={`Open ${project.name} live application`}
                aria-label={`Open ${project.name} live application`}
              >
                Live ↗
              </a>
            )}
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconBtn}
                data-cursor="link"
                title={`View ${project.name} source code on GitHub`}
                aria-label={`View ${project.name} source code on GitHub`}
              >
                Code ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default React.memo(ArchiveProjectCard);
