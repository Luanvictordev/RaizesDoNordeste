import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import CartItem from './CartItem';

export default function CartDrawer() {
  const {
    cart,
    setCart,
    isCartOpen,
    setIsCartOpen,
    getCartTotal,
    showToastNotification,
    setIsCheckoutOpen
  } = useApp();

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Cart Body */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] bg-brand-bg border-l-3 border-black z-50 flex flex-col justify-between"
          >
            {/* Header */}
            <div className="bg-white border-b-3 border-black p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-brand-red" size={24} />
                <h3 className="font-archivo text-xl uppercase leading-none">SEU PEDIDO</h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="brutalist-border p-1.5 hover:bg-brand-red hover:text-white transition-colors cursor-pointer"
                aria-label="Fechar carrinho"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length > 0 ? (
                cart.map((item, idx) => (
                  <CartItem key={item.id} item={item} idx={idx} />
                ))
              ) : (
                <div className="text-center py-20 flex flex-col items-center justify-center">
                  <div className="bg-white brutalist-border p-4 rounded-full mb-4 brutalist-shadow">
                    <ShoppingBag size={48} className="text-gray-300" />
                  </div>
                  <p className="font-oswald text-black uppercase font-bold text-md mb-2">SEU CARRINHO ESTÁ VAZIO</p>
                  <p className="text-xs text-gray-500 font-semibold max-w-xs leading-relaxed">
                    Adicione cuscuz recheado ou pastéis crocantes no cardápio para começar seu pedido!
                  </p>
                </div>
              )}
            </div>

            {/* Checkout / Footer block */}
            {cart.length > 0 && (
              <div className="bg-white border-t-3 border-black p-4 space-y-4">
                {/* Totals */}
                <div className="space-y-1.5 font-oswald text-sm font-bold uppercase">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal:</span>
                    <span>R$ {getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Taxa de Entrega:</span>
                    <span className="text-brand-red">GRÁTIS</span>
                  </div>
                  <div className="flex justify-between text-black text-lg font-black pt-1.5 border-t border-dashed border-gray-300">
                    <span>Total do Pedido:</span>
                    <span>R$ {getCartTotal().toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Actions */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-brand-red text-white brutalist-border py-4 font-oswald font-black uppercase text-lg tracking-wider hover:bg-black transition-colors brutalist-shadow cursor-pointer flex items-center justify-center gap-2"
                >
                  Confirmar e Finalizar Pedido
                </button>

                <p className="text-[10px] text-gray-400 text-center font-semibold leading-relaxed">
                  Pagamento realizado na entrega (Cartão, Dinheiro ou PIX). Tempo estimado: 35-45 min.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
