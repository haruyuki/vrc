import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { FadeIn } from './animations/AnimationComponents';

export const CommissionInfo: React.FC = () => {
  const { t } = useTranslation();
  return (
    <FadeIn>
      <h2
        id="commission-title"
        className="text-4xl md:text-6xl font-bold text-amber-900 dark:text-amber-100 mb-6 text-center"
      >
        {t('vrc_commissions_title')}
      </h2>
      <div className="flex justify-center">
        <img
          src="/assets/images/commissions/showcase.webp"
          alt="Showcase of completed models"
          className="w-full h-auto max-w-3xl"
          style={{ maxHeight: 400 }}
        />
      </div>
      <section
        aria-labelledby="commission-title"
        className="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-md p-6 mb-10 max-w-3xl mx-auto border border-amber-200 dark:border-gray-800"
      >
        <p className="mb-6 text-lg text-amber-900 dark:text-amber-100">
          {t('commission_info')}
        </p>
        <div className="flex justify-center">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdG4RnM_IKW4ypVTuZ2wuQz3JLqcnBIbTUSAGZATHdbzm1B5Q/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-6 rounded-lg shadow transition dark:bg-amber-800 dark:hover:bg-amber-900"
          >
            {t('request_commission')}
          </a>
        </div>
      </section>
    </FadeIn>
  );
};
