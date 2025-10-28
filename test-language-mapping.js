// Simple test script to verify language mapping
import { getCorrespondingPage } from './src/i18n/page-mapping.js';

// Test cases
const testCases = [
    { href: 'program', from: 'en', to: 'fr', expected: 'programme' },
    { href: 'programme', from: 'fr', to: 'en', expected: 'program' },
    { href: 'focused-projects', from: 'en', to: 'fr', expected: 'projets-cibles' },
    { href: 'projets-cibles', from: 'fr', to: 'en', expected: 'focused-projects' },
    { href: 'focused-projects/fp1', from: 'en', to: 'fr', expected: 'projets-cibles/pc1' },
    { href: 'projets-cibles/pc1', from: 'fr', to: 'en', expected: 'focused-projects/fp1' },
    { href: 'contact', from: 'en', to: 'fr', expected: 'contact' },
    { href: 'contact', from: 'fr', to: 'en', expected: 'contact' },
    { href: 'about', from: 'en', to: 'fr', expected: 'about' },
    { href: 'about', from: 'fr', to: 'en', expected: 'about' },
    { href: '', from: 'en', to: 'fr', expected: '' }, // Home page
    { href: 'nonexistent', from: 'en', to: 'fr', expected: '' }, // Fallback
];

console.log('Testing language mapping...\n');

testCases.forEach((testCase, index) => {
    const result = getCorrespondingPage(testCase.href, testCase.from, testCase.to);
    const status = result === testCase.expected ? '✅ PASS' : '❌ FAIL';

    console.log(`Test ${index + 1}: ${status}`);
    console.log(`  Input: "${testCase.href}" (${testCase.from} -> ${testCase.to})`);
    console.log(`  Expected: "${testCase.expected}"`);
    console.log(`  Got: "${result}"`);
    console.log('');
});

console.log('Testing complete!');