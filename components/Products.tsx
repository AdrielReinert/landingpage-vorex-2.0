import React, { useState } from 'react';
import { AppleSection } from './AppleSection';
import { TextReveal } from './TextReveal';

const Products: React.FC = () => {
  const [mobileFrameAspectRatio, setMobileFrameAspectRatio] = useState('9 / 19.5');

  return (
    <section id="products" className="py-20 md:py-32 bg-black relative">
      <div className="max-w-[980px] mx-auto px-6">
        
        <div className="mb-12 md:mb-20 text-center flex flex-col items-center">
          <TextReveal className="text-4xl md:text-6xl font-semibold text-white mb-6 tracking-tight justify-center">
            Incrível em todos os níveis.
          </TextReveal>
          <AppleSection delay={0.2}>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Uma arquitetura robusta projetada para escalar. Desde o primeiro jogador até o primeiro milhão.
            </p>
          </AppleSection>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Large Card - Main Feature */}
          <AppleSection className="md:col-span-2 bg-zinc-900/50 rounded-3xl p-8 md:p-12 overflow-hidden relative group hover:bg-zinc-900/80 transition-colors">
             <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                   <span className="text-yellow-500 font-medium text-sm uppercase tracking-wide mb-2 block">Performance</span>
                   <h3 className="text-3xl md:text-4xl font-semibold text-white mb-4">Velocidade que converte.</h3>
                   <p className="text-gray-400 max-w-md">
                     Cada segundo de lentidão é um jogador que vai para o concorrente. Nossa infraestrutura garante carregamento instantâneo para máxima retenção.
                   </p>
                </div>
                <div className="mt-8">
                   <div className="inline-flex items-center gap-2 text-white font-medium">
                      <span>Zero Latency Engine</span>
                   </div>
                </div>
             </div>
             {/* Abstract Graphic */}
             <div className="absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-tl from-yellow-500/20 to-transparent blur-3xl rounded-full pointer-events-none"></div>
          </AppleSection>

          {/* Tall Card - Mobile First */}
          <AppleSection delay={0.2} className="md:row-span-2 bg-zinc-900/50 rounded-3xl p-8 overflow-hidden relative group hover:bg-zinc-900/80 transition-colors flex flex-col">
             <div className="mb-auto">
                <span className="text-purple-500 font-medium text-sm uppercase tracking-wide mb-2 block">Mobile First</span>
                <h3 className="text-3xl font-semibold text-white mb-4">Viciante no celular.</h3>
                <p className="text-gray-400 text-sm">
                  Onde 80% do dinheiro está. Entregamos uma experiência nativa e imersiva que mantém os jogadores engajados por horas, do iPhone ao Android.
                </p>
             </div>
             <div className="mt-8 flex justify-center relative">
                <div
                  className="w-full max-w-[240px] rounded-[2.2rem] bg-zinc-950 border-[5px] border-zinc-700 shadow-2xl relative overflow-hidden"
                  style={{ aspectRatio: mobileFrameAspectRatio }}
                >
                   <div className="absolute inset-[4px] rounded-[1.8rem] overflow-hidden bg-black">
                      <img
                        src="https://i.postimg.cc/fWrBzL44/IMG-8219.png"
                        alt="Preview mobile da plataforma"
                        className="absolute inset-0 w-full h-full object-cover object-top"
                        onLoad={(event) => {
                          const { naturalWidth, naturalHeight } = event.currentTarget;
                          if (naturalWidth > 0 && naturalHeight > 0) {
                            setMobileFrameAspectRatio(`${naturalWidth} / ${naturalHeight}`);
                          }
                        }}
                      />
                   </div>
                </div>
             </div>
          </AppleSection>

          {/* Small Card - Global */}
          <AppleSection delay={0.4} className="bg-zinc-900/50 rounded-3xl p-8 hover:bg-zinc-900/80 transition-colors">
             <h3 className="text-xl font-semibold text-white mb-2">Escala sem limites.</h3>
             <p className="text-gray-400 text-sm">
               Crescimento sem travas. Infraestrutura elástica que suporta picos massivos de jogadores simultâneos sem derrubar sua operação.
             </p>
          </AppleSection>

        </div>
      </div>
    </section>
  );
};

export default Products;