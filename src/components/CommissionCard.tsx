import React, { useState } from 'react';
import { User, Calendar, ImageOff } from 'lucide-react';
import { Commission } from '../data/models';
import { AnimatedItem } from './animations/AnimationComponents';
import { useTranslation } from '../hooks/useTranslation';

interface CommissionCardProps {
  commission: Commission;
}

export const CommissionCard: React.FC<CommissionCardProps> = ({ commission }) => {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();

  React.useEffect(() => {
    if (!isHovered) {
      setCurrentImgIdx(0);
      return;
    }
    if (commission.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImgIdx((prev) => (prev + 1) % Math.min(commission.images.length, 4));
    }, 1200);
    return () => clearInterval(interval);
  }, [isHovered, commission.images.length]);

  return (
    <AnimatedItem
      className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-amber-100 dark:border-gray-800"
    >
      <div
        className="aspect-[4/3] overflow-hidden relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {commission.images.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-amber-50 dark:bg-gray-800 text-amber-300 dark:text-amber-500 absolute top-0 left-0">
            <ImageOff className="w-12 h-12 mb-2" />
            <span className="text-xs text-amber-400 dark:text-amber-500">{t('commissions.noImage', 'No image available')}</span>
          </div>
        ) : (
          commission.images.map((img, imgIdx) => (
            <img
              key={img}
              src={img}
              alt={`${t('commissions.by', 'Commission by')} ${commission.commissioner}`}
              className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-700 ${imgIdx === currentImgIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              loading="lazy"
              style={{ pointerEvents: 'none' }}
            />
          ))
        )}
        {commission.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {commission.images.slice(0, 4).map((_, imgIdx) => (
              <div
                key={imgIdx}
                className={`w-5 h-2 rounded-full transition-colors duration-300 ${
                  imgIdx === currentImgIdx ? 'bg-white/80' : 'bg-black/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-200 mb-2">
          <User className="w-4 h-4" />
          <span>{commission.commissioner}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-amber-500 dark:text-amber-300">
          <Calendar className="w-3 h-3" />
          <span>{new Date(commission.date).toLocaleDateString()}</span>
        </div>
      </div>
    </AnimatedItem>
  );
};
