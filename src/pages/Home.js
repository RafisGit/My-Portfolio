import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Story from '../components/Story';
import About from '../components/About';
import Skills from '../components/Skills';
import Education from '../components/Education';
import CTA from '../components/CTA';

const Home = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Story />
      <About />
      <Skills />
      <Education />
      <CTA />
    </motion.main>
  );
};

export default Home;
