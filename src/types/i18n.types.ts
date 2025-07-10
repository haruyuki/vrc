import { resources } from './i18n';

// Extract the type of the English translations
type TranslationResources = typeof resources.en.translation;

// Create nested types for each section of translations
export type BookTranslations = {
  [K in keyof TranslationResources['book']]: string;
};

export type TagTranslations = {
  [K in keyof TranslationResources['tags']]: string;
};

export type ResultTranslations = {
  [K in keyof TranslationResources['results']]: string;
};

// Create types for specific translation paths
export type BookTranslationKey = keyof TranslationResources['book'];
export type TagTranslationKey = keyof TranslationResources['tags'];
export type ResultTranslationKey = keyof TranslationResources['results'];

// Create a type for all translation keys with proper nesting
export type TranslationKey =
  | keyof TranslationResources
  | `book.${BookTranslationKey}`
  | `tags.${TagTranslationKey}`
  | `results.${ResultTranslationKey}`;

// Helper function to type-check translation keys
export function typedTranslation(key: TranslationKey): TranslationKey {
  return key;
}
