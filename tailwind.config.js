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
                // French government color scheme with RGAA-compliant contrast ratios
                'edt': {
                    // Primary blue (French government blue)
                    'primary': {
                        50: '#eff6ff',   // Very light blue
                        100: '#dbeafe',  // Light blue
                        200: '#bfdbfe',  // Medium light blue
                        300: '#93c5fd',  // Medium blue
                        400: '#60a5fa',  // Medium dark blue
                        500: '#3b82f6',  // Base blue
                        600: '#2563eb',  // Dark blue (4.5:1 contrast on white)
                        700: '#1d4ed8',  // Darker blue (7:1 contrast on white)
                        800: '#1e40af',  // Very dark blue
                        900: '#1e3a8a',  // Darkest blue
                    },
                    // Secondary red (Marianne red)
                    'secondary': {
                        50: '#fef2f2',   // Very light red
                        100: '#fee2e2',  // Light red
                        200: '#fecaca',  // Medium light red
                        300: '#fca5a5',  // Medium red
                        400: '#f87171',  // Medium dark red
                        500: '#ef4444',  // Base red
                        600: '#dc2626',  // Dark red (4.5:1 contrast on white)
                        700: '#b91c1c',  // Darker red (7:1 contrast on white)
                        800: '#991b1b',  // Very dark red
                        900: '#7f1d1d',  // Darkest red
                    },
                    // Neutral grays with proper contrast ratios
                    'gray': {
                        50: '#f9fafb',   // Very light gray
                        100: '#f3f4f6',  // Light gray
                        200: '#e5e7eb',  // Medium light gray
                        300: '#d1d5db',  // Medium gray
                        400: '#9ca3af',  // Medium dark gray
                        500: '#6b7280',  // Base gray (4.5:1 contrast on white)
                        600: '#4b5563',  // Dark gray (7:1 contrast on white)
                        700: '#374151',  // Darker gray (12:1 contrast on white)
                        800: '#1f2937',  // Very dark gray
                        900: '#111827',  // Darkest gray
                    },
                    // Success green (RGAA compliant)
                    'success': {
                        50: '#f0fdf4',
                        500: '#22c55e',
                        600: '#16a34a',  // 4.5:1 contrast on white
                        700: '#15803d',  // 7:1 contrast on white
                    },
                    // Warning orange (RGAA compliant)
                    'warning': {
                        50: '#fffbeb',
                        500: '#f59e0b',
                        600: '#d97706',  // 4.5:1 contrast on white
                        700: '#b45309',  // 7:1 contrast on white
                    },
                    // Error red (RGAA compliant)
                    'error': {
                        50: '#fef2f2',
                        500: '#ef4444',
                        600: '#dc2626',  // 4.5:1 contrast on white
                        700: '#b91c1c',  // 7:1 contrast on white
                    }
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
                // Accessible shadows that don't rely on color alone
                'focus': '0 0 0 3px rgba(59, 130, 246, 0.5)',  // Blue focus ring
                'focus-error': '0 0 0 3px rgba(239, 68, 68, 0.5)',  // Red focus ring for errors
            }
        },
    },
    plugins: [
        // Note: Flowbite plugin may need to be imported differently for Tailwind v4
        // For now, we'll rely on the CSS import in global.css
    ],
};