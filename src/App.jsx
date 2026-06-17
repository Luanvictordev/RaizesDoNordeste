import React from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import PromoSection from './components/sections/PromoSection';
import MenuSection from './components/sections/MenuSection';
import AboutUsSection from './components/sections/AboutUsSection';
import FranchiseSection from './components/sections/FranchiseSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/layout/Footer';
import Toast from './components/common/Toast';
import CartDrawer from './components/cart/CartDrawer';
import IngredientsCustomizer from './components/menu/IngredientsCustomizer';
import BulkBuyModal from './components/bulk/BulkBuyModal';

// Multidisciplinary Frontend Additions
import AuthModal from './components/forms/AuthModal';
import FidelityModal from './components/forms/FidelityModal';
import CheckoutModal from './components/cart/CheckoutModal';
import LgpdBanner from './components/lgpd/LgpdBanner';
import PrivacyCenterModal from './components/lgpd/PrivacyCenterModal';
import OrderTracker from './components/order/OrderTracker';

/**
 * Root Application Component.
 * Wraps the entire layout with AppProvider to manage global states
 * and aggregates the structural sections of Raízes do Nordeste.
 */
function MainApp() {
  return (
    <div className="min-h-screen bg-brand-bg font-jakarta selection:bg-brand-red selection:text-white pb-0">
      <Header />
      <Navbar />
      
      <main>
        <Hero />
        <PromoSection />
        <MenuSection />
        <AboutUsSection />
        <FranchiseSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Global UI Components */}
      <Toast />
      <CartDrawer />
      <IngredientsCustomizer />
      <BulkBuyModal />
      <AuthModal />
      <FidelityModal />
      <CheckoutModal />
      <LgpdBanner />
      <PrivacyCenterModal />
      <OrderTracker />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
