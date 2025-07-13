import React, { useState, useMemo, useEffect } from 'react';
import { Carousel } from './components/ModelGallery.tsx';
import { SearchBar } from './components/SearchBar';
import { FilterTags } from './components/FilterTags';
import { textureModels } from './data/models';
import { useTranslation } from './hooks/useTranslation';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CommissionInfo } from './components/CommissionInfo';
import { Analytics } from "@vercel/analytics/react";
import { darkBackground, lightBackground } from './styles/backgrounds';
import { LayoutGrid, List } from 'lucide-react';
import { useViewMode } from './hooks/useViewMode';
import { FadeIn, ScaleOnHover } from './components/animations/AnimationComponents';
import { initializeCommissions } from './services/commissionData.ts';
import { useCommissionLoading } from './context/CommissionLoadingContext';

export const App: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['All']);
  const { viewMode, toggleViewMode } = useViewMode('grid');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      localStorage.setItem('theme', 'dark');
      return true;
    }
    return true;
  });
  const { setIsLoadingCommissions } = useCommissionLoading();

  // Fetch commission data from Google Sheets when the app loads
  useEffect(() => {
    const loadCommissionData = async () => {
      try {
        setIsLoadingCommissions(true);
        await initializeCommissions();
        console.log('Commission data loaded successfully');
      } catch (error) {
        console.error('Error loading commission data:', error);
      } finally {
        setIsLoadingCommissions(false);
      }
    };

    loadCommissionData().catch(() => {});
  }, [setIsLoadingCommissions]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const filteredModels = useMemo(() => {
    let filtered = textureModels;

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (model) =>
          model.modelName.toLowerCase().includes(searchLower) ||
          model.categories.some((cat) => cat.toLowerCase().includes(searchLower))
      );
    }

    // Apply tag filters (single selection)
    const selectedTag = selectedTags[0];
    if (selectedTag && selectedTag !== 'All') {
      filtered = filtered.filter((model) => {
        if (selectedTag === 'Featured') return model.featured;
        return model.categories.includes(selectedTag);
      });
    }

    // Sort by featured first, then by name
    return filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.modelName.localeCompare(b.modelName);
    });
  }, [searchTerm, selectedTags]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags([tag]);
  };

  // Language toggle handler
  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en').catch(() => {});
  };

  const handleDarkModeToggle = () => setIsDarkMode((prev) => !prev);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
      {/* Background Texture */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none dark:opacity-10"
        style={{
          backgroundImage: isDarkMode ? darkBackground : lightBackground,
        }}
      />
      <div className="relative z-10">
        {/* Header */}
        <Header onToggleLanguage={toggleLanguage} currentLanguage={i18n.language} onToggleDarkMode={handleDarkModeToggle} isDarkMode={isDarkMode} />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Commission Info Section */}
          <CommissionInfo />

          {/* Search and Filters */}
          <FadeIn delay={0.4}>
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <FilterTags
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
              viewToggleButton={
                <ScaleOnHover>
                  <button
                    onClick={toggleViewMode}
                    className="p-2 rounded-md focus:outline-none focus:ring-0 active:outline-none outline-none"
                    aria-label={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    {viewMode === 'grid' ? (
                      <List className="h-5 w-5 text-amber-700 dark:text-amber-400" />
                    ) : (
                      <LayoutGrid className="h-5 w-5 text-amber-700 dark:text-amber-400" />
                    )}
                  </button>
                </ScaleOnHover>
              }
            />
          </FadeIn>

          {/* Results Counter */}
          <FadeIn delay={0.6} className="text-center mb-8">
            <p className="text-amber-700 dark:text-amber-400">
              {t('results.showing')} <span className="font-semibold">{filteredModels.length}</span>
              {' '}
              {filteredModels.length === 1
                ? t('results.model')
                : t('results.models')}
            </p>
          </FadeIn>

          {/* Carousel */}
          <FadeIn delay={0.8} y={20}>
            <Carousel models={filteredModels} viewMode={viewMode} />
          </FadeIn>
        </main>

        {/* Footer */}
        <Footer />
      </div>
      <Analytics />
    </div>
  );
}
