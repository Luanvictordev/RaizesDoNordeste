import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-black text-white border-b-3 border-black py-3 md:py-4 sticky top-[64px] min-[580px]:top-[80px] md:top-[96px] z-30 select-none">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs md:text-sm font-oswald uppercase tracking-wider font-bold overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-6 md:gap-10 mx-auto">
          <a href="#hero" className="hover:text-brand-yellow transition-colors whitespace-nowrap">Início</a>
          <a href="#cardapio" className="hover:text-brand-yellow transition-colors whitespace-nowrap">O Cardápio</a>
          <a href="#destaque" className="hover:text-brand-yellow transition-colors whitespace-nowrap">O Queridinho</a>
          <a href="#sobrenos" className="hover:text-brand-yellow transition-colors whitespace-nowrap">Nossa História</a>
          <a href="#encontre" className="hover:text-brand-yellow transition-colors whitespace-nowrap">Franquias</a>
          <a href="#contato" className="hover:text-brand-yellow transition-colors whitespace-nowrap">Contato</a>
        </div>
      </div>
    </nav>
  );
}
