import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ContactProvider } from './context/ContactContext';
import { useLenis } from './hooks/useLenis';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactPanel from './components/ContactPanel';
import BackgroundGlow from './components/BackgroundGlow';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectCaseStudy from './pages/ProjectCaseStudy';
import './App.css';

function AppContent() {
  // Initialize Lenis smooth scroll and connect with GSAP ScrollTrigger
  useLenis();

  return (
    <div className="app-root">
      {/* High-performance ambient background */}
      <BackgroundGlow />

      {/* Desktop Contextual Custom Cursor */}
      <CustomCursor />

      {/* Global Scroll Progress Telemetry Rail */}
      <ScrollProgress />

      {/* Primary Sticky Glass Navigation */}
      <Navbar />

      {/* Route Views */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<ProjectCaseStudy />} />
        <Route path="*" element={<Home />} />
      </Routes>

      {/* Technical Footer */}
      <Footer />

      {/* Slide-out Contact Drawer */}
      <ContactPanel />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ContactProvider>
        <Router>
          <AppContent />
        </Router>
      </ContactProvider>
    </ThemeProvider>
  );
}

export default App;
