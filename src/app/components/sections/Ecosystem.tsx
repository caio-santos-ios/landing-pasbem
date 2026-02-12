// // src/components/sections/Ecosystem.tsx
// export default function Ecosystem() {
//   const pillars = [
//     { title: "Bem + Papo", desc: "Acolhimento emocional e equilíbrio mental.", color: "text-purple-500", icon: "💜" },
//     { title: "Bem + Cuidado", desc: "Médicos 24h e suporte imediato sem filas.", color: "text-blue-500", icon: "💙" },
//     { title: "Bem + Performance", desc: "Monitoramento do Ciclo Circadiano e IPV.", color: "text-green-500", icon: "💚" },
//   ];

//   return (
//     <section className="py-24 bg-white overflow-hidden">
//       <div className="container mx-auto px-6 text-center">
//         <h2 className="text-4xl font-bold mb-4">Seu Ecossistema de Saúde Integral</h2>
//         <p className="text-gray-500 max-w-2xl mx-auto mb-16">
//           Unimos tecnologia humanizada e acolhimento constante para sustentar o seu florescer.
//         </p>
        
//         <div className="grid md:grid-cols-3 gap-12">
//           {pillars.map((p) => (
//             <div key={p.title} className="group p-8 rounded-3xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-2xl transition-all">
//               <div className="text-5xl mb-6">{p.icon}</div>
//               <h3 className={`text-2xl font-bold mb-4 ${p.color}`}>{p.title}</h3>
//               <p className="text-gray-600 leading-relaxed">{p.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// src/components/sections/Ecosystem.tsx
export default function Ecosystem() {
  const cards = [
    {
      id: "papo",
      title: "Bem + Papo",
      tag: "Psicologia & Acolhimento",
      desc: "O suporte emocional necessário para enfrentar desafios e manter o equilíbrio mental.",
      color: "from-purple-500 to-purple-700",
      lightColor: "bg-purple-50",
      icon: "💜"
    },
    {
      id: "cuidado",
      title: "Bem + Cuidado",
      tag: "Medicina 24h",
      desc: "Suporte médico em qualquer momento. Médicos generalistas disponíveis 24h para diagnósticos imediatos.",
      color: "from-blue-500 to-blue-700",
      lightColor: "bg-blue-50",
      icon: "💙"
    },
    {
      id: "performance",
      title: "Bem + Performance",
      tag: "Gestão Vital",
      desc: "Monitoramento do Ciclo Circadiano e dos seus scores vitais (IPV) para alta performance.",
      color: "from-green-500 to-green-700",
      lightColor: "bg-green-50",
      icon: "💚"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Sustentando o seu florescer</h2>
          <p className="text-gray-500">Conheça o tripé que forma o Ecossistema 360º da Pasbem</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div key={card.id} className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} rounded-[3rem] blur-0 group-hover:blur-xl opacity-0 group-hover:opacity-20 transition-all`} />
              <div className="relative bg-white border border-gray-100 p-10 rounded-[3rem] h-full flex flex-col items-start shadow-sm group-hover:shadow-xl transition-all">
                <div className={`w-16 h-16 ${card.lightColor} rounded-2xl flex items-center justify-center text-3xl mb-8`}>
                  {card.icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{card.tag}</span>
                <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                <p className="text-gray-600 leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}