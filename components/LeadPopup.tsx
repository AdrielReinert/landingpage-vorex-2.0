import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, MessageCircle } from 'lucide-react';

interface LeadPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeadPopup: React.FC<LeadPopupProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; whatsapp?: string }>({});

  // Bloqueia scroll do body quando popup está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Fecha com Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const formatWhatsapp = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const validate = () => {
    const newErrors: { email?: string; whatsapp?: string } = {};
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Digite um e-mail válido.';
    }
    const digits = whatsapp.replace(/\D/g, '');
    if (digits.length < 10) {
      newErrors.whatsapp = 'Digite um WhatsApp válido com DDD.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // Dispara evento de Lead no Facebook Pixel
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'Lead', {
        content_name: 'Popup CTA - R$ 997',
        em: email,
        ph: whatsapp.replace(/\D/g, ''),
      });
    }

    // Pega o _fbc salvo pelo script de rastreamento
    const fbc = localStorage.getItem('_fbc') || '';

    // Salva dados do lead localmente para uso futuro/webhook
    localStorage.setItem('lead_email', email);
    localStorage.setItem('lead_whatsapp', whatsapp.replace(/\D/g, ''));
    if (fbc) localStorage.setItem('_fbc', fbc);

    const numeroWhatsapp = '5547988700032';
    const mensagem = encodeURIComponent(
      `Olá! Tenho interesse em adquirir meu cassino por R$ 997. Meu e-mail: ${email}`
    );

    setTimeout(() => {
      window.open(`https://wa.me/${numeroWhatsapp}?text=${mensagem}`, '_blank', 'noopener,noreferrer');
      setLoading(false);
      onClose();
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Popup Card */}
          <motion.div
            key="popup"
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28, mass: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-md pointer-events-auto rounded-3xl bg-zinc-900 border border-white/10 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow accent top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />

              {/* Ambient glow */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-32 bg-yellow-500/10 blur-3xl rounded-full pointer-events-none" />

              {/* Fechar */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors duration-200 z-10 p-1 rounded-full hover:bg-white/10"
                aria-label="Fechar"
              >
                <X size={20} />
              </button>

              <div className="p-8 relative z-10">
                {/* Headline */}
                <h2 className="text-white text-2xl font-bold tracking-tight leading-tight mb-2">
                  Você está pronto para adquirir seu cassino por apenas{' '}
                  <span className="text-yellow-400">R$ 997?</span>
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-7">
                  Preencha abaixo e um consultor especializado entrará em contato agora pelo WhatsApp.
                </p>

                {/* Formulário */}
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* E-mail */}
                  <div>
                    <label htmlFor="popup-email" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                      E-mail
                    </label>
                    <input
                      id="popup-email"
                      type="email"
                      autoComplete="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      className={`w-full rounded-xl bg-black/50 border ${
                        errors.email ? 'border-red-500/60' : 'border-white/10 focus:border-yellow-400/50'
                      } text-white placeholder-gray-600 px-4 py-3 text-sm outline-none transition-colors duration-200 focus:ring-1 focus:ring-yellow-400/30`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                    )}
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label htmlFor="popup-whatsapp" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                      WhatsApp
                    </label>
                    <input
                      id="popup-whatsapp"
                      type="tel"
                      autoComplete="tel"
                      placeholder="(00) 00000-0000"
                      value={whatsapp}
                      onChange={(e) => {
                        setWhatsapp(formatWhatsapp(e.target.value));
                        if (errors.whatsapp) setErrors((prev) => ({ ...prev, whatsapp: undefined }));
                      }}
                      className={`w-full rounded-xl bg-black/50 border ${
                        errors.whatsapp ? 'border-red-500/60' : 'border-white/10 focus:border-yellow-400/50'
                      } text-white placeholder-gray-600 px-4 py-3 text-sm outline-none transition-colors duration-200 focus:ring-1 focus:ring-yellow-400/30`}
                    />
                    {errors.whatsapp && (
                      <p className="mt-1 text-xs text-red-400">{errors.whatsapp}</p>
                    )}
                  </div>

                  {/* Botão */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative mt-2 w-full inline-flex min-h-[52px] items-center justify-center overflow-hidden rounded-full border border-yellow-300/50 bg-gradient-to-b from-yellow-400 to-yellow-600 px-8 py-3 text-black font-bold text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <MessageCircle size={18} />
                        Falar com o consultor
                        <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    )}
                  </button>
                </form>

                <p className="mt-4 text-center text-xs text-gray-600">
                  Seus dados estão seguros. Não enviamos spam.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LeadPopup;
