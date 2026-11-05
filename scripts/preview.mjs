import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const portArg = process.argv.indexOf('--port');
const port = portArg >= 0 ? Number(process.argv[portArg + 1]) : 4173;
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid preview port');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};
const server = createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405);
    response.end();
    return;
  }
  let path;
  try {
    path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  } catch {
    response.writeHead(400);
    response.end();
    return;
  }
  let file = resolve(root, `.${path}`);
  if (relative(root, file).startsWith('..') || relative(root, file).includes(':')) {
    response.writeHead(403);
    response.end();
    return;
  }
  let status = 200;
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    if (!(await stat(file)).isFile()) throw new Error('not a file');
  } catch {
    status = 404;
    if (extname(path) && !path.endsWith('.html')) {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('Not found');
      return;
    }
    file = join(root, '404.html');
  }
  if (path === '/404.html') status = 404;
  try {
    const content = await readFile(file);
    response.writeHead(status, {
      'Content-Type': types[extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
      'Content-Length': content.length,
    });
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch {
    response.writeHead(503, { 'Content-Type': 'text/plain' });
    response.end('Run npm run build before preview');
  }
});
server.listen(port, '127.0.0.1', () => console.log(`Built-site preview: http://127.0.0.1:${port}`));
