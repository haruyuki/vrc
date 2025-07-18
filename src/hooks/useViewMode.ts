import { useState, useEffect } from 'react';

type ViewMode = 'grid' | 'list';

interface UseViewModeReturn {
  viewMode: ViewMode;
  isGridMode: boolean;
  isListMode: boolean;
}

export function useViewMode(): UseViewModeReturn {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  useEffect(() => {
    const checkScreenSize = () => {
      // Use list mode for screens smaller than 1024px (lg breakpoint)
      const isSmallScreen = window.innerWidth < 1024;
      setViewMode(isSmallScreen ? 'list' : 'grid');
    };

    // Check initial screen size
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return {
    viewMode,
    isGridMode: viewMode === 'grid',
    isListMode: viewMode === 'list',
  };
}
