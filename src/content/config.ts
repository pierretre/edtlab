import { defineCollection, z } from 'astro:content';

// Pages collection schema
const pagesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        href: z.string(),
        lang: z.enum(['en', 'fr']),
        description: z.string().optional(),
        toc: z.boolean().default(false),
        lastModified: z.date().optional(),
        color: z.string().optional(),
        illustration: z.string().optional(),
        template: z.string().optional(),
    })
});

// Publications collection schema
const publicationsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        authors: z.array(z.string()),
        type: z.enum(['journal', 'conference', 'book', 'report']),
        year: z.number(),
        venue: z.string().optional(),
        doi: z.string().optional(),
        url: z.string().url().optional(),
        project: z.enum(['PC1', 'PC2', 'PC3', 'PC4', 'PC5']),
    })
});

// Events collection schema (excluding press releases)
const eventsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.date(),
        type: z.enum(['conference', 'workshop', 'seminar']),
        location: z.string().optional(),
        description: z.string(),
        url: z.string().url().optional(),
        project: z.enum(['PC1', 'PC2', 'PC3', 'PC4', 'PC5', 'General']).optional(),
        lang: z.enum(['en', 'fr']),
        photo: z.string(),
        tags: z.array(z.string()).optional().default([]),
        template: z.string().optional()
    })
});

// Press releases collection schema
const pressReleasesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.date(),
        description: z.string(),
        url: z.string().url().optional(),
        project: z.enum(['PC1', 'PC2', 'PC3', 'PC4', 'PC5', 'General']).optional(),
        lang: z.enum(['en', 'fr']),
        photo: z.string(),
        tags: z.array(z.string()).optional().default([]),
        template: z.string().optional()
    })
});

// Job offers collection schema
const jobOffersCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        project: z.enum(['PC1', 'PC2', 'PC3', 'PC4', 'PC5', 'General']),
        type: z.enum(['postdoc', 'phd', 'engineer', 'intern']),
        location: z.string(),
        deadline: z.date(),
        publishedDate: z.date(),
        description: z.string(),
        requirements: z.array(z.string()),
        lang: z.enum(['en', 'fr']),
        template: z.string().optional()
    })
});

// Menu collection schema for navigation data
const menuCollection = defineCollection({
    type: 'data',
    schema: z.object({
        sections: z.array(z.object({
            name: z.string(),
            href: z.string(),
            items: z.array(z.object({
                name: z.string(),
                href: z.string()
            })).optional()
        })),
    })
});

export const collections = {
    'pages': pagesCollection,
    'publications': publicationsCollection,
    'events': eventsCollection,
    'press-releases': pressReleasesCollection,
    'job-offers': jobOffersCollection,
    'menu': menuCollection
};