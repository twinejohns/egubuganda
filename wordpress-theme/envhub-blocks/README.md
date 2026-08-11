# EnvHub Uganda Blocks — WordPress block theme

A full site editing (FSE) theme. Every part of the site — header, footer, homepage sections, page and post templates — is edited visually with the block editor. No page builder, no build step, no dependencies.

## Install

1. Zip the `envhub-blocks` folder (or use the provided zip).
2. WordPress admin → **Appearance → Themes → Add New → Upload Theme** → choose the zip → **Install** → **Activate**.
3. Requires WordPress 6.5+ and PHP 7.4+.

## Editing

- **Appearance → Editor** opens the site editor.
  - *Templates* — Front page, Blog, Single post, Page, Archive, Search, 404.
  - *Patterns → Template parts* — Header and Footer.
  - *Styles* — colours, typography and spacing (all defined in `theme.json`).
- **Pages → Add New** — write pages with blocks. Insert theme sections from the inserter under the **Environmental Hub Uganda** pattern category.

## Included patterns

| Pattern | Use |
| --- | --- |
| Hero banner | Full-width cover with headline and buttons |
| Mission and vision | Intro copy plus two accent cards |
| Core activities | Four programme cards |
| Director's message | Portrait plus message columns |
| Latest blog posts | Auto-updating 3-post grid |
| Partners and collaborators | Partner name grid |
| Call to action | Dark banner with two buttons |
| About Us page content | Who we are, mission, vision, core values |
| Contact details and form | Contact column plus form slot |

## Recommended setup

1. Create pages: Home, About Us, Our Work, Impact, Team & Governance, Get Involved, Resources, Blog, Contact.
2. **Settings → Reading** → static front page = Home, posts page = Blog.
3. **Appearance → Editor → Patterns → Header** → set the Navigation block to your menu.
4. Upload a logo in the site editor (Site Logo block in the header).
5. Add posts for the blog; the homepage grid picks up the three most recent automatically.

## Custom template

`Full width page` is available in the page sidebar under Template — it drops the dark title banner and lets the content run edge to edge.

## Colours

Defined as theme.json presets so they appear in every colour picker: Green `#2f7d4e`, Gold `#d69a3a`, Forest `#1f3229`, Light green `#eef4ef`, Muted `#6b7a70`, Border `#e2e8e4`.
