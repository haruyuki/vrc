import React from 'react';
import { useTranslation } from 'react-i18next';

const CommissionInfo: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <h2 id="commission-title" className="text-4xl md:text-6xl font-bold text-amber-900 dark:text-amber-100 mb-6 text-center">
        {t('vrc_commissions_title')}
      </h2>
      <div className="flex justify-center">
          <img
              src="/assets/images/commissions/showcase.png"
              alt="Showcase of completed models"
              className="w-full h-auto max-w-3xl"
              style={{ maxHeight: 400 }}
          />
      </div>
      <section aria-labelledby="commission-title" className="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-md p-6 mb-10 max-w-3xl mx-auto border border-amber-200 dark:border-gray-800">
        <div className="text-center text-lg font-semibold text-amber-800 dark:text-amber-200 mb-4">
          {t('commission_info.base_price')}
        </div>
        <ul className="list-disc list-inside text-amber-800 dark:text-amber-200 space-y-1 mb-4 text-base">
          <li>{t('commission_info.furry_only')}</li>
          <li>{t('commission_info.complex_design')}</li>
          <li>{t('commission_info.extra_clothing')}</li>
          <li>{t('commission_info.clothing_texture')}</li>
          <li>{t('commission_info.free_revisions')}</li>
          <li>{t('commission_info.extra_animations')}</li>
          <li>{t('commission_info.sdk2_update')}</li>
          <li>{t('commission_info.model_files')}</li>
          <li>{t('commission_info.upload_options')}</li>
          <li>{t('commission_info.streaming')}</li>
          <li>{t('commission_info.showcase')}</li>
        </ul>
        <div className="mb-2">
          <span className="font-semibold text-amber-900 dark:text-amber-100">{t('commission_info.payment_title')}</span>
          <ul className="list-disc list-inside ml-5 text-amber-800 dark:text-amber-200">
            <li>{t('commission_info.payment_after')}</li>
            <li>{t('commission_info.payment_methods')}</li>
          </ul>
        </div>
        <div className="text-center mt-4">
          <button
            disabled
            aria-disabled="true"
            className="inline-block bg-gray-400 text-white font-bold py-2 px-6 rounded-lg shadow transition opacity-60 cursor-not-allowed"
            title="Commission form not available yet"
          >
            {t('commission_info.request_button')}
          </button>
        </div>
      </section>
    </>
  );
};

export default CommissionInfo;
