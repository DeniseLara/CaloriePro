import { motion } from 'framer-motion';

export function TestimoniesHeader({ children }) {
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

export function TestimoniesSlider({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0}}
      whileInView={{ opacity: 1}}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.6,
        delay: 0.2,
        ease: 'easeOut'
      }}
    >
      {children}
    </motion.div>
  );
}