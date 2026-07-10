// src/components/effects/NeonWavesBackground.jsx
import { useEffect, useRef } from 'react';

export default function NeonWavesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w, h;
    let animationFrameId;
    let time = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener('resize', resize);
    resize();

    // Define the properties for multiple overlapping waves
    const waves = [
      { yOffset: 0.5, amplitude: 60,  frequency: 0.002, speed: 0.015, color: 'rgba(124, 58, 237, 0.4)',  lineWidth: 2 }, // Deep violet
      { yOffset: 0.5, amplitude: 100, frequency: 0.001, speed: 0.01,  color: 'rgba(139, 92, 246, 0.2)',  lineWidth: 3 }, // Mid violet
      { yOffset: 0.5, amplitude: 80,  frequency: 0.003, speed: 0.02,  color: 'rgba(0, 229, 255, 0.3)',   lineWidth: 1 }, // Cyan accent
      { yOffset: 0.6, amplitude: 140, frequency: 0.0015, speed: 0.012, color: 'rgba(99, 102, 241, 0.15)', lineWidth: 4 }, // Indigo broad
      { yOffset: 0.4, amplitude: 40,  frequency: 0.005, speed: 0.03,  color: 'rgba(255, 78, 205, 0.3)',  lineWidth: 1.5 }, // Pink accent
    ];

    const animate = () => {
      // Clear the canvas with a slight trail effect
      ctx.fillStyle = 'rgba(5, 8, 22, 1)';
      ctx.fillRect(0, 0, w, h);

      // Draw each wave
      waves.forEach(wave => {
        ctx.beginPath();
        // Start at left edge
        ctx.moveTo(0, h * wave.yOffset + Math.sin(time * wave.speed) * wave.amplitude);
        
        // Draw the wave segment by segment across the width
        for (let x = 0; x <= w; x += 5) {
          // Add complex shifting by combining time and position
          const y = h * wave.yOffset 
                  + Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude
                  + Math.sin(x * (wave.frequency * 2.5) - time * (wave.speed * 0.8)) * (wave.amplitude * 0.3);
          
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = wave.color;
        ctx.lineWidth = wave.lineWidth;
        
        // Add neon glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = wave.color;
        
        ctx.stroke();
      });

      time += 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
      background: '#050816',
      overflow: 'hidden'
    }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
        aria-hidden="true"
      />
      {/* Subtle ambient gradient overlay to blend everything */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at bottom, rgba(124,58,237,0.15) 0%, transparent 60%)',
        pointerEvents: 'none'
      }} />
    </div>
  );
}
