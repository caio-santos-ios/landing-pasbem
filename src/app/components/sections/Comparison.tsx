// src/components/sections/Comparison.tsx
export const ComparisonTable = () => {
  const features = [
    { 
      label: "Rede de Atendimento", 
      trad: "Preso a uma rede credenciada fixa e limitada.", 
      pasbem: "Liberdade Total: Escolha qualquer médico ou clínica com o Bem Card." 
    },
    { 
      label: "Tempo de Espera", 
      trad: "Longas filas e burocracia para liberar guias.", 
      pasbem: "Acesso Imediato: Atendimento 24h e Concierge de Saúde." 
    },
    { 
      label: "Foco do Cuidado", 
      trad: "Reativo: Trata apenas a doença já instalada.", 
      pasbem: "Preditivo: Gestão ativa através de Scores (IGS, IPV)." 
    },
    { 
      label: "Bem-Estar Integral", 
      trad: "Raramente cobre farmácia, pilates ou academias.", 
      pasbem: "Crédito para consultas, exames, medicamentos e pilates." 
    },
  ];

  return (
    <section className="py-24 bg-[#FDFDFD] font-sans overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-[900] italic tracking-tighter text-brand-dark">
            A escolha <span className="text-brand-blue">inteligente.</span>
          </h2>
          <p className="text-gray-400 mt-4 font-medium uppercase tracking-[0.2em] text-xs">Comparativo Institucional</p>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-stretch gap-8 md:gap-0">
          
          {/* LADO: MERCADO TRADICIONAL */}
          <div className="flex-1 bg-white p-8 md:p-16 rounded-[3rem] md:rounded-r-none border border-gray-100 shadow-sm relative">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-gray-300 mb-12 text-center md:text-left">
              Mercado Tradicional
            </h3>
            
            <div className="space-y-10">
              {features.map((f, i) => (
                <div key={i} className="group">
                  <span className="text-[10px] font-black uppercase text-brand-blue/40 block mb-2">{f.label}</span>
                  <p className="text-gray-400 font-medium text-sm leading-relaxed italic">
                    {f.trad}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* LADO: ECOSSISTEMA PASBEM */}
          <div className="flex-1 relative">
            {/* Efeito de brilho atrás do card */}
            <div className="absolute inset-0 bg-brand-blue blur-[100px] opacity-20 scale-90"></div>
            
            <div className="relative h-full bg-gradient-to-br from-brand-blue to-brand-purple p-8 md:p-16 rounded-[3rem] md:rounded-l-none shadow-[0_30px_60px_-15px_rgba(59,130,246,0.5)] transform md:scale-105 z-10 text-white">
              
              <div className="flex justify-between items-start mb-12">
                <h3 className="text-xl font-[900] italic uppercase tracking-tighter">
                  Ecossistema <br/> Pasbem
                </h3>
                <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                  Exclusivo
                </div>
              </div>
              
              <div className="space-y-10">
                {features.map((f, i) => (
                  <div key={i}>
                    <span className="text-[10px] font-black uppercase text-white/50 block mb-2 tracking-widest">
                      {f.label}
                    </span>
                    <p className="text-white font-bold text-sm leading-relaxed">
                      {f.pasbem}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-60 italic">Pasbem 2026</span>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};