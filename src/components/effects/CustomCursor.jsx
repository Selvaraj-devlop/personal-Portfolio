// src/components/effects/CustomCursor.jsx
import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animId;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dot) {
        dot.style.left = `${mouseX - 4}px`;
        dot.style.top = `${mouseY - 4}px`;
      }
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      ringX = lerp(ringX, mouseX - 20, 0.12);
      ringY = lerp(ringY, mouseY - 20, 0.12);
      if (ring) {
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('btn-magnetic') ||
        target.closest('.btn-magnetic')
      ) {
        setHovered(true);
      }
    };
    const handleMouseOut = () => setHovered(false);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className={`cursor-ring${hovered ? ' hovered' : ''}`} aria-hidden="true" />
    </>
  );
}
