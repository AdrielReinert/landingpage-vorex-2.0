import React, { useState } from 'react';
import { AppleSection } from './AppleSection';

const PlatformPreview: React.FC = () => {
  const [frameAspectRatio, setFrameAspectRatio] = useState('9 / 16');

  return (
    <>
      <section className="bg-black relative z-10 md:z-0 isolate">
        <div
          className="relative min-h-[38vh] md:h-screen w-full overflow-hidden grid place-items-center bg-black pt-14 pb-8 md:py-0"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#0d0d0d_0%,_#000_70%)] z-0"></div>

          <div className="relative z-10 flex w-full justify-center">
            <h2
              className="mx-auto max-w-[9.5ch] md:max-w-none text-[clamp(1.75rem,11.2vw,3.25rem)] md:text-[clamp(2rem,7vw,7.2rem)] font-black leading-[1.04] tracking-[-0.03em] text-center text-white px-5 md:px-4 [text-shadow:0_0_1px_rgba(255,255,255,0.9)]"
              style={{ WebkitTextFillColor: '#fff', color: '#fff' }}
            >
              Design que converte.
            </h2>
          </div>
        </div>
      </section>

      <section className="bg-black relative z-20 md:z-20">
        <div className="max-w-[980px] w-full mx-auto px-6 pb-20 md:pb-28 -mt-[8vh] md:-mt-[30vh]">
          <div className="mb-10 md:mb-8 text-center flex flex-col items-center">
            <AppleSection delay={0.05}>
              <p className="text-lg leading-relaxed text-gray-400 max-w-2xl mx-auto font-medium md:text-xl">
                Uma interface imersiva desenhada para maximizar o tempo de sessão e o engajamento dos jogadores.{' '}
                <span className="text-yellow-500 font-semibold">O cassino em amostra é de um cliente real da Vorex.</span>
              </p>
            </AppleSection>
          </div>

          <AppleSection delay={0.12} className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] px-4 mt-10 md:mt-8 mx-auto">
            <div
              className="rounded-[2rem] md:rounded-[2.5rem] bg-zinc-900 shadow-2xl overflow-hidden relative group border-[6px] md:border-[8px] border-zinc-800 max-h-[680px]"
              style={{ aspectRatio: frameAspectRatio }}
            >
              <img
                src="https://i.postimg.cc/vm3yN94m/Screen-Recording-03-17-2026-09-47-41-1-(1).gif"
                alt="Interface da Plataforma Vorex"
                className="absolute inset-0 w-full h-full object-contain object-center bg-black"
                onLoad={(event) => {
                  const { naturalWidth, naturalHeight } = event.currentTarget;
                  if (naturalWidth > 0 && naturalHeight > 0) {
                    setFrameAspectRatio(`${naturalWidth} / ${naturalHeight}`);
                  }
                }}
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            </div>
          </AppleSection>
        </div>
      </section>
    </>
  );
};

export default PlatformPreview;
