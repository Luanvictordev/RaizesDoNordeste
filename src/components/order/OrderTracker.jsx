import React from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, CheckCircle2, ChevronRight, X, ChefHat, Bike, ShieldAlert, MapPin } from 'lucide-react';

export default function OrderTracker() {
  const { activeOrder, setActiveOrder } = useApp();
  const [isMinimized, setIsMinimized] = React.useState(() => {
    return localStorage.getItem('raizes_order_minimized') === 'true';
  });

  if (!activeOrder) return null;

  const { id, items, total, status, timestamp, details } = activeOrder;

  const handleMinimize = (min) => {
    setIsMinimized(min);
    localStorage.setItem('raizes_order_minimized', min ? 'true' : 'false');
  };

  const handleClearOrder = () => {
    setActiveOrder(null);
    localStorage.removeItem('raizes_order');
    localStorage.removeItem('raizes_order_minimized');
    setIsMinimized(false);
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => handleMinimize(false)}
        className="fixed bottom-4 right-4 z-40 bg-brand-yellow text-black brutalist-border p-3 brutalist-shadow hover:bg-black hover:text-white transition-all duration-200 cursor-pointer flex items-center gap-2 font-oswald text-xs font-black uppercase tracking-wider animate-bounce select-none"
        style={{ animationDuration: '3s' }}
        title="Ver andamento do pedido"
      >
        <Bike className="animate-pulse text-brand-red shrink-0" size={16} />
        <span>Rastrear Pedido ({id}) - <span className="text-brand-red font-black">{status === 'received' ? 'Recebido' : status === 'preparing' ? 'Preparando' : status === 'ready' ? 'Pronto' : 'Entregue'}</span></span>
      </button>
    );
  }

  const getStatusStepClass = (stepName) => {
    const sequence = ['received', 'preparing', 'ready', 'delivered'];
    const currentIdx = sequence.indexOf(status);
    const stepIdx = sequence.indexOf(stepName);

    if (currentIdx > stepIdx) {
      return 'bg-green-100 text-green-700 border-green-500';
    } else if (currentIdx === stepIdx) {
      return 'bg-brand-yellow text-black border-black animate-pulse';
    } else {
      return 'bg-white text-gray-400 border-gray-200';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-sm w-full p-4 bg-brand-bg brutalist-border brutalist-shadow select-none">
      {/* Header */}
      <div className="flex justify-between items-center pb-2 border-b border-gray-300 mb-3">
        <div className="flex items-center gap-1.5">
          <ChefHat size={18} className="text-brand-red shrink-0" />
          <span className="font-oswald font-black text-sm uppercase tracking-wide">
            ACOMPANHAMENTO DO PEDIDO
          </span>
        </div>
        <button
          onClick={() => handleMinimize(true)}
          className="brutalist-border p-0.5 hover:bg-brand-red hover:text-white transition-colors cursor-pointer"
          title="Minimizar rastreador"
        >
          <X size={14} />
        </button>
      </div>

      {/* Info Card */}
      <div className="bg-white brutalist-border p-3 space-y-2 mb-4">
        <div className="flex justify-between items-center text-xs font-oswald font-bold uppercase">
          <span>PEDIDO: <span className="text-brand-red">{id}</span></span>
          <span className="text-gray-500 font-semibold">{timestamp}</span>
        </div>

        <div className="text-[10px] text-gray-500 font-jakarta font-semibold leading-relaxed truncate border-t border-gray-100 pt-1.5 flex items-center gap-1 select-none">
          <MapPin size={10} className="text-brand-red shrink-0" />
          <span>{details}</span>
        </div>

        <div className="flex justify-between items-center pt-1.5 font-oswald text-xs font-black uppercase text-black border-t border-dashed border-gray-200">
          <span>VALOR TOTAL DO PEDIDO:</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="space-y-3 font-oswald text-2xs sm:text-xs font-bold uppercase mb-4">
        {/* Node 1: Recebido */}
        <div className="flex items-center gap-3">
          <span className={`w-6 h-6 border-2 rounded-full flex items-center justify-center font-black ${getStatusStepClass('received')}`}>
            ✓
          </span>
          <div className="leading-tight">
            <span className="block text-black">Pedido Recebido</span>
            <span className="text-3xs text-gray-500 normal-case block leading-none font-semibold">Integrado com sucesso ao terminal.</span>
          </div>
        </div>

        {/* Node 2: Cozinhando */}
        <div className="flex items-center gap-3">
          <span className={`w-6 h-6 border-2 rounded-full flex items-center justify-center font-black ${getStatusStepClass('preparing')}`}>
            {status === 'received' ? '2' : '✓'}
          </span>
          <div className="leading-tight">
            <span className="block text-black">Cuscuz na Chapa</span>
            <span className="text-3xs text-gray-500 normal-case block leading-none font-semibold">A cozinha está preparando seus pratos.</span>
          </div>
        </div>

        {/* Node 3: Pronto / Em Rota */}
        <div className="flex items-center gap-3">
          <span className={`w-6 h-6 border-2 rounded-full flex items-center justify-center font-black ${getStatusStepClass('ready')}`}>
            {status === 'received' || status === 'preparing' ? '3' : '✓'}
          </span>
          <div className="leading-tight">
            <span className="block text-black">Pronto para Retirada / Rota</span>
            <span className="text-3xs text-gray-500 normal-case block leading-none font-semibold">Seu pedido está no balcão ou saiu para entrega.</span>
          </div>
        </div>

        {/* Node 4: Entregue */}
        <div className="flex items-center gap-3">
          <span className={`w-6 h-6 border-2 rounded-full flex items-center justify-center font-black ${getStatusStepClass('delivered')}`}>
            {status !== 'delivered' ? '4' : '✓'}
          </span>
          <div className="leading-tight">
            <span className="block text-black">Pedido Entregue</span>
            <span className="text-3xs text-gray-500 normal-case block leading-none font-semibold">Aproveite seus pratos típicos!</span>
          </div>
        </div>
      </div>

      {/* Simulated Time Info */}
      {status !== 'delivered' ? (
        <div className="bg-white border border-black p-2 flex items-center gap-2 font-oswald text-[10px] sm:text-xs font-bold uppercase">
          <Clock size={16} className="text-brand-red shrink-0 animate-pulse" />
          <span>ENTREGA ESTIMADA: <span className="text-brand-red">30-40 MINUTOS</span></span>
        </div>
      ) : (
        <button
          onClick={handleClearOrder}
          className="w-full bg-brand-yellow text-black brutalist-border py-2.5 font-oswald font-black uppercase text-xs hover:bg-black hover:text-white transition-colors brutalist-shadow cursor-pointer flex items-center justify-center gap-1.5"
        >
          <CheckCircle2 size={14} />
          Iniciar Novo Pedido
        </button>
      )}
    </div>
  );
}
