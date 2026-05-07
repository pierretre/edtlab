import type { CollectionEntry } from "astro:content";

export type Lang = 'en' | 'fr';
export type NewsType = 'event' | 'press-release' | 'platform-update';

export interface NewsItem {
    title: string,
    date: Date,
    newsType: NewsType,
    location?: string,
    description: string,
    url?: string,
    lang: Lang,
    photo: string,
    template?: string,
    tags: string[],
    icsPath?: string,
    redirectTo?: CollectionEntry<"news">;
}
