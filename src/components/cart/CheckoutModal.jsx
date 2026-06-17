import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Gift, CreditCard, ShieldCheck, Copy, ArrowLeft, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    user,
    getCartTotal,
    submitOrder,
    showToastNotification
  } = useApp();

  const [step, setStep] = useState(1);
  const [deliveryType, setDeliveryType] = useState('delivery'); // 'delivery' | 'pickup'
  
  // Form states
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [usePoints, setUsePoints] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('pix'); // 'pix' | 'card'

  // Card details states
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Sandbox simulation states
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const cartTotal = getCartTotal();
  const pointsAvailable = user ? user.points : 0;
  const pointsToUse = Math.min(pointsAvailable, Math.floor(cartTotal)); // Limit usage to integer cartTotal
  const discountAmount = pointsToUse; // R$ 1.00 per point
  const finalTotal = cartTotal - (usePoints ? discountAmount : 0);

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep(1);
    setDeliveryType('delivery');
    setAddress('');
    setPhone('');
    setTableNumber('');
    setUsePoints(false);
    setPaymentMethod('pix');
    setCardNumber('');
    setCardName('');
    setCardExpiry('');
    setCardCvv('');
    setIsProcessingPayment(false);
    setPaymentSuccess(false);
    setErrors({});
  };

  const handleNextStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (deliveryType === 'delivery') {
        if (!address.trim()) newErrors.address = 'O endereço de entrega é obrigatório';
        if (!phone.trim()) newErrors.phone = 'O número de celular é obrigatório';
      } else {
        if (!tableNumber.trim()) newErrors.tableNumber = 'Informe o número da mesa ou nome para retirada';
      }
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setStep(prev => prev + 1);
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText("00020126580014BR.GOV.BCB.PIX0136raizesnordeste-pix-gateway-ficticio520400005303986540510.005802BR5925RAIZES_NORDESTE_FRANQUIA6009RECIFE_PE62070503RZ1");
    showToastNotification("Código Copie e Cole do PIX copiado para a área de transferência!");
  };

  const handleConfirmOrder = () => {
    const newErrors = {};
    if (paymentMethod === 'card') {
      if (cardNumber.replace(/\s/g, '').length < 16) {
        newErrors.cardNumber = 'Cartão inválido (mínimo 16 dígitos)';
      }
      if (!cardName.trim()) {
        newErrors.cardName = 'Nome no cartão é obrigatório';
      }
      if (cardExpiry.length < 5) {
        newErrors.cardExpiry = 'Validade incorreta (MM/AA)';
      }
      if (cardCvv.length < 3) {
        newErrors.cardCvv = 'CVV inválido';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsProcessingPayment(true);

    // Simulate redirection & payment gateway processing (RaízesPay)
    setTimeout(() => {
      setPaymentSuccess(true);
      setTimeout(() => {
        const details = deliveryType === 'delivery' 
          ? `Entrega: ${address} | Celular: ${phone}` 
          : `Retirada Local / Mesa: ${tableNumber}`;
        
        submitOrder(deliveryType, details, usePoints ? pointsToUse : 0);
        handleClose();
      }, 1500);
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
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
              className="bg-brand-bg w-full max-w-lg brutalist-border p-5 md:p-6 brutalist-shadow pointer-events-auto overflow-y-auto max-h-[90vh] relative"
            >
              {/* Payment Processing Sandbox Overlay */}
              {isProcessingPayment && (
                <div className="absolute inset-0 bg-white z-50 flex flex-col items-center justify-center p-6 text-center select-none">
                  {!paymentSuccess ? (
                    <div className="space-y-6">
                      <div className="w-16 h-16 border-4 border-black border-t-brand-red rounded-full animate-spin mx-auto"></div>
                      <div className="bg-brand-yellow text-black brutalist-border px-3 py-1.5 font-oswald text-xs font-bold uppercase tracking-wider mx-auto w-fit flex items-center gap-1.5 justify-center">
                        <Lock size={12} className="text-black shrink-0" />
                        <span>GATEWAY SEGURO EXTERNO: RAIZESPAY</span>
                      </div>
                      <h4 className="font-archivo text-xl text-black uppercase leading-tight">
                        PROCESSANDO TRANSAÇÃO FINANCEIRA...
                      </h4>
                      <p className="font-jakarta text-xs text-gray-500 font-semibold max-w-sm leading-relaxed">
                        Conectando de forma segura ao serviço bancário externo para autorização do pagamento. Por favor, aguarde.
                      </p>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="space-y-4 text-green-700"
                    >
                      <div className="w-20 h-20 bg-green-100 text-green-600 brutalist-border rounded-full flex items-center justify-center mx-auto brutalist-shadow">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h4 className="font-archivo text-2xl uppercase font-black text-black">
                        PAGAMENTO AUTORIZADO!
                      </h4>
                      <p className="font-oswald text-sm font-bold uppercase text-gray-500">
                        Transação processada com sucesso no RaízesPay.
                      </p>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b-2 border-black mb-5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-brand-red animate-pulse" size={24} />
                  <h3 className="font-archivo text-lg sm:text-xl uppercase leading-none">
                    FECHAMENTO DO PEDIDO
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

              {/* Steps Indicator */}
              <div className="flex justify-between items-center gap-2 font-oswald text-2xs sm:text-xs font-bold uppercase text-gray-400 mb-6 border-b border-gray-200 pb-2">
                <span className={step >= 1 ? 'text-brand-red' : ''}>1. Dados de Envio</span>
                <span>➔</span>
                <span className={step >= 2 ? 'text-brand-red' : ''}>2. Fidelização</span>
                <span>➔</span>
                <span className={step >= 3 ? 'text-brand-red' : ''}>3. Pagamento Seguro</span>
              </div>

              {/* Form content */}
              <div className="min-h-[220px] mb-6">
                {step === 1 && (
                  <div className="space-y-4 font-oswald text-xs sm:text-sm font-bold uppercase text-black">
                    <label className="block text-xs text-gray-500 mb-2">TIPO DE PEDIDO:</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => {
                          setDeliveryType('delivery');
                          setErrors({});
                        }}
                        className={`py-3.5 px-4 brutalist-border flex items-center justify-center gap-2 transition-colors cursor-pointer brutalist-shadow ${
                          deliveryType === 'delivery' ? 'bg-brand-yellow text-black' : 'bg-white text-gray-500'
                        }`}
                      >
                        <MapPin size={16} />
                        Entrega / Delivery
                      </button>
                      <button
                        onClick={() => {
                          setDeliveryType('pickup');
                          setErrors({});
                        }}
                        className={`py-3.5 px-4 brutalist-border flex items-center justify-center gap-2 transition-colors cursor-pointer brutalist-shadow ${
                          deliveryType === 'pickup' ? 'bg-brand-yellow text-black' : 'bg-white text-gray-500'
                        }`}
                      >
                        <Gift size={16} />
                        Quiosque / Mesa
                      </button>
                    </div>

                    {deliveryType === 'delivery' ? (
                      <div className="space-y-3 pt-4 border-t border-dashed border-gray-300">
                        <div className="space-y-1">
                          <label className="block">Endereço de Entrega</label>
                          <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Ex: Av. Boa Viagem, 2000 - Apto 101"
                            className={`w-full bg-white brutalist-border px-3 py-2 text-md placeholder-gray-400 focus:outline-none transition-colors ${
                              errors.address ? 'border-brand-red' : ''
                            }`}
                          />
                          {errors.address && <p className="text-2xs text-brand-red font-semibold">{errors.address}</p>}
                        </div>

                        <div className="space-y-1">
                          <label className="block">Telefone Celular (WhatsApp)</label>
                          <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Ex: (81) 98888-7777"
                            className={`w-full bg-white brutalist-border px-3 py-2 text-md placeholder-gray-400 focus:outline-none transition-colors ${
                              errors.phone ? 'border-brand-red' : ''
                            }`}
                          />
                          {errors.phone && <p className="text-2xs text-brand-red font-semibold">{errors.phone}</p>}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 pt-4 border-t border-dashed border-gray-300">
                        <div className="space-y-1">
                          <label className="block">Número da Mesa ou Nome do Quiosque</label>
                          <input
                            type="text"
                            value={tableNumber}
                            onChange={(e) => setTableNumber(e.target.value)}
                            placeholder="Ex: Mesa 12 ou Retirada Quiosque Recife"
                            className={`w-full bg-white brutalist-border px-3 py-2 text-md placeholder-gray-400 focus:outline-none transition-colors ${
                              errors.tableNumber ? 'border-brand-red' : ''
                            }`}
                          />
                          {errors.tableNumber && <p className="text-2xs text-brand-red font-semibold">{errors.tableNumber}</p>}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5 font-oswald text-xs sm:text-sm font-bold uppercase text-black">
                    <span className="block text-xs text-gray-500 mb-2">RECOMPENSAS E FIDELIDADE:</span>

                    {user ? (
                      <div className="bg-white brutalist-border p-4 space-y-4 brutalist-shadow">
                        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                          <div>
                            <span className="text-gray-500 block text-2xs leading-none">CLIENTE ATIVO</span>
                            <span className="text-sm font-black text-black leading-normal">{user.name}</span>
                          </div>
                          <div className="bg-brand-yellow px-2.5 py-1 text-black text-xs font-black border-2 border-black">
                            {user.points} Pontos
                          </div>
                        </div>

                        {pointsAvailable >= 5 ? (
                          <div className="space-y-2">
                            <p className="font-jakarta text-2xs text-gray-500 font-semibold normal-case leading-relaxed">
                              Cada ponto vale R$ 1,00 de desconto real! Você pode aplicar até {pointsToUse} pontos (R$ {discountAmount.toFixed(2)} de desconto) neste pedido.
                            </p>
                            <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-brand-bg brutalist-border">
                              <input
                                type="checkbox"
                                checked={usePoints}
                                onChange={(e) => setUsePoints(e.target.checked)}
                                className="w-5 h-5 accent-black text-black"
                              />
                              <span className="text-xs font-black">
                                Usar {pointsToUse} pontos para R$ {discountAmount.toFixed(2)} de desconto!
                              </span>
                            </label>
                          </div>
                        ) : (
                          <p className="font-jakarta text-2xs text-brand-red font-semibold normal-case">
                            ⚠️ Saldo insuficiente para resgate. Acumule 5 pontos ou mais para começar a resgatar prêmios!
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="bg-white brutalist-border p-5 text-center brutalist-shadow">
                        <p className="text-sm text-gray-500 font-bold mb-3">
                          FAÇA LOGIN PARA PARTICIPAR DO PROGRAMA DE FIDELIDADE
                        </p>
                        <p className="font-jakarta text-2xs text-gray-400 font-semibold normal-case mb-4">
                          Clientes cadastrados acumulam pontos a cada cuscuz pedido e podem trocá-los por descontos e combos especiais!
                        </p>
                      </div>
                    )}

                    <div className="bg-white brutalist-border p-4 space-y-1.5 text-xs font-black">
                      <div className="flex justify-between text-gray-500">
                        <span>Valor dos itens:</span>
                        <span>R$ {cartTotal.toFixed(2)}</span>
                      </div>
                      {usePoints && (
                        <div className="flex justify-between text-brand-red">
                          <span>Desconto fidelidade ({pointsToUse} pts):</span>
                          <span>- R$ {discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-black text-base border-t border-dashed border-gray-300 pt-2 font-black">
                        <span>Total Final:</span>
                        <span>R$ {finalTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4 font-oswald text-xs sm:text-sm font-bold uppercase text-black">
                    <span className="block text-xs text-gray-500 mb-2">MÉTODO DE PAGAMENTO EXTERNO:</span>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => {
                          setPaymentMethod('pix');
                          setErrors({});
                        }}
                        className={`py-3 px-4 brutalist-border flex items-center justify-center gap-2 transition-colors cursor-pointer brutalist-shadow ${
                          paymentMethod === 'pix' ? 'bg-brand-yellow text-black' : 'bg-white text-gray-500'
                        }`}
                      >
                        <CreditCard size={16} />
                        PIX Instantâneo
                      </button>
                      <button
                        onClick={() => {
                          setPaymentMethod('card');
                          setErrors({});
                        }}
                        className={`py-3 px-4 brutalist-border flex items-center justify-center gap-2 transition-colors cursor-pointer brutalist-shadow ${
                          paymentMethod === 'card' ? 'bg-brand-yellow text-black' : 'bg-white text-gray-500'
                        }`}
                      >
                        <CreditCard size={16} />
                        Cartão de Crédito
                      </button>
                    </div>

                    {paymentMethod === 'pix' ? (
                      <div className="bg-white brutalist-border p-4 flex flex-col items-center justify-center text-center gap-4 brutalist-shadow">
                        <div className="bg-brand-bg brutalist-border p-2 rounded">
                          {/* Draw a gorgeous procedural brutalist QR code */}
                          <div className="w-32 h-32 bg-black flex flex-wrap p-2 gap-1 justify-center items-center">
                            {Array.from({ length: 49 }).map((_, i) => (
                              <div
                                key={i}
                                className={`w-3.5 h-3.5 border border-white ${
                                  (i % 3 === 0 || i % 7 === 0 || i < 10 || i > 39) ? 'bg-white' : 'bg-black'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="font-oswald text-xs font-black leading-tight">
                            VALOR DO PEDIDO: <span className="text-brand-red text-sm font-black">R$ {finalTotal.toFixed(2)}</span>
                          </p>
                          <p className="font-jakarta text-[10px] text-gray-500 font-semibold normal-case leading-normal max-w-xs">
                            Escaneie o QR Code acima ou clique no botão para copiar a chave Pix Copia e Cole fictícia e pagar no aplicativo do seu banco.
                          </p>
                        </div>

                        <button
                          onClick={handleCopyPix}
                          className="bg-black text-white brutalist-border py-2.5 px-4 font-bold text-xs uppercase hover:bg-brand-red transition-colors brutalist-shadow cursor-pointer flex items-center gap-2"
                        >
                          <Copy size={12} />
                          Copiar Código PIX
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3 pt-3 border-t border-dashed border-gray-300">
                        <div className="space-y-1">
                          <label className="block">Nome Impresso no Cartão</label>
                          <input
                            type="text"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            placeholder="Ex: JOAO SILVA"
                            className={`w-full bg-white brutalist-border px-3 py-2 text-md placeholder-gray-400 focus:outline-none transition-colors uppercase ${
                              errors.cardName ? 'border-brand-red' : ''
                            }`}
                          />
                          {errors.cardName && <p className="text-2xs text-brand-red font-semibold">{errors.cardName}</p>}
                        </div>

                        <div className="space-y-1">
                          <label className="block">Número do Cartão de Crédito</label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => {
                              const v = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                              setCardNumber(v.substring(0, 19));
                            }}
                            placeholder="0000 0000 0000 0000"
                            className={`w-full bg-white brutalist-border px-3 py-2 text-md placeholder-gray-400 focus:outline-none transition-colors ${
                              errors.cardNumber ? 'border-brand-red' : ''
                            }`}
                          />
                          {errors.cardNumber && <p className="text-2xs text-brand-red font-semibold">{errors.cardNumber}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="block">Validade (MM/AA)</label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => {
                                const v = e.target.value.replace(/\D/g, '').replace(/(.{2})/g, '$1/').trim();
                                setCardExpiry(v.substring(0, 5));
                              }}
                              placeholder="12/28"
                              className={`w-full bg-white brutalist-border px-3 py-2 text-md placeholder-gray-400 focus:outline-none transition-colors ${
                                errors.cardExpiry ? 'border-brand-red' : ''
                              }`}
                            />
                            {errors.cardExpiry && <p className="text-2xs text-brand-red font-semibold">{errors.cardExpiry}</p>}
                          </div>
                          <div className="space-y-1">
                            <label className="block">Código CVV</label>
                            <input
                              type="text"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                              placeholder="123"
                              className={`w-full bg-white brutalist-border px-3 py-2 text-md placeholder-gray-400 focus:outline-none transition-colors ${
                                errors.cardCvv ? 'border-brand-red' : ''
                              }`}
                            />
                            {errors.cardCvv && <p className="text-2xs text-brand-red font-semibold">{errors.cardCvv}</p>}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Navigation Actions */}
              <div className="pt-4 border-t border-gray-300 mt-6 flex justify-between font-oswald text-xs font-black uppercase tracking-wider gap-4">
                {step > 1 ? (
                  <button
                    onClick={() => setStep(prev => prev - 1)}
                    className="bg-white text-black brutalist-border py-3 px-6 hover:bg-gray-100 transition-colors brutalist-shadow cursor-pointer flex items-center gap-1.5"
                  >
                    <ArrowLeft size={16} />
                    Voltar
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    onClick={handleNextStep}
                    className="bg-brand-red text-white brutalist-border py-3 px-8 hover:bg-black transition-colors brutalist-shadow cursor-pointer flex-1 text-center"
                  >
                    Avançar Etapa
                  </button>
                ) : (
                  <button
                    onClick={handleConfirmOrder}
                    className="bg-brand-red text-white brutalist-border py-3 px-8 hover:bg-black transition-colors brutalist-shadow cursor-pointer flex-1 text-center"
                  >
                    Enviar e Pagar via Gateway
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
