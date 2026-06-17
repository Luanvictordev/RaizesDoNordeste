import React from 'react';
import CareersForm from '../forms/CareersForm';
import ContactForm from '../forms/ContactForm';

export default function ContactSection() {
  return (
    <section id="contato" className="py-16 bg-brand-bg relative">
      {/* Authentic top paper torn border filled with #f6f6f6, overlapping the white encontre section */}
      <div className="absolute top-0 left-0 right-0 h-3 paper-border-top -translate-y-2 z-20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <CareersForm />
          <ContactForm />
        </div>
      </div>

      {/* Authentic bottom paper torn border filled with #f6f6f6, overlapping the white return to top section */}
      <div className="absolute bottom-0 left-0 right-0 h-3 paper-border-bottom translate-y-2 z-20 pointer-events-none"></div>
    </section>
  );
}
