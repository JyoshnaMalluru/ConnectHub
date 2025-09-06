
import React from 'react';
import FavoritesSection from '../components/FavoritesSection';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
const FavoritesPage = ({ moveCard }) => {
  const { t } = useTranslation();
  const { items, status } = useSelector((state) => state.content);
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center py-8">
        <span className="loader animate-spin inline-block w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full"></span>
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Favorites</h2>
      <FavoritesSection items={items} moveCard={moveCard} />
    </div>
  );
};

export default FavoritesPage;
