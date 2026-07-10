// src/components/effects/RetroGridBackground.jsx
import { motion } from 'framer-motion';

export default function RetroGridBackground() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      background: '#01050b', // Extremely dark background
      overflow: 'hidden',
      pointerEvents: 'none',
      perspective: '1000px',
    }}>
      
      {/* ── Background Cyber Sun ────────────────────────────── */}
      <div style={{
        position: 'absolute',
        bottom: '40%', // At the horizon
        left: '50%',
        transform: 'translateX(-50%)',
        width: '40vw',
        height: '40vw',
        maxHeight: '600px',
        maxWidth: '600px',
        borderRadius: '50%',
        background: 'linear-gradient(180deg, rgba(97,218,251,0.1) 0%, rgba(59,130,246,0.8) 100%)',
        boxShadow: '0 0 100px rgba(59,130,246,0.6)',
        filter: 'blur(4px)',
        opacity: 0.7,
      }}>
        {/* Sun Cutouts (Vaporwave effect) */}
        {[10, 25, 45, 70].map((pos, i) => (
          <div key={i} style={{
             position: 'absolute',
             bottom: `${pos}%`,
             left: 0, right: 0,
             height: `${4 + i * 2}px`,
             background: '#01050b',
          }} />
        ))}
      </div>

      {/* ── 3D Infinite Moving Grid Floor ────────────────────── */}
      <motion.div 
        style={{
          position: 'absolute',
          width: '200%',
          height: '150%',
          bottom: '-30%',
          left: '-50%',
          transformOrigin: '50% 100%',
          transform: 'rotateX(78deg)',
          backgroundSize: '120px 120px',
          backgroundImage: `
            linear-gradient(to right, rgba(97,218,251,0.4) 1px, transparent 2px),
            linear-gradient(to bottom, rgba(59,130,246,0.6) 1px, transparent 2px)
          `,
          boxShadow: 'inset 0 0 100px rgba(97,218,251,0.5)',
        }}
        animate={{
          backgroundPositionY: ['0px', '120px']
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* ── Horizon Fade (Hides the edge of the grid) ──────── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, #01050b 35%, rgba(1,5,11,0.8) 45%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* ── Floating Tech Dust (for depth) ─────────────────── */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            backgroundColor: '#A5F3FC',
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.1,
            boxShadow: '0 0 10px #A5F3FC',
          }}
          animate={{
            y: [0, -100 - Math.random() * 200],
            opacity: [0, Math.random() * 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
