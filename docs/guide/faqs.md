---
title: FAQs
description: Frequently asked questions about the Sikshya LMS WordPress plugin — free vs Pro, payments, themes, multisite, certificates, GDPR, multilingual, and more.
---

# Frequently asked questions

## General

### What is an LMS, in one sentence?

A **learning management system** is software that hosts your lessons, tracks who finished what, and often handles enrollment or payment — so you are not emailing PDFs and spreadsheets by hand.

### Is Sikshya LMS free?

Yes. The free plugin ships a complete LMS — courses, lessons, quizzes, assignments, certificates, native checkout with PayPal, coupons, orders, learner dashboards, and email notifications. **Sikshya Pro** adds licensed add-ons (drip, gradebook, subscriptions, premium gateways, marketplace, white label, etc.).

### Do I need coding skills?

No for day-to-day course building. Developers can extend Sikshya with WordPress hooks, filters, and the REST API.

### What's the difference between Sikshya and Sikshya Pro?

Sikshya is the free plugin. Sikshya Pro is a separate plugin that requires Sikshya to be installed first. Pro unlocks licensed add-ons and premium gateways.

### What's the URL structure?

- Catalog: `/courses/`
- Single course: `/{slug}/`
- Categories: `/course-category/{slug}/`, tags: `/course-tag/{slug}/`
- Cart: `/cart/`, Checkout: `/checkout/`, Order: `/order/`, Account: `/my-learning/`, Login: `/login/`, Learn hub: `/learn/`
- All slugs are configurable under **Sikshya → Settings → Permalinks**.

## Compatibility

### Does Sikshya work with any WordPress theme?

It is designed for broad theme compatibility. If layouts clash, briefly switch to a default theme (Twenty Twenty-Five) to isolate theme CSS. You can override any Sikshya template by copying it from `wp-content/plugins/sikshya/templates/` to `wp-content/themes/{theme}/sikshya/`.

### Does Sikshya work with the block editor?

Yes. In the WordPress block editor, use Shortcode blocks for `[sikshya_courses]`, `[sikshya_login]`, and `[sikshya_registration]`. Course pages and learner templates also work alongside block-based pages and FSE themes. See [Blocks & page builders](/guide/elementor-integration).

### Does Sikshya work with Elementor / Divi / Bricks / Oxygen?

Yes — all of them. Use a Posts widget targeting the `sik_course` custom post type, plus a Shortcode widget for the catalog or auth forms. See [Blocks & page builders](/guide/elementor-integration).

### Can I use WooCommerce or another cart instead?

The free core emphasizes native course checkout for speed and clarity. WooCommerce can run **alongside** Sikshya — see [WooCommerce co-existence](/guide/woocommerce-integration). Deeper Woo integration may appear in future Pro add-ons; check the product page.

### Is Sikshya multisite compatible?

Yes — the plugin header is `Network: true`. Each subsite has its own data. The Pro **Multisite & network license tools** add-on helps manage licenses across subsites.

## Selling courses

### How do I sell courses?

1. Create a paid course, set a price.
2. Connect **Stripe** and / or **PayPal** under **Sikshya → Settings → Payment**.
3. Run a test transaction with sandbox keys.
4. Switch to live keys and run one small live transaction.

### What payment gateways does the free plugin support?

