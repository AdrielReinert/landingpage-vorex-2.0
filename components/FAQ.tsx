import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { AppleSection } from './AppleSection';

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: "Eu não entendo nada de computador. Consigo ter o cassino?",
    a: "Com certeza! Essa é a nossa principal vantagem. Nós cuidamos de toda a parte chata e difícil. Você recebe tudo pronto e só precisa usar o celular para acompanhar."
  },
  {
    q: "O valor de R$ 997 é mensal?",
    a: "Não! É um pagamento único. Você paga uma vez para a gente montar sua estrutura e nunca mais paga aluguel do sistema para a Vorex."
  },
  {
    q: "Preciso ter empresa aberta (CNPJ)?",
    a: "Não é obrigatório para começar. Você pode iniciar como pessoa física e regularizar depois que já estiver lucrando alto."
  },
  {
    q: "Como o dinheiro cai na minha conta?",
    a: "O sistema tem um 'Caixa'. Quando você quiser, clica no botão de saque no seu painel administrativo e transfere para sua conta bancária via PIX."
  },
  {
    q: "Quanto tempo demora para ficar pronto?",
    a: "Em média 24 horas após a confirmação do pagamento. Nossa equipe é muito rápida."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-32 bg-black relative overflow-hidden">
      <div className="max-w-[980px] mx-auto px-6 relative z-10">
        <AppleSection className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight">Perguntas Frequentes.</h2>
          <p className="text-xl text-gray-400 font-medium">
            Respostas simples para as dúvidas mais comuns.
          </p>
        </AppleSection>
        
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <AppleSection 
              key={index}
              delay={index * 0.05}
              className={`rounded-2xl transition-all duration-300 overflow-hidden ${
                openIndex === index 
                  ? 'bg-zinc-900' 
                  : 'bg-zinc-900/30 hover:bg-zinc-900/50'
              }`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className={`font-medium text-lg ${openIndex === index ? 'text-white' : 'text-gray-300'}`}>
                  {item.q}
                </span>
                <ChevronDown size={20} className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-yellow-500' : 'text-gray-500'}`} />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="p-6 pt-0 text-gray-400 text-base leading-relaxed font-medium">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </AppleSection>
          ))}
        </div>

        {/* Final CTA */}
        <AppleSection className="mt-24 text-center">
            <h2 className="text-3xl font-semibold text-white mb-8 tracking-tight">Pronto para começar?</h2>
        </AppleSection>
      </div>
    </section>
  );
};

export default FAQ;