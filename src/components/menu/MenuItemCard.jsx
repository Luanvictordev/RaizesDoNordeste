import React from 'react';
import { Plus, ShoppingBag } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function MenuItemCard({ item }) {
  const { addToCartDirectly, openCustomizeModal } = useApp();

  return (
    <div className="brutalist-border bg-brand-bg p-4 flex flex-col justify-between brutalist-shadow transition-transform duration-200 hover:-translate-y-1">
      <div>
        {/* Photo Container */}
        <div className="relative brutalist-border bg-white aspect-video overflow-hidden mb-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
          {item.customizable && (
            <div className="absolute top-2 right-2 bg-brand-yellow text-black brutalist-border font-oswald text-[10px] font-black uppercase px-2 py-0.5">
              Personalizável
            </div>
          )}
        </div>

        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-archivo text-lg md:text-xl text-black uppercase leading-tight">
            {item.name}
          </h3>
          <div className="bg-white brutalist-border px-2 py-0.5 font-oswald font-black text-md shrink-0 whitespace-nowrap">
            R$&nbsp;{item.price.toFixed(2)}
          </div>
        </div>

        <p className="text-sm text-gray-600 font-semibold leading-relaxed mb-6">
          {item.description}
        </p>
      </div>

      {item.customizable ? (
        <button
          onClick={() => openCustomizeModal(item)}
          className="w-full bg-brand-yellow text-black brutalist-border py-2.5 font-oswald font-black uppercase tracking-wider text-xs md:text-sm hover:bg-black hover:text-white transition-colors duration-150 brutalist-shadow cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Plus size={16} /> Personalizar & Pedir
        </button>
      ) : (
        <button
          onClick={() => addToCartDirectly(item)}
          className="w-full bg-brand-red text-white brutalist-border py-2.5 font-oswald font-black uppercase tracking-wider text-xs md:text-sm hover:bg-black transition-colors duration-150 brutalist-shadow cursor-pointer flex items-center justify-center gap-1.5"
        >
          <ShoppingBag size={16} /> Adicionar ao Carrinho
        </button>
      )}
    </div>
  );
}
