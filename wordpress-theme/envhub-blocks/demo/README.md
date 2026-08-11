# Demo content

`envhub-demo-content.xml` is a standard WordPress import file (WXR). It recreates the whole
Environmental Hub Uganda site as editable block content — nothing is locked into PHP.

## What it creates

**Pages** (all built with core blocks, editable in the block editor)

| Page | Contents |
| --- | --- |
| Home | Hero cover, who we are, mission & vision, core activities, director's message, latest posts query, partners, CTA |
| About Us | Who we are, mission, vision, five core values, legal status, focus areas |
| Our Work | The four core activities with detail lists |
| Impact | Impact stats and five experience entries linking to the stories |
| Team & Governance | Legal status, leadership hierarchy, secretariat and project officers, staffing table (8 positions), accountability mechanisms |
| Get Involved | Four membership tiers, volunteer / partner / donate |
| Resources | FAQ accordion (Details blocks), statutory documents, publications |
| Blog | Page banner (posts are listed by the Blog template) |
| Contact | Contact details and a slot for your form block |

**Posts** — five articles with categories (Conservation, Education, Research, Innovation, Climate Finance).

**Menu** — a "Primary" menu containing every page except Home.

## Import steps

1. Install and activate the **EnvHub Uganda Blocks** theme first — the demo content references
   images shipped in the theme at `/wp-content/themes/envhub-blocks/assets/img/`.
2. **Tools → Import → WordPress** → install the importer if prompted → **Run Importer**.
3. Upload `envhub-demo-content.xml`, assign posts to an existing user, and click Submit.
   Leave "Download and import file attachments" unticked — images come from the theme.
4. **Settings → Reading** → *A static page*: Homepage = **Home**, Posts page = **Blog**.
5. **Appearance → Editor → Patterns → Header** → select the Navigation block and choose the
   imported **Primary** menu.
6. **Settings → Permalinks** → choose *Post name* so the page and post links resolve.

## Notes

- Every page is plain core-block markup — edit at **Pages → (page) → Edit**.
- Colours come from `theme.json` presets, so changing a colour in **Appearance → Editor → Styles**
  restyles the demo content too.
- The Contact page leaves a card for your form plugin's block; the site otherwise needs no plugins.
- Re-run `tools/generate-demo-content.py` in the project repo to regenerate this file.
