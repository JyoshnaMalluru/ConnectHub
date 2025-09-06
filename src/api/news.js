export async function fetchNews(category = 'general') {
  try {
    const response = await fetch(`http://localhost:5000/api/news?category=${category}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    if (data && data.data) {
        console.log(data.data);
      return data.data.map((article, i) => ({
        id: `${category}-news-${i}`,
        title: article.title,
        description: article.description || '',
        image: article.image || 'https://placehold.co/800x450?text=ContentHub',
        url: article.url,
        source: article.source,
        author: article.author,
        published_at: article.published_at,
        type: 'news',
      }));
    }
    throw new Error('No data returned from NewsAPI');
  } catch (error) {
    console.error('NewsAPI fetch failed, using mock data:', error.message);
    return Array.from({ length: 10 }).map((_, i) => ({
      id: `${category}-news-mock-${i}`,
      title: `Sample ${category} article #${i + 1}`,
      description: 'This is a mock description used when NewsAPI is not configured.',
      image: 'https://placehold.co/800x450?text=ContentHub+Mock',
      url: '#',
      type: 'news',
    }));
  }
}
