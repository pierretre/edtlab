export interface JobOffer {
    title: string;
    type: 'PostDoc' | 'PhD' | 'Engineer' | 'Intern' | 'Others';
    location: string;
    expectedStartDate: string;
    filled: boolean;
    publishedDate: Date;
    description: string;
    requirements: string[];
    contacts?: string[];
    template?: string;
    tags?: string[];
    references?: string[];
    partner?: string;
    externalUrl?: string;
}