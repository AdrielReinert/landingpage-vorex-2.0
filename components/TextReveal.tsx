import React from 'react';
import { motion } from 'framer-motion';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  gradient?: boolean;
  gold?: boolean;
}

export const TextReveal: React.FC<TextRevealProps> = ({ children, className = "", delay = 0, gradient = false, gold = false }) => {
  const words = children.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ display: "flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span 
          variants={child} 
          key={index} 
          style={{ willChange: "transform, opacity, filter" }}
          className={`mr-[0.25em] ${gold ? 'bg-clip-text text-transparent bg-gradient-to-b from-yellow-200 via-yellow-500 to-yellow-700' : gradient ? 'bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40' : ''}`}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};
