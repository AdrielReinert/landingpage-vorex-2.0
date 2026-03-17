import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AppleSection } from './AppleSection';

const PlatformPreview: React.FC = () => {
  const pinSectionRef = useRef<HTMLDivElement | null>(null);
  const maskWrapRef = useRef<HTMLDivElement | null>(null);
  const [frameAspectRatio, setFrameAspectRatio] = useState('9 / 16');

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const pinSection = pinSectionRef.current;
    const maskWrap = maskWrapRef.current;

    if (!pinSection || !maskWrap) {
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.getById('design-mask-reveal')?.kill();

      gsap.set(maskWrap, {
        scale: 22,
        transformOrigin: '50% 50%',
        willChange: 'transform',
      });

      gsap.timeline({
        scrollTrigger: {
          id: 'design-mask-reveal',
          trigger: pinSection,
          start: 'top top',
          end: '+=2200',
          scrub: 0.55,
          pin: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },
      }).to(maskWrap, {
        scale: 1,
        ease: 'none',
      });
    }, pinSection);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="bg-black relative overflow-hidden">
      <div
        ref={pinSectionRef}
        className="relative h-[68vh] md:h-[76vh] w-full overflow-hidden grid place-items-center"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#0d0d0d_0%,_#000_70%)] z-0"></div>

        <div
          ref={maskWrapRef}
          className="relative z-10 w-full grid place-items-center will-change-transform"
        >
          <h2
            className="text-[clamp(2rem,8vw,7rem)] md:text-[clamp(2rem,7vw,7.2rem)] font-black leading-none tracking-[-0.03em] text-center text-white px-4 [text-shadow:0_0_1px_rgba(255,255,255,0.9)]"
            style={{ WebkitTextFillColor: '#fff', color: '#fff' }}
          >
            Design que converte.
          </h2>
        </div>
      </div>

      <div className="max-w-[980px] w-full mx-auto px-6 pb-20 md:pb-28 -mt-44 md:-mt-52">
        <div className="mb-8 text-center flex flex-col items-center">
          <AppleSection delay={0.05}>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
              Uma interface imersiva desenhada para maximizar o tempo de sessão e o engajamento dos jogadores.{' '}
              <span className="text-yellow-500 font-semibold">O cassino em amostra é de um cliente real da Vorex.</span>
            </p>
          </AppleSection>
        </div>

        <AppleSection delay={0.12} className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] px-4 mt-8 mx-auto">
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
  );
};

export default PlatformPreview;
