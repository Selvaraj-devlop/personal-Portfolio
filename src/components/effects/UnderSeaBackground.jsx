// src/components/effects/UnderSeaBackground.jsx
import { motion } from 'framer-motion';

export default function UnderSeaBackground() {
  const bubbles = Array.from({ length: 45 }).map((_, i) => ({
    id: i,
    size: Math.random() * 12 + 4,
    left: `${Math.random() * 100}%`,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 20,
    xOffset: Math.random() * 60 - 30, // Wiggle distance
  }));

  const rays = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    left: `${(i / 12) * 100 + (Math.random() * 20 - 10)}%`,
    width: Math.random() * 120 + 60,
    opacity: Math.random() * 0.2 + 0.1,
    duration: Math.random() * 8 + 8,
  }));

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      background: 'linear-gradient(to bottom, #0284c7 0%, #0369a1 20%, #0c4a6e 50%, #082f49 80%, #030a16 100%)',
      overflow: 'hidden',
      pointerEvents: 'none',
    }}>
      {/* Sun Glare at the Surface */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        right: '-10%',
        height: '50vh',
        background: 'radial-gradient(ellipse at top center, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)',
        mixBlendMode: 'overlay',
        filter: 'blur(30px)',
      }} />

      {/* Dark Shade at Top Edge */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '20vh',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Light Rays (Caustics) */}
      <div style={{
        position: 'absolute', 
        inset: 0,
        mixBlendMode: 'overlay',
        filter: 'blur(12px)',
      }}>
        {rays.map(ray => (
          <motion.div key={ray.id} style={{
            position: 'absolute',
            top: '-10%',
            bottom: '20%',
            left: ray.left,
            width: ray.width,
            background: 'linear-gradient(to bottom, rgba(255,255,255,1), transparent)',
            transformOrigin: 'top center',
          }}
          initial={{ skewX: '-15deg', x: 0 }}
          animate={{
            opacity: [ray.opacity, ray.opacity * 2.2, ray.opacity],
            skewX: ['-15deg', '-5deg', '-15deg'],
            x: [0, 50, 0]
          }}
          transition={{ duration: ray.duration, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Floating Bubbles */}
      {bubbles.map(b => (
        <motion.div key={b.id} style={{
          position: 'absolute',
          bottom: -50,
          left: b.left,
          width: b.size,
          height: b.size,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 100%)',
          border: '1px solid rgba(255,255,255,0.6)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1), inset 0 0 8px rgba(255,255,255,0.6)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
        initial={{ y: 0, x: 0, opacity: 0 }}
        animate={{
          y: '-120vh', // Float far above the screen
          x: [0, b.xOffset, -b.xOffset, 0], // Wiggle left and right
          opacity: [0, 0.7, 0.7, 0], // Fade in, hold, fade out
        }}
        transition={{ 
          duration: b.duration, 
          repeat: Infinity, 
          delay: b.delay, 
          ease: 'linear' 
        }}
        />
      ))}

      {/* Deep Sea Vignette (Darkens the bottom and edges) */}
      <div style={{
         position: 'absolute',
         inset: 0,
         background: 'radial-gradient(circle at center 30%, transparent 40%, #030a16 110%)',
      }} />
    </div>
  );
}
