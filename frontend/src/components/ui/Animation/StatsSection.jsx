import { motion } from 'framer-motion';

export function StatCard({ children, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.34, 1.56, 0.64, 1] 
      }}
    >
      {children}
    </motion.article>
  );
}

export function StatCardSimple({ children, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.4,
        delay: index * 0.1,
        ease: 'easeOut'
      }}
    >
      {children}
    </motion.article>
  );
}