// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  // Site URL for SEO and sitemap generation
  site: 'https://www.edtlab.fr',
  output: 'static',
  build: {
    format: 'directory',
    // Performance optimizations
    inlineStylesheets: 'auto',
    assets: '_assets',
    assetsPrefix: '/',
  },
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
    }
  },
  vite: {
    server: {
      watch: {
        usePolling: true
      }
    }
  },
  // Performance and SEO optimizations
  compressHTML: true,

  // Image optimization
  image: {
    // Enable image optimization
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    // Default image formats and quality
    domains: [],
    remotePatterns: []
  },
  integrations: [
    tailwind({
      // Let Tailwind handle base styles properly
      applyBaseStyles: true,
      configFile: './tailwind.config.js'
    }),
    mdx({
      // Optimize MDX processing
      optimize: true,
      remarkPlugins: [],
      rehypePlugins: []
    }),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          fr: 'fr'
        }
      }
    }),
    partytown({
      // Configuration for Partytown
      config: {
        // Forward events to the main thread
        forward: ['dataLayer.push'],
        // Debug mode (disable in production)
        debug: false
      }
    })
  ]
});