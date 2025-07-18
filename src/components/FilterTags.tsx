import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { availableTags, tagColors } from '../data/tags';

interface FilterTagsProps {
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

export const FilterTags: React.FC<FilterTagsProps> = ({
  selectedTags,
  onTagToggle,
}) => {
  const { t } = useTranslation();
  const selectedTag = selectedTags[0] || 'All';

  // Memoize the rendered tag buttons
  const tagButtons = useMemo(
    () =>
      availableTags.map((tag) => {
        const isSelected = selectedTag === tag;
        const tagColor = tagColors[tag] || '#8B4513';
        return (
          <motion.button
            key={tag}
            onClick={() => onTagToggle(isSelected ? 'All' : tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isSelected
                ? 'text-white shadow-lg transform scale-105 dark:shadow-[0_0_0_2px_rgba(251,191,36,0.5)]'
                : 'text-amber-800 dark:text-amber-100 bg-white dark:bg-gray-800 hover:bg-amber-50 dark:hover:bg-gray-700 shadow-md hover:shadow-lg'
            }`}
            style={{
              backgroundColor: isSelected ? tagColor : undefined,
              border: isSelected ? 'none' : undefined,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Filter by ${t(`tags.${tag}`)}`}
            aria-pressed={isSelected}
          >
            {t(`tags.${tag}`)}
          </motion.button>
        );
      }),
    [selectedTag, onTagToggle, t],
  );

  return (
    <div className={`flex flex-wrap mb-8 justify-center`}>
      {/* Centered tags */}
      <div className="flex flex-wrap justify-center gap-2">
        {tagButtons}
      </div>
    </div>
  );
};
