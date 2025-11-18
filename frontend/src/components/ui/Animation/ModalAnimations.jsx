export const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

export const modalVariants = {
  hidden: { 
    opacity: 0, 
    y: -50,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  },
  exit: { 
    opacity: 0, 
    transition: { duration: 0.15 } 
  }
};

export const contentVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.25,
      delay: 0.1
    }
  }
};
