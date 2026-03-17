import React, { useState } from 'react';
import { AppleSection } from './AppleSection';
import { TextReveal } from './TextReveal';

const MembersArea: React.FC = () => {
  const [frameAspectRatio, setFrameAspectRatio] = useState('9 / 19.5');

  return (
    <section className="py-20 md:py-32 bg-black relative overflow-hidden">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="mb-12 md:mb-16 text-center flex flex-col items-center">
          <TextReveal className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight justify-center">
            Area de membros exclusiva.
          </TextReveal>
          <AppleSection delay={0.2}>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-medium">
              Todo aluno recebe acesso a aulas praticas para aprender a operar o cassino,
              organizar a rotina e escalar o faturamento com metodo.
            </p>
          </AppleSection>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <AppleSection className="bg-zinc-900/50 rounded-3xl p-8 md:p-10 hover:bg-zinc-900 transition-colors">
            <h3 className="text-3xl md:text-4xl font-semibold text-white mb-6 tracking-tight">
              O que voce encontra dentro da area de membros
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

          <AppleSection delay={0.2} className="flex justify-center lg:justify-end">
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
