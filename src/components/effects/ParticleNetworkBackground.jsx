// src/components/effects/ParticleNetworkBackground.jsx
import { useEffect, useRef } from 'react';

export default function ParticleNetworkBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let particlesArray = [];
    let w, h;
    let animationFrameId;

    // Mouse tracking
    const mouse = {
      x: null,
      y: null,
      radius: 150 // Interaction radius
    };

    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      init();
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseOut = () => {
      mouse.x = undefined;
      mouse.y = undefined;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    class Particle {
      constructor(x, y, dx, dy, size, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
        this.color = color;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Slight glow for larger particles
        if (this.size > 1.5) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = this.color;
        } else {
          ctx.shadowBlur = 0;
        }
      }

      update() {
        // Bounce off edges
        if (this.x > w || this.x < 0) this.dx = -this.dx;
        if (this.y > h || this.y < 0) this.dy = -this.dy;

        // Mouse collision / push effect
        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            // Push particles away softly
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            
            // Limit max push velocity
            this.x -= forceDirectionX * force * 2;
            this.y -= forceDirectionY * force * 2;
          }
        }

        // Move
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
      }
    }

    const init = () => {
      particlesArray = [];
      const numberOfParticles = (w * h) / 12000; // Adjust density based on screen size
      
      for (let i = 0; i < numberOfParticles; i++) {
        const size = (Math.random() * 2) + 0.5;
        const x = (Math.random() * ((w - size * 2) - (size * 2)) + size * 2);
        const y = (Math.random() * ((h - size * 2) - (size * 2)) + size * 2);
        
        // Slow drifting speed
        const dx = (Math.random() - 0.5) * 0.8;
        const dy = (Math.random() - 0.5) * 0.8;
        
        // Mix of primary/secondary colors (Purple, Cyan, White)
        const colors = ['rgba(124, 58, 237, 0.8)', 'rgba(0, 229, 255, 0.6)', 'rgba(255, 255, 255, 0.4)'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particlesArray.push(new Particle(x, y, dx, dy, size, color));
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      
      connect();
    };

    // Draw lines between close particles
    const connect = () => {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = dx * dx + dy * dy;
          
          const maxDistance = 15000; // Squared distance threshold
          
          if (distance < maxDistance) {
            opacityValue = 1 - (distance / maxDistance);
            ctx.strokeStyle = `rgba(124, 58, 237, ${opacityValue * 0.35})`; // Deep violet connecting lines
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none', // Ensure it doesn't block clicks on the actual site
      background: 'radial-gradient(ellipse at center, rgba(30,10,60,0.6) 0%, rgba(5,8,22,1) 80%)',
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
    </div>
  );
}
