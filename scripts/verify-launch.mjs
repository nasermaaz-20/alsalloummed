import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('tmp/playwright-browsers');
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.TEST_BROWSER_EXECUTABLE || undefined,
});
const output = '.impeccable/review';
await mkdir(output, { recursive: true });
const checks = [];
const errors = [];
const pass = (name) => {
  checks.push(name);
  console.log(`PASS: ${name}`);
};
try {
  const context = await browser.newContext({
    reducedMotion: 'reduce',
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  const descriptions = new Set();
  for (const locale of ['ar', 'en'])
    for (const name of ['', '/about', '/products', '/partners', '/cases', '/contact']) {
      const path = `/${locale}${name}`;
      const response = await context.request.get(`${base}${path}`);
      assert.equal(response.status(), 200, path);
      const html = await response.text();
      assert.ok(
        !/96729|السجل التجاري|Commercial registration|963941370604|company-profile\.pdf/.test(html),
        `${path}: requested removals`,
      );
      assert.ok(
        html.includes('Made by ENG.OMAR ALAKILI') && html.includes('https://wa.me/963994074650'),
        `${path}: developer credit`,
      );
      assert.ok(
        html.includes('data-prerendered="true"') && html.includes('<h1'),
        `${path}: rendered content before JavaScript`,
      );
      assert.ok(html.includes(`lang="${locale}"`));
      assert.ok(html.includes(`rel="canonical" href="https://www.alsalloummedical.com${path}"`));
      for (const language of ['ar', 'en', 'x-default'])
        assert.ok(html.includes(`hreflang="${language}"`));
      for (const property of ['og:title', 'og:description', 'og:image', 'og:url'])
        assert.ok(html.includes(`property="${property}"`));
      descriptions.add(html.match(/name="description" content="([^"]+)"/)[1]);
      await page.goto(`${base}${path}`);
      await page.locator('#boot-loader').waitFor({ state: 'detached' });
      await page.getByRole('heading', { level: 1 }).waitFor();
      await expect(page.locator('#boot-recovery')).toBeHidden();
      assert.ok(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
        path,
      );
    }
  assert.equal(descriptions.size, 12);
  assert.equal((await context.request.get(`${base}/documents/company-profile.pdf`)).status(), 404);
  pass(
    '12 bilingual pages have static HTML, unique descriptions, canonical, alternate languages, social tags, and clean hydration',
  );
  const sitemap = await context.request.get(`${base}/sitemap.xml`);
  assert.equal(sitemap.status(), 200);
  assert.equal(((await sitemap.text()).match(/<loc>/g) || []).length, 12);
  const robots = await context.request.get(`${base}/robots.txt`);
  assert.match(await robots.text(), /Sitemap: https:\/\/www.alsalloummedical.com\/sitemap.xml/);
  const social = await context.request.get(`${base}/assets/social-share.jpg`);
  assert.equal(social.status(), 200);
  assert.match(social.headers()['content-type'], /image\/jpeg/);
  const notFound = await context.request.get(`${base}/ar/missing-page`);
  assert.equal(notFound.status(), 404);
  assert.ok((await notFound.text()).includes('noindex, follow'));
  assert.equal((await context.request.get(`${base}/assets/missing.png`)).status(), 404);
  pass('Sitemap, robots, share image, real HTTP 404, and missing-asset status work');
  await page.goto(`${base}/ar/products?category=spine`);
  await page.locator('#boot-loader').waitFor({ state: 'detached' });
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://www.alsalloummedical.com/ar/products',
  );
  pass(
    'Shareable query filters render without hydration mismatch and preserve a clean canonical URL',
  );
  await context.close();

  // Reproduce the reported bug before React can select a language: pause the
  // entry module on both the development HTML and the built HTML.
  for (const origin of [base, 'http://127.0.0.1:5173']) {
    for (const scenario of [
      { path: '/en', saved: 'ar', device: 'ar-SY', expected: 'en' },
      { path: '/ar', saved: 'en', device: 'en-US', expected: 'ar' },
      { path: '/', saved: 'en', device: 'ar-SY', expected: 'en' },
      { path: '/', saved: null, device: 'en-US', expected: 'en' },
    ]) {
      const cold = await browser.newContext({
        locale: scenario.device,
        viewport: { width: 390, height: 844 },
      });
      if (scenario.saved)
        await cold.addInitScript(
          (value) => localStorage.setItem('alsalloum.language.v1', value),
          scenario.saved,
        );
      const coldPage = await cold.newPage();
      let releaseEntry;
      const entryGate = new Promise((resolve) => {
        releaseEntry = resolve;
      });
      await coldPage.route(/\/src\/main\.tsx|\/assets\/index-[^/]+\.js/, async (route) => {
        await entryGate;
        await route.continue();
      });
      await coldPage.goto(`${origin}${scenario.path}`, { waitUntil: 'commit' });
      await expect(coldPage.locator('#boot-loader')).toBeVisible();
      await expect(coldPage.locator('html')).toHaveAttribute('lang', scenario.expected);
      await expect(
        coldPage.locator(`.boot-name [data-boot-lang="${scenario.expected}"]`),
      ).toBeVisible();
      await expect(
        coldPage.locator(
          `.boot-name [data-boot-lang="${scenario.expected === 'en' ? 'ar' : 'en'}"]`,
        ),
      ).toBeHidden();
      if (scenario.path === '/en')
        await coldPage.screenshot({
          path: `${output}/boot-english-${origin.endsWith('5173') ? 'dev' : 'build'}.png`,
        });
      releaseEntry();
      await coldPage.locator('#boot-loader').waitFor({ state: 'detached' });
      await cold.close();
    }
  }
  pass(
    'Loading language is correct before React starts on explicit, stored, and device-language routes in development and production',
  );

  const noScript = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await noScript.newPage();
  await staticPage.goto(`${base}/en/about`);
  await expect(staticPage.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(staticPage.locator('#boot-loader')).toBeHidden();
  assert.ok((await staticPage.locator('main').innerText()).includes('Aleppo'));
  await noScript.close();
  pass('Company content and contact links remain readable without JavaScript');

  const slow = await browser.newContext({
    reducedMotion: 'no-preference',
    viewport: { width: 390, height: 844 },
  });
  const slowPage = await slow.newPage();
  slowPage.on('pageerror', (error) => errors.push(error.message));
  let release;
  const gate = new Promise((resolve) => {
    release = resolve;
  });
  await slowPage.route('**/assets/orthopedic-preparation*.webp', async (route) => {
    await gate;
    await route.continue();
  });
  await slowPage.goto(`${base}/ar`, { waitUntil: 'domcontentloaded' });
  await expect(slowPage.locator('#boot-loader')).toBeVisible();
  await slowPage.screenshot({ path: `${output}/boot-loading-mobile.png` });
  await slowPage.locator('#boot-loader').waitFor({ state: 'detached', timeout: 4500 });
  await expect(slowPage.locator('.hero-image-frame')).toHaveAttribute('data-state', 'loading');
  await expect(slowPage.locator('.hero-image-frame .image-skeleton')).toBeVisible();
  await slowPage.screenshot({ path: `${output}/image-skeleton-mobile.png` });
  release();
  await expect(slowPage.locator('.hero-image-frame')).toHaveAttribute('data-state', 'loaded');
  await expect
    .poll(() => slowPage.locator('.hero-image').evaluate((img) => getComputedStyle(img).filter))
    .toMatch(/none|blur\(0px\)/);
  await slow.close();
  pass(
    'Slow critical image shows splash then local skeleton, does not block the site, and resolves with a smooth image reveal',
  );

  const failure = await browser.newContext({
    reducedMotion: 'reduce',
    viewport: { width: 390, height: 844 },
  });
  const failPage = await failure.newPage();
  failPage.on('pageerror', (error) => errors.push(error.message));
  await failPage.route('**/assets/op1.jpg', (route) => route.abort());
  await failPage.goto(`${base}/ar/cases`);
  await failPage.locator('#boot-loader').waitFor({ state: 'detached' });
  await expect(failPage.locator('.case-card').first().locator('.image-error')).toBeVisible();
  await failPage.locator('.case-image-button').first().click();
  await expect(failPage.locator('.case-dialog')).toBeVisible();
  await expect(failPage.locator('.dialog-description h2')).toBeVisible();
  await failPage.screenshot({ path: `${output}/image-failure-mobile.png` });
  await failure.close();
  pass('Failed clinical image shows an accessible fallback while case details remain usable');
  const unavailable = await browser.newContext({
    reducedMotion: 'reduce',
    viewport: { width: 390, height: 844 },
  });
  const unavailablePage = await unavailable.newPage();
  await unavailablePage.route('**/assets/index-*.js', (route) => route.abort());
  await unavailablePage.goto(base, { waitUntil: 'domcontentloaded' });
  await expect(unavailablePage.locator('#boot-recovery')).toBeVisible({ timeout: 5000 });
  await expect(unavailablePage.locator('#boot-loader')).toHaveCount(0);
  await expect(unavailablePage.locator('#boot-recovery a[href="/ar"]')).toBeVisible();
  await unavailable.close();
  pass(
    'Unavailable JavaScript cannot trap visitors in the loader; language and WhatsApp recovery links remain available',
  );
  assert.deepEqual(errors, []);
  await writeFile(
    `${output}/launch-verification.json`,
    JSON.stringify({ checks, errors }, null, 2),
  );
} finally {
  await browser.close();
}
