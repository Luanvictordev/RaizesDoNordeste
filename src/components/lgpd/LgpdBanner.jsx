import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck } from 'lucide-react';

export default function LgpdBanner() {
  const { cookieConsent, saveCookieConsent, setIsPrivacyModalOpen } = useApp();

  if (cookieConsent !== 'pending') return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-black text-white border-t-3 border-black py-4 px-6 select-none brutalist-shadow">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Info */}
        <div className="flex items-center gap-3">
          <ShieldCheck size={28} className="text-brand-yellow shrink-0 animate-bounce" />
          <p className="font-jakarta text-2xs sm:text-xs leading-normal max-w-3xl text-gray-300">
            <strong>Privacidade dos seus Dados (LGPD):</strong> Nós da Rede Raízes do Nordeste utilizamos cookies essenciais para o funcionamento do carrinho, lembrança do quiosque selecionado e acúmulo de pontos do programa de fidelidade. Caso concorde, ative os cookies para ter uma experiência arretada completa!
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 font-oswald text-2xs sm:text-xs font-black uppercase tracking-wider shrink-0 w-full sm:w-auto justify-end">
          <button
            onClick={() => setIsPrivacyModalOpen(true)}
            className="px-3.5 py-2.5 bg-gray-800 text-white brutalist-border hover:bg-white hover:text-black transition-colors cursor-pointer w-full sm:w-auto text-center"
          >
            Preferências
          </button>
          
          <button
            onClick={() => saveCookieConsent('rejected')}
            className="px-3.5 py-2.5 bg-gray-900 text-gray-400 brutalist-border hover:bg-brand-red hover:text-white transition-colors cursor-pointer w-full sm:w-auto text-center"
          >
            Recusar
          </button>
          
          <button
            onClick={() => saveCookieConsent('accepted')}
            className="px-5 py-2.5 bg-brand-yellow text-black brutalist-border hover:bg-white transition-colors cursor-pointer w-full sm:w-auto text-center font-bold"
          >
            Aceitar Todos
          </button>
        </div>
      </div>
    </div>
  );
}
