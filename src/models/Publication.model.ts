export interface Publication {
    title: string;
    authors: string[];
    year: number;
    venue?: string;
    doi?: string;
    url?: string;
    type: 'journal' | 'conference' | 'book' | 'report' | 'white-paper' | 'preprint' | 'thesis' | 'workshop' | 'slidedeck';
    tags?: string[];
    origin?: 'edt' | 'external' | 'hal';
}