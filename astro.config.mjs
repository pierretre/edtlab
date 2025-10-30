// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  output: 'static',
  build: {
    format: 'directory',
    // Performance optimizations
    inlineStylesheets: 'auto',
    assets: '_assets',
    assetsPrefix: '/',
    // Enable compression and minification
    minify: true,
    // Split chunks for better caching
    rollupOptions: {
      output: {
        // Create separate chunks for vendor libraries
        manualChunks: {
          'flowbite': ['flowbite'],
        },
        // Optimize chunk file names for caching
        chunkFileNames: '_assets/js/[name]-[hash].js',
        entryFileNames: '_assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name)) {
            return '_assets/css/[name]-[hash].[ext]';
          }
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif)$/i.test(assetInfo.name)) {
            return '_assets/images/[name]-[hash].[ext]';
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return '_assets/fonts/[name]-[hash].[ext]';
          }
          return '_assets/[name]-[hash].[ext]';
        }
      }
    }
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: {
      prefixDefaultLocale: true
    }
  },
  vite: {
    server: {
      watch: {
        usePolling: true
      }
    },
    build: {
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Optimize dependencies
      rollupOptions: {
        external: [],
        output: {
          // Optimize chunk generation
          experimentalMinChunkSize: 1000,
        }
      },
      // Enable source maps for production debugging (optional)
      sourcemap: false,
      // Optimize asset handling
      assetsInlineLimit: 4096, // Inline assets smaller than 4kb
      // Enable tree shaking
      minify: 'esbuild',
      target: 'es2020'
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ['flowbite'],
      exclude: []
    },
    // Enable CSS preprocessing optimizations
    css: {
      devSourcemap: false,
      preprocessorOptions: {
        scss: {
          // Optimize SCSS compilation
          outputStyle: 'compressed'
        }
      }
    }
  },
  // Performance and SEO optimizations
  compressHTML: true,
  integrations: [
    tailwind({
      // Optimize Tailwind CSS
      applyBaseStyles: false, // We handle base styles manually
      config: {
        // Enable JIT mode for smaller CSS bundles
        mode: 'jit',
        // Purge unused styles
        content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
      }
    }),
    mdx({
      // Optimize MDX processing
      optimize: true,
      remarkPlugins: [],
      rehypePlugins: []
    }),
  ]
});