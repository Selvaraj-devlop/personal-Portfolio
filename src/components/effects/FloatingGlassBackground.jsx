// src/components/effects/FloatingGlassBackground.jsx
import { motion } from 'framer-motion';

export default function FloatingGlassBackground() {
  // Generate random properties for glass panes
  const panes = Array.from({ length: 18 }).map((_, i) => {
    const size = Math.random() * 80 + 40; // 40px to 120px
    return {
      id: i,
      size,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 15,
      duration: Math.random() * 12 + 18, // 18 to 30 seconds
      rotateDirX: Math.random() > 0.5 ? 1 : -1,
      rotateDirY: Math.random() > 0.5 ? 1 : -1,
    };
  });

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      background: '#030a16', // Deep navy
      overflow: 'hidden',
      pointerEvents: 'none',
      perspective: '1000px', // Crucial for 3D tumbling effect
    }}>
      
      {/* ── Soft Ambient Background Glow ──────────────────────── */}
      <div style={{
        position: 'absolute',
        top: '20%', left: '30%',
        width: '50vw', height: '50vw',
        background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 60%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%', right: '20%',
        width: '40vw', height: '40vw',
        background: 'radial-gradient(circle, rgba(97,218,251,0.06) 0%, transparent 60%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
      }} />

      {/* ── Tumbling 3D Glass Panes ───────────────────────────── */}
      {panes.map((pane) => (
        <motion.div
          key={pane.id}
          style={{
            position: 'absolute',
            bottom: '-20%', // Start below screen
            left: pane.left,
            width: pane.size,
            height: pane.size,
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0))',
            border: '1px solid rgba(97,218,251,0.25)', // Cyan glass border
            boxShadow: '0 0 25px rgba(97,218,251,0.1), inset 0 0 15px rgba(59,130,246,0.1)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            transformStyle: 'preserve-3d',
            zIndex: 1,
          }}
          initial={{ y: '10vh', rotateX: 0, rotateY: 0, opacity: 0 }}
          animate={{
            y: '-130vh', // Float up past the top of the screen
            rotateX: 360 * 2 * pane.rotateDirX, // Tumble
            rotateY: 360 * 2 * pane.rotateDirY, // Tumble
            opacity: [0, 0.8, 0], // Fade in and out
          }}
          transition={{
            duration: pane.duration,
            repeat: Infinity,
            delay: pane.delay,
            ease: 'linear',
          }}
        >
          {/* Internal diagonal glass sheen */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
            borderRadius: 'inherit',
          }} />
        </motion.div>
      ))}

      {/* ── Edge Vignette for depth ───────────────────────────── */}
      <div style={{
         position: 'absolute',
         inset: 0,
         background: 'radial-gradient(circle at center, transparent 40%, #030a16 100%)',
         zIndex: 2,
      }} />
    </div>
  );
}
