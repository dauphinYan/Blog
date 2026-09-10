# Project Architecture

## Structure

- `src/pages`: Astro route entry points.
- `src/components`: reusable presentation components.
- `src/data`: portfolio content and asset references.
- `src/styles`: global visual system and page-specific styles.

## Home Page Layout

`src/pages/index.astro` composes the hero, skills, projects, profile, and contact sections. Desktop content rows use a fixed 215px section-title column followed by a flexible content grid. The title column has `min-width: 0` so long labels do not enlarge the column and shift later grids horizontally. At widths of 720px or less, rows stack vertically.

## Theme System

`src/styles/global.css` defines the shared surface, text, border, decoration, and shadow tokens. The `prefers-color-scheme: dark` media query replaces those tokens with a low-luminance paper surface, high-contrast text, and translucent light dividers; page-specific styles consume the same tokens. `index.astro` provides matching light and dark browser theme-color metadata.

## Image Delivery

The home hero uses the cropped `public/hero-art.webp`, preloaded from `index.astro` because it is an above-the-fold CSS background. Legacy project-art styles use individual cropped WebP files rather than the full reference composition. `public/reference.png` remains a design source and is not requested by the home page.
