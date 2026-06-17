import React from 'react';
import MenuCategorySelector from '../menu/MenuCategorySelector';
import MenuGrid from '../menu/MenuGrid';
import { useApp } from '../../context/AppContext';
import { MapPin } from 'lucide-react';

export default function MenuSection() {
  const { selectedFranchise } = useApp();

  return (
    <section id="cardapio" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-12">
          <h2 className="font-archivo text-3xl md:text-5xl text-black uppercase tracking-tight mb-2">
            NOSSO CARDÁPIO
          </h2>
          <div className="h-1.5 w-32 bg-brand-red mx-auto brutalist-border"></div>
          
          {selectedFranchise ? (
            <div className="mt-4 bg-brand-bg brutalist-border px-4 py-2 font-oswald font-black uppercase text-xs sm:text-sm tracking-wider w-fit mx-auto brutalist-shadow select-none flex items-center justify-center gap-1.5">
              <MapPin size={14} className="text-brand-red shrink-0" />
              <span>CARDÁPIO OFICIAL DA UNIDADE: <span className="text-brand-red">{selectedFranchise.city}</span></span>
            </div>
          ) : (
            <p className="font-oswald text-gray-600 uppercase font-bold tracking-wider mt-4">
              Cada item é feito na hora e totalmente personalizável
            </p>
          )}
        </div>

        <MenuCategorySelector />
        <MenuGrid />

      </div>
    </section>
  );
}
