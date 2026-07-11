export const locales = ['ta', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ta';