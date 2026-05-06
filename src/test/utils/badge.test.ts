import { describe, it, expect, vi } from 'vitest';
import { getBadge } from '@utils/badge';

// Mock translation function: returns undefined to trigger fallback to upperedValue
const t = vi.fn((_key: string) => undefined);

describe('getBadge', () => {
    describe('project colors (PC1-PC3)', () => {
        it('should return blue-bell colors for PC1', () => {
            const badge = getBadge('PC1', t);
            expect(badge.color).toBe('text-blue-bell-900');
            expect(badge.backgroundColor).toBe('bg-blue-bell-200');
        });

        it('should return blue-bell colors for PC2', () => {
            const badge = getBadge('PC2', t);
            expect(badge.color).toBe('text-blue-bell-900');
            expect(badge.backgroundColor).toBe('bg-blue-bell-200');
        });

        it('should return blue-bell colors for PC3', () => {
            const badge = getBadge('PC3', t);
            expect(badge.color).toBe('text-blue-bell-900');
            expect(badge.backgroundColor).toBe('bg-blue-bell-200');
        });
    });

    describe('project colors (PC4, PC5)', () => {
        it('should return hit-pink colors for PC4', () => {
            const badge = getBadge('PC4', t);
            expect(badge.color).toBe('text-hit-pink-900');
            expect(badge.backgroundColor).toBe('bg-hit-pink-200');
        });

        it('should return marzipan colors for PC5', () => {
            const badge = getBadge('PC5', t);
            expect(badge.color).toBe('text-marzipan-900');
            expect(badge.backgroundColor).toBe('bg-marzipan-200');
        });
    });

    describe('General', () => {
        it('should return primary colors for General', () => {
            const badge = getBadge('General', t);
            expect(badge.color).toBe('text-primary-900');
            expect(badge.backgroundColor).toBe('bg-primary-200');
        });
    });

    describe('job offer statuses', () => {
        it('should return green colors for available job offers', () => {
            const badge = getBadge('job-offers.available', t);
            expect(badge.color).toBe('text-green-800');
            expect(badge.backgroundColor).toBe('bg-green-200');
        });

        it('should return gray colors for filled job offers', () => {
            const badge = getBadge('job-offers.filled', t);
            expect(badge.color).toBe('text-gray-800');
            expect(badge.backgroundColor).toBe('bg-gray-200');
        });
    });

    describe('news type badges', () => {
        it('should return primary colors for event', () => {
            const badge = getBadge('event', t);
            expect(badge.color).toBe('text-primary-900');
            expect(badge.backgroundColor).toBe('bg-primary-200');
        });

        it('should return secondary colors for press-release', () => {
            const badge = getBadge('press-release', t);
            expect(badge.color).toBe('text-secondary-900');
            expect(badge.backgroundColor).toBe('bg-secondary-200');
        });

        it('should return marzipan-50/700 colors for workshop', () => {
            const badge = getBadge('workshop', t);
            expect(badge.color).toBe('text-marzipan-700');
            expect(badge.backgroundColor).toBe('bg-marzipan-50');
        });

        it('should return blue-bell-50/700 colors for seminar', () => {
            const badge = getBadge('seminar', t);
            expect(badge.color).toBe('text-blue-bell-700');
            expect(badge.backgroundColor).toBe('bg-blue-bell-50');
        });
    });

    describe('AT1-AT5 badges', () => {
        it('should return tertiary colors for at1', () => {
            const badge = getBadge('at1', t);
            expect(badge.color).toBe('text-tertiary-900');
            expect(badge.backgroundColor).toBe('bg-tertiary-200');
        });

        it('should return tertiary colors for at2', () => {
            const badge = getBadge('at2', t);
            expect(badge.color).toBe('text-tertiary-900');
            expect(badge.backgroundColor).toBe('bg-tertiary-200');
        });

        it('should return tertiary colors for at3', () => {
            const badge = getBadge('at3', t);
            expect(badge.color).toBe('text-tertiary-900');
            expect(badge.backgroundColor).toBe('bg-tertiary-200');
        });

        it('should return tertiary colors for at4', () => {
            const badge = getBadge('at4', t);
            expect(badge.color).toBe('text-tertiary-900');
            expect(badge.backgroundColor).toBe('bg-tertiary-200');
        });

        it('should return tertiary colors for at5', () => {
            const badge = getBadge('at5', t);
            expect(badge.color).toBe('text-tertiary-900');
            expect(badge.backgroundColor).toBe('bg-tertiary-200');
        });
    });

    describe('case-insensitive lookup', () => {
        it('should return the same colors for AT1 as at1', () => {
            const lower = getBadge('at1', t);
            const upper = getBadge('AT1', t);
            expect(upper.color).toBe(lower.color);
            expect(upper.backgroundColor).toBe(lower.backgroundColor);
        });

        it('should return the same colors for At1 as at1', () => {
            const lower = getBadge('at1', t);
            const mixed = getBadge('At1', t);
            expect(mixed.color).toBe(lower.color);
            expect(mixed.backgroundColor).toBe(lower.backgroundColor);
        });

        it('should match WORKSHOP to workshop', () => {
            const lower = getBadge('workshop', t);
            const upper = getBadge('WORKSHOP', t);
            expect(upper.color).toBe(lower.color);
            expect(upper.backgroundColor).toBe(lower.backgroundColor);
        });
    });

    describe('building-blocks falls to default', () => {
        it('should return default colors for building-blocks (intentionally not mapped)', () => {
            t.mockReturnValue(undefined as any);
            const badge = getBadge('building-blocks', t);
            expect(badge.color).toBe('text-gray-800');
            expect(badge.backgroundColor).toBe('bg-gray-100');
        });
    });

    describe('label fallback', () => {
        it('should capitalize the value as label when translation returns undefined', () => {
            t.mockReturnValue(undefined as any);
            const badge = getBadge('pc1', t);
            expect(badge.label).toBe('Pc1');
        });

        it('should use translation result when t returns a string', () => {
            t.mockReturnValue('Mon label' as any);
            const badge = getBadge('PC1', t);
            expect(badge.label).toBe('Mon label');
        });
    });

    describe('unknown values', () => {
        it('should return default colors for unknown value', () => {
            t.mockReturnValue(undefined as any);
            const badge = getBadge('unknown', t);
            expect(badge.color).toBe('text-gray-800');
            expect(badge.backgroundColor).toBe('bg-gray-100');
        });
    });

    describe('safety checks', () => {
        it('should return empty label and default colors for empty string', () => {
            const badge = getBadge('', t);
            expect(badge.label).toBe('');
            expect(badge.color).toBe('text-gray-800');
            expect(badge.backgroundColor).toBe('bg-gray-100');
        });

        it('should return empty label and default colors for non-string values', () => {
            const badge = getBadge(null as any, t);
            expect(badge.label).toBe('');
            expect(badge.color).toBe('text-gray-800');
            expect(badge.backgroundColor).toBe('bg-gray-100');
        });

        it('should return empty label and default colors for undefined', () => {
            const badge = getBadge(undefined as any, t);
            expect(badge.label).toBe('');
        });
    });
});
