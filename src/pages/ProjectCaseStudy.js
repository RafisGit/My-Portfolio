import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PROJECTS_DATA, getProjectById } from '../data/portfolioData';
import ProjectStatusBadge from '../components/ProjectStatusBadge';
import ProjectImage from '../components/ProjectImage';
import SystemArchitectureDiagram from '../components/SystemArchitectureDiagram';
import styles from './ProjectCaseStudy.module.css';

/**
 * ProjectCaseStudy
 * Dedicated comprehensive 8-chapter engineering case study page.
 */
const ProjectCaseStudy = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const project = getProjectById(projectId);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (project) {
      document.title = `${project.name} — ${project.category} | MD. Rafi Hoque`;
    }
  }, [projectId, project]);

  if (!project) {
    return (
      <main className={styles.notFoundPage}>
        <div className={`site-container ${styles.notFoundContainer}`}>
          <span className="section-label">404 // CASE STUDY NOT FOUND</span>
          <h1 className="editorial-headline">PROJECT NOT FOUND</h1>
          <p className={styles.notFoundText}>
            The case study for "{projectId}" could not be located in the engineering archives.
          </p>
          <Link to="/#projects" className="magnetic-btn primary">
            ← Return to Selected Work
          </Link>
        </div>
      </main>
    );
  }

  // Find next and previous projects for sequential exploration
  const currentIndex = PROJECTS_DATA.findIndex((p) => p.id === project.id);
  const prevProject =
    currentIndex > 0 ? PROJECTS_DATA[currentIndex - 1] : PROJECTS_DATA[PROJECTS_DATA.length - 1];
  const nextProject =
    currentIndex < PROJECTS_DATA.length - 1 ? PROJECTS_DATA[currentIndex + 1] : PROJECTS_DATA[0];

  return (
    <main className={styles.caseStudyPage}>
      {/* Top Breadcrumb & Chapter Navigation Bar */}
      <section className={styles.topNavSection}>
        <div className={`site-container ${styles.topNavContainer}`}>
          <Link to="/#projects" className={styles.backLink} data-cursor="hover">
            <span>←</span> Back to Selected Work
          </Link>

          <div className={styles.paginationNav}>
            <button
              onClick={() => navigate(`/projects/${prevProject.id}`)}
              className={styles.prevNextBtn}
              data-cursor="hover"
              title={`Previous: ${prevProject.name}`}
            >
              ← Prev: {prevProject.name}
            </button>
            <span className={styles.pageIndicator}>
              {project.number || '01'} / 0{PROJECTS_DATA.length}
            </span>
            <button
              onClick={() => navigate(`/projects/${nextProject.id}`)}
              className={styles.prevNextBtn}
              data-cursor="hover"
              title={`Next: ${nextProject.name}`}
            >
              Next: {nextProject.name} →
            </button>
          </div>
        </div>
      </section>

      {/* Case Study Header & Hero Banner */}
      <header className={styles.heroHeaderSection}>
        <div className={`site-container ${styles.heroContainer}`}>
          {/* Metadata Badges */}
          <div className={styles.heroMetaRow}>
            <span className={styles.projectNumberBadge}>{project.number}</span>
            <span className={styles.categoryBadge}>{project.category}</span>
            <span className={styles.yearBadge}>{project.year}</span>
            <ProjectStatusBadge status={project.status || 'LIVE DEMO'} />
          </div>

          <h1 className={`editorial-headline ${styles.projectTitle}`}>{project.name}</h1>
          <p className={styles.projectTagline}>{project.tagline}</p>

          {/* Quick Technical Summary Bar */}
          <div className={styles.quickSummaryBar}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>ROLE</span>
              <span className={styles.summaryValue}>{project.role || 'Full-Stack Engineer'}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>TIMELINE</span>
              <span className={styles.summaryValue}>{project.year}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>CORE STACK</span>
              <span className={styles.summaryValue}>
                {(project.techStackSummary || []).join(' • ')}
              </span>
            </div>
            <div className={styles.summaryActions}>
              {project.links?.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.headerLiveBtn} magnetic-btn primary`}
                  data-cursor="link"
                >
                  Live Site ↗
                </a>
              )}
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.headerCodeBtn} magnetic-btn secondary`}
                  data-cursor="link"
                >
                  Code ↗
                </a>
              )}
            </div>
          </div>

          {/* Hero Project Image Viewport */}
          <div className={styles.heroMediaContainer}>
            <ProjectImage project={project} showBadge={false} loading="eager" />
          </div>
        </div>
      </header>

      {/* 11-Chapter Structured Case Study Body */}
      <section className={styles.chaptersSection}>
        <div className={`site-container ${styles.chaptersContainer}`}>
          {/* Chapter 01 — Overview & Executive Summary */}
          <article className={styles.chapterBlock}>
            <div className={styles.chapterHeader}>
              <span className={styles.chapterNum}>01</span>
              <h2 className={styles.chapterTitle}>Overview & Executive Summary</h2>
            </div>
            <div className={styles.chapterContent}>
              <p className={styles.leadText}>
                {project.overview || project.fullDescription || project.shortDescription}
              </p>
              {project.fullDescription && project.overview && (
                <p className={styles.bodyText}>{project.fullDescription}</p>
              )}
            </div>
          </article>

          {/* Chapter 02 — Problem & Engineered Solution */}
          {(project.problem || project.solution) && (
            <article className={styles.chapterBlock}>
              <div className={styles.chapterHeader}>
                <span className={styles.chapterNum}>02</span>
                <h2 className={styles.chapterTitle}>Problem & Engineered Solution</h2>
              </div>
              <div className={styles.chapterContent}>
                <div className={styles.problemSolutionGrid}>
                  <div className={styles.problemBox}>
                    <div className={styles.boxTagRow}>
                      <span className={styles.problemTag}>CHALLENGE / PROBLEM</span>
                    </div>
                    <p className={styles.boxText}>{project.problem}</p>
                  </div>

                  <div className={styles.solutionBox}>
                    <div className={styles.boxTagRow}>
                      <span className={styles.solutionTag}>TECHNICAL SOLUTION</span>
                    </div>
                    <p className={styles.boxText}>{project.solution}</p>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* Chapter 03 — Technical Approach & Strategy */}
          {(project.approach || (project.engineeringHighlights && project.engineeringHighlights.length > 0)) && (
            <article className={styles.chapterBlock}>
              <div className={styles.chapterHeader}>
                <span className={styles.chapterNum}>03</span>
                <h2 className={styles.chapterTitle}>Technical Approach & Strategy</h2>
              </div>
              <div className={styles.chapterContent}>
                {project.approach && (
                  <p className={styles.bodyText} style={{ marginBottom: '1.75rem' }}>
                    {project.approach}
                  </p>
                )}

                {project.engineeringHighlights && project.engineeringHighlights.length > 0 && (
                  <div className={styles.highlightsGrid}>
                    {project.engineeringHighlights.map((highlight, idx) => (
                      <div key={idx} className={styles.highlightCard}>
                        <span className={styles.highlightIndex}>0{idx + 1}</span>
                        <p className={styles.highlightText}>{highlight}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </article>
          )}

          {/* Chapter 04 — System Architecture & Data Flow */}
          {project.architecture && (
            <article className={styles.chapterBlock}>
              <div className={styles.chapterHeader}>
                <span className={styles.chapterNum}>04</span>
                <h2 className={styles.chapterTitle}>System Architecture & Data Flow</h2>
              </div>
              <div className={styles.chapterContent}>
                <SystemArchitectureDiagram
                  architecture={project.architecture}
                  projectName={project.name}
                />
              </div>
            </article>
          )}

          {/* Chapter 05 — Key Capabilities & Features */}
          {project.features && project.features.length > 0 && (
            <article className={styles.chapterBlock}>
              <div className={styles.chapterHeader}>
                <span className={styles.chapterNum}>05</span>
                <h2 className={styles.chapterTitle}>Key Capabilities & Features</h2>
              </div>
              <div className={styles.chapterContent}>
                <ul className={styles.featuresList}>
                  {project.features.map((feature, idx) => (
                    <li key={idx} className={styles.featureItem}>
                      <span className={styles.featureBullet}>▹</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          )}

          {/* Chapter 06 — Engineering Breakdown */}
          {project.engineeringDomains && project.engineeringDomains.length > 0 && (
            <article className={styles.chapterBlock}>
              <div className={styles.chapterHeader}>
                <span className={styles.chapterNum}>06</span>
                <h2 className={styles.chapterTitle}>Engineering Domain Breakdown</h2>
              </div>
              <div className={styles.chapterContent}>
                <div className={styles.domainsGrid}>
                  {project.engineeringDomains.map((domain, idx) => (
                    <div key={idx} className={styles.domainCard}>
                      <div className={styles.domainHeader}>
                        <span className={styles.domainNum}>{domain.number || `0${idx + 1}`}</span>
                        <h4 className={styles.domainTitle}>{domain.domain}</h4>
                      </div>
                      <div className={styles.domainStackBadge}>{domain.stack}</div>
                      <p className={styles.domainDescription}>{domain.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          )}

          {/* Chapter 07 — Architectural Trade-Offs & Decision Log */}
          {((project.engineeringDecisions && project.engineeringDecisions.length > 0) ||
            (project.tradeOffs && project.tradeOffs.length > 0)) && (
            <article className={styles.chapterBlock}>
              <div className={styles.chapterHeader}>
                <span className={styles.chapterNum}>07</span>
                <h2 className={styles.chapterTitle}>Architectural Trade-Offs & Decision Log</h2>
              </div>
              <div className={styles.chapterContent}>
                {project.engineeringDecisions && project.engineeringDecisions.length > 0 && (
                  <div className={styles.decisionsList}>
                    {project.engineeringDecisions.map((item, idx) => (
                      <div key={idx} className={styles.decisionCard}>
                        <div className={styles.decisionHeader}>
                          <span className={styles.decisionBadge}>DECISION 0{idx + 1}</span>
                          <h4 className={styles.decisionName}>{item.title}</h4>
                        </div>
                        <p className={styles.decisionChoice}>
                          <strong>Adopted: </strong>
                          {item.decision}
                        </p>
                        <div className={styles.decisionSubGrid}>
                          <div className={styles.decisionSubCol}>
                            <span className={styles.subColLabel}>WHY:</span>
                            <p>{item.why}</p>
                          </div>
                          <div className={styles.decisionSubCol}>
                            <span className={styles.subColLabel}>ALTERNATIVE CONSIDERED:</span>
                            <p>{item.alternative}</p>
                          </div>
                        </div>
                        {item.outcome && (
                          <div className={styles.decisionOutcomeBox}>
                            <span className={styles.outcomeLabel}>MEASURED OUTCOME:</span>
                            <p>{item.outcome}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {project.tradeOffs && project.tradeOffs.length > 0 && (
                  <div className={styles.tradeOffsSection} style={{ marginTop: '2.5rem' }}>
                    <h3 className={styles.subSectionTitle}>Key Architectural Trade-Offs</h3>
                    <div className={styles.tradeOffsGrid}>
                      {project.tradeOffs.map((t, idx) => (
                        <div key={idx} className={styles.tradeOffCard}>
                          <div className={styles.tradeOffAreaBadge}>{t.area}</div>
                          <div className={styles.tradeOffRow}>
                            <span className={styles.badgeChosen}>CHOSEN:</span>
                            <span>{t.chosen}</span>
                          </div>
                          <div className={styles.tradeOffRow}>
                            <span className={styles.badgeAlt}>ALTERNATIVE:</span>
                            <span>{t.alternative}</span>
                          </div>
                          <div className={styles.tradeOffReason}>
                            <strong>Why: </strong>
                            {t.reason}
                          </div>
                          <div className={styles.tradeOffCompromise}>
                            <strong>Trade-Off Accepted: </strong>
                            {t.compromise}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          )}

          {/* Chapter 08 — Technical Obstacles & Resolutions */}
          {project.challenges && project.challenges.length > 0 && (
            <article className={styles.chapterBlock}>
              <div className={styles.chapterHeader}>
                <span className={styles.chapterNum}>08</span>
                <h2 className={styles.chapterTitle}>Technical Obstacles & Resolutions</h2>
              </div>
              <div className={styles.chapterContent}>
                <div className={styles.challengesList}>
                  {project.challenges.map((c, idx) => (
                    <div key={idx} className={styles.challengeItem}>
                      <div className={styles.challengeHead}>
                        <span className={styles.warningIcon}>⚡</span>
                        <h4 className={styles.challengeTitle}>{c.challenge}</h4>
                      </div>
                      <div className={styles.challengeDetailRow}>
                        <span className={styles.detailLabel}>RESOLUTION:</span>
                        <p className={styles.detailText}>{c.solution}</p>
                      </div>
                      <div className={styles.challengeDetailRow}>
                        <span className={styles.detailLabel}>IMPACT:</span>
                        <p className={styles.detailText}>{c.impact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          )}

          {/* Chapter 09 — Results & Deliverables */}
          {project.results && (
            <article className={styles.chapterBlock}>
              <div className={styles.chapterHeader}>
                <span className={styles.chapterNum}>09</span>
                <h2 className={styles.chapterTitle}>Results & Real Deliverables</h2>
              </div>
              <div className={styles.chapterContent}>
                <div className={styles.resultBox}>
                  <span className={styles.resultIcon}>✓</span>
                  <p className={styles.resultText}>{project.results}</p>
                </div>
              </div>
            </article>
          )}

          {/* Chapter 10 — What I Learned & Key Takeaways */}
          {project.whatILearned && (
            <article className={styles.chapterBlock}>
              <div className={styles.chapterHeader}>
                <span className={styles.chapterNum}>10</span>
                <h2 className={styles.chapterTitle}>What I Learned & Key Takeaways</h2>
              </div>
              <div className={styles.chapterContent}>
                <div className={styles.learnedBox}>
                  <span className={styles.learnedIcon}>💡</span>
                  <p className={styles.learnedText}>{project.whatILearned}</p>
                </div>
              </div>
            </article>
          )}

          {/* Chapter 11 — Tooling & Repositories */}
          <article className={styles.chapterBlock}>
            <div className={styles.chapterHeader}>
              <span className={styles.chapterNum}>11</span>
              <h2 className={styles.chapterTitle}>Complete Tech Stack & Access</h2>
            </div>
            <div className={styles.chapterContent}>
              <div className={styles.techStackGrid}>
                {(project.technologies || []).map((tech, idx) => (
                  <span key={idx} className={styles.techBadge}>
                    {tech}
                  </span>
                ))}
              </div>

              <div className={styles.finalActions}>
                {project.links?.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic-btn primary"
                    data-cursor="link"
                  >
                    Open Live Application ↗
                  </a>
                )}
                {project.links?.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic-btn secondary"
                    data-cursor="link"
                  >
                    View Source Repository ↗
                  </a>
                )}
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Next Project Footer Callout */}
      <footer className={styles.nextProjectSection}>
        <div className={`site-container ${styles.nextProjectContainer}`}>
          <span className={styles.nextLabel}>NEXT CASE STUDY</span>
          <Link
            to={`/projects/${nextProject.id}`}
            className={styles.nextProjectLink}
            data-cursor="hover"
          >
            <h3 className={styles.nextProjectTitle}>{nextProject.name} →</h3>
            <p className={styles.nextProjectTagline}>{nextProject.tagline}</p>
          </Link>
        </div>
      </footer>
    </main>
  );
};

export default React.memo(ProjectCaseStudy);
