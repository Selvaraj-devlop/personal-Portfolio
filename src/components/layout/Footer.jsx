// src/components/layout/Footer.jsx
import { personalInfo } from '../../data/portfolioData';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaArrowUp } from 'react-icons/fa';

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { Icon: FaGithub, href: personalInfo.github, label: 'GitHub' },
  { Icon: FaLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
  { Icon: FaEnvelope, href: `mailto:${personalInfo.email}`, label: 'Email' },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollTo = (href) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Wave separator */}
      <div style={{ position: 'relative', zIndex: 2, lineHeight: 0, overflow: 'hidden' }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: 60, display: 'block' }}>
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6C63FF" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FF4ECD" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="url(#waveGrad)" />
        </svg>
      </div>

      <footer className="footer-glass">
        <div className="container">
          <div className="row g-4">
            {/* Brand */}
            <div className="col-lg-4 col-md-6">
              <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }} className="footer-logo">
                Selvaraj C
              </a>
              <p className="footer-desc mt-2">
                MERN Stack Developer crafting beautiful, responsive web applications from Tamil Nadu, India.
              </p>
              {/* Socials */}
              <div className="d-flex gap-2 mt-3">
                {socials.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="social-icon-btn"
                    aria-label={label}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6 col-6">
              <div className="footer-heading">Navigate</div>
              {quickLinks.slice(0, 3).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="footer-link"
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="col-lg-2 col-md-6 col-6">
              <div className="footer-heading" style={{ opacity: 0 }}>—</div>
              {quickLinks.slice(3).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="footer-link"
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Contact */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-heading">Get in Touch</div>
              <a href={`mailto:${personalInfo.email}`} className="footer-link mb-1 d-block">
                ✉ {personalInfo.email}
              </a>
              <a href={`tel:${personalInfo.phone}`} className="footer-link mb-1 d-block">
                📱 {personalInfo.phone}
              </a>
              <div className="footer-link mb-3">📍 {personalInfo.location}</div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 0.9rem',
                background: 'rgba(0,255,163,0.08)',
                border: '1px solid rgba(0,255,163,0.2)',
                borderRadius: 100,
                fontSize: '0.75rem',
                color: 'var(--success)',
              }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--success)', animation: 'pulse 1.5s infinite' }} />
                Available for Opportunities
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="footer-divider" />

          {/* Bottom */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 text-center">
            <div className="footer-copyright">
              © {new Date().getFullYear()} Selvaraj C. All rights reserved.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>
              Made with <FaHeart style={{ color: '#ff4ecd', fontSize: '0.75rem' }} /> using React & Bootstrap
            </div>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      <button
        className="back-to-top"
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <FaArrowUp />
      </button>
    </>
  );
}
