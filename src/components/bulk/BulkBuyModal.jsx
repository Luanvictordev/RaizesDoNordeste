import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function BulkBuyModal() {
  const {
    isBulkModalOpen,
    setIsBulkModalOpen,
    bulkStep,
    setBulkStep,
    bulkData,
    setBulkData,
    handleBulkSubmit,
    showToastNotification
  } = useApp();

  const handleNextStep1 = () => {
    if (bulkData.contactName && bulkData.contactPhone) {
      setBulkStep(2);
    } else {
      showToastNotification("Por favor, preencha os campos obrigatórios!");
    }
  };

  const handleNextStep2 = () => {
    if (bulkData.deliveryDate) {
      setBulkStep(3);
    } else {
      showToastNotification("Por favor, preencha a data de entrega!");
    }
  };

  return (
    <AnimatePresence>
      {isBulkModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsBulkModalOpen(false)}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Modal Body */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-brand-bg brutalist-border z-50 brutalist-shadow p-6"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="font-oswald font-bold text-xs uppercase text-brand-red tracking-wider block">SOLICITAÇÃO DE ORÇAMENTO</span>
                <h3 className="font-archivo text-xl md:text-2xl text-black uppercase leading-none">
                  COMPRA EM GRUPO / LOTE
                </h3>
              </div>
              <button
                onClick={() => setIsBulkModalOpen(false)}
                className="brutalist-border p-1 hover:bg-brand-red hover:text-white transition-colors cursor-pointer"
                aria-label="Fechar modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Progress Steps Indicator */}
            <div className="grid grid-cols-3 gap-2 mb-6 font-oswald text-[9px] font-black uppercase tracking-wider text-center">
              <div className={`p-2 border-2 ${bulkStep >= 1 ? 'bg-brand-yellow border-black' : 'border-gray-300 text-gray-400'}`}>1. O Grupo</div>
              <div className={`p-2 border-2 ${bulkStep >= 2 ? 'bg-brand-yellow border-black' : 'border-gray-300 text-gray-400'}`}>2. O Menu</div>
              <div className={`p-2 border-2 ${bulkStep >= 3 ? 'bg-brand-yellow border-black' : 'border-gray-300 text-gray-400'}`}>3. Revisão</div>
            </div>

            <form onSubmit={handleBulkSubmit}>
              {bulkStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="font-oswald text-xs uppercase font-bold text-black block mb-1">Tamanho da Fome (Pessoas)</label>
                    <select
                      value={bulkData.groupSize}
                      onChange={(e) => setBulkData({ ...bulkData, groupSize: e.target.value })}
                      className="w-full bg-white brutalist-border p-3 font-oswald text-sm focus:outline-none"
                    >
                      <option value="10-15">10 a 15 pessoas</option>
                      <option value="15-20">15 a 20 pessoas</option>
                      <option value="20-35">20 a 35 pessoas</option>
                      <option value="35+">Mais de 35 pessoas (Mega Banquete)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-oswald text-xs uppercase font-bold text-black block mb-1">Nome do Responsável</label>
                    <input
                      type="text"
                      required
                      value={bulkData.contactName}
                      onChange={(e) => setBulkData({ ...bulkData, contactName: e.target.value })}
                      placeholder="Ex: Maria Souza"
                      className="w-full bg-white brutalist-border p-3 font-oswald text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-oswald text-xs uppercase font-bold text-black block mb-1">Telefone de Contato</label>
                    <input
                      type="tel"
                      required
                      value={bulkData.contactPhone}
                      onChange={(e) => setBulkData({ ...bulkData, contactPhone: e.target.value })}
                      placeholder="Ex: (81) 98888-7777"
                      className="w-full bg-white brutalist-border p-3 font-oswald text-sm focus:outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleNextStep1}
                    className="w-full bg-black text-white brutalist-border py-3 font-oswald font-black uppercase text-sm tracking-wider hover:bg-brand-red transition-colors brutalist-shadow cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    Continuar <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {bulkStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="font-oswald text-xs uppercase font-bold text-black block mb-1">Selecione o Banquete Base</label>
                    <select
                      value={bulkData.comboChoice}
                      onChange={(e) => setBulkData({ ...bulkData, comboChoice: e.target.value })}
                      className="w-full bg-white brutalist-border p-3 font-oswald text-sm focus:outline-none"
                    >
                      <option value="Banquete Retado">Banquete Retado (Mix de Cuscuz Recheados + Bebidas)</option>
                      <option value="Festa do Pastel">Festa do Pastel (Lotes de Pastéis Variados + Refrigerantes)</option>
                      <option value="Sertão Completo">Sertão Completo (Cuscuz + Sanduíches + Travessas de Baião)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-oswald text-xs uppercase font-bold text-black block mb-1">Data e Hora de Entrega</label>
                    <input
                      type="datetime-local"
                      required
                      value={bulkData.deliveryDate}
                      onChange={(e) => setBulkData({ ...bulkData, deliveryDate: e.target.value })}
                      className="w-full bg-white brutalist-border p-3 font-oswald text-sm focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setBulkStep(1)}
                      className="w-1/3 bg-white text-black brutalist-border py-3 font-oswald font-black uppercase text-sm tracking-wider hover:bg-brand-yellow transition-colors brutalist-shadow cursor-pointer"
                    >
                      Voltar
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep2}
                      className="w-2/3 bg-black text-white brutalist-border py-3 font-oswald font-black uppercase text-sm tracking-wider hover:bg-brand-red transition-colors brutalist-shadow cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      Continuar <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {bulkStep === 3 && (
                <div className="space-y-4">
                  <div className="bg-white brutalist-border p-4 space-y-3 font-oswald text-xs uppercase font-bold text-black">
                    <span className="font-black text-brand-red border-b border-black pb-1.5 block mb-2">REVISÃO DOS DETALHES:</span>
                    <div>👥 GRUPO: <span className="font-normal text-gray-700">{bulkData.groupSize} PESSOAS</span></div>
                    <div>👤 CONTATO: <span className="font-normal text-gray-700">{bulkData.contactName} ({bulkData.contactPhone})</span></div>
                    <div>🍽️ BANQUETE: <span className="font-normal text-gray-700">{bulkData.comboChoice}</span></div>
                    <div>📅 ENTREGA: <span className="font-normal text-gray-700">{new Date(bulkData.deliveryDate).toLocaleString()}</span></div>
                  </div>

                  <p className="text-[10px] text-gray-500 font-semibold leading-relaxed">
                    Ao enviar o orçamento, nossa central de banquetes locais ligará para o seu número cadastrado em até 30 minutos para alinhar cardápio final, preços promocionais e confirmar o envio.
                  </p>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setBulkStep(2)}
                      className="w-1/3 bg-white text-black brutalist-border py-3 font-oswald font-black uppercase text-sm tracking-wider hover:bg-brand-yellow transition-colors brutalist-shadow cursor-pointer"
                    >
                      Voltar
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 bg-brand-red text-white brutalist-border py-3 font-oswald font-black uppercase text-sm tracking-wider hover:bg-black transition-colors brutalist-shadow cursor-pointer flex items-center justify-center gap-1.5 animate-pulse"
                    >
                      <Check size={16} /> Enviar Orçamento Final
                    </button>
                  </div>
                </div>
              )}
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
