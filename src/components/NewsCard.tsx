import React from 'react';
import { NewsItem } from '../services/newsApi';

interface NewsCardProps {
  item: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {item.urlToImage && (
        <img src={item.urlToImage} alt={item.title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
        <p className="text-gray-600 mb-4">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{new Date(item.publishedAt).toLocaleDateString()}</span>
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;