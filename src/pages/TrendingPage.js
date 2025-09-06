
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';


const TrendingPage = ({ moveCard }) => {
  const { t } = useTranslation();
  const { items, status } = useSelector((state) => state.content);
  const trendingNews = items.filter(i => i.type === 'news').slice(0, 3);
  const trendingMovies = items.filter(i => i.type === 'movie').slice(0, 3);
  const trendingTweets = items.filter(i => i.type === 'twitter').slice(0, 3);
  const trendingSocial = items.filter(i => i.type === 'social').slice(0, 3);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center py-8">
        <span className="loader animate-spin inline-block w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full"></span>
      </div>
    );
  }
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{t('trending')}</h2>
      <div>
        <h3 className="text-xl font-semibold mb-2 text-blue-600">{t('topNews') || 'Top News'}</h3>
        {trendingNews.length === 0 ? <p className="text-gray-500">{t('noTrendingNews') || 'No trending news.'}</p> : trendingNews.map((item, idx) => (
          <div key={item.id} className="mb-4">
            <TrendingCard item={item} index={idx} moveCard={moveCard} />
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2 text-sky-600">{t('topTweets') || 'Top Tweets'}</h3>
        {trendingTweets.length === 0 ? <p className="text-gray-500">{t('noTrendingTweets') || 'No trending tweets.'}</p> : trendingTweets.map((item, idx) => (
          <div key={item.id} className="mb-4">
            <TrendingCard item={item} index={idx} moveCard={moveCard} />
          </div>
        ))}
      </div>
    </div>
  );
};

// Simple card for trending (reuse ContentCardDnD if you want drag, or just a static card)
import ContentCardDnD from '../components/ContentCardDnD';
const TrendingCard = ContentCardDnD;

export default TrendingPage;
