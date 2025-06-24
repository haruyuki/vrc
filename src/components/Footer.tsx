import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="bg-white bg-opacity-80 backdrop-blur-sm border-t border-amber-200 mt-16"
      role="contentinfo"
      aria-label={t('footer_label', 'Site Footer')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-amber-700 mb-4">
            <span>{t('footer.made_with', 'Made with')}</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" aria-hidden="true" />
            <span>{t('footer.for_community', 'for the VRChat community')}</span>
          </div>
          <p className="text-sm text-amber-600">
            © 2024 VRChat Texture Portfolio. {t('footer.rights', 'All rights reserved.')}
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
