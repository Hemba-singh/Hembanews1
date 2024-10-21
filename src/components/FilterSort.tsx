import React from 'react';
import { Filter } from 'lucide-react';

interface FilterSortProps {
  onCategoryChange: (category: string) => void;
  onSortChange: (sortBy: string) => void;
}

const FilterSort: React.FC<FilterSortProps> = ({ onCategoryChange, onSortChange }) => {
  return (
    <div className="flex items-center space-x-4">
      <select
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Categories</option>
        <option value="business">Business</option>
        <option value="technology">Technology</option>
        <option value="sports">Sports</option>
        <option value="entertainment">Entertainment</option>
      </select>
      <select
        onChange={(e) => onSortChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="publishedAt">Latest</option>
        <option value="popularity">Popular</option>
        <option value="relevancy">Relevant</option>
      </select>
      <Filter size={20} className="text-gray-500" />
    </div>
  );
};

export default FilterSort;