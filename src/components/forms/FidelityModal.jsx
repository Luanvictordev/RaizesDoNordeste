import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Coins, HelpCircle, Shield, LogOut, TrendingUp, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function FidelityModal() {
  const {
    isFidelityModalOpen,
    setIsFidelityModalOpen,
    user,
    logoutMockUser,
    setIsPrivacyModalOpen
  } = useApp();

  if (!user) return null;

  const handleClose = () => {
    setIsFidelityModalOpen(false);
  };

  const handleOpenPrivacy = () => {
    setIsFidelityModalOpen(false);
    setIsPrivacyModalOpen(true);
  };

  const handleLogout = () => {
    setIsFidelityModalOpen(false);
    logoutMockUser();
  };

  // Mock transaction history for realistic profile look
  const mockTransactions = [
    { type: 'earn', title: 'Cashback: Combo Arretado Supreme', date: 'Hoje', points: 8 },
    { type: 'earn', title: 'Indicação de Amigo', date: 'Ontem', points: 15 },
    { type: 'spend', title: 'Resgate no Checkout', date: '25 Mai 2026', points: -10 },
    { type: 'earn', title: 'Bônus de Adesão ao Programa', date: '20 Mai 2026', points: 137 }
  ];

  return (
    <AnimatePresence>
      {isFidelityModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none select-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-brand-bg w-full max-w-md brutalist-border p-5 md:p-6 brutalist-shadow pointer-events-auto overflow-y-auto max-h-[90vh] relative text-black"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b-2 border-black mb-5">
                <div className="flex items-center gap-2">
                  <Award className="text-brand-red animate-bounce" size={24} />
                  <h3 className="font-archivo text-base sm:text-lg uppercase leading-none font-black">
                    PORTAL DE FIDELIDADE
                  </h3>
                </div>
                <button
                  onClick={handleClose}
                  className="brutalist-border p-1 hover:bg-brand-red hover:text-white transition-colors cursor-pointer"
                  aria-label="Fechar"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Main Info Card */}
              <div className="bg-brand-yellow brutalist-border p-5 brutalist-shadow text-center relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-8 -translate-y-8 pointer-events-none" />
                <span className="font-oswald text-[10px] text-black/60 font-black tracking-widest block uppercase leading-none mb-1">
                  SALDO ACUMULADO
                </span>
                
                {/* Giant Golden Coin representation */}
                <div className="flex items-center justify-center gap-2 my-2">
                  <Coins className="text-black shrink-0 animate-pulse" size={32} />
                  <h4 className="font-archivo text-4xl sm:text-5xl font-black tracking-tight text-black leading-none">
                    {user.points}
                  </h4>
                </div>

                <div className="bg-black text-white brutalist-border px-3 py-1 font-oswald text-[10px] sm:text-xs font-black uppercase tracking-wider w-fit mx-auto select-none mt-2">
                  VALOR DE RESGATE: R$ {user.points.toFixed(2)}
                </div>
              </div>

              {/* Business Rules Infographic Card */}
              <div className="bg-white brutalist-border p-4 mb-6 brutalist-shadow">
                <h5 className="font-archivo text-xs sm:text-sm uppercase font-black mb-3 flex items-center gap-1.5 border-b border-gray-200 pb-1.5">
                  <HelpCircle size={16} className="text-brand-red" />
                  COMO FUNCIONAM OS PONTOS?
                </h5>
                <div className="space-y-4 font-jakarta text-xs font-semibold leading-relaxed text-gray-700">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="text-brand-red shrink-0 mt-0.5" size={16} />
                    <p>
                      <strong className="text-black uppercase font-black font-oswald text-2xs block">10% de Cashback Real:</strong>
                      Cada pedido gera 10% do valor final pago em pontos. Ex: R$ 50,00 gastos = +5 pontos.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <RefreshCw className="text-brand-red shrink-0 mt-0.5" size={16} />
                    <p>
                      <strong className="text-black uppercase font-black font-oswald text-2xs block">Resgate 1:1 Sem Pegadinhas:</strong>
                      Cada 1 ponto acumulado equivale a R$ 1,00 de desconto real no fechamento do seu próximo pedido.
                    </p>
                  </div>
                </div>
              </div>

              {/* Transactions History */}
              <div className="space-y-3 mb-6">
                <h5 className="font-archivo text-xs sm:text-sm uppercase font-black text-gray-500 block">
                  ÚLTIMAS TRANSAÇÕES
                </h5>
                <div className="bg-white brutalist-border divide-y border-black font-oswald text-2xs sm:text-xs font-bold uppercase select-none">
                  {mockTransactions.map((tx, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between hover:bg-brand-bg transition-colors">
                      <div className="text-left">
                        <span className="text-black block font-black truncate max-w-[220px]">{tx.title}</span>
                        <span className="text-gray-400 block text-[9px] font-semibold mt-0.5">{tx.date}</span>
                      </div>
                      <span className={`font-black shrink-0 ${tx.type === 'earn' ? 'text-green-600' : 'text-brand-red'}`}>
                        {tx.points > 0 ? `+${tx.points}` : tx.points} PTS
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions Block */}
              <div className="pt-4 border-t border-gray-300 flex flex-col sm:flex-row gap-3 font-oswald text-xs font-black uppercase">
                <button
                  onClick={handleOpenPrivacy}
                  className="flex-1 bg-white hover:bg-gray-100 brutalist-border py-3 px-4 transition-colors brutalist-shadow flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  <Shield size={14} className="text-brand-red" />
                  Gerenciar LGPD
                </button>

                <button
                  onClick={handleLogout}
                  className="flex-1 bg-black text-white hover:bg-brand-red hover:text-white brutalist-border py-3 px-4 transition-colors brutalist-shadow flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  <LogOut size={14} />
                  Sair da Conta
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
