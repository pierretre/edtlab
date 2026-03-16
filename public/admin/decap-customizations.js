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

function resolveImageUrl(imagePath, getAsset) {
    if (!imagePath) return '';
    if (!getAsset) return imagePath;

    try {
        var asset = getAsset(imagePath);
        return asset ? asset.toString() : imagePath;
    } catch (e) {
        console.log('Error getting image asset:', imagePath, e);
        return imagePath;
    }
}

function toSingleQuotedValue(value) {
    return String(value || '')
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'");
}

function getBadgeLabel(tag, lang) {
    if (tag === 'General') return lang === 'fr' ? 'Programme EDT' : 'EDT Program';
    return tag || '';
}

var partnersData = {
    "CETIM": {
        "fullname": "Centre Technique des Industries Mécaniques",
        "logo": "/media/uploads/CETIM.png"
    },
    "CEA": {
        "fullname": "Commissariat à l'énergie atomique et aux énergies alternatives",
        "logo": "/media/uploads/CEA.png"
    },
    "École Polytechnique": {
        "fullname": "École Polytechnique",
        "logo": "/media/uploads/Ecole_Polytechnique.png"
    },
    "ENS Paris-Saclay": {
        "fullname": "École Normale Supérieure Paris-Saclay",
        "logo": "/media/uploads/ENS_Paris_Saclay.png"
    },
    "IMT Atlantique": {
        "fullname": "IMT Atlantique",
        "logo": "/media/uploads/IMT_Atlantique.png"
    },
    "IFPEN": {
        "fullname": "IFP Energies nouvelles",
        "logo": "/media/uploads/IFPEN.png"
    },
    "CNES": {
        "fullname": "Centre National d'Études Spatiales",
        "logo": "/media/uploads/CNES.png"
    },
    "ONERA": {
        "fullname": "Office National d'Études et de Recherches Aérospatiales",
        "logo": "/media/uploads/ONERA.png"
    },
    "IRD": {
        "fullname": "Institut de Recherche pour le Développement",
        "logo": "/media/uploads/IRD.png"
    },
    "CIRAD": {
        "fullname": "Centre de coopération internationale en recherche agronomique pour le développement",
        "logo": "/media/uploads/CIRAD.png"
    },
    "ORANGE": {
        "fullname": "ORANGE",
        "logo": "/media/uploads/ORANGE.png"
    },
    "UGE": {
        "fullname": "Université Gustave Eiffel",
        "logo": "/media/uploads/UGE.png"
    },
    "ENPC": {
        "fullname": "École des Ponts ParisTech",
        "logo": "/media/uploads/ENPC.png"
    },
    "ONIRIS": {
        "fullname": "ONIRIS",
        "logo": "/media/uploads/ONIRIS.png"
    },
    "Vectura System": {
        "fullname": "Vectura System",
        "logo": "/media/uploads/Vectura_System.png"
    },
    "INRAE": {
        "fullname": "Institut National de Recherche pour l'Agriculture, l'Alimentation et l'Environnement",
        "logo": "/media/uploads/INRAE.png"
    },
    "Inria": {
        "fullname": "Institut National de Recherche en Informatique et en Automatique",
        "logo": "/media/uploads/Inria.png"
    },
    "INSA Rennes": {
        "fullname": "Institut National des Sciences Appliquées de Rennes",
        "logo": "/media/uploads/INSA_Rennes.png"
    },
    "Télécom Paris": {
        "fullname": "Télécom Paris",
        "logo": "/media/uploads/TelecomParis.png"
    },
    "Université Bourgogne Europe": {
        "fullname": "Université Bourgogne Europe",
        "logo": "/media/uploads/UBE.png"
    },
    "Université Grenoble Alpes": {
        "fullname": "Université Grenoble Alpes",
        "logo": "/media/uploads/UGA.png"
    },
    "Université Côte d'Azur": {
        "fullname": "Université Côte d'Azur",
        "logo": "/media/uploads/UniCA.png"
    },
    "Université de Strasbourg": {
        "fullname": "Université de Strasbourg",
        "logo": "/media/uploads/UniStra.png"
    },
    "Université de Lille": {
        "fullname": "Université de Lille",
        "logo": "/media/uploads/Universite_de_Lille.png"
    },
    "Université de Lorraine": {
        "fullname": "Université de Lorraine",
        "logo": "/media/uploads/Universite_de_Lorraine.png"
    },
    "Université de Nantes": {
        "fullname": "Université de Nantes",
        "logo": "/media/uploads/Universite_de_Nantes.png"
    },
    "Université de Rennes": {
        "fullname": "Université de Rennes",
        "logo": "/media/uploads/Universite_de_Rennes.png"
    },
    "Université de Toulouse": {
        "fullname": "Université de Toulouse",
        "logo": "/media/uploads/Universite_de_Toulouse.png"
    },
    "UPPA": {
        "fullname": "Université de Pau et des Pays de l'Adour",
        "logo": "/media/uploads/UPPA.png"
    },
    "Université Toulouse Jean Jaurès": {
        "fullname": "Université Toulouse Jean Jaurès",
        "logo": "/media/uploads/UT2J.png"
    },
    "ANR": {
        "fullname": "Agence Nationale de la Recherche",
        "logo": "/media/uploads/ANR.jpg"
    },
    "France2030": {
        "fullname": "France 2030",
        "logo": "/media/uploads/France 2030.png"
    },
    "ENSEEIHT": {
        "fullname": "ENSEEIHT",
        "logo": "/media/uploads/enseeiht.png"
    },
    "Université Lumière Lyon 2": {
        "fullname": "Université Lumière Lyon 2",
        "logo": "/media/uploads/Universite-lumiere-lyon-2.png"
    },
    "IGN": {
        "fullname": "Institut national de l'information géographique et forestière",
        "logo": "/media/uploads/IGN.png"
    },
    "CNRS": {
        "fullname": "Centre national de la recherche scientifique",
        "logo": "/media/uploads/CNRS.png"
    },
    "Université Le Havre Normandie": {
        "fullname": "Université Le Havre Normandie",
        "logo": "/media/uploads/Universite-Le-Havre-Normandie.png"
    },
    "UGA-INP": {
        "fullname": "UGA-INP",
        "logo": "/media/uploads/UGA-INP.png"
    },
    "CESI Rouen": {
        "fullname": "CESI Rouen",
        "logo": "/media/uploads/CESI_Rouen.png"
    },
    "IRT SystemX": {
        "fullname": "IRT SystemX",
        "logo": "/media/uploads/irt_systemx.png"
    },
    "IRT Jules Vernes": {
        "fullname": "IRT Jules Vernes",
        "logo": "/media/uploads/irt_jules_vernes.png"
    },
    "ENIB": {
        "fullname": "École Nationale d'Ingénieurs de Brest",
        "logo": "/media/uploads/ENIB.jpeg"
    },
    "CNAM": {
        "fullname": "Conservatoire national des arts et métiers",
        "logo": "/media/uploads/CNAM.png"
    }
    "CETIM": {
        "fullname": "Centre technique des industries mécaniques",
        "logo": "/media/uploads/CETIM.png"
    }
};

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
                console.log('Error getting asset for news photo:', data.photo, e);
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

        // Badge class based on type
        var typeBadgeClass = {
            'phd': 'bg-blue-bell-200 text-blue-bell-900 border',
            'postdoc': 'bg-blue-bell-200 text-blue-bell-900 border',
            'engineer': 'bg-tertiary-200 text-tertiary-900 border',
            'intern': 'bg-gray-200 text-gray-800 border',
            'others': 'bg-gray-200 text-gray-800 border'
        };
        var typeBadgeLabel = {
            'phd': 'PhD',
            'postdoc': 'Post-doc',
            'engineer': 'Engineer',
            'intern': 'Internship',
            'others': 'Others'
        };
        var typeKey = ((data.type || '') + '').toLowerCase();
        var badgeClass = typeBadgeClass[typeKey] || typeBadgeClass.phd;
        var badgeLabel = typeBadgeLabel[typeKey] || data.type;

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
                    'Back to Careers'
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
                    }, 'Position Filled')
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
                                'Location'
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
                                'Expected Start'
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
                    'Requirements'
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
                    'Ready to Apply?'
                ),
                h('p', { className: 'mb-4 text-primary-100' },
                    'Send your application with your CV and cover letter.'
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
                        'Apply Now'
                    ),
                    h('a', {
                        href: '#',
                        className: 'inline-flex items-center justify-center px-6 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors duration-200'
                    },
                        'View All Positions'
                    )
                )
            ) : h('section', { className: 'mt-8 p-6 bg-gray-100 rounded-lg border' },
                h('h2', { className: 'text-xl font-semibold mb-3 text-gray-700' },
                    'Position Filled'
                ),
                h('p', { className: 'mb-4 text-gray-600' },
                    'This position has been filled. Check out our other opportunities.'
                ),
                h('a', {
                    href: '#',
                    className: 'inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200'
                },
                    'View All Positions'
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
 * Newsletter Preview Template
 */
var NewsletterPreview = createClass({
    render: function () {
        const widgetFor = this.props.widgetFor;
        const entry = this.props.entry;
        const title = entry.getIn(['data', 'title']) || 'Newsletter Title';

        const content = [
            // Email styles
            h('style', { type: 'text/css' }, `
                @import url("../assets/fonts/marianne.css");

                body {
                    font-family: 'Marianne', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
                    font-size: 16px;
                    line-height: 1.6;
                    color: #262626;
                    margin: 0;
                    padding: 0;
                    background-color: #fafafa;
                }

                h1, h2, h3, h4 {
                    color: #262626;
                    margin: 0 0 16px;
                }

                p, li {
                    color: #525252;
                }

                a {
                    color: #323464;
                    text-decoration: none;
                }

                a:hover {
                    color: #1f2a8f;
                }

                .card {
                    background-color: #ffffff;
                    border-radius: 8px;
                    padding: 24px;
                    margin: 0 auto;
                    max-width: 600px;
                    text-align: left;
                }

                .header-footer {
                    background-color: #313565;
                    color: #ffffff;
                    padding: 24px 16px;
                    text-align: center;
                }

                .footer a {
                    color: #ffffff;
                    text-decoration: underline;
                }

                img {
                    max-width: 200px;
                    margin: 0 auto 24px;
                    display: block;
                }
            `),

            // Email body container
            h(
                'div',
                {
                    style: {
                        margin: 0,
                        padding: 0,
                        backgroundColor: '#fafafa'
                    }
                },
                [
                    // Header with logos and title
                    h(
                        'div',
                        {
                            className: 'header-footer',
                            style: {
                                backgroundColor: '#313565',
                                color: '#ffffff',
                                padding: '24px 16px',
                                textAlign: 'center'
                            }
                        },
                        [
                            h(
                                'div',
                                {
                                    style: {
                                        display: 'flex',
                                        justifyContent: 'space-around',
                                        alignItems: 'center',
                                        marginBottom: '24px',
                                        flexWrap: 'wrap',
                                        gap: '16px'
                                    }
                                },
                                [
                                    h('img', {
                                        src: 'https://edtlab.fr/Logo_EDT_CBLOT-white.png',
                                        alt: 'Engineering Digital Twin',
                                        style: {
                                            maxWidth: '300px',
                                            margin: 0
                                        }
                                    }),
                                    h('img', {
                                        src: 'https://edtlab.fr/logo-fr-white.png',
                                        alt: 'Engineering Digital Twin',
                                        style: {
                                            maxWidth: '300px',
                                            margin: 0
                                        }
                                    })
                                ]
                            ),
                            h('h1', { style: { color: 'white', margin: 0 } }, title)
                        ]
                    ),

                    // Main content with white card
                    h(
                        'div',
                        { style: { padding: '24px 16px' } },
                        h(
                            'div',
                            {
                                className: 'card',
                                style: {
                                    backgroundColor: '#ffffff',
                                    borderRadius: '8px',
                                    padding: '24px',
                                    margin: '0 auto',
                                    maxWidth: '600px',
                                    textAlign: 'left'
                                }
                            },
                            widgetFor('body')
                        )
                    ),

                    // Footer
                    h(
                        'div',
                        {
                            className: 'header-footer footer',
                            style: {
                                backgroundColor: '#313565',
                                color: '#ffffff',
                                padding: '24px 16px',
                                textAlign: 'center'
                            }
                        },
                        [
                            h(
                                'div',
                                { style: { fontSize: '14px', marginBottom: '8px' } },
                                h('a', {
                                    href: 'https://edtlab.fr',
                                    style: { color: '#ffffff', textDecoration: 'underline' }
                                }, 'https://edtlab.fr')
                            ),
                            h(
                                'div',
                                { style: { fontSize: '14px' } },
                                'Newsletter à diffusion interne au Programme EDT, ne pas diffuser à l\'extérieur du programme.'
                            )
                        ]
                    )
                ]
            )
        ];

        return content;
    },
});

/**
 * Register all preview templates
 */
CMS.registerPreviewTemplate('pages', PagesPreview);
CMS.registerPreviewTemplate('news', NewsPreview);
CMS.registerPreviewTemplate('job-offers', JobOffersPreview);
CMS.registerPreviewTemplate('newsletter', NewsletterPreview);

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
        { name: 'name', label: 'Name', widget: 'string', required: true },
        { name: 'headline', label: 'Headline/Title', widget: 'string', },
        { name: 'picture', label: 'Profile Picture', widget: 'image', required: true },
        { name: 'bio', label: 'Biography', widget: 'text', required: true }
    ],
    pattern: /<PrincipalInvestigator\s+name="([^"]+)"\s+headline="([^"]+)"(?:\s+picture=\{([^}]+)\}|\s+picture="([^"]+)?")?\s*>\n([\s\S]*?)\n<\/PrincipalInvestigator>/,
    fromBlock: function (match) {
        var picture = match[3] || match[4] || '';
        return {
            name: match[1],
            headline: match[2],
            picture: picture,
            bio: match[5]
        };
    },
    toBlock: function (obj) {
        var block = '<PrincipalInvestigator\nname="' + obj.name + '"\nheadline="' + obj.headline + '"';
        if (obj.picture) {
            var isPath = obj.picture.startsWith('/') || obj.picture.startsWith('./') || obj.picture.startsWith('../');
            if (isPath) {
                block += '\npicture="' + obj.picture + '"';
            } else if (!isPath) {
                block += '\npicture={' + obj.picture + '}';
            }
        }
        block += '>\n' + obj.bio + '\n</PrincipalInvestigator>';
        return block;
    },
    toPreview: function (obj, getAsset) {
        var pictureUrl = resolveImageUrl(obj.picture, getAsset);

        return `<div class="card bg-white shadow-sm border flex flex-col sm:flex-row gap-6 items-start mb-6">
            ${pictureUrl ?
                `<img src="${pictureUrl}" alt="${escapeHtml(obj.name)}" class="w-48 h-48 bg-gray-200 rounded-full flex-shrink-0 object-cover" loading="lazy" decoding="async" />`
                :
                ''
            }
            <div class="flex-1 space-y-3">
            <h3 class="text-2xl font-bold text-gray-800">${escapeHtml(obj.name)}</h3>
            <p class="text-primary-700 font-bold text-xl">${escapeHtml(obj.headline)}</p>
            <p class="text-gray-600">${escapeHtml(obj.bio)}</p>
            </div>
            </div>`;
    }
});

