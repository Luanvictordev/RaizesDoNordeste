import React, { useState } from 'react';

export default function CareersForm() {
  const [joinSubmitted, setJoinSubmitted] = useState(false);

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    setJoinSubmitted(true);
    setTimeout(() => setJoinSubmitted(false), 5000);
  };

  return (
    <div className="brutalist-border bg-white p-6 md:p-8 brutalist-shadow h-full flex flex-col justify-between">
      <div>
        <span className="font-oswald font-bold text-xs uppercase text-brand-red tracking-widest block mb-1">TRABALHE CONOSCO</span>
        <h3 className="font-archivo text-2xl md:text-3xl text-black uppercase leading-tight mb-4">
          JUNTE-SE AO NOSSO BANDO
        </h3>
        <p className="text-gray-600 font-semibold mb-6">
          Procuramos pessoas arretadas de verdade, apaixonadas por comida de qualidade e atendimento com aquele sorriso acolhedor do sertão. Oferecemos ótimos salários, plano de carreira e muito cuscuz!
        </p>

        {joinSubmitted ? (
          <div className="brutalist-border bg-brand-yellow p-4 text-center font-oswald font-bold uppercase text-black animate-pulse">
            🎉 Inscrição recebida! Em breve entraremos em contato com você.
          </div>
        ) : (
          <form onSubmit={handleJoinSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-oswald text-xs uppercase font-bold text-black block mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Seu nome"
                  className="w-full bg-brand-bg brutalist-border p-3 font-oswald text-sm focus:outline-none focus:bg-white"
                />
              </div>
              <div>
                <label className="font-oswald text-xs uppercase font-bold text-black block mb-1">Telefone / WhatsApp</label>
                <input
                  type="tel"
                  required
                  placeholder="(00) 90000-0000"
                  className="w-full bg-brand-bg brutalist-border p-3 font-oswald text-sm focus:outline-none focus:bg-white"
                />
              </div>
            </div>
            <div>
              <label className="font-oswald text-xs uppercase font-bold text-black block mb-1">Vaga de Interesse</label>
              <select className="w-full bg-brand-bg brutalist-border p-3 font-oswald text-sm focus:outline-none focus:bg-white">
                <option>Chapeiro / Mestre Cuscuzero</option>
                <option>Atendimento de Balcão</option>
                <option>Gerência de Unidade</option>
                <option>Entregador da Casa</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-brand-red text-white brutalist-border py-3 font-oswald font-black uppercase text-sm tracking-wider hover:bg-black transition-colors brutalist-shadow cursor-pointer"
            >
              Enviar Currículo
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
