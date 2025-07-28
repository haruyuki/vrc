'use client';

import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';

export default function Header() {
  const t = useTranslations('Header');

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-slate-700 bg-slate-900 shadow-sm backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 md:py-3 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 p-3 shadow-lg">
              <Palette className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{t('title')}</h1>
            </div>
          </div>
          <div className="flex items-center">
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
