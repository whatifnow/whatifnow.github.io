// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://www.whatifnow.ie',
  integrations: [sitemap({ filter: (page) => !page.includes('threshold-sar-demo') && !page.includes('/toolkit') && !page.includes('precedent-demo') }), react()],
  vite: {
    plugins: [tailwindcss()]
  }
});
