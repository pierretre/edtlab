export const languages = {
    en: 'English',
    fr: 'Français',
};

export const defaultLang = 'en';

export const ui = {
    en: {
        'nav.home': 'Home',
        'nav.program': 'Program',
        'nav.projects': 'Projects',
        'nav.production': 'Production',
        'nav.demo-center': 'Demo Center',
        'nav.resources': 'Resources',
        'nav.news': 'News',
        'nav.join-us': 'Join Us',
        'nav.contact': 'Contact',
        'nav.about': 'About',
        'site.title': 'EDT Research Program',
        'site.description': 'Engineering Digital Twins Research Program',
        'lang.switch': 'Switch to French',
        'search.placeholder': 'Search...',
        'toc.title': 'Table of Contents',
        'page.not-found': 'Page not found',
        'page.back-home': 'Back to home',
    },
    fr: {
        'nav.home': 'Accueil',
        'nav.program': 'Programme',
        'nav.projects': 'Projets',
        'nav.production': 'Production',
        'nav.demo-center': 'Centre de Démo',
        'nav.resources': 'Ressources',
        'nav.news': 'Actualités',
        'nav.join-us': 'Nous Rejoindre',
        'nav.contact': 'Contact',
        'nav.about': 'À Propos',
        'site.title': 'Programme de Recherche EDT',
        'site.description': 'Programme de Recherche Jumeaux Numériques d\'Ingénierie',
        'lang.switch': 'Passer à l\'anglais',
        'search.placeholder': 'Rechercher...',
        'toc.title': 'Table des Matières',
        'page.not-found': 'Page non trouvée',
        'page.back-home': 'Retour à l\'accueil',
    },
} as const;

export type UIKey = keyof typeof ui[typeof defaultLang];