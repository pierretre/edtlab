# Performance Optimization Guide

This document outlines the performance optimizations implemented in the EDT Research Website and provides guidance for maintaining optimal performance.

## Overview

The EDT Research Website is optimized for sub-3-second load times and excellent Core Web Vitals scores. This guide covers the implemented optimizations and how to maintain them.

## Performance Targets

- **Page Load Time**: < 3 seconds
- **First Contentful Paint (FCP)**: < 1.8 seconds
- **Largest Contentful Paint (LCP)**: < 2.5 seconds
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Total Bundle Size**: < 2MB
- **JavaScript Bundle**: < 500KB
- **CSS Bundle**: < 100KB
- **Image Assets**: < 1MB per page

## Implemented Optimizations

### 1. Static Site Generation

The website uses Astro.js for static site generation, which provides:

- Pre-rendered HTML for instant loading
- Optimized asset bundling
- Automatic code splitting
- CDN-friendly static files

### 2. Asset Optimization

#### JavaScript Optimization
- **Code Splitting**: Vendor libraries separated into chunks
- **Tree Shaking**: Unused code automatically removed
- **Minification**: All JavaScript minified in production
- **ES2020 Target**: Modern JavaScript for better performance

#### CSS Optimization
- **Purging**: Unused CSS automatically removed
- **Minification**: CSS compressed for production
- **Critical CSS**: Above-the-fold styles inlined
- **Font Display Swap**: Prevents invisible text during font load

#### Image Optimization
- **Lazy Loading**: Images load only when needed
- **Modern Formats**: WebP and AVIF support
- **Responsive Images**: Multiple sizes for different viewports
- **Optimized Compression**: Quality vs. size balance

### 3. Caching Strategy

#### Static Assets
- **Long-term Caching**: 1 year cache for hashed assets
- **Immutable Headers**: Assets with hashes never change
- **CDN Optimization**: Assets optimized for CDN delivery

#### HTML Pages
- **Short-term Caching**: 1 hour cache for HTML
- **ETag Support**: Efficient cache validation
- **Compression**: Gzip compression enabled

### 4. Service Worker

The service worker provides:

- **Offline Support**: Critical pages cached for offline access
- **Background Sync**: Analytics data synced when online
- **Cache Management**: Automatic cleanup of old cache entries
- **Performance Monitoring**: Client-side performance tracking

### 5. Core Web Vitals Monitoring

#### Real User Monitoring (RUM)
- **Performance Observer**: Tracks all Core Web Vitals
- **Analytics Integration**: Metrics sent to Matomo Analytics
- **Local Storage**: Performance data stored for debugging
- **Performance Budgets**: Automatic warnings for budget violations

#### Metrics Tracked
- **First Contentful Paint (FCP)**
- **Largest Contentful Paint (LCP)**
- **First Input Delay (FID)**
- **Cumulative Layout Shift (CLS)**
- **Time to First Byte (TTFB)**
- **Resource Load Times**

## Performance Monitoring

### Build-time Analysis

Run performance analysis after each build:

```bash
npm run build
npm run perf:analyze
```

This generates a performance report with:
- Bundle size analysis
- Performance budget checks
- Optimization recommendations
- File-by-file breakdown

### Image Analysis

Analyze images for optimization opportunities:

```bash
npm run images:analyze
```

This provides:
- Image size analysis
- Format recommendations
- Optimization suggestions
- Tool recommendations

### Runtime Monitoring

The website includes built-in performance monitoring:

1. **Development Mode**: Console warnings for performance issues
2. **Production Mode**: Analytics integration for real user data
3. **Performance API**: Access metrics via `window.getPerformanceMetrics()`

## Performance Budget

The website enforces strict performance budgets:

| Resource Type | Budget | Current | Status |
|---------------|--------|---------|--------|
| Total Size | 2MB | Variable | ⚠️ Monitor |
| JavaScript | 500KB | ~7KB | ✅ Good |
| CSS | 100KB | ~6KB | ✅ Good |
| Images | 1MB | Variable | ⚠️ Optimize |
| File Count | 100 | ~88 | ✅ Good |

