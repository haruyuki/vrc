'use client';

import { motion } from 'framer-motion';
import { Star, UsersRound, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Model } from '@/types';
import React from 'react';
import { useTranslations } from 'next-intl';

// Helper function to create gradient from spine color
const getGradientStyle = (bgColor: string) => {
  if (!bgColor) {
    bgColor = '#4F46E5';
  }

  const hex = bgColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const lighterR = Math.min(255, r + 30);
  const lighterG = Math.min(255, g + 30);
  const lighterB = Math.min(255, b + 30);

  return {
    background: `linear-gradient(135deg, rgb(${r}, ${g}, ${b}) 0%, rgb(${lighterR}, ${lighterG}, ${lighterB}) 100%)`,
  };
};

interface DesktopModelCardProps {
  model: Model;
  showCommissionerCounts: boolean;
  onSelect: (model: Model) => void;
}

export default function DesktopModelCard({
  model,
  showCommissionerCounts,
  onSelect,
}: DesktopModelCardProps) {
  const t = useTranslations('ModelCard');

  const gradientStyle = getGradientStyle(model.bgColor);

  return (
    <motion.div
      className="group relative w-full cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(model)}
    >
      {/* Model Card */}
      <div className="relative h-full w-full overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 group-hover:shadow-xl dark:bg-slate-800">
        {/* Featured star */}
        {model.featured && (
          <div className="absolute top-4 right-4 z-20">
            <Star className="h-6 w-6 fill-current text-yellow-400" />
          </div>
        )}

        {/* Base model image */}
        <div className="aspect-square overflow-hidden bg-slate-700">
          <Image
            src={model.coverImage}
            alt={`${model.modelName} base model`}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            priority={true}
          />
        </div>

        {/* Model info section */}
        <div className="w-full px-3 py-3" style={gradientStyle}>
          <div className="mb-1 flex items-center justify-between">
            <h3
              className="truncate text-left text-lg leading-6 font-bold text-white"
              style={{
                maxWidth: '65%',
                textShadow: '0 1px 2px rgba(0,0,0,0.5)',
              }}
            >
              {model.modelName}
            </h3>
            <a
              href={model.officialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded-full bg-black/20 px-2 py-1 text-xs text-white transition-colors hover:text-amber-200"
              aria-label={`View ${model.modelName} official page`}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={16} className="inline-block align-text-bottom" />
              {t('viewOfficialPage')}
            </a>
          </div>

          {/* Commissioner count */}
          <div className="flex items-center gap-2 text-sm text-white/50">
            <span style={{ filter: 'drop-shadow(1px 1px 1px rgb(0,0,0))' }}>
              <UsersRound className="h-4 w-4" />
            </span>
            {showCommissionerCounts ? (
              <span
                className="text-white/90"
                style={{
                  maxWidth: '65%',
                  textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                }}
              >
                {model.commissioners?.length || 0}
              </span>
            ) : (
              <div className="h-4 w-20 animate-pulse rounded bg-white/20" />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
