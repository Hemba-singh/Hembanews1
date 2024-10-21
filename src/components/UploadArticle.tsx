import React, { useState } from 'react';
import { uploadArticle, NewsItem } from '../services/newsApi';

const UploadArticle: React.FC = () => {
  const [article, setArticle] = useState<Partial<NewsItem>>({
    title: '',
    description: '',
    url: '',
    urlToImage: '',
    source: { name: '' },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setArticle(prev => ({
      ...prev,
      [name]: name === 'source' ? { name: value } : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await uploadArticle(article as NewsItem);
      alert('Article uploaded successfully!');
      setArticle({
        title: '',
        description: '',
        url: '',
        urlToImage: '',
        source: { name: '' },
      });
    } catch (error) {
      console.error('Error uploading article:', error);
      alert('Failed to upload article. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        value={article.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <textarea
        name="description"
        value={article.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="url"
        name="url"
        value={article.url}
        onChange={handleChange}
        placeholder="Article URL"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="url"
        name="urlToImage"
        value={article.urlToImage}
        onChange={handleChange}
        placeholder="Image URL"
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="text"
        name="source"
        value={article.source?.name}
        onChange={handleChange}
        placeholder="Source Name"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Upload Article
      </button>
    </form>
  );
};

export default UploadArticle;