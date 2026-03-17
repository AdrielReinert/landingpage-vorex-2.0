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

    // ── [Otimização 2] Escala dinâmica ────────────────────────────────────
    // Mede o tamanho NATURAL do elemento (scale=1) removendo o transform
    // temporariamente — operação síncrona, sem flash visível.
    // Calcula quantas vezes o elemento precisa crescer para cobrir a viewport
    // inteira em qualquer tela, do celular ao monitor Ultrawide 4K.
    function calcInitialScale(): number {
      const prev = maskWrap!.style.transform;
      maskWrap!.style.transform = 'none';
      const w = maskWrap!.offsetWidth;
      const h = maskWrap!.offsetHeight;
      maskWrap!.style.transform = prev;

      const ratio = Math.max(window.innerWidth / w, window.innerHeight / h);
      // ×3 garante que o "buraco" das letras ultrapasse as bordas da viewport
      return Math.max(Math.ceil(ratio * 3), 8);
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.getById('design-mask-reveal')?.kill();

      // ── [Otimização 1] GPU: configura compositing layer dedicada ─────────
      // force3D instrui o GSAP a manter translate3d ativo (promove o elemento
      // para a GPU). willChange sinaliza ao browser para alocar a camada
      // antecipadamente — somente transform é animado, nunca width/height.
      gsap.set(maskWrap, {
        transformOrigin: '50% 50%',
        force3D: true,
      });

      // ── [Otimização 2 + 3] Timeline com fromTo + função ──────────────────
      // Usando fromTo com função no "from": o GSAP recalcula calcInitialScale()
      // automaticamente a cada invalidateOnRefresh, sem valor fixo hard-coded.
      // ease: "none" = linear exato — a escala cai proporcionalmente ao scroll,
      // sem aceleração ou desaceleração própria no meio do caminho.
      // scrub: 0.7 (entre 0.5–1) = leve "catch-up" quando o usuário para,
      // sem atraso excessivo.
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'design-mask-reveal',
          trigger: pinSection,
          start: 'top top',
          end: '+=1700',
          scrub: 0.7,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true, // recalcula "from" em cada resize
          onLeave: () => gsap.set(maskWrap, { scale: 1, force3D: true }),
          onLeaveBack: () =>
            gsap.set(maskWrap, { scale: calcInitialScale(), force3D: true }),
        },
      }).fromTo(
        maskWrap,
        // ← função: chamada pelo GSAP em cada refresh (resize/orientação)
        { scale: calcInitialScale },
        { scale: 1, ease: 'none', force3D: true },
      );

      // ── [Otimização 2] Listener de refresh para onLeaveBack ──────────────
      // invalidateOnRefresh já recalcula o "from" da timeline, mas o callback
      // onLeaveBack precisa do valor atualizado manualmente se o usuário
      // estava no topo durante o resize.
      ScrollTrigger.addEventListener('refresh', () => {
        const st = tl.scrollTrigger;
        if (st && st.progress === 0) {
          gsap.set(maskWrap, { scale: calcInitialScale(), force3D: true });
        }
      });
    }, pinSection);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="bg-black relative overflow-hidden">
      {/* [Otimização 3] contain: layout paint isola o contexto de empilhamento,
          impedindo que animações neste container causem reflow no resto da página. */}
      <div
        ref={pinSectionRef}
        className="relative h-screen w-full overflow-hidden grid place-items-center"
        style={{ contain: 'layout paint' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#0d0d0d_0%,_#000_70%)] z-0"></div>

        {/* [Otimização 1] will-change-transform (CSS) + force3D (GSAP) =
            compositing layer dedicada na GPU — apenas transform é animado. */}
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

      <div className="max-w-[980px] w-full mx-auto px-6 pb-20 md:pb-28 -mt-[28vh] md:-mt-[30vh]">
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
