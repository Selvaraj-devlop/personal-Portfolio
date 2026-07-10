// src/components/effects/ParallaxGalaxyBackground.jsx
import { useEffect, useRef } from 'react';

export default function ParallaxGalaxyBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w, h;
    let animationFrameId;

    // Mouse tracking for parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const layers = [
      { speed: 0.1, count: 150, size: 0.8, color: 'rgba(59, 130, 246, 0.4)', stars: [] },
      { speed: 0.3, count: 80, size: 1.5, color: 'rgba(97, 218, 251, 0.6)', stars: [] },
      { speed: 0.6, count: 40, size: 2.2, color: 'rgba(165, 243, 252, 0.8)', stars: [] },
      { speed: 1.2, count: 15, size: 3.0, color: 'rgba(255, 255, 255, 0.9)', stars: [] }
    ];

    const shootingStars = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      initStars();
    };

    const handleMouseMove = (e) => {
      // Normalize mouse coordinates to -1 to 1
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    class Star {
      constructor(layer) {
        this.layer = layer;
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        // Base drift speed
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        // Twinkle phase
        this.phase = Math.random() * Math.PI * 2;
        this.phaseSpeed = Math.random() * 0.02 + 0.01;
      }

      update(offsetX, offsetY) {
        this.phase += this.phaseSpeed;
        
        // Apply constant drift
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around
        if (this.x < -50) this.x = w + 50;
        if (this.x > w + 50) this.x = -50;
        if (this.y < -50) this.y = h + 50;
        if (this.y > h + 50) this.y = -50;
      }

      draw(offsetX, offsetY) {
        // Apply parallax offset based on layer speed
        const drawX = this.x + offsetX * this.layer.speed * 50;
        const drawY = this.y + offsetY * this.layer.speed * 50;

        const twinkle = Math.sin(this.phase) * 0.5 + 0.5; // 0 to 1
        
        ctx.beginPath();
        ctx.arc(drawX, drawY, this.layer.size * (0.5 + twinkle * 0.5), 0, Math.PI * 2);
        
        // Add glow to larger stars
        if (this.layer.size > 1.5) {
          ctx.shadowBlur = this.layer.size * 4;
          ctx.shadowColor = this.layer.color;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fillStyle = this.layer.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    class ShootingStar {
      constructor() {
        this.reset();
        this.active = false;
        // Random time before next launch
        this.timer = Math.random() * 200 + 100;
      }

      reset() {
        this.x = Math.random() * w;
        this.y = 0;
        this.length = Math.random() * 80 + 40;
        this.speed = Math.random() * 10 + 15;
        this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2; // roughly diagonal down-right
        this.opacity = 1;
        this.active = true;
      }

      update() {
        if (!this.active) {
          this.timer--;
          if (this.timer <= 0) this.reset();
          return;
        }

        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        
        // Fade out near end
        this.opacity -= 0.015;

        if (this.opacity <= 0 || this.x > w || this.y > h) {
          this.active = false;
          this.timer = Math.random() * 300 + 150;
        }
      }

      draw() {
        if (!this.active) return;
        
        const tailX = this.x - Math.cos(this.angle) * this.length;
        const tailY = this.y - Math.sin(this.angle) * this.length;

        const grad = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        grad.addColorStop(0.1, `rgba(97, 218, 251, ${this.opacity * 0.8})`);
        grad.addColorStop(1, 'rgba(59, 130, 246, 0)');

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
    }

    const initStars = () => {
      layers.forEach(layer => {
        layer.stars = [];
        for (let i = 0; i < layer.count; i++) {
          layer.stars.push(new Star(layer));
        }
      });
      shootingStars.length = 0;
      for (let i = 0; i < 3; i++) {
        shootingStars.push(new ShootingStar());
      }
    };

    resize();

    const animate = () => {
      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Dark navy space background
      ctx.fillStyle = '#030a16';
      ctx.fillRect(0, 0, w, h);

      // Draw nebula clouds (subtle radial gradients)
      const cx = w / 2 - mouseX * 20;
      const cy = h / 2 - mouseY * 20;
      
      const grad1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.6);
      grad1.addColorStop(0, 'rgba(29, 78, 216, 0.15)');
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, w, h);

      const grad2 = ctx.createRadialGradient(cx * 1.5, cy * 0.5, 0, cx * 1.5, cy * 0.5, w * 0.5);
      grad2.addColorStop(0, 'rgba(97, 218, 251, 0.08)');
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, w, h);

      // Draw stars
      layers.forEach(layer => {
        layer.stars.forEach(star => {
          star.update(mouseX, mouseY);
          star.draw(mouseX, mouseY);
        });
      });

      // Draw shooting stars
      shootingStars.forEach(ss => {
        ss.update();
        ss.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
      background: '#030a16',
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
      {/* Edge vignette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 40%, #030a16 100%)',
        pointerEvents: 'none'
      }} />
    </div>
  );
}
