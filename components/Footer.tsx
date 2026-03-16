import React from 'react';
import { Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black pt-20 pb-10 border-t border-white/5">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-12">
          
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-6">
              <img 
                src="https://i.postimg.cc/3rzwdNMK/Vorex-Igaming-Branco.png" 
                alt="Vorex Logo" 
                className="h-6 w-auto"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
            <p className="text-gray-500 text-xs leading-relaxed font-medium">
              Tecnologia de ponta para operadores de iGaming. Escala, segurança e performance em uma única plataforma.
            </p>
          </div>

          <div className="flex flex-wrap gap-16">
            <div>
              <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wide">Plataforma</h4>
              <ul className="space-y-3 text-xs text-gray-500 font-medium">
                <li><a href="#concept" className="hover:text-yellow-500 transition-colors">Conceito</a></li>
                <li><a href="#products" className="hover:text-yellow-500 transition-colors">Recursos</a></li>
                <li><a href="#profit" className="hover:text-yellow-500 transition-colors">Lucratividade</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wide">Legal</h4>
              <ul className="space-y-3 text-xs text-gray-500 font-medium">
                <li><span className="hover:text-yellow-500 transition-colors cursor-default">Termos de Uso</span></li>
                <li><span className="hover:text-yellow-500 transition-colors cursor-default">Privacidade</span></li>
                <li><span className="hover:text-yellow-500 transition-colors cursor-default">Compliance</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-medium">
          <p>&copy; {new Date().getFullYear()} Vorex iGaming. Todos os direitos reservados.</p>
          <div className="mt-4 md:mt-0 flex gap-6">
            <a href="https://www.instagram.com/vorexigaming/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Instagram">
              <Instagram size={20} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
