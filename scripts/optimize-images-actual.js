#!/usr/bin/env node

/**
 * Actual Image Optimization Script for EDT Research Website
 * This script compresses and optimizes images using Sharp
 */

import sharp from 'sharp';
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, existsSync } from 'fs';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PUBLIC_DIR = join(__dirname, '..', 'public');
const BACKUP_DIR = join(__dirname, '..', '_original-backup');

class ImageOptimizer {
    constructor() {
        this.optimized = [];
        this.errors = [];
        this.totalSizeBefore = 0;
        this.totalSizeAfter = 0;
    }

    /**
     * Optimize all images in the public directory
     */
    async optimizeImages() {
        console.log('🖼️  Starting actual image optimization...');

        // Create backup directory
        if (!existsSync(BACKUP_DIR)) {
            mkdirSync(BACKUP_DIR, { recursive: true });
        }

        await this.processDirectory(PUBLIC_DIR);
        this.printReport();
    }

    /**
     * Process directory recursively
     */
    async processDirectory(dir, relativePath = '') {
        try {
            const files = readdirSync(dir);

            for (const file of files) {
                const fullPath = join(dir, file);
                const relativeFilePath = join(relativePath, file);
                const stat = statSync(fullPath);

                if (stat.isDirectory() && file !== '_original') {
                    await this.processDirectory(fullPath, relativeFilePath);
                } else if (this.isOptimizableImage(file)) {
                    await this.optimizeImage(fullPath, relativeFilePath, stat.size);
                }
            }
        } catch (error) {
            console.error(`Error processing directory ${dir}:`, error.message);
        }
    }

    /**
     * Check if file is an optimizable image
     */
    isOptimizableImage(filename) {
        const optimizableExtensions = ['.jpg', '.jpeg', '.png'];
        return optimizableExtensions.includes(extname(filename).toLowerCase());
    }

    /**
     * Optimize individual image
     */
    async optimizeImage(fullPath, relativePath, originalSize) {
        try {
            const ext = extname(relativePath).toLowerCase();
            const baseName = basename(relativePath, ext);
            const dirName = dirname(fullPath);

            // Skip if already optimized (check for backup)
            const backupPath = join(BACKUP_DIR, relativePath);
            if (existsSync(backupPath)) {
                console.log(`⏭️  Skipping ${relativePath} (already optimized)`);
                return;
            }

            console.log(`🔄 Optimizing ${relativePath}...`);

            // Create backup
            const backupDir = dirname(backupPath);
            if (!existsSync(backupDir)) {
                mkdirSync(backupDir, { recursive: true });
            }

            // Read original file
            const originalBuffer = readFileSync(fullPath);
            writeFileSync(backupPath, originalBuffer);

            let optimizedBuffer;
            let outputPath = fullPath;

            if (ext === '.png') {
                // Optimize PNG
                optimizedBuffer = await sharp(originalBuffer)
                    .png({
                        quality: 85,
                        compressionLevel: 9,
                        palette: true // Use palette for smaller file size when possible
                    })
                    .toBuffer();

                // Also create WebP version
                const webpPath = join(dirName, `${baseName}.webp`);
                const webpBuffer = await sharp(originalBuffer)
                    .webp({ quality: 80, effort: 6 })
                    .toBuffer();

                writeFileSync(webpPath, webpBuffer);
                console.log(`  ✅ Created WebP version: ${baseName}.webp`);

            } else if (['.jpg', '.jpeg'].includes(ext)) {
                // Optimize JPEG
                optimizedBuffer = await sharp(originalBuffer)
                    .jpeg({
                        quality: 80,
                        progressive: true,
                        mozjpeg: true // Use mozjpeg encoder for better compression
                    })
                    .toBuffer();

                // Also create WebP version
                const webpPath = join(dirName, `${baseName}.webp`);
                const webpBuffer = await sharp(originalBuffer)
                    .webp({ quality: 75, effort: 6 })
                    .toBuffer();

                writeFileSync(webpPath, webpBuffer);
                console.log(`  ✅ Created WebP version: ${baseName}.webp`);
            }

            // Write optimized image
            writeFileSync(outputPath, optimizedBuffer);

            const newSize = optimizedBuffer.length;
            const savings = originalSize - newSize;
            const savingsPercent = ((savings / originalSize) * 100).toFixed(1);

            this.optimized.push({
                path: relativePath,
                originalSize: originalSize,
                newSize: newSize,
                savings: savings,
                savingsPercent: savingsPercent
            });

            this.totalSizeBefore += originalSize;
            this.totalSizeAfter += newSize;

            console.log(`  ✅ Optimized: ${this.formatBytes(originalSize)} → ${this.formatBytes(newSize)} (${savingsPercent}% smaller)`);

        } catch (error) {
            console.error(`❌ Error optimizing ${relativePath}:`, error.message);
            this.errors.push({
                path: relativePath,
                error: error.message
            });
        }
    }