/**
 * PC Leaders List Component
 * Usage: <PCLeadersList lang="en" leaders={[{...}]} />
 */
CMS.registerEditorComponent({
    id: 'PCLeadersList',
    label: 'PC Leaders List',
    fields: [
        { name: 'name', label: 'Name', widget: 'string' },
        { name: 'affiliation', label: 'Affiliation', widget: 'string', required: false },
        { name: 'project', label: 'Project', widget: 'select', options: ['PC1', 'PC2', 'PC3', 'PC4', 'PC5', 'General'], default: 'General' },
        { name: 'picture', label: 'Picture', widget: 'image', required: false },
        { name: 'website', label: 'Website', widget: 'string', required: false }
    ],
    pattern: /<PCLeadersList\s+lang="(en|fr)"\s+leaders=\{\[([\s\S]*?)\]\}\s*\/?>/,
    fromBlock: function (match) {
        var leadersRaw = match[2] || '';
        var leaderBlocks = leadersRaw.match(/\{[\s\S]*?\}/g) || [];

        var leaders = leaderBlocks.map(function (leaderBlock) {
            function extractField(fieldName) {
                var fieldPattern = new RegExp(fieldName + "\\s*:\\s*(['\"])([\\s\\S]*?)\\1");
                var fieldMatch = leaderBlock.match(fieldPattern);
                return fieldMatch ? fieldMatch[2].trim() : '';
            }

            return {
                name: extractField('name'),
                affiliation: extractField('affiliation'),
                project: extractField('project') || 'General',
                picture: extractField('picture'),
                website: extractField('website')
            };
        }).filter(function (leader) {
            return leader.name;
        });

        return {
            lang: match[1] || 'en',
            leaders: leaders
        };
    },
    toBlock: function (obj) {
        var lang = obj.lang || 'en';
        var leaders = Array.isArray(obj.leaders) ? obj.leaders : [];

        var leadersString = leaders.map(function (leader) {
            var fields = [
                "name: '" + toSingleQuotedValue(leader.name) + "'",
                "affiliation: '" + toSingleQuotedValue(leader.affiliation) + "'",
                "project: '" + toSingleQuotedValue(leader.project || 'General') + "'"
            ];

            if (leader.picture) {
                fields.push("picture: '" + toSingleQuotedValue(leader.picture) + "'");
            }

            if (leader.website) {
                fields.push("website: '" + toSingleQuotedValue(leader.website) + "'");
            }

            return '    { ' + fields.join(', ') + ' }';
        }).join(',\n');

        return '<PCLeadersList\n' +
            '  lang="' + lang + '"\n' +
            '  leaders={[\n' +
            leadersString + '\n' +
            '  ]}\n' +
            '/>';
    },
    toPreview: function (obj, getAsset) {
        var lang = obj.lang || 'en';
        var websiteText = lang === 'fr' ? 'Site web' : 'Website';
        var leaders = Array.isArray(obj.leaders) ? obj.leaders : [];

        var leadersHtml = leaders.map(function (leader) {
            var project = leader.project || 'General';
            var badgeClasses = getBadgeClasses(project);
            var badgeLabel = getBadgeLabel(project, lang);
            var name = escapeHtml(leader.name || '');
            var affiliation = escapeHtml(leader.affiliation || 'TBC');
            var website = leader.website ? escapeHtml(leader.website) : '';
            var pictureUrl = resolveImageUrl(leader.picture, getAsset);

            var initials = (leader.name || '')
                .split(' ')
                .filter(Boolean)
                .slice(0, 2)
                .map(function (part) { return part.charAt(0); })
                .join('');

            var imageOrFallback = pictureUrl
                ? `<img src="${pictureUrl}" alt="Portrait of ${name}" class="w-16 h-16 object-cover rounded-full flex-shrink-0" loading="lazy" />`
                : `<div class="w-16 h-16 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-semibold flex-shrink-0">${escapeHtml(initials)}</div>`;

            var websiteHtml = website
                ? `<a href="${website}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-sm text-primary-700 hover:text-primary-800 underline">
                        ${websiteText}
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.5 6H18m0 0v4.5M18 6l-7.5 7.5" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.25 7.5h-1.5A2.25 2.25 0 004.5 9.75v7.5A2.25 2.25 0 006.75 19.5h7.5a2.25 2.25 0 002.25-2.25v-1.5" />
                        </svg>
                    </a>`
                : '';

            return `<article class="card bg-white border shadow-sm p-4 relative">
                <div class="absolute top-4 right-4">
                    <span class="badge ${badgeClasses}">${escapeHtml(badgeLabel)}</span>
                </div>

                <div class="flex items-stretch gap-3 pr-24">
                    ${imageOrFallback}

                    <div class="min-w-0 flex-1">
                        <div class="mb-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                            <h4 class="text-lg font-semibold text-gray-900 leading-tight">${name}</h4>
                            <span class="text-sm text-gray-600">${affiliation}</span>
                        </div>

                        <div class="flex flex-wrap gap-2 text-sm">
                            ${websiteHtml}
                        </div>
                    </div>
                </div>
            </article>`;
        }).join('');

        return `<div class="flex flex-col gap-4 my-6">${leadersHtml}</div>`;
    }
});

