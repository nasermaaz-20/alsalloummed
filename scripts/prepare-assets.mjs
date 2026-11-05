import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

await mkdir('public/fonts', { recursive: true });
await mkdir('public/assets', { recursive: true });
const origins = [];
async function fetchBytes(url) {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(45000),
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36',
    },
  });
  if (!response.ok) throw new Error(`${response.status}: ${url}`);
  return Buffer.from(await response.arrayBuffer());
}
async function save(url, path) {
  const data = await fetchBytes(url);
  await writeFile(path, data);
  origins.push({ path, origin: url, sha256: createHash('sha256').update(data).digest('hex') });
  console.log(`Saved ${path} (${data.length} bytes)`);
}
const outcomes = await Promise.allSettled([
  (async () => {
    const url =
      'https://fonts.googleapis.com/css2?family=Alexandria:wght@400;500;600;700&display=swap';
    let css = (await fetchBytes(url)).toString('utf8');
    const urls = [...new Set([...css.matchAll(/url\((https:[^)]+)\)/g)].map((match) => match[1]))];
    await Promise.all(
      urls.map(async (font, i) => {
        const name = `alexandria-${i}.woff2`;
        await save(font, `public/fonts/${name}`);
        css = css.replaceAll(font, `/fonts/${name}`);
      }),
    );
    await writeFile('public/fonts/alexandria.css', css);
    await save(
      'https://raw.githubusercontent.com/google/fonts/main/ofl/alexandria/OFL.txt',
      'public/fonts/OFL.txt',
    );
  })(),
  save(
    'https://maxxortho.com/wp-content/uploads/2026/05/Blue-with-Orange-Ribbon-scaled.webp',
    'public/assets/maxx.webp',
  ),
]);
await writeFile('public/assets/download-origins.json', JSON.stringify(origins, null, 2));
for (const outcome of outcomes)
  if (outcome.status === 'rejected') console.error(outcome.reason.message);
if (outcomes.some((outcome) => outcome.status === 'rejected')) process.exitCode = 1;
