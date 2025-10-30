#!/usr/bin/env node

/**
 * Aggressive Image Optimization Script for EDT Research Website
 * This script applies more aggressive compression to meet performance budgets
 */

import sharp from 'sharp';
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PUBLIC_DIR = join(__dirname, '..', 'public');

class AggressiveImageOptimizer {
    constructor() {
        this.optimized = [];
        this.totalSizeBefore = 0;
        this.totalSizeAfter = 0;
    }

    /**
     * Apply aggressive optimization to large images
     */
    async optimizeAggressively() {
        console.log('🔥 Starting aggressive image optimization...');

        const largeImages = [
            'INRIA_EDT_CBLOT_main_3.jpg',
            'INRIA_EDT_CBLOT_PHYSICAL_DIGITAL.png',
            'INRIA_EDT_CBLOT_main_4.jpg',
            'INRIA_EDT_CBLOT_PHYSICAL_DIGITAL.jpg',
            'INRIA_EDT_CBLOT_com_2.jpg'
        ];

        for (const imageName of largeImages) {
            const imagePath = join(PUBLIC_DIR, imageName);
            if (existsSync(imagePath)) {
                await this.optimizeImageAggressively(imagePath, imageName);
            }
        }

        this.printReport();
    }

    /**
     * Apply aggressive optimization to a single image
     */
    async optimizeImageAggressively(fullPath, filename) {
        try {
            const ext = extname(filename).toLowerCase();
            const baseName = basename(filename, ext);
            const dirName = dirname(fullPath);

            console.log(`🔥 Aggressively optimizing ${filename}...`);

            // Read current file
            const currentBuffer = readFileSync(fullPath);
            const originalSize = currentBuffer.length;

            let optimizedBuffer;

            if (ext === '.png') {
                // Very aggressive PNG optimization
                optimizedBuffer = await sharp(currentBuffer)
                    .resize(1200, 800, {
                        fit: 'inside',
                        withoutEnlargement: true
                    })
                    .png({
                        quality: 70,
                        compressionLevel: 9,
                        palette: true,
                        colors: 256 // Reduce color palette
                    })
                    .toBuffer();

                // Create highly optimized WebP
                const webpPath = join(dirName, `${baseName}.webp`);
                const webpBuffer = await sharp(currentBuffer)
                    .resize(1200, 800, {
                        fit: 'inside',
                        withoutEnlargement: true
                    })
                    .webp({ quality: 60, effort: 6 })
                    .toBuffer();

                writeFileSync(webpPath, webpBuffer);

            } else if (['.jpg', '.jpeg'].includes(ext)) {
                // Very aggressive JPEG optimization
                optimizedBuffer = await sharp(currentBuffer)
                    .resize(1200, 800, {
                        fit: 'inside',
                        withoutEnlargement: true
                    })
                    .jpeg({
                        quality: 60, // Lower quality for smaller size
                        progressive: true,
                        mozjpeg: true
                    })
                    .toBuffer();

                // Create highly optimized WebP
                const webpPath = join(dirName, `${baseName}.webp`);
                const webpBuffer = await sharp(currentBuffer)
                    .resize(1200, 800, {
                        fit: 'inside',
                        withoutEnlargement: true
                    })
                    .webp({ quality: 50, effort: 6 })
                    .toBuffer();

                writeFileSync(webpPath, webpBuffer);
            }

            // Write optimized image
            writeFileSync(fullPath, optimizedBuffer);

            const newSize = optimizedBuffer.length;
            const savings = originalSize - newSize;
            const savingsPercent = ((savings / originalSize) * 100).toFixed(1);

            this.optimized.push({
                path: filename,
                originalSize: originalSize,
                newSize: newSize,
                savings: savings,
                savingsPercent: savingsPercent
            });

            this.totalSizeBefore += originalSize;
            this.totalSizeAfter += newSize;

            console.log(`  ✅ Aggressively optimized: ${this.formatBytes(originalSize)} → ${this.formatBytes(newSize)} (${savingsPercent}% smaller)`);

        } catch (error) {
            console.error(`❌ Error optimizing ${filename}:`, error.message);
        }
    }

    /**
     * Print optimization report
     */
    printReport() {
        console.log('\n📊 Aggressive Image Optimization Report');
        console.log('='.repeat(50));

        if (this.optimized.length === 0) {
            console.log('No images were optimized');
            return;
        }

        console.log(`Images optimized: ${this.optimized.length}`);
        console.log(`Total size before: ${this.formatBytes(this.totalSizeBefore)}`);
        console.log(`Total size after: ${this.formatBytes(this.totalSizeAfter)}`);

        const totalSavings = this.totalSizeBefore - this.totalSizeAfter;
        const totalSavingsPercent = ((totalSavings / this.totalSizeBefore) * 100).toFixed(1);

        console.log(`Total savings: ${this.formatBytes(totalSavings)} (${totalSavingsPercent}%)`);

        // Show optimizations
        console.log('\n🔥 Aggressive Optimizations:');
        this.optimized.forEach((opt, index) => {
            console.log(`${index + 1}. ${opt.path}: ${this.formatBytes(opt.savings)} saved (${opt.savingsPercent}%)`);
        });

        console.log('\n⚠️  Note: Aggressive optimization may reduce image quality');
        console.log('💡 Images have been resized to max 1200x800 and compressed heavily');
        console.log('🔄 Use "npm run images:restore" to restore originals if needed');
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
    const optimizer = new AggressiveImageOptimizer();
    await optimizer.optimizeAggressively();
}

// Only run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch(error => {
        console.error('❌ Aggressive image optimization failed:', error);
        process.exit(1);
    });
}

export default AggressiveImageOptimizer;