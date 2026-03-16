import React from 'react';
import { motion } from 'framer-motion';
import { AppleSection } from './AppleSection';
import { TextReveal } from './TextReveal';

const PlatformPreview: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-black relative flex flex-col items-center overflow-hidden">
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
         initial={{ opacity: 1, y: 0, scale: 1 }}
         whileInView={{ opacity: 1, y: 0, scale: 1 }}
         viewport={{ once: true, amount: 0.2 }}
         transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
         style={{ willChange: "transform, opacity" }}
         className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] px-4 mt-8"
      >
           {/* Placeholder for a high-end UI shot */}
           <div className="rounded-[2rem] md:rounded-[2.5rem] bg-zinc-900 shadow-2xl overflow-hidden relative group border-[6px] md:border-[8px] border-zinc-800 aspect-[9/19.5] max-h-[680px]">
              <img 
                src="https://i.postimg.cc/sX2YFcqH/Screen-Recording-03-16-2026-13-49-06-1.gif" 
                alt="Interface da Plataforma Vorex" 
                className="absolute inset-0 w-full h-full object-cover object-top"
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
