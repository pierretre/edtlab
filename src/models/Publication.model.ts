export interface Publication {
    title: string;
    authors: string[];
    year: number;
    venue?: string;
    doi?: string;
    url?: string;
    type: 'journal' | 'conference' | 'book' | 'report';
    project: 'PC1' | 'PC2' | 'PC3' | 'PC4' | 'PC5';
    lang: 'en' | 'fr';
}