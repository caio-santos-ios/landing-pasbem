// src/components/sections/BemVital.tsx
export const BemVital = () => {
  const metrics = [
    { label: "Qualidade do Sono", value: "88%", color: "bg-brand-blue" },
    { label: "Nível de Stress", value: " baixo", color: "bg-brand-purple" },
    { label: "Performance Vital", value: "Alta", color: "bg-brand-green" },
  ];

  return (
    <section className="py-24 bg-brand-light font-sans overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          {/* LADO ESQUERDO: TEXTO E CONCEITO */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-brand-blue/10 px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-brand-blue rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-blue">
                Bem + Vital
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-[900] italic tracking-tighter text-brand-dark leading-tight mb-8">
              A sua saúde em <br />
              <span className="text-brand-blue">tempo real.</span>
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-lg font-medium">
              O Bem Vital monitoriza o seu Ciclo Circadiano e os seus scores vitais (IPV) 
              para garantir que está sempre na sua melhor performance, física e mental.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
                <h4 className="font-black italic text-brand-dark mb-2">Ciclo Circadiano</h4>
                <p className="text-sm text-gray-500">Ajuste do seu relógio biológico para um sono reparador e dias produtivos.</p>
              </div>
              <div className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
                <h4 className="font-black italic text-brand-dark mb-2">Monitorização IPV</h4>
                <p className="text-sm text-gray-500">Índice de Performance Vital: dados precisos para decisões inteligentes.</p>
              </div>
            </div>
          </div>

          {/* LADO DIREITO: INTERFACE VISUAL (DASHBOARD) */}
          <div className="flex-1 relative w-full max-w-xl">
            {/* Elemento Decorativo de Fundo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-blue/20 rounded-full blur-[120px]"></div>
            
            <div className="relative bg-white/40 backdrop-blur-xl border border-white/60 p-8 md:p-12 rounded-[4rem] shadow-2xl overflow-hidden">
              <div className="flex justify-between items-center mb-10">
                <div className="text-brand-dark font-black text-xl italic italic">Live Dashboard</div>
                <div className="h-2 w-12 bg-gray-200 rounded-full"></div>
              </div>

              {/* Barras de Progresso / Métricas */}
              <div className="space-y-8">
                {metrics.map((m, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-3 items-end">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{m.label}</span>
                      <span className="text-brand-dark font-black text-lg">{m.value}</span>
                    </div>
                    <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${m.color} rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)]`} 
                        style={{ width: m.value.includes('%') ? m.value : '95%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gráfico Linear Simulado (SVG) */}
              <div className="mt-12 p-6 bg-brand-dark rounded-[2.5rem] text-white">
                <div className="text-[10px] font-bold opacity-50 uppercase tracking-widest mb-4">Tendência Semanal</div>
                <svg viewBox="0 0 200 60" className="w-full h-16 stroke-brand-blue fill-none stroke-[3] stroke-round">
                  <path d="M0,40 Q25,10 50,35 T100,20 T150,45 T200,10" className="drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                </svg>
                <div className="flex justify-between mt-2 text-[8px] font-black opacity-30 uppercase">
                  <span>Seg</span><span>Qua</span><span>Sex</span><span>Dom</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};