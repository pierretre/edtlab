/**
 * DecapCMS Customizations for EDT Lab
 * Renders preview templates that match the exact website layouts
 * Uses Tailwind classes and preview.css styling (no inline styles)
 */

/**
 * Format date helper
 */
function formatDate(dateString, lang) {
    if (!dateString) return '';
    var date = new Date(dateString);
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', options);
}

/**
 * Base container matching PageLayout structure
 */
function createPageContainer(content) {
    return h('div', { className: 'container mx-auto px-8 lg:px-4 max-w-6xl mb-16' },
        h('div', { className: 'flex flex-col lg:flex-row gap-8' },
            h('main', { className: 'flex-1 min-w-0' },
                h('article', { className: 'prose prose-lg max-w-none' }, content)
            )
        )
    );
}

/**
 * Pages Preview Template
 * Matches PageLayout.astro structure
 */
var PagesPreview = createClass({
    render: function () {

        var entry = this.props.entry;
        var widgetFor = this.props.widgetFor;
        var data = entry.get('data');
        console.log(data.title,
            data.href,
            data.lang,
            data.description,
            data.toc,
            data.color,
            data.template,
            data.illustration,
            data.projectId)

        var content = [
            h('h1', { className: 'text-4xl font-bold text-gray-900 mb-6' }, data.title),
            data.description && h('p', { className: 'text-lg text-gray-700 mb-6' }, data.description),
            h('div', {}, widgetFor('body'))
        ];

        return createPageContainer(content);
    }
});

/**
 * News Preview Template
 * Matches NewsItemLayout.astro structure
 */
var NewsPreview = createClass({
    render: function () {
        var entry = this.props.entry;
        var widgetFor = this.props.widgetFor;
        var getAsset = this.props.getAsset;
        var data = entry.get('data').toJS();
        console.log(data.title,
            data.href,
            data.lang,
            data.description,
            data.toc,
            data.color,
            data.template,
            data.illustration,
            data.projectId)

        var coverImage = data.coverImage ? getAsset(data.coverImage) : null;
        var lang = data.lang || 'en';
        var formattedDate = formatDate(data.pubDate, lang);

        var content = [
            // Back link
            h('div', { className: 'mb-6' },
                h('a', {
                    href: '#',
                    className: 'inline-flex items-center text-primary-600 hover:text-primary-800 text-sm font-medium'
                },
                    h('svg', {
                        className: 'w-4 h-4 mr-2',
                        fill: 'none',
                        stroke: 'currentColor',
                        viewBox: '0 0 24 24'
                    },
                        h('path', {
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round',
                            strokeWidth: '2',
                            d: 'M15 19l-7-7 7-7'
                        })
                    ),
                    lang === 'fr' ? 'Retour aux actualités' : 'Back to News'
                )
            ),

            // Header
            h('header', { className: 'mb-8' },
                // Badges
                h('div', { className: 'flex flex-wrap gap-2 mb-4' },
                    h('span', {
                        className: 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-600 text-white'
                    }, data.type || 'news'),
                    data.tags && data.tags.map(function (tag, i) {
                        return h('span', {
                            key: i,
                            className: 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800'
                        }, tag);
                    })
                ),

                // Title
                h('h1', { className: 'text-4xl font-bold text-gray-900 mb-4' }, data.title),

                // Meta box
                h('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-gray-50 rounded-lg border' },
                    h('div', { className: 'flex items-center text-gray-700' },
                        h('svg', {
                            className: 'w-5 h-5 mr-3 text-gray-500',
                            fill: 'none',
                            stroke: 'currentColor',
                            viewBox: '0 0 24 24'
                        },
                            h('path', {
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeWidth: '2',
                                d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                            })
                        ),
                        h('div', {},
                            h('span', { className: 'text-sm font-medium text-gray-500' },
                                lang === 'fr' ? 'Date' : 'Date'
                            ),
                            h('p', { className: 'font-medium' }, formattedDate)
                        )
                    )
                )
            ),

            // Cover image
            coverImage && h('img', {
                src: coverImage.toString(),
                alt: data.title,
                className: 'w-full h-auto rounded-lg mb-8'
            }),

            // Content
            h('div', { className: 'prose prose-lg max-w-none' }, widgetFor('body'))
        ];

        return createPageContainer(content);
    }
});

