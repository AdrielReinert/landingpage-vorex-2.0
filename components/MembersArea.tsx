import React, { useState } from 'react';
import { AppleSection } from './AppleSection';

const MembersArea: React.FC = () => {
  const [frameAspectRatio, setFrameAspectRatio] = useState('9 / 19.5');

  return (
    <section className="py-20 md:py-32 bg-black relative overflow-hidden">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,560px)_minmax(0,280px)] gap-8 lg:gap-6 items-center lg:justify-center">
          <AppleSection className="bg-zinc-900/50 rounded-3xl p-8 md:p-10 hover:bg-zinc-900 transition-colors">
            <h3 className="text-3xl md:text-4xl font-semibold text-white mb-6 tracking-tight">
              Área de membros exclusiva.
            </h3>

            <ul className="space-y-4">
              {[
                'Aulas exclusivas sobre configuracao e operacao do cassino',
                'Passo a passo para ativar campanhas e gerar fluxo de jogadores',
                'Estrutura de acompanhamento para aumentar faturamento com consistencia',
                'Atualizacoes praticas com foco total em execucao e resultado'
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300 font-medium leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2"></div>
                  {item}
                </li>
              ))}
            </ul>
          </AppleSection>

          <AppleSection delay={0.2} className="flex justify-center lg:justify-center">
            <div
              className="w-full max-w-[280px] bg-zinc-950 border-[6px] border-zinc-800 rounded-[2.4rem] shadow-2xl relative overflow-hidden"
              style={{ aspectRatio: frameAspectRatio }}
            >
              <div className="absolute inset-[4px] rounded-[2rem] overflow-hidden bg-black">
                <img
                  src="https://i.postimg.cc/0jWGrVX3/Screenshot-27.png"
                  alt="Print da area de membros"
                  className="absolute inset-0 w-full h-full object-contain object-center bg-black"
                  onLoad={(event) => {
                    const { naturalWidth, naturalHeight } = event.currentTarget;
                    if (naturalWidth > 0 && naturalHeight > 0) {
                      setFrameAspectRatio(`${naturalWidth} / ${naturalHeight}`);
                    }
                  }}
                />
              </div>
            </div>
          </AppleSection>
        </div>
      </div>
    </section>
  );
};

export default MembersArea;
