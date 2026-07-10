// src/components/CommandPalette.jsx
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  FiHome, FiUser, FiZap, FiBriefcase, 
  FiCode, FiAward, FiMail, FiFileText, FiGithub, FiTerminal
} from 'react-icons/fi';

const commands = [
  { id: 'home', label: 'Go to Home', icon: FiHome, section: 'hero' },
  { id: 'about', label: 'Go to About', icon: FiUser, section: 'about' },
  { id: 'skills', label: 'Go to Skills', icon: FiZap, section: 'skills' },
  { id: 'experience', label: 'Go to Experience', icon: FiBriefcase, section: 'experience' },
  { id: 'projects', label: 'View Projects', icon: FiCode, section: 'projects' },
  { id: 'education', label: 'Go to Education', icon: FiAward, section: 'education' },
  { id: 'certifications', label: 'Go to Certifications', icon: FiAward, section: 'certifications' },
  { id: 'contact', label: 'Contact Me', icon: FiMail, section: 'contact' },
  { id: 'resume', label: 'Download Resume', icon: FiFileText, action: 'resume' },
  { id: 'github', label: 'Open GitHub', icon: FiGithub, action: 'github' },
  { id: 'email', label: 'Send Email', icon: FiMail, action: 'email' },
];

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef(null);

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, filtered.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); }
      if (e.key === 'Enter') { e.preventDefault(); runCommand(filtered[activeIdx]); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, filtered, activeIdx]);

  const runCommand = (cmd) => {
    if (!cmd) return;
    if (cmd.section) {
      document.getElementById(cmd.section)?.scrollIntoView({ behavior: 'smooth' });
    } else if (cmd.action === 'resume') {
      window.open('/resume.pdf', '_blank');
    } else if (cmd.action === 'github') {
      window.open('https://github.com/selvarajc', '_blank');
    } else if (cmd.action === 'email') {
      window.location.href = 'mailto:Selvarajcdev@gmail.com';
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(3, 10, 22, 0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '12vh',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '600px',
              background: 'linear-gradient(180deg, rgba(8,12,28,0.95) 0%, rgba(3,10,22,0.95) 100%)',
              border: '1px solid rgba(97,218,251,0.2)',
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(97,218,251,0.1), 0 0 40px rgba(97,218,251,0.15)',
              overflow: 'hidden',
              fontFamily: 'var(--font-body)',
            }}
          >
            {/* Input Header */}
            <div style={{ 
              display: 'flex', alignItems: 'center', 
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid rgba(97,218,251,0.15)',
              background: 'rgba(97,218,251,0.03)'
            }}>
              <FiTerminal size={20} color="#61DAFB" style={{ marginRight: '1rem', flexShrink: 0 }} />
              <input
                ref={inputRef}
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => { setQuery(e.target.value); setActiveIdx(0); }}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#fff',
                  fontSize: '1.1rem',
                  fontFamily: 'var(--font-code)',
                }}
                aria-label="Search commands"
                autoComplete="off"
                spellCheck="false"
              />
              <kbd style={{
                background: 'rgba(97,218,251,0.1)',
                border: '1px solid rgba(97,218,251,0.3)',
                color: '#61DAFB',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-code)',
                fontWeight: 600,
              }}>ESC</kbd>
            </div>

            {/* Results List */}
            <div style={{ 
              maxHeight: '350px', 
              overflowY: 'auto',
              padding: '0.5rem',
            }}>
              {filtered.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-code)' }}>
                  No matching commands found.
                </div>
              ) : (
                filtered.map((cmd, i) => {
                  const isActive = i === activeIdx;
                  const Icon = cmd.icon;
                  return (
                    <div
                      key={cmd.id}
                      onClick={() => runCommand(cmd)}
                      onMouseEnter={() => setActiveIdx(i)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.85rem 1rem',
                        margin: '0.25rem 0',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        background: isActive ? 'rgba(97,218,251,0.1)' : 'transparent',
                        borderLeft: `3px solid ${isActive ? '#61DAFB' : 'transparent'}`,
                        transition: 'all 0.1s ease',
                      }}
                    >
                      <Icon 
                        size={18} 
                        style={{ 
                          color: isActive ? '#61DAFB' : 'rgba(255,255,255,0.4)',
                          marginRight: '1rem',
                          transition: 'color 0.2s ease',
                        }} 
                      />
                      <span style={{ 
                        color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
                        fontSize: '0.95rem',
                        fontWeight: isActive ? 600 : 400,
                      }}>
                        {cmd.label}
                      </span>
                      
                      {isActive && (
                        <span style={{ 
                          marginLeft: 'auto', 
                          fontSize: '0.75rem', 
                          color: '#61DAFB',
                          fontFamily: 'var(--font-code)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          Select ↵
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Hints */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              padding: '0.75rem 1rem',
              borderTop: '1px solid rgba(97,218,251,0.1)',
              background: 'rgba(0,0,0,0.2)',
              fontSize: '0.7rem',
              fontFamily: 'var(--font-code)',
              color: 'rgba(255,255,255,0.4)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <kbd style={kbdStyle}>↑</kbd><kbd style={kbdStyle}>↓</kbd> Navigate
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <kbd style={kbdStyle}>↵</kbd> Select
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <kbd style={kbdStyle}>ESC</kbd> Close
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const kbdStyle = {
  background: 'rgba(255,255,255,0.1)',
  border: '1px solid rgba(255,255,255,0.15)',
  padding: '2px 6px',
  borderRadius: '4px',
  color: 'rgba(255,255,255,0.7)',
};
