/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
        './node_modules/flowbite/**/*.js'
    ],
    theme: {
        extend: {
            fontFamily: {
                'marianne': ['Marianne', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [
        require('flowbite/plugin')
    ],
}