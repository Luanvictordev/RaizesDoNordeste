import React from 'react';
import { Plus, Minus, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function CartItem({ item, idx }) {
  const { updateCartQuantity, cart, setCart } = useApp();

  const handleRemove = () => {
    const updated = [...cart];
    updated.splice(idx, 1);
    setCart(updated);
  };

  return (
    <div className="bg-white brutalist-border p-3 brutalist-shadow relative flex gap-3 items-center">
      {/* Quantity Controls */}
      <div className="flex flex-col items-center brutalist-border bg-brand-bg py-1 px-2 shrink-0">
        <button
          onClick={() => updateCartQuantity(idx, 1)}
          className="hover:text-brand-red p-0.5 cursor-pointer"
          aria-label="Aumentar quantidade"
        >
          <Plus size={14} />
        </button>
        <span className="font-archivo text-sm my-0.5">{item.quantity}</span>
        <button
          onClick={() => updateCartQuantity(idx, -1)}
          className="hover:text-brand-red p-0.5 cursor-pointer"
          aria-label="Diminuir quantidade"
        >
          <Minus size={14} />
        </button>
      </div>

      {/* Product Image */}
      {item.image && (
        <div className="w-12 h-12 brutalist-border bg-white overflow-hidden shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-archivo text-sm text-black uppercase leading-tight truncate">{item.name}</h4>
        <span className="font-oswald font-black text-xs text-brand-red block mb-1">
          R$ {(item.price * item.quantity).toFixed(2)}
        </span>

        {item.toppings && item.toppings.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {item.toppings.map((top, tIdx) => (
              <span key={tIdx} className="bg-brand-bg brutalist-border text-[9px] font-bold uppercase px-1 py-0.5">
                + {top}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Delete */}
      <button
        onClick={handleRemove}
        className="text-gray-400 hover:text-brand-red p-1 cursor-pointer shrink-0"
        aria-label="Remover item"
      >
        <X size={16} />
      </button>
    </div>
  );
}
