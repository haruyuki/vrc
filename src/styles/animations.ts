import { Variants } from "framer-motion";

export const bookVariants: Variants = {
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export const fullScreenVariants: Variants = {
  hidden: {
    scale: 0.8,
    opacity: 0,
    transition: {
      duration: 0.3
    }
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1]
    }
  }
};

export const galleryVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
    transition: {
      duration: 0.4
    }
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1]
    }
  }
};

export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1]
    }
  }
};

export const containerVariants: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const searchBarVariants: Variants = {
  focus: {
    scale: 1.02,
    boxShadow: "0 0 0 3px rgba(139, 69, 19, 0.1)",
    transition: {
      duration: 0.2
    }
  },
  blur: {
    scale: 1,
    boxShadow: "0 0 0 0px rgba(139, 69, 19, 0.1)",
    transition: {
      duration: 0.2
    }
  }
};