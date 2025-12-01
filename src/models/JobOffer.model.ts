export interface JobOffer {
    title: string;
    type: 'postdoc' | 'phd' | 'engineer' | 'intern';
    location: string;
    deadline: Date;
    publishedDate: Date;
    description: string;
    requirements: string[];
    lang: 'en' | 'fr';
    template?: string;
    tags?: string[];
}