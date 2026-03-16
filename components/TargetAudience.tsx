import React from 'react';
import { Check, X } from 'lucide-react';
import { AppleSection } from './AppleSection';

const TargetAudience: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-black">
      <div className="max-w-[980px] mx-auto px-6">
        <AppleSection className="text-center mb-12 md:mb-20">
           <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight">Esse modelo é para você?</h2>
           <p className="text-xl text-gray-400 font-medium">Identifique se o seu perfil se encaixa na nossa proposta.</p>
        </AppleSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Ideal For */}
          <AppleSection 
            className="bg-zinc-900/50 rounded-3xl p-8 hover:bg-zinc-900 transition-colors"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-green-500/10 rounded-2xl text-green-500">
                <Check size={24} />
              </div>
              <h3 className="text-2xl font-semibold text-white tracking-tight">Ideal para quem:</h3>
            </div>
            <ul className="space-y-4">
              {[
                'Quer operar um cassino online',
                'Busca uma estrutura pronta',
                'Quer entrar no mercado com rapidez',
                'Entende que é um negócio operacional'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300 font-medium">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2"></div>
                   {item}
                </li>
              ))}
            </ul>
          </AppleSection>

          {/* Not For */}
          <AppleSection 
            delay={0.2}
            className="bg-zinc-900/50 rounded-3xl p-8 hover:bg-zinc-900 transition-colors"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-red-500/10 rounded-2xl text-red-500">
                <X size={24} />
              </div>
              <h3 className="text-2xl font-semibold text-white tracking-tight">Não é para quem:</h3>
            </div>
             <ul className="space-y-4">
              {[
                'Procura promessa de dinheiro fácil',
                'Não quer lidar com operação',
                'Não entende riscos do mercado',
                'Quer algo improvisado'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300 font-medium">
                   <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></div>
                   {item}
                </li>
              ))}
            </ul>
          </AppleSection>

        </div>
      </div>
    </section>
  );
};

export default TargetAudience;