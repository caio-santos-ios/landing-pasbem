// src/components/sections/Hero.tsx

import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-brand-light">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="z-10">
          <span className="inline-block px-4 py-1 rounded-full bg-brand-blue/10 text-brand-blue font-bold text-sm mb-6 uppercase tracking-widest">
            Programa Assistencial de Saúde
          </span>
          <h1 className="text-6xl md:text-8xl font-black leading-tight text-brand-dark mb-6">
            Saúde acessível, <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-blue to-brand-purple">
              bem-estar real.
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
            Para todos que você ama. Um ecossistema completo que une acolhimento, tecnologia e cuidado integral.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full px-10">
              Começar Agora
            </Button>
            <Button variant="outline-primary" size="lg" className="rounded-full px-10">
              Ver Vídeo Institucional
            </Button>
          </div>
        </div>

        {/* Lado Direito: Representação visual do PDF */}
        <div className="relative h-125 md:h-150">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-brand-blue/20 to-brand-purple/20 rounded-full blur-3xl" />
          <div className="relative z-10 w-full h-full rounded-[4rem] overflow-hidden border-8 border-white shadow-2xl">
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
              <img className="w-full h-full object-cover" src="/hero.jpg" alt="logo" />
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 glass p-6 rounded-3xl shadow-xl z-20">
            <div className="text-3xl font-bold text-brand-blue">98%</div>
            <div className="text-xs font-bold uppercase text-gray-500">Satisfação Real</div>
          </div>
        </div>
      </div>
    </section>
  );
}