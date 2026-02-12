// src/components/sections/FooterCTA.tsx

import Button from "../ui/Button";

export default function FooterCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-brand-blue to-brand-purple text-white text-center">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl font-extrabold mb-4 italic">Escolha a liberdade.</h2>
          <h2 className="text-5xl font-extrabold mb-10">Escolha a inteligência.</h2>
          
          <p className="text-xl opacity-90 mb-12">
            Leve o programa assistencial que une tecnologia humanizada e 
            acolhimento constante para quem você ama.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-brand-blue hover:bg-gray-100 border-none px-10 py-4 text-lg"
            >
              Falar com um Consultor
            </Button>
            <Button 
              variant="outline-primary" 
              className="border-white text-white hover:bg-white/10 px-10 py-4 text-lg"
            >
              Ver Planos
            </Button>
          </div>
          
          <p className="mt-16 text-sm opacity-60">
            © 2026 Pasbem - Programa Assistencial de Saúde e Bem Estar.
          </p>
        </div>
      </div>
    </section>
  );
}