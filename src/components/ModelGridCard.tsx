import React from 'react';
import { Star } from 'lucide-react';
import { TextureModel } from '../data/models';
import { useTranslation } from 'react-i18next';
import { ModelModalWrapper } from './ModelModalWrapper.tsx';
import { MotionBookCard } from './animations/AnimationComponents';

interface ModelProps {
  model: TextureModel;
}

const ExternalLinkIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h6m5-3h3m0 0v3m0-3L10 14"
    />
  </svg>
);

export const ModelGridCard: React.FC<ModelProps> = ({ model }) => {
  const { t } = useTranslation();

  return (
    <ModelModalWrapper
      model={model}
      renderContent={(_isOpen, handleClick, handleKeyDown) => (
        <MotionBookCard
          key="card"
          className="relative w-full cursor-pointer group"
          layoutId={`book-${model.modelName}`}
          whileHover="hover"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-label={`View ${model.modelName} texture portfolio`}
          style={{ zIndex: 1 }}
        >
          <div className="relative w-full h-full rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-white dark:bg-gray-900 flex">
            <div
              className="h-full"
              style={{
                width: '12px',
                minWidth: '12px',
                backgroundColor: model.spineColor,
              }}
            />
            <div className="flex-1 flex flex-col">
              {model.featured && (
                <div className="absolute top-4 right-4 z-20">
                  <Star className="w-6 h-6 text-yellow-400 fill-current" />
                </div>
              )}
              <div className="flex-1 mb-0 overflow-hidden shadow-md aspect-square bg-white dark:bg-gray-800">
                <img
                  src={model.coverImage}
                  alt={`${model.modelName} texture preview`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div
                className="w-full pl-1 pr-3 py-2 flex flex-col gap-1"
                style={{ backgroundColor: model.spineColor }}
              >
                <div className="flex items-center justify-between">
                  <h3
                    className="text-lg font-bold text-white text-left text-shadow mb-0 truncate"
                    style={{ maxWidth: '65%' }}
                  >
                    {model.modelName}
                  </h3>
                  <a
                    href={model.officialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-amber-200 transition-colors bg-black/20 px-2 py-1 rounded-full text-xs text-white"
                    aria-label={`View ${model.modelName} official page`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLinkIcon />
                    {t('book.officialLink', 'Official Link')}
                  </a>
                </div>
                <div className="flex flex-wrap gap-1 text-left">
                  {model.categories.slice(0, 2).map((category) => (
                    <span
                      key={category}
                      className="px-2 py-1 text-xs bg-white/20 text-white rounded-full dark:bg-gray-700/20 dark:text-amber-100"
                    >
                      {t(`tags.${category}`, category)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute bottom-2 right-2 text-white/70 text-xs z-20">
              {t('book.clickToOpen', 'Click to open')}
            </div>
          </div>
        </MotionBookCard>
      )}
    />
  );
};
