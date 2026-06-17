import React from 'react';
import { useApp } from '../../context/AppContext';
import { MENU_DATA } from '../../constants';
import MenuItemCard from './MenuItemCard';

export default function MenuGrid() {
  const { activeCategory } = useApp();

  const items = MENU_DATA[activeCategory] || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
