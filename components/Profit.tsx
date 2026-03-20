import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, CalendarCheck, TrendingUp, Layers, Users, ArrowRight } from 'lucide-react';
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
           
           {/* Coluna da Esquerda: Investimento */}
           <AppleSection>
             <div className="bg-zinc-900 p-8 rounded-3xl mb-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                </div>

                <div className="relative z-10">
                   <div className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                      Oferta Limitada
                   </div>
                   <div className="flex items-baseline gap-2 mb-2">
                     <span className="text-6xl font-semibold text-white tracking-tighter">R$ 499,00</span>
                   </div>
                   <div className="text-sm text-gray-400 font-medium mb-6">Taxa única de setup. Sem mensalidade.</div>
                   
                   <p className="text-gray-300 leading-relaxed border-t border-white/10 pt-6 font-medium">
                     No mercado, uma estrutura completa custa entre R$ 2.000 e R$ 5.000. A Vorex cobra menos por um motivo estratégico: <strong>Nós também somos o Banco.</strong> Ganhamos com o seu crescimento.
                   </p>
                </div>
             </div>

             <ul className="space-y-4">
                {[
                  { icon: Wallet, text: "Você não paga aluguel do software" },
                  { icon: CalendarCheck, text: "Sem surpresas no fim do mês" },
                  { icon: TrendingUp, text: "Lucro das apostas vai para você" },
                  { icon: Layers, text: "Estrutura completa inclusa" },
                  { icon: Users, text: "Acesso ao Grupo de Networking" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 font-medium">
                    <item.icon className="text-yellow-500" size={20} />
                    {item.text}
                  </li>
                ))}
             </ul>

             <div className="mt-8 flex justify-center">
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
           </AppleSection>

           {/* Coluna da Direita: Como o dinheiro entra */}
           <AppleSection
              delay={0.2}
              className="relative"
           >
              <div className="w-full bg-zinc-900/50 rounded-3xl overflow-hidden shadow-2xl relative group hover:bg-zinc-900 transition-colors">
                
                {/* Header Visual */}
                <div className="bg-zinc-900 px-6 py-4 border-b border-white/5 flex items-center justify-between">
                    <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">RESUMO FINANCEIRO</span>
                </div>

                <div className="p-8 space-y-8 relative">
                    
                    {/* Bloco 1: A Casa Ganha */}
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

                    {/* Bloco 2: Taxas */}
                    <div className="relative z-10 pt-6 border-t border-white/5">
                      <h3 className="text-white font-semibold text-xl mb-3 flex items-center gap-3">
                        Tem taxas?
                      </h3>
                      
                      <div className="bg-black/50 p-5 rounded-2xl">
                         <p className="text-gray-300 text-sm font-medium">
                            Existe apenas uma pequena taxa sobre as transações (saques/depósitos).
                         </p>
                      </div>
                    </div>

                </div>
              </div>
           </AppleSection>
        </div>
      </div>
    </section>
  );
};

export default Profit;