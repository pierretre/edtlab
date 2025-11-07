export interface PressRelease {
    title: string;
    date: Date;
    description: string;
    url?: string;
    lang: 'en' | 'fr';
    photo?: string;
    tags?: string[];
    template?: string;
}