import React, { useState, lazy, Suspense, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X } from 'lucide-react';
import { TextureModel } from '../data/models';
const GalleryView = lazy(() => import('./GalleryView'));
import { bookVariants, fullScreenVariants } from '../styles/animations';
import { useTranslation } from 'react-i18next';

interface ModelProps {
  model: TextureModel;
}

const ExternalLinkIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h6m5-3h3m0 0v3m0-3L10 14" /></svg>
);

export const Model: React.FC<ModelProps> = ({ model }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const handleBookClick = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(true);
    } else if (event.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
        )}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {!isOpen && (
          <motion.div
            key="card"
            className="relative w-full cursor-pointer group"
            layoutId={`book-${model.modelName}`}
            variants={bookVariants}
            whileHover="hover"
            onClick={handleBookClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label={`View ${model.modelName} texture portfolio`}
            style={{ zIndex: 1 }}
          >
            <div className="relative w-full h-full rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-white dark:bg-gray-900 flex">
              <div
                className="h-full"
                style={{ width: '12px', minWidth: '12px', backgroundColor: model.spineColor }}
              />
              <div className="flex-1 flex flex-col">
                {model.featured && (
                  <div className="absolute top-4 right-4 z-20">
                    <Star className="w-6 h-6 text-yellow-400 fill-current" />
                  </div>
                )}
                <div className="flex-1 mb-0 overflow-hidden shadow-md aspect-square bg-white dark:bg-gray-800">
                  <img
                    src={model.coverImage}
                    alt={`${model.modelName} texture preview`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div
                  className="w-full pl-1 pr-3 py-2 flex flex-col gap-1"
                  style={{ backgroundColor: model.spineColor }}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white text-left text-shadow mb-0">
                      {model.modelName}
                    </h3>
                    <a
                      href={model.officialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-amber-200 transition-colors bg-black bg-opacity-20 px-2 py-1 rounded-full text-xs text-white"
                      aria-label={`View ${model.modelName} official page`}
                      onClick={e => e.stopPropagation()}
                    >
                      <ExternalLinkIcon />
                      {t('book.officialLink', 'Official Link')}
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-1 text-left">
                    {model.categories.slice(0, 2).map((category) => (
                      <span
                        key={category}
                        className="px-2 py-1 text-xs bg-white bg-opacity-20 text-white rounded-full dark:bg-gray-700 dark:text-amber-100"
                      >
                        {t(`tags.${category}`, category)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-2 right-2 text-white text-opacity-70 text-xs z-20">
                {t('book.clickToOpen', 'Click to open')}
              </div>
            </div>
          </motion.div>
        )}
        {isOpen && (
          <motion.div
            key="modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ pointerEvents: 'none' }}
          >
            <motion.div
              className="relative w-full max-w-6xl h-full max-h-[90vh] bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 rounded-lg overflow-hidden"
              layoutId={`book-${model.modelName}`}
              variants={fullScreenVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              style={{ pointerEvents: 'auto' }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 bg-white dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
                aria-label="Close gallery"
              >
                <X className="w-6 h-6 text-amber-900 dark:text-amber-100" />
              </button>
              <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
                <GalleryView model={model} isVisible={isOpen} />
              </Suspense>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
