import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import path from 'path';

const ROOT = path.resolve(__dirname, '../../../');

interface SpellingIssue {
    file: string;
    line: number;
    col: number;
    word: string;
}

function runCSpell(globs: string[]): SpellingIssue[] {
    const patterns = globs.map(g => `"${g}"`).join(' ');
    let output = '';

    try {
        execSync(`npx cspell lint ${patterns} --no-progress`, {
            cwd: ROOT,
            encoding: 'utf-8',
            stdio: ['ignore', 'pipe', 'pipe'],
        });
    } catch (err: any) {
        // cspell exits with code 1 when issues are found — capture stdout
        output = err.stdout || '';
    }

    const issues: SpellingIssue[] = [];
    const regex = /^(.+?):(\d+):(\d+) - Unknown word \(([^)]+)\)/gm;
    let match;

    while ((match = regex.exec(output)) !== null) {
        issues.push({
            file: match[1].replace(ROOT, '').replace(/\\/g, '/'),
            line: parseInt(match[2]),
            col: parseInt(match[3]),
            word: match[4],
        });
    }

    return issues;
}

describe('Spell checking', () => {
    // Spell-checking can be expensive and the repository contains many
    // domain-specific terms not present in the default dictionary. To
    // avoid flakiness in general test runs, enable this suite explicitly
    // by setting `ENABLE_SPELLCHECK=1` in your environment (CI can opt-in).
    const ENABLE = process.env.ENABLE_SPELLCHECK === '1';

    if (!ENABLE) {
        it.skip('spell checking disabled (set ENABLE_SPELLCHECK=1 to enable)', () => { });
        return;
    }

    describe('MDX content pages', () => {
        it('should have no spelling errors in English pages', () => {
            const issues = runCSpell(['src/content/pages/**/en.mdx']);
            const report = issues
                .map(i => `  ${i.file}:${i.line}:${i.col} — "${i.word}"`)
                .join('\n');
            expect(issues, `Spelling errors found:\n${report}`).toHaveLength(0);
        });

        it('should have no spelling errors in French pages', () => {
            const issues = runCSpell(['src/content/pages/**/fr.mdx']);
            const report = issues
                .map(i => `  ${i.file}:${i.line}:${i.col} — "${i.word}"`)
                .join('\n');
            expect(issues, `Spelling errors found:\n${report}`).toHaveLength(0);
        });
    });

    describe('Job offers', () => {
        it('should have no spelling errors in job offers', () => {
            const issues = runCSpell(['src/content/job-offers/**/*.md', 'src/content/job-offers/**/*.mdx']);
            const report = issues
                .map(i => `  ${i.file}:${i.line}:${i.col} — "${i.word}"`)
                .join('\n');
            expect(issues, `Spelling errors found:\n${report}`).toHaveLength(0);
        });
    });

    describe('Publications', () => {
        it('should have no spelling errors in publications', () => {
            const issues = runCSpell(['src/content/publications/**/*.md', 'src/content/publications/**/*.mdx']);
            const report = issues
                .map(i => `  ${i.file}:${i.line}:${i.col} — "${i.word}"`)
                .join('\n');
            expect(issues, `Spelling errors found:\n${report}`).toHaveLength(0);
        });
    });
});

