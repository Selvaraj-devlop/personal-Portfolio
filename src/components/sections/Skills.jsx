// src/components/sections/Skills.jsx
import { useMultiReveal } from '../../hooks/useScrollReveal';
import { skills } from '../../data/portfolioData';

// Dynamically importing all icons used in portfolioData.js
import { 
  FaHtml5, FaCss3Alt, FaBootstrap, FaReact, FaNodeJs, FaPython, FaGit, FaGithub 
} from 'react-icons/fa';
import { 
  SiJavascript, SiExpress, SiMongodb, SiPostman 
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { MdDevices, MdBugReport, MdPsychology, MdGroups } from 'react-icons/md';
import { TbApi } from 'react-icons/tb';

const IconMap = {
  FaHtml5, FaCss3Alt, FaBootstrap, FaReact, FaNodeJs, FaPython, FaGit, FaGithub,
  SiJavascript, SiExpress, SiMongodb, SiPostman,
  VscVscode, MdDevices, MdBugReport, MdPsychology, MdGroups, TbApi
};

// Deduplicate and process skills into Periodic Table "Elements"
const generateElements = () => {
  const elements = [];
  let counter = 1;
  const seen = new Set();

  Object.entries(skills).forEach(([category, skillList]) => {
    skillList.forEach(skill => {
      if (seen.has(skill.name)) return;
      seen.add(skill.name);

      // Fallback symbol generator if icon doesn't exist
      let symbol = '';
      const cleanName = skill.name.replace(/[^a-zA-Z]/g, '');
      if (cleanName.length > 0) {
        if (cleanName.length === 1) symbol = cleanName[0].toUpperCase();
        else {
          symbol = cleanName.substring(0, 2);
          symbol = symbol.charAt(0).toUpperCase() + symbol.charAt(1).toLowerCase();
        }
      } else {
        symbol = '??';
      }

      elements.push({
        number: counter++,
        symbol: symbol,
        name: skill.name,
        category: category,
        color: skill.color || '#61DAFB',
        iconName: skill.icon // from portfolioData.js
      });
    });
  });
  return elements;
};

const elements = generateElements();

export default function Skills() {
  const sectionRef = useMultiReveal();

  // The specific row structure requested by the user:
  // 1, 2, 4, 4, 2, 1, and then groups of 4.
  const rowSizes = [1, 2, 4, 4, 2, 1, 4, 4];
  const rows = [];
  let currentIndex = 0;
  
  rowSizes.forEach(size => {
    if (currentIndex < elements.length) {
      rows.push(elements.slice(currentIndex, currentIndex + size));
      currentIndex += size;
    }
  });
  
  // If there are any leftover elements, chunk them by 4
  while (currentIndex < elements.length) {
    rows.push(elements.slice(currentIndex, currentIndex + 4));
    currentIndex += 4;
  }

  return (
    <section id="skills" className="section-wrapper" ref={sectionRef} style={{ overflow: 'hidden' }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5 reveal">
          <div className="section-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            Skills
          </div>
          <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Technical Arsenal</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: 600, margin: '0 auto', fontSize: '1.05rem' }}>
            The Periodic Table of my skills and technologies.
          </p>
        </div>

        {/* Structured Row Grid */}
        <div className="reveal" style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          maxWidth: '900px',
          margin: '0 auto',
          padding: '2rem 0'
        }}>
          {rows.map((row, rowIndex) => (
            <div 
              key={`row-${rowIndex}`} 
              style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '12px',
                marginTop: rowIndex === 6 ? '1.5rem' : '0' // Add a gap before the bottom blocks as requested
              }}
            >
              {row.map((el, colIndex) => {
                const IconComponent = IconMap[el.iconName];
                const i = rowIndex * 4 + colIndex; // approx index for animation delay
                return (
                  <div 
                    key={el.name}
                    className="skill-card-element"
                    style={{
                      border: `2px solid ${el.color}55`,
                      background: `linear-gradient(135deg, ${el.color}15, rgba(0,0,0,0.4))`,
                      display: 'flex', 
                      flexDirection: 'column',
                      padding: '8px',
                      borderRadius: '10px',
                      position: 'relative',
                      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      boxShadow: `0 4px 15px rgba(0,0,0,0.3), inset 0 0 10px ${el.color}11`,
                      cursor: 'crosshair',
                      animation: `fadeInUp 0.5s ease forwards ${i * 0.05}s`,
                      opacity: 0,
                      transform: 'translateY(20px)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px) scale(1.1)';
                      e.currentTarget.style.borderColor = el.color;
                      e.currentTarget.style.background = `linear-gradient(135deg, ${el.color}25, rgba(0,0,0,0.6))`;
                      e.currentTarget.style.boxShadow = `0 15px 25px -5px ${el.color}66, inset 0 0 20px ${el.color}55`;
                      e.currentTarget.style.zIndex = 10;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.borderColor = `${el.color}55`;
                      e.currentTarget.style.background = `linear-gradient(135deg, ${el.color}15, rgba(0,0,0,0.4))`;
                      e.currentTarget.style.boxShadow = `0 4px 15px rgba(0,0,0,0.3), inset 0 0 10px ${el.color}11`;
                      e.currentTarget.style.zIndex = 1;
                    }}
                  >
                    {/* Atomic Number */}
                    <span className="atomic-number" style={{ 
                      position: 'absolute', 
                      color: el.color,
                      fontWeight: 600,
                      fontFamily: 'var(--font-code)'
                    }}>
                      {el.number}
                    </span>
                    
                    {/* Category Abbreviation */}
                    <span className="category-abbr" style={{ 
                      position: 'absolute', 
                      color: 'rgba(255,255,255,0.4)',
                      fontFamily: 'var(--font-code)',
                      textTransform: 'uppercase'
                    }}>
                      {el.category.substring(0,3)}
                    </span>
                    
                    {/* Main Icon & Name */}
                    <div className="icon-container" style={{ margin: 'auto', textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      {IconComponent ? (
                        <div style={{ marginBottom: '6px' }} className="skill-icon-wrapper">
                          <IconComponent className="skill-icon" color={el.color} style={{ filter: `drop-shadow(0 0 8px ${el.color}80)` }} />
                        </div>
                      ) : (
                        <div className="skill-symbol" style={{ 
                          fontWeight: 800, 
                          color: el.color, 
                          lineHeight: 1,
                          fontFamily: 'var(--font-heading)',
                          textShadow: `0 0 10px ${el.color}99`,
                          marginBottom: '6px'
                        }}>
                          {el.symbol}
                        </div>
                      )}

                      <div className="skill-name-text" style={{ 
                        color: 'rgba(255,255,255,0.85)', 
                        whiteSpace: 'nowrap', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 500,
                        width: '100%'
                      }}>
                        {el.name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Global Keyframes for the grid stagger */}
        <style>{`
          .skill-card-element { width: 105px; height: 115px; }
          .atomic-number { top: 6px; left: 8px; font-size: 0.65rem; }
          .category-abbr { top: 6px; right: 8px; font-size: 0.55rem; }
          .skill-icon { width: 36px; height: 36px; }
          .skill-symbol { font-size: 1.8rem; }
          .skill-name-text { font-size: 0.65rem; }

          @media (max-width: 768px) {
            .skill-card-element { width: 72px; height: 82px; padding: 4px !important; }
            .atomic-number { top: 3px; left: 5px; font-size: 0.55rem; }
            .category-abbr { top: 3px; right: 5px; font-size: 0.45rem; }
            .skill-icon { width: 24px; height: 24px; }
            .skill-symbol { font-size: 1.2rem; }
            .skill-name-text { font-size: 0.5rem; }
            .skill-icon-wrapper { margin-bottom: 2px !important; }
          }

          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
