export interface JobOffer {
    title: string;
    type: 'postdoc' | 'phd' | 'engineer' | 'intern';
    location: string;
    expectedStartDate: string;
    filled: boolean;
    publishedDate: Date;
    description: string;
    requirements: string[];
    contacts?: string[];
    lang: 'en' | 'fr';
    template?: string;
    tags?: string[];
}