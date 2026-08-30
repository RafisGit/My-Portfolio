import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis } from '../hooks/useLenis';

/**
 * ScrollToTop & Route Transition Manager
 * Guarantees zero scroll desynchronization across route changes:
 * 1. Resets Lenis smooth scroll target immediately to 0
 * 2. Resets native document and window scroll to (0,0)
 * 3. Cleans any locked overflow on body or document
 * 4. Refreshes GSAP ScrollTrigger bounds cleanly on the new route
 * 5. Handles smooth anchor jump if landing on /#section
 */
const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // 1. Ensure body / html scroll is never locked across route transitions
    document.body.style.overflow = 'unset';
    document.documentElement.style.overflow = 'unset';

    // 2. Reset Lenis scroll instance immediately
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }

    // 3. Reset native document scroll
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 4. Handle smooth anchor jump if hash is present (e.g. /#projects)
    if (hash) {
      const targetId = hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          if (lenis) {
            lenis.scrollTo(el, { duration: 1.2, offset: -80 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
      return () => clearTimeout(timer);
    }

    // 5. Refresh ScrollTrigger for new route layout
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.clearScrollMemory();
      ScrollTrigger.refresh();
    }, 120);

    return () => clearTimeout(refreshTimer);
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;
