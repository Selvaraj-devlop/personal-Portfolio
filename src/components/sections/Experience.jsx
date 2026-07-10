// src/components/sections/Experience.jsx
import { useMultiReveal } from '../../hooks/useScrollReveal';
import { experience } from '../../data/portfolioData';
import { FiCalendar, FiMapPin } from 'react-icons/fi';

export default function Experience() {
  const sectionRef = useMultiReveal();

  return (
    <section id="experience" className="section-wrapper" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5 reveal">
          <div className="section-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
            Experience
          </div>
          <h2 className="section-title">Work Experience</h2>
          <div className="section-divider mx-auto" />
          <p style={{ color: 'var(--text-muted)', maxWidth: 500, margin: '1rem auto 0', fontSize: '0.9rem' }}>
            Real-world experience working on live projects and production environments
          </p>
        </div>

        {/* Timeline */}
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="timeline-container">
              <div className="timeline-line" />

              {experience.map((exp, i) => (
                <div key={i} className="timeline-item reveal" style={{ animationDelay: `${i * 0.15}s` }}>
                  {/* Timeline Dot */}
                  <div
                    className="timeline-dot"
                    style={{ borderColor: exp.color, color: exp.color }}
                  />

                  {/* Card */}
                  <div
                    className="exp-card"
                    style={{ '--card-color': exp.color }}
                  >
                    <div
                      style={{
                        position: 'absolute', top: 0, left: 0,
                        width: 3, height: '100%',
                        background: `linear-gradient(180deg, ${exp.color}, transparent)`,
                        borderRadius: '3px 0 0 3px',
                      }}
                    />

                    {/* Header */}
                    <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
                      <div>
                        <div className="exp-company">{exp.company}</div>
                        <div className="exp-role" style={{ color: exp.color }}>
                          {exp.role}
                        </div>
                        <div className="exp-period d-flex align-items-center flex-wrap gap-2">
                          <span><FiCalendar /> {exp.period}</span>
                          <span>&nbsp;·&nbsp;</span>
                          <span><FiMapPin /> {exp.location}</span>
                          <span>&nbsp;·&nbsp;</span>
                          <span style={{
                            background: `${exp.color}22`,
                            border: `1px solid ${exp.color}44`,
                            color: exp.color,
                            borderRadius: 100,
                            padding: '0.1rem 0.5rem',
                            fontSize: '0.68rem',
                          }}>
                            {exp.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-3">
                      {exp.highlights.map((h, hi) => (
                        <div key={hi} className="exp-highlight">{h}</div>
                      ))}
                    </div>

                    {/* Tech badges */}
                    <div className="d-flex flex-wrap">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="tech-badge"
                          style={{ borderColor: `${exp.color}44`, color: exp.color, background: `${exp.color}12` }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
