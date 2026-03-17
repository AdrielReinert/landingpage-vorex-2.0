import React from 'react';
import { AppleSection } from './AppleSection';
import { TextReveal } from './TextReveal';

const team = [
  {
    name: 'Adriel',
    role: 'Programador, Designer & Co-fundador',
    image: 'https://i.postimg.cc/zBswFvY5/belfot-1773757574984.png',
    bio: 'Adriel e o cara que faz acontecer no produto: programa, desenha a experiencia e transforma ideia em plataforma pronta para vender. Ele cuida para tudo ficar bonito, rapido e funcional, do visual ate a parte tecnica.',
  },
  {
    name: 'José',
    role: 'Especialista em Cassino & Co-fundador',
    image: 'https://i.postimg.cc/13vpYJZy/belfot-1769727943564.png',
    bio: 'Jose e o cara que entende de cassino na pratica e sabe o que realmente gera resultado. Ele ajuda cada operador a montar a estrategia certa para atrair jogadores, escalar a operacao e faturar com mais consistencia.',
  },
];

const AboutUs: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-black relative overflow-hidden">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="mb-12 md:mb-16 text-center flex flex-col items-center">
          <TextReveal className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight justify-center">
            Quem está por trás da Vorex.
          </TextReveal>
          <AppleSection delay={0.2}>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
              Somos programadores apaixonados por tecnologia e pelo mercado de iGaming. Construímos a Vorex para que você não precise entender de código para faturar alto.
            </p>
          </AppleSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {team.map((member, index) => (
            <AppleSection
              key={member.name}
              delay={index * 0.15}
              className="bg-zinc-900/50 rounded-3xl p-8 hover:bg-zinc-900 transition-colors flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border-[3px] border-yellow-500/40 mb-5 flex-shrink-0">
                <img
                  src={member.image}
                  alt={`Foto de ${member.name}`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <h3 className="text-white text-2xl font-semibold mb-1 tracking-tight">
                {member.name}
              </h3>
              <span className="text-yellow-500 text-xs font-medium uppercase tracking-widest mb-4">
                {member.role}
              </span>
              <p className="text-gray-400 text-sm leading-relaxed">
                {member.bio}
              </p>
            </AppleSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
