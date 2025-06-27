import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-center mb-12"
    >
      <h2 className="text-4xl md:text-6xl font-bold text-amber-900 dark:text-amber-100 mb-4">
        {t('completed_works_title')}
      </h2>
      <p className="text-xl text-amber-700 dark:text-amber-300 max-w-3xl mx-auto">
        {t('completed_works_description')}
      </p>
    </motion.div>
  );
};

export default HeroSection;
