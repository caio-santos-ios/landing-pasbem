"use client";

import { useEffect, useState } from "react";

/* ─────────────────────────────────────────────
  Global styles injected once via <style> tag
───────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap');

  .pasbem * { font-family: 'Montserrat', sans-serif; }
  .pasbem { scroll-behavior: smooth; }

  .hero-bg {
    background: linear-gradient(135deg, #1A3557 0%, #2D4E75 40%, #0D7B6B 75%, #3DBD9B 100%);
    position: relative;
    overflow: hidden;
  }
  .hero-bg::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 80% 30%, rgba(61,189,155,0.25) 0%, transparent 60%),
      radial-gradient(ellipse 50% 60% at 10% 80%, rgba(13,123,107,0.3) 0%, transparent 60%);
  }
  .noise::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
  }
  .reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.75s ease, transform 0.75s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
  .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(61,189,155,0.18); }
  .gradient-text {
    background: linear-gradient(90deg, #3DBD9B, #0D7B6B);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .wave-divider svg { display: block; }
  .pill { display: inline-flex; align-items: center; gap: 6px; padding: 4px 14px; border-radius: 999px; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; }
  .check-item { display: flex; align-items: flex-start; gap: 14px; }
  .check-icon { flex-shrink: 0; width: 24px; height: 24px; border-radius: 50%; background: #3DBD9B; display: flex; align-items: center; justify-content: center; margin-top: 2px; }
  .pasbem-navbar { transition: background 0.4s, box-shadow 0.4s; }
  .pasbem-navbar.scrolled { background: rgba(26,53,87,0.97) !important; backdrop-filter: blur(12px); box-shadow: 0 4px 30px rgba(0,0,0,0.2); }
  .table-row:nth-child(even) { background: rgba(61,189,155,0.04); }
  .mobile-menu { transition: max-height 0.4s ease, opacity 0.3s ease; max-height: 0; opacity: 0; overflow: hidden; }
  .mobile-menu.open { max-height: 400px; opacity: 1; }
  .pulse-dot { animation: pulseDot 1.5s ease-in-out infinite; }
  @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.3)} }
  .float-anim { animation: floatUp 4s ease-in-out infinite; }
  @keyframes floatUp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  .wa-btn { transition: transform 0.2s ease, background 0.2s ease; }
  .wa-btn:hover { transform: scale(1.1); }
`;

/* ─────────── tiny icon helpers ─────────── */
const CheckSVG = () => (
  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);
const ArrowRight = () => (
  <svg className="w-5 h-5 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

/* ─────────── Logo ─────────── */
const PasbemLogo = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path d="M50 15 C35 15 20 28 20 45 C20 62 35 75 50 80 C65 75 80 62 80 45 C80 28 65 15 50 15Z" fill="#3DBD9B" opacity="0.3" />
    <path d="M30 50 C30 40 38 32 50 32 C62 32 70 40 70 50" stroke="#3DBD9B" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M38 42 C38 35 43 30 50 30 C57 30 62 35 62 42" stroke="#1A3557" strokeWidth="3" strokeLinecap="round" fill="none" />
    <ellipse cx="37" cy="55" rx="7" ry="10" fill="#3DBD9B" opacity="0.7" />
    <ellipse cx="63" cy="55" rx="7" ry="10" fill="#3DBD9B" opacity="0.7" />
    <path d="M37 65 C37 72 43 78 50 80 C57 78 63 72 63 65" fill="#3DBD9B" opacity="0.5" />
  </svg>
);

