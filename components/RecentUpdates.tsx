import React from 'react';
import { useTranslations } from 'next-intl';
import { getUserLocaleFromCookie } from '@/utils/getUserLocaleFromCookie';

interface Update {
  date: string;
  modelName: string;
}

interface RecentUpdatesProps {
  updates: Update[];
  isLoading: boolean;
}

const RecentUpdates: React.FC<RecentUpdatesProps> = ({ updates, isLoading }) => {
  const t = useTranslations('RecentUpdates');
  const userLocale = getUserLocaleFromCookie();
  const dateLocale = userLocale === 'en' ? 'en-GB' : userLocale;
  return (
    <div className="mx-auto mt-6 mb-12 max-w-2xl">
      <h3 className="mb-4 text-center text-lg font-semibold text-white">{t('title')}</h3>
      <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
        <div className="space-y-2">
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div key={`skeleton-${index}`} className="flex items-center text-sm">
                  <div className="h-4 w-20 animate-pulse rounded bg-slate-600/50"></div>
                </div>
              ))
            : updates.map((update, index) => {
                const formattedDate = new Intl.DateTimeFormat(dateLocale, {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                }).format(new Date(update.date));
                return (
                  <div
                    key={`${update.date}-${update.modelName}-${index}`}
                    className="flex items-center text-sm"
                  >
                    <span className="font-mono text-slate-400">{formattedDate}:</span>
                    <span className="ml-2 text-slate-300">
                      {t('addedCommission', { modelName: update.modelName })}
                    </span>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default RecentUpdates;
