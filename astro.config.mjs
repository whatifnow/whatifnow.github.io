// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// Pages kept out of the sitemap: gated/niche demos, internal showcase,
// the A/B homepage variants (duplicate content), and the stale /precedent-demo
// route (renamed to /stare-demo). Keeping these out avoids diluting ranking
// and stops search engines indexing throwaway variants.
const SITEMAP_EXCLUDE = [
  '/toolkit',
  '/threshold-sar-demo',
  '/brand-showcase',
  '/precedent-demo',
  '/v2-a',
  '/v2-b',
  '/v2-c',
];

export default defineConfig({
  site: 'https://www.whatifnow.ie',
  integrations: [
    sitemap({ filter: (page) => !SITEMAP_EXCLUDE.some((path) => page.includes(path)) }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
