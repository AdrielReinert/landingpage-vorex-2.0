import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Navbar: React.FC = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 20);
    });
  }, [scrollY]);

  const whatsappLink = "https://wa.me/5547988700032?text=Quero%20montar%20meu%20cassino";

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-nav h-12' : 'bg-transparent h-16'}`}
    >
      <div className="max-w-[980px] mx-auto px-4 h-full flex items-center justify-between">
        
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity">
          <img 
            src="https://i.postimg.cc/3rzwdNMK/Vorex-Igaming-Branco.png" 
            alt="Vorex Logo" 
            className="h-6 w-auto"
            referrerPolicy="no-referrer"
          />
        </a>

        {/* Links - Apple Style (Hidden on mobile usually, but keeping simple here) */}
        <div className="hidden md:flex items-center gap-8 text-xs font-medium text-gray-300">
          <a href="#concept" className="hover:text-white transition-colors">Plataforma</a>
          <a href="#products" className="hover:text-white transition-colors">Recursos</a>
          <a href="#profit" className="hover:text-white transition-colors">Lucratividade</a>
        </div>

        {/* Action Button */}
        <div>
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-500 hover:bg-yellow-400 text-black text-xs px-3 py-1 rounded-full transition-colors font-medium"
          >
            Falar com Especialista
          </a>
        </div>

      </div>
    </motion.nav>
  );
};

export default Navbar;