import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useDebounce } from '../hooks/useDebounce';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState(searchTerm);
  const debouncedSearchTerm = useDebounce(inputValue, 300); // 300ms delay

  // Update the parent component when debounced value changes
  useEffect(() => {
    onSearchChange(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearchChange]);

  // Sync input value with external searchTerm changes (e.g., from URL or reset)
  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="relative max-w-md mx-auto mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-700 dark:text-amber-200 w-5 h-5" />
        <input
          type="text"
          placeholder={t('search_placeholder')}
          value={inputValue}
          onChange={handleInputChange}
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border-2 border-amber-200 dark:border-gray-700 rounded-lg text-amber-900 dark:text-amber-100 placeholder-amber-500 dark:placeholder-amber-400 focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors duration-200 shadow-md"
          aria-label={t('search_aria')}
        />
      </div>
    </div>
  );
};