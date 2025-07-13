import { useCallback, useEffect, useState } from 'react';

interface UseImagePreloaderOptions {
  priority?: boolean;
  threshold?: number;
}

/**
 * Hook to preload images with loading state tracking
 * @param images - Array of image URLs to preload
 * @param options - Configuration options
 * @returns Object with loading states and preload function
 */
export function useImagePreloader(
  images: string[],
  options: UseImagePreloaderOptions = {},
) {
  const { priority = false, threshold = 2 } = options;
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const preloadImage = useCallback((src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        setLoadedImages((prev) => new Set([...prev, src]));
        resolve();
      };
      img.onerror = () => {
        setFailedImages((prev) => new Set([...prev, src]));
        reject(new Error(`Failed to load image: ${src}`));
      };
      img.src = src;
    });
  }, []);

  const preloadImages = useCallback(
    async (imagesToLoad: string[]) => {
      if (imagesToLoad.length === 0) return;

      setIsLoading(true);

      // Load images in batches to avoid overwhelming the browser
      const batchSize = priority ? imagesToLoad.length : threshold;
      for (let i = 0; i < imagesToLoad.length; i += batchSize) {
        const batch = imagesToLoad.slice(i, i + batchSize);
        await Promise.allSettled(batch.map(preloadImage));

        // Small delay between batches for non-priority loading
        if (!priority && i + batchSize < imagesToLoad.length) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      }

      setIsLoading(false);
    },
    [priority, threshold, preloadImage],
  );

  useEffect(() => {
    if (images.length > 0) {
      preloadImages(images);
    }
  }, [images, preloadImages]); // Re-run when image array changes

  return {
    loadedImages,
    failedImages,
    isLoading,
    preloadImages,
    isImageLoaded: (src: string) => loadedImages.has(src),
    isImageFailed: (src: string) => failedImages.has(src),
  };
}
