import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS_DATA } from '../../data/portfolioData';
import FeaturedProjectBlock from './FeaturedProjectBlock';
import ProjectDetailsModal from '../ProjectDetailsModal';
import styles from './ProjectsSection.module.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * ProjectsSection — Cinematic Horizontal Scroll Experience
 * On desktop (>=1024px), vertical scrolling drives a pinned horizontal
 * digital exhibition through Intro -> Valtorn -> CV Maker -> AI Resume Suite -> Outro.
 * On mobile/tablet (<1024px) and reduced-motion, renders an elegant vertical stack.
 */
const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [horizontalProgress, setHorizontalProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  const openCaseStudy = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const closeCaseStudy = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  // Track window resize to toggle between horizontal and vertical modes
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Desktop Horizontal ScrollTrigger Pinning
      if (window.innerWidth >= 1024 && track) {
        const calculateDistance = () => {
          return track.scrollWidth - window.innerWidth;
        };

        const horizTween = gsap.to(track, {
          x: () => -calculateDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${calculateDistance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              setHorizontalProgress(self.progress);
              // Calculate which project is currently active (0 to total projects - 1)
              const projectProgress = self.progress * (PROJECTS_DATA.length + 0.5);
              const activeIdx = Math.min(
                PROJECTS_DATA.length - 1,
                Math.max(0, Math.floor(projectProgress - 0.3))
              );
              setActiveProjectIndex(activeIdx);
            },
          },
        });

        // Refresh ScrollTrigger when images and fonts finish loading
        const timer = setTimeout(() => {
          ScrollTrigger.refresh();
        }, 300);

        return () => {
          clearTimeout(timer);
          horizTween.kill();
        };
      } else {
        // Mobile / Tablet Vertical Reveal Staggers
        gsap.fromTo(
          '[data-animate="projects-header-mobile"] > *',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              once: true,
            },
          }
        );

        const blocks = gsap.utils.toArray(`.${styles.projectBlock}`);
        blocks.forEach((block) => {
          gsap.fromTo(
            block,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: block,
                start: 'top 85%',
                once: true,
              },
            }
          );
        });
      }
    }, section);

    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section ref={sectionRef} className={styles.projectsSection} id="projects">
      {/* Background Ambient Depth Layer */}
      <div className={styles.sectionAmbientGlow} aria-hidden="true" />

      {/* ============================================================
          DESKTOP: Pinned Horizontal Digital Exhibition (>= 1024px)
          ============================================================ */}
      <div className={styles.desktopHorizontalWrapper}>
        {/* Top Sticky Telemetry Bar */}
        <div className={styles.stickyTelemetryBar}>
          <div className={styles.telemetryLeft}>
            <span className={styles.metaDot} />
            <span className={styles.metaLabel}>02 // SELECTED WORK</span>
          </div>

          <div className={styles.telemetryCenter}>
            <span className={styles.progressCounter}>
              0{activeProjectIndex + 1} <span className={styles.divider}>/</span> 0{PROJECTS_DATA.length}
            </span>
            <div className={styles.telemetryProgressBar}>
              <div
                className={styles.telemetryProgressFill}
                style={{ width: `${Math.max(5, horizontalProgress * 100)}%` }}
              />
            </div>
            <span className={styles.scrollHint}>SCROLL TO EXPLORE →</span>
          </div>

          <div className={styles.telemetryRight}>
            <Link to="/projects" className={styles.archiveQuickLink} data-cursor="hover">
              Archive ↗
            </Link>
          </div>
        </div>

        {/* Pinned Viewport Container */}
        <div className={styles.stickyViewport}>
          <div ref={trackRef} className={styles.horizontalTrack}>
            {/* Panel 0: Introductory Panel */}
            <div className={styles.introPanel}>
              <div className={styles.introPanelInner}>
                <div className={styles.introTag}>
                  <span className={styles.introDot} />
                  <span>FLAGSHIP SYSTEMS</span>
                </div>
                <h2 className={`editorial-headline ${styles.introTitle}`}>
                  SELECTED<br />SYSTEMS
                </h2>
                <p className={styles.introSubtitle}>
                  A curated exhibition of digital products, scalable platforms, and AI systems I've designed and engineered from the ground up.
                </p>
                <div className={styles.introScrollPrompt}>
                  <span className={styles.promptArrow}>↓</span>
                  <span className={styles.promptText}>Scroll vertically to move horizontally</span>
                </div>
              </div>
            </div>

            {/* Panels 1, 2, 3: Flagship Systems */}
            {PROJECTS_DATA.map((project, index) => {
              const isActive = activeProjectIndex === index;
              return (
                <div
                  key={project.id}
                  className={`${styles.projectPanelWrapper} ${
                    isActive ? styles.activeProjectPanel : styles.inactiveProjectPanel
                  }`}
                >
                  <FeaturedProjectBlock
                    project={project}
                    index={index}
                    total={PROJECTS_DATA.length}
                    layoutVariant={index % 2 === 0 ? 'split-left' : 'split-right'}
                    onOpenCaseStudy={openCaseStudy}
                  />
                </div>
              );
            })}

            {/* Panel 4: Outro / Archive Teaser Panel */}
            <div className={styles.outroPanel}>
              <div className={styles.outroPanelInner}>
                <span className={styles.outroLabel}>COMPLETE CATALOGUE</span>
                <h3 className={styles.outroTitle}>Looking for experimental builds & utilities?</h3>
                <p className={styles.outroDesc}>
                  Browse through algorithmic challenges, open-source repositories, and prototype interfaces.
                </p>
                <Link
                  to="/projects"
                  className={`${styles.outroBtn} magnetic-btn primary`}
                  data-cursor="hover"
                >
                  EXPLORE ALL ARCHIVES →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          MOBILE & TABLET: Fluid Vertical Stack (< 1024px)
          ============================================================ */}
      <div className={styles.mobileVerticalWrapper}>
        <div className={`site-container ${styles.mobileContainer}`}>
          <header data-animate="projects-header-mobile" className={styles.mobileHeader}>
            <div className={styles.sectionMetaTag}>
              <span className={styles.metaDot} />
              <span className={styles.metaLabel}>02 / SELECTED WORK</span>
            </div>
            <h2 className={`editorial-headline ${styles.mobileTitle}`}>
              FEATURED SYSTEMS
            </h2>
            <p className={styles.mobileSubtitle}>
              A curated collection of software platforms and AI systems engineered from the ground up.
            </p>
          </header>

          <div className={styles.mobileProjectsList}>
            {PROJECTS_DATA.map((project, index) => (
              <FeaturedProjectBlock
                key={project.id}
                project={project}
                index={index}
                total={PROJECTS_DATA.length}
                layoutVariant="split-left"
                onOpenCaseStudy={openCaseStudy}
              />
            ))}
          </div>

          <div className={styles.mobileFooterPrompt}>
            <span className={styles.mobilePromptText}>Looking for experimental builds?</span>
            <Link to="/projects" className={`${styles.mobileArchiveBtn} magnetic-btn secondary`}>
              EXPLORE ALL ARCHIVES ↗
            </Link>
          </div>
        </div>
      </div>

      {/* Deep-Dive Case Study Modal */}
      <ProjectDetailsModal
        isOpen={modalOpen}
        project={selectedProject}
        onClose={closeCaseStudy}
      />
    </section>
  );
};

export default React.memo(ProjectsSection);
