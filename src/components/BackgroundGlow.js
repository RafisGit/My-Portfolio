import React, { useEffect, useRef } from 'react';
import styles from './BackgroundGlow.module.css';

/**
 * High-performance, subtle ambient glow and micro-grid.
 * Uses requestAnimationFrame and direct transform updates for zero lag and zero CPU bloat.
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
      // Smooth lerp (linear interpolation)
      currentRef.current.x += (posRef.current.x - currentRef.current.x) * 0.05;
      currentRef.current.y += (posRef.current.y - currentRef.current.y) * 0.05;

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
      {/* Fine technical grid */}
      <div className={styles.fineGrid} />
      {/* Interactive mouse-following subtle glow */}
      <div ref={glowRef} className={styles.radialGlow} />
      {/* Static top-center cinematic ambient accent */}
      <div className={styles.topAmbient} />
    </div>
  );
};

export default React.memo(BackgroundGlow);
