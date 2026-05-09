---
title: Blocks & page builders
description: Use Sikshya LMS with the WordPress block editor (Gutenberg), Elementor, Divi, Beaver Builder, and other page builders via shortcodes, dynamic templates, and CPT-aware widgets.
---

# Blocks & page builders

Sikshya was built to **cooperate** with WordPress page builders — not replace them. Course content lives in standard custom post types (`sik_course`, `sik_lesson`, `sik_quiz`), so any builder that knows about WordPress posts can render Sikshya content. Below is a per-builder cheat sheet.

## Block editor (Gutenberg)

Sikshya does not (yet) ship a dedicated Sikshya block. Use the built-in **Shortcode block**:

1. Add a new **Shortcode** block.
2. Paste any of the [Sikshya shortcodes](/guide/shortcodes):

   ```text
   [sikshya_courses per_page="6" columns="3"]
   [sikshya_login]
   [sikshya_registration redirect_to="/my-learning/"]
   ```

3. Preview the page — the block renders the same HTML as on the live front-end.

For full-site editing themes (FSE / `theme.json`), Sikshya respects your theme's color palette, typography, and width settings inside its templates.

## Elementor

The free Elementor builder works well with Sikshya:

- **Shortcode widget** — drop in `[sikshya_courses ...]` for a course grid, or `[sikshya_login]` / `[sikshya_registration]` for auth forms.
- **Posts widget** — set the **Source** to **Posts** and **Post Type** to **Courses** (`sik_course`). You then style cards with Elementor's design controls.
- **Theme builder** — for Pro Elementor users, build a **Single Course** template. Use the Posts widget to render the course title, content, featured image, taxonomies, and a Shortcode widget for the enroll/buy CTA.
- **Loop Grid** — also works with `sik_course` as the source post type.

> Elementor's "Theme Builder" override on **Single Course** can collide with Sikshya's `single-course.php` template. If you go this route, copy any Sikshya partials you still want (curriculum preview, reviews, enroll button) into Elementor blocks, or use the Shortcode widget to embed `[sikshya_courses]` filtered to a single course.

The Pro **Multi-instructor** add-on is also fully composable in Elementor — instructor data is on the `sikshya_instructor` user role and accessible via author dynamic tags.

## Divi

Divi is supported via:

- **Code Module** (or plain text shortcode) — paste any Sikshya shortcode.
- **Theme Builder** — assign a Divi template to **Sikshya Courses** (CPT). Add a **Post Title**, **Post Content**, **Post Tags**, and a **Code Module** with `[sikshya_courses category="..."]`.
- **Blog module** — set **Post Type** to **`sik_course`** to render a Divi-styled grid.

If you let Divi take over the course archive entirely, you may want to disable Sikshya's archive template by overriding it in your theme — see Templating below.

## Beaver Builder, Bricks, Oxygen

These builders all support custom post types out of the box:

- Use a **Posts** module / element with the post type set to `sik_course`.
- Use a **Shortcode** module for the auth forms and the catalog grid.
- Use **Dynamic Data** to bind to course meta (price, difficulty, instructor) for designer-controlled cards.

## Templating override (the universal escape hatch)

Every builder lets you fall back to Sikshya's own templates by simply not overriding them. Sikshya templates live in `wp-content/plugins/sikshya/templates/`. To customize a template without touching the plugin:

```bash
mkdir -p wp-content/themes/{your-theme}/sikshya/partials/courses
cp wp-content/plugins/sikshya/templates/partials/courses/card.php \
   wp-content/themes/{your-theme}/sikshya/partials/courses/card.php
```

Sikshya looks in your theme's `sikshya/` folder first and falls back to the plugin defaults. This is how a **theme** can ship a tailored design without locking you into a builder.

## Frequently used templates

| Path                                              | Purpose                                          |
| ---                                               | ---                                              |
| `templates/single-course.php`                     | Single course page                               |
| `templates/archive-sik_course.php`                | Main `/courses/` archive                         |
| `templates/courses/index.php`                     | Catalog wrapper used by the shortcode + archive  |
| `templates/courses-grid.php`                      | Grid layout                                      |
| `templates/partials/courses/card.php`             | Course card (the unit you'll restyle most often) |
| `templates/taxonomy-course-category.php`          | Category archive                                 |
| `templates/taxonomy-course-category-root.php`     | Top-level category index                         |
| `templates/taxonomy-course-tag.php`               | Tag archive                                      |
| `templates/learn.php`                             | Learn hub shell (course player)                  |
| `templates/single-lesson.php`, `single-quiz.php`  | Theme CPT templates                              |
| `templates/checkout.php`, `cart.php`, `order.php` | Commerce screens                                 |
| `templates/account.php`                           | Learner account shell                            |
| `templates/login.php`                             | Virtual login page                               |

## CSS / theme compatibility

Sikshya targets broad theme compatibility but designs against a **default WordPress theme**. If something looks off, switch your site to **Twenty Twenty-Five** to isolate theme CSS. Common issues we see:

- Themes that force `box-shadow: none !important` on every card.
- Themes that disable padding on `.entry-content` (Sikshya's templates rely on it).
- Themes that override `.button` styles too aggressively for the **Enroll** / **Buy** CTAs.

Most of these are 5-line fixes in your child theme stylesheet.

## Caching, CDN, image plugins

The catalog partials cache well at the page level. Caveats:

- Exclude `/cart/`, `/checkout/`, `/my-learning/`, `/order/`, and `/learn/` from full-page caching.
- Bypass cache for logged-in users on course pages (so progress is accurate).
- Lazy-loading images is fine; the cards include explicit width/height for CLS.
- WebP via image plugins (ShortPixel, EWWW) works without changes.

## Translation plugins

Sikshya's text domain is `sikshya`. Use:

- **Loco Translate** for in-WordPress translation editing.
- **WPML** for fully multilingual catalogs (course content + UI strings) — see the **Multilingual** Pro add-on for Sikshya-aware string registrations.
- **TranslatePress / Weglot / GTranslate** for site-level translation overlays.

## SEO plugins

Sikshya's CPT and templates are SEO-friendly out of the box (clean URLs, proper title hierarchy, meta description hooks). Yoast SEO, Rank Math, and SEOPress all index Sikshya courses correctly. Add a course-specific `description` and `featured image` to fill OG / Twitter cards.

## Multisite

Sikshya is `Network: true`. On multisite:

- Activate per-subsite or network-activate.
- Each subsite has its own DB tables, courses, learners, and orders.
- The Pro **Multisite & network license tools** (Scale band) help manage licenses across subsites.

## Related

- [Shortcodes](/guide/shortcodes) — full reference.
- [WooCommerce co-existence](/guide/woocommerce-integration).
- [Pro add-ons](/guide/third-party-integrations).
