import { brand, ui } from './content';
import type { Locale } from './locale';

export const siteOrigin = 'https://www.alsalloummedical.com';
export const pageNames = ['home', 'about', 'products', 'partners', 'cases', 'contact'] as const;
export type PageName = (typeof pageNames)[number];
export function pagePath(locale: Locale, page: string) {
  return `/${locale}${page === 'home' ? '' : `/${page}`}`;
}
export function getPageMeta(locale: Locale, page: string) {
  const t = ui[locale];
  const descriptions = {
    home: t.heroDescription,
    about: t.aboutDescription,
    products: t.productsDescription,
    partners: t.partnersDescription,
    cases: t.casesPageDescription,
    contact: t.contactDescription,
  };
  const exists = (pageNames as readonly string[]).includes(page);
  const title =
    page === 'home'
      ? `${brand[locale]} | ${t.tagline}`
      : `${exists ? t[page as PageName] : t.notFound} | ${brand[locale]}`;
  return {
    title,
    description: exists ? descriptions[page as PageName] : t.notFoundDescription,
    canonical: `${siteOrigin}${pagePath(locale, exists ? page : '404')}`,
    locale: locale === 'ar' ? 'ar_SY' : 'en_US',
    image: `${siteOrigin}/assets/social-share.jpg`,
    imageAlt:
      locale === 'ar'
        ? 'السلوم الطبية — تجهيزات الجراحة العظمية والعصبية'
        : 'Alsalloum Medical — Orthopedic & Neurosurgical Supplies',
    exists,
  };
}
export function organizationData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteOrigin}/#organization`,
    name: 'Alsalloum Medical',
    alternateName: 'شركة السلوم الطبية',
    url: siteOrigin,
    logo: `${siteOrigin}/assets/alsalloum-logo-web.webp`,
    foundingDate: '2007',
    telephone: '+963935584468',
    address: { '@type': 'PostalAddress', addressLocality: 'Aleppo', addressCountry: 'SY' },
  };
}
export function applyPageMeta(locale: Locale, page: string) {
  const meta = getPageMeta(locale, page);
  document.documentElement.lang = locale;
  document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  document.title = meta.title;
  function setMeta(attribute: 'name' | 'property', key: string, content: string) {
    let node = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
    if (!node) {
      node = document.createElement('meta');
      node.setAttribute(attribute, key);
      document.head.append(node);
    }
    node.content = content;
  }
  setMeta('name', 'description', meta.description);
  setMeta('name', 'robots', meta.exists ? 'index, follow' : 'noindex, follow');
  for (const [key, content] of Object.entries({
    'og:type': 'website',
    'og:site_name': brand[locale],
    'og:title': meta.title,
    'og:description': meta.description,
    'og:url': meta.canonical,
    'og:locale': meta.locale,
    'og:locale:alternate': locale === 'ar' ? 'en_US' : 'ar_SY',
    'og:image': meta.image,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': meta.imageAlt,
  }))
    setMeta('property', key, content);
  for (const [key, content] of Object.entries({
    'twitter:card': 'summary_large_image',
    'twitter:title': meta.title,
    'twitter:description': meta.description,
    'twitter:image': meta.image,
    'twitter:image:alt': meta.imageAlt,
  }))
    setMeta('name', key, content);
  document.head
    .querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang]')
    .forEach((node) => node.remove());
  const canonical = document.createElement('link');
  canonical.rel = 'canonical';
  canonical.href = meta.canonical;
  document.head.append(canonical);
  if (meta.exists) {
    for (const language of ['ar', 'en', 'x-default'] as const) {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = language;
      link.href =
        language === 'x-default'
          ? `${siteOrigin}${pagePath('ar', page)}`
          : `${siteOrigin}${pagePath(language, page)}`;
      document.head.append(link);
    }
  }
  let data = document.getElementById('organization-data');
  if (!data) {
    data = document.createElement('script');
    data.id = 'organization-data';
    data.setAttribute('type', 'application/ld+json');
    document.head.append(data);
  }
  data.textContent = JSON.stringify(organizationData());
}
