import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import ProjectShowcase3D from '../components/ProjectShowcase3D';
import Skills from '../components/Skills';
import HowIBuild from '../components/HowIBuild';
import Education from '../components/Education';
import ContactSection from '../components/ContactSection';

const Home = () => {
  return (
    <main>
      <Hero />
      <About />
      <ProjectShowcase3D />
      <Skills />
      <HowIBuild />
      <Education />
      <ContactSection />
    </main>
  );
};

export default React.memo(Home);
