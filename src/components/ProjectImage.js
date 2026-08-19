import React from 'react';
import styles from './ProjectImage.module.css';

const ProjectImage = ({
  project,
  loading = 'lazy',
  className = '',
  imgClassName = '',
  showBadge = true,
  onClick = null,
}) => {
  const images = project.images || {};
  const webpSrc = images.webp || `${project.heroImage?.replace(/\.(png|jpg|jpeg)$/, '.webp')}`;
  const pngSrc = images.png || images.fallback || project.heroImage;
  const altText = images.alt || `${project.name} preview showcase`;

  return (
    <div
      className={`${styles.imageWrapper} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `View ${project.name} case study` : undefined}
    >
      <picture className={styles.picture}>
        {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
        {pngSrc && <source srcSet={pngSrc} type="image/png" />}
        <img
          src={pngSrc || project.heroImage}
          alt={altText}
          loading={loading}
          decoding="async"
          className={`${styles.img} ${imgClassName}`}
          width={images.width || 1200}
          height={images.height || 750}
        />
      </picture>

      {showBadge && (
        <div className={styles.overlay}>
          <span className={styles.overlayBadge}>EXPLORE CASE STUDY ↗</span>
        </div>
      )}
    </div>
  );
};

export default React.memo(ProjectImage);
