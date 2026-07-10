// src/components/sections/Hero.jsx
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { personalInfo } from '../../data/portfolioData';
import TechOrbit from '../effects/TechOrbit';
import FloatingCodeCard from '../effects/FloatingCodeCard';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

export default function Hero() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-section">
      <div className="container">
        <div className="row align-items-center g-4 g-lg-5">

          {/* ── Left Content ─────────────────────────────────── */}
          <div className="col-lg-6">
            <motion.div {...fadeUp(0.1)}>
              <div className="hero-greeting">
                <span>Hello, World!</span>
              </div>
            </motion.div>

            <motion.h1 className="hero-name" {...fadeUp(0.2)}>
              Selvaraj C
            </motion.h1>

            <motion.div className="hero-role-wrapper" {...fadeUp(0.3)}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>I'm a </span>
              <span className="hero-role-typed">
                <TypeAnimation
                  sequence={[
                    'MERN Stack Developer', 2200,
                    'Frontend Developer',   2200,
                    'React.js Specialist',  2200,
                    'Full Stack Developer', 2200,
                    'Problem Solver',       2200,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </span>
            </motion.div>

            <motion.p className="hero-desc" {...fadeUp(0.4)}>
              {personalInfo.summary.slice(0, 180)}...
            </motion.p>

            {/* CTA Buttons */}
            <motion.div className="d-flex flex-wrap gap-3 hero-buttons" {...fadeUp(0.5)}>
              <button
                onClick={() => scrollToSection('projects')}
                className="btn-magnetic btn-primary-glow"
                aria-label="View Projects"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
                View Projects
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="btn-magnetic btn-secondary-glow"
                aria-label="Hire Me"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Hire Me
              </button>

              <a
                href={`mailto:${personalInfo.email}`}
                className="btn-magnetic btn-outline-glow"
                aria-label="Contact Me"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Contact Me
              </a>
            </motion.div>

            {/* Quick stats */}
            <motion.div className="d-flex gap-4 mt-4" {...fadeUp(0.6)}>
              {[
                { val: '10+', label: 'Projects' },
                { val: '2',   label: 'Internships' },
                { val: '15+', label: 'Technologies' },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700 }}
                    className="gradient-text-primary"
                  >
                    {s.val}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Scroll indicator — desktop only */}
            <motion.div
              className="d-none d-md-flex align-items-center gap-3 mt-5"
              {...fadeUp(0.8)}
              style={{ cursor: 'pointer' }}
              onClick={() => scrollToSection('about')}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: 32, height: 48,
                  borderRadius: 16,
                  border: '1.5px solid rgba(97,218,251,0.4)',
                  display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                  paddingTop: 8,
                  background: 'rgba(97,218,251,0.05)',
                  boxShadow: '0 0 15px rgba(97,218,251,0.2), inset 0 0 10px rgba(97,218,251,0.1)',
                }}
              >
                <motion.div 
                  animate={{ y: [0, 15, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ width: 4, height: 10, borderRadius: 2, background: '#61DAFB', boxShadow: '0 0 8px #61DAFB' }}
                />
              </motion.div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.7rem', color: '#61DAFB', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>Discover</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)' }}>Scroll to explore</span>
              </div>
            </motion.div>
          </div>

          {/* ── Right: Gravity Tech Orbit ─────────────────────── */}
          <div className="col-lg-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ position: 'relative' }}
            >
              {/* Ambient backdrop glow behind the orbit — purple/violet to match orbital theme */}
              <div style={{
                position: 'absolute',
                inset: '5%',
                background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.28) 0%, rgba(109,40,217,0.12) 50%, transparent 75%)',
                borderRadius: '50%',
                filter: 'blur(40px)',
                pointerEvents: 'none',
              }} />

              {/* The orbit */}
              <TechOrbit />

              {/* Floating Code Snippet */}
              <div className="d-none d-lg-block">
                <FloatingCodeCard />
              </div>

              {/* "MERN Stack" label below orbit on mobile */}
              <div className="d-lg-none text-center mt-3">
                <span style={{
                  fontFamily: 'var(--font-code)',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}>
                  Tech Stack Constellation
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
