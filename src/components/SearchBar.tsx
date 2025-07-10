import React from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  const { t } = useTranslation();

  return (
    <div className="relative max-w-md mx-auto mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-700 dark:text-amber-200 w-5 h-5" />
        <input
          type="text"
          placeholder={t('search_placeholder')}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border-2 border-amber-200 dark:border-gray-700 rounded-lg text-amber-900 dark:text-amber-100 placeholder-amber-500 dark:placeholder-amber-400 focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors duration-200 shadow-md"
          aria-label={t('search_aria')}
        />
      </div>
    </div>
  );
};