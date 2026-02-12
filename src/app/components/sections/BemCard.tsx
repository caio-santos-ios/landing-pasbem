// src/components/sections/BemCard.tsx
export default function BemCard() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 bg-brand-blue rounded-[4rem] p-12 md:p-20 text-white flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
        <div className="flex-1 z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-6">Liberdade Total com o Bem Card.</h2>
          <p className="text-xl opacity-90 mb-8 leading-relaxed">
            Esqueça as redes credenciadas fixas e limitadas. Com a Pasbem, você escolhe qualquer médico, clínica ou terapeuta. O crédito é seu, a escolha também.
          </p>
          <ul className="grid grid-cols-2 gap-4 text-sm font-bold uppercase tracking-wider">
            <li className="flex items-center gap-2">✅ Farmácias</li>
            <li className="flex items-center gap-2">✅ Academias</li>
            <li className="flex items-center gap-2">✅ Exames</li>
            <li className="flex items-center gap-2">✅ Pilates</li>
          </ul>
        </div>
        <div className="flex-1 relative z-10">
          <div className="relative w-full aspect-[1.6/1] bg-linear-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8 flex flex-col justify-between">
            <div className="text-2xl font-mono">BEM CARD</div>
            <div className="text-xl tracking-[0.2em] font-light">4000 1234 5678 9010</div>
            <div className="flex justify-between items-end relative">
              <span className="text-sm font-bold uppercase">Pasbem Premium</span>
              <div className="w-12 h-12 bg-white/20 rounded-full" />
            </div>
            <img className="absolute top-2 right-2 h-20" src="/logo.png" alt="logo" />
          </div>
        </div>
        {/* Decorativo de fundo */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-brand-purple rounded-full blur-[120px] opacity-50" />
      </div>
    </section>
  );
}