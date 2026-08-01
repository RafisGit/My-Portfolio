import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { init, send } from '@emailjs/browser';
import { useTheme } from '../context/ThemeContext';
import { useContact } from '../context/ContactContext';
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
      setError('Please fill in all fields');
      return;
    }

    setIsSending(true);

    try {
      let sentSuccessfully = false;

      // Layer 1: Attempt EmailJS
      try {
        const templateParams = {
          to_email: 'hrafi0445@gmail.com',
          to_name: 'MD. Rafi Hoque',
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
        console.warn('EmailJS attempt failed, using secondary email failover API...', emailJsErr);
      }

      // Layer 2: Failover to FormSubmit AJAX endpoint if EmailJS failed
      if (!sentSuccessfully) {
        const fsResponse = await fetch('https://formsubmit.co/ajax/hrafi0445@gmail.com', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: `New Portfolio Contact from ${formData.name}`,
            _template: 'table'
          })
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
      window.location.href = `mailto:hrafi0445@gmail.com?subject=${encodeURIComponent(`Portfolio Message from ${formData.name}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      
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
    navigator.clipboard.writeText('hrafi0445@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const panelVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 30,
        duration: 0.5
      } 
    },
    exit: { 
      x: '100%', 
      opacity: 0, 
      transition: { duration: 0.3 } 
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.2, duration: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.3 + i * 0.1, duration: 0.4 },
    }),
  };

  const buttonVariants = {
    hover: { scale: 1.03, y: -2 },
    tap: { scale: 0.96 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={`${styles.backdrop} ${isDark ? '' : styles.lightMode}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeContact}
            role="presentation"
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            className={`${styles.panel} ${isDark ? '' : styles.lightMode}`}
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
              <h2 id="contact-title" className={styles.title}>
                Let's Connect
              </h2>
              <motion.button
                className={styles.closeBtn}
                onClick={closeContact}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Close contact panel"
              >
                ✕
              </motion.button>
            </div>

            {/* Content */}
            <motion.div
              className={styles.content}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Availability Badge */}
              <motion.div
                className={styles.badge}
                custom={0}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <span className={styles.dot}>🟢</span>
                Available for Internship
              </motion.div>

              {/* Description */}
              <motion.p
                className={styles.description}
                custom={1}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                I'm actively seeking internship opportunities in software engineering. Feel free to reach out—I'd love to collaborate and build something amazing together.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                className={styles.actions}
                custom={2}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.a
                  href="https://www.linkedin.com/in/rafihoque/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.button} ${styles.secondary}`}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  LinkedIn Profile
                </motion.a>
                <motion.a
                  href="https://github.com/RafisGit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.button} ${styles.secondary}`}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  GitHub Profile
                </motion.a>
              </motion.div>

              {/* Copy Email Button */}
              <motion.div
                className={styles.copyEmail}
                custom={3}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.button
                  onClick={copyToClipboard}
                  className={styles.copyBtn}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {copied ? 'Copied!' : 'Copy Email'}
                </motion.button>
              </motion.div>

              {/* Contact Form */}
              <motion.form
                onSubmit={handleFormSubmit}
                className={styles.form}
                custom={4}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Your name"
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="your@email.com"
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Your message..."
                    className={styles.textarea}
                    rows="4"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  className={`${styles.button} ${styles.submit}`}
                  whileHover={!isSending ? { scale: 1.02, y: -1 } : {}}
                  whileTap={!isSending ? { scale: 0.97 } : {}}
                  disabled={isSending}
                >
                  {isSending ? 'Sending Message...' : 'Send Message'}
                </motion.button>

                {submitted && (
                  <motion.p
                    className={styles.success}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    ✓ Message sent successfully! I'll get back to you soon.
                  </motion.p>
                )}

                {error && (
                  <motion.p
                    className={styles.error}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    ✕ {error}
                  </motion.p>
                )}
              </motion.form>

              {/* Contact Info */}
              <motion.div
                className={styles.info}
                custom={5}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <p>
                  <strong>Email:</strong> hrafi0445@gmail.com
                </p>
                <p>
                  <strong>GitHub:</strong>{' '}
                  <a href="https://github.com/RafisGit" target="_blank" rel="noopener noreferrer">
                    github.com/RafisGit
                  </a>
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactPanel;