## Optimization Checklist

### Before Deployment

- [ ] Run `npm run build` to generate optimized build
- [ ] Check performance report for budget violations
- [ ] Analyze images for optimization opportunities
- [ ] Test Core Web Vitals with Lighthouse
- [ ] Verify service worker registration
- [ ] Test offline functionality

### Image Optimization

1. **Compress Images**
   - Use tools like TinyPNG, Squoosh, or ImageOptim
   - Target 80% quality for JPEG
   - Use PNG only for images requiring transparency

2. **Modern Formats**
   - Convert to WebP for better compression
   - Consider AVIF for next-generation browsers
   - Use Astro's Image component for automatic optimization

3. **Responsive Images**
   - Provide multiple sizes for different viewports
   - Use `srcset` and `sizes` attributes
   - Implement lazy loading for below-the-fold images

### Code Optimization

1. **JavaScript**
   - Use dynamic imports for code splitting
   - Minimize third-party dependencies
   - Implement tree shaking for unused code

2. **CSS**
   - Use Tailwind's purge feature
   - Minimize custom CSS
   - Inline critical CSS

3. **Fonts**
   - Use `font-display: swap`
   - Preload critical fonts
   - Subset fonts to reduce file size

## Troubleshooting

### Common Performance Issues

1. **Large Bundle Size**
   - Check for duplicate dependencies
   - Use bundle analyzer to identify large modules
   - Implement code splitting

2. **Slow Image Loading**
   - Optimize image compression
   - Implement lazy loading
   - Use modern image formats

3. **Poor Core Web Vitals**
   - Optimize Largest Contentful Paint element
   - Minimize layout shifts
   - Reduce JavaScript execution time

### Performance Testing

1. **Lighthouse**
```bash
npx lighthouse http://localhost:4321 --view
```

2. **WebPageTest**
- Test from multiple locations
- Analyze waterfall charts
- Check for optimization opportunities

3. **Chrome DevTools**
- Use Performance tab for detailed analysis
- Check Network tab for resource loading
- Analyze Coverage tab for unused code

## Continuous Monitoring

### Automated Testing

The project includes automated performance tests:

```bash
npm run test:e2e -- src/test/e2e/performance.spec.ts
```

These tests verify:
- Page load times within budget
- Core Web Vitals compliance
- Image optimization
- Service worker functionality

### CI/CD Integration

Performance checks are integrated into the build process:

1. **Build Analysis**: Automatic performance report generation
2. **Budget Enforcement**: Build fails if budgets are exceeded
3. **Test Execution**: Performance tests run on every deployment

## Best Practices

### Development

1. **Monitor Performance Early**: Check performance during development
2. **Use Performance Budgets**: Set and enforce strict budgets
3. **Optimize Images**: Compress and optimize all images
4. **Minimize Dependencies**: Only include necessary third-party code

### Deployment

1. **CDN Usage**: Serve static assets from CDN
2. **Compression**: Enable gzip/brotli compression
3. **Caching Headers**: Set appropriate cache headers
4. **HTTP/2**: Use HTTP/2 for multiplexing benefits

### Monitoring

1. **Real User Monitoring**: Track actual user performance
2. **Regular Audits**: Perform monthly performance audits
3. **Performance Regression**: Monitor for performance degradation
4. **User Experience**: Correlate performance with user metrics

## Resources

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [GTmetrix](https://gtmetrix.com/)
- [Squoosh](https://squoosh.app/) - Image optimization

### Documentation
- [Web Vitals](https://web.dev/vitals/)
- [Astro Performance](https://docs.astro.build/en/guides/performance/)
- [Performance Best Practices](https://web.dev/fast/)

### Monitoring
- [Matomo Analytics](https://matomo.org/)
- [Core Web Vitals Report](https://support.google.com/webmasters/answer/9205520)
- [PageSpeed Insights](https://pagespeed.web.dev/)

## Conclusion

The EDT Research Website is optimized for excellent performance with comprehensive monitoring and optimization tools. Regular monitoring and maintenance of these optimizations will ensure continued excellent user experience and search engine performance.