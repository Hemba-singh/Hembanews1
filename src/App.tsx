import React, { useState, useEffect } from 'react';
import { RefreshCcw } from 'lucide-react';
import NewsCard from './components/NewsCard';
import SearchBar from './components/SearchBar';
import FilterSort from './components/FilterSort';
import AdBanner from './components/AdBanner';
import UploadArticle from './components/UploadArticle';
import { fetchNews, fetchSavedNews, NewsItem } from './services/newsApi';

function App() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [savedNews, setSavedNews] = useState<NewsItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('publishedAt');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    loadNews();
    loadSavedNews();
  }, [category, sortBy]);

  const loadNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedNews = await fetchNews(category, sortBy);
      setNews(fetchedNews);
    } catch (err) {
      setError('Failed to load news. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const loadSavedNews = async () => {
    try {
      const fetchedSavedNews = await fetchSavedNews();
      setSavedNews(fetchedSavedNews);
    } catch (err) {
      console.error('Failed to load saved news:', err);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Hemba News</h1>
          <div className="flex items-center space-x-4">
            <button onClick={loadNews} className="flex items-center" disabled={loading}>
              <RefreshCcw className="mr-2" /> Refresh
            </button>
            <button onClick={() => setShowUpload(!showUpload)} className="bg-green-500 px-4 py-2 rounded hover:bg-green-600">
              {showUpload ? 'Hide Upload' : 'Upload Article'}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {showUpload && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Upload New Article</h2>
            <UploadArticle />
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <SearchBar onSearch={handleSearch} />
          <FilterSort
            onCategoryChange={setCategory}
            onSortChange={setSortBy}
          />
        </div>

        <AdBanner />

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <h2 className="text-2xl font-bold mt-8 mb-4">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <NewsCard key={item.url} item={item} />
          ))}
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Saved News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedNews.map((item) => (
            <NewsCard key={item.url} item={item} />
          ))}
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Hemba News. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;