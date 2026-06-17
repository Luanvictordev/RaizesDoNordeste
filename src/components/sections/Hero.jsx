import React from 'react';

export default function Hero() {
  return (
    <section id="hero" className="relative py-12 md:py-24 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Stunning Custom Cuscuz Art (Generated) */}
        <div className="relative mx-auto lg:mx-0 max-w-md lg:max-w-full">
          <div className="relative z-10 brutalist-border bg-brand-yellow p-3 brutalist-shadow transition-transform duration-300 hover:rotate-1">
            <img
              src="/cuscuzcomcarnedesolequeijocoalho.png"
              alt="Cuscuz Recheado Raízes do Nordeste"
              className="w-full h-auto aspect-square object-cover brutalist-border bg-white"
            />
            <div className="absolute top-6 -left-6 bg-brand-red text-white brutalist-border font-archivo text-xs uppercase px-4 py-2 tracking-widest brutalist-shadow -rotate-6">
              100% ARTESANAL!
            </div>
          </div>
          {/* Brutalist offset background card */}
          <div className="absolute inset-0 bg-black brutalist-border translate-x-3 translate-y-3 -z-10"></div>
        </div>

        {/* Right Side: Title, Description, CTA */}
        <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
          <div className="inline-flex items-center brutalist-border bg-brand-yellow px-3 py-1.5 text-xs font-oswald font-bold uppercase tracking-wider mb-6 brutalist-shadow">
            AUTÊNTICA CULINÁRIA NORDESTINA!
          </div>

          <h1 className="font-archivo text-4xl md:text-6xl text-black leading-none uppercase tracking-tighter mb-6">
            O SABOR ARRETADO DO <span className="text-brand-red">NORDESTE</span> NA SUA MESA.
          </h1>

          <p className="text-base md:text-lg text-gray-700 font-medium leading-relaxed max-w-xl mb-8">
            Inspirado no estilo limpo e descomplicado das lanchonetes clássicas de rua, trazemos o cuscuz de milho cozido no vapor, recheado com queijo de coalho e carne de sol desfiada regado na manteiga de garrafa pura, além de pastéis e sanduíches incríveis.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="#cardapio"
              className="bg-brand-red text-white brutalist-border px-8 py-4 font-oswald font-black uppercase text-lg tracking-wider hover:bg-black transition-colors brutalist-shadow-hover text-center cursor-pointer"
            >
              Começar meu pedido
            </a>
            <a
              href="#encontre"
              className="bg-white text-black brutalist-border px-8 py-4 font-oswald font-black uppercase text-lg tracking-wider hover:bg-brand-yellow transition-colors brutalist-shadow-hover text-center cursor-pointer"
            >
              Encontre Lojas
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
