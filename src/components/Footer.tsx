import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="bg-white dark:bg-gray-900 border-t border-amber-200 dark:border-gray-700 mt-16 backdrop-blur-sm"
      role="contentinfo"
      aria-label={t('footer_label', 'Site Footer')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-amber-700 dark:text-amber-200 mb-4">
            <span>{t('footer.rights')}</span>
          </div>
          <p className="text-sm text-amber-600 dark:text-amber-300">
            <span>{t('footer_label')}</span>
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
