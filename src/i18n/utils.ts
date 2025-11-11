import { ui, defaultLang, type UIKey } from './ui';

export function getLangFromUrl(url: URL) {
    const [, lang] = url.pathname.split('/');
    if (lang in ui) return lang as keyof typeof ui;
    return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
    return function t(key: UIKey) {
        return ui[lang][key] || ui[defaultLang][key];
    }
}

export function getRouteFromUrl(url: URL): string | undefined {
    const pathname = new URL(url).pathname;
    const parts = pathname.split('/');
    const lang = parts[1];

    if (lang in ui) {
        return parts.slice(2).join('/');
    }
    return pathname.slice(1);
}

export function translatePath(lang: keyof typeof ui, path: string = '') {
    return `/${lang}/${path}`;
}

export function getAlternateLanguage(currentLang: keyof typeof ui): keyof typeof ui {
    return currentLang === 'en' ? 'fr' : 'en';
}

export function getLocalizedUrl(lang: keyof typeof ui, url: string): string {
    const cleanUrl = url.replace(/^\/[a-z]{2}\//, '/').replace(/^\//, '');
    return `/${lang}/${cleanUrl}`;
}

// Re-export link utilities for convenience
export { linkHelpers, getContentLink, getPageLink, getLocalizedLink, getAlternateLink } from './links';