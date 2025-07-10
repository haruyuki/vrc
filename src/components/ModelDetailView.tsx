import React from 'react';
import { TextureModel } from '../data/models';
import { CommissionCard } from './CommissionCard';
import { AnimatedContainer } from './animations/AnimationComponents';

interface GalleryViewProps {
  model: TextureModel;
  isVisible: boolean;
}

export const ModelDetailView: React.FC<GalleryViewProps> = ({ model, isVisible }) => {
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
              {category}
            </span>
          ))}
        </div>

        {/* Commissions Grid */}
        <div>
          <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-4">
            Commission Gallery ({model.commissions.length})
          </h3>
          <AnimatedContainer className="grid grid-cols-1 md:grid-cols-2 gap-4" staggerChildren={0.05}>
            {model.commissions.map((commission, index) => (
              <CommissionCard commission={commission} index={index} key={commission.id} />
            ))}
          </AnimatedContainer>
        </div>
      </div>
    </div>
  );
};
