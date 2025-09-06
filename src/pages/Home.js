import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ContentCardDnD from '../components/ContentCardDnD';
import FavoritesSection from '../components/FavoritesSection';
import TrendingSection from '../components/TrendingSection';
import { fetchNews } from '../features/contentSlice';
import { useDebounce } from '../hooks/useDebounce';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.content);
  const preferences = useSelector((state) => state.user.preferences);

  const [itemsOrder, setItemsOrder] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState('');
  const debounced = useDebounce(search, 500);

  useEffect(() => {
    dispatch(fetchNews(preferences));
  }, [dispatch, preferences]);

  useEffect(() => {
    setItemsOrder(items);
    setDisplayed(items.slice(0, 10));
  }, [items]);

  useEffect(() => {
    if (!debounced) {
      setDisplayed(itemsOrder.slice(0, 10));
    } else {
      const filtered = itemsOrder.filter((it) =>
        (it.title || '').toLowerCase().includes(debounced.toLowerCase())
      );
      setDisplayed(filtered.slice(0, 10));
    }
  }, [debounced, itemsOrder]);

  const moveCard = (dragIndex, hoverIndex) => {
    const updated = [...itemsOrder];
    const [removed] = updated.splice(dragIndex, 1);
    updated.splice(hoverIndex, 0, removed);
    setItemsOrder(updated);
    setDisplayed(updated.slice(0, displayed.length));
  };

  const loadMore = () => {
    setTimeout(() => {
      setDisplayed(itemsOrder.slice(0, displayed.length + 10));
    }, 250);
  };

  const filteredAll = debounced
    ? itemsOrder.filter((it) => (it.title || '').toLowerCase().includes(debounced.toLowerCase()))
    : itemsOrder;

  return (
    <div className="flex">
      <aside className="sticky top-0 h-screen">
        <Sidebar />
      </aside>
      <div className="flex-1 flex flex-col">
        <div className="sticky top-0 z-50">
          <Header searchTerm={search} setSearchTerm={setSearch} />
        </div>
        <main className="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
          {status === 'loading' && <p>Loading...</p>}
          {status === 'failed' && <p>Failed to load content.</p>}

          {displayed.length === 0 && status !== 'loading' && <p>No content found.</p>}

          <InfiniteScroll
            dataLength={displayed.length}
            next={loadMore}
            hasMore={displayed.length < filteredAll.length}
            loader={<h4>Loading more...</h4>}
          >
            {displayed.map((item, idx) => (
              <ContentCardDnD key={item.id} item={item} index={idx} moveCard={moveCard} />
            ))}
          </InfiniteScroll>
          <TrendingSection items={filteredAll} moveCard={moveCard} />
          <FavoritesSection items={filteredAll} moveCard={moveCard} />
        </main>
      </div>
    </div>
  );
};

export default Home;
