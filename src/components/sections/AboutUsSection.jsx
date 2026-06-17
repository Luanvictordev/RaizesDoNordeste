import React from 'react';

export default function AboutUsSection() {
  return (
    <section id="sobrenos" className="py-16 bg-brand-bg relative">
      {/* Authentic top paper torn border filled with #f6f6f6, overlapping the white cardapio section */}
      <div className="absolute top-0 left-0 right-0 h-3 paper-border-top -translate-y-2 z-20 pointer-events-none"></div>

      {/* Background Cordel Accent Lines */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-black opacity-10 -translate-y-1/2 hidden md:block"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="brutalist-border bg-white p-6 md:p-12 brutalist-shadow max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            
            {/* Story graphic/badge */}
            <div className="shrink-0 w-28 h-28 md:w-36 md:h-36 bg-brand-red text-white brutalist-border rounded-full flex flex-col items-center justify-center brutalist-shadow rotate-[-4deg]">
              <span className="font-archivo text-xl leading-none text-brand-yellow uppercase tracking-tighter">DESDE</span>
              <span className="font-archivo text-3xl leading-none font-black text-white">2021</span>
              <span className="font-oswald text-xs font-semibold uppercase tracking-wider">NORDESTE</span>
            </div>

            <div>
              <span className="font-oswald font-bold text-xs uppercase text-brand-red tracking-widest block mb-1">NOSSA HISTÓRIA</span>
              <h2 className="font-archivo text-3xl md:text-4xl text-black uppercase leading-tight tracking-tight mb-4">
                CUSCUZ COM ALMA, SABOR DE TRADIÇÃO
              </h2>

              <p className="text-gray-700 font-medium leading-relaxed mb-4">
                O <strong>Raízes do Nordeste</strong> nasceu no coração do sertão com uma missão arretada de simples: elevar a comida de rua nordestina ao patamar que ela merece. Inspirados pela operação impecável, ingrediente super fresco e ambiente clean das lanchonetes de rua tradicionais, pensamos: por que não aplicar essa mesma excelência ao nosso cuscuz de todo dia?
              </p>

              <p className="text-gray-700 font-medium leading-relaxed">
                Aqui, não trabalhamos com microondas ou comida requentada. Cada cuscuz é batido, hidratado e cozido no vapor na hora do seu pedido, com carne de sol de primeira qualidade e queijo coalho curado vindo de pequenos produtores locais. É a nossa raiz de verdade, servida com capricho e muito sabor!
              </p>
            </div>

          </div>
        </div>
      </div>
      
      {/* Authentic bottom paper torn border filled with #f6f6f6, overlapping the white encontre section */}
      <div className="absolute bottom-0 left-0 right-0 h-3 paper-border-bottom translate-y-2 z-20 pointer-events-none"></div>
    </section>
  );
}
