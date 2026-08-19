import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SKILLS_DATA, PROJECTS_DATA } from '../data/portfolioData';
import ProjectDetailsModal from './ProjectDetailsModal';
import styles from './Skills.module.css';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeSkillName, setActiveSkillName] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-animate="skill-card"]',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const categories = ['ALL', ...SKILLS_DATA.map((c) => c.category)];

  const filteredData =
    activeCategory === 'ALL'
      ? SKILLS_DATA
      : SKILLS_DATA.filter((c) => c.category === activeCategory);

  const handleSkillClick = (skillName) => {
    if (activeSkillName === skillName) {
      setActiveSkillName(null);
    } else {
      setActiveSkillName(skillName);
    }
  };

  const handleSkillKeyDown = (e, skillName) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSkillClick(skillName);
    }
  };

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const closeProjectModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  // Find connected projects for active skill
  const getConnectedProjects = (skillName) => {
    if (!skillName) return [];
    for (const cat of SKILLS_DATA) {
      const skillObj = cat.skills.find(
        (s) => (typeof s === 'string' ? s === skillName : s.name === skillName)
      );
      if (skillObj && typeof skillObj !== 'string' && skillObj.projectIds) {
        return PROJECTS_DATA.filter((p) => skillObj.projectIds.includes(p.id));
      }
    }
    return [];
  };

  const activeConnectedProjects = getConnectedProjects(activeSkillName);

  return (
    <section ref={sectionRef} className={styles.skillsSection} id="skills">
      <div className={`site-container ${styles.skillsContainer}`}>
        {/* Header */}
        <div className={styles.header}>
          <span className="section-label">Technical Matrix</span>
          <h2 className={`editorial-subheadline ${styles.title}`}>
            SKILLS & ARCHITECTURE
          </h2>
          <p className={styles.subtitle}>
            A structured breakdown of languages, frameworks, AI capabilities, and engineering toolchains I leverage in production. Click or hover any skill to inspect linked projects.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={styles.filterTabs} role="tablist" aria-label="Skill Categories">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.activeFilter : ''}`}
              onClick={() => {
                setActiveCategory(cat);
                setActiveSkillName(null);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Connected Projects Bar (When a skill is active) */}
        {activeSkillName && (
          <div className={styles.connectedProjectsBar} aria-live="polite">
            <div className={styles.connectedBarHeader}>
              <div className={styles.connectedSkillTag}>
                <span className={styles.connectedDot} />
                <span>TECH IN FOCUS: <strong>{activeSkillName}</strong></span>
              </div>
              <button
                className={styles.clearSkillBtn}
                onClick={() => setActiveSkillName(null)}
                aria-label="Clear active skill selection"
              >
                Clear Selection ✕
              </button>
            </div>

            {activeConnectedProjects.length > 0 ? (
              <div className={styles.connectedProjectsList}>
                <span className={styles.usedInLabel}>Implemented in:</span>
                {activeConnectedProjects.map((proj) => (
                  <button
                    key={proj.id}
                    className={`${styles.projectChip} magnetic-btn secondary`}
                    onClick={() => openProjectModal(proj)}
                    data-cursor="hover"
                    aria-label={`View ${proj.name} case study`}
                  >
                    <span className={styles.chipNum}>{proj.number}</span>
                    <span className={styles.chipName}>{proj.name}</span>
                    <span className={styles.chipArrow}>↗</span>
                  </button>
                ))}
              </div>
            ) : (
              <p className={styles.noProjectsNotice}>
                Core CS / Developer toolchain leveraged across algorithmic challenges and engineering workflows.
              </p>
            )}
          </div>
        )}

        {/* Categories Grid */}
        <div className={styles.categoriesGrid}>
          {filteredData.map((group, idx) => (
            <div key={idx} data-animate="skill-card" className={`${styles.categoryCard} glass-panel`}>
              <div className={styles.cardHeader}>
                <span className={styles.categoryBadge}>{group.category}</span>
                <span className={styles.skillCount}>{group.skills.length} Technologies</span>
              </div>

              <p className={styles.categoryDesc}>{group.description}</p>

              <div className={styles.skillsPillList} role="group" aria-label={`${group.category} skills`}>
                {group.skills.map((skillItem, sIdx) => {
                  const skillName = typeof skillItem === 'string' ? skillItem : skillItem.name;
                  const projectIds = typeof skillItem === 'string' ? [] : skillItem.projectIds || [];
                  const isSelected = activeSkillName === skillName;
                  const hasProjects = projectIds.length > 0;

                  return (
                    <button
                      key={sIdx}
                      type="button"
                      className={`${styles.skillPill} ${isSelected ? styles.selectedPill : ''} ${
                        hasProjects ? styles.pillWithProjects : ''
                      }`}
                      onClick={() => handleSkillClick(skillName)}
                      onKeyDown={(e) => handleSkillKeyDown(e, skillName)}
                      aria-pressed={isSelected}
                      title={
                        hasProjects
                          ? `Used in ${projectIds.length} project(s). Click to view.`
                          : `${skillName}`
                      }
                    >
                      <span className={styles.pillDot} aria-hidden="true" />
                      <span className={styles.pillText}>{skillName}</span>
                      {hasProjects && (
                        <span className={styles.pillProjectCount} aria-label={`${projectIds.length} projects`}>
                          {projectIds.length}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal Triggered from Skill Project Chip */}
      <ProjectDetailsModal
        isOpen={modalOpen}
        project={selectedProject}
        onClose={closeProjectModal}
      />
    </section>
  );
};

export default React.memo(Skills);
