# EnvHub Uganda Blocks — WordPress theme + full site export

A WordPress block theme (Full Site Editing) that mirrors the Environmental Hub
Uganda site, plus a demo-content file that recreates every page, blog post and
menu inside WordPress.

Everything imported stays editable in the WordPress block editor.

## What is included

- `theme.json` — global settings: colour palette, typography, spacing, layout widths
- `templates/` — home, blog index, single post, page, 404, search
- `parts/` — header (logo + navigation) and footer (contact details, links, socials)
- `patterns/` — reusable sections (hero, mission, activities, director's message…)
- `assets/img/` — the site images
- `demo/envhub-demo-content.xml` — all 9 pages, the blog posts, the header menu
  ("Primary") and the footer menu ("Footer")

## Install (10 minutes)

1. **Theme** — WordPress admin → Appearance → Themes → Add New → Upload Theme →
   choose `envhub-blocks-theme.zip` → Install → Activate.
2. **Content** — Tools → Import → WordPress (install the importer if prompted) →
   upload `demo/envhub-demo-content.xml` → assign the author to your user →
   tick **Download and import file attachments** → Submit.
3. **Front page** — Settings → Reading → "A static page" → Homepage = **Home**,
   Posts page = **Blog**.
4. **Menus** — Appearance → Editor → Patterns → Header. Select the Navigation
   block → in the sidebar choose the imported **Primary** menu. Do the same in
   the Footer part with the **Footer** menu if you want it there.
5. **Site identity** — Settings → General for the site title and tagline;
   Appearance → Editor → Styles for colours, fonts and spacing; upload the logo
   in the Header part (Site Logo block).
6. **Permalinks** — Settings → Permalinks → "Post name" → Save.

## Keeping WordPress in sync with the Lovable site

The export is generated from the live database, so it always matches what you
see on the React site:

```bash
python3 wordpress-theme/tools/fetch-cms-snapshot.py       # pull live content
python3 wordpress-theme/tools/generate-demo-content.py \
        envhub-demo-content.xml                            # rebuild the XML
```

Re-run the WordPress import with the new file to refresh the content
(WordPress skips items it has already imported, so change slugs or delete the
old pages first if you want a clean re-import).

## Notes

- Contact form: WordPress has no built-in form block — add Contact Form 7,
  Fluent Forms or WPForms and drop the form block onto the Contact page.
- Images referenced in the export are pulled from the theme's `assets/img`
  folder; the importer copies them into the Media Library.
