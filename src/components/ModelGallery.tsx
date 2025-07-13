import React, { memo } from 'react';
import { ModelGridCard } from './ModelGridCard.tsx';
import { ModelListItem } from './ModelListItem.tsx';
import { TextureModel } from '../data/models';
import { MotionContainer, MotionCard } from './animations/AnimationComponents';

interface ModelGallery {
  models: TextureModel[];
  viewMode: 'grid' | 'list';
}

const CarouselComponent: React.FC<ModelGallery> = ({ models, viewMode }) => {
  if (models.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-100 mb-2">No models found</h3>
        <p className="text-amber-600 dark:text-amber-300">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return viewMode === 'grid' ? (
    <MotionContainer className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {models.map((model) => (
        <MotionCard key={model.constName} className="flex justify-center">
          <ModelGridCard model={model} />
        </MotionCard>
      ))}
    </MotionContainer>
  ) : (
    <MotionContainer className="flex flex-col gap-3">
      {models.map((model) => (
        <MotionCard key={model.constName} className="w-full">
          <ModelListItem model={model} />
        </MotionCard>
      ))}
    </MotionContainer>
  );
};

export const Carousel = memo(CarouselComponent);
