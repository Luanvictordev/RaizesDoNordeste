import React from 'react';
import { useApp } from '../../context/AppContext';
import { Monitor, Smartphone, Store } from 'lucide-react';

export default function ChannelSimulator() {
  const { activeChannel, setActiveChannel } = useApp();

  return (
    <div className="fixed bottom-4 left-4 z-50 select-none">
      <div className="bg-black text-white brutalist-border p-2 brutalist-shadow flex items-center gap-1.5 font-oswald text-xs font-bold uppercase tracking-wider">
        <span className="text-brand-yellow px-1 text-[10px] shrink-0 border-r border-gray-700 mr-1 animate-pulse">
          CANAIS:
        </span>
        
        <button
          onClick={() => setActiveChannel('web')}
          className={`flex items-center gap-1 px-2.5 py-1.5 transition-colors cursor-pointer ${
            activeChannel === 'web'
              ? 'bg-brand-red text-white'
              : 'hover:bg-brand-yellow hover:text-black text-gray-400'
          }`}
          title="Modo Web Desktop/Mobile"
        >
          <Monitor size={14} />
          <span>Web</span>
        </button>

        <button
          onClick={() => setActiveChannel('totem')}
          className={`flex items-center gap-1 px-2.5 py-1.5 transition-colors cursor-pointer ${
            activeChannel === 'totem'
              ? 'bg-brand-red text-white'
              : 'hover:bg-brand-yellow hover:text-black text-gray-400'
          }`}
          title="Modo Totem Kiosk Autoatendimento"
        >
          <Store size={14} />
          <span>Totem</span>
        </button>

        <button
          onClick={() => setActiveChannel('app')}
          className={`flex items-center gap-1 px-2.5 py-1.5 transition-colors cursor-pointer ${
            activeChannel === 'app'
              ? 'bg-brand-red text-white'
              : 'hover:bg-brand-yellow hover:text-black text-gray-400'
          }`}
          title="Simulação de Aplicativo Mobile"
        >
          <Smartphone size={14} />
          <span>App</span>
        </button>
      </div>
    </div>
  );
}
