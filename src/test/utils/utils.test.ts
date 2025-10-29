import { describe, it, expect } from 'vitest';
import {
    formatDate,
    isUpcoming,
    isToday,
    isSoon,
    isDeadlineApproaching,
    isDeadlinePassed,
    isRecent,
    getEventTypeColor,
    getProjectColor,
    getJobTypeColor,
    getPressTypeColor,
    getEventTypeTranslation,
    getPublicationTypeTranslation,
    getJobTypeTranslation,
    getPressTypeTranslation,
    isValidLanguage,
    isValidEventType,
    isValidPublicationType,
    isValidJobType,
    isValidProjectId,
    isValidPressType,
    isValidContentFileName,
    hasValidLanguagePrefix
} from '../../utils';

describe('Date Utilities', () => {
    const testDate = new Date('2024-06-15');
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    describe('formatDate', () => {
        it('should format date in English', () => {
            const formatted = formatDate(testDate, 'en');
            expect(formatted).toBe('June 15, 2024');
        });

        it('should format date in French', () => {
            const formatted = formatDate(testDate, 'fr');
            expect(formatted).toBe('15 juin 2024');
        });

        it('should default to English', () => {
            const formatted = formatDate(testDate);
            expect(formatted).toBe('June 15, 2024');
        });
    });

    describe('isUpcoming', () => {
        it('should return true for future dates', () => {
            expect(isUpcoming(tomorrow)).toBe(true);
        });

        it('should return false for past dates', () => {
            expect(isUpcoming(yesterday)).toBe(false);
        });
    });

    describe('isToday', () => {
        it('should return true for today', () => {
            expect(isToday(today)).toBe(true);
        });

        it('should return false for other dates', () => {
            expect(isToday(tomorrow)).toBe(false);
            expect(isToday(yesterday)).toBe(false);
        });
    });

    describe('isSoon', () => {
        it('should return true for dates within 7 days', () => {
            expect(isSoon(nextWeek)).toBe(true);
        });

        it('should return false for past dates', () => {
            expect(isSoon(yesterday)).toBe(false);
        });

        it('should accept custom days parameter', () => {
            const in30Days = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
            expect(isSoon(in30Days, 30)).toBe(true);
            expect(isSoon(in30Days, 7)).toBe(false);
        });
    });

    describe('isDeadlineApproaching', () => {
        it('should return true for deadlines within 30 days', () => {
            const in15Days = new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000);
            expect(isDeadlineApproaching(in15Days)).toBe(true);
        });

        it('should return false for past deadlines', () => {
            expect(isDeadlineApproaching(yesterday)).toBe(false);
        });
    });

    describe('isDeadlinePassed', () => {
        it('should return true for past dates', () => {
            expect(isDeadlinePassed(yesterday)).toBe(true);
        });

        it('should return false for future dates', () => {
            expect(isDeadlinePassed(tomorrow)).toBe(false);
        });
    });

    describe('isRecent', () => {
        it('should return true for recent dates', () => {
            expect(isRecent(yesterday)).toBe(true);
        });

        it('should return false for old dates', () => {
            expect(isRecent(lastMonth)).toBe(false);
        });
    });
});

describe('Color Utilities', () => {
    describe('getEventTypeColor', () => {
        it('should return correct colors for event types', () => {
            expect(getEventTypeColor('conference')).toContain('scampi');
            expect(getEventTypeColor('workshop')).toContain('blue');
            expect(getEventTypeColor('invalid')).toContain('gray');
        });
    });

    describe('getProjectColor', () => {
        it('should return correct colors for project types', () => {
            expect(getProjectColor('PC1')).toContain('scampi');
            expect(getProjectColor('PC2')).toContain('blue');
            expect(getProjectColor('invalid')).toContain('gray');
        });
    });

    describe('getJobTypeColor', () => {
        it('should return correct colors for job types', () => {
            expect(getJobTypeColor('postdoc')).toContain('scampi');
            expect(getJobTypeColor('phd')).toContain('blue');
            expect(getJobTypeColor('invalid')).toContain('gray');
        });
    });

    describe('getPressTypeColor', () => {
        it('should return correct colors for press types', () => {
            expect(getPressTypeColor('announcement')).toContain('scampi');
            expect(getPressTypeColor('award')).toContain('yellow');
            expect(getPressTypeColor('invalid')).toContain('gray');
        });
    });
});

