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

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

var partnersDataCache = null;
var partnersDataPromise = null;

function initPartnersData() {
    if (partnersDataPromise) return;
    partnersDataPromise = fetch('/src/content/partners.json')
        .then(function (response) {
            if (!response.ok) return {};
            return response.json();
        })
        .then(function (data) {
            partnersDataCache = data || {};
            return partnersDataCache;
        })
        .catch(function () {
            partnersDataCache = {};
            return partnersDataCache;
        });
}

initPartnersData();

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
 * News Preview Template
 * Matches NewsItemLayout.astro structure
 */
var NewsPreview = createClass({
    render: function () {
        var entry = this.props.entry;
        var widgetFor = this.props.widgetFor;
        var getAsset = this.props.getAsset;
        var data = entry.get('data').toJS();

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
 * Register all preview templates
 */
// CMS.registerPreviewTemplate('pages', PagesPreview);
CMS.registerPreviewTemplate('news', NewsPreview);
CMS.registerPreviewTemplate('job-offers', JobOffersPreview);

/**
 * Principal Investigator Component
 * Usage:
 * <PrincipalInvestigator
 * name="John Doe"
 * headline="Professor at University"
 * picture={avatar}>
 * Content goes here
 * </PrincipalInvestigator>
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
    pattern: /<PrincipalInvestigator\s+name="([^"]+)"\s+headline="([^"]+)"(?:\s+picture=\{([^}]+)\}|\s+picture="([^"]+)")?\s*>\n([\s\S]*?)\n<\/PrincipalInvestigator>/,
    fromBlock: function (match) {
        return {
            name: match[1],
            headline: match[2],
            picture: match[3] || match[4] || '',
            bio: match[5]
        };
    },
    toBlock: function (obj) {
        var block = '<PrincipalInvestigator\nname="' + obj.name + '"\nheadline="' + obj.headline + '"';
        if (obj.picture) {
            var isPath = obj.picture.startsWith('/') || obj.picture.startsWith('./') || obj.picture.startsWith('../');
            block += isPath ? '\npicture="' + obj.picture + '"' : '\npicture={' + obj.picture + '}';
        }
        block += '>\n' + obj.bio + '\n</PrincipalInvestigator>';
        return block;
    },
    toPreview: function (obj, getAsset) {
        var pictureUrl = obj.picture;
        if (pictureUrl && getAsset) {
            try {
                pictureUrl = getAsset(obj.picture).toString();
            } catch (e) {
                // Fallback to original URL if getAsset fails
            }
        }

        return `<div class="card bg-white shadow-sm border flex flex-col sm:flex-row gap-6 items-start mb-6">
            ${pictureUrl ?
                `<img src="${pictureUrl}" alt="${escapeHtml(obj.name)}" class="w-32 h-32 bg-gray-200 rounded-full flex-shrink-0 object-cover" />`
                :
                ''
            }
            <div class="flex-1 space-y-3">
            <h3 class="text-xl font-medium text-gray-800">${escapeHtml(obj.name)}</h3>
            <p class="text-gray-700">${escapeHtml(obj.headline)}</p>
            <p class="text-gray-600">${escapeHtml(obj.bio)}</p>
            </div>
            </div>`;
    }
});

/**
 * Partners Grid Component
 * Usage: 
 */
CMS.registerEditorComponent({
    id: 'PartnersGrid',
    label: 'Partners Grid',
    fields: [
        { name: 'partners', label: 'Partners', widget: 'list' }
    ],
    pattern: /<PartnersGrid\s+partners=\{\[([\s\S]*?)\]\}\s*><\/PartnersGrid>/,
    fromBlock: function (match) {
        return {
            partners: match[1]
        };
    },
    toBlock: function (obj) {
        var block = '<PartnersGrid partners={[' + obj.partners + ']} ></PartnersGrid>';
        return block;
    },
    toPreview: function (obj, getAsset) {
        var partnersValue = obj.partners || [];
        var partnersKeys = Array.isArray(partnersValue)
            ? partnersValue
            : String(partnersValue)
                .split(',')
                .map(function (p) { return p.trim().replace(/^['"]|['"]$/g, ''); })
                .filter(Boolean);

        var partnersData = partnersDataCache || {};
        var partners = partnersKeys.map(function (key) {
            var entry = partnersData[key];
            if (!entry) {
                return { key: key, fullname: key, logo: null };
            }
            return { key: key, fullname: entry.fullname || key, logo: entry.logo || null };
        });

        var cardsHtml = partners.map(function (partner) {
            var logoUrl = partner.logo;
            if (logoUrl && getAsset) {
                try {
                    logoUrl = getAsset(logoUrl).toString();
                } catch (e) {
                    // Fallback to original URL if getAsset fails
                }
            }

            return '<div class="flex-1 flex flex-col items-center group w-full" title="' + escapeHtml(partner.fullname) + '">' +
                (logoUrl
                    ? '<img src="' + logoUrl + '" alt="' + escapeHtml(partner.fullname) + '" class="max-h-12 w-auto max-w-32 h-auto object-contain mx-auto" loading="lazy" />'
                    : '<div class="h-12 w-32 bg-gray-100 border rounded flex items-center justify-center text-xs text-gray-500">' + escapeHtml(partner.key) + '</div>') +
                '</div>';
        }).join('');

        if (!partnersDataCache) {
            initPartnersData();
        }

        return `
        <div class="max-w-7xl px-4 py-8">
            <div class="mx-auto flex flex-row gap-16 justify-items-center flex-wrap">
                ${cardsHtml}
            </div>
        </div>`;
    }
});

CMS.registerEditorComponent({
    id: 'OptimizedFigure',
    label: 'Optimized Figure',
    fields: [
        { name: 'src', label: 'Source', widget: 'image' },
        { name: 'alt', label: 'Alt Text', widget: 'string' },
        { name: 'caption', label: 'Caption', widget: 'string', required: false },
        { name: 'loading', label: 'Loading', widget: 'select', options: ['lazy', 'eager'], default: 'eager' },
        { name: 'maxWidth', label: 'Max Width (px)', widget: 'number', required: false }
    ],
    pattern: /<OptimizedFigure\s+src="([^"]+)"\s+alt="([^"]+)"(?:\s+caption="([^"]+)")?(?:\s+loading="(lazy|eager)")?(?:\s+maxWidth=\{(\d+)\})?\s*\/?>/,
    fromBlock: function (match) {
        return {
            src: match[1],
            alt: match[2],
            caption: match[3] || '',
            loading: match[4] || 'eager',
            maxWidth: match[5] ? parseInt(match[5], 10) : ''
        };
    },
    toBlock: function (obj) {
        var block = '<OptimizedFigure\n  src="' + obj.src + '"\n  alt="' + obj.alt + '"';
        if (obj.caption) {
            block += '\n  caption="' + obj.caption + '"';
        }
        if (obj.loading) {
            block += '\n  loading="' + obj.loading + '"';
        }
        if (obj.maxWidth) {
            block += '\n  maxWidth={' + obj.maxWidth + '}';
        }
        block += '\n/>';
        return block;
    },
    toPreview: function (obj, getAsset) {
        var imageUrl = obj.src;
        if (imageUrl && getAsset) {
            try {
                imageUrl = getAsset(obj.src).toString();
            } catch (e) {
                // Fallback to original URL if getAsset fails
            }
        }

        var resolvedMaxWidth = obj.maxWidth ? obj.maxWidth + 'px' : '100%';

        return `
        <figure class="mb-6" style="max-width: ${resolvedMaxWidth}; margin-left: auto; margin-right: auto;">
            <img src="${imageUrl}" alt="${escapeHtml(obj.alt)}" loading="${obj.loading || 'eager'}" style="display: block; width: 100%; height: auto;" />
            ${obj.caption
                ? `<figcaption class="mt-2 text-sm text-gray-700 dark:text-gray-300 text-center italic">${escapeHtml(obj.caption)}</figcaption>`
                : ''}
        </figure>`;
    }
});

CMS.registerEditorComponent({
    id: 'OutlinedCard',
    label: 'Outlined Card',
    fields: [
        { name: 'label', label: 'Label', widget: 'string' },
        { name: 'title', label: 'Title', widget: 'string' },
        { name: 'description', label: 'Description', widget: 'text' }
    ],
    pattern: /<OutlinedCard\s+label="([^"]+)"\s+title="([^"]+)"\s+description="([^"]+)"\s*\/?>/,
    fromBlock: function (match) {
        return {
            label: match[1],
            title: match[2],
            description: match[3]
        };
    },
    toBlock: function (obj) {
        var block = '<OutlinedCard\n  label="' + obj.label + '"\n  title="' + obj.title + '"\n  description="' + obj.description + '"\n/>';
        return block;
    },
    toPreview: function (obj) {
        return `
        <div class="h-full card bg-white border-2 border-primary-500 rounded-lg p-4 transition-all hover:border-primary-600">
            <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    ${escapeHtml(obj.label)}
                    </div><div class="card-content flex-1">
                    <h3 class="text-base font-semibold text-gray-900 mb-2"> ${escapeHtml(obj.title)} </h3>
                    <p class="text-gray-700 text-sm leading-relaxed"> ${escapeHtml(obj.description)} </p>
                </div>
            </div>
        </div>`;
    }
});

/**
 * Grid Container for Cards
 * Usage: Wrap OutlinedCard components in a grid layout
 * <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
 *   <OutlinedCard ... />
 *   <OutlinedCard ... />
 * </div>
 */
CMS.registerEditorComponent({
    id: 'CardGrid',
    label: 'Card Grid Container',
    fields: [
        {
            name: 'columns',
            label: 'Number of Columns',
            widget: 'select',
            options: ['2', '3', '4'],
            default: '3'
        },
        {
            name: 'cards',
            label: 'Cards',
            widget: 'list',
            fields: [
                { name: 'label', label: 'Label', widget: 'string' },
                { name: 'title', label: 'Title', widget: 'string' },
                { name: 'description', label: 'Description', widget: 'text' }
            ]
        }
    ],
    pattern: /<div class="grid md:grid-cols-(\d+)(?:\s+lg:grid-cols-\d+)?\s+gap-6 my-8">\s*((?:<OutlinedCard[\s\S]*?\/>\s*)*)<\/div>/,
    fromBlock: function (match) {
        var columns = match[1];
        var cardsHtml = match[2];

        // Parse OutlinedCard components from the HTML
        var cardPattern = /<OutlinedCard\s+label="([^"]+)"\s+title="([^"]+)"\s+description="([^"]+)"\s*\/?>/g;
        var cards = [];
        var cardMatch;

        while ((cardMatch = cardPattern.exec(cardsHtml)) !== null) {
            cards.push({
                label: cardMatch[1],
                title: cardMatch[2],
                description: cardMatch[3]
            });
        }

        return {
            columns: columns,
            cards: cards
        };
    },
    toBlock: function (obj) {
        var gridClass = 'grid md:grid-cols-' + (obj.columns || '3') + ' gap-6 my-8';

        var cardsHtml = (obj.cards || []).map(function (card) {
            return '  <OutlinedCard\n    label="' + card.label + '"\n    title="' + card.title + '"\n    description="' + card.description + '"\n  />';
        }).join('\n');

        return '<div class="' + gridClass + '">\n' + cardsHtml + '\n</div>';
    },
    toPreview: function (obj) {
        var columns = obj.columns || '3';
        var gridClass = 'grid md:grid-cols-' + columns + ' gap-6 my-8';

        var cardsHtml = (obj.cards || []).map(function (card) {
            return `
            <div class="h-full card bg-white border-2 border-primary-500 rounded-lg p-4 transition-all hover:border-primary-600">
                <div class="flex items-start gap-3">
                    <div class="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                        ${escapeHtml(card.label)}
                    </div>
                    <div class="card-content flex-1">
                        <h3 class="text-base font-semibold text-gray-900 mb-2">${escapeHtml(card.title)}</h3>
                        <p class="text-gray-700 text-sm leading-relaxed">${escapeHtml(card.description)}</p>
                    </div>
                </div>
            </div>`;
        }).join('');

        return '<div class="' + gridClass + '">' + cardsHtml + '</div>';
    }
});

CMS.registerEditorComponent({
    id: 'PublicationList',
    label: 'Publication List',
    fields: [
        { name: 'lang', label: 'Language', widget: 'select', options: ['en', 'fr'], default: 'en' }
    ],
    pattern: /<PublicationList\s+lang="(en|fr)"\s*\/?>/,
    fromBlock: function (match) {
        return {
            lang: match[1]
        };
    },
    toBlock: function (obj) {
        var block = '<PublicationList\n  lang="' + obj.lang + '"\n/>';
        return block;
    },
    toPreview: function (obj) {
        return '<div class="border border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-600">' +
            '<div class="text-sm uppercase tracking-wide text-gray-400">Publication List</div>' +
            '<div class="mt-2 font-medium">Language: ' + escapeHtml(obj.lang || 'en') + '</div>' +
            '</div>';
    }
});


/**
 * Grid Container for Cards
 * Usage: Wrap OutlinedCard components in a grid layout
 * <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
 *   <OutlinedCard ... />
 *   <OutlinedCard ... />
 * </div>
 */
CMS.registerEditorComponent({
    id: 'CardGrid',
    label: 'Card Grid Container',
    fields: [
        {
            name: 'columns',
            label: 'Number of Columns',
            widget: 'select',
            options: ['2', '3', '4'],
            default: '3'
        },
        {
            name: 'cards',
            label: 'Cards',
            widget: 'list',
            fields: [
                { name: 'label', label: 'Label', widget: 'string' },
                { name: 'title', label: 'Title', widget: 'string' },
                { name: 'description', label: 'Description', widget: 'text' }
            ]
        }
    ],
    pattern: /<div class="grid md:grid-cols-(\d+)(?:\s+lg:grid-cols-\d+)?\s+gap-6 my-8">\s*((?:<OutlinedCard[\s\S]*?\/>\s*)*)<\/div>/,
    fromBlock: function (match) {
        var columns = match[1];
        var cardsHtml = match[2];

        // Parse OutlinedCard components from the HTML
        var cardPattern = /<OutlinedCard\s+label="([^"]+)"\s+title="([^"]+)"\s+description="([^"]+)"\s*\/?>/g;
        var cards = [];
        var cardMatch;

        while ((cardMatch = cardPattern.exec(cardsHtml)) !== null) {
            cards.push({
                label: cardMatch[1],
                title: cardMatch[2],
                description: cardMatch[3]
            });
        }

        return {
            columns: columns,
            cards: cards
        };
    },
    toBlock: function (obj) {
        var gridClass = 'grid md:grid-cols-' + (obj.columns || '3') + ' gap-6 my-8';

        var cardsHtml = (obj.cards || []).map(function (card) {
            return '  <OutlinedCard\n    label="' + card.label + '"\n    title="' + card.title + '"\n    description="' + card.description + '"\n  />';
        }).join('\n');

        return '<div class="' + gridClass + '">\n' + cardsHtml + '\n</div>';
    },
    toPreview: function (obj) {
        var columns = obj.columns || '3';

        // Inline styles for grid to ensure proper rendering in preview
        var gridStyle = 'display: grid; grid-template-columns: repeat(' + columns + ', 1fr); gap: 1.5rem; margin: 2rem 0;';

        var cardsHtml = (obj.cards || []).map(function (card) {
            return `
            <div style="height: 100%; background: white; border: 2px solid #665BA7; border-radius: 0.5rem; padding: 1rem;">
                <div style="display: flex; align-items: flex-start; gap: 0.75rem;">
                    <div style="flex-shrink: 0; width: 3rem; height: 3rem; background: #665BA7; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.25rem;">
                        ${escapeHtml(card.label)}
                    </div>
                    <div style="flex: 1;">
                        <h3 style="font-size: 1rem; font-weight: 600; color: #111827; margin-bottom: 0.5rem;">${escapeHtml(card.title)}</h3>
                        <p style="color: #374151; font-size: 0.875rem; line-height: 1.5;">${escapeHtml(card.description)}</p>
                    </div>
                </div>
            </div>`;
        }).join('');

        return '<div style="' + gridStyle + '">' + cardsHtml + '</div>';
    }
});
