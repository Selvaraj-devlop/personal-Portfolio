// src/App.jsx
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Effects
import UnderSeaBackground from './components/effects/UnderSeaBackground';
import CustomCursor from './components/effects/CustomCursor';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Sections
import LoadingScreen from './components/sections/LoadingScreen';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Education from './components/sections/Education';
import Certifications from './components/sections/Certifications';
import Contact from './components/sections/Contact';

// Command Palette
import CommandPalette from './components/CommandPalette';

// Section separator component
const Separator = () => <div className="section-separator" aria-hidden="true" />;

export default function App() {
  const [loading, setLoading] = useState(true);
  const [commandOpen, setCommandOpen] = useState(false);

  // Global Ctrl+K shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {loading && (
          <LoadingScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* Custom Cursor */}
      <CustomCursor />



      {/* Under Sea Background */}
      <UnderSeaBackground />

      {/* Command Palette */}
      <CommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />

      {/* Main site — only show after loading */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Navigation */}
          <Navbar onCommandOpen={() => setCommandOpen(true)} />

          {/* Main Content */}
          <main id="main-content">
            <Hero />
            <Separator />
            <About />
            <Separator />
            <Skills />
            <Separator />
            <Experience />
            <Separator />
            <Projects />
            <Separator />
            <Education />
            <Separator />
            <Certifications />
            <Separator />
            <Contact />
          </main>

          {/* Footer */}
          <Footer />
        </motion.div>
      )}
    </>
  );
}
