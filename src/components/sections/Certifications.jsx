// src/components/sections/Certifications.jsx
import { useMultiReveal } from '../../hooks/useScrollReveal';
import { certifications } from '../../data/portfolioData';
import { FaCertificate, FaStar, FaPuzzlePiece } from 'react-icons/fa';
import { FiMic, FiCalendar } from 'react-icons/fi';

const iconMap = {
  FaCertificate: <FaCertificate />,
  FaStar: <FaStar />,
  FaPuzzlePiece: <FaPuzzlePiece />,
};

export default function Certifications() {
  const sectionRef = useMultiReveal();

  return (
    <section id="certifications" className="section-wrapper" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5 reveal">
          <div className="section-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
            </svg>
            Certifications
          </div>
          <h2 className="section-title">Achievements</h2>
          <div className="section-divider mx-auto" />
          <p style={{ color: 'var(--text-muted)', maxWidth: 450, margin: '1rem auto 0', fontSize: '0.9rem' }}>
            Professional certifications that validate my skills and expertise
          </p>
        </div>

        <div className="row justify-content-center g-4">
          {certifications.map((cert, i) => (
            <div key={i} className="col-lg-4 col-md-6 reveal" style={{ animationDelay: `${i * 0.15}s` }}>
              <div
                className="cert-card"
                style={{
                  borderTop: `2px solid ${cert.color}`,
                  '--cert-color': cert.color,
                }}
              >
                {/* Glow background */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0, left: '50%',
                    width: 150, height: 150,
                    transform: 'translate(-50%, -60%)',
                    background: `radial-gradient(circle, ${cert.color}22, transparent 70%)`,
                    pointerEvents: 'none',
                    borderRadius: '50%',
                  }}
                />

                <span className="cert-icon">{iconMap[cert.icon] || <FaCertificate />}</span>

                <div
                  style={{
                    display: 'inline-block',
                    padding: '0.2rem 0.7rem',
                    background: `${cert.color}18`,
                    border: `1px solid ${cert.color}44`,
                    borderRadius: 100,
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-code)',
                    color: cert.color,
                    marginBottom: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  Certified ✓
                </div>

                <div className="cert-title">{cert.title}</div>
                <div className="cert-issuer">{cert.issuer}</div>
                <div className="cert-period d-flex align-items-center gap-1 mt-2">
                  <FiCalendar /> {cert.period}
                </div>

                {/* Hover shimmer line */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)`,
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                }}
                  className="cert-shimmer-line"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Seminars note */}
        <div className="row justify-content-center mt-4">
          <div className="col-lg-8 reveal">
            <div className="glass-card p-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <span style={{ fontSize: '1.3rem', color: 'var(--primary)' }}><FiMic /></span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: 'white', margin: 0 }}>
                  Seminars & Events
                </h3>
              </div>
              <div className="d-flex align-items-start gap-3">
                <div
                  style={{
                    background: 'rgba(108,99,255,0.12)',
                    border: '1px solid rgba(108,99,255,0.25)',
                    borderRadius: 12,
                    padding: '0.75rem 1rem',
                    flex: 1,
                  }}
                >
                  <div style={{ fontWeight: 600, color: 'white', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                    Technological Innovations & ICT
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    ICT Academy — National Level Seminar
                  </div>
                  <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 4 }}>
                    Jan 2025
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
