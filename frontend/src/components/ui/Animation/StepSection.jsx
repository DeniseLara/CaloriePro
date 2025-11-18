import { motion } from 'framer-motion';

export function StepsHeader({ children }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.header>
  );
}

export function StepCard({ children, index = 0 }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.2,
        ease: 'easeOut'
      }}
    >
      {children}
    </motion.li>
  );
}