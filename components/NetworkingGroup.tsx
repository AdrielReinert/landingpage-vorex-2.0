import React, { useState } from 'react';
import { AppleSection } from './AppleSection';

const NetworkingGroup: React.FC = () => {
  const [frameAspectRatio, setFrameAspectRatio] = useState('9 / 19.5');

  return (
    <section className="py-20 md:py-32 bg-black relative overflow-hidden">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,560px)_minmax(0,280px)] gap-8 lg:gap-6 items-center lg:justify-center">
          <AppleSection className="bg-zinc-900/50 rounded-3xl p-8 md:p-10 hover:bg-zinc-900 transition-colors lg:order-2">
            <span className="text-yellow-500 font-medium text-xs uppercase tracking-widest mb-6 block">
              Networking
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 tracking-tight">
              Grupo exclusivo de network
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mb-6 font-medium">
              Faça parte de um ecossistema onde quem está rodando com a plataforma compartilha experiências reais, dúvidas e estratégias que funcionam.
            </p>

            <div className="space-y-4">
              {[
                'Troque experiências com operadores que já rodam',
                'Receba dicas valiosas para otimizar sua operação',
                'Evite erros que outros já cometeram',
                'Acelere seu crescimento com insights da comunidade'
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300 font-medium leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-zinc-800/50 rounded-2xl border border-yellow-500/20">
              <p className="text-gray-300 text-sm leading-relaxed">
                <strong className="text-white">Acesso imediato ao grupo de WhatsApp</strong> com operadores ativos, suporte direto e transmissões ao vivo mostrando resultados reais da plataforma.
              </p>
            </div>
          </AppleSection>

          <AppleSection delay={0.2} className="flex justify-center lg:justify-center lg:order-1">
            <div
              className="w-full max-w-[280px] bg-zinc-950 border-[6px] border-zinc-800 rounded-[2.4rem] shadow-2xl relative overflow-hidden"
              style={{ aspectRatio: frameAspectRatio }}
            >
              <div className="absolute inset-[4px] rounded-[2rem] overflow-hidden bg-black">
                <img
                  src="https://i.postimg.cc/qv5n4qD7/IMG-8220.jpg"
                  alt="Grupo de networking WhatsApp"
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

export default NetworkingGroup;
