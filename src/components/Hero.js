import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroBackground from './hero/HeroBackground';
import HeroParticles from './hero/HeroParticles';
import Hero3DVisualization from './hero/Hero3DVisualization';
import HeroTypography from './hero/HeroTypography';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero Section Master Orchestrator
 * Coordinates the cinematic 3D thinking brain & gears background,
 * subtle focal depth vignette, high-impact typography reveal,
 * and smooth connected scroll transition into subsequent sections.
 */
const Hero = () => {
  const heroRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const visualWrapperRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // --- Master Cinematic Entrance Timeline ---
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // HUD & Status Pill
      tl.fromTo(
        '[data-animate="hero-hud"]',
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.15 }
      )
        .fromTo(
          '[data-animate="hero-label"]',
          { opacity: 0, y: 12, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6 },
          '-=0.4'
        )
        // PRIMARY FOCAL ENTRANCE: MD. RAFI / HOQUE
        .fromTo(
          '[data-animate="hero-name"] span',
          { opacity: 0, y: 24, filter: 'blur(12px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.95,
            stagger: 0.12,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        // Secondary Role Badge
        .fromTo(
          '[data-animate="hero-role"]',
          { opacity: 0, y: 10, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65 },
          '-=0.45'
        )
        // Tertiary Supporting Statement
        .fromTo(
          '[data-animate="hero-text"]',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.75 },
          '-=0.4'
        )
        // Action CTAs
        .fromTo(
          '[data-animate="hero-cta"] > *',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 },
          '-=0.4'
        );

      // --- Fluid Connected Scroll-Away Transition ---
      if (heroRef.current && visualWrapperRef.current && contentWrapperRef.current) {
        // 3D Visual recedes smoothly into the atmospheric background
        gsap.to(visualWrapperRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
          scale: 0.82,
          y: -40,
          opacity: 0.25,
          ease: 'power1.out',
        });

        // Typography gently recedes upward with slight blur
        gsap.to(contentWrapperRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '60% top',
            scrub: 0.8,
          },
          y: -50,
          opacity: 0.1,
          filter: 'blur(4px)',
          ease: 'power1.out',
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} className={styles.heroSection} id="top">
      {/* Layer 1, 2, 4: Atmospheric Background (Near-Black, Film Grain, Soft Light) */}
      <HeroBackground />

      {/* Layer 3: Ambient Floating Particles */}
      <HeroParticles />

      {/* Layer 3D: Procedural Thinking Brain + Mechanical Gears WebGL Canvas */}
      <div ref={visualWrapperRef} className={styles.visual3DWrapper}>
        <Hero3DVisualization isLoaded={isLoaded} />
      </div>

      {/* Hero Typography & Content */}
      <div ref={contentWrapperRef} className={`site-container ${styles.heroContainer}`}>
        <HeroTypography onScrollToProjects={scrollToProjects} />
      </div>
    </section>
  );
};

export default React.memo(Hero);
