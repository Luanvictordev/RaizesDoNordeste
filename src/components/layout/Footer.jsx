import React from 'react';
import { ArrowUp, Info, Instagram, Facebook, Twitter } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { setIsPrivacyModalOpen } = useApp();

  return (
    <footer className="bg-black text-white py-12 md:py-16 select-none relative overflow-hidden">
      {/* Background dark diagonal subtle strip */}
      <div className="absolute inset-0 bg-linear-to-tr from-brand-red/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Voltar ao Topo Link inside Footer */}
        <div className="flex justify-center mb-10 pb-6 border-b border-gray-800/60">
          <button
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 font-oswald font-black uppercase text-sm text-gray-400 hover:text-brand-red transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            <ArrowUp size={16} className="animate-bounce text-brand-yellow" />
            Voltar ao topo da página
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          {/* Col 1: Logo */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="inline-block bg-brand-red text-white brutalist-border px-4 py-2.5 brutalist-shadow mb-6">
              <span className="font-archivo text-lg md:text-xl leading-none tracking-tighter font-black uppercase text-white whitespace-nowrap">
                Raízes <span className="text-brand-yellow">do</span> Nordeste
              </span>
            </div>
            <p className="font-oswald text-xs text-gray-400 uppercase font-bold tracking-wider max-w-sm mx-auto md:mx-0">
              Unindo a eficiência e atitude urbana do street food com a tradição afetiva, rica e arretada dos sabores do Sertão.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left w-full">
            <h5 className="font-archivo text-md text-brand-yellow uppercase tracking-wider mb-4">MAPA DO SITE</h5>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 font-oswald text-sm font-bold uppercase text-center md:text-left w-full max-w-xs md:max-w-none">
              <a href="#hero" className="hover:text-brand-red transition-colors">Início</a>
              <a href="#cardapio" className="hover:text-brand-red transition-colors">O Cardápio</a>
              <a href="#destaque" className="hover:text-brand-red transition-colors">Destaque</a>
              <a href="#sobrenos" className="hover:text-brand-red transition-colors">Nossa História</a>
              <a href="#encontre" className="hover:text-brand-red transition-colors">Lojas</a>
              <a href="#contato" className="hover:text-brand-red transition-colors">Fale Conosco</a>
            </div>
          </div>

          {/* Col 3: Social & Support */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            <h5 className="font-archivo text-md text-brand-yellow uppercase tracking-wider mb-4">REDES SOCIAIS</h5>
            <p className="font-oswald text-xs text-gray-400 uppercase font-bold tracking-wider mb-4 max-w-sm mx-auto md:mx-0">
              Siga nossas postagens arretadas e participe dos nossos sorteios semanais!
            </p>

            <div className="flex gap-4 justify-center md:justify-start">
              <a href="#" aria-label="Instagram" className="bg-white text-black brutalist-border p-2 hover:bg-brand-red hover:text-white transition-colors brutalist-shadow">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Facebook" className="bg-white text-black brutalist-border p-2 hover:bg-brand-red hover:text-white transition-colors brutalist-shadow">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="bg-white text-black brutalist-border p-2 hover:bg-brand-red hover:text-white transition-colors brutalist-shadow">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Centered, Non-breaking SAC Section */}
        <div className="flex justify-center mb-10 max-w-full overflow-x-auto scrollbar-none">
          <div className="bg-[#111111] brutalist-border px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 flex items-center gap-2.5 md:gap-3 w-fit shrink-0 whitespace-nowrap mx-auto">
            <Info size={18} className="text-brand-yellow shrink-0 animate-pulse" />
            <span className="font-oswald text-[10px] min-[380px]:text-xs md:text-sm uppercase tracking-wider text-gray-300 font-bold">
              SAC Nacional: <span className="text-white">0800 400 9000</span> <span className="text-gray-600 mx-2">|</span> Segunda a Sexta: <span className="text-white">09h às 18h</span>
            </span>
          </div>
        </div>

        {/* Subfooter (Copyright) */}
        <div className="pt-8 border-t-2 border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-2xs font-oswald uppercase tracking-widest text-gray-500 text-center md:text-left">
          <span>© {currentYear} RAÍZES DO NORDESTE. TODOS OS DIREITOS RESERVADOS.</span>
          <div className="flex flex-wrap gap-6 justify-center md:justify-start items-center">
            <a href="#" className="hover:text-white">Termos de Uso</a>
            <button
              onClick={() => setIsPrivacyModalOpen(true)}
              className="hover:text-white bg-transparent border-none cursor-pointer p-0 font-oswald uppercase text-2xs tracking-widest font-normal"
            >
              Diretrizes de Privacidade (LGPD)
            </button>
            <a href="#" className="hover:text-white">Seja um Franqueado</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
