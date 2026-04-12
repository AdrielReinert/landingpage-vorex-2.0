import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, MousePointer, Users, Eye, ArrowLeft, ExternalLink, Map, PlayCircle } from 'lucide-react';

const AnalyticsDashboard: React.FC = () => {
  const [clicks, setClicks] = useState<number>(0);
  const [visits, setVisits] = useState<number>(0);
  const [sessionTime, setSessionTime] = useState<number>(0);

  // Simulação de dados locais (já que não temos backend real conectado)
  useEffect(() => {
    // Carregar dados simulados/locais
    const localClicks = parseInt(localStorage.getItem('vexus_clicks') || '0');
    const localVisits = parseInt(localStorage.getItem('vexus_visits') || '1');
    
    setClicks(localClicks);
    setVisits(localVisits);

    // Timer da sessão atual
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans selection:bg-yellow-500/30">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
               <Activity className="text-yellow-400" size={24} />
            </div>
            <h1 className="text-3xl font-semibold tracking-tight">Vorex Analytics</h1>
          </div>
          <p className="text-gray-400 font-medium">Painel de monitoramento de comportamento do usuário.</p>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-gray-300 text-sm flex items-center gap-2 font-medium"
          >
            <ArrowLeft size={16} /> Voltar ao Site
          </button>
          <a 
            href="https://clarity.microsoft.com/projects" 
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-semibold flex items-center gap-2 shadow-lg shadow-yellow-600/20"
          >
            Acessar Clarity Full <ExternalLink size={16} />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Card 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 relative overflow-hidden group"
        >
           <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <MousePointer size={60} />
           </div>
           <div className="text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wider">Cliques Totais (Local)</div>
           <div className="text-4xl font-mono font-bold text-white">{clicks}</div>
           <div className="mt-4 text-xs text-emerald-400 flex items-center gap-1 font-medium">
             <Activity size={12} /> Monitorando em tempo real
           </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 relative overflow-hidden group"
        >
           <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <Users size={60} />
           </div>
           <div className="text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wider">Visitas (Local)</div>
           <div className="text-4xl font-mono font-bold text-white">{visits}</div>
           <div className="mt-4 text-xs text-yellow-400 font-medium">Sessão atual</div>
        </motion.div>

        {/* Card 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 relative overflow-hidden group"
        >
           <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <Eye size={60} />
           </div>
           <div className="text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wider">Tempo de Sessão</div>
           <div className="text-4xl font-mono font-bold text-white">{formatTime(sessionTime)}</div>
           <div className="mt-4 text-xs text-gray-500 font-medium">Tempo ativo na dashboard</div>
        </motion.div>

        {/* Card 4 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-yellow-600/20 to-purple-600/20 border border-yellow-500/30 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center items-center text-center"
        >
           <div className="font-semibold text-white mb-2">Status do Pixel</div>
           <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold border border-green-500/30">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              ATIVO
           </div>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Heatmap Explanation */}
        <div className="lg:col-span-2 bg-zinc-900/30 border border-white/10 rounded-3xl p-8">
           <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-500/20 text-orange-400 rounded-lg">
                 <Map size={24} />
              </div>
              <h2 className="text-xl font-semibold text-white">Mapa de Calor (Heatmap)</h2>
           </div>
           
           <div className="relative aspect-video bg-black/40 rounded-xl overflow-hidden border border-white/5 flex items-center justify-center group">
              <div className="absolute inset-0 bg-[url('https://i.postimg.cc/SRxK26m2/6.png')] opacity-10 bg-cover bg-center"></div>
              <div className="text-center p-6 relative z-10">
                 <p className="text-gray-300 mb-6 max-w-md mx-auto font-medium">
                    Para visualizar o mapa de calor real, gravações de tela e cliques de todos os usuários, utilizamos a integração profissional com o <strong>Microsoft Clarity</strong>.
                 </p>
                 <a 
                   href="https://clarity.microsoft.com/" 
                   target="_blank" 
                   rel="noreferrer"
                   className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
                 >
                   Ver Heatmap no Clarity <ExternalLink size={16} />
                 </a>
              </div>
           </div>

           <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                 <h3 className="text-white font-semibold mb-1 flex items-center gap-2"><MousePointer size={16} className="text-yellow-400"/> Click Maps</h3>
                 <p className="text-xs text-gray-400 font-medium">Veja exatamente onde os usuários estão clicando e onde estão ignorando.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                 <h3 className="text-white font-semibold mb-1 flex items-center gap-2"><Map size={16} className="text-orange-400"/> Scroll Maps</h3>
                 <p className="text-xs text-gray-400 font-medium">Entenda até onde os usuários rolam a página antes de sair.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                 <h3 className="text-white font-semibold mb-1 flex items-center gap-2"><PlayCircle size={16} className="text-green-400"/> Gravações</h3>
                 <p className="text-xs text-gray-400 font-medium">Assista replays das sessões dos usuários como se fosse um filme.</p>
              </div>
           </div>
        </div>

        {/* Setup Guide */}
        <div className="bg-zinc-900/30 border border-white/10 rounded-3xl p-8">
           <h2 className="text-xl font-semibold text-white mb-6">Configuração</h2>
           
           <div className="space-y-6">
              <div>
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400 font-medium">Script do Clarity</span>
                    <span className="text-xs text-green-400 font-mono">INSTALADO</span>
                 </div>
                 <div className="bg-black/50 p-3 rounded-lg border border-white/5 text-[10px] text-gray-500 font-mono overflow-hidden">
                    &lt;script type="text/javascript"&gt;<br/>
                    (function(c,l,a,r,i,t,y)...<br/>
                    &lt;/script&gt;
                 </div>
              </div>

              <div>
                 <h3 className="text-sm font-bold text-white mb-2">Como ativar os dados reais:</h3>
                 <ol className="list-decimal list-inside space-y-3 text-sm text-gray-400 font-medium">
                    <li>Crie uma conta em <a href="https://clarity.microsoft.com" className="text-yellow-400 hover:underline">clarity.microsoft.com</a></li>
                    <li>Crie um novo projeto com o nome "Vorex iGaming".</li>
                    <li>Copie o <strong>Project ID</strong> fornecido.</li>
                    <li>Substitua "YOUR_CLARITY_ID" no arquivo <code>index.html</code> pelo seu ID.</li>
                    <li>Pronto! Os dados aparecerão em ~2 horas.</li>
                 </ol>
              </div>

              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                 <p className="text-xs text-yellow-200 font-medium">
                    <strong>Atenção:</strong> Esta dashboard interna mostra dados da sessão local para demonstração. A análise profissional de tráfego deve ser feita no painel do Clarity.
                 </p>
              </div>
           </div>
        </div>

      </div>

    </div>
  );
};

export default AnalyticsDashboard;