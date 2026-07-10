// src/components/effects/InteractivePlexusBackground.jsx
import { useEffect, useRef } from 'react';

export default function InteractivePlexusBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w, h;
    let animationFrameId;

    let particles = [];
    const numParticles = 80;
    const connectionDistance = 150;
    const mouseConnectionDistance = 200;

    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    class Particle {
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        // Bounce off edges
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;

        // Move
        this.x += this.vx;
        this.y += this.vy;

        // Mouse interaction (repel slightly)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 100) {
          this.x -= (dx / dist) * 2;
          this.y -= (dy / dist) * 2;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(97, 218, 251, 0.6)'; // Cyan dots
        ctx.fill();
      }
    }

    const init = () => {
      resize();
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.fillStyle = '#030a16'; // Deep navy background
      ctx.fillRect(0, 0, w, h);

      particles.forEach(p => p.update());

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            // Opacity fades as they get further apart
            const opacity = 1 - (dist / connectionDistance);
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.4})`; // Blue connecting lines
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Draw connection to mouse
        const dxm = particles[i].x - mouse.x;
        const dym = particles[i].y - mouse.y;
        const distm = Math.sqrt(dxm * dxm + dym * dym);

        if (distm < mouseConnectionDistance) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          const opacity = 1 - (distm / mouseConnectionDistance);
          ctx.strokeStyle = `rgba(97, 218, 251, ${opacity * 0.8})`; // Bright cyan lines to mouse
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      particles.forEach(p => p.draw());

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none', // Critical so it doesn't block the site!
      background: '#030a16',
      overflow: 'hidden'
    }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
        aria-hidden="true"
      />
      {/* Soft vignette to blend edges */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, transparent 30%, #030a16 100%)',
        pointerEvents: 'none'
      }} />
    </div>
  );
}
