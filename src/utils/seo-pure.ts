export interface StructuredData {
    '@context': string;
    '@type': string;
    [key: string]: any;
}

function cleanObject<T extends Record<string, any>>(obj: T): T {
    if (!obj || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
        return obj
            .map(item => cleanObject(item))
            .filter(item => item !== undefined && item !== null && !(typeof item === 'object' && Object.keys(item).length === 0)) as any;
    }

    const result: Record<string, any> = {};
    for (const [k, v] of Object.entries(obj)) {
        if (v === undefined || v === null) continue;

        if (typeof v === 'object') {
            const cleaned = cleanObject(v as any);
            if (cleaned === undefined) continue;
            if (Array.isArray(cleaned) && cleaned.length === 0) continue;
            if (typeof cleaned === 'object' && Object.keys(cleaned).length === 0) continue;
            result[k] = cleaned;
        } else {
            result[k] = v;
        }
    }

    return result as T;
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
    return cleanObject({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name,
        description,
        url,
        logo: logo ? {
            '@type': 'ImageObject',
            url: logo
        } : undefined,
        sameAs: [],
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'general',
            availableLanguage: ['English', 'French']
        }
    });
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
    return cleanObject({
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
    });
}

/**
 * Generate structured data for academic article/publication
 */
export function generatePublicationStructuredData(
    title: string,
    authors: string[],
    datePublished: string,
    tags: string[],
    url?: string,
    doi?: string,
    venue?: string,
    type: 'journal' | 'conference' | 'book' | 'delivrable' | 'white-paper' | 'preprint' | 'thesis' | 'workshop-paper' | 'slidedeck' = 'journal'
): StructuredData {
    const schemaType = type === 'book' ? 'Book' : 'ScholarlyArticle';
    return cleanObject({
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
        },
        isPartOf: tags.length > 0 ? {
            '@type': 'Project',
            name: tags.join(', ')
        } : undefined,
        keywords: tags
    });
}

/**
 * Generate structured data for event
 */
export function generateEventStructuredData(
    name: string,
    description: string,
    startDate: string,
    location?: string | { name?: string; address?: string; city?: string; country?: string },
    url?: string,
    endDate?: string,
    image?: string,
): StructuredData {
    const place =
        typeof location === 'string'
            ? { '@type': 'Place', name: location }
            : location
                ? {
                    '@type': 'Place',
                    name: location.name,
                    address: location.address ? {
                        '@type': 'PostalAddress',
                        streetAddress: location.address,
                        addressLocality: location.city,
                        addressCountry: location.country
                    } : undefined
                }
                : undefined;

    return cleanObject({
        '@context': 'https://schema.org',
        '@type': 'Event',
        name,
        description,
        startDate,
        endDate,
        location: place,
        url,
        image: image ? { '@type': 'ImageObject', url: image } : undefined,
        eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        organizer: {
            '@type': 'Organization',
            name: 'EDT Research Program'
        }
    });
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
    requirements?: string[],
    baseSalary?: { currency: string; value: number }
): StructuredData {
    return cleanObject({
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
        occupationalCategory: 'Research',
        baseSalary: baseSalary ? {
            '@type': 'MonetaryAmount',
            currency: baseSalary.currency,
            value: {
                '@type': 'QuantitativeValue',
                value: baseSalary.value
            }
        } : undefined
    });
}

/**
 * Generate structured data for press release (NewsArticle / PressRelease)
 */
export function generatePressReleaseStructuredData(
    headline: string,
    description: string,
    datePublished: string,
    url?: string,
    image?: string | string[],
    author?: string | string[],
    publisher?: string,
    keywords?: string[]
): StructuredData {
    const authors = Array.isArray(author) ? author : author ? [author] : undefined;

    return cleanObject({
        '@context': 'https://schema.org',
        '@type': 'PressRelease',
        headline,
        description,
        datePublished,
        url,
        image: image ? (Array.isArray(image) ? image.map(i => ({ '@type': 'ImageObject', url: i })) : { '@type': 'ImageObject', url: image }) : undefined,
        author: authors ? authors.map(a => ({ '@type': 'Person', name: a })) : undefined,
        publisher: publisher ? { '@type': 'Organization', name: publisher } : undefined,
        keywords
    });
}

/**
 * Convert a StructuredData object to an escaped JSON-LD string for embedding in a <script type="application/ld+json"> tag
 */
export function generateJsonLdString(data: StructuredData): string {
    const cleaned = cleanObject(data);
    return JSON.stringify(cleaned);
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
    pathname: string
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