import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function ContactForm() {
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 5000);
  };

  return (
    <div className="brutalist-border bg-white p-6 md:p-8 brutalist-shadow h-full flex flex-col justify-between">
      <div>
        <span className="font-oswald font-bold text-xs uppercase text-brand-red tracking-widest block mb-1">DÚVIDAS OU FEEDBACK?</span>
        <h3 className="font-archivo text-2xl md:text-3xl text-black uppercase leading-tight mb-4">
          CONTATE-NOS
        </h3>
        <p className="text-gray-600 font-semibold mb-6">
          Quer dar uma sugestão, elogiar o cuscuz ou tirar uma dúvida sobre franquias? Mande uma mensagem diretamente para nossa equipe!
        </p>

        {contactSubmitted ? (
          <div className="brutalist-border bg-black text-white p-4 text-center font-oswald font-bold uppercase animate-pulse">
            🚀 Mensagem enviada! Retornaremos o mais rápido possível.
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-oswald text-xs uppercase font-bold text-black block mb-1">E-mail</label>
                <input
                  type="email"
                  required
                  placeholder="exemplo@email.com"
                  className="w-full bg-brand-bg brutalist-border p-3 font-oswald text-sm focus:outline-none focus:bg-white"
                />
              </div>
              <div>
                <label className="font-oswald text-xs uppercase font-bold text-black block mb-1">Assunto</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Franquias"
                  className="w-full bg-brand-bg brutalist-border p-3 font-oswald text-sm focus:outline-none focus:bg-white"
                />
              </div>
            </div>
            <div>
              <label className="font-oswald text-xs uppercase font-bold text-black block mb-1">Mensagem</label>
              <textarea
                rows="3"
                required
                placeholder="Escreva sua mensagem aqui..."
                className="w-full bg-brand-bg brutalist-border p-3 font-oswald text-sm focus:outline-none focus:bg-white resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white brutalist-border py-3 font-oswald font-black uppercase text-sm tracking-wider hover:bg-brand-red transition-colors brutalist-shadow cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Send size={16} /> Enviar Mensagem
            </button>
          </form>
        )}
      </div>

      {/* Bottom Quick Contact Details */}
      <div className="mt-8 pt-6 border-t-2 border-black flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-semibold text-gray-500">
        <div>
          <span className="block text-black">RAÍZES DO NORDESTE FRANCHISING LTDA.</span>
          <span>Recife, Pernambuco - Brasil</span>
        </div>
        <div>
          <span className="block text-black">SUPORTE AO CLIENTE:</span>
          <span>contato@raizesnordeste.com.br</span>
        </div>
      </div>
    </div>
  );
}
