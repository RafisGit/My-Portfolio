import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from './HeroParticles.module.css';

/**
 * Layer 3 — Floating Ambient Particles
 * Ultra-lightweight 2D canvas particle system for slow drifting dust/star particles.
 * High performance, zero DOM thrashing, automatic DPR scaling, and reactive theme colors.
 */
const HeroParticles = () => {
  const { isDark } = useTheme();
  const canvasRef = useRef(null);
  const isDarkRef = useRef(isDark);

  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrameId;
    let width = 0;
    let height = 0;

    // Particle pool definition
    const particleCount = window.innerWidth < 768 ? 28 : 55;
    const particles = [];

    const initParticle = (p = {}) => {
      p.x = Math.random() * width;
      p.y = Math.random() * height;
      p.size = Math.random() * 1.5 + 0.5; // 0.5px to 2px
      p.vx = (Math.random() - 0.5) * 0.15; // ultra-slow drift
      p.vy = (Math.random() - 0.5) * 0.18 - 0.05; // slight upward bias
      p.baseAlpha = Math.random() * 0.4 + 0.1;
      p.alpha = p.baseAlpha;
      p.fadeSpeed = Math.random() * 0.008 + 0.003;
      p.fadeDirection = Math.random() > 0.5 ? 1 : -1;
      p.phase = Math.random() * Math.PI * 2;
      return p;
    };

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
      height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Re-populate if particles array is empty
      if (particles.length === 0) {
        for (let i = 0; i < particleCount; i++) {
          particles.push(initParticle({}));
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    let lastTime = performance.now();

    const render = (currentTime) => {
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      const dark = isDarkRef.current;

      if (!prefersReducedMotion) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Slow drift and sine-wave oscillation
          p.phase += delta * 0.8;
          p.x += p.vx + Math.sin(p.phase) * 0.08;
          p.y += p.vy;

          // Twinkle / pulse opacity
          p.alpha += p.fadeDirection * p.fadeSpeed;
          if (p.alpha > p.baseAlpha + 0.2) {
            p.fadeDirection = -1;
          } else if (p.alpha < p.baseAlpha - 0.15 || p.alpha <= 0.05) {
            p.fadeDirection = 1;
          }

          // Boundary wrapping
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;

          // Draw particle with soft halo
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = dark
            ? `rgba(230, 235, 245, ${Math.max(0.02, p.alpha)})`
            : `rgba(51, 65, 85, ${Math.max(0.02, p.alpha * 0.65)})`;
          ctx.fill();

          // Occasional subtle green telemetry accent particle
          if (i % 9 === 0) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
            ctx.fillStyle = dark
              ? `rgba(16, 185, 129, ${p.alpha * 0.6})`
              : `rgba(5, 150, 105, ${p.alpha * 0.55})`;
            ctx.fill();
          }
        }
      } else {
        // Static particles for reduced-motion
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = dark
            ? `rgba(220, 225, 235, ${p.baseAlpha * 0.6})`
            : `rgba(51, 65, 85, ${p.baseAlpha * 0.4})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.particlesCanvas}
      aria-hidden="true"
    />
  );
};

export default React.memo(HeroParticles);
