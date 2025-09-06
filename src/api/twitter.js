export async function fetchTwitterPosts(hashtag = 'news') {
  try {
    const response = await fetch(
      `http://localhost:5000/api/twitter?hashtag=${encodeURIComponent(hashtag)}`
    );
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    if (data && data.data) {
      const users = data.includes && data.includes.users ? data.includes.users : [];
      return data.data.map((tweet) => {
        const user = users.find((u) => u.id === tweet.author_id) || {};
        return {
          id: `twitter-${tweet.id}`,
          title: `${user.name || 'User'}: ${tweet.text.slice(0, 40)}...`,
          description: tweet.text,
          image: user.profile_image_url || 'https://placehold.co/800x450?text=Tweet',
          url: `https://twitter.com/i/web/status/${tweet.id}`,
          type: 'twitter',
        };
      });
    }
    throw new Error('No data returned from Twitter API');
  } catch (error) {
    console.error('Twitter fetch failed, using mock data:', error.message);
    return Array.from({ length: 10 }).map((_, i) => ({
      id: `twitter-mock-${i}`,
      title: `#${hashtag} trending tweet ${i + 1}`,
      description: 'This is a mock tweet (no API data).',
      image: 'https://placehold.co/800x450?text=Tweet+Mock',
      url: '#',
      type: 'twitter',
    }));
  }
}
