import React from 'react';
import { useSelector } from 'react-redux';
import ContentCardDnD from './ContentCardDnD';

const FavoritesSection = ({ items, moveCard }) => {
  const favorites = useSelector((state) => state.user.favorites);
  const favItems = items.filter((it) => favorites.includes(it.id));

  if (favItems.length === 0) {
    return <p className="text-gray-500 dark:text-gray-300">No favorites yet.</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Favorites</h2>
      {favItems.map((item, idx) => (
        <ContentCardDnD key={item.id} item={item} index={idx} moveCard={moveCard} />
      ))}
    </div>
  );
};

export default FavoritesSection;
