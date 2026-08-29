import React from 'react';
import Hero from '../components/Hero';
import ProjectsSection from '../components/projects/ProjectsSection';
import HowIBuild from '../components/HowIBuild';
import About from '../components/About';
import Skills from '../components/Skills';
import Education from '../components/Education';
import ContactSection from '../components/ContactSection';

const Home = () => {
  return (
    <main>
      <Hero />
      <ProjectsSection />
      <HowIBuild />
      <About />
      <Skills />
      <Education />
      <ContactSection />
    </main>
  );
};

export default React.memo(Home);
