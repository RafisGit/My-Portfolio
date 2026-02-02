import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { ContactProvider } from './context/ContactContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactPanel from './components/ContactPanel';
import Home from './pages/Home';
import Projects from './pages/Projects';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <ContactProvider>
        <Router>
          <div className="app">
            <Navbar />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
              </Routes>
            </AnimatePresence>
            <Footer />
            <ContactPanel />
          </div>
        </Router>
      </ContactProvider>
    </ThemeProvider>
  );
}

export default App;
