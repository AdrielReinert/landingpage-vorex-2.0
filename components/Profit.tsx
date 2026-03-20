import React from 'react';
import { ArrowRight } from 'lucide-react';
import { AppleSection } from './AppleSection';
import { TextReveal } from './TextReveal';

const Profit: React.FC = () => {
  return (
    <section id="profit" className="py-20 md:py-32 relative overflow-hidden bg-black">
      
      <div className="max-w-[980px] mx-auto px-6 relative z-10">
        
        <div className="mb-10 md:mb-16">
          <TextReveal className="text-4xl md:text-5xl font-semibold text-white tracking-tight justify-start md:max-w-2xl">
            O melhor custo-benefício do mercado.
          </TextReveal>
        </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
           
           {/* Coluna da Esquerda: Investimento */}
            <AppleSection className="h-full">
             <div className="relative h-full overflow-hidden rounded-3xl bg-zinc-900 p-8 shadow-2xl group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                </div>

               <div className="relative z-10 flex h-full flex-col">
                   <div className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                      Oferta Limitada
                   </div>
                   <div className="flex items-baseline gap-2 mb-2">
                     <span className="text-6xl font-semibold text-white tracking-tighter">R$ 499,00</span>
                   </div>
                   <div className="text-sm text-gray-400 font-medium mb-6">Taxa única de setup. Sem mensalidade.</div>
                   
                   <p className="border-t border-white/10 pt-6 font-medium leading-relaxed text-gray-300">
                     No mercado, uma estrutura completa custa entre R$ 2.000 e R$ 5.000. A Vorex cobra menos por um motivo estratégico: <strong>Nós também somos o Banco.</strong> Ganhamos com o seu crescimento.
                   </p>
                </div>
             </div>
           </AppleSection>

           {/* Coluna da Direita: Como o dinheiro entra */}
           <AppleSection
              delay={0.2}
              className="relative h-full"
           >
              <div className="relative h-full w-full overflow-hidden rounded-3xl bg-zinc-900/50 shadow-2xl group transition-colors hover:bg-zinc-900">
                <div className="bg-zinc-900 px-6 py-4 border-b border-white/5 flex items-center justify-between">
                    <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">RESUMO FINANCEIRO</span>
                </div>

                <div className="relative h-[calc(100%-57px)] p-8 space-y-8">
                    <div className="relative z-10">
                      <h3 className="text-white font-semibold text-xl mb-3 flex items-center gap-3">
                        Como você ganha dinheiro?
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4 font-medium">
                        É matemática simples: <strong>A casa sempre tem vantagem.</strong>
                      </p>
                      <p className="text-gray-400 text-sm leading-relaxed font-medium">
                        Quando os jogadores apostam e perdem, o dinheiro fica com a banca (você). Com um bom volume de jogadores, o lucro é estatístico e previsível.
                      </p>
                    </div>
                </div>
              </div>
           </AppleSection>
        </div>

        <div className="mt-10 flex justify-center md:mt-14">
          <a
            href="https://wa.me/5547988700032?text=Quero%20montar%20meu%20cassino"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex min-h-14 w-full items-center justify-center overflow-hidden rounded-full border border-yellow-300/50 bg-gradient-to-b from-yellow-400 to-yellow-600 px-8 py-3 text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] sm:w-auto"
          >
            <span className="mr-2 text-lg font-bold">Falar com o consultor</span>
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Profit;