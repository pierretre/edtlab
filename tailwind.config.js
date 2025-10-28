/** @type {import('tailwindcss').Config} */
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
                'sans': ['Marianne', 'system-ui', 'sans-serif'],
            },
            colors: {
                // Primary Scampi colors
                'primary': {
                    'DEFAULT': '#665BA7',
                    50: '#EEEDF5',
                    100: '#E2E0EE',
                    200: '#C9C5E0',
                    300: '#B0ABD2',
                    400: '#9890C3',
                    500: '#7F76B5',
                    600: '#665BA7',
                    700: '#4F4783',
                    800: '#39335F',
                    900: '#231F3A',
                    950: '#181628'
                },
                // Secondary brown colors (#745037)
                'secondary': {
                    50: '#faf9f7',    // Very light brown
                    100: '#f3f1ed',   // Light brown
                    200: '#e7e2db',   // Medium light brown
                    300: '#d4cbc0',   // Light medium brown
                    400: '#b8a896',   // Medium brown
                    500: '#9d8a75',   // Base medium brown
                    600: '#745037',   // Base brown (#745037)
                    700: '#5d3f2c',   // Dark brown
                    800: '#4a3223',   // Darker brown
                    900: '#3d2a1d',   // Very dark brown
                    950: '#201611',   // Darkest brown
                },
                // Tertiary lighter brown colors (#8b6f50)
                'tertiary': {
                    50: '#faf8f6',    // Very light brown
                    100: '#f4f0eb',   // Light brown
                    200: '#e8dfd6',   // Medium light brown
                    300: '#d6c7b8',   // Light medium brown
                    400: '#bfa593',   // Medium brown
                    500: '#a68c73',   // Base medium brown
                    600: '#8b6f50',   // Base brown (#8b6f50)
                    700: '#6f5640',   // Dark brown
                    800: '#5a4534',   // Darker brown
                    900: '#4a392c',   // Very dark brown
                    950: '#261e17',   // Darkest brown
                },
                // Neutral grays based on #c6c0c6
                'gray': {
                    50: '#fafafa',    // Very light gray
                    100: '#f5f5f5',   // Light gray
                    200: '#e5e5e5',   // Medium light gray
                    300: '#d4d4d4',   // Medium gray
                    400: '#c6c0c6',   // Base gray (#c6c0c6)
                    500: '#a3a3a3',   // Medium dark gray
                    600: '#737373',   // Dark gray
                    700: '#525252',   // Darker gray
                    800: '#404040',   // Very dark gray
                    900: '#262626',   // Darkest gray
                    950: '#171717',   // Almost black
                },
                // Success green (RGAA compliant with new scheme)
                'success': {
                    50: 'oklch(96.5% 0.027 142)',      // Very light green
                    500: 'oklch(62.8% 0.150 145)',     // Base green
                    600: 'oklch(55.4% 0.135 145)',     // 4.5:1 contrast on white
                    700: 'oklch(48.2% 0.122 145)',     // 7:1 contrast on white
                },
                // Warning orange (RGAA compliant with new scheme)
                'warning': {
                    50: 'oklch(97.8% 0.024 83)',       // Very light orange
                    500: 'oklch(75.8% 0.108 83)',      // Base orange
                    600: 'oklch(68.3% 0.098 83)',      // 4.5:1 contrast on white
                    700: 'oklch(60.5% 0.087 83)',      // 7:1 contrast on white
                },
                // Error red (RGAA compliant with new scheme)
                'error': {
                    50: 'oklch(97.1% 0.013 17)',       // Very light red
                    500: 'oklch(62.8% 0.228 17)',      // Base red
                    600: 'oklch(55.4% 0.207 17)',      // 4.5:1 contrast on white
                    700: 'oklch(47.2% 0.177 17)',      // 7:1 contrast on white
                }
            },
            fontSize: {
                // Accessible font sizes with proper line heights
                'xs': ['0.75rem', { lineHeight: '1.5' }],      // 12px
                'sm': ['0.875rem', { lineHeight: '1.5' }],     // 14px
                'base': ['1rem', { lineHeight: '1.6' }],       // 16px
                'lg': ['1.125rem', { lineHeight: '1.6' }],     // 18px (large text threshold)
                'xl': ['1.25rem', { lineHeight: '1.5' }],      // 20px
                '2xl': ['1.5rem', { lineHeight: '1.4' }],      // 24px
                '3xl': ['1.875rem', { lineHeight: '1.3' }],    // 30px
                '4xl': ['2.25rem', { lineHeight: '1.2' }],     // 36px
                '5xl': ['3rem', { lineHeight: '1.1' }],        // 48px
                '6xl': ['3.75rem', { lineHeight: '1' }],       // 60px
            },
            spacing: {
                // Additional spacing for accessibility (44px minimum touch targets)
                '11': '2.75rem',  // 44px - minimum touch target size
                '18': '4.5rem',   // 72px
                '88': '22rem',    // 352px
                '128': '32rem',   // 512px
            },
            borderRadius: {
                // Consistent border radius values
                'sm': '0.25rem',   // 4px
                'md': '0.375rem',  // 6px
                'lg': '0.5rem',    // 8px
                'xl': '0.75rem',   // 12px
                '2xl': '1rem',     // 16px
            },
            boxShadow: {
                // Accessible shadows using new color scheme
                'focus': '0 0 0 3px oklch(51.708% 0.11741 288.23 / 0.5)',  // Scampi focus ring
                'focus-error': '0 0 0 3px oklch(62.8% 0.228 17 / 0.5)',    // Error red focus ring
            }
        },
    },
    plugins: [
        // Note: Flowbite plugin may need to be imported differently for Tailwind v4
        // For now, we'll rely on the CSS import in global.css
    ],
};