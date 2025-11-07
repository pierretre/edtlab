export interface Event {
    title: string,
    date: Date,
    type: 'conference' | 'workshop' | 'seminar',
    location?: string,
    description: string,
    url?: string,
    lang: "en" | "fr",
    photo?: string,
    template?: string,
}