/**
 * Partners Grid Component
 * Usage: <PartnersGrid partners={['Inria']} />
 */
CMS.registerEditorComponent({
    id: 'PartnersGrid',
    label: 'Partners Grid',
    fields: [
        {
            name: 'largeLogos',
            label: 'Large logos',
            widget: 'boolean',
            required: false,
            default: false
        },
        {
            name: 'partners',
            label: 'Partners',
            widget: 'select',
            multiple: true,
            options: ["ANR",
                "CETIM",
                "CEA",
                "CESI Rouen",
                "CNAM",
                "CNRS",
                "École Polytechnique",
                "ENIB",
                "ENSEEIHT",
                "ENS Paris-Saclay",
                "France2030",
                "IGN",
                "IMT Atlantique",
                "INRAE",
                "Inria",
                "INSA Rennes",
                "IRT SystemX",
                "IRT Jules Vernes",
                "IFPEN",
                "CNES",
                "ONERA",
                "IRD",
                "CIRAD",
                "ORANGE",
                "URCA",
                "UPHF",
                "UGE",
                "ENPC",
                "ONIRIS",
                "Vectura System",
                "Télécom Paris",
                "Université Bourgogne Europe",
                "Université Grenoble Alpes",
                "Université Côte d'Azur",
                "Université Le Havre Normandie",
                "Université de Strasbourg",
                "Université de Lille",
                "Université Lumière Lyon 2",
                "Université de Lorraine",
                "Université de Nantes",
                "Université de Rennes",
                "Université de Toulouse",
                "UGA-INP",
                "UPPA",
                "Université Toulouse Jean Jaurès"],
            hint: 'Select partners'
        }
    ],
    pattern: /<PartnersGrid\s+([^>]*?)\/>/,
    fromBlock: function (match) {
        var attributes = match[1] || '';
        var partnersMatch = attributes.match(/partners=\{\[([^\]]+)\]\}/);
        var largeLogosMatch = attributes.match(/largeLogos="(true|false)"/);

        var partners = (partnersMatch ? partnersMatch[1] : '')
            .split(',')
            .map(function (p) { return p.trim().replace(/^['"]|['"]$/g, ''); })
            .filter(Boolean);

        return {
            largeLogos: largeLogosMatch ? largeLogosMatch[1] === 'true' : false,
            partners
        };
    },
    toBlock: function (obj) {
        var partnersArray = (obj.partners || [])
            .map(function (p) { return "'" + p.trim() + "'"; })
            .join(', ');

        var block = '<PartnersGrid';
        if (obj.largeLogos) {
            block += ' largeLogos="true"';
        }
        block += ' partners={[' + partnersArray + ']} />';
        return block;
    },
    toPreview: function (obj, getAsset) {
        var partnersValue = Array.isArray(obj.partners) ? obj.partners : [];
        var partnersKeys = partnersValue
            .map(function (p) { return p.trim(); })
            .filter(Boolean);
        var logoClass = obj.largeLogos ? 'w-auto h-auto object-contain mx-auto max-w-48 max-h-20' : 'w-auto h-auto object-contain mx-auto max-w-36 max-h-16';

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
            var logoUrl = resolveImageUrl(partner.logo, getAsset);

            return '<div class="flex-1 flex flex-col items-center group w-full" title="' + escapeHtml(partner.fullname) + '">' +
                (logoUrl
                    ? '<img src="' + logoUrl + '" alt="' + escapeHtml(partner.fullname) + '" class="' + logoClass + '" loading="lazy" />'
                    : '<div class="h-12 w-32 bg-gray-100 border rounded flex items-center justify-center text-xs text-gray-500">' + escapeHtml(partner.key) + '</div>') +
                '</div>';
        }).join('');

        return `<div class="max-w-7xl px-4 py-8">
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
                var asset = getAsset(obj.src);
                imageUrl = asset.toString();
            } catch (e) {
                console.log('Error getting asset for OptimizedFigure:', obj.src, e);
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

        return `<div class="w-full">
            <!-- Filter info -->
            <div class="mb-6 p-4 bg-gray-50 rounded-lg border">
            <p class="text-sm text-gray-600 text-center">
            <strong>Note:</strong> Filters are available on the live site. This preview shows sample publications.
            </p>
            </div>
            <!-- Results Count -->
            <div class="mb-6 text-sm text-gray-600 text-center">
            ${t.resultsCount.replace('{count}', mockPublications.length)}
            </div>
            <!-- Publications List -->
            <div class="relative overflow-x-auto">
            ${publicationCardsHtml}
            </div>
            </div>`;
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
            },
            fr: {
                title: 'PC1: CATALYST',
                description: 'Développement d\'approches systématiques pour combiner des modèles physiques et des modèles basés sur les données',
                color: '#665BA7',
            }
        },
        'fp2': {
            en: {
                title: 'PC2: DTCOMPOSE',
                description: 'Developing modular Digital Twin architectures that enable flexible composition, federation, and interoperability through systematic approaches and semantic web technologies',
                color: '#665BA7',
            },
            fr: {
                title: 'PC2: DTCOMPOSE',
                description: 'Développement d\'architectures modulaires de jumeaux numériques permettant une composition flexible et l\'interopérabilité',
                color: '#665BA7',
            }
        },
        'fp3': {
            en: {
                title: 'PC3: TWINOPS',
                description: 'Developing specialized methodologies, development life cycles, and domain-specific languages for engineering digital twins with AI integration and collaborative approaches',
                color: '#665BA7',
            },
            fr: {
                title: 'PC3: TWINOPS',
                description: 'Développement de méthodologies spécialisées et de langages dédiés pour l\'ingénierie des jumeaux numériques',
                color: '#665BA7',
            }
        },
        'fp4': {
            en: {
                title: 'PC4: SYNCHRONIC',
                description: 'Addressing bidirectional data flows between physical and digital twins with focus on reliability, security, and real-time synchronization for effective digital coupling',
                color: '#E91E63',
            },
            fr: {
                title: 'PC4: SYNCHRONIC',
                description: 'Gestion des flux de données bidirectionnels entre jumeaux physiques et numériques avec fiabilité et sécurité',
                color: '#E91E63',
            }
        },
        'fp5': {
            en: {
                title: 'PC5: GENUINE',
                description: 'Developing interactive systems for human-digital twin interaction through VR, AR, collaborative environments, and immersive visualization technologies',
                color: '#FF9800',
            },
            fr: {
                title: 'PC5: GENUINE',
                description: 'Développement de systèmes interactifs pour l\'interaction humain-jumeau numérique via VR, AR et visualisation immersive',
                color: '#FF9800',
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
                    console.log('Error getting asset for project illustration:', imageUrl, e);
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
            'intern': 'bg-gray-200 text-gray-800',
            'others': 'bg-gray-200 text-gray-800'
        };

        var typeBadgeLabel = {
            'phd': lang === 'fr' ? 'Doctorat' : 'PhD',
            'postdoc': 'Post-doc',
            'engineer': lang === 'fr' ? 'Ingénieur' : 'Engineer',
            'intern': lang === 'fr' ? 'Stage' : 'Internship',
            'others': lang === 'fr' ? 'Autres' : 'Others'
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
