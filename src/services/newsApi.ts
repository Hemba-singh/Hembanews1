import axios from 'axios';
import { ref, push, get, query, orderByChild, limitToLast } from 'firebase/database';
import { db } from './firebase';

export interface NewsItem {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const fetchNews = async (category: string = '', sortBy: string = 'publishedAt'): Promise<NewsItem[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/news`, {
      params: {
        category: category || undefined,
        sortBy,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching news:', error.response?.data || error.message);
    } else {
      console.error('Error fetching news:', error);
    }
    throw error;
  }
};

export const fetchSavedNews = async (): Promise<NewsItem[]> => {
  try {
    const newsRef = ref(db, 'news');
    const newsQuery = query(newsRef, orderByChild('publishedAt'), limitToLast(50));
    const snapshot = await get(newsQuery);
    const news: NewsItem[] = [];
    snapshot.forEach((childSnapshot) => {
      news.push(childSnapshot.val() as NewsItem);
    });
    return news.reverse();
  } catch (error) {
    console.error('Error fetching saved news:', error);
    throw error;
  }
};

export const uploadArticle = async (article: NewsItem): Promise<void> => {
  try {
    const newsRef = ref(db, 'news');
    await push(newsRef, {
      ...article,
      publishedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error uploading article:', error);
    throw error;
  }
};