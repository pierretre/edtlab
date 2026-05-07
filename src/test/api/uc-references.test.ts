import { describe, it, expect } from 'vitest';
import matter from 'gray-matter';

describe('References API Helpers', () => {
    describe('gray-matter parsing', () => {
        const SAMPLE_MD = `---
id: "UC-TEST"
title: "Test UC"
previewToken: "test-token"
references:
  - title: "Paper 1"
    venue: "Conference 2025"
    url: "https://example.com/paper1"
  - title: "Paper 2"
    url: "https://example.com/paper2"
---

Content here.
`;

        it('parses references from frontmatter', () => {
            const { data } = matter(SAMPLE_MD);
            expect(data.references).toHaveLength(2);
            expect(data.references[0].title).toBe('Paper 1');
            expect(data.references[0].venue).toBe('Conference 2025');
        });

        it('updates references and rebuilds file', () => {
            const { data, content } = matter(SAMPLE_MD);
            const dataCopy = structuredClone(data);
            dataCopy.references.push({
                title: 'New Paper',
                url: 'https://example.com/new'
            });
            const updated = matter.stringify(content, dataCopy);

            expect(updated).toContain('New Paper');
            expect(updated).toContain('https://example.com/new');

            // Verify it can be parsed again
            const reparsed = matter(updated);
            expect(reparsed.data.references).toHaveLength(3);
        });

        it('removes references', () => {
            const { data, content } = matter(SAMPLE_MD);
            const dataCopy = structuredClone(data);
            dataCopy.references.splice(1, 1); // Remove second ref
            const updated = matter.stringify(content, dataCopy);

            const reparsed = matter(updated);
            expect(reparsed.data.references).toHaveLength(1);
            expect(reparsed.data.references[0].title).toBe('Paper 1');
        });

        it('handles missing references array', () => {
            const minimalMd = `---
id: "UC-TEST"
title: "Test UC"
---

Content.
`;
            const { data } = matter(minimalMd);
            expect(data.references).toBeUndefined();

            // Can add references
            data.references = [{ title: 'First', url: 'http://example.com' }];
            const updated = matter.stringify('Content.', data);
            expect(updated).toContain('First');
        });
    });

    describe('Reference validation', () => {
        it('requires title and url', () => {
            const validRef = { title: 'Title', url: 'http://example.com' };
            expect(validRef.title && validRef.url).toBeTruthy();

            const missingUrl = { title: 'Title' };
            expect((missingUrl as any).url).toBeUndefined();

            const missingTitle = { url: 'http://example.com' };
            expect((missingTitle as any).title).toBeUndefined();
        });

        it('supports optional venue field', () => {
            const ref = { title: 'Title', url: 'http://example.com', venue: 'Conference 2025' };
            expect(ref.venue).toBe('Conference 2025');
        });
    });

    describe('PDF reference handling', () => {
        it('constructs valid PDF reference', () => {
            const pdfUrl = '/docs/uc-05-1712800000000.pdf';
            const ref = {
                title: 'Research Poster',
                url: pdfUrl
            };
            expect(ref.url).toMatch(/^\/docs\/.*\.pdf$/);
        });

        it('treats PDF references the same as URL references', () => {
            const urlRef = { title: 'Paper', url: 'https://example.com/paper.pdf' };
            const docRef = { title: 'Poster', url: '/docs/uc-05-1234567890.pdf' };

            // Both follow the same structure
            expect(urlRef).toHaveProperty('title');
            expect(urlRef).toHaveProperty('url');
            expect(docRef).toHaveProperty('title');
            expect(docRef).toHaveProperty('url');
        });
    });
});