/**
 * Job Offers Preview Template
 * Matches JobOfferLayout.astro structure
 */
var JobOffersPreview = createClass({
    render: function () {
        var entry = this.props.entry;
        var widgetFor = this.props.widgetFor;
        var data = entry.get('data').toJS();

        var lang = data.lang || 'en';
        var formattedDate = formatDate(data.pubDate, lang);
        var formattedDeadline = data.deadline ? formatDate(data.deadline, lang) : null;

        // Badge class based on type
        var typeBadgeClass = {
            'phd': 'bg-primary-600 text-white',
            'postdoc': 'bg-secondary-600 text-white',
            'engineer': 'bg-tertiary-600 text-white',
            'intern': 'bg-gray-600 text-white'
        };
        var badgeClass = typeBadgeClass[data.type] || typeBadgeClass.phd;

        // Status badge class
        var statusBadgeClass = {
            'open': 'bg-green-600 text-white',
            'filled': 'bg-gray-600 text-white',
            'closed': 'bg-red-600 text-white'
        };
        var statusClass = statusBadgeClass[data.status] || statusBadgeClass.open;

        var content = [
            // Back link
            h('div', { className: 'mb-6' },
                h('a', {
                    href: '#',
                    className: 'inline-flex items-center text-primary-600 hover:text-primary-800 text-sm font-medium'
                },
                    h('svg', {
                        className: 'w-4 h-4 mr-2',
                        fill: 'none',
                        stroke: 'currentColor',
                        viewBox: '0 0 24 24'
                    },
                        h('path', {
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round',
                            strokeWidth: '2',
                            d: 'M15 19l-7-7 7-7'
                        })
                    ),
                    lang === 'fr' ? 'Retour aux offres' : 'Back to Careers'
                )
            ),

            // Header
            h('header', { className: 'mb-8' },
                // Badges
                h('div', { className: 'flex flex-wrap gap-2 mb-4' },
                    h('span', {
                        className: 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ' + badgeClass
                    }, data.type || 'position'),
                    h('span', {
                        className: 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ' + statusClass
                    }, data.status || 'open')
                ),

                // Title
                h('h1', { className: 'text-4xl font-bold text-gray-900 mb-4' }, data.title),

                // Meta box
                h('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-gray-50 rounded-lg border' },
                    data.location && h('div', { className: 'flex items-center text-gray-700' },
                        h('svg', {
                            className: 'w-5 h-5 mr-3 text-gray-500',
                            fill: 'none',
                            stroke: 'currentColor',
                            viewBox: '0 0 24 24'
                        },
                            h('path', {
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeWidth: '2',
                                d: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                            }),
                            h('path', {
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeWidth: '2',
                                d: 'M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                            })
                        ),
                        h('div', {},
                            h('span', { className: 'text-sm font-medium text-gray-500' },
                                lang === 'fr' ? 'Lieu' : 'Location'
                            ),
                            h('p', { className: 'font-medium' }, data.location)
                        )
                    ),
                    data.project && h('div', { className: 'flex items-center text-gray-700' },
                        h('div', {},
                            h('span', { className: 'text-sm font-medium text-gray-500' },
                                lang === 'fr' ? 'Projet' : 'Project'
                            ),
                            h('p', { className: 'font-medium' }, data.project)
                        )
                    )
                )
            ),

            // Deadline warning
            formattedDeadline && h('div', {
                className: 'p-4 bg-primary-50 border-l-4 border-primary-600 rounded mb-6'
            },
                h('strong', { className: 'font-semibold text-primary-700' },
                    lang === 'fr' ? 'Date limite : ' : 'Application Deadline: '
                ),
                h('span', { className: 'text-primary-700' }, formattedDeadline)
            ),

            // Description
            data.description && h('p', { className: 'text-lg text-gray-700 mb-6 leading-relaxed' }, data.description),

            // Content
            h('div', { className: 'prose prose-lg max-w-none' }, widgetFor('body'))
        ];

        return createPageContainer(content);
    }
});

/**
 * Publications Preview Template
 * Matches standard PageLayout with publication metadata
 */
var PublicationsPreview = createClass({
    render: function () {
        var entry = this.props.entry;
        var widgetFor = this.props.widgetFor;
        var data = entry.get('data').toJS();

        var pubDate = data.pubDate ? new Date(data.pubDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        }) : '';

        var authors = data.authors ? data.authors.join(', ') : '';

        var content = [
            h('h1', { className: 'text-4xl font-bold text-gray-900 mb-4' }, data.title),

            authors && h('p', { className: 'italic text-secondary-700 mb-2' }, authors),

            h('div', { className: 'flex flex-wrap gap-2 items-center mb-6' },
                h('span', {
                    className: 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-600 text-white'
                }, data.type || 'publication'),
                data.venue && h('span', { className: 'text-gray-600' }, ' • ' + data.venue),
                h('span', { className: 'text-gray-600' }, ' • ' + pubDate)
            ),

            data.description && h('p', { className: 'italic text-gray-700 mb-6 leading-relaxed' }, data.description),

            h('div', { className: 'mb-6 space-y-2' },
                data.doi && h('p', {},
                    h('strong', { className: 'font-semibold' }, 'DOI: '),
                    h('a', {
                        href: 'https://doi.org/' + data.doi,
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        className: 'text-primary-600 hover:text-primary-800 underline'
                    }, data.doi)
                ),
                data.url && h('p', {},
                    h('a', {
                        href: data.url,
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        className: 'text-primary-600 hover:text-primary-800 font-medium'
                    }, 'View Publication →')
                ),
                data.pdf && h('p', {},
                    h('a', {
                        href: data.pdf,
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        className: 'text-primary-600 hover:text-primary-800 font-medium'
                    }, 'Download PDF →')
                )
            ),

            data.tags && data.tags.length > 0 && h('div', { className: 'mb-6' },
                h('strong', { className: 'font-semibold' }, 'Tags: '),
                data.tags.map(function (tag, i) {
                    return h('span', {
                        key: i,
                        className: 'inline-block px-2 py-1 mr-2 bg-gray-100 text-gray-700 rounded text-sm'
                    }, tag);
                })
            ),

            widgetFor('body') && h('div', { className: 'prose prose-lg max-w-none' }, widgetFor('body'))
        ];

        return createPageContainer(content);
    }
});

