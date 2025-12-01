export interface Publication {
    title: string;
    authors: string[];
    year: number;
    venue?: string;
    doi?: string;
    url?: string;
    type: 'journal' | 'conference' | 'book' | 'report';
    tags?: string[];
}