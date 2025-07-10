import { useTranslation as useI18nTranslation } from 'react-i18next';
import { TranslationKey } from '../types/i18n.types';

export function useTranslation() {
  const { t: originalT, i18n } = useI18nTranslation();

  // Create a typed version of the t function
  const t = (key: TranslationKey, defaultValue?: string) => {
    return originalT(key, defaultValue);
  };

  return { t, i18n };
}
