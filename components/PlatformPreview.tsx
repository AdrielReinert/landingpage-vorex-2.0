import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AppleSection } from './AppleSection';
import { TextReveal } from './TextReveal';

const PlatformPreview: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Animation values based on scroll position
  const scale = useTransform(scrollYProgress, [0.1, 0.5], [0.8, 1.1]);
  const rotateX = useTransform(scrollYProgress, [0.1, 0.5], [20, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  return (
    <section ref={containerRef} className="py-20 bg-black relative flex flex-col items-center perspective-1000">
      <div className="max-w-[980px] w-full px-6 z-10">
        
        <div className="mb-8 text-center flex flex-col items-center">
          <TextReveal className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight justify-center">
            Design que converte.
          </TextReveal>
          <AppleSection delay={0.2}>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
              Uma interface imersiva desenhada para maximizar o tempo de sessão e o engajamento dos jogadores.
            </p>
          </AppleSection>
        </div>
      </div>

      <motion.div
         style={{ 
           scale, 
           rotateX,
           opacity,
           y,
           transformPerspective: 1000,
           willChange: "transform, opacity"
         }}
         className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] px-4 mt-8"
      >
           {/* Placeholder for a high-end UI shot */}
           <div className="rounded-[2rem] md:rounded-[2.5rem] bg-zinc-900 shadow-2xl overflow-hidden flex items-center justify-center relative group border-[6px] md:border-[8px] border-zinc-800">
              <img 
                src="https://i.postimg.cc/sX2YFcqH/Screen-Recording-03-16-2026-13-49-06-1.gif" 
                alt="Interface da Plataforma Vorex" 
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
              
              {/* Reflection effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
           </div>
      </motion.div>
    </section>
  );
};

export default PlatformPreview;
