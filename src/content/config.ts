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
        lastModified: z.date().optional()
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
    })
});

// Events collection schema
const eventsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.date(),
        type: z.enum(['conference', 'workshop', 'seminar', 'press']),
        location: z.string().optional(),
        description: z.string(),
        url: z.string().url().optional(),
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
        description: z.string(),
        requirements: z.array(z.string()),
        lang: z.enum(['en', 'fr']),
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
        }))
    })
});

export const collections = {
    'pages': pagesCollection,
    'publications': publicationsCollection,
    'events': eventsCollection,
    'job-offers': jobOffersCollection,
    'menu': menuCollection
};