/**
 * Register all preview templates
 */
CMS.registerPreviewTemplate('pages', PagesPreview);
CMS.registerPreviewTemplate('news', NewsPreview);
CMS.registerPreviewTemplate('job-offers', JobOffersPreview);
CMS.registerPreviewTemplate('publications', PublicationsPreview);

/**
 * Custom image editor component
 */
CMS.registerEditorComponent({
    id: 'image',
    label: 'Image',
    fields: [
        { name: 'src', label: 'Image', widget: 'image' },
        { name: 'alt', label: 'Alt Text', widget: 'string' },
        { name: 'caption', label: 'Caption', widget: 'string', required: false }
    ],
    pattern: /!\[([^\]]*)\]\(([^)]+)\)(?:\n\*([^*]+)\*)?/,
    fromBlock: function (match) {
        return { alt: match[1], src: match[2], caption: match[3] };
    },
    toBlock: function (obj) {
        var markdown = '![' + obj.alt + '](' + obj.src + ')';
        if (obj.caption) markdown += '\n*' + obj.caption + '*';
        return markdown;
    },
    toPreview: function (obj) {
        return '<figure class="my-8"><img src="' + obj.src + '" alt="' + obj.alt + '" class="w-full h-auto rounded-lg" />' +
            (obj.caption ? '<figcaption class="mt-2 text-sm text-gray-600 italic text-center">' + obj.caption + '</figcaption>' : '') +
            '</figure>';
    }
});

console.log('✅ DecapCMS customizations loaded - Using Tailwind classes');
console.log('✅ Preview templates: pages, news, job-offers, publications');
console.log('✅ Styling from preview.css and global.css');
