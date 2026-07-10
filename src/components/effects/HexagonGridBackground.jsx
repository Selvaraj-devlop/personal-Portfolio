// src/components/effects/HexagonGridBackground.jsx
import { useEffect, useRef } from 'react';

export default function HexagonGridBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w, h;
    let animationFrameId;
    const hexRadius = 35; // Size of hexagons
    const hexHeight = hexRadius * Math.sqrt(3);
    const hexWidth = hexRadius * 2;
    const horizSpacing = hexWidth * 0.75;
    const vertSpacing = hexHeight;

    let hexes = [];
    
    // Mouse tracking
    const mouse = { x: -1000, y: -1000, radius: 150 };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      initHexGrid();
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseOut = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    class Hexagon {
      constructor(x, y, row, col) {
        this.x = x;
        this.y = y;
        this.row = row;
        this.col = col;
        // Base opacity is very low
        this.baseOpacity = (Math.random() * 0.05) + 0.02;
        this.currentOpacity = this.baseOpacity;
        this.targetOpacity = this.baseOpacity;
        
        // Randomly assign a subtle pulsing behavior to some hexes
        this.isPulsing = Math.random() > 0.95;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = (Math.random() * 0.02) + 0.01;
      }

      update() {
        // Distance to mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // If mouse is near, light up
        if (distance < mouse.radius) {
          // Closer = brighter (up to 0.6 opacity)
          const intensity = 1 - (distance / mouse.radius);
          this.targetOpacity = this.baseOpacity + (intensity * 0.45);
        } else if (this.isPulsing) {
          // Background random pulsing
          this.pulsePhase += this.pulseSpeed;
          this.targetOpacity = this.baseOpacity + (Math.sin(this.pulsePhase) * 0.5 + 0.5) * 0.15;
        } else {
          this.targetOpacity = this.baseOpacity;
        }

        // Smoothly interpolate to target opacity
        this.currentOpacity += (this.targetOpacity - this.currentOpacity) * 0.1;
      }

      draw() {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 180) * (60 * i);
          const px = this.x + hexRadius * Math.cos(angle);
          const py = this.y + hexRadius * Math.sin(angle);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();

        // Stroke (React Cyan)
        ctx.strokeStyle = `rgba(97, 218, 251, ${this.currentOpacity * 1.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Fill
        if (this.currentOpacity > this.baseOpacity + 0.05) {
          // When lit up, add a slight blue fill
          ctx.fillStyle = `rgba(59, 130, 246, ${this.currentOpacity * 0.3})`;
          ctx.fill();
        }
      }
    }

    const initHexGrid = () => {
      hexes = [];
      const cols = Math.ceil(w / horizSpacing) + 1;
      const rows = Math.ceil(h / vertSpacing) + 1;

      for (let row = -1; row <= rows; row++) {
        for (let col = -1; col <= cols; col++) {
          // Offset odd columns down by half a hex height
          const x = col * horizSpacing;
          let y = row * vertSpacing;
          if (col % 2 !== 0) {
            y += vertSpacing / 2;
          }
          hexes.push(new Hexagon(x, y, row, col));
        }
      }
    };

    const animate = () => {
      ctx.fillStyle = '#030a16'; // Deep navy background
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < hexes.length; i++) {
        hexes[i].update();
        hexes[i].draw();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
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
      {/* Edge vignette to soften the grid boundaries */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, transparent 30%, #030a16 100%)',
        pointerEvents: 'none'
      }} />
    </div>
  );
}
