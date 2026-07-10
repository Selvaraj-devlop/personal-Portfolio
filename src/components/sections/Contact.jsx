// src/components/sections/Contact.jsx
import { useState } from 'react';
import { useMultiReveal } from '../../hooks/useScrollReveal';
import { personalInfo } from '../../data/portfolioData';
import toast, { Toaster } from 'react-hot-toast';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  const sectionRef = useMultiReveal();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 10) e.message = 'Message is too short';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      toast.error('Please fix the errors above.', { style: toastStyle });
      return;
    }
    setLoading(true);
    // Simulate send (replace with EmailJS integration)
    await new Promise((r) => setTimeout(r, 1500));
    toast.success('Message sent! I\'ll get back to you soon. 🚀', { style: toastStyle });
    setForm({ name: '', email: '', message: '' });
    setLoading(false);
  };

  const toastStyle = {
    background: '#0d1628',
    color: 'white',
    border: '1px solid rgba(108,99,255,0.4)',
    borderRadius: '12px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.875rem',
  };

  const contactItems = [
    { Icon: FaEnvelope, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}`, color: '#6C63FF' },
    { Icon: FaPhone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}`, color: '#00E5FF' },
    { Icon: FaMapMarkerAlt, label: 'Location', value: personalInfo.location, href: '#', color: '#FF4ECD' },
    { Icon: FaLinkedin, label: 'LinkedIn', value: 'linkedin.com/in/selvarajc', href: personalInfo.linkedin, color: '#0077B5' },
    { Icon: FaGithub, label: 'GitHub', value: 'github.com/selvarajc', href: personalInfo.github, color: '#ffffff' },
  ];

  return (
    <section id="contact" className="section-wrapper contact-section" style={{ padding: '3rem 0 2rem' }} ref={sectionRef}>
      <Toaster position="top-right" />

      <div className="container">
        {/* Header */}
        <div className="text-center mb-4 reveal">
          <div className="section-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Contact
          </div>
          <h2 className="section-title">Let's Work Together</h2>
          <div className="section-divider mx-auto" />
          <p style={{ color: 'var(--text-muted)', maxWidth: 500, margin: '1rem auto 0', fontSize: '0.9rem' }}>
            Have a project in mind or an opportunity? I'd love to hear from you!
          </p>
        </div>

        <div className="row g-4 align-items-start">
          {/* Left — Contact Info */}
          <div className="col-lg-5 reveal-left">
            <div className="mb-4">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
                Get in Touch
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                I'm currently available for freelance work, internships, and full-time opportunities.
                Feel free to reach out!
              </p>
            </div>

            {contactItems.map(({ Icon, label, value, href, color }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="contact-info-item"
                aria-label={`${label}: ${value}`}
              >
                <div
                  className="contact-icon-wrap"
                  style={{ background: `${color}18`, border: `1px solid ${color}44`, color }}
                >
                  <Icon />
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-code)' }}>
                    {label}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'white', fontWeight: 500 }}>{value}</div>
                </div>
              </a>
            ))}

            {/* Download Resume button */}
            <div className="mt-3">
              <a
                href="/resume.pdf"
                download
                className="btn-magnetic btn-primary-glow w-100 justify-content-center"
                style={{ display: 'flex' }}
                aria-label="Download Resume"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download Resume
              </a>
            </div>
          </div>

          {/* Right — Contact Form */}
          <div className="col-lg-7 reveal-right">
            <div className="contact-form-card">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: 'white', marginBottom: '1.5rem' }}>
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div className="mb-4">
                  <label htmlFor="contact-name" className="form-label-custom">Your Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="form-control-custom"
                    placeholder="Selvaraj C"
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <div id="name-error" style={{ color: '#ff4ecd', fontSize: '0.75rem', marginTop: '0.35rem', fontFamily: 'var(--font-code)' }}>
                      ⚠ {errors.name}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label htmlFor="contact-email" className="form-label-custom">Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="form-control-custom"
                    placeholder="your@email.com"
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <div id="email-error" style={{ color: '#ff4ecd', fontSize: '0.75rem', marginTop: '0.35rem', fontFamily: 'var(--font-code)' }}>
                      ⚠ {errors.email}
                    </div>
                  )}
                </div>

                {/* Message */}
                <div className="mb-4">
                  <label htmlFor="contact-message" className="form-label-custom">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="form-control-custom"
                    placeholder="Tell me about your project or opportunity..."
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <div id="message-error" style={{ color: '#ff4ecd', fontSize: '0.75rem', marginTop: '0.35rem', fontFamily: 'var(--font-code)' }}>
                      ⚠ {errors.message}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-magnetic btn-primary-glow w-100 justify-content-center"
                  style={{ display: 'flex', padding: '0.95rem 2rem', fontSize: '0.95rem' }}
                  aria-label="Send message"
                >
                  {loading ? (
                    <>
                      <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                      Send Message
                    </>
                  )}
                </button>

                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '1rem', fontFamily: 'var(--font-code)' }}>
                  I typically respond within 24 hours ⚡
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
