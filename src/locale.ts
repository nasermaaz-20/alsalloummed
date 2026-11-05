export type Locale = 'ar' | 'en';
const key = 'alsalloum.language.v1';
export function isLocale(value: string | undefined): value is Locale {
  return value === 'ar' || value === 'en';
}
export function preferredLocale(): Locale {
  try {
    const saved = localStorage.getItem(key);
    if (isLocale(saved ?? undefined)) return saved as Locale;
  } catch {
    /* Storage is optional. */
  }
  for (const language of navigator.languages ?? [navigator.language]) {
    const short = language.toLowerCase().split('-')[0];
    if (isLocale(short)) return short;
  }
  return 'ar';
}
export function saveLocale(locale: Locale) {
  try {
    localStorage.setItem(key, locale);
  } catch {
    /* Navigation works without storage. */
  }
}
