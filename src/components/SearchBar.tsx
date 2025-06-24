import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { searchBarVariants } from '../styles/animations';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative max-w-md mx-auto mb-8">
      <motion.div
        variants={searchBarVariants}
        whileFocus="focus"
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-700 w-5 h-5" />
        <input
          type="text"
          placeholder="Search texture models..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border-2 border-amber-200 rounded-lg text-amber-900 placeholder-amber-500 focus:outline-none focus:border-amber-500 transition-colors duration-200 shadow-md"
          aria-label="Search texture models"
        />
      </motion.div>
    </div>
  );
};