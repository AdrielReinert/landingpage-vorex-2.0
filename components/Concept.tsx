import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Key, Zap } from 'lucide-react';
import { AppleSection } from './AppleSection';
import { TextReveal } from './TextReveal';

const Concept: React.FC = () => {
  return (
    <section id="concept" className="py-20 md:py-32 bg-black relative overflow-hidden">
      
      <div className="max-w-[980px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Typographic Left Side */}
        <AppleSection className="lg:col-span-5">
           <span className="text-yellow-500 font-medium text-xs uppercase tracking-widest mb-6 block">
             O Conceito
           </span>
           <div className="mb-8">
             <TextReveal className="text-4xl md:text-5xl font-semibold text-white leading-tight tracking-tight justify-start">
               Sua Marca.
             </TextReveal>
             <TextReveal className="text-4xl md:text-5xl font-semibold text-gray-500 leading-tight tracking-tight justify-start" delay={0.2}>
               Sua Operação.
             </TextReveal>
           </div>
           <p className="text-gray-400 text-lg leading-relaxed mb-8 font-medium">
             O tempo que você perde tentando entender a tecnologia é o mesmo tempo que seus concorrentes usam para lucrar. O mercado não espera.
           </p>
           <p className="text-gray-400 text-lg leading-relaxed mb-8">
             A <strong>Vorex</strong> elimina a barreira técnica. Entregamos uma estrutura de alto nível, testada e validada. <strong className="text-white">Seu único trabalho é faturar.</strong>
           </p>
           
           <div className="flex flex-col gap-6 border-l-2 border-zinc-800 pl-6">
              <div className="flex flex-col">
                 <strong className="text-white text-lg font-semibold mb-1">Foco no Lucro, Não no Código</strong>
                 <span className="text-gray-500 text-sm">Esqueça servidores e programadores. A tecnologia é por nossa conta.</span>
              </div>
              <div className="flex flex-col">
                 <strong className="text-white text-lg font-semibold mb-1">Operação Fluida e Segura</strong>
                 <span className="text-gray-500 text-sm">Gateway PIX nativo para depósitos e saques instantâneos.</span>
              </div>
           </div>
        </AppleSection>

        {/* Abstract/Visual Right Side */}
        <div className="lg:col-span-7 relative">
           <div className="relative z-10 grid grid-cols-2 gap-4">
              <AppleSection 
                delay={0.2}
                className="col-span-2 bg-zinc-900/50 p-8 rounded-3xl flex flex-col justify-between hover:bg-zinc-900 transition-colors"
              >
                 <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-yellow-500 text-black rounded-2xl">
                        <Key size={24} />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Acesso Total</span>
                 </div>
                 <div>
                    <h3 className="text-white font-semibold text-2xl mb-2">Entregue Pronto</h3>
                    <p className="text-gray-400 text-sm">Receba o link, o painel admin e comece a operar.</p>
                 </div>
              </AppleSection>

              <AppleSection 
                delay={0.3}
                className="bg-zinc-900/50 p-6 rounded-3xl aspect-square flex flex-col justify-center items-center text-center hover:bg-zinc-900 transition-colors"
              >
                 <Zap size={32} className="text-white mb-4" />
                 <h3 className="text-white font-semibold text-lg mb-1">Rápido</h3>
                 <p className="text-gray-500 text-xs">Pronto em 24h</p>
              </AppleSection>

              <AppleSection 
                delay={0.4}
                className="bg-zinc-900/50 p-6 rounded-3xl aspect-square flex flex-col justify-center items-center text-center hover:bg-zinc-900 transition-colors"
              >
                 <Layers size={32} className="text-gray-400 mb-4" />
                 <h3 className="text-gray-300 font-medium text-lg mb-1">Completo</h3>
                 <p className="text-gray-500 text-xs">All-in-one</p>
              </AppleSection>
           </div>
        </div>

      </div>
    </section>
  );
};

export default Concept;