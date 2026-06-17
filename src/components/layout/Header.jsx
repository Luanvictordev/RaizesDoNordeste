import React from 'react';
import { ShoppingBag, User, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Header() {
  const {
    cart,
    setIsCartOpen,
    user,
    setIsAuthModalOpen,
    selectedFranchise,
    setIsFidelityModalOpen
  } = useApp();
  
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white border-b-3 border-black sticky top-0 z-40 transition-all duration-300">
      {/* Mobile/App Compact Header View */}
      <div className="flex min-[580px]:hidden px-4 items-center justify-between h-16 w-full relative">
        {/* Compact Logo */}
        <a href="#" className="relative block group select-none">
          <div className="bg-brand-red text-white brutalist-border px-2.5 py-1.5 flex items-center justify-center brutalist-shadow transition-transform duration-200">
            <span className="font-archivo text-xs leading-none tracking-tight font-black uppercase text-white whitespace-nowrap">
              Raízes <span className="text-brand-yellow">do</span> Nordeste
            </span>
          </div>
        </a>

        {/* Compact Controls */}
        <div className="flex items-center gap-1.5">
          {selectedFranchise && (
            <div className="hidden min-[360px]:flex items-center gap-1 bg-brand-bg brutalist-border px-2 h-9 text-[9px] font-oswald font-black uppercase tracking-wide brutalist-shadow select-none shrink-0">
              <MapPin size={10} className="text-brand-red shrink-0" />
              <span>{selectedFranchise.city.split(' - ')[0]}</span>
            </div>
          )}

          {user ? (
            <button
              onClick={() => setIsFidelityModalOpen(true)}
              className="flex items-center gap-1 bg-white hover:bg-brand-yellow brutalist-border px-2 h-9 brutalist-shadow text-left font-oswald uppercase shrink-0 cursor-pointer select-none"
            >
              <User size={12} className="text-brand-red shrink-0" />
              <span className="text-[9px] font-black text-black bg-brand-yellow px-1 py-0.5 border border-black shrink-0">
                {user.points} PTS
              </span>
            </button>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-white text-black border-2 border-black px-2.5 h-9 flex items-center justify-center gap-1 font-oswald font-black uppercase text-xs hover:bg-brand-yellow transition-colors brutalist-shadow cursor-pointer shrink-0"
            >
              <User size={12} />
            </button>
          )}

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative brutalist-border bg-white h-9 w-9 hover:bg-brand-yellow transition-colors duration-150 brutalist-shadow flex items-center justify-center cursor-pointer shrink-0"
          >
            <ShoppingBag size={15} className="text-black" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand-red text-white text-[8px] font-archivo rounded-full w-4.5 h-4.5 border border-black flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Desktop/Standard Header View */}
      <div className="hidden min-[580px]:flex max-w-7xl mx-auto px-4 items-center justify-between h-20 md:h-24 relative">
        {/* Standard Logo */}
        <div className="absolute left-4 md:left-6 top-4.5 md:top-6 z-50">
          <a href="#" className="relative group block">
            <div className="absolute top-0 left-0 bg-brand-red text-white brutalist-border px-3 py-2 sm:px-4 sm:py-2.5 flex items-center justify-center brutalist-shadow transition-transform duration-200 group-hover:-translate-x-1 group-hover:-translate-y-1 z-10">
              <span className="font-archivo text-xs min-[380px]:text-sm sm:text-base md:text-xl lg:text-2xl leading-none tracking-tighter font-black uppercase text-white whitespace-nowrap">
                Raízes <span className="text-brand-yellow">do</span> Nordeste
              </span>
            </div>
            <div className="absolute top-0 left-0 bg-black brutalist-border translate-x-1 translate-y-1 sm:translate-x-1.5 sm:translate-y-1.5 -z-10">
              <span className="font-archivo text-xs min-[380px]:text-sm sm:text-base md:text-xl lg:text-2xl leading-none tracking-tighter font-black uppercase text-transparent whitespace-nowrap px-3 py-2 sm:px-4 sm:py-2.5 block select-none">
                Raízes do Nordeste
              </span>
            </div>
          </a>
        </div>

        {/* Responsive Spacer to push right content to the right */}
        <div className="w-24 min-[380px]:w-28 sm:w-36 md:w-44 shrink-0"></div>

        {/* Right Header Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Active Franchise Badge */}
          {selectedFranchise && (
            <div className="hidden min-[640px]:flex items-center gap-1.5 bg-brand-bg brutalist-border px-3 h-[42px] sm:h-[48px] text-[10px] sm:text-xs font-oswald font-black uppercase tracking-wide brutalist-shadow select-none shrink-0">
              <MapPin size={12} className="text-brand-red animate-pulse shrink-0" />
              <span>Loja: {selectedFranchise.city.split(' - ')[0]}</span>
            </div>
          )}

          {/* User Auth Info / Button */}
          {user ? (
            <button
              onClick={() => setIsFidelityModalOpen(true)}
              className="flex items-center gap-2 bg-white hover:bg-brand-yellow brutalist-border px-3.5 h-[42px] sm:h-[48px] brutalist-shadow text-left font-oswald uppercase shrink-0 select-none cursor-pointer"
              title="Ver Programa de Fidelidade & Pontos"
            >
              <User size={14} className="text-brand-red shrink-0" />
              <div className="leading-none flex flex-col justify-center">
                <span className="text-[8px] text-gray-500 block leading-none font-bold">MINHA CONTA</span>
                <span className="text-xs font-black block tracking-tight truncate max-w-[80px] sm:max-w-[120px] leading-tight mt-0.5">{user.name.split(' ')[0]}</span>
              </div>
              <span className="text-[8px] font-black text-black bg-brand-yellow px-1 py-0.5 border border-black ml-1.5 shrink-0 select-none">
                {user.points} PTS
              </span>
            </button>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-white text-black border-3 border-black px-3.5 h-[42px] sm:h-[48px] flex items-center justify-center gap-1.5 font-oswald font-black uppercase text-xs sm:text-sm tracking-wider hover:bg-brand-yellow transition-colors brutalist-shadow cursor-pointer shrink-0"
            >
              <User size={14} className="shrink-0" />
              <span className="hidden sm:inline">Entrar</span>
            </button>
          )}

          <a
            href="#cardapio"
            className="hidden min-[480px]:flex items-center justify-center bg-brand-red text-white border-3 border-black px-4 md:px-5 h-[42px] sm:h-[48px] font-oswald font-black uppercase tracking-wider text-xs sm:text-sm hover:bg-black transition-colors duration-150 brutalist-shadow shrink-0"
          >
            Cardápio
          </a>

          {/* Shopping Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative brutalist-border bg-white h-[42px] sm:h-[48px] w-[42px] sm:w-[48px] hover:bg-brand-yellow transition-colors duration-150 brutalist-shadow flex items-center justify-center cursor-pointer shrink-0"
          >
            <ShoppingBag size={20} className="text-black" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-red text-white text-xs font-archivo rounded-full w-6 h-6 border-2 border-black flex items-center justify-center animate-bounce">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
