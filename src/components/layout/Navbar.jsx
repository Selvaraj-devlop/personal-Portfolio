// src/components/layout/Navbar.jsx
// Unique floating pill navbar — center links with glowing active capsule, side brand + CTA, and React Icons
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, 
  FiUser, 
  FiZap, 
  FiBriefcase, 
  FiCode, 
  FiAward, 
  FiMail 
} from 'react-icons/fi';
import { personalInfo } from '../../data/portfolioData';

const NAV_LINKS = [
  { label: 'Home',       href: 'hero',         Icon: FiHome },
  { label: 'About',      href: 'about',        Icon: FiUser },
  { label: 'Skills',     href: 'skills',       Icon: FiZap },
  { label: 'Experience', href: 'experience',   Icon: FiBriefcase },
  { label: 'Projects',   href: 'projects',     Icon: FiCode },
  { label: 'Education',  href: 'education',    Icon: FiAward },
  { label: 'Contact',    href: 'contact',      Icon: FiMail },
];

export default function Navbar({ onCommandOpen }) {
  const [scrolled,       setScrolled]       = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [activeSection,  setActiveSection]  = useState('hero');
  const [pillStyle,      setPillStyle]      = useState({ left: 0, width: 0 });
  const linkRefs                             = useRef({});
  const navPillRef                           = useRef(null);

  // ── Scroll tracking ────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      setMobileOpen(false); // Auto close mobile menu on scroll
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_LINKS[i].href);
        if (el && el.getBoundingClientRect().top <= 130) {
          setActiveSection(NAV_LINKS[i].href);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Move glowing pill to active link ──────────────────────────────────────
  useEffect(() => {
    const el = linkRefs.current[activeSection];
    const pill = navPillRef.current;
    if (!el || !pill) return;
    const pillRect = pill.getBoundingClientRect();
    const elRect   = el.getBoundingClientRect();
    setPillStyle({
      left:  elRect.left - pillRect.left,
      width: elRect.width,
    });
  }, [activeSection, scrolled]); // added scrolled as dependency to recalculate if layout changes

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  return (
    <>
      {/* ── Main Nav ──────────────────────────────────────────────────── */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 9000,
          padding: '0.85rem 0',
          transition: 'all 0.4s ease',
          background: scrolled
            ? 'rgba(5,8,22,0.82)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(97,218,251,0.18)' : 'none',
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>

            {/* ── Left: Brand logo ─────────────────────────────────── */}
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
              aria-label="Selvaraj C — Home"
              style={{ textDecoration: 'none', flexShrink: 0, opacity: mobileOpen ? 0 : 1, transition: 'opacity 0.3s ease', pointerEvents: mobileOpen ? 'none' : 'auto' }}
            >
              <div style={{
                display: 'flex', alignItems: 'center',
              }}>
                <span style={{
                  fontFamily: 'var(--font-code)',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(135deg, #ffffff 20%, #A5F3FC 80%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 8px rgba(97,218,251,0.4))',
                }}>
                  selvaraj<span style={{ 
                    color: '#61DAFB', 
                    WebkitTextFillColor: '#61DAFB'
                  }}>.dev</span>
                </span>
              </div>
            </a>

            {/* ── Center: Floating pill nav ────────────────────────── */}
            <div className="d-none d-lg-flex" style={{ position: 'relative' }}>
              {/* Outer glass pill container */}
              <div
                ref={navPillRef}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  padding: '5px',
                  borderRadius: '100px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(97,218,251,0.25)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)',
                  position: 'relative',
                }}
              >
                {/* Glowing active pill (slides behind links) */}
                <motion.div
                  animate={{ left: pillStyle.left, width: pillStyle.width }}
                  transition={{ type: 'spring', stiffness: 380, damping: 35 }}
                  style={{
                    position: 'absolute',
                    top: 5, bottom: 5,
                    borderRadius: '100px',
                    background: 'linear-gradient(135deg, rgba(97,218,251,0.85), rgba(59,130,246,0.8))',
                    boxShadow: '0 0 16px rgba(97,218,251,0.6), 0 0 32px rgba(97,218,251,0.25)',
                    zIndex: 0,
                    pointerEvents: 'none',
                  }}
                />

                {/* Nav links */}
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.href;
                  return (
                    <a
                      key={link.href}
                      ref={(el) => { linkRefs.current[link.href] = el; }}
                      href={`#${link.href}`}
                      onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                      aria-label={link.label}
                      aria-current={isActive ? 'page' : undefined}
                      style={{
                        position: 'relative',
                        zIndex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px', // Increased slightly for icon spacing
                        padding: '6px 14px',
                        borderRadius: '100px',
                        textDecoration: 'none',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.75rem',
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                        transition: 'color 0.2s ease',
                        whiteSpace: 'nowrap',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
                      onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                    >
                      <link.Icon size={14} style={{ opacity: isActive ? 1 : 0.7 }} />
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* ── Right: Actions ───────────────────────────────────── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>

              {/* Resume CTA */}
              <motion.a
                href="/Selvaraj_Web.pdf"
                download
                aria-label="Download Resume"
                className="d-none d-md-flex"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: mobileOpen ? 'none' : 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '7px 16px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #61DAFB, #3B82F6)',
                  color: '#fff',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  boxShadow: 'none',
                  border: '1px solid rgba(167,139,250,0.3)',
                  letterSpacing: '0.01em',
                  transition: 'box-shadow 0.2s ease, opacity 0.3s ease',
                  opacity: mobileOpen ? 0 : 1,
                  pointerEvents: mobileOpen ? 'none' : 'auto',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 8px rgba(97,218,251,0.5)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Resume
              </motion.a>

              {/* Mobile hamburger */}
              <button
                className="d-lg-none"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                style={{
                  width: 36, height: 36,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: 5,
                  background: 'rgba(97,218,251,0.12)',
                  border: '1px solid rgba(97,218,251,0.3)',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }}
                  style={{ display: 'block', width: 16, height: 1.5, background: '#61dafb', borderRadius: 2, transformOrigin: 'center' }}
                  transition={{ duration: 0.25 }} />
                <motion.span animate={{ opacity: mobileOpen ? 0 : 1, scaleX: mobileOpen ? 0 : 1 }}
                  style={{ display: 'block', width: 12, height: 1.5, background: '#61dafb', borderRadius: 2, alignSelf: 'flex-end', marginRight: 4 }}
                  transition={{ duration: 0.2 }} />
                <motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }}
                  style={{ display: 'block', width: 16, height: 1.5, background: '#61dafb', borderRadius: 2, transformOrigin: 'center' }}
                  transition={{ duration: 0.25 }} />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(4px)',
                zIndex: 8998,
              }}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              style={{
                position: 'fixed',
                top: 0, right: 0, bottom: 0,
                width: 280,
                background: 'rgba(8,6,28,0.97)',
                borderLeft: '1px solid rgba(97,218,251,0.25)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                zIndex: 8999,
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              {/* Drawer top — brand */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#fff',
                }}>
                  Selvaraj<span style={{ color: '#61DAFB' }}>.dev</span>
                </div>
              </div>

              {/* Links */}
              {NAV_LINKS.map((link, i) => {
                const isActive = activeSection === link.href;
                return (
                  <motion.a
                    key={link.href}
                    href={`#${link.href}`}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.055 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      background: isActive ? 'rgba(97,218,251,0.18)' : 'transparent',
                      border: `1px solid ${isActive ? 'rgba(97,218,251,0.4)' : 'transparent'}`,
                      transition: 'all 0.2s ease',
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {/* Icon dot */}
                    <span style={{
                      width: 28, height: 28,
                      borderRadius: '8px',
                      background: isActive ? 'rgba(97,218,251,0.4)' : 'rgba(255,255,255,0.05)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: isActive ? '#fff' : '#61dafb',
                      flexShrink: 0,
                    }}>
                      <link.Icon size={16} />
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? '#a5f3fc' : 'rgba(255,255,255,0.55)',
                    }}>
                      {link.label}
                    </span>
                    {isActive && (
                      <span style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: '#61DAFB', boxShadow: '0 0 8px #61DAFB' }} />
                    )}
                  </motion.a>
                );
              })}

              {/* Bottom CTA */}
              <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid rgba(97,218,251,0.15)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a
                  href="/Selvaraj_Web.pdf"
                  download
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    padding: '12px',
                    borderRadius: '12px',
                    background: 'transparent',
                    border: '1px solid rgba(97,218,251,0.5)',
                    color: '#61DAFB',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Resume
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    padding: '12px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #61DAFB, #3B82F6)',
                    color: '#fff',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    boxShadow: '0 0 24px rgba(97,218,251,0.45)',
                  }}
                >
                  <FiMail size={16} /> Let's Talk
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
