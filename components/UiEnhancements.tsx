import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-yellow-500 origin-left z-[100]"
      style={{ scaleX }}
    />
  );
};

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [lastScrollAt, setLastScrollAt] = useState(0);

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    const toggleVisibility = () => {
      setLastScrollAt(Date.now());
      setIsScrolling(true);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(() => setIsScrolling(false), 180);

      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    // Prevent accidental taps while user is still performing a scroll gesture.
    if (Date.now() - lastScrollAt < 250) return;
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.5 }}
      transition={{ duration: 0.3 }}
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-40 p-3 rounded-full bg-zinc-800/80 backdrop-blur-md border border-white/10 text-white shadow-lg hover:bg-yellow-500 hover:border-yellow-500 transition-all group ${!isVisible || isScrolling ? 'pointer-events-none' : 'pointer-events-auto'}`}
      aria-label="Voltar ao topo"
    >
      <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
    </motion.button>
  );
};
