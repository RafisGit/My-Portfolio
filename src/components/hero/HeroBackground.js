import React from 'react';
import styles from './HeroBackground.module.css';

/**
 * Multi-layer Cinematic Atmospheric Hero Background
 * Layer 1: Deep near-black base (#050505)
 * Layer 2: Animated SVG film grain / noise texture
 * Layer 4: Soft pulsing atmospheric radial light sources
 */
const HeroBackground = () => {
  return (
    <div className={styles.heroBackground} aria-hidden="true">
      {/* Layer 1: Deep Near-Black Solid Canvas */}
      <div className={styles.baseDarkLayer} />

      {/* Layer 2: Ultra-subtle Animated Film Grain Overlay */}
      <div className={styles.filmGrainLayer} />

      {/* Layer 4: Cinematic Atmospheric Soft Light Orbs */}
      <div className={styles.ambientLightPrimary} />
      <div className={styles.ambientLightSecondary} />
      <div className={styles.ambientLightCore} />

      {/* Subtle Technical Grid Lines */}
      <div className={styles.technicalGrid} />
    </div>
  );
};

export default React.memo(HeroBackground);
