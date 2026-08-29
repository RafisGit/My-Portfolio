import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMagnetic } from '../../hooks/useMagnetic';
import ProjectStatusBadge from '../ProjectStatusBadge';
import ProjectImage from '../ProjectImage';
import SystemArchitectureDiagram from '../SystemArchitectureDiagram';
import styles from './ProjectsSection.module.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * FeaturedProjectBlock
 * Immersive Interactive Engineering Showcase Block.
 * Features:
 * - Dominant Media with Microscope Technical Inspection Overlay
 * - Structured 3-Part Engineering Story
 * - In-Place Live System Architecture Inspection Drawer
 * - GPU-Accelerated Parallax and Magnetic Button Triggers
 */
const FeaturedProjectBlock = ({
  project,
  index,
  total,
  layoutVariant = 'split-left',
  onOpenCaseStudy,
}) => {
  const blockRef = useRef(null);
  const mediaRef = useRef(null);
  const [isInspectingArch, setIsInspectingArch] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const magneticCtaRef = useMagnetic(0.3);
  const magneticDemoRef = useMagnetic(0.2);
  const magneticCodeRef = useMagnetic(0.2);
  const magneticArchRef = useMagnetic(0.2);

  const formattedIndex = String(index + 1).padStart(2, '0');
  const formattedTotal = String(total).padStart(2, '0');

  const handleOpen = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (onOpenCaseStudy) {
      onOpenCaseStudy(project);
    }
  };

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const block = blockRef.current;
    const media = mediaRef.current;
    if (!block || !media) return;

    // Subtle 20px image parallax within viewport bounds
    const ctx = gsap.context(() => {
      gsap.fromTo(
        media.querySelector('img') || media,
        { y: -12, scale: 1.03 },
        {
          y: 14,
          scale: 1.0,
          ease: 'none',
          scrollTrigger: {
            trigger: block,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    }, block);

    return () => ctx.revert();
  }, []);

  return (
    <article
      ref={blockRef}
      id={`project-${project.id}`}
      className={`${styles.projectBlock} ${styles[layoutVariant]} glass-panel`}
      data-project-id={project.id}
      aria-labelledby={`project-heading-${project.id}`}
    >
      {/* Top Technical Metadata Bar */}
      <div className={styles.blockMetaBar}>
        <div className={styles.metaLeft}>
          <span className={styles.projectNumberBadge}>
            {formattedIndex} <span className={styles.numberDivider}>/</span> {formattedTotal}
          </span>
          <span className={styles.categoryBadge}>{project.category}</span>
          <span className={styles.yearBadge}>{project.year}</span>
        </div>
        <div className={styles.metaRight}>
          <ProjectStatusBadge status={project.status || 'LIVE DEMO'} />
        </div>
      </div>

      {/* Main Content Grid / Flow */}
      <div className={styles.blockInner}>
        {/* Left / Primary Information Column */}
        <div className={styles.infoCol}>
          <div className={styles.titleGroup}>
            <span className={styles.roleTag}>{project.role || 'Full-Stack Engineer'}</span>
            <h3 id={`project-heading-${project.id}`} className={styles.projectName}>
              {project.name}
            </h3>
            <p className={styles.projectTagline}>{project.tagline}</p>
          </div>

          <p className={styles.projectDescription}>
            {project.shortDescription || project.overview}
          </p>

          {/* Technology Stack Pill Badges */}
          <div className={styles.techSection}>
            <span className={styles.techLabel}>STACK</span>
            <div className={styles.techPills}>
              {(project.techStackSummary || project.technologies || []).map((tech, tIdx) => (
                <span key={tIdx} className={styles.techPill}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Structured 3-Part Engineering Story */}
          {project.engineeringDomains && project.engineeringDomains.length > 0 ? (
            <div className={styles.engineeringStoryModule}>
              <div className={styles.engineeringHeader}>
                <span className={styles.engDot} />
                <span className={styles.engTitle}>ENGINEERING BREAKDOWN</span>
              </div>
              <div className={styles.domainsList}>
                {project.engineeringDomains.map((dom, dIdx) => (
                  <div key={dIdx} className={styles.domainItem}>
                    <div className={styles.domainHead}>
                      <span className={styles.domainNum}>{dom.number}</span>
                      <span className={styles.domainName}>{dom.domain}</span>
                    </div>
                    <p className={styles.domainDesc}>{dom.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            project.engineeringHighlights && project.engineeringHighlights.length > 0 && (
              <div className={styles.engineeringBox}>
                <div className={styles.engineeringHeader}>
                  <span className={styles.engDot} />
                  <span className={styles.engTitle}>ENGINEERING HIGHLIGHTS</span>
                </div>
                <ul className={styles.engineeringList}>
                  {project.engineeringHighlights.map((highlight, hIdx) => (
                    <li key={hIdx} className={styles.engineeringItem}>
                      <span className={styles.engBullet}>▹</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}

          {/* In-Place Architecture Inspection Toggle Button */}
          {project.architecture && (
            <div className={styles.archToggleWrapper}>
              <button
                ref={magneticArchRef}
                onClick={() => setIsInspectingArch(!isInspectingArch)}
                className={`${styles.archToggleBtn} ${isInspectingArch ? styles.archToggleActive : ''}`}
                data-cursor="hover"
                aria-expanded={isInspectingArch}
                aria-controls={`arch-drawer-${project.id}`}
              >
                <span className={styles.archToggleDot} />
                <span>{isInspectingArch ? 'HIDE ARCHITECTURE GRAPH' : 'INSPECT SYSTEM ARCHITECTURE'}</span>
                <span className={styles.archToggleIcon}>{isInspectingArch ? '▲' : '▼'}</span>
              </button>
            </div>
          )}

          {/* Action Trigger CTAs */}
          <div className={styles.actionGroup}>
            <button
              ref={magneticCtaRef}
              onClick={handleOpen}
              className={`${styles.caseStudyBtn} magnetic-btn primary`}
              data-cursor="hover"
            >
              VIEW CASE STUDY <span className={styles.btnArrow}>→</span>
            </button>

            {project.links?.demo && (
              <a
                ref={magneticDemoRef}
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.demoBtn} magnetic-btn secondary`}
                data-cursor="link"
                title={`Open ${project.name} live application`}
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
              >
                CODE <span className={styles.btnArrow}>↗</span>
              </a>
            )}
          </div>
        </div>

        {/* Right / Dominant Project Visual Media Column */}
        <div className={styles.mediaCol}>
          <div
            ref={mediaRef}
            className={`${styles.mediaViewport} ${isHovered ? styles.mediaHovered : ''}`}
            onClick={handleOpen}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            role="button"
            tabIndex={0}
            aria-label={`Explore ${project.name} full case study`}
            data-cursor="project"
          >
            <ProjectImage
              project={project}
              loading={index === 0 ? 'eager' : 'lazy'}
              showBadge={true}
            />

            {/* Microscope Technical Inspection Annotations (Desktop Hover) */}
            {project.technicalAnnotations && (
              <div className={`${styles.microscopeOverlay} ${isHovered ? styles.microscopeActive : ''}`} aria-hidden="true">
                {project.technicalAnnotations.map((anno) => (
                  <div key={anno.id} className={`${styles.annoBadge} ${styles[anno.position]}`}>
                    <div className={styles.annoDot} />
                    <div className={styles.annoTextGroup}>
                      <span className={styles.annoLabel}>{anno.label}</span>
                      <span className={styles.annoSub}>{anno.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Architectural Grid Corner Accents */}
            <div className={styles.cornerAccentTL} />
            <div className={styles.cornerAccentBR} />
          </div>

          <div className={styles.mediaFooter}>
            <span className={styles.microscopeHint}>Hover preview to inspect annotations • Click to open case study</span>
            <Link
              to={`/projects/${project.id}`}
              className={styles.directRouteLink}
              data-cursor="hover"
            >
              Full Page ↗
            </Link>
          </div>
        </div>
      </div>

      {/* Expandable Live Architecture Inspection Drawer */}
      {isInspectingArch && project.architecture && (
        <div id={`arch-drawer-${project.id}`} className={styles.archDrawer} aria-live="polite">
          <div className={styles.archDrawerInner}>
            <SystemArchitectureDiagram
              architecture={project.architecture}
              projectName={project.name}
            />
          </div>
        </div>
      )}
    </article>
  );
};

export default React.memo(FeaturedProjectBlock);
