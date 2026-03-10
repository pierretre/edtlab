/**
 * Translation utility functions for consistent content translation
 */

/**
 * Event type translations
 */
export const EVENT_TYPE_TRANSLATIONS = {
    en: {
        conference: "Conference",
        workshop: "Workshop",
        seminar: "Seminar",
        press: "Press Release"
    },
    fr: {
        conference: "Conférence",
        workshop: "Atelier",
        seminar: "Séminaire",
        press: "Communiqué de presse"
    }
} as const;

/**
 * Publication type translations
 */
export const PUBLICATION_TYPE_TRANSLATIONS = {
    en: {
        journal: "Journal Article",
        conference: "Conference Paper",
        book: "Book",
        report: "Technical Report"
    },
    fr: {
        journal: "Article de journal",
        conference: "Article de conférence",
        book: "Livre",
        report: "Rapport technique"
    }
} as const;

/**
 * Job offer type translations
 */
export const JOB_TYPE_TRANSLATIONS = {
    en: {
        postdoc: "Postdoc",
        phd: "PhD Position",
        engineer: "Engineer",
        intern: "Internship",
        others: "Others"
    },
    fr: {
        postdoc: "Post-doctorat",
        phd: "Thèse de doctorat",
        engineer: "Ingénieur",
        intern: "Stage",
        others: "Autres"
    }
} as const;

/**
 * Press release type translations
 */
export const PRESS_TYPE_TRANSLATIONS = {
    en: {
        announcement: "Announcement",
        award: "Award",
        partnership: "Partnership",
        publication: "Publication",
        event: "Event"
    },
    fr: {
        announcement: "Annonce",
        award: "Prix",
        partnership: "Partenariat",
        publication: "Publication",
        event: "Événement"
    }
} as const;

/**
 * Get translated text for event types
 * @param type - The event type
 * @param lang - The language code ('en' or 'fr')
 * @returns Translated event type text
 */
export function getEventTypeTranslation(type: string, lang: 'en' | 'fr' = 'en'): string {
    const translations = EVENT_TYPE_TRANSLATIONS[lang];
    return translations[type as keyof typeof translations] || type;
}

/**
 * Get translated text for publication types
 * @param type - The publication type
 * @param lang - The language code ('en' or 'fr')
 * @returns Translated publication type text
 */
export function getPublicationTypeTranslation(type: string, lang: 'en' | 'fr' = 'en'): string {
    const translations = PUBLICATION_TYPE_TRANSLATIONS[lang];
    return translations[type as keyof typeof translations] || type;
}

/**
 * Get translated text for job offer types
 * @param type - The job offer type
 * @param lang - The language code ('en' or 'fr')
 * @returns Translated job type text
 */
export function getJobTypeTranslation(type: string, lang: 'en' | 'fr' = 'en'): string {
    const translations = JOB_TYPE_TRANSLATIONS[lang];
    return translations[type as keyof typeof translations] || type;
}

/**
 * Get translated text for press release types
 * @param type - The press release type
 * @param lang - The language code ('en' or 'fr')
 * @returns Translated press type text
 */
export function getPressTypeTranslation(type: string, lang: 'en' | 'fr' = 'en'): string {
    const translations = PRESS_TYPE_TRANSLATIONS[lang];
    return translations[type as keyof typeof translations] || type;
}