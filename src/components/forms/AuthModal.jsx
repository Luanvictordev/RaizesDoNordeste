import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, loginMockUser } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [lgpdChecked, setLgpdChecked] = useState(false);
  const [errors, setErrors] = useState({});

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setEmail('');
    setName('');
    setPassword('');
    setLgpdChecked(false);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate email
    if (!email || !email.includes('@')) {
      newErrors.email = 'Insira um e-mail válido com @';
    }

    // Validate name if registering
    if (isRegister && (!name || name.trim().length < 3)) {
      newErrors.name = 'O nome deve conter pelo menos 3 caracteres';
    }

    // Validate password
    if (!password || password.length < 6) {
      newErrors.password = 'A senha deve conter no mínimo 6 caracteres';
    }

    // Validate LGPD if registering
    if (isRegister && !lgpdChecked) {
      newErrors.lgpd = 'Você deve aceitar a Política de Privacidade (LGPD) para continuar';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success login/register
    loginMockUser(email, isRegister ? name : email.split('@')[0]);
    handleClose();
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
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
              className="bg-brand-bg w-full max-w-md brutalist-border p-6 brutalist-shadow pointer-events-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-6">
                <h3 className="font-archivo text-xl uppercase leading-none flex items-center gap-2">
                  <Lock className="text-brand-red" size={20} />
                  {isRegister ? 'CADASTRAR CONTA' : 'ACESSAR MINHA CONTA'}
                </h3>
                <button
                  onClick={handleClose}
                  className="brutalist-border p-1 hover:bg-brand-red hover:text-white transition-colors cursor-pointer"
                  aria-label="Fechar"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 font-oswald text-sm font-bold uppercase">
                {isRegister && (
                  <div className="space-y-1">
                    <label className="block text-black">Nome Completo</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: João da Silva"
                      className={`w-full bg-white brutalist-border px-3 py-2 text-md placeholder-gray-400 focus:outline-none focus:bg-brand-yellow/10 transition-colors ${
                        errors.name ? 'border-brand-red' : ''
                      }`}
                    />
                    {errors.name && <p className="text-2xs text-brand-red font-semibold">{errors.name}</p>}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="block text-black">Endereço de E-mail</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ex: seuemail@email.com"
                    className={`w-full bg-white brutalist-border px-3 py-2 text-md placeholder-gray-400 focus:outline-none focus:bg-brand-yellow/10 transition-colors ${
                      errors.email ? 'border-brand-red' : ''
                    }`}
                  />
                  {errors.email && <p className="text-2xs text-brand-red font-semibold">{errors.email}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-black">Senha Secreta</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••"
                    className={`w-full bg-white brutalist-border px-3 py-2 text-md placeholder-gray-400 focus:outline-none focus:bg-brand-yellow/10 transition-colors ${
                      errors.password ? 'border-brand-red' : ''
                    }`}
                  />
                  {errors.password && <p className="text-2xs text-brand-red font-semibold">{errors.password}</p>}
                </div>

                {isRegister && (
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer normal-case">
                      <input
                        type="checkbox"
                        checked={lgpdChecked}
                        onChange={(e) => setLgpdChecked(e.target.checked)}
                        className="mt-1 shrink-0 accent-black brutalist-border"
                      />
                      <span className="text-2xs font-semibold font-jakarta text-gray-700 leading-normal flex items-start gap-1">
                        <ShieldCheck className="text-brand-red shrink-0" size={14} />
                        Li e concordo com os Termos de Privacidade e Proteção de Dados (LGPD) da Rede Raízes do Nordeste, autorizando o uso dos meus dados para fins de entrega e fidelidade.
                      </span>
                    </label>
                    {errors.lgpd && <p className="text-2xs text-brand-red font-semibold mt-1">{errors.lgpd}</p>}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-brand-red text-white brutalist-border py-3 font-black text-base uppercase hover:bg-black transition-colors brutalist-shadow cursor-pointer mt-4"
                >
                  {isRegister ? 'Confirmar Cadastro e Entrar' : 'Autenticar com Segurança'}
                </button>
              </form>

              {/* Toggles */}
              <div className="pt-4 border-t border-gray-300 mt-6 text-center font-oswald text-xs font-bold uppercase text-gray-500">
                {isRegister ? (
                  <p>
                    Já possui conta ativa?{' '}
                    <button
                      onClick={() => {
                        setIsRegister(false);
                        setErrors({});
                      }}
                      className="text-brand-red hover:underline cursor-pointer"
                    >
                      Fazer Login
                    </button>
                  </p>
                ) : (
                  <p>
                    Novo na rede Raízes?{' '}
                    <button
                      onClick={() => {
                        setIsRegister(true);
                        setErrors({});
                      }}
                      className="text-brand-red hover:underline cursor-pointer"
                    >
                      Cadastre-se Grátis
                    </button>
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
