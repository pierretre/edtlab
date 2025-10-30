#!/usr/bin/env node

/**
 * Image optimization utility for EDT Research Website
 * This script provides recommendations for image optimization
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PUBLIC_DIR = join(__dirname, '..', 'public');
const ASSETS_DIR = join(__dirname, '..', 'src', 'assets', 'images');

class ImageOptimizer {
    constructor() {
        this.images = [];
        this.totalSize = 0;
        this.recommendations = [];
    }

    /**
     * Analyze images and provide optimization recommendations
     */
    async analyzeImages() {
        console.log('🖼️  Analyzing images for optimization opportunities...');

        // Scan public directory
        this.scanDirectory(PUBLIC_DIR, 'public');

        // Scan assets directory if it exists
        try {
            this.scanDirectory(ASSETS_DIR, 'assets');
        } catch (error) {
            // Assets directory might not exist
        }

        this.generateRecommendations();
        this.printReport();
    }

    /**
     * Scan directory for images
     */
    scanDirectory(dir, type) {
        try {
            const files = readdirSync(dir);

            for (const file of files) {
                const fullPath = join(dir, file);
                const stat = statSync(fullPath);

                if (stat.isDirectory()) {
                    this.scanDirectory(fullPath, type);
                } else if (this.isImageFile(file)) {
                    this.analyzeImage(fullPath, file, stat.size, type);
                }
            }
        } catch (error) {
            // Directory might not exist or be accessible
        }
    }

    /**
     * Check if file is an image
     */
    isImageFile(filename) {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.avif'];
        return imageExtensions.includes(extname(filename).toLowerCase());
    }

    /**
     * Analyze individual image
     */
    analyzeImage(fullPath, filename, size, type) {
        const ext = extname(filename).toLowerCase();

        const imageInfo = {
            path: fullPath,
            filename: filename,
            size: size,
            sizeFormatted: this.formatBytes(size),
            extension: ext,
            type: type
        };

        this.images.push(imageInfo);
        this.totalSize += size;
    }

    /**
     * Generate optimization recommendations
     */
    generateRecommendations() {
        // Find large images (> 500KB)
        const largeImages = this.images.filter(img => img.size > 500 * 1024);

        if (largeImages.length > 0) {
            this.recommendations.push({
                type: 'Large Images',
                description: 'These images are larger than 500KB and should be optimized:',
                items: largeImages.map(img => `${img.filename} (${img.sizeFormatted})`)
            });
        }

        // Find PNG images that could be WebP
        const pngImages = this.images.filter(img => img.extension === '.png' && img.size > 100 * 1024);

        if (pngImages.length > 0) {
            this.recommendations.push({
                type: 'PNG to WebP Conversion',
                description: 'These PNG images could be converted to WebP for better compression:',
                items: pngImages.map(img => `${img.filename} (${img.sizeFormatted})`)
            });
        }

        // Find JPEG images that could be optimized
        const jpegImages = this.images.filter(img =>
            ['.jpg', '.jpeg'].includes(img.extension) && img.size > 200 * 1024
        );

        if (jpegImages.length > 0) {
            this.recommendations.push({
                type: 'JPEG Optimization',
                description: 'These JPEG images could be optimized with better compression:',
                items: jpegImages.map(img => `${img.filename} (${img.sizeFormatted})`)
            });
        }

        // Check for missing modern formats
        const hasWebP = this.images.some(img => img.extension === '.webp');
        const hasAvif = this.images.some(img => img.extension === '.avif');

        if (!hasWebP && this.images.length > 0) {
            this.recommendations.push({
                type: 'Modern Format Support',
                description: 'Consider adding WebP versions of your images for better compression',
                items: ['Use Astro\'s Image component to automatically generate WebP versions']
            });
        }

        if (!hasAvif && this.images.length > 0) {
            this.recommendations.push({
                type: 'Next-Gen Format Support',
                description: 'Consider adding AVIF versions for even better compression',
                items: ['AVIF provides 50% better compression than JPEG']
            });
        }
    }

    /**
     * Print optimization report
     */
    printReport() {
        console.log('\n📊 Image Optimization Report');
        console.log('='.repeat(50));

        console.log(`Total images: ${this.images.length}`);
        console.log(`Total size: ${this.formatBytes(this.totalSize)}`);

        // Show largest images
        if (this.images.length > 0) {
            console.log('\n🔍 Largest Images:');
            const largestImages = this.images
                .sort((a, b) => b.size - a.size)
                .slice(0, 10);

            largestImages.forEach((img, index) => {
                console.log(`${index + 1}. ${img.filename} (${img.sizeFormatted})`);
            });
        }

        // Show recommendations
        if (this.recommendations.length > 0) {
            console.log('\n💡 Optimization Recommendations');
            console.log('='.repeat(50));

            this.recommendations.forEach(rec => {
                console.log(`\n${rec.type}:`);
                console.log(rec.description);
                rec.items.forEach(item => {
                    console.log(`  - ${item}`);
                });
            });
        } else {
            console.log('\n🎉 No optimization recommendations - images look good!');
        }

        // Show optimization commands
        console.log('\n🛠️  Optimization Commands');
        console.log('='.repeat(50));
        console.log('To optimize images, you can use these tools:');
        console.log('');
        console.log('1. ImageOptim (macOS): https://imageoptim.com/');
        console.log('2. TinyPNG: https://tinypng.com/');
        console.log('3. Squoosh: https://squoosh.app/');
        console.log('4. Sharp (Node.js): npm install sharp');
        console.log('');
        console.log('For automated optimization in your build process:');
        console.log('npm install @astrojs/image sharp');
        console.log('');
        console.log('Example Sharp optimization script:');
        console.log('const sharp = require("sharp");');
        console.log('sharp("input.jpg").resize(800).webp({ quality: 80 }).toFile("output.webp");');
    }

    /**
     * Format bytes to human readable format
     */
    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// Run the optimizer
async function main() {
    const optimizer = new ImageOptimizer();
    await optimizer.analyzeImages();
}

// Only run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch(error => {
        console.error('❌ Image optimization analysis failed:', error);
        process.exit(1);
    });
}

export default ImageOptimizer;