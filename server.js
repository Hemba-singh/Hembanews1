import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const API_KEY = process.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

app.get('/api/news', async (req, res) => {
  try {
    const { category, sortBy } = req.query;
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        country: 'us',
        category: category || undefined,
        sortBy: sortBy || 'publishedAt',
        apiKey: API_KEY,
      },
    });
    
    res.json(response.data.articles);
  } catch (error) {
    console.error('Error fetching news:', error.response?.data || error.message);
    res.status(500).json({ error: 'An error occurred while fetching news' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});