import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useContact } from '../context/ContactContext';
import styles from './CTA.module.css';

const CTA = () => {
  const { isDark } = useTheme();
  const { openContact } = useContact();

  return (
    <section className={`${styles.cta} ${isDark ? '' : styles.lightMode}`}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Ready to Collaborate?
          </motion.h2>

          <motion.p
            className={styles.text}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Actively seeking internship opportunities in software engineering.
            <br />
            Let's build something amazing together.
          </motion.p>

          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={openContact}
              className={`${styles.button} ${styles.primary}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Build Something Together
              <span>→</span>
            </motion.button>
          </motion.div>

          <motion.p
            className={styles.contact}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <strong>Email:</strong> hrafi0445@gmail.com
            <br />
            <strong>GitHub:</strong>{' '}
            <a href="https://github.com/RafisGit" target="_blank" rel="noopener noreferrer">
              github.com/RafisGit
            </a>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
