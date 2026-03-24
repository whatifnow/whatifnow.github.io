// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://whatifnow.github.io',
  integrations: [sitemap({ filter: (page) => !page.includes('threshold-sar-demo') && !page.includes('/toolkit') }), react()],
  vite: {
    plugins: [tailwindcss()]
  }
});
