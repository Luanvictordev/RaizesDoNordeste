import React from 'react';
import { useApp } from '../../context/AppContext';
import { Flame, Layers, Sandwich, CupSoda } from 'lucide-react';

export default function MenuCategorySelector() {
  const { activeCategory, setActiveCategory } = useApp();

  const categories = [
    { id: 'cuscuz', label: 'Cuscuz Recheados', icon: Flame },
    { id: 'pastel', label: 'Pastéis Crocantes', icon: Layers },
    { id: 'sanduiches', label: 'Sanduíches do Sertão', icon: Sandwich },
    { id: 'bebidas', label: 'Bebidas & Sucos', icon: CupSoda }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
      {categories.map((cat) => {
        const IconComponent = cat.icon;
        return (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`brutalist-border px-6 py-3 font-oswald font-black uppercase text-sm md:text-base tracking-wider cursor-pointer brutalist-shadow transition-all flex items-center justify-center gap-2 ${
              activeCategory === cat.id
                ? 'bg-brand-red text-white -translate-y-1'
                : 'bg-white text-black hover:bg-brand-yellow'
            }`}
          >
            <IconComponent size={18} className={activeCategory === cat.id ? 'text-brand-yellow animate-pulse' : 'text-brand-red'} />
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}
