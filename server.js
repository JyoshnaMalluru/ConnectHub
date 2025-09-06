const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

app.get('/api/news', async (req, res) => {
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  const category = req.query.category || 'general';
  try {
    const response = await axios.get(
      `https://api.mediastack.com/v1/news?access_key=${apiKey}&countries=in&limit=25&categories=${category}`
    );
    res.json(response.data);
  } catch (e) {
    console.error('News API error:', e.response?.data || e.message);
    res.status(500).json({ error: 'News API error', details: e.message });
  }
});

app.get('/api/twitter', async (req, res) => {
  const hashtag = req.query.hashtag || 'news';
  try {
    const response = await axios.get(
      `https://api.twitter.com/2/tweets/search/recent?query=%23${encodeURIComponent(hashtag)}&max_results=10&tweet.fields=author_id,created_at,text&expansions=author_id&user.fields=profile_image_url,name,username`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
      }
    );
    res.json(response.data);
  } catch (e) {
    console.error('Twitter API error:', e.response?.data || e.message);
    res.status(500).json({ error: 'Twitter API error', details: e.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Backend running on http://localhost:${PORT}`)
);
