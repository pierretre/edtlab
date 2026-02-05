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
        return '<figure class="my-8 border-2 border-primary-200 rounded-lg p-2 bg-primary-50/30">' +
            '<div class="relative">' +
            '<img src="' + obj.src + '" alt="' + obj.alt + '" class="w-full h-auto rounded-lg" />' +
            '<span class="absolute top-2 right-2 px-2 py-1 bg-primary-600 text-white text-xs font-medium rounded shadow-lg">Custom Image Component</span>' +
            '</div>' +
            (obj.caption ? '<figcaption class="mt-2 text-sm text-gray-600 italic text-center">' + obj.caption + '</figcaption>' : '') +
            '</figure>';
    }
});

/**
 * Badge Component
 * Usage in markdown: ::badge{text="New Feature" variant="primary"}
 */
CMS.registerEditorComponent({
    id: 'badge',
    label: 'Badge',
    fields: [
        { name: 'text', label: 'Badge Text', widget: 'string' },
        {
            name: 'variant',
            label: 'Variant',
            widget: 'select',
            options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error'],
            default: 'primary'
        }
    ],
    pattern: /::badge\{text="([^"]+)"\s+variant="([^"]+)"\}/,
    fromBlock: function (match) {
        return { text: match[1], variant: match[2] };
    },
    toBlock: function (obj) {
        return '::badge{text="' + obj.text + '" variant="' + obj.variant + '"}';
    },
    toPreview: function (obj) {
        var variantClasses = {
            'primary': 'bg-primary-600 text-white border-primary-700',
            'secondary': 'bg-secondary-600 text-white border-secondary-700',
            'tertiary': 'bg-tertiary-600 text-white border-tertiary-700',
            'success': 'bg-green-600 text-white border-green-700',
            'warning': 'bg-yellow-600 text-white border-yellow-700',
            'error': 'bg-red-600 text-white border-red-700'
        };
        var classes = variantClasses[obj.variant] || variantClasses.primary;

        return '<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border-2 ' + classes + ' relative">' +
            obj.text +
            '<span class="absolute -top-2 -right-2 w-4 h-4 bg-primary-600 rounded-full border-2 border-white" title="Custom Badge Component"></span>' +
            '</span>';
    }
});

/**
 * Callout/Alert Component
 * Usage: ::callout{type="info" title="Important"}
 */
CMS.registerEditorComponent({
    id: 'callout',
    label: 'Callout Box',
    fields: [
        {
            name: 'type',
            label: 'Type',
            widget: 'select',
            options: ['info', 'warning', 'success', 'error'],
            default: 'info'
        },
        { name: 'title', label: 'Title', widget: 'string', required: false },
        { name: 'content', label: 'Content', widget: 'text' }
    ],
    pattern: /::callout\{type="([^"]+)"(?:\s+title="([^"]+)")?\}\n([\s\S]*?)\n::/,
    fromBlock: function (match) {
        return { type: match[1], title: match[2], content: match[3] };
    },
    toBlock: function (obj) {
        var block = '::callout{type="' + obj.type + '"';
        if (obj.title) block += ' title="' + obj.title + '"';
        block += '}\n' + obj.content + '\n::';
        return block;
    },
    toPreview: function (obj) {
        var typeConfig = {
            'info': {
                bg: 'bg-primary-50',
                border: 'border-primary-600',
                text: 'text-primary-700',
                icon: '&#9432;' // ℹ
            },
            'warning': {
                bg: 'bg-yellow-50',
                border: 'border-yellow-600',
                text: 'text-yellow-700',
                icon: '&#9888;' // ⚠
            },
            'success': {
                bg: 'bg-green-50',
                border: 'border-green-600',
                text: 'text-green-700',
                icon: '&#10004;' // ✓
            },
            'error': {
                bg: 'bg-red-50',
                border: 'border-red-600',
                text: 'text-red-700',
                icon: '&#10006;' // ✗
            }
        };
        var config = typeConfig[obj.type] || typeConfig.info;

        return '<div class="my-6 p-4 rounded-lg border-l-4 ' + config.bg + ' ' + config.border + ' relative">' +
            '<div class="absolute -top-3 -right-3 px-2 py-1 bg-primary-600 text-white text-xs font-medium rounded shadow-lg">Callout Component</div>' +
            '<div class="flex items-start gap-3">' +
            '<span class="text-2xl ' + config.text + '">' + config.icon + '</span>' +
            '<div class="flex-1">' +
            (obj.title ? '<h4 class="font-semibold mb-2 ' + config.text + '">' + obj.title + '</h4>' : '') +
            '<div class="' + config.text + '">' + obj.content + '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
    }
});

