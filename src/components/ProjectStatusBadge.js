import React from 'react';
import styles from './ProjectStatusBadge.module.css';

const ProjectStatusBadge = ({ status = 'LIVE DEMO', className = '' }) => {
  const isLive = status === 'LIVE' || status === 'LIVE DEMO' || status === 'DEPLOYED';

  return (
    <div className={`${styles.statusBadge} ${isLive ? styles.liveBadge : styles.devBadge} ${className}`}>
      <span className={styles.statusDot} aria-hidden="true" />
      <span className={styles.statusText}>{status}</span>
    </div>
  );
};

export default React.memo(ProjectStatusBadge);