/* ─────────── Navbar ─────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#solucoes", label: "Soluções" },
    { href: "#modulos", label: "Módulos" },
    { href: "#diferenciais", label: "Diferenciais" },
    { href: "#comparativo", label: "Comparativo" },
  ];

  return (
    <nav className={`pasbem-navbar fixed top-0 left-0 right-0 z-50 bg-transparent ${scrolled ? "scrolled" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <img className="h-20" src="/logo.png" alt="logo" />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-white/80 hover:text-white text-sm font-medium transition">
              {l.label}
            </a>
          ))}
          <a href="#contato" className="bg-[#3DBD9B] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#2A9A7C] transition shadow-lg" style={{ boxShadow: "0 4px 20px rgba(61,189,155,0.3)" }}>
            Fale Conosco
          </a>
        </div>

        {/* Hamburger */}
        <button className="md:hidden text-white" onClick={() => setMenuOpen((v) => !v)}>
          {menuOpen ? (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu md:hidden bg-[#1A3557]/98 px-6 pb-4 ${menuOpen ? "open" : ""}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block py-3 text-white/80 hover:text-white text-sm font-medium border-b border-white/10">
            {l.label}
          </a>
        ))}
        <a href="#contato" onClick={() => setMenuOpen(false)} className="block mt-4 text-center bg-[#3DBD9B] text-white px-5 py-3 rounded-full text-sm font-semibold">
          Fale Conosco
        </a>
      </div>
    </nav>
  );
}

