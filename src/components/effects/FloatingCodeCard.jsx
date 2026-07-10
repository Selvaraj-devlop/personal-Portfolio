// src/components/effects/FloatingCodeCard.jsx
import { motion } from 'framer-motion';

export default function FloatingCodeCard() {
  return (
    <motion.div
      style={{
        position: 'absolute',
        bottom: '5%',
        right: '-20%',
        zIndex: 10,
        background: 'rgba(5, 8, 22, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '1rem 1.2rem',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(97,218,251,0.15)',
        fontFamily: 'var(--font-code)',
        fontSize: '0.65rem',
        lineHeight: 1.6,
        minWidth: '240px',
        pointerEvents: 'none',
      }}
      animate={{
        y: [-10, 10, -10],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div>
        <span style={{ color: '#8b5cf6' }}>const</span>{' '}
        <span style={{ color: '#61dafb' }}>Developer</span>{' '}
        <span style={{ color: '#e2e8f0' }}>= ()</span>{' '}
        <span style={{ color: '#8b5cf6' }}>=&gt;</span>{' '}
        <span style={{ color: '#e2e8f0' }}>{'{'}</span>
      </div>
      <div style={{ paddingLeft: '1rem' }}>
        <span style={{ color: '#8b5cf6' }}>return</span>{' '}
        <span style={{ color: '#e2e8f0' }}>(</span>
      </div>
      <div style={{ paddingLeft: '2rem' }}>
        <span style={{ color: '#a5b4fc' }}>&lt;</span>
        <span style={{ color: '#3b82f6' }}>div</span>{' '}
        <span style={{ color: '#61dafb' }}>className</span>
        <span style={{ color: '#e2e8f0' }}>=</span>
        <span style={{ color: '#10b981' }}>"passion"</span>
        <span style={{ color: '#a5b4fc' }}>&gt;</span>
      </div>
      <div style={{ paddingLeft: '3rem' }}>
        <span style={{ color: '#a5b4fc' }}>&lt;</span>
        <span style={{ color: '#3b82f6' }}>h1</span>
        <span style={{ color: '#a5b4fc' }}>&gt;</span>
        <span style={{ color: '#f8fafc' }}>Code. Create. Inspire.</span>
        <span style={{ color: '#a5b4fc' }}>&lt;/</span>
        <span style={{ color: '#3b82f6' }}>h1</span>
        <span style={{ color: '#a5b4fc' }}>&gt;</span>
      </div>
      <div style={{ paddingLeft: '3rem' }}>
        <span style={{ color: '#a5b4fc' }}>&lt;</span>
        <span style={{ color: '#3b82f6' }}>p</span>
        <span style={{ color: '#a5b4fc' }}>&gt;</span>
        <span style={{ color: '#94a3b8' }}>React Developer</span>
        <span style={{ color: '#a5b4fc' }}>&lt;/</span>
        <span style={{ color: '#3b82f6' }}>p</span>
        <span style={{ color: '#a5b4fc' }}>&gt;</span>
      </div>
      <div style={{ paddingLeft: '2rem' }}>
        <span style={{ color: '#a5b4fc' }}>&lt;/</span>
        <span style={{ color: '#3b82f6' }}>div</span>
        <span style={{ color: '#a5b4fc' }}>&gt;</span>
      </div>
      <div style={{ paddingLeft: '1rem' }}>
        <span style={{ color: '#e2e8f0' }}>)</span>
      </div>
      <div>
        <span style={{ color: '#e2e8f0' }}>{'}'}</span>
      </div>
    </motion.div>
  );
}
