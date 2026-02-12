// src/components/sections/PainPoints.tsx
export default function PainPoints() {
  const pains = [
    { title: "A Burocracia que Afasta", desc: "Filas intermináveis e processos robóticos que te distanciam do médico.", icon: "⏳" },
    { title: "A Incerteza da Madrugada", desc: "Uma febre alta ou dor súbita que te obriga a enfrentar prontos-socorros lotados.", icon: "🏥" },
    { title: "O Silêncio no Cuidado", desc: "A mente pede ajuda, mas não encontra um espaço seguro e humano para ser ouvida.", icon: "🗨️" }
  ];

  return (
    <section className="py-24 bg-brand-dark text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 italic">Os desafios que silenciam seu bem-estar.</h2>
          <p className="text-gray-400 text-lg">Cuidar apenas da doença não é suficiente. O mercado tradicional falha onde a Pasbem acolhe.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {pains.map((pain, i) => (
            <div key={i} className="p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:border-brand-blue/50 transition-all group">
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{pain.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{pain.title}</h3>
              <p className="text-gray-400 leading-relaxed">{pain.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}