/* ─────────── Hero ─────────── */
function Hero() {
  return (
    <section className="hero-bg noise relative min-h-screen flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <div className="pill mb-6" style={{ background: "rgba(61,189,155,0.2)", color: "#3DBD9B", border: "1px solid rgba(61,189,155,0.3)" }}>
              <span className="w-2 h-2 rounded-full pulse-dot" style={{ background: "#3DBD9B" }} />
              Programa Assistencial
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Saúde acessível,<br />
              <span className="gradient-text">bem-estar real,</span><br />
              para todos que<br />você ama.
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl">
              Unimos tecnologia humanizada, acolhimento constante e benefícios reais em um só lugar. Um ecossistema feito para sustentar o seu florescer.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contato" className="bg-[#3DBD9B] text-white px-8 py-4 rounded-full font-bold text-base hover:bg-[#2A9A7C] transition" style={{ boxShadow: "0 8px 30px rgba(61,189,155,0.4)" }}>
                Começar agora
              </a>
              <a href="#solucoes" className="border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-white/10 transition">
                Conhecer soluções
              </a>
            </div>
            {/* Stats */}
            <div className="mt-14 grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-extrabold text-white">24<span style={{ color: "#3DBD9B" }}>/7</span></div>
                <div className="text-white/60 text-sm mt-1">Atendimento médico</div>
              </div>
              <div className="border-l border-white/20 pl-6">
                <div className="text-3xl font-extrabold text-white">+12</div>
                <div className="text-white/60 text-sm mt-1">Especialidades</div>
              </div>
              <div className="border-l border-white/20 pl-6">
                <div className="text-3xl font-extrabold text-white">360<span style={{ color: "#3DBD9B" }}>°</span></div>
                <div className="text-white/60 text-sm mt-1">Cuidado integral</div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex justify-end">
            <div className="relative w-full max-w-xl">
              <div className="rounded-3xl p-8 shadow-2xl" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(61,189,155,0.3)" }}>
                    <svg className="w-5 h-5" style={{ color: "#3DBD9B" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-white font-semibold">Seu Ecossistema de Saúde</span>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "Bem + Cuidado", sub: "Telemedicina 24h", color: "#3DBD9B", badgeStyle: { background: "rgba(61,189,155,0.2)", color: "#3DBD9B" }, icon: "/bem-cuidado.png" },
                    { name: "Bem + Papo", sub: "Saúde mental", color: "#3DBD9B", badgeStyle: { background: "rgba(61,189,155,0.2)", color: "#3DBD9B" }, icon: "/bem-papo.png" },
                    { name: "Multibem", sub: "Bem Card – crédito saúde", color: "#3DBD9B", badgeStyle: { background: "rgba(61,189,155,0.2)", color: "#3DBD9B" }, icon: "/bem-muilt.png" },
                    { name: "Bem Vital", sub: "Scores IPV, IGS, IGN, IES", color: "#3DBD9B", badgeStyle: { background: "rgba(61,189,155,0.2)", color: "#3DBD9B" }, icon: "/bem-vital.png" },
                  ].map((m) => (
                    <div key={m.name} className="rounded-2xl p-4 flex items-center gap-4" style={{ background: "rgba(255,255,255,0.1)" }}>
                      <div className="w-35 h-35 rounded-lg flex items-center justify-center shrink-0" style={{  }}>
                        <img className="object-contain" src={m.icon} alt="" />
                      </div>
                      <div>
                        <div className="text-white text-sm font-semibold">{m.name}</div>
                        <div className="text-white/50 text-xs">{m.sub}</div>
                      </div>
                      <div className="ml-auto pill text-xs px-2 py-1" style={m.badgeStyle}>Ativo</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 bg-[#3DBD9B] text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl">
                ✓ Sem carência · Sem burocracia
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave */}
      <div className="wave-divider absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
}

/* ─────────── Problemas ─────────── */
function Problemas() {
  const problems = [
    {
      bg: "#fff1f2", iconBg: "#fee2e2", iconColor: "#f87171",
      title: "O Silêncio Emocional",
      desc: "Muitas vezes, a mente pede ajuda, mas não encontra um espaço seguro e humano para ser ouvida. Agendas lotadas e estigma social bloqueiam o acesso ao cuidado.",
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    },
    {
      bg: "#fefce8", iconBg: "#fef9c3", iconColor: "#eab308",
      title: "A Burocracia que Afasta",
      desc: "Filas de espera, triagens robóticas e processos lentos afastam você do médico exatamente quando mais precisa de uma resposta imediata.",
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    },
    {
      bg: "#eff6ff", iconBg: "#dbeafe", iconColor: "#60a5fa",
      title: "A Falta de Suporte Integral",
      desc: "Cuidar apenas da doença não é suficiente. Falta um programa que olhe para você por inteiro — corpo, mente e hábitos — todos os dias.",
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    },
  ];

  return (
    <section id="solucoes" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <div className="pill mb-4 mx-auto w-fit" style={{ background: "#fef2f2", color: "#ef4444", border: "1px solid #fee2e2" }}>Os desafios do cuidado hoje</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: "#1A3557" }}>
            Os desafios que silenciam<br />o seu bem-estar todos os dias
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">O sistema de saúde tradicional deixa lacunas que impactam diretamente você e sua família.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((p, i) => (
            <div key={p.title} className="reveal card-hover rounded-3xl p-8 border border-gray-100" style={{ background: p.bg, transitionDelay: `${i * 0.15}s` }}>
              <div className="text-center h-14 rounded-2xl flex items-center justify-center mb-6">
                <span className="h-14 rounded-2xl flex items-center justify-center mb-6 p-4" style={{ background: p.iconBg, color: p.iconColor }}>
                  {p.icon}
                </span>
              </div>
              <h3 className="text-xl text-center font-bold mb-3" style={{ color: "#1A3557" }}>{p.title}</h3>
              <p className="text-gray-500 text-center leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Module 1: Bem + Cuidado ─────────── */
function ModuloBemCuidado() {
  const checks = [
    { bold: "Atendimento 24/7", rest: " – 365 dias do ano, urgências e consultas eletivas" },
    { bold: "Acesso direto ao médico", rest: " – sem triagem robótica ou burocracia" },
    { bold: "+12 especialidades", rest: " – sem surpresas, sem carência, sem custo adicional" },
    { bold: "Receitas, atestados e encaminhamentos", rest: " digitais em minutos" },
    { bold: "Multiplataforma", rest: " – app, site ou link de acesso rápido" },
  ];
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 reveal">
      <div className="order-2 lg:order-1">
        <div className="pill mb-5 w-fit" style={{ background: "rgba(61,189,155,0.2)", color: "#0D7B6B", border: "1px solid rgba(61,189,155,0.3)" }}>Módulo 01</div>
        <h3 className="text-3xl font-extrabold mb-4" style={{ color: "#1A3557" }}>Bem + Cuidado</h3>
        <p className="text-gray-600 leading-relaxed mb-8">Suporte médico 24 horas por dia, 365 dias do ano. Conecte-se diretamente com um médico generalista — sem triagem, sem espera.</p>
        <div className="space-y-4">
          {checks.map((c) => (
            <div key={c.bold} className="check-item">
              <div className="check-icon"><CheckSVG /></div>
              <p className="text-gray-700"><strong>{c.bold}</strong>{c.rest}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="order-1 lg:order-2 flex justify-center">
        <div className="relative">
          <div className="w-72 h-72 rounded-3xl flex items-center justify-center shadow-2xl" style={{ background: "linear-gradient(135deg, #3DBD9B, #0D7B6B)", boxShadow: "0 20px 60px rgba(61,189,155,0.3)" }}>
            <div className="text-center">
              <img className="object-contain" src="/bem-cuidado.png" alt="" />

              {/* <div className="text-white text-6xl font-black">24h</div>
              <div className="text-white/80 text-sm font-medium mt-2">Todo dia, o ano todo</div>
              <div className="mt-4 rounded-xl px-4 py-2 text-white text-xs font-semibold" style={{ background: "rgba(255,255,255,0.2)" }}>Médico online agora</div> */}
            </div>
          </div>
          <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg px-4 py-3 text-xs font-bold" style={{ color: "#1A3557" }}>✓ Sem triagem</div>
          <div className="absolute -bottom-4 -left-4 rounded-2xl shadow-lg px-4 py-3 text-white text-xs font-bold" style={{ background: "#1A3557" }}>+12 especialidades</div>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Module 2: Bem + Papo ─────────── */
function ModuloBemPapo() {
  const checks = [
    { bold: "Até 4 sessões por mês", rest: " com psicólogo via vídeo" },
    { bold: "Agendamento simplificado", rest: " – sem filas, sem estigmas" },
    { bold: "Apoio em crises", rest: " – acolhimento imediato em situações críticas" },
    { bold: "Total discrição", rest: " – de onde estiver, sem custo adicional" },
  ];
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 reveal">
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-72 h-72 rounded-3xl flex items-center justify-center shadow-2xl" style={{ background: "linear-gradient(135deg, #3b82f6, #4f46e5)", boxShadow: "0 20px 60px rgba(79,70,229,0.3)" }}>
            <div className="text-center">
              <img className="object-contain" src="/bem-papo.png" alt="" />

              {/* <svg className="w-20 h-20 text-white mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <div className="text-white font-bold text-lg">Bem + Papo</div>
              <div className="text-white/70 text-xs mt-1">Saúde mental como prioridade</div> */}
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg px-4 py-3 text-xs font-bold" style={{ color: "#3b82f6" }}>4 sessões/mês</div>
        </div>
      </div>
      <div>
        <div className="pill mb-5 w-fit" style={{ background: "#dbeafe", color: "#3b82f6", border: "1px solid #bfdbfe" }}>Módulo 02</div>
        <h3 className="text-3xl font-extrabold mb-4" style={{ color: "#1A3557" }}>Bem + Papo</h3>
        <p className="text-gray-600 leading-relaxed mb-8">Acolhimento psicológico via teleatendimento, unindo tecnologia, discrição e empatia. Sua saúde mental como prioridade real.</p>
        <div className="space-y-4">
          {checks.map((c) => (
            <div key={c.bold} className="check-item">
              <div className="check-icon" style={{ background: "#4f83cc" }}><CheckSVG /></div>
              <p className="text-gray-700"><strong>{c.bold}</strong>{c.rest}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────── Module 3: Multibem ─────────── */
function ModuloMultibem() {
  const cards = [
    { emoji: "🏥", title: "Consultas presenciais", sub: "Qualquer médico ou clínica" },
    { emoji: "🔬", title: "Exames laboratoriais", sub: "Inclusive em domicílio" },
    { emoji: "💊", title: "Medicamentos", sub: "Em qualquer farmácia" },
    { emoji: "🏋️", title: "Atividade física", sub: "Academia, pilates, crossfit…" },
  ];
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 reveal">
      <div className="order-2 lg:order-1">
        <div className="pill mb-5 w-fit" style={{ background: "#f3e8ff", color: "#9333ea", border: "1px solid #e9d5ff" }}>Módulo 03</div>
        <h3 className="text-3xl font-extrabold mb-4" style={{ color: "#1A3557" }}>Multibem</h3>
        <p className="text-gray-600 leading-relaxed mb-8">Um universo de possibilidades na sua mão. Acesso a uma rede completa de saúde e bem-estar através do crédito mensal no seu Bem Card (VISA).</p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {cards.map((c) => (
            <div key={c.title} className="bg-white rounded-2xl p-4 border border-gray-100">
              <div className="text-4xl mb-2 text-center">{c.emoji}</div>
              <div className="font-bold text-sm text-center" style={{ color: "#1A3557" }}>{c.title}</div>
              <div className="text-gray-500 text-xs mt-1 text-center">{c.sub}</div>
            </div>
          ))}
        </div>
        <div className="text-white rounded-2xl p-4 text-sm font-medium" style={{ background: "#1A3557" }}>
          ✦ Diagnóstico por imagem: Ressonância, Tomografia, Ultrassom e Raio-X em centros de sua escolha
        </div>
      </div>
      <div className="order-1 lg:order-2 flex justify-center">
        <div className="relative">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-100 border border-gray-100" style={{ background: "linear-gradient(135deg, #1A3557, #0D7B6B)" }}>
            <img className="object-contain h-90 w-90" src="/bem-card.png" alt="" />

            {/* Bem Card visual */}
            {/* 
            <div className="rounded-2xl p-6 text-white shadow-xl mb-6" >
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full" style={{ background: "rgba(255,255,255,0.3)" }} />
                  <span className="text-xs font-bold opacity-80">Pasbem</span>
                </div>
                <div className="text-xs opacity-60">VISA</div>
              </div>
              <div className="text-xs opacity-60 mb-1">Bem Card</div>
              <div className="text-lg font-bold tracking-widest">•••• •••• •••• 4782</div>
              <div className="mt-4 flex justify-between">
                <div><div className="text-xs opacity-60">Crédito mensal</div><div className="font-bold">R$ 250,00</div></div>
                <div><div className="text-xs opacity-60">Validade</div><div className="font-bold">12/27</div></div>
              </div>
            </div> 
              */}
            <div className="text-center text-white font-semibold text-sm">Concierge Pasbem</div>
            <div className="text-center text-white text-xs mt-1">Agendamento e suporte personalizado</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Module 4: Bem Vital ─────────── */
function ModuloBemVital() {
  const scoreItems = [
    { label: "🌙 IGS – Índice de Gestão do Sono", sub: "Eficiência, latência, ciclo circadiano e higiene do sono" },
    { label: "🥗 IGN – Índice de Gestão Nutricional", sub: "Hidratação, janelas alimentares e consciência nutricional" },
    { label: "🧠 IES – Índice de Equilíbrio Socioemocional", sub: "Estresse, ansiedade, foco e vitalidade psicológica" },
  ];
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center reveal">
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-72 h-72 rounded-3xl flex items-center justify-center shadow-2xl" style={{ background: "linear-gradient(135deg, #fb923c, #f43f5e)", boxShadow: "0 20px 60px rgba(251,146,60,0.3)" }}>
            <div className="text-center">
              <div className="text-white text-sm font-semibold opacity-80 mb-2">Índice de Performance Vital</div>
              <div className="w-32 h-32 rounded-full flex items-center justify-center mx-auto" style={{ background: "rgba(255,255,255,0.2)", border: "4px solid rgba(255,255,255,0.4)" }}>
                <div><div className="text-white text-4xl font-black">88%</div><div className="text-white/70 text-xs">IPV</div></div>
              </div>
              <div className="flex gap-4 mt-4 text-white text-xs">
                <div className="text-center"><div className="font-bold">91%</div><div className="opacity-70">IGS Sono</div></div>
                <div className="text-center"><div className="font-bold">85%</div><div className="opacity-70">IGN Nutrição</div></div>
                <div className="text-center"><div className="font-bold">89%</div><div className="opacity-70">IES Emocional</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="pill mb-5 w-fit" style={{ background: "#ffedd5", color: "#ea580c", border: "1px solid #fed7aa" }}>Módulo 04</div>
        <h3 className="text-3xl font-extrabold mb-4" style={{ color: "#1A3557" }}>Bem Vital</h3>
        <p className="text-gray-600 leading-relaxed mb-8">A ciência do equilíbrio e da longevidade. Gestão de saúde baseada em dados e no seu ritmo biológico — prevenção real antes que a doença apareça.</p>
        <div className="space-y-4">
          {scoreItems.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-4 border border-gray-100">
              <div className="font-bold text-sm mb-1" style={{ color: "#1A3557" }}>{s.label}</div>
              <div className="text-gray-500 text-xs">{s.sub}</div>
            </div>
          ))}
          <div className="rounded-2xl p-4 text-white" style={{ background: "linear-gradient(90deg, #fb923c, #f43f5e)" }}>
            <div className="font-bold text-sm mb-1">✦ IPV – Índice de Performance Vital</div>
            <div className="text-white/80 text-xs">A síntese da sua saúde em uma única métrica em tempo real</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Módulos section ─────────── */
function Modulos() {
  return (
    <section id="modulos" className="py-24" style={{ background: "#E8F8F4" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <div className="pill mb-4 mx-auto w-fit" style={{ background: "rgba(61,189,155,0.2)", color: "#0D7B6B", border: "1px solid rgba(61,189,155,0.3)" }}>Nosso Ecossistema</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: "#1A3557" }}>O Ciclo do Cuidado Integral</h2>
          <p className="text-gray-600 max-w-xl mx-auto">Quatro módulos integrados que cuidam de você em todas as dimensões da saúde.</p>
        </div>
        <ModuloBemCuidado />
        <ModuloBemPapo />
        <ModuloMultibem />
        <ModuloBemVital />
      </div>
    </section>
  );
}

/* ─────────── Diferenciais ─────────── */
function Diferenciais() {
  const items = [
    { bg: "#E8F8F4", iconBg: "#3DBD9B", title: "Acesso Imediato", desc: "Médico em minutos, 24h por dia. Sem filas, sem triagem robótica, sem espera desnecessária.", icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { bg: "#E8F8F4", iconBg: "#3DBD9B", title: "Liberdade Total", desc: "Sem redes credenciadas restritivas. Use o Bem Card em qualquer médico, clínica, laboratório ou farmácia.", icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg> },
    { bg: "#E8F8F4", iconBg: "#3DBD9B", title: "Cuidado Preditivo", desc: "Gestão ativa da saúde com scores personalizados que antecipam problemas antes que o corpo adoeça.", icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
    { bg: "#E8F8F4", iconBg: "#3DBD9B", title: "Bem-Estar Integral", desc: "Crédito para consultas, exames, medicamentos, academias, pilates, crossfit e muito mais — em um só lugar.", icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg> },
    { bg: "#E8F8F4", iconBg: "#3DBD9B", title: "Concierge Pessoal", desc: "Uma assistente dedicada cuida de todo o agendamento — sua única tarefa é cuidar da sua saúde.", icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
    { bg: "#E8F8F4", iconBg: "#3DBD9B", title: "Sem Carência", desc: "Acesse todos os benefícios imediatamente. Sem períodos de carência, sem surpresas no bolso.", icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
  ];

  return (
    <section id="diferenciais" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <div className="pill mb-4 mx-auto w-fit" style={{ background: "rgba(61,189,155,0.2)", color: "#0D7B6B", border: "1px solid rgba(61,189,155,0.3)" }}>Por que Pasbem?</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: "#1A3557" }}>
            Cuidado que vai além<br />do convencional
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={item.title} className="reveal card-hover rounded-3xl p-8" style={{ background: item.bg, transitionDelay: `${i * 0.1}s` }}>
              <div className="w-full h-12 flex items-center justify-center mb-5">
                <span className="text-center p-4 rounded-2xl" style={{ background: item.iconBg }}>
                  {item.icon}
                </span>
              </div>
              <h4 className="text-lg text-center font-bold mb-2" style={{ color: "#1A3557" }}>{item.title}</h4>
              <p className="text-gray-600 text-center text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Comparativo ─────────── */
function Comparativo() {
  const rows = [
    { label: "Rede de Atendimento", bad: "Rede credenciada fixa e limitada", good: "Qualquer médico ou clínica com Bem Card" },
    { label: "Tempo de Espera", bad: "Filas para consultas e exames", good: "Atendimento 24h, agendamento imediato" },
    { label: "Foco do Cuidado", bad: "Reativo – trata a doença instalada", good: "Preditivo – scores IGS, IGN, IES e IPV" },
    { label: "Saúde Mental", bad: "Raramente coberta ou de difícil acesso", good: "4 sessões/mês com psicólogo incluso" },
    { label: "Bem-Estar Integral", bad: "Não cobre farmácia, academia ou terapia", good: "Ecossistema 360°: consultas, exames, meds, academias, pilates, gym…" },
    { label: "Carência", bad: "Período de carência obrigatório", good: "Acesso imediato – zero carência" },
  ];
  return (
    <section id="comparativo" className="py-24" style={{ background: "#1A3557" }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <div className="pill mb-4 mx-auto w-fit" style={{ background: "rgba(61,189,155,0.2)", color: "#3DBD9B", border: "1px solid rgba(61,189,155,0.3)" }}>Comparativo</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Por que Pasbem é a escolha inteligente?</h2>
          <p className="max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>Veja como nos diferenciamos do mercado tradicional em cada aspecto do cuidado.</p>
        </div>
        <div className="rounded-3xl overflow-hidden reveal" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
          {/* Header */}

          <div className="grid grid-cols-3" style={{ background: "rgba(255,255,255,0.1)" }}>
            <div className="col-span-1 p-5 text-sm font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>Critério</div>
            <div className="col-span-1 p-5">
              <span className="inline-block text-xs font-bold px-3 py-1 rounded-full" style={{ background: "rgba(239,68,68,0.2)", color: "#f87171" }}>Mercado Tradicional</span>
            </div>
            <div className="col-span-1 p-5">
              <span className="inline-block bg-[#3DBD9B] text-white text-xs font-bold px-3 py-1 rounded-full">Pasbem</span>
            </div>
          </div>

          {rows.map((r, i) => (
            <div key={r.label} className="grid grid-cols-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="col-span-1 p-5"><span className="text-white font-semibold text-sm">{r.label}</span></div>
              <div className="col-span-1 p-5"><span className="text-sm" style={{ color: "#f87171" }}>{r.bad}</span></div>
              <div className="col-span-1 p-5"><span className="font-semibold text-sm" style={{ color: "#3DBD9B" }}>{r.good}</span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── CTA ─────────── */
function CTA() {
  return (
    <section className="py-24" style={{ background: "#E8F8F4" }}>
      <div className="max-w-4xl mx-auto px-6 text-center reveal">
        <h2 className="text-3xl sm:text-5xl font-extrabold mb-6 leading-tight" style={{ color: "#1A3557" }}>
          Escolha a liberdade.<br />
          Escolha a inteligência.<br />
          <span className="gradient-text">Escolha viver a sua melhor versão.</span>
        </h2>
        <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
          Junte-se ao ecossistema Pasbem e descubra o que é cuidar de saúde de forma completa, humana e sem burocracia.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#contato" className="text-white px-10 py-4 rounded-full font-bold text-lg transition" style={{ background: "#3DBD9B", boxShadow: "0 8px 30px rgba(61,189,155,0.4)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#2A9A7C")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#3DBD9B")}>
            Quero conhecer o Pasbem
          </a>
          <a href="https://wa.me/5583999502701" target="_blank" rel="noreferrer"
            className="px-10 py-4 rounded-full font-bold text-lg transition"
            style={{ border: "2px solid #1A3557", color: "#1A3557" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#1A3557"; e.currentTarget.style.color = "white"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#1A3557"; }}>
            Falar pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Contato ─────────── */
function Contato() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      (e.target as HTMLFormElement).reset();
    }, 3000);
  };

  const contactLinks = [
    {
      href: "https://wa.me/5583999502701",
      bg: "#f0fdf4", border: "#bbf7d0", iconBg: "#22c55e",
      title: "WhatsApp", sub: " 83 99950-2701",
      icon: <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>,
    },
    {
      href: "https://pasbem.com.br",
      bg: "#eff6ff", border: "#bfdbfe", iconBg: "#3b82f6",
      title: "Site", sub: "pasbem.com.br",
      icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
    },
    {
      href: "https://instagram.com/soupasbem",
      bg: "#fdf2f8", border: "#f9a8d4", iconBg: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
      title: "Instagram", sub: "@soupasbem",
      icon: <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>,
    },
  ];

  return (
    <section id="contato" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <div className="pill mb-5 w-fit" style={{ background: "rgba(61,189,155,0.2)", color: "#0D7B6B", border: "1px solid rgba(61,189,155,0.3)" }}>Contato</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: "#1A3557" }}>
              Vamos conversar sobre<br />o futuro da sua saúde?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-10">Nossa equipe está pronta para apresentar todos os detalhes do Pasbem e encontrar o plano ideal para você e sua família.</p>
            <div className="space-y-5">
              {contactLinks.map((c) => (
                <a key={c.title} href={c.href} target="_blank" rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl card-hover transition"
                  style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: c.iconBg }}>
                    {c.icon}
                  </div>
                  <div>
                    <div className="font-bold" style={{ color: "#1A3557" }}>{c.title}</div>
                    <div className="text-gray-600 text-sm">{c.sub}</div>
                  </div>
                  <ArrowRight />
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="reveal" style={{ transitionDelay: "0.2s" }}>
            {/* <div className="rounded-3xl p-8" style={{ background: "#E8F8F4" }}>
              <h3 className="text-xl font-bold mb-6" style={{ color: "#1A3557" }}>Quero saber mais sobre o Pasbem</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { label: "Nome completo", type: "text", placeholder: "Seu nome" },
                  { label: "WhatsApp", type: "tel", placeholder: "(83) 9 9999-9999" },
                  { label: "E-mail", type: "email", placeholder: "seu@email.com" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block text-sm font-semibold mb-2" style={{ color: "#1A3557" }}>{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} required={f.type !== "email"}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm transition outline-none focus:border-[#3DBD9B]"
                      style={{ fontFamily: "Montserrat, sans-serif" }} />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: "#1A3557" }}>Tenho interesse em</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-600 outline-none focus:border-[#3DBD9B]" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    <option>Uso pessoal / familiar</option>
                    <option>Benefício para empresa</option>
                    <option>Parceria comercial</option>
                  </select>
                </div>
                <button type="submit"
                  className="w-full text-white py-4 rounded-xl font-bold text-base transition mt-2"
                  style={{ background: submitted ? "#0D7B6B" : "#3DBD9B", boxShadow: "0 4px 20px rgba(61,189,155,0.3)" }}>
                  {submitted ? "✓ Mensagem enviada!" : "Enviar mensagem →"}
                </button>
              </form>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Footer ─────────── */
function Footer() {
  return (
    <footer className="py-12" style={{ background: "#1A3557" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            {/* <PasbemLogo size={32} /> */}
            {/* <span className="text-white font-bold text-lg">Pasbem</span> */}
            <img className="h-10" src="/logo.png" alt="logo" />
            <span className="text-sm ml-2" style={{ color: "rgba(255,255,255,0.4)" }}>Programa Assistencial de Saúde e Bem Estar</span>
          </div>
          <div className="flex gap-6 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            {["Privacidade", "Termos"].map((t) => (
              <a key={t} href="#" className="hover:text-white transition">{t}</a>
            ))}
            <a href="#contato" className="hover:text-white transition">Contato</a>
          </div>
        </div>
        <div className="mt-8 pt-8 text-center text-xs" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.3)" }}>
          © 2025 Pasbem – Programa Assistencial de Saúde e Bem Estar. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

/* ─────────── WhatsApp FAB ─────────── */
function WhatsAppFAB() {
  return (
    <a href="https://wa.me/5583999502701" target="_blank" rel="noreferrer"
      className="wa-btn fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl z-50"
      style={{ background: "#22c55e", boxShadow: "0 8px 30px rgba(34,197,94,0.4)" }}
      title="Falar no WhatsApp">
      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

/* ─────────── Reveal hook ─────────── */
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ═══════════════════════════════════════════════
   ROOT EXPORT
═══════════════════════════════════════════════ */
export default function PasbemLanding() {
  useReveal();

  return (
    <>
      {/* Inject global styles once */}
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      <div className="pasbem">
        <Navbar />
        <Hero />
        <Problemas />
        <Modulos />
        <Diferenciais />
        <Comparativo />
        <CTA />
        <Contato />
        <Footer />
        <WhatsAppFAB />
      </div>
    </>
  );
}