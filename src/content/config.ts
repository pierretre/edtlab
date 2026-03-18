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
        lang: z.enum(['en', 'fr']),
        photo: z.string(),
        description: z.string(),
        newsType: z.enum(['event', 'press-release']),
        location: z.string().optional(),
        url: z.string().url().optional(),
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

// Use cases collection schema
const useCasesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        id: z.string(),
        title: z.string(),
        summary: z.string(),
        domain: z.string().optional(),
        maturity: z.enum(['concept', 'poc', 'prototype', 'operational']).optional(),
        lang: z.enum(['en', 'fr']),
        photo: z.string().default('/media/use-cases/uc-default.svg'),
        tags: z.array(z.string()).optional().default([]),
        contacts: z.array(z.object({
            name: z.string(),
            org: z.string().optional(),
            email: z.string().optional(),
            role: z.string().optional(),
        })).optional().default([]),
        pepr: z.string().optional(),
        references: z.array(z.object({
            title: z.string(),
            venue: z.string().optional(),
            url: z.string().optional(),
        })).optional().default([]),
        resources: z.array(z.union([
            z.string(),
            z.object({
                label: z.string(),
                type: z.string().optional(),
                url: z.string().optional(),
            })
        ])).optional().default([]),
        license: z.string().optional(),
        publishedDate: z.date(),
        approvedDate: z.date().optional(),
        lastUpdated: z.date().optional(),
        version: z.string().optional(),
        status: z.enum(['draft', 'published']).default('draft'),
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
    'menu': menuCollection,
    'use-cases': useCasesCollection
};