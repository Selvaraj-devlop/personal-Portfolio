// src/components/effects/DataFlowBackground.jsx
import { useEffect, useRef } from 'react';

export default function DataFlowBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w, h;
    let animationFrameId;

    const dataPackets = [];
    const gridSize = 60; // Size of the circuit grid cells
    const packetCount = 45; // Number of active data beams

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    
    class DataPacket {
      constructor() {
        this.reset();
        // Randomize initial position so they don't all start at edges
        if (this.isHorizontal) {
          this.x = Math.random() * w;
        } else {
          this.y = Math.random() * h;
        }
      }

      reset() {
        this.isHorizontal = Math.random() > 0.5;
        this.speed = (Math.random() * 3) + 2.5; // High speed
        this.length = Math.random() * 200 + 80; // Long light trails
        this.opacity = Math.random() * 0.6 + 0.2;
        
        if (this.isHorizontal) {
          // Snap to grid
          this.y = Math.floor(Math.random() * (h / gridSize)) * gridSize;
          this.x = Math.random() > 0.5 ? -this.length : w + this.length;
          this.direction = this.x < 0 ? 1 : -1;
        } else {
          // Snap to grid
          this.x = Math.floor(Math.random() * (w / gridSize)) * gridSize;
          this.y = Math.random() > 0.5 ? -this.length : h + this.length;
          this.direction = this.y < 0 ? 1 : -1;
        }
      }

      update() {
        if (this.isHorizontal) {
          this.x += this.speed * this.direction;
          if ((this.direction === 1 && this.x > w + this.length) || 
              (this.direction === -1 && this.x < -this.length)) {
            this.reset();
          }
        } else {
          this.y += this.speed * this.direction;
          if ((this.direction === 1 && this.y > h + this.length) || 
              (this.direction === -1 && this.y < -this.length)) {
            this.reset();
          }
        }
      }

      draw() {
        ctx.beginPath();
        // Create glowing gradient trail
        let grad;
        if (this.isHorizontal) {
          grad = ctx.createLinearGradient(this.x, this.y, this.x - (this.length * this.direction), this.y);
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x - (this.length * this.direction), this.y);
        } else {
          grad = ctx.createLinearGradient(this.x, this.y, this.x, this.y - (this.length * this.direction));
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x, this.y - (this.length * this.direction));
        }
        
        grad.addColorStop(0, `rgba(97, 218, 251, ${this.opacity})`); // React Cyan bright head
        grad.addColorStop(0.2, `rgba(59, 130, 246, ${this.opacity * 0.6})`); // Blue mid
        grad.addColorStop(1, 'rgba(59, 130, 246, 0)'); // Fades to transparent tail
        
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
    }

    const init = () => {
      resize();
      dataPackets.length = 0;
      for (let i = 0; i < packetCount; i++) {
        dataPackets.push(new DataPacket());
      }
    };

    const animate = () => {
      // Slowly clear canvas to create a motion blur effect
      ctx.fillStyle = 'rgba(3, 10, 22, 0.25)'; // Deep navy background
      ctx.fillRect(0, 0, w, h);

      // Draw faint static grid network
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.04)'; // Extremely faint blue grid
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= w; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y <= h; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // Update and draw packets
      dataPackets.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', init);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
      background: '#030a16', // Deep navy fallback
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
      {/* Heavy vignette overlay to blend edges into pure darkness */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, transparent 30%, #030a16 100%)',
        pointerEvents: 'none'
      }} />
    </div>
  );
}
