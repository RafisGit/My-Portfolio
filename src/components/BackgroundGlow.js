import React, { useEffect, useRef } from 'react';
import styles from './BackgroundGlow.module.css';

/**
 * Global Ambient Background & Atmospheric Grain System
 * Carries the subtle film grain, fine technical grid, and diffused ambient lighting
 * across the entire portfolio for seamless aesthetic cohesion.
 */
const BackgroundGlow = () => {
  const glowRef = useRef(null);
  const posRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const currentRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const reqIdRef = useRef(null);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const animate = () => {
      // Smooth lerp interpolation
      currentRef.current.x += (posRef.current.x - currentRef.current.x) * 0.04;
      currentRef.current.y += (posRef.current.y - currentRef.current.y) * 0.04;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentRef.current.x - 300}px, ${currentRef.current.y - 300}px, 0)`;
      }

      reqIdRef.current = requestAnimationFrame(animate);
    };

    reqIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
    };
  }, []);

  return (
    <div className={styles.backgroundContainer} aria-hidden="true">
      {/* Global 35mm Subtle Film Grain Layer */}
      <div className={styles.filmGrainGlobal} />

      {/* Fine Precision Technical Grid */}
      <div className={styles.fineGrid} />

      {/* Interactive Soft Ambient Radial Light */}
      <div ref={glowRef} className={styles.radialGlow} />

      {/* Static Top Diffused Ambient Orb */}
      <div className={styles.topAmbient} />
    </div>
  );
};

export default React.memo(BackgroundGlow);
