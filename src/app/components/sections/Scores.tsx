// src/components/sections/Scores.tsx
export default function Scores() {
  return (
    <section className="py-24 bg-brand-dark text-white">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1">
          <span className="text-blue-400 font-mono tracking-widest uppercase text-sm">Preditivo & Inteligente</span>
          <h2 className="text-4xl font-bold mt-4 mb-6">A saúde não espera a burocracia passar.</h2>
          <p className="text-gray-400 mb-8">
            Diferente do mercado tradicional, a Pasbem utiliza índices como o <strong>IGS</strong> (Gestão de Saúde) e o <strong>IPV</strong> (Performance Vital) para agir antes da doença chegar.
          </p>
          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-blue-400 text-3xl font-bold">IGS</div>
                <div className="text-sm opacity-60">Gestão de Saúde</div>
             </div>
             <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-green-400 text-3xl font-bold">IPV</div>
                <div className="text-sm opacity-60">Performance Vital</div>
             </div>
          </div>
        </div>
        <div className="flex-1 w-full aspect-square bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full border border-white/10 flex items-center justify-center relative">
           <div className="absolute inset-0 animate-pulse bg-blue-500/10 rounded-full blur-3xl"></div>
           <span className="text-7xl font-black italic tracking-tighter">360º</span>
        </div>
      </div>
    </section>
  );
}