---
title: Changelog
description: Recent Sikshya LMS (free) and Sikshya Pro releases — what changed, what to test, and the safe upgrade path.
---

# Changelog

This page tracks user-relevant changes for **Sikshya** (free) and **Sikshya Pro**. Plugin metadata in `readme.txt` is the canonical source; this page mirrors the highlights in a single place.

## Sikshya (free)

### 1.0.3 — 2026-05-08

- **Readme refresh** for the WordPress.org plugin directory: SEO-oriented short description and tags; quick links (Mantrabrain documentation, demo, pricing, community); structured sections (At a glance, self-hosted LMS, FAQs including block editor and optional usage insights); third-party services and privacy disclosure aligned with docs.
- **Plugin listing title** aligned with WordPress plugin directory expectations.
- **Screenshot captions** tuned for LMS and checkout keywords.
- **Installation and security reporting** guidance clarified.
- **Plugin metadata:** version bump; default documentation URLs in Plugin API / admin bootstrap now point to `https://docs.mantrabrain.com/sikshya-wordpress-plugin/`.

**Upgrade notice:** Documentation and WordPress.org readme update — improved plugin directory copy, Mantrabrain documentation links, expanded FAQ, and privacy / third-party transparency. No breaking runtime changes expected; clear any full-page caches after update if your host caches plugin metadata.

### 1.0.2 — 2026-05-04

- **Admin (React shell):** Grading & submissions and gradebook screens — toolbar layout fixes so Course, Search, and Status filters align cleanly; contextual helper copy moved below the filter row; clearer sidebar icons for Gradebook and related entries.
- **Marketing:** Pro upgrade notice now uses "up to 50% off" instead of "50%+ OFF" for clearer, defensible wording (classic admin notice + in-app strip).
- **Public:** course category index and taxonomy routing improvements for a better category archive experience.
- **Build:** refreshed compiled admin JavaScript / CSS from current sources.

**Upgrade notice:** Maintenance and UX release — admin grading and gradebook toolbar layout, clearer Pro upgrade wording, course category archives, and refreshed admin assets. Safe to apply over 1.0.0.x; clear page caches if your host caches admin or theme assets.

### 1.0.0.1 — 2026-05-02

- **Certificate:** fixes for issues in the admin certificate designer (layout, editing, and related flows).
- **Build:** refreshed compiled admin React assets from the latest sources.

**Upgrade notice:** Maintenance release — certificate builder fixes and updated admin build assets. Safe to apply on top of 1.0.0; clear any full-page caches if your host caches admin scripts.

### 1.0.0 — 2026-04-30

- **Initial public release.**
- Core course, lesson, quiz, and question model with builder-oriented admin UI.
- Student and instructor roles with capability-safe management surfaces.
- Baseline commerce: Stripe / PayPal-oriented checkout, coupons, orders.
- Learner templates, account views, and progress-oriented flows.
- REST-aligned services where documented for integrations.
- Default certificate presets (Regalia & Vertex) ship without QR blocks; QR-style verification remains documented as a Pro-oriented enhancement.
- Requires PHP 7.4+ and WordPress 6.0+; tested on current stable WordPress releases.
- **Checkout (with Sikshya Pro Dynamic Checkout Fields):** optional server-rendered dynamic field markup — JavaScript attaches listeners and visibility without rebuilding the form in the browser; includes `CheckoutDynamicFieldsView` and refactored checkout helpers (`dfBindDynamicFields`, `dfSyncValuesFromHost`).

**Upgrade notice:** First stable release. Back up your site before production rollout; confirm permalinks, required pages, and payment keys after activation. Clear page caches if checkout forms are cached at the edge.

## Sikshya Pro

### 1.0.0 — 2026-04-30

- **Initial commercial release:** licensing, Pro add-ons, premium gateways, and automation built on the free Sikshya LMS core.
- **Dynamic Checkout Fields:** renders checkout dynamic field HTML in PHP using the free plugin's `Sikshya\Frontend\Site\CheckoutDynamicFieldsView` (use Sikshya LMS **1.0.0** with that class and the matching `checkout-page.js`). The checkout script binds events, syncs values, and applies conditional visibility instead of replacing server-rendered markup.

**Upgrade notice:** First release of Sikshya Pro for sites already running Sikshya LMS. Install Composer production dependencies before activation; keep Sikshya LMS updated alongside Pro.

## Upgrade strategy

### Always

1. **Back up** your site (database + plugins folder) before any major update.
2. **Update on staging** first when possible.
3. **Update Sikshya before Sikshya Pro** — Pro may depend on classes / methods introduced in a free release.
4. **Visit the admin** after update so any one-time migrations run via `Installer::activate()`.

### When updating Pro

- Read the Pro changelog for that release.
- Confirm your free plugin is at or above the version Pro requires.
- Run `composer install --no-dev --optimize-autoloader` if you cloned the source (distributed ZIPs are pre-built).
- Re-check **Sikshya → License → Re-check license** after the update.

### When updating Free

- Read the free changelog.
- Update Pro in the same window if a coupled change is mentioned.
- Visit a public course page and the learner account page in a private window — these are the highest-traffic flows.

## Versioning

Sikshya follows a `MAJOR.MINOR.PATCH` scheme:

- **MAJOR** — breaking changes (rare; expect a migration guide in this changelog).
- **MINOR** — new features, additions, deprecations.
- **PATCH** — bug fixes, security, documentation.

Pro tracks free's `MAJOR` baseline closely but ships its own `MINOR` / `PATCH` cadence for add-ons.

## Roadmap

The current roadmap is published on the [Mantrabrain product page](https://mantrabrain.com/plugins/sikshya/) and changelog notes mirror the public-facing items. Priority items for upcoming releases:

- **Free:** mobile-first lesson player polish, better course archive filters, additional default certificate presets.
- **Pro:** additional CRM / ESP integrations, deeper Zapier triggers, improved live class workflows, expanded marketplace tools.

## Related

- [Installation](/guide/installation) — confirm your version after update.
- [Troubleshooting](/guide/troubleshooting) — common post-update issues.
- [Support](/guide/support) — get help with a problematic update.
