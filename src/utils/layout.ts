import NewsItemLayout from "@layouts/NewsItemLayout.astro";
import JobOfferLayout from "@layouts/JobOfferLayout.astro";
import PageLayout from "@layouts/PageLayout.astro";
import ProjectLayout from "@layouts/ProjectLayout.astro";

/**
 * Get layout component based on template or collection
 * @param collection - The content collection (e.g., 'pages', 'news')
 * @param template 
 * @returns
 */
export function getLayoutFromTemplateOrCollection(collection: string, template?: string) {
    return template
        ? getLayoutFromTemplate(template)
        : getLayoutFromCollection(collection);
}

/**
 * Get layout component based on template
 * @param template - The content template (e.g., 'project', 'news')
 * @returns The layout component
 */
function getLayoutFromTemplate(template: string) {
    switch (template) {
        case 'project-page':
            return ProjectLayout;
        default:
            return PageLayout;
    }
}

/**
 * Get layout component based on collection
 * @param collection - The content collection (e.g., 'pages', 'news')
 * @returns The layout component
 */
function getLayoutFromCollection(collection: string) {
    switch (collection) {
        case 'job-offers':
            return JobOfferLayout;
        case 'news':
            return NewsItemLayout;
        default:
            return PageLayout;
    }
}