describe('Translation Utilities', () => {
    describe('getEventTypeTranslation', () => {
        it('should translate event types in English', () => {
            expect(getEventTypeTranslation('conference', 'en')).toBe('Conference');
            expect(getEventTypeTranslation('workshop', 'en')).toBe('Workshop');
        });

        it('should translate event types in French', () => {
            expect(getEventTypeTranslation('conference', 'fr')).toBe('Conférence');
            expect(getEventTypeTranslation('workshop', 'fr')).toBe('Atelier');
        });

        it('should default to English', () => {
            expect(getEventTypeTranslation('conference')).toBe('Conference');
        });

        it('should return original text for unknown types', () => {
            expect(getEventTypeTranslation('unknown')).toBe('unknown');
        });
    });

    describe('getPublicationTypeTranslation', () => {
        it('should translate publication types in English', () => {
            expect(getPublicationTypeTranslation('journal', 'en')).toBe('Journal Article');
            expect(getPublicationTypeTranslation('conference', 'en')).toBe('Conference Paper');
        });

        it('should translate publication types in French', () => {
            expect(getPublicationTypeTranslation('journal', 'fr')).toBe('Article de journal');
            expect(getPublicationTypeTranslation('conference', 'fr')).toBe('Article de conférence');
        });
    });

    describe('getJobTypeTranslation', () => {
        it('should translate job types in English', () => {
            expect(getJobTypeTranslation('postdoc', 'en')).toBe('Postdoc');
            expect(getJobTypeTranslation('phd', 'en')).toBe('PhD Position');
        });

        it('should translate job types in French', () => {
            expect(getJobTypeTranslation('postdoc', 'fr')).toBe('Post-doctorat');
            expect(getJobTypeTranslation('phd', 'fr')).toBe('Thèse de doctorat');
        });
    });

    describe('getPressTypeTranslation', () => {
        it('should translate press types in English', () => {
            expect(getPressTypeTranslation('announcement', 'en')).toBe('Announcement');
            expect(getPressTypeTranslation('award', 'en')).toBe('Award');
        });

        it('should translate press types in French', () => {
            expect(getPressTypeTranslation('announcement', 'fr')).toBe('Annonce');
            expect(getPressTypeTranslation('award', 'fr')).toBe('Prix');
        });
    });
});

describe('Validation Utilities', () => {
    describe('isValidLanguage', () => {
        it('should validate supported languages', () => {
            expect(isValidLanguage('en')).toBe(true);
            expect(isValidLanguage('fr')).toBe(true);
            expect(isValidLanguage('es')).toBe(false);
            expect(isValidLanguage('')).toBe(false);
        });
    });

    describe('isValidEventType', () => {
        it('should validate event types', () => {
            expect(isValidEventType('conference')).toBe(true);
            expect(isValidEventType('workshop')).toBe(true);
            expect(isValidEventType('invalid')).toBe(false);
        });
    });

    describe('isValidPublicationType', () => {
        it('should validate publication types', () => {
            expect(isValidPublicationType('journal')).toBe(true);
            expect(isValidPublicationType('conference')).toBe(true);
            expect(isValidPublicationType('invalid')).toBe(false);
        });
    });

    describe('isValidJobType', () => {
        it('should validate job types', () => {
            expect(isValidJobType('postdoc')).toBe(true);
            expect(isValidJobType('phd')).toBe(true);
            expect(isValidJobType('invalid')).toBe(false);
        });
    });

    describe('isValidProjectId', () => {
        it('should validate project IDs', () => {
            expect(isValidProjectId('PC1')).toBe(true);
            expect(isValidProjectId('PC5')).toBe(true);
            expect(isValidProjectId('General')).toBe(true);
            expect(isValidProjectId('PC6')).toBe(false);
        });
    });

    describe('isValidPressType', () => {
        it('should validate press types', () => {
            expect(isValidPressType('announcement')).toBe(true);
            expect(isValidPressType('award')).toBe(true);
            expect(isValidPressType('invalid')).toBe(false);
        });
    });

    describe('isValidContentFileName', () => {
        it('should validate content file names', () => {
            expect(isValidContentFileName('en.md')).toBe(true);
            expect(isValidContentFileName('fr.mdx')).toBe(true);
            expect(isValidContentFileName('es.md')).toBe(false);
            expect(isValidContentFileName('english.md')).toBe(false);
        });
    });

    describe('hasValidLanguagePrefix', () => {
        it('should validate URL language prefixes', () => {
            expect(hasValidLanguagePrefix('/en/page')).toBe(true);
            expect(hasValidLanguagePrefix('/fr/page')).toBe(true);
            expect(hasValidLanguagePrefix('/es/page')).toBe(false);
            expect(hasValidLanguagePrefix('/page')).toBe(false);
        });
    });
});