import React from 'react';
import { MousePointerClick, CreditCard, Rocket, Check } from 'lucide-react';
import { AppleSection } from './AppleSection';
import { TextReveal } from './TextReveal';

const steps = [
  {
    icon: MousePointerClick,
    title: "1. Escolha",
    desc: "Escolha qual visual de cassino você mais gosta.",
    highlight: false
  },
  {
    icon: CreditCard,
    title: "2. Pagamento",
    desc: "Faça o pagamento único de R$ 499.",
    highlight: false
  },
  {
    icon: Rocket,
    title: "3. Receba",
    desc: "Receba seu cassino pronto em 24h.",
    highlight: true
  },
  {
    icon: Check,
    title: "4. Lucre",
    desc: "Divulgue seu link e comece a faturar.",
    highlight: true
  }
];

const Process: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-black relative overflow-hidden">
      <div className="max-w-[980px] mx-auto px-6 relative z-10">
        <div className="mb-16 md:mb-24 text-center flex flex-col items-center">
            <TextReveal className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight justify-center">
              Tão simples quanto parece.
            </TextReveal>
            <AppleSection delay={0.2}>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                Eliminamos toda a burocracia. Em 4 passos simples você vira dono do seu negócio.
              </p>
            </AppleSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-white/10 z-0"></div>

          {steps.map((step, index) => (
            <AppleSection
              key={index}
              delay={index * 0.1}
              className="relative flex flex-col items-center z-10 text-center"
            >
              {/* Step Icon Container */}
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 relative z-10 transition-all duration-500 border bg-black ${
                step.highlight 
                ? 'border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.2)] text-yellow-500' 
                : 'border-white/10 text-gray-500'
              }`}>
                <step.icon size={32} />
              </div>

              {/* Text Content */}
              <div className="px-4">
                <h3 className={`text-xl font-semibold mb-2 ${step.highlight ? 'text-white' : 'text-gray-300'}`}>
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[200px] mx-auto font-medium">
                  {step.desc}
                </p>
              </div>
            </AppleSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;