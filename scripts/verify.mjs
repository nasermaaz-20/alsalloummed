import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';

process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('tmp/playwright-browsers');
const { chromium } = await import('playwright');
const { expect } = await import('@playwright/test');
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.TEST_BROWSER_EXECUTABLE || undefined,
});
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:5173';
const output = '.impeccable/review';
await mkdir(output, { recursive: true });
const errors = [];
const checks = [];
const record = (name, data = true) => {
  checks.push({ name, result: data });
  console.log(`PASS: ${name}`);
};
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  locale: 'fr-FR',
  reducedMotion: 'reduce',
});
const page = await context.newPage();
page.on('pageerror', (error) => errors.push(error.message));
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(message.text());
});
page.on('response', (response) => {
  if (response.status() >= 400 && response.url().startsWith(base))
    errors.push(`${response.status()}: ${response.url()}`);
});

async function ready() {
  await page.locator('h1').waitFor();
  await page.evaluate(() => document.fonts.ready);
}
async function noOverflow(label) {
  const dimensions = await page.evaluate(() => ({
    document: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  }));
  assert.ok(
    dimensions.document <= dimensions.viewport + 1,
    `${label}: horizontal overflow ${JSON.stringify(dimensions)}`,
  );
}
async function capture(path) {
  await page.evaluate(async () => {
    for (const img of document.images) img.loading = 'eager';
    await Promise.all([...document.images].map((img) => img.decode().catch(() => {})));
  });
  const broken = await page
    .locator('img')
    .evaluateAll((images) =>
      images.filter((img) => !img.complete || !img.naturalWidth).map((img) => img.src),
    );
  assert.deepEqual(broken, []);
  await page.screenshot({ path: `${output}/${path}`, fullPage: true, animations: 'disabled' });
}
try {
  await page.goto(base);
  await ready();
  assert.equal(new URL(page.url()).pathname, '/ar');
  record('Unsupported device language falls back to Arabic');
  assert.equal(await page.locator('html').getAttribute('dir'), 'rtl');
  await page.getByRole('button', { name: 'افتح القائمة' }).click();
  assert.equal(await page.locator('#mobile-menu').evaluate((node) => node.open), true);
  await page.locator('#mobile-menu').getByRole('link', { name: 'عن الشركة', exact: true }).click();
  await page.waitForURL('**/ar/about');
  assert.equal(await page.locator('#mobile-menu').evaluate((node) => node.open), false);
  assert.notEqual(
    await page.locator('body').evaluate((node) => getComputedStyle(node).overflow),
    'hidden',
  );
  record('Mobile navigation opens, navigates, closes, and restores scrolling');

  await page.goto(`${base}/ar/cases?type=spine`);
  await ready();
  assert.equal(await page.locator('.case-card').count(), 2);
  await page.locator('.case-image-button').first().click();
  assert.equal(await page.locator('.case-dialog').evaluate((node) => node.open), true);
  assert.match(await page.locator('#case-dialog-title').innerText(), /جنف/);
  await page.getByRole('button', { name: 'تكبير الصورة', exact: true }).click();
  assert.equal(await page.locator('.dialog-image.is-zoomed').count(), 1);
  await page.getByRole('button', { name: 'عرض الصورة كاملة', exact: true }).click();
  await page.getByRole('button', { name: 'الحالة التالية', exact: true }).click();
  assert.match(await page.locator('#case-dialog-title').innerText(), /ركبة/);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.case-dialog').evaluate((node) => node.open), false);
  assert.equal(
    await page
      .locator('.case-image-button')
      .first()
      .evaluate((node) => node === document.activeElement),
    true,
  );
  record('Case filters, full-size image, zoom, next case, Escape, and focus restoration');

  await page.goto(`${base}/ar/contact`);
  await ready();
  await page.locator('#interest').selectOption('spine');
  await page.locator('#organization').fill('اختبار محلي للمشفى');
  await page.locator('#enquiry-message').fill('استفسار تجريبي لا يتم إرساله');
  const enquiry = await page.locator('.enquiry-fields a').getAttribute('href');
  const enquiryUrl = new URL(enquiry);
  assert.equal(enquiryUrl.pathname, '/963935584468');
  assert.match(enquiryUrl.searchParams.get('text'), /اختبار محلي للمشفى/);
  assert.match(enquiryUrl.searchParams.get('text'), /العمود الفقري/);
  assert.equal(await page.locator('a[href="tel:+963941370604"]').count(), 2);
  record('WhatsApp enquiry composes correct recipient, specialty, and message without sending');

  await page.goto(`${base}/ar/products?category=fixation`);
  await ready();
  assert.match(await page.locator('.category-detail h2').innerText(), /التثبيت/);
  assert.equal(await page.locator('.category-side a').count(), 1);
  await page.locator('.category-filters button').last().click();
  assert.match(page.url(), /category=spine/);
  await expect(page.locator('.related-cases .case-card')).toHaveCount(2);
  record('Specialties change through shareable URL and show relevant cases');

  for (const locale of ['ar', 'en']) {
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: width >= 900 ? 1000 : 844 });
      for (const route of ['', '/about', '/products', '/partners', '/cases', '/contact']) {
        await page.goto(`${base}/${locale}${route}`);
        await ready();
        assert.equal(await page.locator('h1').count(), 1);
        assert.equal(await page.locator('html').getAttribute('lang'), locale);
        await noOverflow(`${locale}${route} @ ${width}`);
      }
    }
  }
  record('All six pages in both languages fit 320, 390, 768, 1024, and 1440px');
  await page.setViewportSize({ width: 390, height: 844 });
  for (const locale of ['ar', 'en']) {
    for (const route of ['', '/about', '/products', '/partners', '/cases', '/contact']) {
      await page.goto(`${base}/${locale}${route}`);
      await ready();
      await page.evaluate(() => {
        document.documentElement.style.fontSize = '200%';
      });
      await noOverflow(`200% text: ${locale}${route}`);
    }
  }
  record('All six pages reflow with 200% text at 390px in both languages');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${base}/ar/cases`);
  await ready();
  await page.getByRole('link', { name: 'تغيير اللغة إلى الإنكليزية' }).click();
  await page.waitForURL('**/en/cases');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await page.goto(base);
  await ready();
  assert.equal(new URL(page.url()).pathname, '/en');
  record('Language switch preserves current page and stored preference overrides device language');
  await page.goto(`${base}/ar`);
  await ready();
  assert.equal(await page.locator('html').getAttribute('lang'), 'ar');
  record('Explicit language URL overrides stored preference');
  const english = await browser.newContext({ locale: 'en-US', reducedMotion: 'reduce' });
  const enPage = await english.newPage();
  await enPage.goto(base);
  await enPage.locator('h1').waitFor();
  assert.equal(new URL(enPage.url()).pathname, '/en');
  await english.close();
  record('English device language selects English on the first visit');
  const pdf = await context.request.get(`${base}/documents/company-profile.pdf`);
  assert.equal(pdf.status(), 200);
  assert.ok((await pdf.body()).subarray(0, 4).equals(Buffer.from('%PDF')));
  record('Company profile is a downloadable PDF');
  await page.goto(`${base}/ar/unknown-page`);
  await ready();
  assert.match(await page.locator('h1').innerText(), /غير موجودة/);
  record('Unknown routes have an accessible recovery page');

  const motionContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    locale: 'ar',
    reducedMotion: 'no-preference',
  });
  const motionPage = await motionContext.newPage();
  motionPage.on('pageerror', (error) => errors.push(error.message));
  await motionPage.goto(`${base}/ar`);
  await motionPage.locator('h1').waitFor();
  await expect
    .poll(() =>
      motionPage
        .locator('[data-intro]')
        .first()
        .evaluate((node) => node.style.transform),
    )
    .toMatch(/translateY/);
  await motionPage.getByRole('button', { name: 'افتح القائمة' }).click();
  await motionPage.keyboard.press('Escape');
  await motionPage.goto(`${base}/ar/cases`);
  await motionPage.locator('.case-image-button').first().click();
  await expect
    .poll(() => motionPage.locator('.case-dialog-content').evaluate((node) => node.style.transform))
    .toMatch(/translateY/);
  await motionPage.keyboard.press('Escape');
  await motionContext.close();
  record('Anime.js runs in normal-motion React Strict Mode without runtime errors');

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${base}/ar`);
  await ready();
  await capture('desktop.png');
  await page.setViewportSize({ width: 390, height: 844 });
  await capture('mobile.png');
  await page.goto(`${base}/en`);
  await ready();
  await capture('mobile-en.png');
  await page.setViewportSize({ width: 1440, height: 1000 });
  await capture('desktop-en.png');
  await page.goto(`${base}/ar/contact`);
  await ready();
  await page.setViewportSize({ width: 390, height: 844 });
  await capture('contact-mobile.png');
  await page.goto(`${base}/ar/cases`);
  await ready();
  await page.locator('.case-image-button').first().click();
  await page.screenshot({ path: `${output}/case-dialog-mobile.png`, fullPage: false });
  await page.keyboard.press('Escape');
  record('Arabic/English desktop/mobile and interactive-state screenshots captured');
  assert.deepEqual(errors, [], 'Browser runtime and asset errors');
  record('No browser runtime or local asset errors');
  await writeFile(
    `${output}/verification.json`,
    JSON.stringify({ checkedAt: new Date().toISOString(), base, checks, errors }, null, 2),
  );
} finally {
  await browser.close();
}
