import { resources } from '../i18n';
import { availableTags } from '../data/tags';

// Define a literal type for all available tags
export type TagKey = typeof availableTags[number];

// Extract the type of the English translations
type TranslationResources = typeof resources.en.translation;

// Create nested types for each section of translations
export type BookTranslations = {
  [K in keyof TranslationResources['book']]: string;
};

export type TagTranslations = {
  [K in TagKey]: string;
};

export type ResultTranslations = {
  [K in keyof TranslationResources['results']]: string;
};

export type CommissionTranslations = {
  [K in keyof TranslationResources['commissions']]: string;
};

export type FooterTranslations = {
  [K in keyof TranslationResources['footer']]: string;
};

// Create types for specific translation paths
export type BookTranslationKey = keyof TranslationResources['book'];
export type TagTranslationKey = TagKey;
export type ResultTranslationKey = keyof TranslationResources['results'];
export type CommissionTranslationKey = keyof TranslationResources['commissions'];
export type FooterTranslationKey = keyof TranslationResources['footer'];

// Create a type for all translation keys with proper nesting
export type TranslationKey =
  | keyof TranslationResources
  | `book.${BookTranslationKey}`
  | `tags.${TagTranslationKey}`
  | `results.${ResultTranslationKey}`
  | `commissions.${CommissionTranslationKey}`
  | `footer.${FooterTranslationKey}`;

// Helper function to type-check translation keys
export function typedTranslation(key: TranslationKey): TranslationKey {
  return key;
}

// Type-safe helper for tags specifically
export function typedTagTranslation(tag: TagKey): `tags.${TagKey}` {
  return `tags.${tag}`;
}
