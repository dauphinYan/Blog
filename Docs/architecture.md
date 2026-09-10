# Project Architecture

## Structure

- `src/pages`: Astro route entry points.
- `src/components`: reusable presentation components.
- `src/data`: portfolio content, blog placeholders, and asset references.
- `src/content/blog`: local Markdown blog sources and their publishing template.
- `src/styles`: global visual system and page-specific styles.
- `src/assets`: Astro-managed static images, grouped into `projects`, `icons`, and `profile`.
- `Docs/project-content.md`: source profile and project copy used to establish the portfolio content.

## Home Page Layout

`src/pages/index.astro` composes the hero, skills, projects, blog, profile, and contact sections. Desktop content rows use a fixed 215px section-title column followed by a flexible content grid. The title column has `min-width: 0` so long labels do not enlarge the column and shift later grids horizontally. At widths of 720px or less, rows stack vertically. The blog row uses a two-column card grid on desktop and one column on mobile.

## Blog Content

`src/content.config.ts` defines the `blog` content collection with Astro's file glob loader. Every Markdown file in `src/content/blog` supplies a title, description, publication date, tags, and optional `draft` flag through frontmatter. `src/pages/blog/[slug].astro` filters drafts, statically generates one route per published file, and renders the Markdown body. The homepage reads the same collection, showing up to four published articles; `src/data/blog.ts` provides placeholders for empty slots.

Create an article by copying `src/content/blog/TEMPLATE.md`, renaming it to an English hyphenated slug, filling out the frontmatter, then removing `draft: true`. This keeps unpublished templates out of both the homepage and generated routes.

## Theme System

`src/styles/global.css` defines the shared surface, text, border, decoration, and shadow tokens. The `prefers-color-scheme: dark` media query replaces those tokens with a low-luminance paper surface, high-contrast text, and translucent light dividers; page-specific styles consume the same tokens. `index.astro` provides matching light and dark browser theme-color metadata.

## Image Delivery

The home hero uses the cropped `public/hero-art.webp`, preloaded from `index.astro` because it is an above-the-fold CSS background. Legacy project-art styles use individual cropped WebP files rather than the full reference composition. `public/reference.png` remains a design source and is not requested by the home page.

Images imported by page and data modules live in `src/assets`. Project assets use `src/assets/projects/<project-slug>/`; profile and skill images use `src/assets/profile/` and `src/assets/icons/`. Asset directories and filenames use lowercase kebab-case. Legacy images are imported with Vite's `?url` query so they are bundled without Astro image metadata processing; this is required because several sources lack decodable metadata. `projects/conan/` and `projects/seer-plan/` are retained as source material for future project pages and are not currently imported.
