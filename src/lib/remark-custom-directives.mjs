import { visit } from 'unist-util-visit';

export default function remarkCustomDirectives() {
    return (tree) => {
        visit(tree, 'containerDirective', (node, index, parent) => {
            const { name, headline, picture } = node.attributes || {};

            parent.children[index] = {
                type: 'element',
                tagName: 'div',
                properties: {
                    className:
                        'card bg-white shadow-sm border flex flex-col sm:flex-row gap-6 items-start mb-6',
                },
                children: [
                    ...(picture
                        ? [
                            {
                                type: 'element',
                                tagName: 'img',
                                properties: {
                                    src: picture,
                                    alt: name,
                                    className:
                                        'w-32 h-32 bg-gray-200 rounded-full flex-shrink-0 object-cover',
                                },
                                children: [],
                            },
                        ]
                        : []),
                    {
                        type: 'element',
                        tagName: 'div',
                        properties: { className: 'flex-1 space-y-3' },
                        children: [
                            {
                                type: 'element',
                                tagName: 'h3',
                                properties: {
                                    className: 'text-xl font-medium text-gray-800',
                                },
                                children: [{ type: 'text', value: name }],
                            },
                            headline && {
                                type: 'element',
                                tagName: 'p',
                                properties: { className: 'text-gray-700' },
                                children: [{ type: 'text', value: headline }],
                            },
                            {
                                type: 'element',
                                tagName: 'p',
                                properties: { className: 'text-gray-600' },
                                children: node.children,
                            },
                        ].filter(Boolean),
                    },
                ],
            };
        });
    };
}
