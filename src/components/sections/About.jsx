// src/components/sections/About.jsx
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMultiReveal } from '../../hooks/useScrollReveal';
import { personalInfo, stats } from '../../data/portfolioData';
import { useInView } from 'react-intersection-observer';
import { FiMapPin, FiMail, FiPhone, FiBriefcase, FiUser } from 'react-icons/fi';

// Lightweight animated counter — no external dependency
function useCountUp(end, duration = 2000, start = 0) {
  const [count, setCount] = useState(start);
  const frameRef = useRef(null);
  const startedRef = useRef(false);

  const run = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    const startTime = performance.now();
    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(start + (end - start) * eased));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
      else setCount(end);
    };
    frameRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  return { count, run };
}

function StatCard({ value, suffix, label, delay }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const { count, run } = useCountUp(value, 2200);

  useEffect(() => {
    if (inView) run();
  }, [inView]);

  return (
    <div ref={ref} className="stat-counter-card reveal" style={{ animationDelay: `${delay}s` }}>
      <div className="stat-number">
        {count}{suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function About() {
  const sectionRef = useMultiReveal();

  return (
    <section id="about" className="section-wrapper" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5 reveal">
          <div className="section-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            About Me
          </div>
          <h2 className="section-title">Who I Am</h2>
          <div className="section-divider mx-auto" />
        </div>

        <div className="row g-4 align-items-start">
          {/* Left — Summary + Info */}
          <div className="col-lg-7">
            {/* Summary */}
            <div className="about-summary-card reveal mb-4">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: 'white' }}>
                Professional Summary
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, fontSize: '0.95rem', marginBottom: 0 }}>
                {personalInfo.summary}
              </p>
            </div>

            {/* Info grid */}
            <div className="row g-3 reveal">
              {[
                { icon: <FiMapPin />, label: 'Location', value: personalInfo.location },
                { icon: <FiMail />, label: 'Email', value: personalInfo.email },
                { icon: <FiPhone />, label: 'Phone', value: personalInfo.phone },
                { icon: <FiBriefcase />, label: 'Status', value: 'Available for Opportunities' },
              ].map((item) => (
                <div key={item.label} className="col-sm-6">
                  <div className="glass-card p-3 d-flex align-items-start gap-3">
                    <span style={{ fontSize: '1.3rem', lineHeight: 1.2 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-code)' }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'white', fontWeight: 500, marginTop: 2 }}>
                        {item.value}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick tech highlights */}
            <div className="glass-card p-3 mt-3 reveal">
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-code)', marginBottom: '0.75rem' }}>
                &lt;tech-stack /&gt;
              </div>
              <div className="d-flex flex-wrap gap-2">
                {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'Bootstrap', 'REST APIs', 'Git'].map((t) => (
                  <span key={t} className="tech-badge">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Stats */}
          <div className="col-lg-5">
            <div className="row g-3">
              {stats.map((s, i) => (
                <div key={s.label} className="col-6">
                  <StatCard value={s.value} suffix={s.suffix} label={s.label} delay={i * 0.1} />
                </div>
              ))}
            </div>

            {/* Avatar card */}
            <div className="glass-card p-4 text-center mt-3 reveal" style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{
                width: 120, height: 120, borderRadius: '50%', margin: '0 auto 1rem',
                background: 'linear-gradient(135deg, rgba(108,99,255,0.3), rgba(0,229,255,0.3))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '3rem', border: '2px solid rgba(108,99,255,0.4)',
                boxShadow: '0 0 30px rgba(108,99,255,0.3)',
                color: 'white',
              }}>
                <FiUser />
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, color: 'white' }}>
                Selvaraj C
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--secondary)', fontFamily: 'var(--font-code)', marginBottom: '0.5rem' }}>
                MERN Stack Developer
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                📍 Tamil Nadu, India
              </div>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: 'linear-gradient(90deg, var(--primary), var(--secondary), var(--accent))',
              }} />
            </div>

            {/* Passion statement */}
            <div className="glass-card p-3 mt-3 reveal" style={{ borderLeft: '3px solid var(--primary)' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.7 }}>
                "Passionate about crafting beautiful, responsive web applications that deliver exceptional user experiences and solve real-world problems."
              </div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--primary)', fontFamily: 'var(--font-code)' }}>
                — Selvaraj C
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
