import React from 'react';
import { TextureModel } from '../data/models';
import { getCommissionsForModel } from '../services/googleSheets';
import { CommissionCard } from './CommissionCard';
import { useTranslation } from '../hooks/useTranslation';
import { AnimatedContainer } from './animations/AnimationComponents';
import { Commission } from '../data/models';

interface GalleryViewProps {
  model: TextureModel;
  isVisible: boolean;
}

export const ModelDetailView: React.FC<GalleryViewProps> = ({ model, isVisible }) => {
  const { t } = useTranslation();
  const [commissions, setCommissions] = React.useState<Commission[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  // Fetch commissions for this specific model
  React.useEffect(() => {
    let isMounted = true;
    if (isVisible && model) {
      setIsLoading(true);
      Promise.resolve(getCommissionsForModel(model.constName)).then((data) => {
        if (isMounted) {
          setCommissions(data);
          setIsLoading(false);
        }
      });
    }
    return () => { isMounted = false; };
  }, [isVisible, model]);

  if (!isVisible) return null;

  return (
    <div className="h-full p-6 overflow-y-auto bg-white dark:bg-gray-900">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold text-amber-900 dark:text-amber-100 mb-2">{model.modelName}</h2>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {model.categories.map((category) => (
            <span
              key={category}
              className="px-3 py-1 text-sm bg-amber-200 text-amber-800 rounded-full dark:bg-gray-800 dark:text-amber-100"
            >
              {t(`tags.${category}`)}
            </span>
          ))}
        </div>

        {/* Commissions Grid */}
        <div>
          <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-4">
            {t('gallery_title')} ({commissions.length})
          </h3>
          {isLoading ? (
            <div className="flex items-center justify-center py-12 text-amber-700 dark:text-amber-400">
              {t('loading')}
            </div>
          ) : commissions.length > 0 ? (
            <AnimatedContainer className="grid grid-cols-1 md:grid-cols-2 gap-4" staggerChildren={0.05}>
              {commissions.map((commission) => (
                <CommissionCard commission={commission} key={commission.id} />
              ))}
            </AnimatedContainer>
          ) : (
            <p className="text-amber-700 dark:text-amber-400">{t('no_commissions')}</p>
          )}
        </div>
      </div>
    </div>
  );
};
