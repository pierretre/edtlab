import { describe, it, expect } from 'vitest';
import { findSection, replaceFrontmatterField, verifyToken } from '../utils/uc-file-utils';

const SAMPLE_MD = `---
id: "UC-TEST"
title: "Test UC"
previewToken: "test-token-123"
status: draft
domain: energy
maturity: poc
---

This is the intro paragraph.

---

## Caractérisation du Jumeau Numérique

### MC1 — Système étudié

Description du système.

### MC2 — Composants d'action

*A compléter*

### MC3 — Capteurs

Liste des capteurs.

---

## Données

*A compléter*

---

## Références

- Ref 1
`;

describe('verifyToken', () => {
    it('returns true for correct token', () => {
        expect(verifyToken(SAMPLE_MD, 'test-token-123')).toBe(true);
    });
    it('returns false for wrong token', () => {
        expect(verifyToken(SAMPLE_MD, 'wrong')).toBe(false);
    });
    it('returns false if no token in file', () => {
        expect(verifyToken('---\ntitle: test\n---', 'any')).toBe(false);
    });
});

describe('findSection', () => {
    it('finds intro section', () => {
        const result = findSection(SAMPLE_MD, 'intro');
        expect(result).not.toBeNull();
        expect(result!.content).toBe('This is the intro paragraph.');
    });

    it('finds MC section', () => {
        const result = findSection(SAMPLE_MD, 'MC1');
        expect(result).not.toBeNull();
        expect(result!.content).toBe('Description du système.');
    });

    it('finds MC section with incomplete content', () => {
        const result = findSection(SAMPLE_MD, 'MC2');
        expect(result).not.toBeNull();
        expect(result!.content).toBe('*A compléter*');
    });

    it('finds h2 section', () => {
        const result = findSection(SAMPLE_MD, 'Données');
        expect(result).not.toBeNull();
        expect(result!.content).toBe('*A compléter*');
    });

    it('finds Références section', () => {
        const result = findSection(SAMPLE_MD, 'Références');
        expect(result).not.toBeNull();
        expect(result!.content).toContain('Ref 1');
    });

    it('returns null for unknown section', () => {
        expect(findSection(SAMPLE_MD, 'MC99')).toBeNull();
    });
});

describe('replaceFrontmatterField', () => {
    it('replaces domain', () => {
        const result = replaceFrontmatterField(SAMPLE_MD, 'domain', 'maritime');
        expect(result).toContain('domain: maritime');
        expect(result).not.toContain('domain: energy');
    });

    it('replaces maturity', () => {
        const result = replaceFrontmatterField(SAMPLE_MD, 'maturity', 'operational');
        expect(result).toContain('maturity: operational');
    });
});
