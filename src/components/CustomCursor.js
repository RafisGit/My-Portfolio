import React, { useEffect, useState, useRef } from 'react';
import styles from './CustomCursor.module.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default'); // 'default', 'link', 'project', 'hidden'
  const [isVisible, setIsVisible] = useState(false);

  const posRef = useRef({ x: -100, y: -100 });
  const mouseRef = useRef({ x: -100, y: -100 });
  const reqIdRef = useRef(null);

  useEffect(() => {
    // Disable on touch or reduced motion
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      // Lerp for smooth cursor following
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.18;
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      }

      reqIdRef.current = requestAnimationFrame(animate);
    };

    reqIdRef.current = requestAnimationFrame(animate);

    // Event delegation for cursor interaction state
    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor], a, button, input, textarea');
      if (!target) {
        setCursorVariant('default');
        setCursorText('');
        return;
      }

      const customCursorType = target.getAttribute('data-cursor');
      if (customCursorType === 'project') {
        setCursorVariant('project');
        setCursorText('VIEW');
      } else if (customCursorType === 'external' || (target.tagName === 'A' && target.target === '_blank')) {
        setCursorVariant('link');
        setCursorText('↗');
      } else if (customCursorType === 'text') {
        setCursorVariant('text');
        setCursorText(target.getAttribute('data-cursor-text') || '');
      } else if (target.tagName === 'A' || target.tagName === 'BUTTON') {
        setCursorVariant('hover');
        setCursorText('');
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className={`${styles.cursor} ${styles[cursorVariant] || ''}`}
      aria-hidden="true"
    >
      {cursorText && <span className={styles.cursorText}>{cursorText}</span>}
    </div>
  );
};

export default React.memo(CustomCursor);
