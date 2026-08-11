# EnvHub Uganda — WordPress theme

A classic PHP theme matching the EnvHub Uganda site design (hero carousel, about/director,
services, FAQs, blog, partners, contact) with no page builder and no required plugins.

## Install

1. Zip the `envhub` folder (the zip must contain the folder, not its loose files):
   `zip -r envhub.zip envhub`
2. WordPress admin → Appearance → Themes → Add New → Upload Theme → choose the zip → Install → Activate.

## Set it up

- **Front page**: Settings → Reading → "A static page" → pick a page as Homepage
  (any page; `front-page.php` renders the design), and pick another page as Posts page for the blog.
  Leaving it on "Your latest posts" also works — the homepage design still shows.
- **Menus**: Appearance → Menus → create a menu with the anchors `#hero`, `#about`, `#services`,
  `#faqs`, `#blog`, `#contact` (Custom Links) and assign it to *Primary menu* and *Footer links*.
  Without a menu, the theme falls back to those six links automatically.
- **Logo, title, tagline**: Appearance → Customize → Site Identity.
- **About / director, mission, vision**: Appearance → Customize → *Homepage: About*.
- **Address, email, phone, donate link, social URLs**: Appearance → Customize → *Contact & social*.

## Editable content types

New admin menus are added by the theme:

| Menu | Use |
| --- | --- |
| Hero Slides | Title = heading, content = paragraph, featured image = background, side box = button label/URL |
| Services | Title, content, and an icon picker (leaf, shield, sprout, mountain, users, flask) |
| FAQs | Title = question, content = answer |
| Partners | Title = name, featured image = logo (falls back to the name as text) |
| Posts | Standard WordPress posts feed the Blog section and archive |

Order items with the *Order* field under Page Attributes. If a type is empty, the theme shows the
original demo content so the homepage never looks broken.

## Contact form

Posts to `admin-post.php`, verifies a nonce, includes a honeypot field, and emails the address set in
Customize → Contact & social (falling back to the admin email) via `wp_mail()`. For reliable delivery
on shared hosting, add an SMTP plugin such as WP Mail SMTP.

## Images

`assets/img/` holds the demo hero and director photos. Replace them by uploading your own via
Hero Slides / Customizer — the files are only fallbacks.

## Notes

- Requires PHP 7.4+ and WordPress 6.0+.
- Styles live in `style.css` as plain CSS (no build step); design tokens are the `:root` variables at the top.
- Scripts live in `assets/js/theme.js` (sticky header, mobile nav, carousel, FAQ accordion) — vanilla JS, no jQuery.
