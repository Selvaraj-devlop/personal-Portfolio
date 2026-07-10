// src/components/sections/Projects.jsx
import { motion } from 'framer-motion';
import { useMultiReveal } from '../../hooks/useScrollReveal';
import { projects } from '../../data/portfolioData';

const projectEmojis = ['🏥', '🌤️', '📄'];

export default function Projects() {
  const sectionRef = useMultiReveal();

  return (
    <section id="projects" className="section-wrapper" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5 reveal">
          <div className="section-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
            Projects
          </div>
          <h2 className="section-title">Featured Work</h2>
          <div className="section-divider mx-auto" />
        </div>

        {/* Project Grid */}
        <div className="row g-4 justify-content-center">
          {projects.map((project, i) => (
            <div key={project.title} className="col-lg-4 col-md-6 reveal" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="glass-card p-4 h-100 d-flex flex-column" style={{ 
                background: `linear-gradient(135deg, ${project.color}11, rgba(0,0,0,0.4))`, 
                border: `1px solid ${project.color}33`,
                boxShadow: `0 10px 30px -10px ${project.color}22, inset 0 0 20px ${project.color}11`
              }}>
                <div className="text-center mb-4">
                  <motion.div 
                    style={{ fontSize: '4rem', filter: `drop-shadow(0 5px 15px ${project.color}66)` }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {projectEmojis[i] || '🚀'}
                  </motion.div>
                </div>
                
                <h3 style={{ 
                  fontFamily: 'var(--font-heading)', 
                  fontSize: '1.4rem', 
                  fontWeight: 800, 
                  color: 'white',
                  marginBottom: '0.5rem',
                  textAlign: 'center'
                }}>
                  {project.title}
                </h3>
                
                <div style={{ 
                  color: project.color, 
                  fontWeight: 700, 
                  fontSize: '0.8rem', 
                  marginBottom: '1rem', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em',
                  textAlign: 'center'
                }}>
                  {project.subtitle}
                </div>
                
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: 'rgba(255,255,255,0.7)', 
                  lineHeight: 1.6, 
                  flex: 1,
                  textAlign: 'center'
                }}>
                  {project.description}
                </p>

                <div className="d-flex justify-content-center flex-wrap gap-2 mt-4">
                  {project.tech.map((t) => (
                    <span key={t} style={{
                      padding: '0.3rem 0.8rem',
                      background: `${project.color}15`,
                      border: `1px solid ${project.color}33`,
                      color: project.color,
                      borderRadius: '100px',
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-code)',
                      fontWeight: 600
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
