import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Pages rendered with <meta name="robots" content="noindex">.
const NOINDEX_PATHS = ['/thank-you/'];

export default defineConfig({
  site: 'https://bristolhouseclearances.co.uk',
  output: 'static',
  adapter: cloudflare({
    imageService: 'compile',
  }),
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  integrations: [
    preact(),
    sitemap({
      // Keep noindex pages out of the sitemap (GSC flags "Submitted URL marked noindex").
      filter: (page) => !NOINDEX_PATHS.some((p) => new URL(page).pathname === p),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
