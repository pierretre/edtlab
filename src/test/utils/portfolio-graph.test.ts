import { describe, it, expect } from 'vitest';
import {
    extractRQCodes,
    extractSection,
    splitH3Subsections,
    parseFunctionalNeeds,
    parseChallenges,
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

describe('splitH3Subsections', () => {
    it('splits a section into its titled subsections', () => {
        const section = [
            '### First',
            'Body of first.',
            '',
            '### Second',
            'Body of second.',
        ].join('\n');

        const items = splitH3Subsections(section);
        expect(items).toHaveLength(2);
        expect(items[0]).toEqual({ title: 'First', body: 'Body of first.' });
        expect(items[1]).toEqual({ title: 'Second', body: 'Body of second.' });
    });

    it('returns an empty array when there are no subsections', () => {
        expect(splitH3Subsections('just some text, no heading')).toEqual([]);
    });
});

describe('parseFunctionalNeeds', () => {
    it('parses verb, actor, need and metric from a real UC bullet (French)', () => {
        const section =
            "- **Prédire + Optimiser** · *Un décideur logistique* veut simuler des trajectoires de transition de flotte 2030-2050. **Métrique :** différents scénarios comparés sur l'horizon 10-25 ans.";
        const [need] = parseFunctionalNeeds(section, 'uc18');
        expect(need).toMatchObject({
            useCaseId: 'uc18',
            verb: 'Prédire + Optimiser',
            actor: 'Un décideur logistique',
        });
        expect(need.need).toContain('simuler des trajectoires');
        expect(need.metric).toContain("différents scénarios comparés");
    });

    it('parses an English bullet using the "Metric:" label', () => {
        const section =
            '- **Predict** · *A developer* wants to replay temperature profiles via the simulator. **Metric:** 100% reproducibility, 1-hour scenario replayed in < 1 s.';
        const [need] = parseFunctionalNeeds(section, 'uc00');
        expect(need.verb).toBe('Predict');
        expect(need.actor).toBe('A developer');
        expect(need.metric).toContain('100% reproducibility');
    });

    it('ignores bullets that do not follow the verb/actor convention', () => {
        const section = '- [Some link](https://example.com) - not a need bullet';
        expect(parseFunctionalNeeds(section, 'uc00')).toEqual([]);
    });
});

describe('parseChallenges', () => {
    it('extracts title, cleaned description and RQ codes per subsection', () => {
        const section = [
            '### Génération automatisée de scénarios',
            '',
            "Défi central du UC : produire des scénarios réalistes.",
            '',
            'RQ associées : RQ_D6 (évolution des modèles), RQ_E2 (modularisation)',
        ].join('\n');

        const [challenge] = parseChallenges(section, 'uc18');
        expect(challenge.useCaseId).toBe('uc18');
        expect(challenge.title).toBe('Génération automatisée de scénarios');
        expect(challenge.rqCodes).toEqual(['RQ_D6', 'RQ_E2']);
        expect(challenge.description).not.toContain('RQ associées');
        expect(challenge.description).toContain('produire des scénarios réalistes');
    });

    it('returns an empty rqCodes array when a challenge has no annotated RQ', () => {
        const section = ['### Un enjeu sans RQ', '', 'Texte libre sans annotation.'].join('\n');
        const [challenge] = parseChallenges(section, 'uc07');
        expect(challenge.rqCodes).toEqual([]);
    });
});

describe('getPortfolioGraph', () => {
    it('returns an empty graph when the content collections are empty (stubbed in tests)', async () => {
        const graph = await getPortfolioGraph('en');
        expect(graph).toEqual({
            useCases: [],
            needs: [],
            challenges: [],
            theses: [],
            challengeToThesis: [],
        });
    });
});
