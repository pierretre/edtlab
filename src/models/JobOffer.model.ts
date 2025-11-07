export interface JobOffer {
    title: string;
    project: 'PC1' | 'PC2' | 'PC3' | 'PC4' | 'PC5' | 'General';
    type: 'postdoc' | 'phd' | 'engineer' | 'intern';
    location: string;
    deadline: Date;
    publishedDate: Date;
    description: string;
    requirements: string[];
    lang: 'en' | 'fr';
    template?: string;
}