import React from 'react';
import { Search, MapPin, Clock, Phone, Users, Check, ArrowRight, Map } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function FranchiseSection() {
  const {
    searchFranchise,
    franchiseList,
    handleFranchiseSearch,
    setIsBulkModalOpen,
    setBulkStep,
    showToastNotification,
    changeFranchise,
    selectedFranchise
  } = useApp();

  const handleOpenBulkModal = () => {
    setIsBulkModalOpen(true);
    setBulkStep(1);
  };

  return (
    <section id="encontre" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-archivo text-3xl md:text-5xl text-black uppercase leading-tight tracking-tight mb-4">
            ENCONTRE O RAÍZES MAIS PRÓXIMO
          </h2>
          <p className="text-gray-600 font-semibold mb-6">
            Estamos espalhados pelas principais capitais do Nordeste. Selecione seu quiosque preferido para regionalizar o cardápio!
          </p>

          {/* Locator Search Bar */}
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              value={searchFranchise}
              onChange={(e) => handleFranchiseSearch(e.target.value)}
              placeholder="Pesquise por cidade (Ex: Recife, Fortaleza)..."
              className="w-full bg-brand-bg brutalist-border py-4 pl-12 pr-4 font-oswald text-md placeholder-gray-500 focus:outline-none focus:bg-white transition-colors brutalist-shadow"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          </div>
        </div>

        {/* Franchise Cards Grid - Premium Responsive Layout, No scrollbars! */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
          {franchiseList.length > 0 ? (
            franchiseList.map((fran, idx) => (
              <div key={idx} className="brutalist-border bg-brand-bg p-5 brutalist-shadow flex flex-col justify-between gap-6 hover:bg-white transition-all duration-200 hover:-translate-y-1">
                <div>
                  <h4 className="font-archivo text-xl text-black uppercase leading-tight mb-2">{fran.city}</h4>
                  <p className="text-xs font-semibold text-gray-600 mb-4 flex items-start gap-1">
                    <MapPin size={14} className="text-brand-red shrink-0 mt-0.5" /> {fran.address}
                  </p>

                  <div className="space-y-2 text-xs font-semibold text-black border-t border-gray-200 pt-4">
                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-brand-red" /> {fran.hours}</span>
                    <span className="flex items-center gap-1.5"><Phone size={14} className="text-brand-red" /> {fran.phone}</span>
                  </div>
                </div>

                <div className="flex gap-2 font-oswald text-xs font-black uppercase">
                  <button
                    onClick={() => changeFranchise(fran)}
                    className={`flex-1 brutalist-border py-3 transition-colors brutalist-shadow cursor-pointer ${
                      selectedFranchise?.city === fran.city
                        ? 'bg-brand-yellow text-black font-black'
                        : 'bg-black text-white hover:bg-brand-yellow hover:text-black font-bold'
                    }`}
                  >
                    {selectedFranchise?.city === fran.city ? 'Selecionado' : 'Selecionar'}
                  </button>

                  <button
                    onClick={() => showToastNotification(`Localizando quiosque de ${fran.city} no mapa...`)}
                    className="bg-white text-black brutalist-border px-3 hover:bg-brand-yellow transition-colors brutalist-shadow cursor-pointer flex items-center justify-center"
                    title="Ver no Mapa"
                  >
                    <Map size={14} className="text-black" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center font-oswald text-gray-500 font-bold py-8">
              Nenhum quiosque localizado nesta cidade. 😢
            </div>
          )}
        </div>

        {/* Bulk Buy Section (Full Width, High Impact) */}
        <div className="brutalist-border bg-brand-yellow p-6 md:p-10 brutalist-shadow relative overflow-hidden max-w-5xl mx-auto">
          {/* Mini checkerboard highlight */}
          <div className="absolute top-0 left-0 right-0 h-2 checkerboard-pattern-white opacity-20"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Text Info */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 bg-brand-red text-white brutalist-border px-3 py-1 text-xs font-oswald font-bold uppercase tracking-wider mb-6 w-fit brutalist-shadow -rotate-2">
                <Users size={14} /> REUNIÕES E EVENTOS
              </div>

              <h3 className="font-archivo text-2xl md:text-4xl text-black uppercase leading-tight tracking-tight mb-4">
                COMPRA COLETIVA & BANQUETES
              </h3>

              <p className="text-black font-semibold mb-6">
                Vai reunir a família, fazer uma reunião no escritório ou celebrar um aniversário? Nosso serviço de <strong>Compra Coletiva (Bulk Buy)</strong> entrega travessas gigantescas de cuscuz recheado e porções família de baião de dois quentes e prontos para servir. Descontos progressivos a partir de 10 pessoas!
              </p>
            </div>

            {/* Advantage list and CTA */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-white brutalist-border p-4">
                <span className="font-oswald font-black text-xs uppercase text-brand-red block mb-3">VANTAGENS DO PEDIDO COLETIVO:</span>
                <ul className="space-y-2 text-xs md:text-sm font-semibold text-black">
                  <li className="flex items-center gap-2"><Check size={14} className="text-brand-red shrink-0" /> Descontos e brindes especiais</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-brand-red shrink-0" /> Embalagens térmicas especiais para transporte</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-brand-red shrink-0" /> Menu 100% personalizável para seu evento</li>
                </ul>
              </div>

              <button
                onClick={handleOpenBulkModal}
                className="w-full bg-black text-white brutalist-border py-4 font-oswald font-black uppercase text-lg tracking-wider hover:bg-brand-red transition-colors brutalist-shadow cursor-pointer flex items-center justify-center gap-2"
              >
                Solicitar Orçamento de Grupo
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
