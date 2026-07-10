// src/components/effects/TechOrbit.jsx
// Atomic orbital model — React Cyan / Electric Ocean theme
import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaBootstrap } from 'react-icons/fa';
import { SiJavascript, SiExpress } from 'react-icons/si';

// ── Constants ────────────────────────────────────────────────────────────────
const DEG  = Math.PI / 180;
const W    = 480;
const H    = 460;
const CX   = W / 2;
const CY   = H / 2;
const R    = 168;
const TILT = 68 * DEG;

// ── React Cyan color palette ──────────────────────────────────────────────────
const REACT_THEME = {
  ring1: { hex: '#61DAFB', rgb: '97,218,251'  },   // React Cyan
  ring2: { hex: '#3B82F6', rgb: '59,130,246'  },   // Blue
  ring3: { hex: '#0EA5E9', rgb: '14,165,233'  },   // Sky Blue
  glow:  { hex: '#A5F3FC', rgb: '165,243,252' },   // Cyan 200 (bright glow)
  deep:  { hex: '#1D4ED8', rgb: '29,78,216'   },   // Blue 700 (deep)
  sat:   { hex: '#E0F2FE', rgb: '224,242,254' },   // Light Blue
};

// ── Ring definitions ──────────────────────────────────────────────────────────
const RINGS = [
  { id: 0, rotZ:   0, speed:  0.50, color: REACT_THEME.ring1.hex, rgb: REACT_THEME.ring1.rgb, dashArray: '5 12',  dashDur: 4.0 },
  { id: 1, rotZ:  62, speed: -0.37, color: REACT_THEME.ring2.hex, rgb: REACT_THEME.ring2.rgb, dashArray: '3 10',  dashDur: 5.5 },
  { id: 2, rotZ: -62, speed:  0.43, color: REACT_THEME.ring3.hex, rgb: REACT_THEME.ring3.rgb, dashArray: '4  9',  dashDur: 4.8 },
];

// ── Orbiting icons (tech colors kept for icon identity, glow = cyan/blue) ─────
const ORBIT_ICONS = [
  { ring: 0, Icon: FaHtml5,      label: 'HTML5',      color: '#E44D26', glow: '97,218,251', phase: 0               },
  { ring: 0, Icon: FaBootstrap,  label: 'Bootstrap',  color: '#A78BFA', glow: '97,218,251', phase: Math.PI         },
  { ring: 1, Icon: FaCss3Alt,    label: 'CSS3',       color: '#818CF8', glow: '59,130,246', phase: 0.35            },
  { ring: 1, Icon: FaNodeJs,     label: 'Node.js',    color: '#86EFAC', glow: '59,130,246', phase: 0.35 + Math.PI  },
  { ring: 2, Icon: SiJavascript, label: 'JavaScript', color: '#FDE68A', glow: '14,165,233', phase: 0.9             },
  { ring: 2, Icon: SiExpress,    label: 'Express.js', color: '#ffffff', glow: '14,165,233', phase: 0.9 + Math.PI   },
];

// ── Small satellite particles ─────────────────────────────────────────────────
const SATELLITES = [
  { ring: 0, phase: Math.PI / 3      },
  { ring: 0, phase: Math.PI * 4 / 3  },
  { ring: 1, phase: Math.PI / 2      },
  { ring: 1, phase: Math.PI * 3 / 2  },
  { ring: 2, phase: Math.PI / 4      },
  { ring: 2, phase: Math.PI * 5 / 4  },
];

// ── Build SVG ellipse path ────────────────────────────────────────────────────
function buildRingPath(rotZDeg) {
  const rotZ = rotZDeg * DEG;
  const cosA = Math.cos(TILT);
  const cosZ = Math.cos(rotZ);
  const sinZ = Math.sin(rotZ);
  const N = 120;
  return Array.from({ length: N + 1 }, (_, i) => {
    const a  = (i / N) * 2 * Math.PI;
    const lx = R * Math.cos(a);
    const ly = R * Math.sin(a) * cosA;
    const sx = CX + lx * cosZ - ly * sinZ;
    const sy = CY + lx * sinZ + ly * cosZ;
    return `${i === 0 ? 'M' : 'L'}${sx.toFixed(2)},${sy.toFixed(2)}`;
  }).join(' ') + 'Z';
}