**PayPal** is fully working in the free core. **Stripe** is registered in the gateway list but only goes live at checkout when a Pro license is active (it's gated by tier). Pro adds **Razorpay**, **Mollie**, **Paystack**, **Square**, **Authorize.Net**, and **Bank Transfer**, plus subscription support on Stripe / PayPal / Paystack.

### Does Sikshya support subscriptions or memberships?

Recurring subscriptions are part of the Pro **Subscriptions** add-on. The free tier focuses on one-time and free-course selling.

### Can I issue refunds?

You can mark an order as **refunded** in Sikshya, which revokes enrollment and writes the refund metadata. The actual money movement happens in the gateway dashboard. The "Try to refund automatically on unenroll" setting exists but reliability depends on the gateway adapter — process the refund in the gateway dashboard for safety, then mark refunded in Sikshya.

### How do coupons work?

The free plugin supports percentage or fixed discounts, redemption limits, and optional date windows. The Pro **Advanced coupons** add-on adds minimum cart total, exclusions, first-time-buyer rules, and stacking guards.

## Learners

### How do learners enroll?

- **Free courses:** sign in, click **Enroll**.
- **Paid courses:** sign in, add to cart, pay at checkout, get auto-enrolled.
- **Manual:** an admin or instructor enrolls them from **Sikshya → Enrollments → Add new**.

### What happens after a learner completes a course?

Sikshya marks the course as completed, fires `sikshya_course_completed`, issues a **certificate** (basic in free; advanced builder + QR in Pro), sends the **Course completed** and **Certificate issued** emails, and updates the account's progress.

### Can learners see only their own data?

Yes. Sikshya enforces capability checks at every REST handler. Learners get the `sikshya_student` role with capabilities scoped to their own enrollments, attempts, certificates, and account.

### Can I limit how many courses a free user takes?

Out of the box, no — free users can self-enroll on any free course. Use a custom check on the `sikshya_user_enrolled` action (or restrict via a membership plugin) if you need to throttle.

### Do you support drip / cohort programs?

The free plugin supports **sequential progression** (each lesson unlocks after the previous). For date-based, X-days, and cohort drip — plus drip notifications — use the Pro **Content drip** + **Drip notifications** add-ons.

## Quizzes & assessment

### What quiz types are supported?

Free: **multiple choice**, **true / false**, **short answer**. Pro **Advanced quiz types** adds question banks, randomization, and additional types.

### Do you support assignments?

Yes. The free core supports **basic assignments** with file uploads and pass/fail grading. The Pro **Advanced assignments** add-on adds rubrics, restricted file types, resubmissions, and a grading queue.

### Do you support a gradebook?

Yes — the Pro **Gradebook** add-on. It consolidates quiz scores and graded assignments into a per-learner / per-course view, with export and drilldown.

## Certificates

### Are certificates included?

Yes — the free plugin issues certificates on course completion using two starter templates (Regalia and Vertex). The Pro **Advanced certificates** add-on adds a drag-and-drop builder, more merge fields, and **QR code verification**.

### Can certificates be verified externally?

Yes (Pro). The QR code on the certificate links to a public verify URL: `GET /wp-json/sikshya/v1/public/certificates/verify?serial=...`. This works without authentication so anyone can verify a certificate's authenticity.

## Privacy, GDPR, data ownership

### Is my data shared with Mantrabrain?

No. Sikshya is self-hosted — every learner record, order, certificate, and quiz attempt lives in your WordPress database. Optional, opt-in **usage insights** can be enabled / disabled — disabled by default.

### Is Sikshya GDPR-compliant?

Sikshya is built on WordPress and stores user data in your own site. WordPress's standard **Tools → Export Personal Data** and **Erase Personal Data** flows work for Sikshya data. Use the standard cookie / consent plugin you already trust.

### How do I report a security vulnerability?

Email `mantrabrain@gmail.com` privately with details — please don't post exploit steps in public reviews. You can also use the [Mantrabrain contact page](https://mantrabrain.com/contact/) for coordinated disclosure.

## Translation & multilingual

### Can I translate Sikshya?

Yes. The text domain is `sikshya` (free) and `sikshya-pro` (Pro). Loco Translate, WPML, TranslatePress, Polylang, and Weglot all work with Sikshya.

### What about a multilingual catalog?

The Pro **Multilingual (WPML / Weglot)** add-on registers Sikshya strings for translation in WPML / Weglot — making multilingual course catalogs a first-class feature.

## Performance & scale

### How many courses / students can Sikshya handle?

There are no hardcoded limits. In practice, performance is driven by your hosting (PHP-FPM workers, MySQL configuration, page cache). The free plugin's catalog is well-cached at the page level. For 10k+ learners or heavy reporting, the Pro **Advanced analytics & exports** + **Enterprise reporting** add-ons + a managed-WordPress host or VPS is the right combination.

### Will Sikshya hurt my SEO?

Sikshya outputs normal WordPress pages and URLs. Use clear course titles, summaries, featured images, and internal links — same SEO habits as any WordPress site. Yoast / Rank Math / SEOPress all index Sikshya correctly.

## Developer

### Where's the REST API documentation?

See [REST API](/guide/api-reference). Routes live under `/wp-json/sikshya/v1/`.

### Where are the hooks and filters?

See [Hooks & filters](/guide/hooks-filters). Free + Pro share the same `sikshya_*` action / filter naming.

### Can I add my own custom add-on?

Yes — see [Pro add-ons → Adding a custom add-on](/guide/third-party-integrations#adding-a-custom-add-on-developer). Free or Pro both support custom add-ons via `sikshya_addons_registry`.

### Can I extend the database schema?

Yes — your custom tables can sit alongside Sikshya's. For new fields on existing entities (courses, lessons, enrollments), prefer post meta and user meta over schema changes. For high-volume custom data, register a new table via `dbDelta` and a small repository class.

## Pricing & support

### How does Sikshya relate to Sikshya Pro?

**Sikshya** (this plugin) is the free foundation. **Sikshya Pro** is a separate commercial add-on that unlocks advanced features and service levels. The two are designed to work together.

### Where can I get help or talk to other users?

- [Contact support](https://mantrabrain.com/contact/) — for account / technical issues.
- [Sikshya LMS Facebook Community](https://www.facebook.com/groups/sikshyalms/) — peer discussion.
- [WordPress.org support forum](https://wordpress.org/support/plugin/sikshya/) — public threads.
- [GitHub](https://github.com/MantraBrain) — bug reports and feature requests.

See [Support](/guide/support) for routing details.

## Related

- [Installation](/guide/installation)
- [Troubleshooting](/guide/troubleshooting)
- [Pro add-ons](/guide/third-party-integrations)
- [Support](/guide/support)
