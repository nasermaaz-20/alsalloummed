import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const { renderPage, getPageMeta, pageNames, pagePath, organizationData, siteOrigin } = await import(
  pathToFileURL(resolve('tmp/ssr-build/entry-server.js')).href
);
const original = await readFile('dist/index.html', 'utf8');
const escape = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
function head(locale, page) {
  const meta = getPageMeta(locale, page);
  const tags = [
    `<title>${escape(meta.title)}</title>`,
    `<meta name="description" content="${escape(meta.description)}">`,
    `<meta name="robots" content="${meta.exists ? 'index, follow' : 'noindex, follow'}">`,
    `<link rel="canonical" href="${meta.canonical}">`,
  ];
  if (meta.exists)
    for (const language of ['ar', 'en', 'x-default'])
      tags.push(
        `<link rel="alternate" hreflang="${language}" href="${siteOrigin}${pagePath(language === 'x-default' ? 'ar' : language, page)}">`,
      );
  const openGraph = {
    'og:type': 'website',
    'og:site_name': locale === 'ar' ? 'السلوم الطبية' : 'Alsalloum Medical',
    'og:title': meta.title,
    'og:description': meta.description,
    'og:url': meta.canonical,
    'og:locale': meta.locale,
    'og:locale:alternate': locale === 'ar' ? 'en_US' : 'ar_SY',
    'og:image': meta.image,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': meta.imageAlt,
  };
  for (const [property, value] of Object.entries(openGraph))
    tags.push(`<meta property="${property}" content="${escape(value)}">`);
  for (const [name, value] of Object.entries({
    'twitter:card': 'summary_large_image',
    'twitter:title': meta.title,
    'twitter:description': meta.description,
    'twitter:image': meta.image,
    'twitter:image:alt': meta.imageAlt,
  }))
    tags.push(`<meta name="${name}" content="${escape(value)}">`);
  tags.push(
    `<script id="organization-data" type="application/ld+json">${JSON.stringify(organizationData()).replaceAll('<', '\\u003c')}</script>`,
  );
  return tags.join('\n');
}
function documentFor(locale, page, render = true) {
  let html = original
    .replace(/<html\b[^>]*>/, `<html lang="${locale}" dir="${locale === 'ar' ? 'rtl' : 'ltr'}">`)
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace(/<meta\b[^>]*name=["']description["'][^>]*>/, '')
    .replace('</head>', `${head(locale, page)}\n</head>`);
  if (render)
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root" data-prerendered="${page === '404' ? 'false' : 'true'}">${renderPage(pagePath(locale, page))}</div>`,
    );
  return html;
}
for (const locale of ['ar', 'en'])
  for (const page of pageNames) {
    const path = pagePath(locale, page);
    await mkdir(`dist${path}`, { recursive: true });
    await writeFile(`dist${path}/index.html`, documentFor(locale, page));
  }
await writeFile('dist/index.html', documentFor('ar', 'home', false));
await writeFile('dist/404.html', documentFor('ar', '404'));
const urls = pageNames.flatMap((page) =>
  ['ar', 'en'].map(
    (locale) =>
      `<url><loc>${siteOrigin}${pagePath(locale, page)}</loc>${['ar', 'en', 'x-default'].map((language) => `<xhtml:link rel="alternate" hreflang="${language}" href="${siteOrigin}${pagePath(language === 'x-default' ? 'ar' : language, page)}"/>`).join('')}</url>`,
  ),
);
await writeFile(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join('\n')}</urlset>\n`,
);
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${siteOrigin}/sitemap.xml\n`);
await writeFile(
  'dist/_redirects',
  pageNames
    .flatMap((page) =>
      ['ar', 'en'].map(
        (locale) => `${pagePath(locale, page)} ${pagePath(locale, page)}/index.html 200`,
      ),
    )
    .concat('/* /404.html 404')
    .join('\n') + '\n',
);
console.log('Pre-rendered 12 localized pages, 404, sitemap.xml, and robots.txt');
