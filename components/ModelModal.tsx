'use client';

import { motion } from 'framer-motion';
import { X, Star, ExternalLink } from 'lucide-react';
import { Model } from '@/types';
import CommissionerCard from './CommissionerCard';
import React from 'react';
import { useTranslations } from 'next-intl';

interface ModelModalProps {
  model: Model;
  onClose: () => void;
}

export default function ModelModal({ model, onClose }: ModelModalProps) {
  const t = useTranslations('ModelModal');
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-slate-700 p-6">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <h2 className="text-2xl font-bold text-white">{model.modelName}</h2>
              {model.featured && <Star className="h-6 w-6 fill-current text-yellow-400" />}
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Commissioners grid */}
        <div className="p-6">
          {/* Safety check for commissioners */}
          {model.commissioners && model.commissioners.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {model.commissioners.map((commissioner, index) => (
                <CommissionerCard key={commissioner.id} commissioner={commissioner} index={index} />
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-slate-400">
              <p>{t('noCommissions')}</p>
            </div>
          )}

          {/* Official link in modal */}
          <div className="mt-8 border-t border-slate-700 pt-6">
            <a
              href={model.officialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 font-medium text-white transition-all hover:from-blue-700 hover:to-purple-700"
            >
              <ExternalLink size={16} className="inline-block align-text-bottom" />
              {t('officialLink')}
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
