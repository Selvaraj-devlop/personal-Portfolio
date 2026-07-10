// src/components/effects/StarfieldBackground.jsx
import { useEffect, useRef } from 'react';

export default function StarfieldBackground() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let w, h;
    let stars = [];
    const numStars = 800; // High density for premium cinematic feel
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let animationFrameId;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener('resize', resize);
    resize();

    // Track mouse for parallax drift
    const onMouseMove = (e) => {
      // Normalize mouse from -1 to 1 based on center
      mouseX = (e.clientX - w / 2) / (w / 2);
      mouseY = (e.clientY - h / 2) / (h / 2);
    };
    window.addEventListener('mousemove', onMouseMove);

    // Initialize stars (x, y, z coords)
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * 2000 - 1000,
        y: Math.random() * 2000 - 1000,
        z: Math.random() * 1500,
        size: Math.random() * 1.5 + 0.5,
        // Some stars will have a slight purple tint
        hue: Math.random() > 0.8 ? 260 + Math.random() * 40 : 220, 
      });
    }

    const render = () => {
      // Smooth mouse interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Dark background with slight trail effect
      ctx.fillStyle = 'rgba(5, 8, 22, 0.4)';
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      for (let i = 0; i < numStars; i++) {
        const star = stars[i];

        // Move star forward
        star.z -= 1.5; // Warp speed

        // Reset if it passed the camera
        if (star.z <= 1) {
          star.x = Math.random() * 2000 - 1000;
          star.y = Math.random() * 2000 - 1000;
          star.z = 1500;
        }

        // Project 3D to 2D
        const fov = 350; // Field of view multiplier
        // Apply parallax based on mouse
        const px = star.x + targetX * star.z * 0.1;
        const py = star.y + targetY * star.z * 0.1;

        const x = cx + (px / star.z) * fov;
        const y = cy + (py / star.z) * fov;

        // Size scaling based on depth
        const scale = (1500 - star.z) / 1500;
        const r = star.size * scale * 2.5;

        // Skip if outside screen
        if (x < 0 || x > w || y < 0 || y > h) continue;

        // Draw star
        const alpha = Math.min(1, scale * 1.5);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${star.hue}, 80%, 80%, ${alpha})`;
        ctx.fill();
        
        // Add glow to close/large stars
        if (scale > 0.7) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = `hsla(${star.hue}, 80%, 60%, ${alpha})`;
        } else {
          ctx.shadowBlur = 0;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
      background: 'radial-gradient(ellipse at center, rgba(30,10,60,0.4) 0%, rgba(5,8,22,1) 70%)',
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
      {/* Subtle overlay noise for texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        opacity: 0.03,
        mixBlendMode: 'overlay',
        pointerEvents: 'none'
      }} />
    </div>
  );
}
