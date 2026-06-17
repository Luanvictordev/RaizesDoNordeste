import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AVAILABLE_TOPPINGS } from '../../constants';

export default function IngredientsCustomizer() {
  const {
    isCustomizerOpen,
    setIsCustomizerOpen,
    itemToCustomize,
    selectedToppings,
    toggleTopping,
    addCustomizedToCart
  } = useApp();

  const totalToppingsCost = selectedToppings.reduce((sum, curr) => sum + curr.price, 0);
  const totalPrice = itemToCustomize ? (itemToCustomize.price + totalToppingsCost) : 0;

  return (
    <AnimatePresence>
      {isCustomizerOpen && itemToCustomize && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCustomizerOpen(false)}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Modal Body */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-brand-bg brutalist-border z-50 brutalist-shadow p-6 max-h-[85vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="font-oswald font-bold text-xs uppercase text-brand-red tracking-wider block">MONTAR DO SEU JEITO</span>
                <h3 className="font-archivo text-xl md:text-2xl text-black uppercase leading-tight">
                  {itemToCustomize.name}
                </h3>
              </div>
              <button
                onClick={() => setIsCustomizerOpen(false)}
                className="brutalist-border p-1 hover:bg-brand-red hover:text-white transition-colors cursor-pointer"
                aria-label="Fechar customizador"
              >
                <X size={18} />
              </button>
            </div>

            {/* Base Item Info */}
            <div className="bg-white brutalist-border p-4 mb-6">
              <span className="font-oswald font-black text-xs text-gray-500 uppercase block mb-1">Preço Base:</span>
              <span className="font-archivo text-xl text-black block">
                R$ {itemToCustomize.price.toFixed(2)}
              </span>
              <p className="text-xs text-gray-600 font-semibold mt-1">
                Inclui a receita clássica tradicional da casa.
              </p>
            </div>

            {/* Toppings Grid */}
            <div className="space-y-4 mb-8">
              <span className="font-oswald font-black text-xs uppercase text-black block border-b border-black pb-1.5">
                ESCOLHA SEUS ADICIONAIS (ESTILO FIVE GUYS):
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {AVAILABLE_TOPPINGS.map((top, idx) => {
                  const isSelected = selectedToppings.some(t => t.name === top.name);
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleTopping(top)}
                      className={`brutalist-border p-3 flex justify-between items-center cursor-pointer transition-all brutalist-shadow-sm ${
                        isSelected
                          ? 'bg-brand-red text-white brutalist-shadow border-black'
                          : 'bg-white text-black hover:bg-brand-yellow'
                      }`}
                    >
                      <div className="text-left">
                        <span className="font-oswald font-bold text-xs uppercase tracking-wide block">{top.name}</span>
                        <span className="text-[10px] opacity-75 font-semibold">
                          {top.price === 0 ? 'GRÁTIS' : `+ R$ ${top.price.toFixed(2)}`}
                        </span>
                      </div>
                      <div className={`w-5 h-5 brutalist-border flex items-center justify-center shrink-0 ${isSelected ? 'bg-white text-brand-red' : 'bg-brand-bg text-transparent'}`}>
                        <Check size={12} className="stroke-3" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions Footer */}
            <div className="border-t-2 border-black pt-4 flex justify-between items-center gap-4">
              <div className="font-oswald text-lg font-black uppercase text-black">
                Total: R$ {totalPrice.toFixed(2)}
              </div>
              <button
                onClick={addCustomizedToCart}
                className="bg-brand-red text-white brutalist-border px-6 py-3 font-oswald font-black uppercase text-sm tracking-wider hover:bg-black transition-colors brutalist-shadow cursor-pointer flex items-center gap-2"
              >
                <Plus size={16} /> Adicionar ao Carrinho
              </button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
