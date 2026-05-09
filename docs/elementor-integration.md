---
title: Blocks & page builders
description: Use Sikshya with the WordPress block editor (Gutenberg), Elementor, Divi, Bricks, and Oxygen — through shortcodes, dynamic templates, and CPT-aware widgets.
---

# Blocks & page builders

Sikshya is built to **cooperate** with WordPress page builders, not replace them. Course content lives as standard custom post types (`sik_course`, `sik_lesson`, `sik_quiz`), so any builder that knows about WordPress posts can render Sikshya content. Below is a per-builder cheat sheet.

## Block editor (Gutenberg)

Sikshya doesn't ship a dedicated Sikshya block yet — use the built-in **Shortcode block**:

<ol class="step-list">
  <li>Add a new <strong>Shortcode</strong> block.</li>
  <li>Paste any of the <a href="/shortcodes">Sikshya shortcodes</a>:</li>
</ol>

```text
[sikshya_courses per_page="6" columns="3"]
[sikshya_login]
[sikshya_registration redirect_to="/my-learning/"]
```

For full-site editing (FSE) themes, Sikshya respects your theme's color palette, typography, and width settings inside its templates.

## Elementor

Free Elementor works well with Sikshya:

- **Shortcode widget** — drop in `[sikshya_courses ...]` for a course grid, or the auth shortcodes.
- **Posts widget** — set the **Source** to **Posts** and **Post Type** to **Courses**. You then style cards with Elementor's controls.
- **Loop Grid** — works with `sik_course` as the source post type.

Pro Elementor users can build a full **Single Course** template via the Theme Builder, using the Posts widget for title, content, image, and a Shortcode widget for the **Enroll** CTA.

## Divi

Divi is supported via:

- **Code Module** for shortcodes.
- **Theme Builder** — assign a Divi template to **Sikshya Courses** custom post type.
- **Blog module** — set **Post Type** to `sik_course` for a Divi-styled grid.

## Beaver Builder, Bricks, Oxygen

These builders all support custom post types out of the box:

- Use a **Posts** module / element with the post type set to `sik_course`.
- Use a **Shortcode** module for the auth forms and the catalog grid.
- Use **Dynamic Data** to bind to course meta (price, difficulty, instructor) for designer-controlled cards.

## Templating override (the universal escape hatch)

Every Sikshya template can be overridden by your theme. Sikshya looks in `wp-content/themes/{your-theme}/sikshya/` first and falls back to the plugin defaults.

To customize a course card:

```bash
mkdir -p wp-content/themes/your-theme/sikshya/partials/courses
cp wp-content/plugins/sikshya/templates/partials/courses/card.php \
   wp-content/themes/your-theme/sikshya/partials/courses/card.php
```

Then edit the copy in your theme. Plugin updates won't overwrite it.

### Frequently overridden templates

| Path (under `templates/`)                         | What it renders                              |
| ---                                               | ---                                          |
| `single-course.php`                               | Single course page                           |
| `archive-sik_course.php`                          | Main `/courses/` archive                     |
| `partials/courses/card.php`                       | Course card (the most-styled file)           |
| `learn.php`                                       | Learn hub shell (lesson player)              |
| `checkout.php`, `cart.php`, `order.php`           | Commerce screens                             |
| `account.php`                                     | Learner account shell                        |
| `login.php`                                       | Virtual login page                           |

## CSS / theme compatibility

Sikshya targets broad theme compatibility but is designed against a **default WordPress theme**. If something looks off, briefly switch to **Twenty Twenty-Five** to isolate theme CSS. Common issues:

- Themes that force `box-shadow: none !important` on every card.
- Themes that disable padding on `.entry-content`.
- Themes that override `.button` styles too aggressively.

Most are 5-line fixes in your child theme.

## Caching, CDN, image plugins

Catalog partials cache well at the page level. Caveats:

- Exclude `/cart/`, `/checkout/`, `/my-learning/`, `/order/`, and `/learn/` from full-page caching.
- Bypass cache for logged-in users on course pages (so progress is accurate).
- Lazy-loading images is fine — cards include explicit width/height for CLS.
- WebP via image plugins (ShortPixel, EWWW) works without changes.

## Translation plugins

Sikshya's text domain is `sikshya`.

- **Loco Translate** — in-WordPress translation editing.
- **WPML** — multilingual catalogs (course content + UI strings). The Pro **Multilingual** add-on registers Sikshya strings with WPML String Translation.
- **Polylang** — register CPTs / taxonomies in Polylang settings; Polylang manages translations.
- **TranslatePress / Weglot / GTranslate** — site-wide translation overlays.

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Multilingual (WPML / Weglot)</span>
  </div>
  <p class="pro-callout__desc">Bridge Sikshya's interface strings into WPML or Weglot translation stacks for fully multilingual catalogs.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Unlock multilingual →</a>
</div>

## SEO plugins

Yoast SEO, Rank Math, and SEOPress all index Sikshya courses correctly. Sikshya's CPT and templates are SEO-friendly out of the box (clean URLs, proper title hierarchy, meta description hooks).

## Multisite

Sikshya is `Network: true`. Each subsite gets its own data. The Pro **Multisite & network license tools** (Scale band) helps you manage licenses across subsites.

## What's next

- [Shortcodes](/shortcodes) — every shortcode attribute.
- [WooCommerce co-existence](/woocommerce-integration).
- [Pro add-ons](/third-party-integrations).
