// src/components/effects/AuroraBackground.jsx
import { useEffect, useRef } from 'react';

function generateStars(count = 120) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    dur: (2 + Math.random() * 4).toFixed(1),
    delay: (Math.random() * 4).toFixed(1),
    size: Math.random() > 0.85 ? 3 : 2,
    opacity: 0.3 + Math.random() * 0.7,
  }));
}

const stars = generateStars(150);

export default function AuroraBackground() {
  return (
    <>
      {/* Aurora blobs */}
      <div className="aurora-bg" aria-hidden="true">
        <div className="aurora-blob" />
        <div className="aurora-blob" />
        <div className="aurora-blob" />
        <div className="aurora-blob" />
      </div>

      {/* Stars */}
      <div className="stars" aria-hidden="true">
        {stars.map((s) => (
          <div
            key={s.id}
            className="star"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity * 0.5,
              '--dur': `${s.dur}s`,
              '--delay': `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />
    </>
  );
}
