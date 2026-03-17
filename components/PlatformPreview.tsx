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

    if (!pinSection || !maskWrap) return;

    // Mede o tamanho natural do elemento (scale=1) e calcula a escala máxima
    // necessária para o desktop cobrir a viewport com folga.
    function calcDesktopInitialScale(): number {
      const prev = maskWrap!.style.transform;
      maskWrap!.style.transform = 'none';
      const w = maskWrap!.offsetWidth;
      const h = maskWrap!.offsetHeight;
      maskWrap!.style.transform = prev;

      const ratio = Math.max(window.innerWidth / w, window.innerHeight / h);
      return Math.max(Math.ceil(ratio * 3), 8);
    }

    // No mobile não queremos texto colossal cobrindo a viewport toda.
    // A escala inicial é intencionalmente mais baixa para preservar proporção.
    function calcMobileInitialScale(): number {
      const prev = maskWrap!.style.transform;
      maskWrap!.style.transform = 'none';
      const w = maskWrap!.offsetWidth;
      maskWrap!.style.transform = prev;

      const widthRatio = window.innerWidth / Math.max(w, 1);
      return gsap.utils.clamp(1.8, 3.4, widthRatio * 1.35);
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.getById('design-mask-reveal-desktop')?.kill();
      ScrollTrigger.getById('design-mask-reveal-mobile')?.kill();

      // ── [Otimização 1] GPU: configura compositing layer dedicada ─────────
      // force3D instrui o GSAP a manter translate3d ativo (promove o elemento
      // para a GPU). willChange sinaliza ao browser para alocar a camada
      // antecipadamente — somente transform é animado, nunca width/height.
      gsap.set(maskWrap, {
        transformOrigin: '50% 50%',
        force3D: true,
      });

      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        gsap.timeline({
          scrollTrigger: {
            id: 'design-mask-reveal-desktop',
            trigger: pinSection,
            start: 'top top',
            end: '+=1700',
            scrub: 0.5,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        }).fromTo(
          maskWrap,
          { scale: calcDesktopInitialScale, immediateRender: false },
          { scale: 1, ease: 'none', force3D: true },
        );
      });

      mm.add('(max-width: 767px)', () => {
        // Mobile: sem pin e com duração curta para evitar espaçamento gigante.
        gsap.timeline({
          scrollTrigger: {
            id: 'design-mask-reveal-mobile',
            trigger: pinSection,
            start: 'top 82%',
            end: '+=260',
            scrub: 0.22,
            pin: false,
            invalidateOnRefresh: true,
          },
        }).fromTo(
          maskWrap,
          { scale: calcMobileInitialScale, immediateRender: false },
          { scale: 1, ease: 'none', force3D: true },
        );
      });

      return () => mm.revert();
    }, pinSection);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      {/* Seção do pin isolada: overflow-hidden recortará o texto em escala
          grande sem afetar nenhum ancestor (ancestor com overflow-hidden
          quebraria position:fixed do pin — aqui é o próprio elemento fixado). */}
      <section className="bg-black relative">
        <div
          ref={pinSectionRef}
          className="relative w-full overflow-hidden grid place-items-center py-14 md:py-0 md:h-screen"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#0d0d0d_0%,_#000_70%)] z-0"></div>

          <div
            ref={maskWrapRef}
            className="relative z-10 w-full grid place-items-center will-change-transform"
          >
            <h2
              className="max-w-[12ch] md:max-w-none text-[clamp(2.3rem,11vw,3.5rem)] md:text-[clamp(2rem,7vw,7.2rem)] font-black leading-[1.03] tracking-[-0.03em] text-center text-white px-5 [text-shadow:0_0_1px_rgba(255,255,255,0.9)]"
              style={{ WebkitTextFillColor: '#fff', color: '#fff' }}
            >
              Design que converte.
            </h2>
          </div>
        </div>
      </section>

      {/* Conteúdo separado do pin: garante que pinSpacing não interfira no
          whileInView do Framer Motion nem cause desaparecimento de elementos. */}
      <section className="bg-black relative">
        <div className="max-w-[980px] w-full mx-auto px-6 pb-20 md:pb-28 mt-3 md:-mt-[30vh]">
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
    </>
  );
};

export default PlatformPreview;
