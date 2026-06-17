import React, { createContext, useContext, useState } from 'react';
import { FRANCHISES } from '../constants';

const AppContext = createContext(undefined);

/**
 * AppProvider provides the global state for the Raízes do Nordeste application,
 * including shopping cart operations, ingredient customization (Five Guys style),
 * franchise locator state, and UI feedback systems like toasts and modals.
 */
export function AppProvider({ children }) {
  // Navigation & Category states
  const [activeCategory, setActiveCategory] = useState('cuscuz');

  // Shopping Cart state
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Customizer state (for toppings selection)
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [itemToCustomize, setItemToCustomize] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);

  // Franchise Locator state
  const [searchFranchise, setSearchFranchise] = useState('');
  const [franchiseList, setFranchiseList] = useState(FRANCHISES);

  // Bulk Booking state
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkStep, setBulkStep] = useState(1);
  const [bulkData, setBulkData] = useState({
    groupSize: '15-20',
    contactName: '',
    contactPhone: '',
    deliveryDate: '',
    comboChoice: 'Banquete Retado'
  });
  const [bulkSubmitted, setBulkSubmitted] = useState(false);

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // --- NEW MULTIDISCIPLINARY FRONTEND MOCK STATES ---
  // Auth state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('raizes_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isFidelityModalOpen, setIsFidelityModalOpen] = useState(false);

  // Franchise active state
  const [selectedFranchise, setSelectedFranchise] = useState(() => {
    const saved = localStorage.getItem('raizes_franchise');
    return saved ? JSON.parse(saved) : FRANCHISES[0];
  });

  // Channel simulator state (web, totem, app)
  const [activeChannel, setActiveChannel] = useState('web');

  // Checkout and Order simulation states
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(() => {
    const saved = localStorage.getItem('raizes_order');
    return saved ? JSON.parse(saved) : null;
  });

  // LGPD Privacy states
  const [cookieConsent, setCookieConsent] = useState(() => {
    return localStorage.getItem('raizes_cookie_consent') || 'pending';
  });
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  // --- END OF NEW STATES ---

  /**
   * Displays a toast notification on the bottom-left of the screen.
   * @param {string} msg - Message to display.
   */
  const showToastNotification = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // --- NEW MULTIDISCIPLINARY HELPERS ---
  const loginMockUser = (email, name) => {
    const mockUser = {
      name: name || 'Guerreiro do Sertão',
      email: email,
      points: 150
    };
    setUser(mockUser);
    localStorage.setItem('raizes_user', JSON.stringify(mockUser));
    showToastNotification(`Bem-vindo, ${mockUser.name}!`);
  };

  const logoutMockUser = () => {
    setUser(null);
    localStorage.removeItem('raizes_user');
    showToastNotification('Sessão encerrada.');
  };

  const changeFranchise = (franchise) => {
    setSelectedFranchise(franchise);
    localStorage.setItem('raizes_franchise', JSON.stringify(franchise));
    showToastNotification(`Quiosque selecionado: ${franchise.city}`);
  };

  const saveCookieConsent = (type) => {
    setCookieConsent(type);
    localStorage.setItem('raizes_cookie_consent', type);
    if (type === 'rejected') {
      setUser(null);
      localStorage.removeItem('raizes_user');
      localStorage.removeItem('raizes_order');
      setActiveOrder(null);
    }
  };

  const simulateOrderProgression = (orderId) => {
    const steps = ['received', 'preparing', 'ready', 'delivered'];
    let currentStepIdx = 0;

    const interval = setInterval(() => {
      currentStepIdx++;
      if (currentStepIdx < steps.length) {
        const nextStatus = steps[currentStepIdx];
        setActiveOrder(prev => {
          if (!prev || prev.id !== orderId) {
            clearInterval(interval);
            return prev;
          }
          const updated = { ...prev, status: nextStatus };
          localStorage.setItem('raizes_order', JSON.stringify(updated));
          return updated;
        });

        let statusMsg = '';
        if (nextStatus === 'preparing') statusMsg = 'Seu cuscuz entrou na chapa! Cozinha preparando...';
        else if (nextStatus === 'ready') statusMsg = 'Pedido pronto na copa! Aguardando retirada/entrega.';
        else if (nextStatus === 'delivered') {
          statusMsg = 'Pedido entregue com sucesso! Bom apetite!';
          clearInterval(interval);
        }
        showToastNotification(statusMsg);
      } else {
        clearInterval(interval);
      }
    }, 10000);
  };

  const submitOrder = (deliveryType, details, usedPoints) => {
    const finalTotal = getCartTotal() - (usedPoints ? usedPoints : 0);
    const orderId = `RZ-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderId,
      items: [...cart],
      total: Math.max(0, finalTotal),
      deliveryType,
      details,
      status: 'received',
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setActiveOrder(newOrder);
    localStorage.setItem('raizes_order', JSON.stringify(newOrder));
    setCart([]);
    setIsCartOpen(false);
    setIsCheckoutOpen(false);

    if (user) {
      let updatedPoints = user.points;
      if (usedPoints) updatedPoints -= usedPoints;
      // Regra de Negócio: 10% de cashback em pontos para os próximos pedidos (1 ponto = R$ 1,00)
      updatedPoints += Math.floor(Math.max(0, finalTotal) * 0.1);
      const updatedUser = { ...user, points: updatedPoints };
      setUser(updatedUser);
      localStorage.setItem('raizes_user', JSON.stringify(updatedUser));
    }

    showToastNotification(`Pedido ${orderId} enviado para a cozinha!`);
    simulateOrderProgression(orderId);
  };
  // --- END OF NEW HELPERS ---

  /**
   * Directly adds an item to the shopping cart, updating its quantity if it already exists.
   * @param {object} item - Menu item to add.
   */
  const addToCartDirectly = (item) => {
    const existing = cart.find(i => i.id === item.id && (!i.toppings || i.toppings.length === 0));
    if (existing) {
      setCart(cart.map(i => i.id === item.id && (!i.toppings || i.toppings.length === 0) ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, { ...item, quantity: 1, toppings: [] }]);
    }
    showToastNotification(`Adicionado: ${item.name}`);
  };

  /**
   * Opens the ingredients customizer modal for a specific customizable menu item.
   * @param {object} item - Menu item to customize.
   */
  const openCustomizeModal = (item) => {
    setItemToCustomize(item);
    setSelectedToppings([]);
    setIsCustomizerOpen(true);
  };

  /**
   * Confirms the selected toppings and adds the customized item to the cart.
   */
  const addCustomizedToCart = () => {
    if (!itemToCustomize) return;
    const totalToppingCost = selectedToppings.reduce((acc, curr) => acc + curr.price, 0);
    const customizedItem = {
      ...itemToCustomize,
      id: `${itemToCustomize.id}-${Date.now()}`,
      price: itemToCustomize.price + totalToppingCost,
      toppings: selectedToppings.map(t => t.name),
      quantity: 1
    };
    setCart([...cart, customizedItem]);
    setIsCustomizerOpen(false);
    setItemToCustomize(null);
    showToastNotification(`Adicionado com adicionais: ${customizedItem.name}`);
  };

  /**
   * Toggles the selection of a topping during customization.
   * @param {object} topping - The topping to toggle.
   */
  const toggleTopping = (topping) => {
    if (selectedToppings.find(t => t.name === topping.name)) {
      setSelectedToppings(selectedToppings.filter(t => t.name !== topping.name));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  /**
   * Updates the quantity of a specific cart item index by a given amount.
   * @param {number} itemIndex - Cart item index to modify.
   * @param {number} amount - Increment (positive) or decrement (negative) value.
   */
  const updateCartQuantity = (itemIndex, amount) => {
    const updated = [...cart];
    updated[itemIndex].quantity += amount;
    if (updated[itemIndex].quantity <= 0) {
      updated.splice(itemIndex, 1);
    }
    setCart(updated);
  };

  /**
   * Calculates the grand total cost of all items in the shopping cart.
   * @returns {number} The total cost.
   */
  const getCartTotal = () => {
    return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  };

  /**
   * Handles search filtering for franchises.
   * @param {string} term - Search query.
   */
  const handleFranchiseSearch = (term) => {
    setSearchFranchise(term);
    if (term.trim() === '') {
      setFranchiseList(FRANCHISES);
    } else {
      const filtered = FRANCHISES.filter(f =>
        f.city.toLowerCase().includes(term.toLowerCase()) ||
        f.address.toLowerCase().includes(term.toLowerCase())
      );
      setFranchiseList(filtered);
    }
  };

  /**
   * Handles the multi-step bulk booking form submission.
   */
  const handleBulkSubmit = (e) => {
    e.preventDefault();
    setBulkSubmitted(true);
    setTimeout(() => {
      setIsBulkModalOpen(false);
      setBulkSubmitted(false);
      setBulkStep(1);
      showToastNotification("Orçamento Coletivo solicitado com sucesso!");
    }, 3000);
  };

  return (
    <AppContext.Provider value={{
      activeCategory,
      setActiveCategory,
      cart,
      setCart,
      isCartOpen,
      setIsCartOpen,
      isCustomizerOpen,
      setIsCustomizerOpen,
      itemToCustomize,
      setItemToCustomize,
      selectedToppings,
      setSelectedToppings,
      searchFranchise,
      franchiseList,
      handleFranchiseSearch,
      isBulkModalOpen,
      setIsBulkModalOpen,
      bulkStep,
      setBulkStep,
      bulkData,
      setBulkData,
      bulkSubmitted,
      handleBulkSubmit,
      toastMessage,
      showToast,
      showToastNotification,
      addToCartDirectly,
      openCustomizeModal,
      addCustomizedToCart,
      toggleTopping,
      updateCartQuantity,
      getCartTotal,
      // Pass the new mock multidisciplinary values
      user,
      setUser,
      isAuthModalOpen,
      setIsAuthModalOpen,
      isFidelityModalOpen,
      setIsFidelityModalOpen,
      selectedFranchise,
      setSelectedFranchise,
      changeFranchise,
      activeChannel,
      setActiveChannel,
      isCheckoutOpen,
      setIsCheckoutOpen,
      activeOrder,
      setActiveOrder,
      cookieConsent,
      saveCookieConsent,
      isPrivacyModalOpen,
      setIsPrivacyModalOpen,
      loginMockUser,
      logoutMockUser,
      submitOrder
    }}>
      {children}
    </AppContext.Provider>
  );
}

/**
 * Custom React hook to consume the AppContext states and functions.
 */
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
