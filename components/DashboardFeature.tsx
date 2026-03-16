import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Smartphone, BarChart3 } from 'lucide-react';
import { AppleSection } from './AppleSection';
import { TextReveal } from './TextReveal';

const DashboardFeature: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-zinc-950 overflow-hidden">
      <div className="max-w-[980px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <AppleSection 
            className="order-2 lg:order-1 flex justify-center"
          >
             {/* Abstract Phone/Dashboard Representation */}
             <div className="relative mx-auto border-zinc-800 bg-zinc-900 border-[8px] rounded-[2.5rem] md:rounded-[3rem] h-[500px] md:h-[580px] w-full max-w-[280px] md:max-w-[320px] shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/10">
                 {/* Buttons */}
                 <div className="h-[32px] w-[3px] bg-zinc-800 absolute -left-[11px] top-[72px] rounded-l-lg"></div>
                 <div className="h-[46px] w-[3px] bg-zinc-800 absolute -left-[11px] top-[124px] rounded-l-lg"></div>
                 <div className="h-[46px] w-[3px] bg-zinc-800 absolute -left-[11px] top-[178px] rounded-l-lg"></div>
                 <div className="h-[64px] w-[3px] bg-zinc-800 absolute -right-[11px] top-[142px] rounded-r-lg"></div>
                 
                 {/* Screen Content */}
                 <div className="flex-1 bg-black p-4 md:p-6 flex flex-col relative overflow-hidden">
                    
                    {/* Top Bar */}
                    <div className="flex justify-between items-center mb-8 pt-4">
                       <span className="text-white font-semibold text-lg tracking-tight">Painel Vorex</span>
                       <div className="w-8 h-8 rounded-full bg-zinc-800"></div>
                    </div>

                    {/* Balance Card */}
                    <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 p-6 rounded-2xl mb-6 shadow-lg shadow-yellow-900/20">
                       <span className="text-yellow-100 text-xs font-semibold uppercase tracking-wide">Saldo Disponível</span>
                       <div className="text-white text-4xl font-semibold mt-2 tracking-tight">R$ 4.250</div>
                       <div className="text-yellow-200 text-xs mt-2 font-medium">+R$ 850 hoje</div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                       <div className="bg-zinc-900 p-4 rounded-2xl">
                          <span className="text-zinc-500 text-xs font-medium uppercase">Jogadores</span>
                          <div className="text-white text-2xl font-semibold mt-1">142</div>
                       </div>
                       <div className="bg-zinc-900 p-4 rounded-2xl">
                          <span className="text-zinc-500 text-xs font-medium uppercase">Apostas</span>
                          <div className="text-white text-2xl font-semibold mt-1">1.2k</div>
                       </div>
                    </div>

                    {/* Chart Mock */}
                    <div className="flex-1 bg-zinc-900 rounded-2xl p-4 flex items-end gap-2 pb-0">
                        {[40, 60, 35, 80, 55, 90, 70].map((h, i) => (
                           <div key={i} className="flex-1 bg-yellow-500/20 rounded-t-sm relative group hover:bg-yellow-500 transition-colors" style={{ height: `${h}%` }}></div>
                        ))}
                    </div>
                 </div>
             </div>
          </AppleSection>

          <AppleSection 
            delay={0.2}
            className="order-1 lg:order-2"
          >

            <TextReveal className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight justify-start">
              Gerencie seu negócio de qualquer lugar.
            </TextReveal>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed font-medium">
              Controle total na ponta dos dedos. Acompanhe lucros, gerencie usuários e realize saques através de um painel intuitivo otimizado para mobile.
            </p>

            <ul className="space-y-4">
              {[
                'Analytics em tempo real',
                'Saques instantâneos',
                'Gestão de usuários',
                'Interface nativa em português'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="text-yellow-500" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </AppleSection>

        </div>
      </div>
    </section>
  );
};

export default DashboardFeature;