    /**
     * Print optimization report
     */
    printReport() {
        console.log('\n📊 Image Optimization Report');
        console.log('='.repeat(50));

        if (this.optimized.length === 0) {
            console.log('No images were optimized (all may already be optimized)');
            return;
        }

        console.log(`Images optimized: ${this.optimized.length}`);
        console.log(`Total size before: ${this.formatBytes(this.totalSizeBefore)}`);
        console.log(`Total size after: ${this.formatBytes(this.totalSizeAfter)}`);

        const totalSavings = this.totalSizeBefore - this.totalSizeAfter;
        const totalSavingsPercent = ((totalSavings / this.totalSizeBefore) * 100).toFixed(1);

        console.log(`Total savings: ${this.formatBytes(totalSavings)} (${totalSavingsPercent}%)`);

        // Show top savings
        console.log('\n🏆 Top Optimizations:');
        const topSavings = this.optimized
            .sort((a, b) => b.savings - a.savings)
            .slice(0, 10);

        topSavings.forEach((opt, index) => {
            console.log(`${index + 1}. ${opt.path}: ${this.formatBytes(opt.savings)} saved (${opt.savingsPercent}%)`);
        });

        // Show errors if any
        if (this.errors.length > 0) {
            console.log('\n❌ Errors:');
            this.errors.forEach(error => {
                console.log(`- ${error.path}: ${error.error}`);
            });
        }

        console.log('\n💡 Next Steps:');
        console.log('- WebP versions have been created for better browser support');
        console.log('- Original images are backed up in public/_original/');
        console.log('- Update your components to use the OptimizedImage component');
        console.log('- Consider using Astro\'s Image component for automatic format selection');
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

    /**
     * Restore original images from backup
     */
    async restoreOriginals() {
        console.log('🔄 Restoring original images...');

        if (!existsSync(BACKUP_DIR)) {
            console.log('No backup directory found. Nothing to restore.');
            return;
        }

        await this.restoreDirectory(BACKUP_DIR, PUBLIC_DIR);
        console.log('✅ Original images restored');
    }

    /**
     * Restore directory recursively
     */
    async restoreDirectory(backupDir, targetDir) {
        try {
            const files = readdirSync(backupDir);

            for (const file of files) {
                const backupPath = join(backupDir, file);
                const targetPath = join(targetDir, file);
                const stat = statSync(backupPath);

                if (stat.isDirectory()) {
                    if (!existsSync(targetPath)) {
                        mkdirSync(targetPath, { recursive: true });
                    }
                    await this.restoreDirectory(backupPath, targetPath);
                } else {
                    const backupBuffer = readFileSync(backupPath);
                    writeFileSync(targetPath, backupBuffer);
                    console.log(`Restored: ${file}`);
                }
            }
        } catch (error) {
            console.error(`Error restoring from ${backupDir}:`, error.message);
        }
    }
}

// CLI interface
async function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    const optimizer = new ImageOptimizer();

    switch (command) {
        case 'restore':
            await optimizer.restoreOriginals();
            break;
        case 'optimize':
        default:
            await optimizer.optimizeImages();
            break;
    }
}

// Only run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch(error => {
        console.error('❌ Image optimization failed:', error);
        process.exit(1);
    });
}

export default ImageOptimizer;