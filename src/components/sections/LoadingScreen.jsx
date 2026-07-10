// src/components/sections/LoadingScreen.jsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // loading | done

  useEffect(() => {
    let start = null;
    const duration = 2200;

    const tick = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(Math.floor(pct));
      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setPhase('done');
          setTimeout(onComplete, 700);
        }, 300);
      }
    };
    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase === 'loading' && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Animated background blobs */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            <div className="aurora-blob" style={{ width: 400, height: 400, top: '-10%', left: '-5%', animationDuration: '8s' }} />
            <div className="aurora-blob" style={{ width: 350, height: 350, bottom: '-10%', right: '-5%', background: 'radial-gradient(circle, #00e5ff, transparent 70%)', animationDuration: '10s' }} />
          </div>

          {/* Logo */}
          <motion.div
            className="loading-logo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            SC
          </motion.div>

          {/* Ring */}
          <motion.div
            className="loading-ring"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          />

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
          >
            <div className="loading-bar-container">
              <div className="loading-bar" style={{ width: `${progress}%`, transition: 'width 0.1s linear' }} />
            </div>
            <div className="loading-text">{progress}%</div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            style={{
              fontFamily: 'var(--font-code)',
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Crafting Digital Experiences
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
