import { describe, it, expect } from 'vitest';
import {
    extractRQCodes,
    extractRQGlosses,
    extractSection,
    themeOf,
    sortRQCodes,
    getPortfolioGraph,
} from '@utils/portfolio-graph';

describe('extractRQCodes', () => {
    it('extracts codes from the French "RQ associées" gloss', () => {
        const text = 'RQ associées : RQ_D6 (évolution des modèles), RQ_E2 (modularisation)';
        expect(extractRQCodes(text)).toEqual(['RQ_D6', 'RQ_E2']);
    });

    it('extracts codes from the English backtick-wrapped gloss', () => {
        const text = '**Associated RQs:** `RQ_D2` (data uncertainty), `RQ_I2` (validity envelope)';
        expect(extractRQCodes(text)).toEqual(['RQ_D2', 'RQ_I2']);
    });

    it('deduplicates repeated codes', () => {
        expect(extractRQCodes('RQ_D2 ... RQ_D2 ... RQ_T4')).toEqual(['RQ_D2', 'RQ_T4']);
    });

    it('returns an empty array when no code is present', () => {
        expect(extractRQCodes('no research question here')).toEqual([]);
    });
});

describe('extractSection', () => {
    const body = [
        '## Résumé',
        '',
        'Un résumé.',
        '',
        '## Description fonctionnelle',
        '',
        '### Utilisateurs',
        '',
        '- **Un rôle** - fait des choses.',
        '',
        '### Besoins fonctionnels',
        '',
        '- **Optimiser** · *Un rôle* veut faire une chose. **Métrique :** un chiffre.',
        '',
        '## Enjeux scientifiques et techniques',
        '',
        '### Premier enjeu',
        '',
        'Description du premier enjeu.',
        '',
        'RQ associées : RQ_D2 (partial obs)',
        '',
        '### Second enjeu',
        '',
        'Description du second enjeu.',
        '',
        'RQ associées : RQ_I3 (hybridation)',
        '',
        '## Matériel',
    ].join('\n');

    it('extracts a level-3 section bounded by the next heading', () => {
        const section = extractSection(body, 3, ['Besoins fonctionnels']);
        expect(section).toContain('**Optimiser**');
        expect(section).not.toContain('Utilisateurs');
        expect(section).not.toContain('Enjeux scientifiques');
    });

    it('extracts a level-2 section including its nested level-3 subsections', () => {
        const section = extractSection(body, 2, ['Enjeux scientifiques et techniques']);
        expect(section).toContain('Premier enjeu');
        expect(section).toContain('Second enjeu');
        expect(section).not.toContain('Matériel');
    });

    it('matches any of the provided locale variants', () => {
        expect(extractSection(body, 3, ['Functional Requirements', 'Besoins fonctionnels'])).not.toBeNull();
    });

    it('returns null when the heading is absent', () => {
        expect(extractSection(body, 2, ['Section inexistante'])).toBeNull();
    });
});

describe('extractRQGlosses', () => {
    it('extracts the parenthetical gloss authors wrote next to a code', () => {
        const text = 'RQ associées : RQ_D6 (évolution des modèles), RQ_E2 (modularisation)';
        const glosses = extractRQGlosses(text);
        expect(glosses.get('RQ_D6')).toBe('évolution des modèles');
        expect(glosses.get('RQ_E2')).toBe('modularisation');
    });

    it('keeps the first gloss when the same code is glossed more than once', () => {
        const text = 'RQ_D2 (first gloss) ... later RQ_D2 (second gloss)';
        expect(extractRQGlosses(text).get('RQ_D2')).toBe('first gloss');
    });

    it('returns an empty map when no code is glossed', () => {
        expect(extractRQGlosses('no gloss here').size).toBe(0);
    });

    it('extracts the gloss when the code is wrapped in backticks (thesis "Associated RQs" style)', () => {
        const text =
            '**Associated RQs:** `RQ_D7` (CRUD-like interface for simulation models), `RQ_D9` (CRUD-like interface for AI models)';
        const glosses = extractRQGlosses(text);
        expect(glosses.get('RQ_D7')).toBe('CRUD-like interface for simulation models');
        expect(glosses.get('RQ_D9')).toBe('CRUD-like interface for AI models');
    });
});

describe('themeOf', () => {
    it('derives the taxonomy category letter from a code', () => {
        expect(themeOf('RQ_D2')).toBe('D');
        expect(themeOf('RQ_I3')).toBe('I');
        expect(themeOf('RQ_T4')).toBe('T');
    });

    it('returns null for a malformed or unknown-category code', () => {
        expect(themeOf('RQ_Z9')).toBeNull();
        expect(themeOf('not-a-code')).toBeNull();
    });
});

describe('sortRQCodes', () => {
    it('orders codes by taxonomy category then by number', () => {
        expect(sortRQCodes(['RQ_I3', 'RQ_D6', 'RQ_D2', 'RQ_T4'])).toEqual([
            'RQ_D2',
            'RQ_D6',
            'RQ_I3',
            'RQ_T4',
        ]);
    });

    it('does not mutate the input array', () => {
        const input = ['RQ_T4', 'RQ_D2'];
        sortRQCodes(input);
        expect(input).toEqual(['RQ_T4', 'RQ_D2']);
    });

    it('returns an empty array for no codes', () => {
        expect(sortRQCodes([])).toEqual([]);
    });
});

describe('getPortfolioGraph', () => {
    it('returns an empty graph when the content collections are empty (stubbed in tests)', async () => {
        const graph = await getPortfolioGraph('en');
        expect(graph).toEqual({
            useCases: [],
            challenges: [],
            theses: [],
            challengeToThesis: [],
        });
    });
});
