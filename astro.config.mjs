// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import tailwindcss from '@tailwindcss/vite';
import emailObfuscator from './src/remark/email-obfuscator.js';

// https://astro.build/config
export default defineConfig({
  // Site URL for SEO and sitemap generation
  site: 'https://www.edtlab.fr',

  // Server mode: allows SSR by default, but pages can opt-in to SSG with prerender
  output: 'server',

  // Node.js adapter for VPS deployment
  adapter: node({
    mode: 'standalone'
  }),

  build: {
    format: 'directory',
    // Performance optimizations
    inlineStylesheets: 'auto',
    assets: '_assets',
    assetsPrefix: '/',
    redirects: true,
  },

  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
    },
  },

  vite: {
    plugins: [tailwindcss()],
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

  // Markdown configuration (for .md files)
  markdown: {
    shikiConfig: {
      // The site has no dark theme, so fenced code blocks use a light
      // Shiki theme instead of Astro's dark default (which renders as a
      // jarring black box on this light-only design).
      theme: 'github-light',
    },
    remarkPlugins: [
      emailObfuscator
    ],
    rehypePlugins: [
    ]
  },

  integrations: [
    mdx({
      // Optimize MDX processing
      optimize: true,
      remarkPlugins: [
        emailObfuscator
      ],
      rehypePlugins: [
      ]
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
        forward: ['dataLayer.push', '_paq.push'],
        // Debug mode for development
        debug: false
      }
    })
  ]
});
