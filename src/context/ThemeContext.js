import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const getInitialTheme = () => {
  if (typeof window === 'undefined') return true;
  try {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch (e) {
    return true;
  }
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(getInitialTheme);

  // Sync theme changes to DOM, data attributes, meta tags, and storage
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    // Add transition class for smooth theme interpolation
    root.classList.add('theme-transitioning');

    if (isDark) {
      root.classList.remove('light-mode');
      body.classList.remove('light-mode');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
      const metaTheme = document.querySelector('meta[name="theme-color"]');
      if (metaTheme) metaTheme.setAttribute('content', '#050505');
    } else {
      root.classList.add('light-mode');
      body.classList.add('light-mode');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
      const metaTheme = document.querySelector('meta[name="theme-color"]');
      if (metaTheme) metaTheme.setAttribute('content', '#f5f5f2');
    }

    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    const timeout = setTimeout(() => {
      root.classList.remove('theme-transitioning');
    }, 320);

    return () => clearTimeout(timeout);
  }, [isDark]);

  // Listen to OS system preference change if no explicit manual preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        setIsDark(e.matches);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }
  }, []);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
