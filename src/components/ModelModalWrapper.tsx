import React, { useState, lazy, Suspense, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { TextureModel } from '../data/models';
import { fullScreenVariants } from '../styles/animations';

const GalleryView = lazy(() => import('./ModelDetailView.tsx').then(module => ({ default: module.ModelDetailView })));

interface ModelBaseProps {
  model: TextureModel;
  renderContent: (isOpen: boolean, handleClick: () => void, handleKeyDown: (event: React.KeyboardEvent) => void) => ReactNode;
}

export const ModelModalWrapper: React.FC<ModelBaseProps> = ({ model, renderContent }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = useCallback(() => {
    document.body.style.overflow = 'hidden';
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    document.body.style.overflow = '';
    setIsOpen(false);
  }, []);

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
            className="fixed inset-0 z-40 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
        )}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {!isOpen && renderContent(isOpen, handleItemClick, handleKeyDown)}
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
                className="absolute top-4 right-4 z-10 bg-white/80 dark:bg-gray-900/90 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
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
