// Exemplo de seção de métricas
export const ScoresSection = () => (
  <section className="py-20 bg-pasbem-dark text-white overflow-hidden">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1">
        <span className="text-pasbem-accent font-bold tracking-widest uppercase">Tecnologia & Dados</span>
        <h2 className="text-4xl font-bold mt-4 mb-6">A saúde não espera a burocracia passar.</h2>
        <p className="text-gray-400 mb-6 italic">"O usuário não tem dados sobre sua saúde no mercado tradicional. Na Pasbem, você tem o controle."</p>
        <ul className="space-y-4">
          <li className="flex items-center gap-3">
            <div className="w-2 h-2 bg-pasbem-accent rounded-full" />
            <span><strong>IGS:</strong> Índice de Gestão de Saúde</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="w-2 h-2 bg-pasbem-primary rounded-full" />
            <span><strong>IPV:</strong> Índice de Performance Vital</span>
          </li>
        </ul>
      </div>
      <div className="flex-1 bg-white/10 p-8 rounded-3xl backdrop-blur-md border border-white/20">
         {/* Aqui entraria um mockup do gráfico que você já está desenvolvendo */}
         <div className="h-64 flex items-end gap-4 justify-around">
            {[60, 80, 45, 90].map((h, i) => (
              <div key={i} style={{ height: `${h}%` }} className="w-12 bg-pasbem-primary rounded-t-lg animate-pulse" />
            ))}
         </div>
         <p className="text-center mt-6 text-sm text-gray-300 font-mono">Monitorização em Tempo Real</p>
      </div>
    </div>
  </section>
);