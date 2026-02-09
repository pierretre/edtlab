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
 * Helper function to check if a date is recent (within 30 days)
 */
function isRecent(dateString) {
    if (!dateString) return false;
    var date = new Date(dateString);
    var now = new Date();
    var timeDiff = now.getTime() - date.getTime();
    var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff >= 0 && daysDiff <= 30;
}

/**
 * Helper function to get badge styling based on tag
 */
function getBadgeClasses(tag) {
    var badgeMap = {
        'PC1': 'bg-blue-bell-200 text-blue-bell-900',
        'PC2': 'bg-blue-bell-200 text-blue-bell-900',
        'PC3': 'bg-blue-bell-200 text-blue-bell-900',
        'PC4': 'bg-hit-pink-200 text-hit-pink-900',
        'PC5': 'bg-marzipan-200 text-marzipan-900',
        'General': 'bg-primary-200 text-primary-900'
    };
    return badgeMap[tag] || 'bg-gray-100 text-gray-800';
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

        var photo = data.photo;
        if (photo && getAsset) {
            try {
                var asset = getAsset(data.photo);
                photo = asset.toString();
            } catch (e) {
                // If getAsset fails, try to construct a proper URL
                if (photo && photo.startsWith('/src/assets/')) {
                    photo = photo.replace('/src/assets/', '/');
                }
            }
        }

        var lang = data.lang || 'en';
        var formattedDate = formatDate(data.date, lang);
        var showRecent = isRecent(data.date);

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
                    // Tags badges
                    data.tags && data.tags.map(function (tag, i) {
                        return h('span', {
                            key: i,
                            className: 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ' + getBadgeClasses(tag)
                        }, tag);
                    }),
                    // Recent badge
                    showRecent && h('span', {
                        className: 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200'
                    }, lang === 'fr' ? 'Récent' : 'Recent')
                ),

                // Title
                h('h1', { className: 'text-4xl font-bold text-gray-900 mb-4' }, data.title),

                // Meta box
                h('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-gray-50 rounded-lg border' },
                    // Location (only for events)
                    data.newsType === 'event' && data.location && h('div', { className: 'flex items-center text-gray-700' },
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
                    // Date
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

            // Photo (cropped to fixed height with centered content)
            photo && h('figure', {
                className: 'mb-8 w-full overflow-hidden rounded-lg shadow-sm',
                style: { height: '400px' }
            },
                h('img', {
                    src: photo.toString(),
                    alt: data.title,
                    className: 'w-full h-full object-cover object-center'
                })
            ),

            // Content
            h('div', { className: 'prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline' }, widgetFor('body'))
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

        // Badge class based on type
        var typeBadgeClass = {
            'phd': 'bg-blue-bell-200 text-blue-bell-900 border',
            'postdoc': 'bg-blue-bell-200 text-blue-bell-900 border',
            'engineer': 'bg-tertiary-200 text-tertiary-900 border',
            'intern': 'bg-gray-200 text-gray-800 border'
        };
        var typeBadgeLabel = {
            'phd': lang === 'fr' ? 'Doctorat' : 'PhD',
            'postdoc': 'Post-doc',
            'engineer': lang === 'fr' ? 'Ingénieur' : 'Engineer',
            'intern': lang === 'fr' ? 'Stage' : 'Internship'
        };
        var badgeClass = typeBadgeClass[data.type] || typeBadgeClass.phd;
        var badgeLabel = typeBadgeLabel[data.type] || data.type;

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
                    // Type badge
                    h('span', {
                        className: 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ' + badgeClass
                    }, badgeLabel),
                    // Tags badges
                    data.tags && data.tags.map(function (tag, i) {
                        return h('span', {
                            key: i,
                            className: 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ' + getBadgeClasses(tag)
                        }, tag);
                    }),
                    // Filled badge
                    data.filled && h('span', {
                        className: 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-800 border'
                    }, lang === 'fr' ? 'Poste pourvu' : 'Position Filled')
                ),

                // Title
                h('h1', { className: 'text-4xl font-bold text-gray-900 mb-4' }, data.title),

                // Meta box
                h('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-gray-50 rounded-lg border' },
                    // Location
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
                    // Expected Start Date
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
                                lang === 'fr' ? 'Début prévu' : 'Expected Start'
                            ),
                            h('p', {
                                className: 'font-medium ' + (data.filled ? 'text-gray-500' : 'text-green-600')
                            }, data.expectedStartDate)
                        )
                    )
                )
            ),

            // Content
            h('div', { className: 'prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline' }, widgetFor('body')),

            // Requirements Section
            data.requirements && data.requirements.length > 0 && h('section', { className: 'mt-8 p-6 bg-primary-50 rounded-lg border border-primary-200' },
                h('h2', { className: 'text-xl font-semibold text-primary-800 mb-4' },
                    lang === 'fr' ? 'Exigences' : 'Requirements'
                ),
                h('ul', { className: 'space-y-2' },
                    data.requirements.map(function (req, i) {
                        return h('li', { key: i, className: 'flex items-start' },
                            h('svg', {
                                className: 'w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0',
                                fill: 'currentColor',
                                viewBox: '0 0 20 20'
                            },
                                h('path', {
                                    fillRule: 'evenodd',
                                    d: 'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z',
                                    clipRule: 'evenodd'
                                })
                            ),
                            h('span', { className: 'text-gray-700' }, req)
                        );
                    })
                )
            ),

            // Application CTA or Filled Message
            !data.filled ? h('section', { className: 'mt-8 p-6 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg text-white' },
                h('h2', { className: 'text-xl font-semibold mb-3 text-white' },
                    lang === 'fr' ? 'Prêt à postuler ?' : 'Ready to Apply?'
                ),
                h('p', { className: 'mb-4 text-primary-100' },
                    lang === 'fr'
                        ? 'Envoyez votre candidature avec votre CV et lettre de motivation.'
                        : 'Send your application with your CV and cover letter.'
                ),
                h('div', { className: 'flex flex-col sm:flex-row gap-3' },
                    h('a', {
                        href: '#',
                        className: 'inline-flex items-center justify-center px-6 py-3 bg-white text-primary-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200'
                    },
                        h('svg', {
                            className: 'w-5 h-5 mr-2',
                            fill: 'none',
                            stroke: 'currentColor',
                            viewBox: '0 0 24 24'
                        },
                            h('path', {
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeWidth: '2',
                                d: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                            })
                        ),
                        lang === 'fr' ? 'Postuler maintenant' : 'Apply Now'
                    ),
                    h('a', {
                        href: '#',
                        className: 'inline-flex items-center justify-center px-6 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors duration-200'
                    },
                        lang === 'fr' ? 'Voir toutes les offres' : 'View All Positions'
                    )
                )
            ) : h('section', { className: 'mt-8 p-6 bg-gray-100 rounded-lg border' },
                h('h2', { className: 'text-xl font-semibold mb-3 text-gray-700' },
                    lang === 'fr' ? 'Poste pourvu' : 'Position Filled'
                ),
                h('p', { className: 'mb-4 text-gray-600' },
                    lang === 'fr'
                        ? 'Ce poste a été pourvu. Consultez nos autres opportunités.'
                        : 'This position has been filled. Check out our other opportunities.'
                ),
                h('a', {
                    href: '#',
                    className: 'inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200'
                },
                    lang === 'fr' ? 'Voir toutes les offres' : 'View All Positions'
                )
            )
        ];

        return createPageContainer(content);
    }
});

