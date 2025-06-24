import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';

interface HeaderProps {
  onToggleLanguage: () => void;
  currentLanguage: string;
}

const Header: React.FC<HeaderProps> = ({ onToggleLanguage, currentLanguage }) => (
  <motion.header
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-white bg-opacity-80 backdrop-blur-sm shadow-sm border-b border-amber-200"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-amber-600 to-orange-600 p-3 rounded-xl shadow-lg">
            <Palette className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-amber-900">VRChat Texture Portfolio</h1>
            <p className="text-amber-700">Discover beautiful custom textures for your favorite avatars</p>
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
            <span className="mr-1">{currentLanguage === 'en' ? 'EN' : '中'}</span>
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </motion.header>
);

export default Header;

