// src/components/sections/Education.jsx
import { useMultiReveal } from '../../hooks/useScrollReveal';
import { education } from '../../data/portfolioData';
import { FaGraduationCap, FaBook, FaUniversity } from 'react-icons/fa';
import { FiCalendar, FiMapPin } from 'react-icons/fi';

const iconMap = {
  FaGraduationCap: <FaGraduationCap />,
  FaBook: <FaBook />,
  FaUniversity: <FaUniversity />,
};

export default function Education() {
  const sectionRef = useMultiReveal();

  return (
    <section id="education" className="section-wrapper" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5 reveal">
          <div className="section-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
            Education
          </div>
          <h2 className="section-title">Academic Journey</h2>
          <div className="section-divider mx-auto" />
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Timeline */}
            <div className="timeline-container">
              <div className="timeline-line" />

              {education.map((edu, i) => (
                <div
                  key={i}
                  className="timeline-item reveal"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  {/* Dot */}
                  <div
                    className="timeline-dot"
                    style={{ borderColor: edu.color, color: edu.color }}
                  />

                  {/* Card */}
                  <div className="edu-card">
                    <div
                      style={{
                        position: 'absolute', top: 0, left: 0,
                        width: 3, height: '100%',
                        background: `linear-gradient(180deg, ${edu.color}, transparent)`,
                        borderRadius: '3px 0 0 3px',
                      }}
                    />

                    <div className="d-flex align-items-start">
                      {/* Icon */}
                      <div
                        className="edu-icon-wrap"
                        style={{
                          background: `${edu.color}18`,
                          border: `1px solid ${edu.color}44`,
                        }}
                      >
                        <span>{iconMap[edu.icon] || <FaGraduationCap />}</span>
                      </div>

                      {/* Content */}
                      <div className="flex-grow-1">
                        <div className="edu-degree">{edu.degree}</div>
                        <div className="edu-institution">{edu.institution}</div>
                        <div className="edu-period d-flex align-items-center gap-2">
                          <FiMapPin /> {edu.location}
                        </div>
                      </div>

                      {/* Year badge */}
                      <div style={{
                        background: `${edu.color}18`,
                        border: `1px solid ${edu.color}44`,
                        color: edu.color,
                        borderRadius: 12,
                        padding: '0.3rem 0.7rem',
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-code)',
                        whiteSpace: 'nowrap',
                        marginLeft: '0.5rem',
                      }}>
                        {edu.period}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Degree Completion Highlight */}
            <div className="glass-card p-4 mt-5 text-center reveal" style={{ 
              background: 'linear-gradient(135deg, rgba(97,218,251,0.08), rgba(139,92,246,0.02))', 
              border: '1px solid rgba(97,218,251,0.25)',
              boxShadow: '0 10px 30px -10px rgba(97,218,251,0.15), inset 0 0 20px rgba(97,218,251,0.05)'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#61DAFB', filter: 'drop-shadow(0 0 10px rgba(97,218,251,0.5))' }}>
                <FaGraduationCap />
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: 'white', marginBottom: '0.4rem', letterSpacing: '0.02em' }}>
                Bachelor of Science in Computer Science
              </div>
              <div style={{ color: '#61DAFB', fontWeight: 700, fontSize: '0.85rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                Degree Completed
              </div>
              <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, maxWidth: '550px', margin: '0 auto' }}>
                Successfully completed a comprehensive B.Sc program, gaining a strong foundation in Computer Science with a core specialization in modern web development, algorithms, and software engineering.
              </div>
              <div className="d-flex justify-content-center flex-wrap gap-3 mt-4">
                {['Graduated', 'Computer Science', 'Tamil Nadu'].map((tag) => (
                  <span key={tag} style={{
                    padding: '0.4rem 1rem',
                    background: 'rgba(97,218,251,0.1)',
                    border: '1px solid rgba(97,218,251,0.3)',
                    color: '#61DAFB',
                    borderRadius: '100px',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-code)',
                    fontWeight: 600
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
