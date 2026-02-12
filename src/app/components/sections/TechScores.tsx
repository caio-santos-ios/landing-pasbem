// src/components/sections/TechScores.tsx
export default function TechScores() {
  return (
    <section className="py-24 bg-brand-light">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          {/* Círculo 360 do PDF */}
          <div className="w-full aspect-square max-w-md mx-auto rounded-full border-[16px] border-white shadow-2xl bg-gradient-to-tr from-brand-blue to-brand-purple flex items-center justify-center text-white relative">
            <div className="text-center">
              <span className="block text-8xl font-black italic">360º</span>
              <span className="uppercase tracking-[0.3em] font-bold text-sm">Ecossistema</span>
            </div>
            {/* Badges de Score flutuando */}
            <div className="absolute top-0 -right-4 bg-white p-4 rounded-2xl shadow-xl text-brand-dark font-bold animate-bounce">IGS: 88</div>
            <div className="absolute bottom-10 -left-8 bg-white p-4 rounded-2xl shadow-xl text-brand-dark font-bold">IPV: 94</div>
          </div>
        </div>
        
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-brand-dark">
            Sua saúde não é um palpite. <br/>
            <span className="text-brand-blue">São dados.</span>
          </h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center font-bold text-brand-blue">1</div>
              <div>
                <h4 className="text-xl font-bold mb-2">Preditivo</h4>
                <p className="text-gray-600">Gestão ativa através de Scores (IGS, IGN, IES). Agimos antes da doença.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center font-bold text-brand-purple">2</div>
              <div>
                <h4 className="text-xl font-bold mb-2">Performance Vital</h4>
                <p className="text-gray-600">Monitoramento do IPV e Ciclo Circadiano para você atingir seu máximo potencial.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}