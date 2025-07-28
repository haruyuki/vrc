'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Star, User } from 'lucide-react';
import Image from 'next/image';
import { Model } from '@/types';
import React from 'react';

interface MobileModelCardProps {
  model: Model;
  showCommissionerCounts: boolean;
  onSelect: (model: Model) => void;
}

export default function MobileModelCard({
  model,
  showCommissionerCounts,
  onSelect,
}: MobileModelCardProps) {
  return (
    <motion.div
      className="group relative w-full cursor-pointer"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onSelect(model)}
    >
      {/* Mobile list card */}
      <div className="relative flex w-full overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 group-hover:shadow-xl dark:bg-slate-800">
        {/* Spine */}
        <div
          className="h-full"
          style={{
            width: '8px',
            minWidth: '8px',
            backgroundColor: model.bgColor,
          }}
        />

        {/* Image section */}
        <div className="h-20 w-20 flex-shrink-0 overflow-hidden bg-slate-700">
          <Image
            src={model.coverImage}
            alt={`${model.modelName} base model`}
            width={80}
            height={80}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Content section */}
        <div className="flex flex-1 flex-col justify-center p-3">
          <div className="mb-1 flex items-center justify-between">
            <h3 className="mr-2 flex-1 truncate text-lg font-bold text-white">{model.modelName}</h3>
            {model.featured && (
              <Star className="h-5 w-5 flex-shrink-0 fill-current text-yellow-400" />
            )}
          </div>

          {/* Commissioner count */}
          {showCommissionerCounts ? (
            <div className="mb-1 flex items-center gap-2 text-sm text-white/90">
              <User className="h-4 w-4" />
              <span>{model.commissioners?.length || 0}</span>
            </div>
          ) : (
            <div className="mb-1 flex items-center gap-2 text-sm text-white/50">
              <div className="h-4 w-4 animate-pulse rounded bg-white/20" />
              <div className="h-4 w-20 animate-pulse rounded bg-white/20" />
            </div>
          )}
        </div>

        {/* Official link button */}
        <div className="flex items-center p-3">
          <a
            href={model.officialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-lg bg-slate-700 px-3 py-2 text-xs text-white transition-colors hover:bg-slate-600 hover:text-amber-200"
            aria-label={`View ${model.modelName} official page`}
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={16} className="inline-block align-text-bottom" />
            Official
          </a>
        </div>
      </div>
    </motion.div>
  );
}
