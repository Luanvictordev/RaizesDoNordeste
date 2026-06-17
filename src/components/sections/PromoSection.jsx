import React from 'react';
import { Check, ShoppingBag } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function PromoSection() {
  const { addToCartDirectly } = useApp();

  const handleAddCombo = () => {
    const comboItem = {
      id: 'combo-arretado',
      name: 'Combo Arretado Supreme',
      price: 38.00,
      description: 'Cuscuz Completo Arretado + Pastel de Queijo Coalho + Cajuína São Geraldo 600ml',
      toppings: ['Cuscuz Completo', 'Pastel Coalho', 'Cajuína 600ml']
    };
    addToCartDirectly(comboItem);
  };

  return (
    <section id="destaque" className="py-16 bg-brand-bg relative">
      {/* Authentic top paper torn border filled with #f6f6f6, overlapping the white hero section */}
      <div className="absolute top-0 left-0 right-0 h-3 paper-border-top -translate-y-2 z-20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-archivo text-3xl md:text-5xl text-black uppercase tracking-tight mb-2">
            O QUERIDINHO DO SERTÃO
          </h2>
          <div className="h-1.5 w-32 bg-brand-red mx-auto brutalist-border"></div>
          <p className="font-oswald text-gray-600 uppercase font-bold tracking-wider mt-4">
            Nossa melhor combinação para matar a fome com estilo
          </p>
        </div>

        <div className="brutalist-border bg-white p-6 md:p-8 brutalist-shadow max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Promo Image Left (5 cols) */}
          <div className="md:col-span-5 relative">
            <div className="brutalist-border bg-brand-yellow p-2">
              <img
                src="/cuscuz_combo_supreme.png"
                alt="Combo Raízes do Nordeste"
                className="w-full h-auto aspect-square object-cover brutalist-border bg-white"
              />
            </div>
            <div className="absolute -top-4 -left-4 bg-brand-red text-white brutalist-border font-archivo text-xs uppercase px-3 py-1.5 rotate-[-5deg] brutalist-shadow">
              🔥 CAMPEÃO DE VENDAS
            </div>
          </div>

          {/* Promo Info Right (7 cols) */}
          <div className="md:col-span-7 flex flex-col justify-between h-full">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <h3 className="font-archivo text-2xl md:text-3xl text-black uppercase leading-none">
                  COMBO ARRETADO SUPREME
                </h3>
                <div className="bg-brand-red text-white brutalist-border px-4 py-2 font-oswald font-black text-xl whitespace-nowrap w-fit shrink-0 brutalist-shadow leading-none flex items-center justify-center">
                  R$&nbsp;38,00
                </div>
              </div>

              <p className="text-gray-700 font-medium mb-6">
                O banquete individual mais respeitado da casa. Leve o nosso famoso <strong className="text-black">Cuscuz Completo Arretado</strong>, acompanhado de um <strong className="text-black">Pastel de Queijo Coalho Crocante</strong> e uma garrafa estupidamente gelada de <strong className="text-black">Cajuína São Geraldo (600ml)</strong>.
              </p>

              <div className="bg-brand-bg brutalist-border p-4 mb-6">
                <span className="font-oswald font-bold text-xs uppercase text-gray-500 block mb-2">Ingredientes inclusos no Combo:</span>
                <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
                  <div className="flex items-center gap-1.5 text-black">
                    <Check size={16} className="text-brand-red" /> Cuscuz cozido no vapor
                  </div>
                  <div className="flex items-center gap-1.5 text-black">
                    <Check size={16} className="text-brand-red" /> Carne de Sol na Manteiga
                  </div>
                  <div className="flex items-center gap-1.5 text-black">
                    <Check size={16} className="text-brand-red" /> Queijo Coalho Grelhado
                  </div>
                  <div className="flex items-center gap-1.5 text-black">
                    <Check size={16} className="text-brand-red" /> Pastel de Coalho e Doce de Rapadura
                  </div>
                  <div className="flex items-center gap-1.5 text-black">
                    <Check size={16} className="text-brand-red" /> Cajuína Refrescante 600ml
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleAddCombo}
              className="w-full bg-brand-red text-white brutalist-border py-4 font-oswald font-black uppercase text-lg tracking-wider hover:bg-black transition-colors brutalist-shadow cursor-pointer flex items-center justify-center gap-2"
            >
              <ShoppingBag size={20} />
              Adicionar Combo ao Pedido
            </button>
          </div>
        </div>
      </div>
      
      {/* Authentic bottom paper torn border filled with #f6f6f6, overlapping the white cardapio section */}
      <div className="absolute bottom-0 left-0 right-0 h-3 paper-border-bottom translate-y-2 z-20 pointer-events-none"></div>
    </section>
  );
}
