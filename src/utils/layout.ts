import PageLayout from "../layouts/PageLayout.astro";
import ProjectLayout from "../layouts/ProjectLayout.astro";

/**
 * Get the layout file name based on the content type
 * @param type - The content type (e.g., 'project', 'news')
 * @returns The layout file name
 */
export function getLayoutFromType(type: string): Function {
    switch (type) {
        case 'project':
            return ProjectLayout
        default:
            return PageLayout;
    }
}