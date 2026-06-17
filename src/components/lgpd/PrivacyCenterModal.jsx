import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, Download, Trash2, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function PrivacyCenterModal() {
  const {
    isPrivacyModalOpen,
    setIsPrivacyModalOpen,
    user,
    cookieConsent,
    saveCookieConsent,
    showToastNotification
  } = useApp();

  const [marketingCookies, setMarketingCookies] = useState(cookieConsent === 'accepted');
  const [statsCookies, setStatsCookies] = useState(cookieConsent === 'accepted');
  const [essentialCookies] = useState(true); // always required

  const handleSave = () => {
    if (marketingCookies && statsCookies) {
      saveCookieConsent('accepted');
    } else if (!marketingCookies && !statsCookies) {
      saveCookieConsent('rejected');
    } else {
      saveCookieConsent('custom');
    }
    setIsPrivacyModalOpen(false);
    showToastNotification('Preferências de cookies salvas com sucesso!');
  };

  const handleDownloadData = () => {
    // Generate a simulated JSON report of the user's data
    const reportData = {
      empresa: "Rede Raízes do Nordeste",
      geradoEm: new Date().toLocaleString('pt-BR'),
      regulamento: "Lei Geral de Proteção de Dados (Lei 13.709/2018)",
      dadosPessoais: user ? {
        nome: user.name,
        email: user.email,
        saldoPontosFidelidade: user.points,
      } : "Usuário anônimo. Sem dados pessoais cadastrados.",
      cookiesColetados: {
        essenciais: "Ativo (Sessão do carrinho)",
        estatisticos: statsCookies ? "Ativo (Performance)" : "Inativo",
        marketing: marketingCookies ? "Ativo (Campanhas regionais)" : "Inativo"
      },
      politicaDeArmazenamento: "Os dados são armazenados localmente no dispositivo para otimização da experiência móvel e são deletados sob requisição."
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `raizes_nordeste_lgpd_relatorio.json`;
    a.click();
    showToastNotification('Download do relatório de dados iniciado!');
  };

  const handleForgetMe = () => {
    if (window.confirm("Atenção: A remoção de dados é irreversível. Deseja exercer o 'Direito ao Esquecimento' da LGPD? Isso excluirá sua conta mockada e pontos de fidelidade acumulados.")) {
      saveCookieConsent('rejected');
      setIsPrivacyModalOpen(false);
      showToastNotification('Seus dados pessoais foram apagados com sucesso de nosso banco local!');
    }
  };

  return (
    <AnimatePresence>
      {isPrivacyModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPrivacyModalOpen(false)}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none select-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-brand-bg w-full max-w-lg brutalist-border p-6 brutalist-shadow pointer-events-auto overflow-y-auto max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-5">
                <h3 className="font-archivo text-lg sm:text-xl uppercase leading-none flex items-center gap-2">
                  <ShieldAlert className="text-brand-red animate-pulse" size={22} />
                  CENTRAL DE PRIVACIDADE LGPD
                </h3>
                <button
                  onClick={() => setIsPrivacyModalOpen(false)}
                  className="brutalist-border p-1 hover:bg-brand-red hover:text-white transition-colors cursor-pointer"
                  aria-label="Fechar"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Cookie Selectors */}
              <div className="space-y-4 font-jakarta text-xs text-gray-700 mb-6">
                <p className="font-semibold text-black leading-relaxed">
                  Gerencie suas preferências de privacidade de acordo com a Lei Geral de Proteção de Dados (LGPD):
                </p>

                {/* Cookie row 1 */}
                <div className="bg-white brutalist-border p-3 flex justify-between items-start gap-4">
                  <div>
                    <span className="font-oswald font-black text-black text-sm uppercase block">1. Cookies Estritamente Necessários</span>
                    <span className="text-2xs text-gray-500 font-semibold block mt-0.5">Essenciais para o funcionamento do carrinho, navegação e autenticação segura de fidelidade.</span>
                  </div>
                  <span className="bg-green-100 text-green-700 border border-green-300 font-oswald font-bold text-2xs uppercase px-2 py-1 select-none shrink-0 flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    Obrigatório
                  </span>
                </div>

                {/* Cookie row 2 */}
                <label className="bg-white brutalist-border p-3 flex justify-between items-start gap-4 cursor-pointer hover:bg-brand-yellow/5 transition-colors">
                  <div>
                    <span className="font-oswald font-black text-black text-sm uppercase block">2. Cookies Estatísticos & Desempenho</span>
                    <span className="text-2xs text-gray-500 font-semibold block mt-0.5">Coletam informações anônimas de navegação para avaliarmos o carregamento e responsividade.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={statsCookies}
                    onChange={(e) => setStatsCookies(e.target.checked)}
                    className="w-5 h-5 shrink-0 accent-black text-black border-2 border-black rounded mt-1"
                  />
                </label>

                {/* Cookie row 3 */}
                <label className="bg-white brutalist-border p-3 flex justify-between items-start gap-4 cursor-pointer hover:bg-brand-yellow/5 transition-colors">
                  <div>
                    <span className="font-oswald font-black text-black text-sm uppercase block">3. Cookies de Marketing & Promoções</span>
                    <span className="text-2xs text-gray-500 font-semibold block mt-0.5">Lembram sua cidade para ativar campanhas regionais da Rede Raízes e combos específicos.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={marketingCookies}
                    onChange={(e) => setMarketingCookies(e.target.checked)}
                    className="w-5 h-5 shrink-0 accent-black text-black border-2 border-black rounded mt-1"
                  />
                </label>
              </div>

              {/* Data Rights Title */}
              <div className="border-t-2 border-black pt-4 mb-4">
                <span className="font-oswald font-black text-sm uppercase text-black block mb-3">SEUS DIREITOS DE TITULAR DE DADOS (ART. 18 LGPD)</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-oswald text-xs font-bold uppercase">
                  {/* Access Data */}
                  <button
                    onClick={handleDownloadData}
                    className="bg-white text-black brutalist-border py-2.5 px-3 flex items-center justify-center gap-2 hover:bg-brand-yellow transition-colors brutalist-shadow cursor-pointer"
                  >
                    <Download size={14} />
                    Exportar meus dados (JSON)
                  </button>

                  {/* Erasure Data */}
                  <button
                    onClick={handleForgetMe}
                    disabled={!user}
                    className={`py-2.5 px-3 flex items-center justify-center gap-2 transition-colors brutalist-shadow cursor-pointer ${
                      user 
                        ? 'bg-white text-brand-red brutalist-border hover:bg-brand-red hover:text-white' 
                        : 'bg-gray-200 text-gray-400 border-3 border-gray-300 cursor-not-allowed brutalist-shadow-none shadow-none'
                    }`}
                  >
                    <Trash2 size={14} />
                    Excluir meus dados (Esquecimento)
                  </button>
                </div>
              </div>

              {/* Footer Save */}
              <div className="pt-4 border-t border-gray-300 mt-6 flex justify-end font-oswald text-xs font-black uppercase tracking-wider">
                <button
                  onClick={handleSave}
                  className="bg-brand-red text-white brutalist-border py-3 px-8 text-sm hover:bg-black transition-colors brutalist-shadow cursor-pointer"
                >
                  Salvar Preferências
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
