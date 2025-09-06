import React from 'react';
import ContentCardDnD from './ContentCardDnD';

const TrendingSection = ({ items, moveCard }) => {
  const trending = items.slice(0, 5);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Trending</h2>
      {trending.map((item, idx) => (
        <ContentCardDnD key={item.id} item={item} index={idx} moveCard={moveCard} />
      ))}
    </div>
  );
};

export default TrendingSection;
