export interface Event {
    title: string,
    date: Date,
    type: 'conference' | 'workshop' | 'seminar',
    location?: string,
    description: string,
    url?: string,
    project?: 'PC1' | 'PC2' | 'PC3' | 'PC4' | 'PC5' | 'General';
    lang: "en" | "fr",
    photo: string,
    template?: string,
    tags: string[],
}
