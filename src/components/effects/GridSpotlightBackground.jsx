// src/components/effects/GridSpotlightBackground.jsx
import { useEffect, useRef } from 'react';

export default function GridSpotlightBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Spotlight effect
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      // Set CSS variables for the mouse position
      container.style.setProperty('--mouse-x', `${clientX}px`);
      container.style.setProperty('--mouse-y', `${clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        backgroundColor: '#050816', // Dark navy base
        overflow: 'hidden',
        pointerEvents: 'none',
        // Initialize mouse variables to center just in case
        '--mouse-x': '50vw',
        '--mouse-y': '50vh',
      }}
    >
      {/* 1. Subtle Animated Grid Pattern */}
      <div
        style={{
          position: 'absolute',
          inset: '-100%', // Make it larger to allow for panning
          width: '300%',
          height: '300%',
          backgroundImage: `
            linear-gradient(to right, rgba(124, 58, 237, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(124, 58, 237, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          animation: 'panGrid 60s linear infinite',
          transform: 'rotate(-10deg)', // Sleek angle
        }}
      />

      {/* 2. Interactive Spotlight that follows the mouse */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(
              600px circle at var(--mouse-x) var(--mouse-y),
              rgba(124, 58, 237, 0.15),
              transparent 40%
            )
          `,
          transition: 'background 0.1s ease',
        }}
      />
      
      {/* 3. Deep ambient glow (Static, center) */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '30%',
          transform: 'translate(-50%, -50%)',
          width: '80vw',
          height: '80vh',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      {/* 4. Edge Fade to keep the grid looking seamless */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, #050816 90%)',
        }}
      />

      {/* Keyframes for the grid panning */}
      <style>{`
        @keyframes panGrid {
          0% {
            transform: rotate(-10deg) translateY(0) translateX(0);
          }
          100% {
            transform: rotate(-10deg) translateY(-80px) translateX(-80px);
          }
        }
      `}</style>
    </div>
  );
}
