import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      ContentHub: 'ContentHub',
      myName: 'Malluru Venkata Nagasai Jyoshna',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      username: 'Jyoshna',
      welcome: 'Welcome to ContentHub!',
      login: 'Login',
      logout: 'Logout',
      feed: 'Feed',
      trending: 'Trending',
      favorites: 'Favorites',
      settings: 'Settings',
      topNews: 'Top News',
      noTrendingNews: 'No trending news.',
      topMovies: 'Top Movies',
      noTrendingMovies: 'No trending movies.',
      topTweets: 'Top Tweets',
      noTrendingTweets: 'No trending tweets.',
      topSocialPosts: 'Top Social Posts',
      noTrendingSocial: 'No trending social posts.',
      search: 'Search',
      loadMore: 'Load More',
      noFavoritesYet: 'No favorites yet.',
      savePreferences: 'Preferences saved!',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      readMore: 'Read More',
      errorLoading: 'Failed to load content.',
      noContentFound: 'No content found.',
    }
  },
  hi: {
    translation: {
      ContentHub: 'कंटेंटहब',
      myName: 'मल्लूरु वेणकट नागासाई ज्योष्णा',
      darkMode: 'डार्क मोड',
      lightMode: 'लाइट मोड',
      username: 'ज्योष्णा',
      welcome: 'ContentHub में आपका स्वागत है!',
      login: 'लॉग इन करें',
      logout: 'लॉग आउट',
      feed: 'फ़ीड',
      trending: 'ट्रेंडिंग',
      favorites: 'पसंदीदा',
      settings: 'सेटिंग्स',
      topNews: 'शीर्ष समाचार',
      noTrendingNews: 'कोई ट्रेंडिंग समाचार नहीं।',
      topMovies: 'शीर्ष फ़िल्में',
      noTrendingMovies: 'कोई ट्रेंडिंग फ़िल्में नहीं।',
      topTweets: 'शीर्ष ट्वीट्स',
      noTrendingTweets: 'कोई ट्रेंडिंग ट्वीट्स नहीं।',
      topSocialPosts: 'शीर्ष सोशल पोस्ट्स',
      noTrendingSocial: 'कोई ट्रेंडिंग सोशल पोस्ट्स नहीं।',
      search: 'खोज',
      loadMore: 'और लोड करें',
      noFavoritesYet: 'अभी तक कोई पसंदीदा नहीं।',
      savePreferences: 'प्राथमिकताएँ सेव हो गईं!',
      darkMode: 'डार्क मोड',
      lightMode: 'लाइट मोड',
      readMore: 'आगे पढ़ें',
      errorLoading: 'सामग्री लोड करने में विफल।',
      noContentFound: 'कोई सामग्री नहीं मिली।',
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
