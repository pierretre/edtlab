import { describe, it, expect } from 'vitest';
import { z } from 'zod';

describe('Content Schema Validation', () => {
    const pageSchema = z.object({
        title: z.string(),
        slug: z.string(),
        lang: z.enum(['en', 'fr']),
        description: z.string().optional(),
        toc: z.boolean().default(false)
    });

    const publicationSchema = z.object({
        title: z.string(),
        authors: z.array(z.string()),
        type: z.enum(['journal', 'conference', 'book', 'delivrable', 'preprint', 'thesis', 'workshop-paper']),
        year: z.number(),
        venue: z.string().optional(),
        doi: z.string().optional(),
        url: z.url().optional(),
        lang: z.enum(['en', 'fr'])
    });

    const positionSchema = z.object({
        title: z.string(),
        pc: z.enum(['PC1', 'PC2', 'PC3', 'PC4', 'PC5']).optional(),
        type: z.enum(['postdoc', 'phd', 'engineer', 'intern']),
        location: z.string(),
        expectedStartDate: z.string(),
        filled: z.boolean().default(false),
        publishedDate: z.date(),
        description: z.string(),
        requirements: z.array(z.string()),
        contacts: z.array(z.email()).optional(),
        lang: z.enum(['en', 'fr']),
        template: z.string().optional(),
        tags: z.array(z.string()).optional()
    });

    const eventSchema = z.object({
        title: z.string(),
        date: z.date(),
        type: z.enum(['conference', 'workshop', 'seminar', 'press']),
        location: z.string().optional(),
        description: z.string(),
        url: z.url().optional(),
        lang: z.enum(['en', 'fr'])
    });

    const menuSchema = z.object({
        sections: z.array(z.object({
            name: z.string(),
            slug: z.string(),
            items: z.array(z.object({
                name: z.string(),
                slug: z.string()
            })).optional()
        }))
    });

    it('should validate page schema', () => {
        const validPage = {
            title: 'Test Page',
            slug: 'test-page',
            lang: 'en' as const,
            description: 'Test description',
            toc: true
        };

        const result = pageSchema.safeParse(validPage);
        expect(result.success).toBe(true);
    });

    it('should validate publication schema', () => {
        const validPublication = {
            title: 'Test Publication',
            authors: ['Author One', 'Author Two'],
            type: 'journal' as const,
            year: 2024,
            venue: 'Test Journal',
            lang: 'en' as const
        };

        const result = publicationSchema.safeParse(validPublication);
        expect(result.success).toBe(true);
    });

    it('should validate position schema', () => {
        const validPosition = {
            title: 'Test Position',
            pc: 'PC1' as const,
            type: 'postdoc' as const,
            location: 'Paris, France',
            expectedStartDate: 'Spring 2025',
            filled: false,
            publishedDate: new Date('2024-01-15'),
            description: 'Test job description',
            requirements: ['PhD in relevant field'],
            contacts: ['contact@example.com'],
            lang: 'en' as const,
            tags: ['research', 'digital-twins']
        };

        const result = positionSchema.safeParse(validPosition);
        expect(result.success).toBe(true);
    });

    it('should validate event schema', () => {
        const validEvent = {
            title: 'Test Event',
            date: new Date('2024-06-15'),
            type: 'conference' as const,
            location: 'Paris, France',
            description: 'Test event description',
            lang: 'en' as const
        };

        const result = eventSchema.safeParse(validEvent);
        expect(result.success).toBe(true);
    });

    it('should validate menu schema', () => {
        const validMenu = {
            sections: [
                {
                    name: 'Program',
                    slug: 'program'
                },
                {
                    name: 'Projects',
                    slug: 'focused-projects',
                    items: [
                        {
                            name: 'Overview',
                            slug: 'focused-projects'
                        },
                        {
                            name: 'Project 1 (PC1)',
                            slug: 'focused-projects/fp1'
                        }
                    ]
                }
            ]
        };

        const result = menuSchema.safeParse(validMenu);
        expect(result.success).toBe(true);
    });

    it('should reject invalid language codes', () => {
        const invalidPage = {
            title: 'Test Page',
            slug: 'test-page',
            lang: 'es', // Invalid language
            toc: false
        };

        const result = pageSchema.safeParse(invalidPage);
        expect(result.success).toBe(false);
    });
});