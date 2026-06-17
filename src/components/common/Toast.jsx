import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Toast() {
  const { showToast, toastMessage } = useApp();

  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-6 left-6 z-50 bg-black text-white brutalist-border p-4 brutalist-shadow flex items-center gap-3"
        >
          <div className="bg-brand-yellow text-black brutalist-border p-1">
            <Check size={16} />
          </div>
          <span className="font-oswald font-black uppercase text-xs md:text-sm tracking-wider">
            {toastMessage}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
