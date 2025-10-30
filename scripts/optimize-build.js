#!/usr/bin/env node

/**
 * Build optimization script for EDT Research Website
 * Optimizes assets, generates performance reports, and validates build output
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DIST_DIR = join(__dirname, '..', 'dist');
const PERFORMANCE_BUDGET = {
    totalSize: 2 * 1024 * 1024, // 2MB
    jsSize: 500 * 1024,         // 500KB
    cssSize: 100 * 1024,        // 100KB
    imageSize: 1 * 1024 * 1024, // 1MB
    htmlSize: 50 * 1024,        // 50KB per page
    maxFiles: 100               // Maximum number of files
};

class BuildOptimizer {
    constructor() {
        this.stats = {
            totalSize: 0,
            jsSize: 0,
            cssSize: 0,
            imageSize: 0,
            htmlSize: 0,
            fileCount: 0,
            files: []
        };
    }

    /**
     * Analyze build output and generate performance report
     */
    async analyzeBuild() {
        console.log('🔍 Analyzing build output...');

        try {
            this.walkDirectory(DIST_DIR);
            this.generateReport();
            this.checkBudgets();
            this.generateOptimizationSuggestions();
        } catch (error) {
            console.error('❌ Build analysis failed:', error.message);
            process.exit(1);
        }
    }

    /**
     * Recursively walk directory and collect file stats
     */
    walkDirectory(dir, relativePath = '') {
        const files = readdirSync(dir);

        for (const file of files) {
            // Skip backup directories and other excluded directories
            if (file === '_original' || file === '.git' || file === 'node_modules') {
                continue;
            }

            const fullPath = join(dir, file);
            const relativeFilePath = join(relativePath, file);
            const stat = statSync(fullPath);

            if (stat.isDirectory()) {
                this.walkDirectory(fullPath, relativeFilePath);
            } else {
                this.analyzeFile(fullPath, relativeFilePath, stat.size);
            }
        }
    }

    /**
     * Analyze individual file
     */
    analyzeFile(fullPath, relativePath, size) {
        const ext = extname(relativePath).toLowerCase();

        this.stats.totalSize += size;
        this.stats.fileCount++;

        const fileInfo = {
            path: relativePath,
            size: size,
            type: this.getFileType(ext),
            sizeFormatted: this.formatBytes(size)
        };

        this.stats.files.push(fileInfo);

        // Categorize by file type
        switch (fileInfo.type) {
            case 'javascript':
                this.stats.jsSize += size;
                break;
            case 'css':
                this.stats.cssSize += size;
                break;
            case 'image':
                this.stats.imageSize += size;
                break;
            case 'html':
                this.stats.htmlSize += size;
                break;
        }
    }

    /**
     * Get file type category
     */
    getFileType(ext) {
        const types = {
            '.js': 'javascript',
            '.mjs': 'javascript',
            '.css': 'css',
            '.html': 'html',
            '.png': 'image',
            '.jpg': 'image',
            '.jpeg': 'image',
            '.gif': 'image',
            '.svg': 'image',
            '.webp': 'image',
            '.avif': 'image',
            '.woff': 'font',
            '.woff2': 'font',
            '.ttf': 'font',
            '.eot': 'font'
        };

        return types[ext] || 'other';
    }

    /**
     * Generate performance report
     */
    generateReport() {
        console.log('\n📊 Build Performance Report');
        console.log('='.repeat(50));

        console.log(`Total files: ${this.stats.fileCount}`);
        console.log(`Total size: ${this.formatBytes(this.stats.totalSize)}`);
        console.log(`JavaScript: ${this.formatBytes(this.stats.jsSize)}`);
        console.log(`CSS: ${this.formatBytes(this.stats.cssSize)}`);
        console.log(`Images: ${this.formatBytes(this.stats.imageSize)}`);
        console.log(`HTML: ${this.formatBytes(this.stats.htmlSize)}`);

        // Show largest files
        console.log('\n🔍 Largest Files:');
        const largestFiles = this.stats.files
            .sort((a, b) => b.size - a.size)
            .slice(0, 10);

        largestFiles.forEach((file, index) => {
            console.log(`${index + 1}. ${file.path} (${file.sizeFormatted})`);
        });
    }

    /**
     * Check performance budgets
     */
    checkBudgets() {
        console.log('\n💰 Performance Budget Check');
        console.log('='.repeat(50));

        const checks = [
            {
                name: 'Total Size',
                actual: this.stats.totalSize,
                budget: PERFORMANCE_BUDGET.totalSize,
                passed: this.stats.totalSize <= PERFORMANCE_BUDGET.totalSize
            },
            {
                name: 'JavaScript Size',
                actual: this.stats.jsSize,
                budget: PERFORMANCE_BUDGET.jsSize,
                passed: this.stats.jsSize <= PERFORMANCE_BUDGET.jsSize
            },
            {
                name: 'CSS Size',
                actual: this.stats.cssSize,
                budget: PERFORMANCE_BUDGET.cssSize,
                passed: this.stats.cssSize <= PERFORMANCE_BUDGET.cssSize
            },
            {
                name: 'Image Size',
                actual: this.stats.imageSize,
                budget: PERFORMANCE_BUDGET.imageSize,
                passed: this.stats.imageSize <= PERFORMANCE_BUDGET.imageSize
            },
            {
                name: 'File Count',
                actual: this.stats.fileCount,
                budget: PERFORMANCE_BUDGET.maxFiles,
                passed: this.stats.fileCount <= PERFORMANCE_BUDGET.maxFiles
            }
        ];

        let allPassed = true;

        checks.forEach(check => {
            const status = check.passed ? '✅' : '❌';
            const actualFormatted = typeof check.actual === 'number' && check.actual > 1024
                ? this.formatBytes(check.actual)
                : check.actual.toString();
            const budgetFormatted = typeof check.budget === 'number' && check.budget > 1024
                ? this.formatBytes(check.budget)
                : check.budget.toString();

            console.log(`${status} ${check.name}: ${actualFormatted} / ${budgetFormatted}`);

            if (!check.passed) {
                allPassed = false;
            }
        });

        if (!allPassed) {
            console.log('\n⚠️  Some performance budgets exceeded!');
        } else {
            console.log('\n🎉 All performance budgets passed!');
        }
    }

    /**
     * Generate optimization suggestions
     */
    generateOptimizationSuggestions() {
        console.log('\n💡 Optimization Suggestions');
        console.log('='.repeat(50));

        const suggestions = [];

        // Check for large JavaScript files
        const largeJsFiles = this.stats.files
            .filter(f => f.type === 'javascript' && f.size > 100 * 1024);

        if (largeJsFiles.length > 0) {
            suggestions.push('Consider code splitting for large JavaScript files:');
            largeJsFiles.forEach(file => {
                suggestions.push(`  - ${file.path} (${file.sizeFormatted})`);
            });
        }

        // Check for unoptimized images
        const largeImages = this.stats.files
            .filter(f => f.type === 'image' && f.size > 200 * 1024);

        if (largeImages.length > 0) {
            suggestions.push('Consider optimizing large images:');
            largeImages.forEach(file => {
                suggestions.push(`  - ${file.path} (${file.sizeFormatted})`);
            });
        }

        // Check for CSS optimization
        if (this.stats.cssSize > PERFORMANCE_BUDGET.cssSize) {
            suggestions.push('Consider CSS optimization:');
            suggestions.push('  - Remove unused CSS');
            suggestions.push('  - Use CSS purging');
            suggestions.push('  - Split CSS by route');
        }

        // Check for too many files
        if (this.stats.fileCount > PERFORMANCE_BUDGET.maxFiles) {
            suggestions.push('Consider reducing file count:');
            suggestions.push('  - Bundle small files together');
            suggestions.push('  - Use HTTP/2 server push for critical resources');
        }

        if (suggestions.length === 0) {
            console.log('🎉 No optimization suggestions - build looks great!');
        } else {
            suggestions.forEach(suggestion => {
                console.log(suggestion);
            });
        }
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
     * Save report to file
     */
    saveReport() {
        const report = {
            timestamp: new Date().toISOString(),
            stats: this.stats,
            budgets: PERFORMANCE_BUDGET,
            passed: this.stats.totalSize <= PERFORMANCE_BUDGET.totalSize &&
                this.stats.jsSize <= PERFORMANCE_BUDGET.jsSize &&
                this.stats.cssSize <= PERFORMANCE_BUDGET.cssSize &&
                this.stats.imageSize <= PERFORMANCE_BUDGET.imageSize &&
                this.stats.fileCount <= PERFORMANCE_BUDGET.maxFiles
        };

        const reportPath = join(DIST_DIR, 'performance-report.json');
        writeFileSync(reportPath, JSON.stringify(report, null, 2));
        console.log(`\n📄 Performance report saved to: ${reportPath}`);
    }
}

// Run the optimizer
async function main() {
    const optimizer = new BuildOptimizer();
    await optimizer.analyzeBuild();
    optimizer.saveReport();
}

// Only run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch(error => {
        console.error('❌ Optimization failed:', error);
        process.exit(1);
    });
}

export default BuildOptimizer;