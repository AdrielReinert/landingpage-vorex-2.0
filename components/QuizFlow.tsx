import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Send, Zap, Star, MessageCircle, Sparkles, ChevronRight, Crown, Check
} from 'lucide-react';

// --- Types ---
type MessageType = 'text' | 'system' | 'carousel';

interface CarouselItem {
  title: string;
  image: string;
}

interface Message {
  id: string;
  type: MessageType;
  content?: string;
  data?: CarouselItem[];
  sender: 'bot' | 'user';
}

interface Option {
  label: string;
  nextStep: number;
}

type ScriptMessageContent = string | { type: 'carousel'; items: CarouselItem[] };

// --- 3D Tilt Component ---
const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", willChange: "transform" }}
      className={`relative transition-all duration-200 ease-out ${className}`}
    >
      <div style={{ transform: "translateZ(20px)" }} className="relative z-10 w-full h-full">
         {children}
      </div>
       <motion.div 
        style={{ 
          background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,215,0,0.15) 0%, transparent 80%)`, // Gold glare
          z: 50,
          transform: "translateZ(30px)"
        }}
        className="absolute inset-0 rounded-xl pointer-events-none mix-blend-plus-lighter z-20"
      />
    </motion.div>
  );
};

// --- Bot Logic & Script ---
const scriptData: Record<number, { messages: ScriptMessageContent[]; options: Option[] }> = {
  0: {
    messages: [
      "🎰 Quer ter seu próprio cassino online pronto para operar?",
      "Plataforma completa, integrada a gateway próprio, com painel de controle e suporte técnico.",
      "✔️ Cassino entregue pronto\n✔️ Operação ativa\n✔️ Painel exclusivo\n✔️ Suporte incluso"
    ],
    options: [
      { label: "Quero entender como funciona", nextStep: 2 }
    ]
  },
  2: {
    messages: [
      "Você não precisa criar nada do zero.",
      "Nada de programadores, integrações ou sistemas complicados.",
      "O cassino já vem pronto para operar, com toda a estrutura técnica funcionando.",
      "**Você entra focado no negócio.**\nA parte técnica fica por nossa conta."
    ],
    options: [
      { label: "Como funciona?", nextStep: 3 }
    ]
  },
  3: {
    messages: [
      "Funciona de forma simples 👇",
      "1️⃣ Você escolhe o modelo de cassino\n2️⃣ Fazemos a configuração\n3️⃣ O cassino entra em operação\n4️⃣ Você recebe acesso ao painel\n5️⃣ Começa a operar imediatamente"
    ],
    options: [
      { label: "Quero ver os modelos disponíveis", nextStep: 4 }
    ]
  },
  4: {
    messages: [
      "Temos diferentes modelos disponíveis:",
      {
        type: 'carousel',
        items: [
          { title: "Viper", image: "https://i.postimg.cc/1zjNHbLh/viper.png" },
          { title: "Chinês", image: "https://i.postimg.cc/0N8kXT1p/Screenshot-1.png" }
        ]
      },
      "Todos os modelos são entregues prontos para operar, com painel e integração completa."
    ],
    options: [
      { label: "E sobre a segurança?", nextStep: 5 }
    ]
  },
  5: {
    messages: [
      "Seu cassino roda em gateway próprio.",
      "✔️ Estabilidade\n✔️ Controle da operação\n✔️ Monitoramento em tempo real\n✔️ Estrutura preparada para escala",
      "Isso traz mais segurança e previsibilidade para o negócio."
    ],
    options: [
      { label: "Quais são os custos e taxas?", nextStep: 100 }
    ]
  },
  100: {
    messages: [
      "Trabalhamos com transparência total. Aqui estão os números:",
      "**Investimento Único:**\nVocê paga apenas **R$ 499,00** para ativar sua plataforma.\n🚫 Sem mensalidades.\n🚫 Sem aluguel de software.",
      "**Taxas do Gateway:**\nAs taxas operacionais são informadas diretamente pelo nosso consultor via WhatsApp, garantindo a melhor condição para o seu perfil.",
      "O restante é **LUCRO SEU**."
    ],
    options: [
      { label: "Entendi. E como eu lucro?", nextStep: 6 }
    ]
  },
  6: {
    messages: [
      "O modelo funciona com base na operação contínua do cassino.",
      "Não depende de uma única ação pontual, mas do volume de operação ao longo do tempo.",
      "📌 **Nota:** Quanto maior o volume, maior o faturamento mensal.\nDetalhes operacionais são explicados no atendimento."
    ],
    options: [
      { label: "Como eu acompanho tudo?", nextStep: 7 }
    ]
  },
  7: {
    messages: [
      "Você acompanha tudo em um painel exclusivo:",
      "✔️ Cassino ativo\n✔️ Operações em tempo real\n✔️ Dados organizados\n✔️ Visão clara da operação"
    ],
    options: [
      { label: "Esse modelo é para mim?", nextStep: 8 }
    ]
  },
  8: {
    messages: [
      "Esse modelo é para você se:",
      "✅ Quer entrar no mercado de cassino online\n✅ Busca um modelo pronto\n✅ Quer operar com estrutura\n✅ Pensa em escala",
      "❌ Não é para quem busca dinheiro fácil\n❌ Não quer operar um negócio\n❌ Quer algo improvisado"
    ],
    options: [
      { label: "Como começar?", nextStep: 9 }
    ]
  },
  9: {
    messages: [
      "Para começar é simples:",
      "1️⃣ Chama no WhatsApp\n2️⃣ Apresentamos os modelos\n3️⃣ Definimos a melhor opção\n4️⃣ O cassino entra em operação"
    ],
    options: [
      { label: "Quero garantir minha operação", nextStep: 10 }
    ]
  },
  10: {
    messages: [
      "Você não está comprando apenas um sistema.\nEstá entrando em uma operação pronta para rodar."
    ],
    options: [
      { label: "💬 Falar com um consultor no WhatsApp", nextStep: 99 }
    ]
  }
};

const QuizFlow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, showOptions]);

  useEffect(() => {
    if (!hasStarted) {
      setHasStarted(true);
      processStep(0);
    }
  }, []);

  const processStep = async (stepIndex: number) => {
    const stepData = scriptData[stepIndex];
    if (!stepData) return;

    setShowOptions(false);

    for (const msgItem of stepData.messages) {
      setIsTyping(true);
      // Increased delay calculation for slower reading pace
      // Base delay 800ms + 30ms per character, capped at 2500ms
      let delay = typeof msgItem === 'string' 
        ? Math.min(2500, msgItem.length * 35) + 800 
        : 2000;
        
      await new Promise(resolve => setTimeout(resolve, delay));
      setIsTyping(false);
      
      if (typeof msgItem === 'string') {
        setMessages(prev => [...prev, { id: Math.random().toString(), type: 'text', content: msgItem, sender: 'bot' }]);
      } else if (msgItem.type === 'carousel') {
        setMessages(prev => [...prev, { id: Math.random().toString(), type: 'carousel', data: msgItem.items, sender: 'bot' }]);
      }
    }
    setShowOptions(true);
  };

  const handleOptionClick = (option: Option) => {
    setShowOptions(false);
    setMessages(prev => [...prev, { id: Math.random().toString(), type: 'text', content: option.label, sender: 'user' }]);

    if (option.nextStep === 99) {
      if (typeof (window as any).fbq === 'function') {
        try {
          (window as any).fbq('track', 'Lead');
          (window as any).fbq('track', 'CompleteRegistration');
        } catch (e) {
          console.error('Error firing pixel:', e);
        }
      }
      handleWhatsAppRedirect();
    } else {
      setCurrentStep(option.nextStep);
      processStep(option.nextStep);
    }
  };

  const handleWhatsAppRedirect = () => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Math.random().toString(), 
        type: 'text', 
        content: 'Estou te transferindo para um consultor especialista no WhatsApp agora mesmo...', 
        sender: 'bot' 
      }]);
      setIsTyping(false);
      
      setTimeout(() => {
        window.location.href = "https://wa.me/5547988700032?text=Ol%C3%A1%2C%20quero%20montar%20meu%20cassino%20online%20com%20estrutura%20pronta.";
      }, 1000);
    }, 600);
  };

  const formatText = (text?: string) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => (
      <span key={i} className="block min-h-[1.2em]">
        {line.split(/(\*\*.*?\*\*|✔️)/g).map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <span key={j} className="relative inline-block">
                <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-400 drop-shadow-[0_0_10px_rgba(234,179,8,0.3)]">
                  {part.slice(2, -2)}
                </span>
              </span>
            );
          }
          if (part === '✔️') {
            return (
               <Check key={j} size={15} strokeWidth={3.5} className="inline-block text-[#D4AF37] mr-1.5 align-text-top drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
            );
          }
          return part;
        })}
      </span>
    ));
  };

  const renderMessageContent = (msg: Message) => {
    if (msg.type === 'carousel' && msg.data) {
      return (
        <div className="grid grid-cols-2 gap-3 w-full perspective-1000">
          {msg.data.map((item, idx) => (
            <motion.div
               key={idx}
               initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
               animate={{ opacity: 1, scale: 1, rotateX: 0 }}
               transition={{ delay: idx * 0.15, type: "spring", stiffness: 200 }}
               className="perspective-1000"
            >
              <TiltCard className="relative group overflow-hidden rounded-xl border border-yellow-500/20 bg-[#0A0A0A] shadow-2xl transition-all duration-300 hover:shadow-yellow-500/10 hover:border-yellow-500/40">
                <div className="aspect-video w-full relative bg-black">
                  <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-white flex items-center gap-1">
                      <Crown size={12} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-yellow-100">{item.title}</span>
                    </span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      );
    }
    
    // Message Bubbles Styling
    const isUser = msg.sender === 'user';
    const bubbleClass = isUser 
      ? 'bg-gradient-to-br from-[#D4AF37] to-[#854D0E] text-white rounded-2xl rounded-br-none shadow-[0_4px_15px_-3px_rgba(212,175,55,0.3)] border border-yellow-400/20' 
      : 'bg-[#09090b]/95 border border-yellow-500/10 text-slate-200 rounded-2xl rounded-bl-none shadow-[0_4px_20px_-5px_rgba(0,0,0,0.8)]';

    return (
      <div className={`relative px-5 py-4 text-[15px] leading-relaxed backdrop-blur-md break-words ${bubbleClass}`}>
        {!isUser && <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent"></div>}
        {isUser && <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl pointer-events-none"></div>}
        {formatText(msg.content)}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-black overflow-hidden font-sans z-[9999]">
      {/* WhatsApp Doodle Pattern Background (Gold Version) */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10l20 20M50 20l-10 10M100 50a20 20 0 1 0 40 0 20 20 0 1 0-40 0M200 80l30-10-10 30zM300 20l20 40-40 0zM50 150h40v40h-40zM150 200l20 20-20 20-20-20zM250 150a30 30 0 1 1 60 0 30 30 0 1 1-60 0M350 250l30 30M10 350l40-20M100 300l30 30M200 350h50M300 320a15 15 0 1 0 30 0 15 15 0 1 0-30 0' fill='none' stroke='%23D4AF37' stroke-width='2'/%3E%3C/svg%3E")`,
          backgroundSize: '400px 400px'
        }}
      />
      
      {/* Ambient Gold Glows */}
      <motion.div animate={{ opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-yellow-900/20 via-transparent to-transparent pointer-events-none z-0" />
      
      {/* --- HEADER --- */}
      <div className="flex-shrink-0 px-5 py-4 bg-black/80 backdrop-blur-xl border-b border-yellow-500/10 z-20 flex items-center justify-between shadow-lg relative">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-yellow-600 via-yellow-300 to-yellow-600 p-[2px] shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden relative">
                <img 
                   src="https://i.postimg.cc/8ChNGqL8/icone.png" 
                   alt="Bot" 
                   className="w-7 h-7 object-contain relative z-10 sepia-[1] contrast-[1.2] brightness-[1.1] saturate-[1.5] hue-rotate-[5deg]" 
                />
                <div className="absolute inset-0 bg-yellow-500/10 animate-pulse"></div>
              </div>
            </div>
            {/* Status Indicator: Changed from Green to Gold */}
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#D4AF37] border-[3px] border-black rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]"></div>
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide uppercase flex items-center gap-2">
               Vorex iGaming
            </h1>
            <p className="text-[10px] text-yellow-500/80 font-bold flex items-center gap-1.5 tracking-wider mt-0.5">
              {/* Online Text Indicator: Changed from Green to Gold */}
              <span className="w-1 h-1 bg-[#D4AF37] rounded-full animate-pulse"></span> CONSULTOR ONLINE
            </p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-900/10 p-2.5 rounded-xl border border-yellow-500/20 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
           <Zap size={18} className="text-yellow-400 fill-yellow-400" />
        </div>
      </div>

      {/* --- CHAT AREA --- */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 relative z-10 scrollbar-hide perspective-1000 overscroll-contain">
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div key={msg.id} layout initial={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }} transition={{ type: "spring", stiffness: 400, damping: 30 }} style={{ willChange: "transform, opacity, filter" }} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'bot' && (
                 <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center mr-3 flex-shrink-0 mt-auto mb-1 border border-yellow-500/20 shadow-lg overflow-hidden relative">
                    <div className="absolute inset-0 bg-yellow-500/5"></div>
                    <img 
                       src="https://i.postimg.cc/8ChNGqL8/icone.png" 
                       alt="Vorex" 
                       className="w-5 h-5 object-contain relative z-10 sepia-[1] contrast-[1.2] brightness-[1.1] saturate-[1.5] hue-rotate-[5deg]" 
                    />
                 </div>
              )}
              <div className={`max-w-[85%] md:max-w-[75%] ${msg.type === 'carousel' ? 'w-full max-w-[95%] md:max-w-[85%]' : ''}`}>
                  {renderMessageContent(msg)}
                  <div className={`text-[9px] text-white/20 mt-1.5 font-medium tracking-wider ${msg.sender === 'user' ? 'text-right mr-1' : 'text-left ml-1'}`}>AGORA</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <motion.div initial={{ opacity: 0, y: 10, x: -10 }} animate={{ opacity: 1, y: 0, x: 0 }} exit={{ opacity: 0, scale: 0.8 }} className="flex w-full justify-start pl-11">
             <div className="bg-[#0A0A0A] border border-yellow-500/10 px-4 py-3.5 rounded-2xl rounded-bl-none flex items-center gap-1.5 h-10 shadow-lg">
                <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0 }} className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
             </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} className="h-6" />
      </div>

      {/* --- INPUT AREA (Options) --- */}
      <div className="flex-shrink-0 p-5 bg-black/90 backdrop-blur-xl border-t border-yellow-500/10 z-20 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
        <AnimatePresence mode="wait">
          {showOptions && !isTyping ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="flex flex-col gap-3">
              {scriptData[currentStep]?.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOptionClick(opt)}
                  className={`w-full relative overflow-hidden font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-between group shadow-lg uppercase tracking-wide text-sm ${
                    opt.nextStep === 99 
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#854D0E] text-white border-0 hover:shadow-yellow-500/30' // WhatsApp Button: Changed from Green to Gold Gradient
                    : 'bg-[#0A0A0A] hover:bg-[#111111] border border-yellow-500/20 hover:border-yellow-500/50 text-yellow-100 shadow-[0_0_15px_rgba(0,0,0,0.5)]'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none"></div>
                  <span className="text-left relative z-10 flex items-center gap-2">{opt.label}</span>
                  {opt.nextStep === 99 ? (
                    <div className="bg-white/20 p-1.5 rounded-full"><MessageCircle size={18} fill="currentColor" /></div>
                  ) : (
                    <div className="relative"><ChevronRight size={18} className="text-yellow-500 group-hover:text-yellow-300 transition-colors" /></div>
                  )}
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <div className="h-[72px] flex items-center justify-center gap-2 text-slate-600 text-xs font-mono tracking-widest opacity-80">
               {isTyping ? (
                 <>
                   <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                   VOREX ESTÁ DIGITANDO...
                 </>
               ) : (
                 'AGUARDANDO CONEXÃO...'
               )}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizFlow;