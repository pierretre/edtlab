import { defineCollection, z } from 'astro:content';

// Pages collection schema
const pagesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        href: z.string().optional(),
        lang: z.enum(['en', 'fr']).optional(),
        description: z.string().optional(),
        toc: z.boolean().default(false),
        lastModified: z.date().optional(),
        color: z.string().optional(),
        template: z.string().optional(),
        projectId: z.string().optional()
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
        tags: z.array(z.string()).optional().default([]),
    })
});

// News collection schema (excluding press releases)
const newsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.date(),
        newsType: z.enum(['event', 'press-release']),
        location: z.string().optional(),
        description: z.string(),
        url: z.string().url().optional(),
        lang: z.enum(['en', 'fr']),
        photo: z.string(),
        tags: z.array(z.string()).optional().default([])
    })
});

// Job offers collection schema
const jobOffersCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        type: z.enum(['PostDoc', 'PhD', 'Engineer', 'Intern', 'Others']),
        location: z.string(),
        expectedStartDate: z.string(),
        filled: z.boolean().default(false),
        publishedDate: z.date(),
        description: z.string(),
        requirements: z.array(z.string()),
        contacts: z.array(z.string().email()).optional(),
        lang: z.enum(['en', 'fr']).optional(),
        tags: z.array(z.string()).optional().default([])
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
    'news': newsCollection,
    'job-offers': jobOffersCollection,
    'menu': menuCollection
};