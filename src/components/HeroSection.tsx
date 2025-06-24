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
      <h2 className="text-4xl md:text-6xl font-bold text-amber-900 mb-4">
        {t('texture_library')}
      </h2>
      <p className="text-xl text-amber-700 max-w-3xl mx-auto">
        {t('description_text')}
      </p>
    </motion.div>
  );
};

export default HeroSection;

