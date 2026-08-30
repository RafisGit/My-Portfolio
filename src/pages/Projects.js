import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS_DATA } from '../data/portfolioData';
import ArchiveProjectCard from '../components/archive/ArchiveProjectCard';
import styles from './Projects.module.css';

/**
 * Filter Categories for Engineering Archive
 */
const CATEGORIES = [
  { id: 'All', label: 'All' },
  { id: 'Full-Stack', label: 'Full-Stack' },
  { id: 'AI / ML', label: 'AI / ML' },
  { id: 'Web Apps', label: 'Web Apps' },
  { id: 'Cloud & Tools', label: 'Cloud & Tools' },
];

/**
 * Helper to match a project against categories
 */
const getProjectCategoryTags = (project) => {
  const tags = ['All'];
  const cat = (project.category || '').toLowerCase();
  const tech = (project.technologies || []).map((t) => t.toLowerCase()).join(' ');
  const desc = (project.shortDescription || '').toLowerCase();

  // Full-Stack
  if (
    cat.includes('full-stack') ||
    cat.includes('ecommerce') ||
    cat.includes('e-commerce') ||
    tech.includes('supabase') ||
    tech.includes('node') ||
    tech.includes('postgresql')
  ) {
    tags.push('Full-Stack');
  }

  // AI / ML (strict token/word boundary match)
  const isAiMl =
    /\b(ai|ml|llm|gpt|nlp|agentic)\b/i.test(cat) ||
    /\b(ai|ml|openai|llm|gpt|nlp|agentic|langchain)\b/i.test(tech) ||
    /\b(agentic ai|openai|machine learning|artificial intelligence|llm)\b/i.test(desc);

  if (isAiMl) {
    tags.push('AI / ML');
  }

  // Web Apps
  if (
    cat.includes('web') ||
    cat.includes('full-stack') ||
    tech.includes('react') ||
    tech.includes('next.js') ||
    tech.includes('tailwind')
  ) {
    tags.push('Web Apps');
  }

  // Cloud & Tools
  if (
    cat.includes('cloud') ||
    tech.includes('supabase') ||
    tech.includes('postgresql') ||
    tech.includes('stripe') ||
    tech.includes('aws') ||
    tech.includes('docker')
  ) {
    tags.push('Cloud & Tools');
  }

  return tags;
};

/**
 * Projects (Archive Page) — 2026 Editorial Grid Redesign
 * 100% Isolated discovery catalogue with instant filtering.
 */
const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.title = 'Engineering Archive & Selected Work | MD. Rafi Hoque';
  }, []);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: PROJECTS_DATA.length };
    CATEGORIES.forEach((cat) => {
      if (cat.id === 'All') return;
      counts[cat.id] = PROJECTS_DATA.filter((p) =>
        getProjectCategoryTags(p).includes(cat.id)
      ).length;
    });
    return counts;
  }, []);

  // Filter and Sort projects
  const filteredProjects = useMemo(() => {
    let list = [...PROJECTS_DATA];

    // Filter by Category
    if (activeCategory !== 'All') {
      list = list.filter((p) => getProjectCategoryTags(p).includes(activeCategory));
    }

    // Sort
    if (sortBy === 'recent') {
      list.sort((a, b) => new Date(b.createdAt || '2025-01-01') - new Date(a.createdAt || '2025-01-01'));
    }

    return list;
  }, [activeCategory, sortBy]);

  return (
    <main className={styles.projectsPage}>
      {/* Background Subtle Ambient Glow */}
      <div className={styles.pageAmbientGlow} aria-hidden="true" />

      <div className={`site-container ${styles.archiveContainer}`}>
        {/* ============================================================
            COMPACT EDITORIAL HEADER
            ============================================================ */}
        <header className={styles.headerSection}>
          <div className={styles.headerTopNav}>
            <Link to="/" className={styles.backLink} data-cursor="hover">
              <span className={styles.backArrow}>←</span> Back to Main Showcase
            </Link>
            <div className={styles.systemCountBadge}>
              <span className={styles.pulseDot} />
              <span>{PROJECTS_DATA.length} SYSTEMS DEPLOYED</span>
            </div>
          </div>

          <div className={styles.headerMain}>
            <div className={styles.archiveLabel}>
              <span className={styles.metaDot} />
              <span>ARCHIVE // REPOSITORY</span>
            </div>
            <h1 className={`editorial-headline ${styles.pageTitle}`}>
              SELECTED WORK & SYSTEMS
            </h1>
            <p className={styles.pageSubtitle}>
              A curated archive of software products, AI systems, and scalable full-stack platforms engineered from the ground up.
            </p>
          </div>
        </header>

        {/* ============================================================
            CONTROLS & FILTERING BAR
            ============================================================ */}
        <section className={styles.controlsSection} aria-label="Archive filters and sorting">
          {/* Horizontal Scrollable Category Filter Pills */}
          <div className={styles.filterPillsTrack} role="tablist" aria-label="Filter projects by category">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.filterPill} ${isActive ? styles.activeFilterPill : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                  data-cursor="hover"
                >
                  <span className={styles.pillLabel}>{cat.label}</span>
                  <span className={styles.pillCount}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* Sort & Metrics Control */}
          <div className={styles.sortControlGroup}>
            <span className={styles.showingText}>
              Showing <strong>{filteredProjects.length}</strong> of {PROJECTS_DATA.length}
            </span>
            <div className={styles.sortToggleButtons}>
              <button
                type="button"
                className={`${styles.sortBtn} ${sortBy === 'featured' ? styles.activeSortBtn : ''}`}
                onClick={() => setSortBy('featured')}
                title="Sort by Featured / Priority order"
              >
                Featured
              </button>
              <button
                type="button"
                className={`${styles.sortBtn} ${sortBy === 'recent' ? styles.activeSortBtn : ''}`}
                onClick={() => setSortBy('recent')}
                title="Sort by Release Date"
              >
                Recent
              </button>
            </div>
          </div>
        </section>

        {/* ============================================================
            RESPONSIVE 3-COLUMN PROJECT GRID
            ============================================================ */}
        <section className={styles.gridSection} aria-label="Projects list">
          {filteredProjects.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>🔍</span>
              <h3 className={styles.emptyTitle}>No matching systems found</h3>
              <p className={styles.emptyText}>
                No projects matched the "{activeCategory}" filter category.
              </p>
              <button
                type="button"
                className={`${styles.resetFilterBtn} magnetic-btn secondary`}
                onClick={() => setActiveCategory('All')}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className={styles.projectsGrid}>
              {filteredProjects.map((project, index) => (
                <ArchiveProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          )}
        </section>

        {/* ============================================================
            ARCHIVE FOOTER PROMPT
            ============================================================ */}
        <footer className={styles.archiveFooter}>
          <div className={styles.footerPromptBox}>
            <div className={styles.footerPromptText}>
              <h3 className={styles.footerPromptTitle}>Interested in collaborating on a new system?</h3>
              <p className={styles.footerPromptDesc}>
                Open for software engineering opportunities, product design, and architectural consulting.
              </p>
            </div>
            <Link to="/#contact" className={`${styles.footerContactBtn} magnetic-btn primary`}>
              GET IN TOUCH →
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default React.memo(Projects);
