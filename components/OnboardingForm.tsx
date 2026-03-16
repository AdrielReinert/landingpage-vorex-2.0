import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, CheckCircle2, CreditCard, Play, ChevronRight } from 'lucide-react';
import { AppleSection } from './AppleSection';

const steps = [
  { 
    id: 1,
    title: "Contato",
    desc: "Chame nosso time no WhatsApp.",
    icon: MessageCircle 
  },
  { 
    id: 2,
    title: "Modelo",
    desc: "Escolha o layout ideal.",
    icon: CheckCircle2 
  },
  { 
    id: 3,
    title: "Pagamento",
    desc: "Único e seguro via PIX.",
    icon: CreditCard 
  },
  { 
    id: 4,
    title: "Ativação",
    desc: "Operação no ar em 24h.",
    icon: Play 
  }
];

const OnboardingForm: React.FC = () => {
  const whatsappLink = "https://wa.me/5547988700032?text=Ol%C3%A1%2C%20quero%20falar%20com%20um%20consultor%20sobre%20os%20cassinos";

  return (
    <section id="aplicacao" className="py-20 md:py-32 bg-zinc-950 relative border-t border-white/5">
      <div className="max-w-[980px] mx-auto px-6">
        
        <AppleSection className="text-center mb-12 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight">Comece agora.</h2>
          <p className="text-xl text-gray-400">O caminho mais curto entre você e sua operação.</p>
        </AppleSection>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
           {steps.map((step, index) => (
             <AppleSection 
               key={step.id}
               delay={index * 0.1}
               className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl relative group hover:bg-zinc-900 transition-colors flex flex-col items-start"
             >
                <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center text-black mb-6 shadow-lg shadow-yellow-900/20 group-hover:scale-110 transition-transform">
                   <step.icon size={24} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm font-medium">{step.desc}</p>
             </AppleSection>
           ))}
        </div>

        <AppleSection className="text-center">
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black text-lg font-medium px-8 py-4 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-yellow-900/30"
          >
            <MessageCircle size={24} />
            <span>Falar com Consultor</span>
            <ChevronRight size={20} className="opacity-70" />
          </a>
          <p className="mt-6 text-gray-500 text-sm font-medium flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Online agora
          </p>
        </AppleSection>

      </div>
    </section>
  );
};

export default OnboardingForm;