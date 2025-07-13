import React from 'react';
import { Star, ExternalLink } from 'lucide-react';
import { TextureModel } from '../data/models';
import { useTranslation } from '../hooks/useTranslation';
import { ModelModalWrapper } from './ModelModalWrapper.tsx';
import { getCommissionsForModel } from '../services/googleSheets';
import { MotionBookCard } from './animations/AnimationComponents';

interface ModelListItemProps {
  model: TextureModel;
  constName: string;
}

export const ModelListItem: React.FC<ModelListItemProps> = ({ model, constName }) => {
  const { t } = useTranslation();
  const commissions = getCommissionsForModel(constName);

  return (
    <ModelModalWrapper
      model={model}
      renderContent={(_isOpen, handleItemClick, handleKeyDown) => (
        <MotionBookCard
          key="list-item"
          className="relative w-full cursor-pointer group"
          layoutId={`book-${model.modelName}`}
          whileHover="hover"
          onClick={handleItemClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-label={`View ${model.modelName} texture portfolio`}
          style={{ zIndex: 1 }}
        >
          <div className="relative w-full h-full rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-white/80 dark:bg-gray-900/80 flex items-center">
            <div
              className="h-full"
              style={{ width: '6px', minWidth: '6px', backgroundColor: model.spineColor }}
            />

            <div className="flex-shrink-0 w-20 h-20 overflow-hidden">
              <img
                src={model.coverImage}
                alt={`${model.modelName} texture preview`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="flex-1 p-3 flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-0">
                    {model.modelName}
                  </h3>
                  {model.featured && (
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-amber-600 dark:text-amber-400">
                    {commissions.length} {commissions.length === 1
                      ? t('book.commission')
                      : t('book.commissions')}
                  </span>
                  <a
                    href={model.officialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-amber-200 transition-colors bg-black/20 px-2 py-1 text-xs rounded-full text-amber-700 dark:text-amber-300"
                    aria-label={`View ${model.modelName} official page`}
                    onClick={e => e.stopPropagation()}
                  >
                    <ExternalLink className="w-3 h-3" />
                    {t('book.officialLink')}
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-between mt-1">
                <div className="flex flex-wrap gap-1">
                  {model.categories.slice(0, 3).map((category) => (
                    <span
                      key={category}
                      className="px-2 py-0.5 text-xs bg-amber-100 text-amber-800 rounded-full dark:bg-gray-800 dark:text-amber-100"
                    >
                      {t(`tags.${category}`)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute right-2 bottom-1 text-amber-500/70 dark:text-amber-400/70 text-xs z-20">
              {t('book.clickToOpen')}
            </div>
          </div>
        </MotionBookCard>
      )}
    />
  );
};
