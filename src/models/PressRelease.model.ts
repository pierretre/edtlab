export interface PressRelease {
    title: string;
    date: Date;
    description: string;
    url?: string;
    project?: 'PC1' | 'PC2' | 'PC3' | 'PC4' | 'PC5' | 'General';
    lang: 'en' | 'fr';
    photo: string;
    tags: string[];
    template?: string;
}