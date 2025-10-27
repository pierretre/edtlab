# Marianne Font Files

This directory contains the Marianne font family, which is the official typeface of the French government.

## Font Files Required

The following font files need to be downloaded and placed in this directory:

- `Marianne-Light.woff2` and `Marianne-Light.woff`
- `Marianne-Regular.woff2` and `Marianne-Regular.woff`
- `Marianne-Medium.woff2` and `Marianne-Medium.woff`
- `Marianne-Bold.woff2` and `Marianne-Bold.woff`
- `Marianne-ExtraBold.woff2` and `Marianne-ExtraBold.woff`

## Download Source

The official Marianne font files can be downloaded from:
https://www.systeme-de-design.gouv.fr/elements-d-interface/fondamentaux-techniques/typographie

## Font Weights

- Light: 300
- Regular: 400 (default)
- Medium: 500
- Bold: 700
- ExtraBold: 800

## Usage

The fonts are automatically loaded via `marianne.css` and configured in the Tailwind CSS configuration as the default sans-serif font family.

## Fallbacks

If Marianne fonts are not available, the system will fall back to:
1. Segoe UI (Windows)
2. Roboto (Android)
3. Helvetica Neue (macOS)
4. Arial (universal fallback)
5. Generic sans-serif

## Accessibility

The font configuration includes:
- `font-display: swap` for better loading performance
- Proper font weights for accessibility
- Fallback fonts for compatibility