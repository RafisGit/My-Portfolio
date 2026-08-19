import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { init, send } from '@emailjs/browser';
import { useTheme } from '../context/ThemeContext';
import { useContact } from '../context/ContactContext';
import { PERSONAL_INFO } from '../data/portfolioData';
import styles from './ContactPanel.module.css';

// Initialize EmailJS
init('H0pwHSyJ7-mJ-PleR');

const ContactPanel = () => {
  const { isDark } = useTheme();
  const { isOpen, closeContact } = useContact();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeContact();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, closeContact]);

  // Prevent body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsSending(true);

    try {
      let sentSuccessfully = false;

      // Layer 1: Attempt EmailJS
      try {
        const templateParams = {
          to_email: PERSONAL_INFO.email,
          to_name: PERSONAL_INFO.name,
          from_name: formData.name,
          from_email: formData.email,
          subject: `New Portfolio Message from ${formData.name}`,
          message: formData.message,
          timestamp: new Date().toLocaleString(),
          reply_to: formData.email,
        };

        await send(
          'service_xl9cho9',
          'template_m4s9ee9',
          templateParams
        );
        sentSuccessfully = true;
      } catch (emailJsErr) {
        console.warn('EmailJS attempt failed, activating secondary email failover API...', emailJsErr);
      }

      // Layer 2: Failover to FormSubmit AJAX endpoint if EmailJS failed
      if (!sentSuccessfully) {
        const fsResponse = await fetch(`https://formsubmit.co/ajax/${PERSONAL_INFO.email}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: `New Portfolio Contact from ${formData.name}`,
            _template: 'table',
          }),
        });

        if (fsResponse.ok) {
          sentSuccessfully = true;
        } else {
          throw new Error('FormSubmit endpoint failed');
        }
      }

      if (sentSuccessfully) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      }
    } catch (err) {
      console.error('Email Submission Error:', err);

      // Layer 3: Ultimate mailto fallback launch
      window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
        `Portfolio Message from ${formData.name}`
      )}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } finally {
      setIsSending(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.25 } },
  };

  const panelVariants = {
    hidden: { x: '100%' },
    visible: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 320,
        damping: 32,
      },
    },
    exit: {
      x: '100%',
      transition: { duration: 0.25, ease: 'easeIn' },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeContact}
            role="presentation"
            aria-hidden="true"
          />

          {/* Slide-out Drawer */}
          <motion.div
            className={`${styles.panel} ${!isDark ? styles.lightMode : ''}`}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
          >
            {/* Header */}
            <div className={styles.header}>
              <div>
                <span className="section-label">Direct Channel</span>
                <h2 id="contact-title" className={styles.title}>
                  Start a Conversation
                </h2>
              </div>
              <button
                className={styles.closeBtn}
                onClick={closeContact}
                aria-label="Close contact drawer"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content */}
            <div className={styles.content}>
              {/* Availability Badge */}
              <div className={styles.statusBadge}>
                <span className={styles.pulseDot}></span>
                <span>{PERSONAL_INFO.status}</span>
              </div>

              <p className={styles.description}>
                I'm actively seeking software engineering internships and collaborative projects. Send a message directly or connect across professional networks.
              </p>

              {/* Direct Action Chips */}
              <div className={styles.chipRow}>
                <button onClick={copyToClipboard} className={styles.copyChip}>
                  {copied ? '✓ Email Copied!' : `📋 Copy ${PERSONAL_INFO.email}`}
                </button>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkChip}
                >
                  LinkedIn ↗
                </a>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkChip}
                >
                  GitHub ↗
                </a>
              </div>

              {/* Form */}
              <form onSubmit={handleFormSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="contact-name" className={styles.label}>
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="e.g. Sarah Jenkins"
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="contact-email" className={styles.label}>
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="sarah@example.com"
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="contact-message" className={styles.label}>
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Tell me about your project, team, or opportunity..."
                    className={styles.textarea}
                    rows="4"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className={`${styles.submitBtn} magnetic-btn primary`}
                  disabled={isSending}
                >
                  {isSending ? 'Transmitting Message...' : 'Send Message →'}
                </button>

                {submitted && (
                  <div className={styles.successMessage}>
                    ✓ Message received! I will review and reply within 24 hours.
                  </div>
                )}

                {error && <div className={styles.errorMessage}>✕ {error}</div>}
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default React.memo(ContactPanel);