/**
 * Button Component
 * Usage: ::button{text="Learn More" href="/about" variant="primary"}
 */
CMS.registerEditorComponent({
    id: 'button',
    label: 'Button',
    fields: [
        { name: 'text', label: 'Button Text', widget: 'string' },
        { name: 'href', label: 'Link URL', widget: 'string' },
        {
            name: 'variant',
            label: 'Variant',
            widget: 'select',
            options: ['primary', 'secondary', 'outline'],
            default: 'primary'
        }
    ],
    pattern: /::button\{text="([^"]+)"\s+href="([^"]+)"\s+variant="([^"]+)"\}/,
    fromBlock: function (match) {
        return { text: match[1], href: match[2], variant: match[3] };
    },
    toBlock: function (obj) {
        return '::button{text="' + obj.text + '" href="' + obj.href + '" variant="' + obj.variant + '"}';
    },
    toPreview: function (obj) {
        var variantClasses = {
            'primary': 'bg-primary-700 text-white hover:bg-primary-800 border-primary-700',
            'secondary': 'bg-secondary-600 text-white hover:bg-secondary-700 border-secondary-600',
            'outline': 'bg-transparent text-primary-600 hover:bg-primary-50 border-primary-600'
        };
        var classes = variantClasses[obj.variant] || variantClasses.primary;

        return '<div class="my-4 inline-block relative">' +
            '<a href="' + obj.href + '" class="inline-flex items-center px-6 py-3 rounded-lg font-medium border-2 transition-colors ' + classes + '">' +
            obj.text +
            '</a>' +
            '<span class="absolute -top-2 -right-2 px-2 py-1 bg-primary-600 text-white text-xs font-medium rounded shadow-lg">Button Component</span>' +
            '</div>';
    }
});

console.log('✅ DecapCMS customizations loaded - Using Tailwind classes');
console.log('✅ Preview templates: pages, news, job-offers, publications');
console.log('✅ Styling from preview.css and global.css');

/**
 * Principal Investigator Component
 * Usage: ::pi{name="John Doe" headline="Professor at University" picture="/path/to/image.jpg"}
 * Content goes here
 * ::
 */
CMS.registerEditorComponent({
    id: 'PrincipalInvestigator',
    label: 'Principal Investigator',
    fields: [
        { name: 'name', label: 'Name', widget: 'string' },
        { name: 'headline', label: 'Headline/Title', widget: 'string' },
        { name: 'picture', label: 'Profile Picture', widget: 'image', required: false },
        { name: 'bio', label: 'Biography', widget: 'text' }
    ],
    pattern: /::pi\{name="([^"]+)"\s+headline="([^"]+)"(?:\s+picture="([^"]+)")?\}\n([\s\S]*?)\n::/,
    fromBlock: function (match) {
        return {
            name: match[1],
            headline: match[2],
            picture: match[3] || '',
            bio: match[4]
        };
    },
    toBlock: function (obj) {
        var block = '::pi{name="' + obj.name + '" headline="' + obj.headline + '"';
        if (obj.picture) {
            block += ' picture="' + obj.picture + '"';
        }
        block += '}\n' + obj.bio + '\n::';
        return block;
    },
    toPreview: function (obj, getAsset) {
        var pictureUrl = obj.picture;

        // If picture is provided, try to get the asset URL
        if (pictureUrl && getAsset) {
            try {
                pictureUrl = getAsset(obj.picture).toString();
            } catch (e) {
                // Fallback to original URL if getAsset fails
            }
        }

        return '<div class="card bg-white shadow-sm border flex flex-col sm:flex-row gap-6 items-start mb-6 relative">' +
            '<span class="absolute -top-3 -right-3 px-2 py-1 bg-primary-600 text-white text-xs font-medium rounded shadow-lg z-10">Principal Investigator</span>' +
            (pictureUrl ?
                '<img src="' + pictureUrl + '" alt="' + obj.name + '" class="w-32 h-32 bg-gray-200 rounded-full flex-shrink-0 object-cover border-4 border-primary-100" />'
                :
                '<div class="w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex-shrink-0 flex items-center justify-center border-4 border-primary-300">' +
                '<span class="text-4xl font-bold text-primary-600">' + obj.name.charAt(0) + '</span>' +
                '</div>'
            ) +
            '<div class="flex-1 space-y-3">' +
            '<h3 class="text-xl font-medium text-gray-800">' + obj.name + '</h3>' +
            '<p class="text-gray-700 font-medium">' + obj.headline + '</p>' +
            '<p class="text-gray-600 leading-relaxed">' + obj.bio + '</p>' +
            '</div>' +
            '</div>';
    }
});
