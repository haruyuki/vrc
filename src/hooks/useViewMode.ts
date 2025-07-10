import { useState } from 'react';

type ViewMode = 'grid' | 'list';

interface UseViewModeReturn {
  viewMode: ViewMode;
  toggleViewMode: () => void;
  isGridMode: boolean;
  isListMode: boolean;
}

export function useViewMode(initialMode: ViewMode = 'grid'): UseViewModeReturn {
  const [viewMode, setViewMode] = useState<ViewMode>(initialMode);

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'grid' ? 'list' : 'grid'));
  };

  return {
    viewMode,
    toggleViewMode,
    isGridMode: viewMode === 'grid',
    isListMode: viewMode === 'list'
  };
}
