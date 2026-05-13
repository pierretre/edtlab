import { defineCollection, reference } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// Pages collection schema
const pagesCollection = defineCollection({
    loader: glob({ base: "./src/content/pages", pattern: "**/*.{md,mdx}" }),
    schema: z.object({
        title: z.string(),
        href: z.string().optional(),
        lang: z.enum(['en', 'fr']).optional(),
        description: z.string().optional(),
        toc: z.boolean().default(false),
        lastModified: z.coerce.date().optional(),
        color: z.string().optional(),
        template: z.string().optional(),
        projectId: z.string().optional()
    })
});

// Publications collection schema
const publicationsCollection = defineCollection({
    loader: glob({ base: "./src/content/publications", pattern: "**/*.{md,mdx}" }),
    schema: z.object({
        title: z.string(),
        authors: z.array(z.string()),
        type: z.enum(['journal', 'conference', 'book', 'report', 'white-paper', 'preprint', 'thesis', 'workshop', 'slidedeck']),
        year: z.number(),
        venue: z.string().optional(),
        doi: z.string().optional(),
        url: z.url().optional(),
        tags: z.array(z.string()).optional().default([]),
        origin: z.enum(['edt', 'external']).optional().default('external'),
    })
});

// News collection schema (excluding press releases)
const newsCollection = defineCollection({
    loader: glob({ base: "./src/content/news", pattern: "**/*.{md,mdx}" }),
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
        lang: z.enum(['en', 'fr']),
        photo: z.string(),
        description: z.string(),
        newsType: z.enum(['event', 'press-release']),
        location: z.string().optional(),
        url: z.url().optional(),
        icsPath: z.string().optional(),
        tags: z.array(z.string()).optional().default([]),
        redirectTo: reference("news").optional(),
    })
});

// Job offers collection schema
const jobOffersCollection = defineCollection({
    loader: glob({ base: "./src/content/job-offers", pattern: "**/*.{md,mdx}" }),
    schema: z.object({
        title: z.string(),
        type: z.enum(['PostDoc', 'PhD', 'Engineer', 'Intern', 'Others']),
        location: z.string(),
        expectedStartDate: z.string(),
        filled: z.boolean().default(false),
        publishedDate: z.coerce.date(),
        description: z.string(),
        requirements: z.array(z.string()),
        contacts: z.array(z.email()).optional(),
        lang: z.enum(['en', 'fr']).optional(),
        tags: z.array(z.string()).optional().default([]),
        references: z.array(z.string()).optional().default([]),
        partner: z.string().optional(),
        externalUrl: z.string().optional()
    })
});

// Use cases collection schema
const useCasesCollection = defineCollection({
    loader: glob({ base: "./src/content/use-cases", pattern: "**/*.{md,mdx}" }),
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
        approvedBy: z.object({
            name: z.string(),
            email: z.email(),
            title: z.string(),
            org: z.string(),
            date: z.coerce.date(),
        }).optional(),
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
        publishedDate: z.coerce.date(),
        approvedDate: z.coerce.date().optional(),
        lastUpdated: z.coerce.date().optional(),
        version: z.string().optional(),
        status: z.enum(['draft', 'published']).default('published'),
        previewToken: z.string().optional(),
        confirmToken: z.string().optional(),
        usersCount: z.number().optional(),
        // Identity card fields (HN-T009-S1)
        provider: z.string().optional(),
        originType: z.enum(['natural', 'anthropic', 'engineered', 'infrastructure', 'process']).optional(),
        users: z.array(z.union([z.string(), z.object({ name: z.string(), role: z.string().optional() })])).optional().default([]),
        objectives: z.array(z.string()).optional().default([]),
        usagePhase: z.string().optional(),
        usageLevel: z.enum(['reduced', 'consortium', 'public']).optional(),
        since: z.coerce.date().optional(),
        schema: z.string().optional(),
    })
});

// Calendar collection schema for timeline milestones and dates
const calendarCollection = defineCollection({
    loader: glob({ base: "./src/content/calendar", pattern: '**/*.json' }),
    schema: z.object({
        items: z.array(z.object({
            date: z.string(),
            title: z.string(),
            isMilestone: z.boolean().default(false),
            programMilestone: z.boolean().default(false),
            location: z.string().optional(),
            timeLabel: z.string().optional(),
        }))
    })
});

// Menu collection schema for navigation data
const menuCollection = defineCollection({
    loader: glob({ base: "./src/content/menu", pattern: '**/*.json' }),
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
    'calendar': calendarCollection,
    'menu': menuCollection,
    'use-cases': useCasesCollection
};
