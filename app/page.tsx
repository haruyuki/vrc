'use client';

import Header from '@/components/Header';
import ModelGrid from '@/components/ModelGrid';
import RecentUpdates from '@/components/RecentUpdates';
import { useCommissionData } from '@/hooks/useCommissionData';
import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { getUserLocaleFromCookie } from '@/utils/getUserLocaleFromCookie';

function useLoadingAnimation(loading: boolean) {
  const [animationState, setAnimationState] = useState<'loading' | 'completed'>('loading');

  useEffect(() => {
    if (loading) {
      setAnimationState('loading');
    } else {
      setAnimationState('completed');
    }
  }, [loading]);

  return animationState;
}

const ErrorDisplay = ({ error, onRetry }: { error: string; onRetry: () => void }) => {
  const t = useTranslations('Home');
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-900">
      <div className="mx-auto max-w-md p-6 text-center">
        <div className="mb-4 text-xl text-red-400">⚠️ {t('errorTitle')}</div>
        <p className="mb-4 text-slate-300">{error}</p>
        <button
          onClick={onRetry}
          className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          {t('retry')}
        </button>
      </div>
    </main>
  );
};

const ProgressBar = ({
  animationState,
  statusText,
}: {
  animationState: 'loading' | 'completed';
  statusText: string;
}) => (
  <div className="mb-8">
    <div className="mb-2 flex items-center justify-center">
      <div className="text-sm text-slate-400">{statusText}</div>
    </div>
    <div className="flex justify-center">
      {animationState === 'loading' && (
        <div className="h-2 w-64 rounded-full bg-slate-700">
          <div className="h-2 animate-pulse rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
        </div>
      )}
      {animationState === 'completed' && (
        <div className="h-2 w-64 rounded-full bg-slate-700">
          <div className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
        </div>
      )}
    </div>
  </div>
);

export default function Home() {
  const { models, loading, error, stats } = useCommissionData();
  const t = useTranslations('Home');
  const tFooter = useTranslations('Footer');
  const animationState = useLoadingAnimation(loading);

  const latestCommissionDate = stats?.latestCommissionDate || null;
  const recentModelUpdates = stats?.recentModelUpdates || [];

  let statusText: string;
  const userLocale = getUserLocaleFromCookie();
  if (loading) {
    statusText = t('loading');
  } else if (latestCommissionDate) {
    const formattedDate = new Intl.DateTimeFormat(userLocale, {
      year: '2-digit',
      month: '2-digit',
      day: 'numeric',
    }).format(new Date(latestCommissionDate));
    statusText = t('latestCommission', { date: formattedDate });
  } else {
    statusText = t('noCommissionData');
  }

  const handleRetry = useCallback(() => {
    window.location.reload();
  }, []);

  // Early return for error state
  if (error) {
    return <ErrorDisplay error={error} onRetry={handleRetry} />;
  }

  return (
    <main className="min-h-screen bg-slate-900">
      <Header />

      <section className="px-6 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">{t('title')}</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-300">{t('description')}</p>
          </div>

          <ProgressBar animationState={animationState} statusText={statusText} />

          <ModelGrid models={models} showCommissionerCounts={!loading} />

          <RecentUpdates updates={recentModelUpdates} isLoading={loading} />

          {/* Showcase Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative overflow-hidden">
              <img
                src="/assets/images/showcase.webp"
                alt="Showcase of VRChat model textures created by Haru"
                className="mx-auto h-auto max-h-96 w-full object-contain"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Commission Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-600 to-purple-600 p-8">
              <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">{t('buttonTitle')}</h3>
              <p className="mx-auto mb-6 max-w-2xl text-blue-100">{t('buttonDescription')}</p>
              <motion.a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdG4RnM_IKW4ypVTuZ2wuQz3JLqcnBIbTUSAGZATHdbzm1B5Q/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('buttonButton')}
                <ExternalLink className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-800/50 px-6 py-8">
        <div className="mx-auto max-w-6xl text-center">
          <div className="space-y-3">
            <p className="text-sm text-slate-400">{tFooter('copyright')}</p>
            <p className="text-xs text-slate-500">{tFooter('modelDisclaimer')}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
