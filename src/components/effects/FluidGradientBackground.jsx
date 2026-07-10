// src/components/effects/FluidGradientBackground.jsx
import { motion } from 'framer-motion';

export default function FluidGradientBackground() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      background: '#030a16', // Deep navy base
      overflow: 'hidden',
      pointerEvents: 'none'
    }}>
      {/* Heavy blur overlay to merge the blobs smoothly */}
      <div style={{
         position: 'absolute', 
         inset: 0,
         backdropFilter: 'blur(120px)',
         WebkitBackdropFilter: 'blur(120px)',
         zIndex: 1,
      }} />

      {/* Blob 1: React Cyan (Top Left) */}
      <motion.div
        style={{
          position: 'absolute',
          width: '70vw', 
          height: '70vw',
          borderRadius: '50%',
          background: 'rgba(97, 218, 251, 0.25)', // #61DAFB
          top: '-20%', 
          left: '-15%',
          mixBlendMode: 'screen',
        }}
        animate={{
          x: ['0vw', '15vw', '-10vw', '0vw'],
          y: ['0vh', '20vh', '-5vh', '0vh'],
          scale: [1, 1.1, 0.9, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Blob 2: Deep Vercel Blue (Bottom Right) */}
      <motion.div
        style={{
          position: 'absolute',
          width: '80vw', 
          height: '80vw',
          borderRadius: '50%',
          background: 'rgba(59, 130, 246, 0.22)', // #3B82F6
          bottom: '-30%', 
          right: '-20%',
          mixBlendMode: 'screen',
        }}
        animate={{
          x: ['0vw', '-25vw', '10vw', '0vw'],
          y: ['0vh', '-15vh', '20vh', '0vh'],
          scale: [1, 0.8, 1.15, 1]
        }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Blob 3: Bright Sky Cyan / White (Center drifting) */}
      <motion.div
        style={{
          position: 'absolute',
          width: '45vw', 
          height: '45vw',
          borderRadius: '50%',
          background: 'rgba(165, 243, 252, 0.15)', // Light Cyan
          top: '25%', 
          left: '25%',
          mixBlendMode: 'screen',
        }}
        animate={{
          x: ['0vw', '35vw', '-15vw', '0vw'],
          y: ['0vh', '-25vh', '15vh', '0vh'],
          scale: [1, 1.25, 0.85, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
