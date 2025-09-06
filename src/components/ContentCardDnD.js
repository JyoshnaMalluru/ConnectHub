import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { motion } from 'framer-motion';
import { addFavorite, removeFavorite } from '../features/userSlice';
import { useTranslation } from 'react-i18next';

const ContentCardDnD = ({ item, index, moveCard }) => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.user.favorites);
  const isFav = favorites.includes(item.id);
  console.log('Rendering ContentCardDnD for item:', item.id, 'at index:', index);
  const [, drop] = useDrop({
    accept: 'CARD',
    hover(dragged) {
      if (!ref.current || dragged.index === index) return;
      moveCard(dragged.index, index);
      dragged.index = index;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  drag(drop(ref));

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      whileHover={{ scale: 1.01 }}
      className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 mb-4 cursor-move"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <img
        src={item.image || 'https://placehold.co/800x450?text=ContentHub'}
        alt={item.title}
        className="w-full h-48 object-cover rounded-md mb-3"
        onError={e => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x450?text=ContentHub'; }}
      />
      <h3 className="font-semibold text-lg dark:text-white mb-1">{item.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{item.description}</p>
      {item.author && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">By {item.author}</p>
      )}
      {item.source && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Source: {item.source}</p>
      )}
      {item.published_at && (
        <p className="text-xs text-gray-400 mb-1">Published: {new Date(item.published_at).toLocaleString()}</p>
      )}
      <div className="mt-3 flex justify-between items-center">
        <a
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:underline"
        >
          Read More
        </a>
        <button
          onClick={() => dispatch(isFav ? removeFavorite(item.id) : addFavorite(item.id))}
          className={`px-3 py-1 rounded ${isFav ? 'bg-rose-500 text-white' : 'bg-blue-500 text-white'}`}
        >
          {isFav ? 'Unfavorite' : 'Favorite'}
        </button>
      </div>
    </motion.div>
  );
};

export default ContentCardDnD;