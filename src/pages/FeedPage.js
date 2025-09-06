import React, { useEffect } from 'react';
import ContentCardDnD from '../components/ContentCardDnD';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUnifiedContent } from '../features/contentSlice';
import { useTranslation } from 'react-i18next';
const FeedPage = ({ moveCard, searchTerm }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.content);
  const preferences = useSelector((state) => state.user.preferences);
  const [displayed, setDisplayed] = React.useState([]);

  useEffect(() => {
    dispatch(fetchUnifiedContent(preferences));
  }, [dispatch, preferences]);

  useEffect(() => {
    setDisplayed(items.slice(0, 10));
  }, [items]);

  useEffect(() => {
    if (!searchTerm) {
      setDisplayed(items.slice(0, 10));
    } else {
      const filtered = items.filter((it) => (it.title || '').toLowerCase().includes(searchTerm.toLowerCase()));
      setDisplayed(filtered.slice(0, 10));
    }
  }, [searchTerm, items]);

  const loadMore = () => {
    setTimeout(() => {
      setDisplayed(items.slice(0, displayed.length + 10));
    }, 250);
  };

  return (
    <div>
      {status === 'loading' && (
        <div className="flex justify-center items-center py-8">
          <span className="loader animate-spin inline-block w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full"></span>
        </div>
      )}
      {status === 'failed' && <p>Failed to load content.</p>}
      <InfiniteScroll
        dataLength={displayed.length}
        next={loadMore}
        hasMore={displayed.length < items.length}
        loader={
          <div className="flex justify-center items-center py-4">
            <span className="loader animate-spin inline-block w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full"></span>
          </div>
        }
      >
        {displayed.map((item, idx) => (
          <ContentCardDnD key={item.id} item={item} index={idx} moveCard={moveCard} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default FeedPage;
