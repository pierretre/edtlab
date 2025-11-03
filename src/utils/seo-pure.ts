export interface StructuredData {
    '@context': string;
    '@type': string;
    [key: string]: any;
}

/**
 * Generate structured data for organization
 */
export function generateOrganizationStructuredData(
    name: string,
    description: string,
    url: string,
    logo?: string
): StructuredData {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name,
        description,
        url,
        logo: logo ? {
            '@type': 'ImageObject',
            url: logo
        } : undefined,
        sameAs: [
            // Add social media or official links here
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'general',
            availableLanguage: ['English', 'French']
        }
    };
}

/**
 * Generate structured data for research project
 */
export function generateResearchProjectStructuredData(
    name: string,
    description: string,
    url: string,
    startDate?: string,
    endDate?: string,
    funding?: string[]
): StructuredData {
    return {
        '@context': 'https://schema.org',
        '@type': 'ResearchProject',
        name,
        description,
        url,
        startDate,
        endDate,
        funding: funding?.map(funder => ({
            '@type': 'Organization',
            name: funder
        })),
        about: {
            '@type': 'Thing',
            name: 'Digital Twins',
            description: 'Engineering Digital Twins Research'
        }
    };
}

/**
 * Generate structured data for academic article/publication
 */
export function generatePublicationStructuredData(
    title: string,
    authors: string[],
    datePublished: string,
    url?: string,
    doi?: string,
    venue?: string,
    type: 'journal' | 'conference' | 'book' | 'report' = 'journal'
): StructuredData {
    const schemaType = type === 'book' ? 'Book' : 'ScholarlyArticle';

    return {
        '@context': 'https://schema.org',
        '@type': schemaType,
        headline: title,
        author: authors.map(author => ({
            '@type': 'Person',
            name: author
        })),
        datePublished,
        url,
        identifier: doi ? {
            '@type': 'PropertyValue',
            name: 'DOI',
            value: doi
        } : undefined,
        publisher: venue ? {
            '@type': 'Organization',
            name: venue
        } : undefined,
        about: {
            '@type': 'Thing',
            name: 'Digital Twins',
            description: 'Engineering Digital Twins Research'
        }
    };
}

/**
 * Generate structured data for event
 */
export function generateEventStructuredData(
    name: string,
    description: string,
    startDate: string,
    location?: string,
    url?: string,
    eventType: 'conference' | 'workshop' | 'seminar' = 'conference'
): StructuredData {
    return {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name,
        description,
        startDate,
        location: location ? {
            '@type': 'Place',
            name: location
        } : undefined,
        url,
        eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        organizer: {
            '@type': 'Organization',
            name: 'EDT Research Program'
        }
    };
}

/**
 * Generate structured data for job posting
 */
export function generateJobPostingStructuredData(
    title: string,
    description: string,
    location: string,
    datePosted: string,
    validThrough: string,
    employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACTOR' | 'TEMPORARY' | 'INTERN' = 'FULL_TIME',
    requirements?: string[]
): StructuredData {
    return {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title,
        description,
        datePosted,
        validThrough,
        employmentType,
        jobLocation: {
            '@type': 'Place',
            address: {
                '@type': 'PostalAddress',
                addressLocality: location,
                addressCountry: 'FR'
            }
        },
        hiringOrganization: {
            '@type': 'Organization',
            name: 'EDT Research Program'
        },
        qualifications: requirements?.join(', '),
        industry: 'Research and Development',
        occupationalCategory: 'Research'
    };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(
    items: Array<{ name: string; url: string }>
): StructuredData {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url
        }))
    };
}

/**
 * Optimize page title for SEO
 */
export function optimizePageTitle(title: string, siteName: string, maxLength: number = 60): string {
    const fullTitle = `${title} | ${siteName}`;

    if (fullTitle.length <= maxLength) {
        return fullTitle;
    }

    // Truncate title if too long, keeping site name
    const availableLength = maxLength - siteName.length - 3; // 3 for " | "
    const truncatedTitle = title.length > availableLength
        ? `${title.substring(0, availableLength - 3)}...`
        : title;

    return `${truncatedTitle} | ${siteName}`;
}

/**
 * Optimize meta description for SEO
 */
export function optimizeMetaDescription(description: string, maxLength: number = 160): string {
    if (description.length <= maxLength) {
        return description;
    }

    // Truncate at word boundary
    const truncated = description.substring(0, maxLength - 3);
    const lastSpace = truncated.lastIndexOf(' ');

    return lastSpace > maxLength * 0.8
        ? `${truncated.substring(0, lastSpace)}...`
        : `${truncated}...`;
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(baseUrl: string, pathname: string): string {
    // Remove trailing slash and ensure proper format
    const cleanBaseUrl = baseUrl.replace(/\/$/, '');
    const cleanPathname = pathname.startsWith('/') ? pathname : `/${pathname}`;

    return `${cleanBaseUrl}${cleanPathname}`;
}

/**
 * Generate alternate language URLs
 */
export function generateAlternateUrls(
    baseUrl: string,
    pathname: string,
    currentLang: 'en' | 'fr'
): { hreflang: string; href: string }[] {
    const cleanBaseUrl = baseUrl.replace(/\/$/, '');

    // Remove language prefix from pathname
    const pathWithoutLang = pathname.replace(/^\/[a-z]{2}\//, '/').replace(/^\//, '');

    return [
        {
            hreflang: 'en',
            href: `${cleanBaseUrl}/en/${pathWithoutLang}`
        },
        {
            hreflang: 'fr',
            href: `${cleanBaseUrl}/fr/${pathWithoutLang}`
        },
        {
            hreflang: 'x-default',
            href: `${cleanBaseUrl}/en/${pathWithoutLang}`
        }
    ];
}