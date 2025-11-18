import { motion } from 'framer-motion';

export function BenefitsHeader({ children }) {
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

export function BenefitCard({ children, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.15,
        ease: 'easeOut'
      }}
    >
      {children}
    </motion.article>
  );
}
