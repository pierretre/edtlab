import NewsItemLayout from "@layouts/NewsItemLayout.astro";
import JobOfferLayout from "@layouts/JobOfferLayout.astro";
import PageLayout from "@layouts/PageLayout.astro";
import ProjectLayout from "@layouts/ProjectLayout.astro";
import UseCaseLayout from "@layouts/UseCaseLayout.astro";
import ResearchStudyLayout from "@layouts/ResearchStudyLayout.astro";
import PortfolioGraphLayout from "@layouts/PortfolioGraphLayout.astro";

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
        case 'portfolio-graph':
            return PortfolioGraphLayout;
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
        case 'use-cases':
            return UseCaseLayout;
        case 'news':
            return NewsItemLayout;
        case 'research-studies':
            return ResearchStudyLayout;
        default:
            return PageLayout;
    }
}