/**
 * Pages Preview Template
 * Matches PageLayout.astro structure
 */
var PagesPreview = createClass({
    render: function () {
        var widgetFor = this.props.widgetFor;

        var content = [
            h('div', { className: 'prose prose-lg max-w-none' }, widgetFor('body'))
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
    pattern: /<PrincipalInvestigator\s+name="([^"]+)"\s+headline="([^"]+)"(?:\s+picture=\{([^}]+)\}|\s+picture="([^"]+)?")?\s*>\n([\s\S]*?)\n<\/PrincipalInvestigator>/,
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
                var asset = getAsset(obj.picture);
                pictureUrl = asset.toString();
            } catch (e) {
                // If getAsset fails, try to construct a proper URL
                if (pictureUrl && pictureUrl.startsWith('/src/assets/')) {
                    // Convert internal path to public path
                    pictureUrl = pictureUrl.replace('/src/assets/', '/');
                }
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
 * Usage: <PartnersGrid partners={['Inria', 'CNRS']} />
 */
CMS.registerEditorComponent({
    id: 'PartnersGrid',
    label: 'Partners Grid',
    fields: [
        {
            name: 'partners',
            label: 'Partners',
            widget: 'select',
            multiple: true,
            options: ['Inria', 'CNRS', 'INRAE', 'UPPA', 'Télécom Paris', 'ENPC', 'Université de Bourgogne', 'CEA', 'Université Toulouse 3 (Aniti)', 'Université Toulouse Jean Jaurès', 'IMT', 'DISP', 'Université de Rennes'],
            hint: 'Select partners'
        }
    ],
    pattern: /<PartnersGrid\s+partners=\{\[([^\]]+)\]\}\s*\/>/,
    fromBlock: function (match) {
        // Extract partner names from the array syntax
        var partners = match[1]
            .split(',')
            .map(function (p) { return p.trim().replace(/^['"]|['"]$/g, ''); })
        return {
            partners
        };
    },
    toBlock: function (obj) {
        // Convert comma-separated string to array syntax
        var partnersArray = obj.partners
            .map(function (p) { return "'" + p.trim() + "'"; })
            .join(', ');
        return '<PartnersGrid partners={[' + partnersArray + ']} />';
    },
    toPreview: function (obj, getAsset) {
        var partnersValue = obj.partners || '';
        var partnersKeys = partnersValue
            .map(function (p) { return p.trim(); })
            .filter(Boolean);

        var partnersData = partnersDataCache || {};
        var partners = partnersKeys.map(function (key) {
            var entry = partnersData[key];
            if (!entry) {
                return { key: key, fullname: key, logo: null };
            }
            return {
                key: key,
                fullname: entry.fullname || key,
                logo: entry.logo || null
            };
        });

        var cardsHtml = partners.map(function (partner) {
            var logoUrl = partner.logo;
            if (logoUrl && getAsset) {
                try {
                    var asset = getAsset(logoUrl);
                    logoUrl = asset.toString();
                } catch (e) {
                    // If getAsset fails, try to construct a proper URL
                    if (logoUrl && logoUrl.startsWith('/src/assets/')) {
                        logoUrl = logoUrl.replace('/src/assets/', '/');
                    }
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

        return '<div class="max-w-7xl px-4 py-8">' +
            '<div class="mx-auto flex flex-row gap-16 justify-items-center flex-wrap">' +
            cardsHtml +
            '</div>' +
            '</div>';
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
                var asset = getAsset(obj.src);
                imageUrl = asset.toString();
            } catch (e) {
                // If getAsset fails, try to construct a proper URL
                if (imageUrl && imageUrl.startsWith('/src/assets/')) {
                    imageUrl = imageUrl.replace('/src/assets/', '/');
                }
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
    pattern: /<OutlinedCard[\s\n]+label="([^"]+)"[\s\n]+title="([^"]+)"[\s\n]+description="([^"]+)"[\s\n]*\/?>/,
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
        var lang = obj.lang || 'en';

        // Translations
        var translations = {
            en: {
                resultsCount: 'Showing {count} publications',
                noResults: 'No publications found',
                noResultsDescription: 'Try adjusting your filters to see more results.',
                clearFilters: 'Clear filters',
                type: 'Type',
                year: 'Year',
                tags: 'Tags',
                allYears: 'All Years',
                allTypes: 'All Types'
            },
            fr: {
                resultsCount: 'Affichage de {count} publications',
                noResults: 'Aucune publication trouvée',
                noResultsDescription: 'Essayez d\'ajuster vos filtres pour voir plus de résultats.',
                clearFilters: 'Effacer les filtres',
                type: 'Type',
                year: 'Année',
                tags: 'Tags',
                allYears: 'Toutes les années',
                allTypes: 'Tous les types'
            }
        };

        var t = translations[lang];

        // Mock publications data
        var mockPublications = [
            {
                title: 'Engineering Digital Twins: A Research Roadmap',
                authors: ['Benoît Combemale', 'Pascale Vicat-Blanc', 'Jean-Marc Jézéquel'],
                type: 'conference',
                year: 2025,
                venue: 'EDTconf 2025 - 2nd International Conference on Engineering Digital Twins',
                url: 'https://example.com/paper1',
                tags: ['PC1', 'PC2', 'PC3']
            },
            {
                title: 'Model Hybridization Framework for Digital Twins',
                authors: ['Julien Deantoni', 'Arnaud Blouin'],
                type: 'journal',
                year: 2024,
                venue: 'Journal of Software and Systems Modeling',
                url: 'https://example.com/paper2',
                tags: ['PC1']
            },
            {
                title: 'Digital Coupling in Real-Time Systems',
                authors: ['Hind Bril El Haouzi', 'Sébastien Gérard'],
                type: 'conference',
                year: 2024,
                venue: 'International Conference on Real-Time Systems',
                url: 'https://example.com/paper3',
                tags: ['PC4']
            },
            {
                title: 'Human-Digital Twin Interaction Design',
                authors: ['Thierry Duval', 'Jean-Michel Bruel'],
                type: 'book',
                year: 2023,
                venue: 'Springer',
                url: null,
                tags: ['PC5']
            }
        ];

        var publicationCardsHtml = mockPublications.map(function (pub) {
            var tagsHtml = (pub.tags || []).map(function (tag) {
                return '<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ' + getBadgeClasses(tag) + '">' + tag + '</span>';
            }).join(' ');

            var titleHtml = pub.url
                ? '<a href="' + pub.url + '" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:text-primary-800 transition-colors">' + escapeHtml(pub.title) + '</a>'
                : '<span>' + escapeHtml(pub.title) + '</span>';

            return '<div class="publication-item hover:bg-gray-100 transition-colors duration-300 border-l-4 border-primary-200 pl-3 py-2">' +
                '<h3 class="flex items-baseline font-medium justify-between text-gray-900 leading-tight">' +
                titleHtml +
                '<div class="flex gap-1 flex-wrap justify-end ml-4">' +
                tagsHtml +
                '</div>' +
                '</h3>' +
                '<p class="text-xs text-gray-600 mt-1">' +
                escapeHtml(pub.authors.join(', ')) + ' • ' + pub.year +
                '</p>' +
                '<p class="text-xs text-gray-500">' + escapeHtml(pub.venue) + '</p>' +
                '</div>';
        }).join('');

        return '<div class="w-full">' +
            '<!-- Filter info -->' +
            '<div class="mb-6 p-4 bg-gray-50 rounded-lg border">' +
            '<p class="text-sm text-gray-600 text-center">' +
            '<strong>Note:</strong> Filters are available on the live site. This preview shows sample publications.' +
            '</p>' +
            '</div>' +
            '<!-- Results Count -->' +
            '<div class="mb-6 text-sm text-gray-600 text-center">' +
            t.resultsCount.replace('{count}', mockPublications.length) +
            '</div>' +
            '<!-- Publications List -->' +
            '<div class="relative overflow-x-auto">' +
            publicationCardsHtml +
            '</div>' +
            '</div>';
    }
});

/**
 * Project data cache for ProjectGrid
 */
var projectsDataCache = null;
var projectsDataPromise = null;

function initProjectsData() {
    if (projectsDataPromise) return projectsDataPromise;

    // Data extracted from actual project frontmatter
    projectsDataCache = {
        'fp1': {
            en: {
                title: 'PC1: CATALYST',
                description: 'Developing systematic approaches for combining physical models and data-based models through standardized interfaces and hybridization operators in digital twins',
                color: '#665BA7',
                illustration: '/src/assets/images/uploads/INRIA_EDT_CBLOT_PC1.png'
            },
            fr: {
                title: 'PC1: CATALYST',
                description: 'Développement d\'approches systématiques pour combiner des modèles physiques et des modèles basés sur les données',
                color: '#665BA7',
                illustration: '/src/assets/images/uploads/INRIA_EDT_CBLOT_PC1.png'
            }
        },
        'fp2': {
            en: {
                title: 'PC2: DTCOMPOSE',
                description: 'Developing modular Digital Twin architectures that enable flexible composition, federation, and interoperability through systematic approaches and semantic web technologies',
                color: '#665BA7',
                illustration: '/src/assets/images/uploads/INRIA_EDT_CBLOT_PC2.png'
            },
            fr: {
                title: 'PC2: DTCOMPOSE',
                description: 'Développement d\'architectures modulaires de jumeaux numériques permettant une composition flexible et l\'interopérabilité',
                color: '#665BA7',
                illustration: '/src/assets/images/uploads/INRIA_EDT_CBLOT_PC2.png'
            }
        },
        'fp3': {
            en: {
                title: 'PC3: TWINOPS',
                description: 'Developing specialized methodologies, development life cycles, and domain-specific languages for engineering digital twins with AI integration and collaborative approaches',
                color: '#665BA7',
                illustration: '/src/assets/images/uploads/INRIA_EDT_CBLOT_PC3.png'
            },
            fr: {
                title: 'PC3: TWINOPS',
                description: 'Développement de méthodologies spécialisées et de langages dédiés pour l\'ingénierie des jumeaux numériques',
                color: '#665BA7',
                illustration: '/src/assets/images/uploads/INRIA_EDT_CBLOT_PC3.png'
            }
        },
        'fp4': {
            en: {
                title: 'PC4: SYNCHRONIC',
                description: 'Addressing bidirectional data flows between physical and digital twins with focus on reliability, security, and real-time synchronization for effective digital coupling',
                color: '#E91E63',
                illustration: '/src/assets/images/uploads/INRIA_EDT_CBLOT_PC4.png'
            },
            fr: {
                title: 'PC4: SYNCHRONIC',
                description: 'Gestion des flux de données bidirectionnels entre jumeaux physiques et numériques avec fiabilité et sécurité',
                color: '#E91E63',
                illustration: '/src/assets/images/uploads/INRIA_EDT_CBLOT_PC4.png'
            }
        },
        'fp5': {
            en: {
                title: 'PC5: GENUINE',
                description: 'Developing interactive systems for human-digital twin interaction through VR, AR, collaborative environments, and immersive visualization technologies',
                color: '#FF9800',
                illustration: '/src/assets/images/uploads/INRIA_EDT_CBLOT_PC5.png'
            },
            fr: {
                title: 'PC5: GENUINE',
                description: 'Développement de systèmes interactifs pour l\'interaction humain-jumeau numérique via VR, AR et visualisation immersive',
                color: '#FF9800',
                illustration: '/src/assets/images/uploads/INRIA_EDT_CBLOT_PC5.png'
            }
        }
    };

    projectsDataPromise = Promise.resolve(projectsDataCache);
    return projectsDataPromise;
}

initProjectsData();

CMS.registerEditorComponent({
    id: 'ProjectGrid',
    label: 'Project Grid',
    fields: [
        { name: 'lang', label: 'Language', widget: 'select', options: ['en', 'fr'], default: 'en', required: false }
    ],
    pattern: /<ProjectGrid(?:\s+lang="(en|fr)")?\s*\/?>/,
    fromBlock: function (match) {
        return {
            lang: match[1] || ''
        };
    },
    toBlock: function (obj) {
        var block = '<ProjectGrid' + (obj.lang ? '\n  lang="' + obj.lang + '"' : '') + '\n/>';
        return block;
    },
    toPreview: function (obj, getAsset) {
        var lang = obj.lang || 'en';
        var projectsData = projectsDataCache || {};

        // Get projects in order (fp1, fp2, fp3, fp4, fp5)
        var projectKeys = ['fp1', 'fp2', 'fp3', 'fp4', 'fp5'];

        // Color mapping to match ProjectCard.astro
        var colorMap = {
            'blue-bell': 'linear-gradient(to bottom right, #7F76B5, #4F4783)',
            'hit-pink': 'linear-gradient(to bottom right, #F06292, #D81B60)',
            'marzipan': 'linear-gradient(to bottom right, #FFB74D, #F57C00)'
        };

        // Translations
        var exploreText = lang === 'fr' ? 'Explorer' : 'Explore';

        var cardsHtml = projectKeys.map(function (key) {
            var project = projectsData[key];
            if (!project || !project[lang]) {
                return '';
            }

            var projectData = project[lang];
            var imageUrl = projectData.illustration;

            if (imageUrl && getAsset) {
                try {
                    var asset = getAsset(imageUrl);
                    imageUrl = asset.toString();
                } catch (e) {
                    // If getAsset fails, try to construct a proper URL
                    if (imageUrl && imageUrl.startsWith('/src/assets/')) {
                        imageUrl = imageUrl.replace('/src/assets/', '/');
                    }
                }
            }

            // Determine gradient based on color
            var gradient = colorMap['blue-bell']; // default
            if (projectData.color === '#E91E63') {
                gradient = colorMap['hit-pink'];
            } else if (projectData.color === '#FF9800') {
                gradient = colorMap['marzipan'];
            }

            return '<div class="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">' +
                '<a href="#" class="card p-0 group flex flex-col h-full rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow" style="background: ' + gradient + ';">' +
                (imageUrl
                    ? '<img src="' + imageUrl + '" alt="' + escapeHtml(projectData.title) + '" class="h-full w-full object-cover" style="max-height: 200px;" />'
                    : '<div class="p-6 flex items-center justify-center" style="min-height: 200px;"><h3 class="text-xl font-bold text-white text-center">' + escapeHtml(projectData.title) + '</h3></div>') +
                '<div class="p-4">' +
                '<p class="text-white leading-relaxed text-center mb-4">' + escapeHtml(projectData.description) + '</p>' +
                '<div class="flex items-center justify-center text-white group-hover:text-white/70 transition-colors">' +
                '<span class="text-sm font-semibold mr-2">' + exploreText + '</span>' +
                '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">' +
                '<path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>' +
                '</svg>' +
                '</div>' +
                '</div>' +
                '</a>' +
                '</div>';
        }).join('');

        if (!projectsDataCache) {
            initProjectsData();
        }

        return '<div class="px-6 lg:px-0 flex flex-wrap justify-center gap-6 mb-6 lg:mb-16">' +
            cardsHtml +
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
    pattern: /<div class="grid(?:\s+grid-cols-1)?\s+md:grid-cols-(\d+)(?:\s+lg:grid-cols-\d+)?(?:\s+gap-\d+)?(?:\s+my-\d+)?">\s*((?:<OutlinedCard[\s\S]*?\/>\s*)*)<\/div>/,
    fromBlock: function (match) {
        var columns = match[1];
        var cardsHtml = match[2];

        // Parse OutlinedCard components from the HTML - handle multi-line format
        var cardPattern = /<OutlinedCard[\s\n]+label="([^"]+)"[\s\n]+title="([^"]+)"[\s\n]+description="([^"]+)"[\s\n]*\/?>/g;
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

/**
 * Job Offer List Component
 * Usage: <JobOfferList lang="en" />
 */
CMS.registerEditorComponent({
    id: 'JobOfferList',
    label: 'Job Offer List',
    fields: [
        { name: 'lang', label: 'Language', widget: 'select', options: ['en', 'fr'], default: 'en' }
    ],
    pattern: /<JobOfferList\s+lang="(en|fr)"\s*\/?>/,
    fromBlock: function (match) {
        return {
            lang: match[1]
        };
    },
    toBlock: function (obj) {
        return '<JobOfferList lang="' + obj.lang + '" />';
    },
    toPreview: function (obj) {
        var lang = obj.lang || 'en';

        // Translations
        var translations = {
            en: {
                currentOpportunities: 'Current Opportunities',
                availableCount: '{count} positions available',
                filledCount: '{count} filled',
                totalPositions: '{count} total positions',
                resultsCount: 'Showing {count} positions',
                clearFilters: 'Clear filters',
                type: 'Type',
                tags: 'Tags',
                location: 'Location',
                expectedStart: 'Expected Start'
            },
            fr: {
                currentOpportunities: 'Opportunités actuelles',
                availableCount: '{count} postes disponibles',
                filledCount: '{count} pourvus',
                totalPositions: '{count} postes au total',
                resultsCount: 'Affichage de {count} postes',
                clearFilters: 'Effacer les filtres',
                type: 'Type',
                tags: 'Tags',
                location: 'Lieu',
                expectedStart: 'Début prévu'
            }
        };

        var t = translations[lang];

        // Mock data for preview
        var mockJobOffers = [
            {
                title: 'PhD Position in Digital Twin Architecture',
                type: 'phd',
                location: 'Rennes, France',
                expectedStartDate: 'October 2024',
                filled: false,
                tags: ['PC2'],
                description: 'Research position in modular digital twin architectures...'
            },
            {
                title: 'Post-doctoral Researcher in Model Hybridization',
                type: 'postdoc',
                location: 'Lyon, France',
                expectedStartDate: 'September 2024',
                filled: false,
                tags: ['PC1'],
                description: 'Post-doctoral position focusing on model hybridization...'
            },
            {
                title: 'Research Engineer - Digital Coupling',
                type: 'engineer',
                location: 'Toulouse, France',
                expectedStartDate: 'November 2024',
                filled: true,
                tags: ['PC4'],
                description: 'Engineering position for digital coupling systems...'
            }
        ];

        var availableCount = mockJobOffers.filter(function (j) { return !j.filled; }).length;
        var filledCount = mockJobOffers.filter(function (j) { return j.filled; }).length;

        // Type badge classes
        var typeBadgeClass = {
            'phd': 'bg-blue-bell-200 text-blue-bell-900',
            'postdoc': 'bg-blue-bell-200 text-blue-bell-900',
            'engineer': 'bg-tertiary-200 text-tertiary-900',
            'intern': 'bg-gray-200 text-gray-800'
        };

        var typeBadgeLabel = {
            'phd': lang === 'fr' ? 'Doctorat' : 'PhD',
            'postdoc': 'Post-doc',
            'engineer': lang === 'fr' ? 'Ingénieur' : 'Engineer',
            'intern': lang === 'fr' ? 'Stage' : 'Internship'
        };

        var jobCardsHtml = mockJobOffers.map(function (job) {
            var badgeClass = typeBadgeClass[job.type] || typeBadgeClass.phd;
            var badgeLabel = typeBadgeLabel[job.type] || job.type;

            return '<div class="card bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">' +
                '<div class="flex flex-wrap gap-2 mb-3">' +
                '<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ' + badgeClass + '">' + badgeLabel + '</span>' +
                (job.tags ? job.tags.map(function (tag) {
                    return '<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ' + getBadgeClasses(tag) + '">' + tag + '</span>';
                }).join('') : '') +
                (job.filled ? '<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-800 border">' + (lang === 'fr' ? 'Pourvu' : 'Filled') + '</span>' : '') +
                '</div>' +
                '<h3 class="text-xl font-semibold text-gray-900 mb-2">' + escapeHtml(job.title) + '</h3>' +
                '<p class="text-gray-600 mb-4">' + escapeHtml(job.description) + '</p>' +
                '<div class="flex flex-wrap gap-4 text-sm text-gray-600">' +
                '<div class="flex items-center">' +
                '<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>' +
                escapeHtml(job.location) +
                '</div>' +
                '<div class="flex items-center">' +
                '<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>' +
                escapeHtml(job.expectedStartDate) +
                '</div>' +
                '</div>' +
                '</div>';
        }).join('');

        return '<div class="w-full mb-12">' +
            '<!-- Header with statistics -->' +
            '<div class="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-200">' +
            '<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">' +
            '<div>' +
            '<h2 class="text-lg font-semibold text-primary-800 mb-1">' + t.currentOpportunities + '</h2>' +
            '<p class="text-primary-600 text-sm font-bold mb-0">' +
            t.availableCount.replace('{count}', availableCount) +
            (filledCount > 0 ? ' <span class="ml-2 font-normal">• ' + t.filledCount.replace('{count}', filledCount) + '</span>' : '') +
            '</p>' +
            '</div>' +
            '<div class="mt-3 sm:mt-0">' +
            '<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-600">' +
            t.totalPositions.replace('{count}', mockJobOffers.length) +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<!-- Filter info -->' +
            '<div class="mb-6 p-4 bg-gray-50 rounded-lg border">' +
            '<p class="text-sm text-gray-600 text-center">' +
            '<strong>Note:</strong> Filters are available on the live site. This preview shows sample job offers.' +
            '</p>' +
            '</div>' +
            '<!-- Results Count -->' +
            '<div class="mb-6 text-sm text-gray-600 text-center">' +
            t.resultsCount.replace('{count}', mockJobOffers.length) +
            '</div>' +
            '<!-- Job Offers Grid -->' +
            '<div class="grid grid-cols-1 gap-6">' +
            jobCardsHtml +
            '</div>' +
            '</div>';
    }
});

/**
 * News List Component
 * Usage: <NewsList lang="en" />
 */
CMS.registerEditorComponent({
    id: 'NewsList',
    label: 'News List',
    fields: [
        { name: 'lang', label: 'Language', widget: 'select', options: ['en', 'fr'], default: 'en' }
    ],
    pattern: /<NewsList\s+lang="(en|fr)"\s*\/?>/,
    fromBlock: function (match) {
        return {
            lang: match[1]
        };
    },
    toBlock: function (obj) {
        return '<NewsList lang="' + obj.lang + '" />';
    },
    toPreview: function (obj) {
        var lang = obj.lang || 'en';

        // Translations
        var translations = {
            en: {
                resultsCount: 'Showing {count} news items',
                noResults: 'No news found',
                noResultsDescription: 'Try adjusting your filters to see more results.',
                event: 'Event',
                pressRelease: 'Press Release'
            },
            fr: {
                resultsCount: 'Affichage de {count} actualités',
                noResults: 'Aucune actualité trouvée',
                noResultsDescription: 'Essayez d\'ajuster vos filtres pour voir plus de résultats.',
                event: 'Événement',
                pressRelease: 'Communiqué de presse'
            }
        };

        var t = translations[lang];

        // Mock news data
        var mockNews = [
            {
                title: 'EDT Annual Workshop 2024',
                date: new Date('2024-09-15'),
                newsType: 'event',
                location: 'Lyon, France',
                tags: ['PC1', 'PC2'],
                photo: '/placeholder-news.jpg'
            },
            {
                title: 'New Partnership Announcement',
                date: new Date('2024-08-20'),
                newsType: 'press-release',
                location: null,
                tags: ['General'],
                photo: '/placeholder-news.jpg'
            },
            {
                title: 'Digital Twins Conference 2024',
                date: new Date('2024-10-10'),
                newsType: 'event',
                location: 'Paris, France',
                tags: ['PC3', 'PC4'],
                photo: '/placeholder-news.jpg'
            }
        ];

        var newsCardsHtml = mockNews.map(function (item) {
            var newsTypeLabel = item.newsType === 'event' ? t.event : t.pressRelease;
            var newsTypeBadge = item.newsType === 'event'
                ? 'bg-primary-200 text-primary-900'
                : 'bg-secondary-200 text-secondary-900';

            var tagsHtml = (item.tags || []).map(function (tag) {
                return '<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ' + getBadgeClasses(tag) + '">' + tag + '</span>';
            }).join(' ');

            return '<div class="card hover:shadow-lg relative p-0 bg-white border border-gray-200 rounded-lg shadow max-w-sm w-full mx-auto h-full flex flex-col">' +
                '<!-- Badges -->' +
                '<div class="absolute top-2 left-2 z-10 gap-2 flex flex-wrap">' +
                '<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ' + newsTypeBadge + '">' + newsTypeLabel + '</span>' +
                tagsHtml +
                '</div>' +
                '<!-- Image placeholder -->' +
                '<div class="relative block h-48 overflow-hidden rounded-t-lg flex-shrink-0 bg-gray-200">' +
                '<div class="h-full w-full flex items-center justify-center text-gray-400">' +
                '<svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>' +
                '</div>' +
                '</div>' +
                '<div class="p-3 flex-grow flex flex-col">' +
                '<div class="flex justify-between mb-2 text-sm text-gray-600">' +
                '<p>' + formatDate(item.date, lang) + '</p>' +
                (item.location ? '<p>' + escapeHtml(item.location) + '</p>' : '') +
                '</div>' +
                '<h4 class="text-base line-clamp-3">' +
                '<a href="#" class="hover:text-primary-600 text-gray-800 transition-colors duration-200">' +
                escapeHtml(item.title) +
                '</a>' +
                '</h4>' +
                '</div>' +
                '</div>';
        }).join('');

        return '<div class="w-full">' +
            '<!-- Filter info -->' +
            '<div class="mb-6 p-4 bg-gray-50 rounded-lg border">' +
            '<p class="text-sm text-gray-600 text-center">' +
            '<strong>Note:</strong> Filters and pagination are available on the live site. This preview shows sample news items.' +
            '</p>' +
            '</div>' +
            '<!-- Results Count -->' +
            '<div class="mb-6 text-sm text-gray-600 text-center">' +
            t.resultsCount.replace('{count}', mockNews.length) +
            '</div>' +
            '<!-- News Grid -->' +
            '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">' +
            newsCardsHtml +
            '</div>' +
            '</div>';
    }
});

/**
 * ContactForm Component
 * Displays a contact form with validation
 * Usage: <ContactForm />
 */
CMS.registerEditorComponent({
    id: 'ContactForm',
    label: 'Contact Form',
    fields: [],
    pattern: /<ContactForm\s*\/?>/,
    fromBlock: function () {
        return {};
    },
    toBlock: function () {
        return '<ContactForm />';
    },
    toPreview: function () {
        // Get language from current entry
        var lang = 'en';
        try {
            var entry = window.CMS?.getEditorControl?.()?.props?.entry;
            if (entry) {
                lang = entry.getIn(['data', 'lang']) || 'en';
            }
        } catch (e) {
            console.log('Could not detect language, using default');
        }

        // Translations
        var translations = {
            en: {
                name: 'Name',
                namePlaceholder: 'Your name',
                email: 'Email',
                emailPlaceholder: 'your.email@example.com',
                organization: 'Organization',
                organizationPlaceholder: 'Your organization (optional)',
                organizationHelp: 'Optional',
                subject: 'Subject',
                subjectPlaceholder: 'Select a subject',
                subjectGeneral: 'General inquiry',
                subjectCollaboration: 'Collaboration opportunity',
                subjectResearch: 'Research partnership',
                subjectTechnical: 'Technical question',
                subjectMedia: 'Media request',
                subjectOther: 'Other',
                message: 'Message',
                messagePlaceholder: 'Your message...',
                messageHelp: 'Minimum 10 characters, maximum 2000 characters',
                privacyNotice: 'I agree that my data will be processed according to the privacy policy',
                required: 'Required',
                submit: 'Send Message',
                note: 'This is a preview. The form is fully functional on the live site with validation and email sending.'
            },
            fr: {
                name: 'Nom',
                namePlaceholder: 'Votre nom',
                email: 'Email',
                emailPlaceholder: 'votre.email@exemple.com',
                organization: 'Organisation',
                organizationPlaceholder: 'Votre organisation (optionnel)',
                organizationHelp: 'Optionnel',
                subject: 'Sujet',
                subjectPlaceholder: 'Sélectionnez un sujet',
                subjectGeneral: 'Demande générale',
                subjectCollaboration: 'Opportunité de collaboration',
                subjectResearch: 'Partenariat de recherche',
                subjectTechnical: 'Question technique',
                subjectMedia: 'Demande média',
                subjectOther: 'Autre',
                message: 'Message',
                messagePlaceholder: 'Votre message...',
                messageHelp: 'Minimum 10 caractères, maximum 2000 caractères',
                privacyNotice: 'J\'accepte que mes données soient traitées conformément à la politique de confidentialité',
                required: 'Requis',
                submit: 'Envoyer le message',
                note: 'Ceci est un aperçu. Le formulaire est entièrement fonctionnel sur le site en direct avec validation et envoi d\'email.'
            }
        };

        var t = translations[lang];

        return '<div class="w-full max-w-3xl mx-auto">' +
            '<!-- Info banner -->' +
            '<div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">' +
            '<p class="text-sm text-blue-800">📧 ' + t.note + '</p>' +
            '</div>' +
            '<form class="space-y-8">' +
            '<!-- Name Field -->' +
            '<div>' +
            '<label class="block mb-2 text-sm font-medium text-gray-900">' +
            t.name + ' <span class="text-red-500">*</span>' +
            '</label>' +
            '<input type="text" placeholder="' + t.namePlaceholder + '" ' +
            'class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" />' +
            '</div>' +
            '<!-- Email Field -->' +
            '<div>' +
            '<label class="block mb-2 text-sm font-medium text-gray-900">' +
            t.email + ' <span class="text-red-500">*</span>' +
            '</label>' +
            '<input type="email" placeholder="' + t.emailPlaceholder + '" ' +
            'class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" />' +
            '</div>' +
            '<!-- Organization Field -->' +
            '<div>' +
            '<label class="block mb-2 text-sm font-medium text-gray-900">' +
            t.organization +
            '</label>' +
            '<input type="text" placeholder="' + t.organizationPlaceholder + '" ' +
            'class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" />' +
            '<div class="mt-1 text-sm text-gray-500">' + t.organizationHelp + '</div>' +
            '</div>' +
            '<!-- Subject Field -->' +
            '<div>' +
            '<label class="block mb-2 text-sm font-medium text-gray-900">' +
            t.subject + ' <span class="text-red-500">*</span>' +
            '</label>' +
            '<select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">' +
            '<option value="">' + t.subjectPlaceholder + '</option>' +
            '<option value="general">' + t.subjectGeneral + '</option>' +
            '<option value="collaboration">' + t.subjectCollaboration + '</option>' +
            '<option value="research">' + t.subjectResearch + '</option>' +
            '<option value="technical">' + t.subjectTechnical + '</option>' +
            '<option value="media">' + t.subjectMedia + '</option>' +
            '<option value="other">' + t.subjectOther + '</option>' +
            '</select>' +
            '</div>' +
            '<!-- Message Field -->' +
            '<div>' +
            '<label class="block mb-2 text-sm font-medium text-gray-900">' +
            t.message + ' <span class="text-red-500">*</span>' +
            '</label>' +
            '<textarea rows="6" placeholder="' + t.messagePlaceholder + '" ' +
            'class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"></textarea>' +
            '<div class="mt-1 text-sm text-gray-500">' + t.messageHelp + '</div>' +
            '</div>' +
            '<!-- Privacy Notice -->' +
            '<div class="flex items-start">' +
            '<div class="flex items-center h-5">' +
            '<input type="checkbox" ' +
            'class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" />' +
            '</div>' +
            '<div class="ml-3 text-sm">' +
            '<label class="font-light text-gray-500">' +
            t.privacyNotice + ' <span class="text-red-500">*</span>' +
            '</label>' +
            '</div>' +
            '</div>' +
            '<!-- Submit Button -->' +
            '<div class="text-center">' +
            '<button type="button" ' +
            'class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 transition-colors duration-200">' +
            t.submit +
            '</button>' +
            '</div>' +
            '</form>' +
            '</div>';
    }
});
