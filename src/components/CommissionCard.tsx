import React, { useState, useMemo } from 'react';
import { User, Calendar, ImageOff } from 'lucide-react';
import { Commission } from '../data/models';
import { AnimatedItem } from './animations/AnimationComponents';
import { useTranslation } from '../hooks/useTranslation';
import { useImagePreloader } from '../hooks/useImagePreloader';

interface CommissionCardProps {
  commission: Commission;
}

export const CommissionCard: React.FC<CommissionCardProps> = ({ commission }) => {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();

  // Memoize limited images to prevent unnecessary re-renders
  const displayImages = useMemo(
    () => commission.images.slice(0, 4),
    [commission.images]
  );

  // Use the image preloader hook for better loading experience
  const {
    isImageLoaded,
    isImageFailed,
    isLoading: isPreloading
  } = useImagePreloader(displayImages, {
    priority: false, // Not priority since these are secondary content
    threshold: 2 // Load 2 images at a time to balance performance
  });

  React.useEffect(() => {
    if (!isHovered) {
      setCurrentImgIdx(0);
      return;
    }
    if (displayImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImgIdx((prev) => (prev + 1) % displayImages.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [isHovered, displayImages.length]);

  // Show loading state for the current image if it's not loaded yet
  const currentImageLoaded = displayImages.length > 0 && isImageLoaded(displayImages[currentImgIdx]);
  const currentImageFailed = displayImages.length > 0 && isImageFailed(displayImages[currentImgIdx]);

  return (
    <AnimatedItem className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-amber-100 dark:border-gray-800">
      <div
        className="aspect-[4/3] overflow-hidden relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {displayImages.length === 0 || currentImageFailed ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-amber-50 dark:bg-gray-800 text-amber-300 dark:text-amber-500">
            <ImageOff className="w-12 h-12 mb-2" />
            <span className="text-xs text-amber-400 dark:text-amber-500">
              {displayImages.length === 0 ? t('commissions.noImage') : 'Image failed to load'}
            </span>
          </div>
        ) : (
          <>
            {/* Loading skeleton for current image */}
            {!currentImageLoaded && (
              <div className="w-full h-full bg-amber-100 dark:bg-gray-700 animate-pulse flex items-center justify-center">
                <div className="text-amber-400 dark:text-amber-500 text-xs">Loading...</div>
              </div>
            )}

            {/* Render all images but only show the current one */}
            {displayImages.map((img, imgIdx) => (
              <img
                key={img}
                src={img}
                alt={`${t('commissions.by')} ${commission.commissioner}`}
                className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-700 ${
                  imgIdx === currentImgIdx && isImageLoaded(img) && !isImageFailed(img)
                    ? 'opacity-100 z-10'
                    : 'opacity-0 z-0'
                }`}
                loading="lazy"
                style={{ pointerEvents: 'none' }}
              />
            ))}
          </>
        )}

        {/* Image indicators */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {displayImages.map((_img, imgIdx) => (
              <div
                key={imgIdx}
                className={`w-5 h-2 rounded-full transition-colors duration-300 ${
                  imgIdx === currentImgIdx 
                    ? 'bg-white/80' 
                    : isImageLoaded(displayImages[imgIdx])
                      ? 'bg-black/40'
                      : 'bg-gray-400/40' // Different color for unloaded images
                }`}
              />
            ))}
          </div>
        )}

        {/* Loading indicator overlay */}
        {isPreloading && displayImages.length > 0 && (
          <div className="absolute top-2 right-2 z-20">
            <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-200 mb-2">
          <User className="w-4 h-4" />
          <span>{commission.commissioner}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-amber-500 dark:text-amber-300">
          <Calendar className="w-3 h-3" />
          <span>
            {commission.date
              ? new Date(commission.date).toLocaleDateString()
              : 'No date'}
          </span>
        </div>
      </div>
    </AnimatedItem>
  );
};
