import { cpSync, rmSync, mkdirSync } from 'node:fs';
rmSync('dist', { recursive: true, force: true });
mkdirSync('dist', { recursive: true });
cpSync('public', 'dist', { recursive: true });
console.log('Built MARTIAN static assets to dist/. Cloudflare Pages Functions remain in functions/.');
