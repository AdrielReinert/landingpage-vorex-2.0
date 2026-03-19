import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { TextReveal } from './TextReveal';
import { AppleSection } from './AppleSection';

const Hero: React.FC = () => {
  const whatsappLink = "https://wa.me/5547988700032?text=Quero%20montar%20meu%20cassino%20agora";

  // Generate random stars for the background
  const stars = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5
    }));
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden pt-20">
      
      {/* --- Star Field --- */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              willChange: "transform, opacity"
            }}
            animate={{
              opacity: [0.1, 0.7, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* --- Shooting Stars --- */}
      <motion.div
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-white to-transparent w-[100px] sm:w-[200px]"
          style={{ top: '10%', left: '10%', willChange: "transform, opacity" }}
          initial={{ x: -200, y: -200, rotate: 45, opacity: 0 }}
          animate={{ 
             x: '120vw', 
             y: '120vh', 
             opacity: [0, 1, 0] 
          }}
          transition={{
             duration: 3,
             repeat: Infinity,
             repeatDelay: 7,
             ease: "linear"
          }}
      />
      <motion.div
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-white to-transparent w-[150px]"
          style={{ top: '20%', left: '60%', willChange: "transform, opacity" }}
          initial={{ x: -200, y: -200, rotate: 45, opacity: 0 }}
          animate={{ 
             x: '120vw', 
             y: '120vh', 
             opacity: [0, 1, 0] 
          }}
          transition={{
             duration: 4,
             repeat: Infinity,
             repeatDelay: 12,
             delay: 2,
             ease: "linear"
          }}
      />

      {/* --- Background Glow --- */}
      <motion.div 
        style={{ willChange: "transform, opacity" }}
        animate={{ 
          opacity: [0.4, 0.6, 0.4], 
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none"
      ></motion.div>

      <div className="relative z-10 max-w-[980px] mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Headline */}
        <TextReveal 
          className="font-semibold text-5xl sm:text-7xl md:text-8xl tracking-tight text-white mb-6 leading-[1.05] justify-center"
          gold={true}
        >
          Seja Dono da Banca.
        </TextReveal>

        <TextReveal 
          className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-gray-400 mb-10 justify-center"
          delay={0.2}
        >
          Passe para o lado de quem controla o jogo.
        </TextReveal>

        <AppleSection delay={0.4} className="flex flex-col items-center gap-6">
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 font-medium">
            A Vorex quebrou a barreira de entrada para você ter sua própria Casa de Apostas.
          </p>
          
          <div className="flex w-full justify-center">
            <div className="flex w-full flex-col items-center sm:w-auto">
              <button 
                onClick={() => document.getElementById('concept')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-yellow-400 to-yellow-600 px-8 font-medium text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] w-full sm:w-auto border border-yellow-300/50"
              >
                <span className="mr-2 text-lg font-bold">Iniciar Meu Projeto</span>
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={20} />
              </button>

              <span className="mt-3 text-center text-sm font-medium text-gray-300">
                +60 cassinos online ativos
              </span>
            </div>
          </div>
        </AppleSection>



      </div>
    </section>
  );
};

export default Hero;