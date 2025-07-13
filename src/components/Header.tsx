import { motion } from 'framer-motion';
import { Palette, Sun, Moon } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { FadeIn } from './animations/AnimationComponents';

interface HeaderProps {
  onToggleLanguage: () => void;
  currentLanguage: string;
  onToggleDarkMode?: () => void;
  isDarkMode?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleLanguage,
  currentLanguage,
  onToggleDarkMode,
  isDarkMode,
}) => {
  const { t } = useTranslation();

  return (
    <FadeIn
      y={-20}
      className="bg-white dark:bg-gray-900 backdrop-blur-sm shadow-sm border-b border-amber-200 dark:border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-amber-600 to-orange-600 dark:from-gray-800 dark:to-gray-700 p-3 rounded-xl shadow-lg">
              <Palette className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-amber-900 dark:text-amber-100">
                {t('vrc_commissions_title')}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Language Toggle Button */}
            <button
              onClick={onToggleLanguage}
              className="flex items-center text-sm font-medium text-amber-800 hover:text-amber-900 px-2 py-1 rounded transition-colors focus:outline-none"
              aria-label="Toggle language"
              tabIndex={0}
              style={{ boxShadow: 'none' }}
            >
              <span className="mr-1">
                {currentLanguage === 'en' ? 'EN' : '中'}
              </span>
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
            </button>
            {/* Dark Mode Toggle Button */}
            <button
              onClick={onToggleDarkMode}
              className="flex items-center text-sm font-medium text-amber-800 hover:text-amber-900 px-2 py-1 rounded transition-colors focus:outline-none"
              aria-label="Toggle dark mode"
              tabIndex={0}
              style={{ boxShadow: 'none' }}
            >
              <span className="relative w-5 h-5 inline-block">
                <motion.span
                  className="absolute inset-0 flex items-center justify-center"
                  initial={false}
                  animate={{
                    scale: isDarkMode ? 0 : 1,
                    opacity: isDarkMode ? 0 : 1,
                    rotate: isDarkMode ? 90 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ originX: 0.5, originY: 0.5 }}
                >
                  <Sun className="h-5 w-5" />
                </motion.span>
                <motion.span
                  className="absolute inset-0 flex items-center justify-center"
                  initial={false}
                  animate={{
                    scale: isDarkMode ? 1 : 0,
                    opacity: isDarkMode ? 1 : 0,
                    rotate: isDarkMode ? 0 : -90,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ originX: 0.5, originY: 0.5 }}
                >
                  <Moon className="h-5 w-5" />
                </motion.span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};
