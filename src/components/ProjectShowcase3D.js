import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { PROJECTS_DATA } from '../data/portfolioData';
import ProjectDetailsModal from './ProjectDetailsModal';
import ProjectStatusBadge from './ProjectStatusBadge';
import ProjectImage from './ProjectImage';
import styles from './ProjectShowcase3D.module.css';

gsap.registerPlugin(ScrollTrigger);

const ProjectShowcase3D = () => {
  const containerRef = useRef(null);
  const pinSectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const closeProjectModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  useEffect(() => {
    const isMobile = window.innerWidth <= 860;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobile || prefersReducedMotion) {
      // In mobile or reduced motion, we let normal vertical cards render without pinning
      return;
    }

    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      const totalProjects = PROJECTS_DATA.length;

      // Master ScrollTrigger timeline for desktop pinned showcase
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSectionRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${window.innerHeight * (totalProjects * 1.35)}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.min(
              Math.floor(self.progress * totalProjects),
              totalProjects - 1
            );
            setActiveProjectIndex(index);
          },
        },
      });

      // Set initial states for all project cards
      cards.forEach((card, index) => {
        if (index === 0) {
          gsap.set(card, {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            rotateX: 0,
            z: 0,
            x: 0,
            visibility: 'visible',
            pointerEvents: 'auto',
          });
        } else {
          gsap.set(card, {
            opacity: 0,
            scale: 0.85,
            rotateY: -6,
            rotateX: 3,
            z: -150,
            x: 80,
            visibility: 'hidden',
            pointerEvents: 'none',
          });
        }
      });

      // Sequence project transitions through scroll progress
      for (let i = 0; i < totalProjects - 1; i++) {
        const currentCard = cards[i];
        const nextCard = cards[i + 1];

        masterTl
          .to(
            currentCard,
            {
              opacity: 0,
              scale: 0.9,
              rotateY: 6,
              rotateX: -3,
              x: -120,
              z: -180,
              duration: 1,
              ease: 'power2.inOut',
              pointerEvents: 'none',
            },
            `step-${i}`
          )
          .set(
            nextCard,
            {
              visibility: 'visible',
              pointerEvents: 'auto',
            },
            `step-${i}+=0.1`
          )
          .to(
            nextCard,
            {
              opacity: 1,
              scale: 1,
              rotateY: 0,
              rotateX: 0,
              x: 0,
              z: 0,
              duration: 1,
              ease: 'power2.inOut',
            },
            `step-${i}+=0.15`
          );
      }

      masterTl.to({}, { duration: 0.5 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.projectSection} id="projects">
      {/* Pinned Viewport Container */}
      <div ref={pinSectionRef} className={styles.pinnedStage}>
        <div className={`site-container ${styles.stageHeader}`}>
          <div className={styles.headerLeft}>
            <span className="section-label">Signature Work</span>
            <h2 className={`editorial-subheadline ${styles.sectionTitle}`}>
              FEATURED PROJECTS
            </h2>
          </div>

          <div className={styles.headerRight}>
            <div className={styles.projectCounter}>
              <span className={styles.counterCurrent}>0{activeProjectIndex + 1}</span>
              <span className={styles.counterDivider}>/</span>
              <span className={styles.counterTotal}>0{PROJECTS_DATA.length}</span>
            </div>
            <Link to="/projects" className={styles.viewArchiveLink}>
              All Projects Archive ↗
            </Link>
          </div>
        </div>

        {/* 3D Scene Viewport */}
        <div className={`site-container ${styles.stageViewport} perspective-container`}>
          <div className={styles.cardsStack}>
            {PROJECTS_DATA.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`${styles.projectCard} glass-panel`}
                data-project-id={project.id}
              >
                {/* Left Column: Rich Technical Metadata */}
                <div className={styles.projectInfo}>
                  <div className={styles.projectHeaderRow}>
                    <span className={styles.projectNumber}>{project.number}</span>
                    <span className={styles.projectCategory}>{project.category}</span>
                    <span className={styles.projectYear}>{project.year}</span>
                    <ProjectStatusBadge status={project.status || 'LIVE DEMO'} />
                  </div>

                  <h3 className={styles.projectName}>{project.name}</h3>
                  <p className={styles.projectTagline}>{project.tagline}</p>
                  <p className={styles.projectDescription}>{project.shortDescription}</p>

                  {/* Technology Badges */}
                  <div className={styles.techList}>
                    {project.techStackSummary.map((tech, tIdx) => (
                      <span key={tIdx} className={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Interactive Action Triggers */}
                  <div className={styles.projectActions}>
                    <button
                      onClick={() => openProjectModal(project)}
                      className={`${styles.caseStudyBtn} magnetic-btn primary`}
                      data-cursor="hover"
                    >
                      Case Study <span>→</span>
                    </button>

                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.demoBtn} magnetic-btn secondary`}
                        data-cursor="link"
                      >
                        Live Demo <span>↗</span>
                      </a>
                    )}

                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.githubBtn} magnetic-btn secondary`}
                        data-cursor="link"
                        title="View Source Code"
                      >
                        Code <span>↗</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Column: 3D Layered Project Preview */}
                <div className={styles.projectMedia}>
                  <ProjectImage
                    project={project}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    onClick={() => openProjectModal(project)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deep-Dive Case Study Modal */}
      <ProjectDetailsModal
        isOpen={modalOpen}
        project={selectedProject}
        onClose={closeProjectModal}
      />
    </section>
  );
};

export default React.memo(ProjectShowcase3D);
