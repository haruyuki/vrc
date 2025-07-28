'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Model } from '@/types';
import MobileModelCard from './MobileModelCard';
import DesktopModelCard from './DesktopModelCard';
import ModelModal from './ModelModal';

interface ModelGridProps {
  models: Model[];
  showCommissionerCounts?: boolean;
}

export default function ModelGrid({ models, showCommissionerCounts = true }: ModelGridProps) {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const modelsPerPage = 16;
  const t = useTranslations('Pagination');

  // Calculate pagination values
  const totalPages = Math.ceil(models.length / modelsPerPage);
  const startIndex = (currentPage - 1) * modelsPerPage;
  const endIndex = startIndex + modelsPerPage;
  const currentModels = models.slice(startIndex, endIndex);

  // Reset to first page when models change
  useEffect(() => {
    setCurrentPage(1);
  }, [models]);

  // Disable background scrolling when modal is open - with safety check
  useEffect(() => {
    if (selectedModel && typeof window !== 'undefined') {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [selectedModel]);

  const handleModelSelect = (model: Model) => {
    setSelectedModel(model);
  };

  const handleModalClose = () => {
    setSelectedModel(null);
  };

  const handlePageChange = (page: number) => {
    // Store the current scroll position relative to the pagination controls
    const paginationElement = document.querySelector('.pagination-controls');
    if (!paginationElement) {
      setCurrentPage(page);
      return;
    }

    const paginationRect = paginationElement.getBoundingClientRect();
    const targetScrollPosition = window.scrollY + paginationRect.top;

    setCurrentPage(page);

    requestAnimationFrame(() => {
      // Scroll to maintain the pagination controls at the same screen position
      window.scrollTo({
        top: targetScrollPosition - paginationRect.top,
        behavior: 'smooth',
      });
    });
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    // Adjust startPage if we're near the end
    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    // Previous button - always show but disable if on first page
    buttons.push(
      <button
        key="prev"
        onClick={currentPage > 1 ? () => handlePageChange(currentPage - 1) : undefined}
        disabled={currentPage <= 1}
        className={`group relative flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ${
          currentPage > 1
            ? 'border border-gray-200 bg-white text-gray-700 shadow-sm hover:scale-105 hover:bg-gray-50 hover:shadow-md active:scale-95 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            : 'cursor-not-allowed border border-gray-100 bg-gray-50 text-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-600'
        }`}
        aria-label="Previous page"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>,
    );

    // First page if not visible
    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:scale-105 hover:bg-gray-50 hover:shadow-md active:scale-95 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          1
        </button>,
      );
      if (startPage > 2) {
        buttons.push(
          <span
            key="ellipsis1"
            className="flex h-10 w-10 items-center justify-center text-gray-400 dark:text-gray-600"
          >
            <svg className="h-1 w-1 fill-current">
              <circle cx="0.5" cy="0.5" r="0.5" />
            </svg>
            <svg className="mx-1 h-1 w-1 fill-current">
              <circle cx="0.5" cy="0.5" r="0.5" />
            </svg>
            <svg className="h-1 w-1 fill-current">
              <circle cx="0.5" cy="0.5" r="0.5" />
            </svg>
          </span>,
        );
      }
    }

    // Page number buttons
    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ${
            page === currentPage
              ? 'scale-105 bg-blue-600 text-white shadow-lg shadow-blue-500/25 dark:bg-blue-500 dark:shadow-blue-500/20'
              : 'border border-gray-200 bg-white text-gray-700 shadow-sm hover:scale-105 hover:bg-gray-50 hover:shadow-md active:scale-95 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          {page}
        </button>,
      );
    }

    // Last page if not visible
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span
            key="ellipsis2"
            className="flex h-10 w-10 items-center justify-center text-gray-400 dark:text-gray-600"
          >
            <svg className="h-1 w-1 fill-current">
              <circle cx="0.5" cy="0.5" r="0.5" />
            </svg>
            <svg className="mx-1 h-1 w-1 fill-current">
              <circle cx="0.5" cy="0.5" r="0.5" />
            </svg>
            <svg className="h-1 w-1 fill-current">
              <circle cx="0.5" cy="0.5" r="0.5" />
            </svg>
          </span>,
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:scale-105 hover:bg-gray-50 hover:shadow-md active:scale-95 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          {totalPages}
        </button>,
      );
    }

    // Next button - always show but disable if on last page
    buttons.push(
      <button
        key="next"
        onClick={currentPage < totalPages ? () => handlePageChange(currentPage + 1) : undefined}
        disabled={currentPage >= totalPages}
        className={`group relative flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ${
          currentPage < totalPages
            ? 'border border-gray-200 bg-white text-gray-700 shadow-sm hover:scale-105 hover:bg-gray-50 hover:shadow-md active:scale-95 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            : 'cursor-not-allowed border border-gray-100 bg-gray-50 text-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-600'
        }`}
        aria-label="Next page"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>,
    );

    return buttons;
  };

  return (
    <>
      {/* Mobile list view (sm and below) */}
      <div className="block space-y-4 sm:hidden">
        {currentModels.map((model) => (
          <MobileModelCard
            key={model.id}
            model={model}
            showCommissionerCounts={showCommissionerCounts}
            onSelect={handleModelSelect}
          />
        ))}
      </div>

      {/* Desktop grid view (sm and above) */}
      <div className="hidden grid-cols-2 gap-6 sm:grid lg:grid-cols-4">
        {currentModels.map((model) => (
          <DesktopModelCard
            key={model.id}
            model={model}
            showCommissionerCounts={showCommissionerCounts}
            onSelect={handleModelSelect}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination-controls mt-12 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {renderPaginationButtons()}
          </div>
          <div className="mt-6 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
            {t('showingModels', {
              start: startIndex + 1,
              end: Math.min(endIndex, models.length),
              total: models.length,
            })}
          </div>
        </div>
      )}

      {/* Modal for commissioners */}
      <AnimatePresence>
        {selectedModel && <ModelModal model={selectedModel} onClose={handleModalClose} />}
      </AnimatePresence>
    </>
  );
}