// ── Get icon screen position + depth ─────────────────────────────────────────
function getPos(ringIdx, angle) {
  const rotZ = RINGS[ringIdx].rotZ * DEG;
  const cosA = Math.cos(TILT);
  const sinA = Math.sin(TILT);
  const cosZ = Math.cos(rotZ);
  const sinZ = Math.sin(rotZ);

  const lx = R * Math.cos(angle);
  const ly = R * Math.sin(angle) * cosA;
  const lz = R * Math.sin(angle) * sinA;

  const sx = CX + lx * cosZ - ly * sinZ;
  const sy = CY + lx * sinZ + ly * cosZ;
  const nd = (lz + R) / (2 * R);

  return {
    pctX   : (sx / W) * 100,
    pctY   : (sy / H) * 100,
    scale  : 0.55 + 0.55 * nd,
    opacity: 0.35 + 0.65 * nd,
    zIndex : lz > 0 ? 8 : 2,
  };
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function TechOrbit() {
  const iconRefs = useRef(ORBIT_ICONS.map(() => null));
  const satRefs  = useRef(SATELLITES.map(() => null));
  const frameRef = useRef(null);
  const t0Ref    = useRef(null);

  const ringPaths = useMemo(() => RINGS.map(r => buildRingPath(r.rotZ)), []);

  useEffect(() => {
    const tick = (ts) => {
      if (!t0Ref.current) t0Ref.current = ts;
      const elapsed = (ts - t0Ref.current) / 1000;

      ORBIT_ICONS.forEach((icon, i) => {
        const el = iconRefs.current[i];
        if (!el) return;
        const angle = icon.phase + elapsed * RINGS[icon.ring].speed;
        const { pctX, pctY, scale, opacity, zIndex } = getPos(icon.ring, angle);
        el.style.left      = `${pctX.toFixed(3)}%`;
        el.style.top       = `${pctY.toFixed(3)}%`;
        el.style.transform = `translate(-50%,-50%) scale(${scale.toFixed(4)})`;
        el.style.opacity   = opacity.toFixed(4);
        el.style.zIndex    = zIndex;
      });

      SATELLITES.forEach((sat, i) => {
        const el = satRefs.current[i];
        if (!el) return;
        const angle = sat.phase + elapsed * RINGS[sat.ring].speed;
        const { pctX, pctY, scale, opacity, zIndex } = getPos(sat.ring, angle);
        el.style.left      = `${pctX.toFixed(3)}%`;
        el.style.top       = `${pctY.toFixed(3)}%`;
        el.style.transform = `translate(-50%,-50%) scale(${(scale * 0.65).toFixed(4)})`;
        el.style.opacity   = (opacity * 0.95).toFixed(4);
        el.style.zIndex    = zIndex;
      });

      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const cpx = (CX / W) * 100;
  const cpy = (CY / H) * 100;

  return (
    <div
      style={{ position: 'relative', width: '100%', maxWidth: W, aspectRatio: `${W}/${H}`, margin: '0 auto' }}
      role="img"
      aria-label="Technology stack atomic orbital"
    >
      {/* ── SVG layer ──────────────────────────────────────────────── */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none', zIndex: 2 }}
        aria-hidden="true"
      >
        <defs>
          {/* Ring neon glow */}
          <filter id="orb-ring-glow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Soft ambient blur */}
          <filter id="orb-soft" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="20"/>
          </filter>
          <filter id="orb-mid" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="10"/>
          </filter>

          {/* Ambient center glow radial */}
          <radialGradient id="orb-ambient" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#61DAFB" stopOpacity="0.45"/>
            <stop offset="50%"  stopColor="#3B82F6" stopOpacity="0.15"/>
            <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
          </radialGradient>

          {/* Per-ring stroke gradients */}
          {RINGS.map(ring => (
            <linearGradient key={ring.id} id={`orb-rg-${ring.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor={ring.color} stopOpacity="0"/>
              <stop offset="30%"  stopColor={ring.color} stopOpacity="0.9"/>
              <stop offset="70%"  stopColor={ring.color} stopOpacity="0.9"/>
              <stop offset="100%" stopColor={ring.color} stopOpacity="0"/>
            </linearGradient>
          ))}
        </defs>

        {/* ── Layered ambient glow — large outer haze ──────────────── */}
        <ellipse cx={CX} cy={CY} rx={185} ry={110}
          fill="url(#orb-ambient)" filter="url(#orb-soft)" opacity={0.9}/>
        <ellipse cx={CX} cy={CY} rx={100} ry={65}
          fill="rgba(59,130,246,0.25)" filter="url(#orb-mid)"/>
        <ellipse cx={CX} cy={CY} rx={52} ry={36}
          fill="rgba(97,218,251,0.25)" filter="url(#orb-mid)"/>

        {/* ── Orbital ring paths ────────────────────────────────────── */}
        {RINGS.map(ring => (
          <g key={ring.id} filter="url(#orb-ring-glow)">
            {/* Base tinted ring */}
            <path
              d={ringPaths[ring.id]}
              fill="none"
              stroke={`url(#orb-rg-${ring.id})`}
              strokeWidth={1.5}
              strokeOpacity={0.6}
            />
            {/* Bright neon animated dash */}
            <motion.path
              d={ringPaths[ring.id]}
              fill="none"
              stroke={ring.color}
              strokeWidth={2}
              strokeDasharray={ring.dashArray}
              strokeLinecap="round"
              strokeOpacity={0.95}
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -60 }}
              transition={{ duration: ring.dashDur, repeat: Infinity, ease: 'linear' }}
            />
            {/* Extra glow layer on top */}
            <path
              d={ringPaths[ring.id]}
              fill="none"
              stroke={REACT_THEME.glow.hex}
              strokeWidth={0.6}
              strokeOpacity={0.3}
            />
          </g>
        ))}
      </svg>

      {/* ── Central glowing React sphere ─────────────────────────── */}
      <motion.div
        style={{
          position: 'absolute',
          left: `${cpx}%`,
          top:  `${cpy}%`,
          transform: 'translate(-50%,-50%)',
          zIndex: 5,
          width: 92, height: 92,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 36% 28%, #A5F3FC 0%, #61DAFB 28%, #3B82F6 55%, #1D4ED8 85%, #1E3A8A 100%)',
          border: '1.5px solid rgba(165,243,252,0.6)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          overflow: 'visible',
        }}
        animate={{
          boxShadow: [
            '0 0 20px rgba(97,218,251,0.7), 0 0 50px rgba(59,130,246,0.45), 0 0 100px rgba(29,78,216,0.25)',
            '0 0 35px rgba(165,243,252,0.95), 0 0 80px rgba(97,218,251,0.7),  0 0 150px rgba(59,130,246,0.4)',
            '0 0 20px rgba(97,218,251,0.7), 0 0 50px rgba(59,130,246,0.45), 0 0 100px rgba(29,78,216,0.25)',
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Glass sheen highlight */}
        <div style={{
          position:'absolute', top:6, left:'22%',
          width:'54%', height:'34%',
          background:'linear-gradient(180deg, rgba(255,255,255,0.28) 0%, transparent 100%)',
          borderRadius:'50%', pointerEvents:'none',
        }}/>

        {/* React icon — dark blue for contrast on cyan */}
        <FaReact style={{
          fontSize: 32,
          color: '#ffffff',
          filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.9)) drop-shadow(0 0 20px rgba(97,218,251,0.7))',
        }}/>
        <span style={{
          fontSize: 6.5,
          fontFamily: 'var(--font-code)',
          color: 'rgba(255,255,255,0.95)',
          fontWeight: 700,
          letterSpacing: '0.07em',
          lineHeight: 1,
        }}>React</span>

        {/* Pulsing halo rings */}
        {[110, 140, 172].map((s, i) => (
          <motion.div key={i} style={{
            position: 'absolute',
            width: s, height: s,
            borderRadius: '50%',
            border: `${i === 0 ? 1.5 : 1}px solid rgba(97,218,251,${i === 0 ? 0.45 : i === 1 ? 0.25 : 0.12})`,
            pointerEvents: 'none',
          }}
          animate={{
            scale:   [1, 1.12 + i * 0.04, 1],
            opacity: [0.6, 0.05, 0.6],
          }}
          transition={{ duration: 2.3 + i * 0.5, repeat: Infinity, ease: 'easeOut', delay: i * 0.55 }}
          />
        ))}
      </motion.div>

      {/* ── Orbiting icon nodes ─────────────────────────────────────── */}
      {ORBIT_ICONS.map((icon, i) => (
        <div
          key={icon.label}
          ref={el => { iconRefs.current[i] = el; }}
          style={{
            position: 'absolute',
            left: `${cpx}%`,
            top:  `${cpy}%`,
            transform: 'translate(-50%,-50%)',
            willChange: 'transform, opacity, left, top',
          }}
        >
          <motion.div
            whileHover={{ scale: 1.5 }}
            transition={{ type: 'spring', stiffness: 320, damping: 18 }}
            style={{
              width: 54, height: 54,
              borderRadius: '50%',
              /* Dark navy glass */
              background: 'radial-gradient(circle at 33% 28%, rgba(97,218,251,0.22) 0%, rgba(3,10,22,0.92) 70%)',
              border: '1.5px solid rgba(97,218,251,0.55)',
              boxShadow: `0 0 14px rgba(${icon.glow},0.55), 0 0 28px rgba(${icon.glow},0.25), inset 0 0 12px rgba(97,218,251,0.1)`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              cursor: 'pointer',
              position: 'relative', overflow: 'hidden',
            }}
          >
            {/* Glass sheen */}
            <div style={{
              position:'absolute', top:0, left:'20%',
              width:'60%', height:'38%',
              background:'linear-gradient(180deg, rgba(255,255,255,0.16) 0%, transparent 100%)',
              borderRadius:'50%', pointerEvents:'none',
            }}/>

            <icon.Icon style={{
              fontSize: 18,
              color: icon.color,
              filter: `drop-shadow(0 0 5px ${icon.color}) drop-shadow(0 0 10px rgba(97,218,251,0.5))`,
              flexShrink: 0,
            }}/>
            <span style={{
              fontSize: 5.5,
              fontFamily: 'var(--font-code)',
              color: 'rgba(165,243,252,0.95)',
              fontWeight: 600,
              letterSpacing: '0.05em',
              whiteSpace: 'nowrap',
              lineHeight: 1,
            }}>
              {icon.label}
            </span>
          </motion.div>
        </div>
      ))}

      {/* ── Satellite glow particles ───────────────────────────────── */}
      {SATELLITES.map((sat, i) => (
        <div
          key={`sat-${i}`}
          ref={el => { satRefs.current[i] = el; }}
          style={{
            position: 'absolute',
            left: `${cpx}%`,
            top:  `${cpy}%`,
            transform: 'translate(-50%,-50%)',
            willChange: 'transform, opacity, left, top',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        >
          <motion.div
            style={{
              width: 8, height: 8,
              borderRadius: '50%',
              background: `radial-gradient(circle, #E0F2FE 0%, ${RINGS[sat.ring].color} 60%, transparent 100%)`,
              boxShadow: `0 0 8px rgba(224,242,254,0.95), 0 0 18px rgba(97,218,251,0.7), 0 0 30px rgba(59,130,246,0.4)`,
            }}
            animate={{
              scale:   [0.7, 1.4, 0.7],
              opacity: [0.55, 1, 0.55],
            }}
            transition={{
              duration: 1.7 + (i % 3) * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.28,
            }}
          />
        </div>
      ))}


    </div>
  );
}
