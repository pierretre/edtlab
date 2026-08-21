import { describe, it, expect, vi } from 'vitest';

// Mock Astro layout components before importing the util
vi.mock('@layouts/NewsItemLayout.astro', () => ({ default: 'NewsItemLayout' }));
vi.mock('@layouts/PositionLayout.astro', () => ({ default: 'PositionLayout' }));
vi.mock('@layouts/PageLayout.astro', () => ({ default: 'PageLayout' }));
vi.mock('@layouts/ProjectLayout.astro', () => ({ default: 'ProjectLayout' }));

import { getLayoutFromTemplateOrCollection } from '@utils/layout';

describe('getLayoutFromTemplateOrCollection', () => {
    describe('template-based selection', () => {
        it('should return ProjectLayout for project-page template', () => {
            const layout = getLayoutFromTemplateOrCollection('pages', 'project-page');
            expect(layout).toBe('ProjectLayout');
        });

        it('should return PageLayout for unknown template', () => {
            const layout = getLayoutFromTemplateOrCollection('pages', 'unknown-template');
            expect(layout).toBe('PageLayout');
        });

        it('should return PageLayout for empty template string', () => {
            const layout = getLayoutFromTemplateOrCollection('pages', '');
            // empty string is falsy → falls through to collection-based selection
            expect(layout).toBe('PageLayout');
        });
    });

    describe('collection-based selection (no template)', () => {
        it('should return PositionLayout for positions collection', () => {
            const layout = getLayoutFromTemplateOrCollection('positions');
            expect(layout).toBe('PositionLayout');
        });

        it('should return NewsItemLayout for news collection', () => {
            const layout = getLayoutFromTemplateOrCollection('news');
            expect(layout).toBe('NewsItemLayout');
        });

        it('should return PageLayout for pages collection', () => {
            const layout = getLayoutFromTemplateOrCollection('pages');
            expect(layout).toBe('PageLayout');
        });

        it('should return PageLayout for unknown collection', () => {
            const layout = getLayoutFromTemplateOrCollection('unknown-collection');
            expect(layout).toBe('PageLayout');
        });
    });

    describe('template takes priority over collection', () => {
        it('should use template when both template and collection are provided', () => {
            const layout = getLayoutFromTemplateOrCollection('news', 'project-page');
            expect(layout).toBe('ProjectLayout');
        });
    });
});
