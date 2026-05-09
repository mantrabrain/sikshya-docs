---
title: FAQs
description: Frequently asked questions about Sikshya LMS — Free vs Pro, payments, themes, multisite, certificates, GDPR, multilingual, and the most-asked LMS questions.
---

# Frequently asked questions

## General

### What is an LMS, in one sentence?

A **learning management system** is software that hosts your lessons, tracks who finished what, and often handles enrollment or payment — so you're not emailing PDFs and spreadsheets by hand.

### Is Sikshya LMS free?

Yes. The free plugin ships a complete LMS — courses, lessons, quizzes, assignments, certificates, native checkout with PayPal, coupons, orders, learner dashboards, and email notifications.

**Sikshya Pro** is a separate plugin that unlocks licensed add-ons (drip, gradebook, subscriptions, premium gateways, marketplace, white label, etc.). See [Pro add-ons](/third-party-integrations).

### Do I need coding skills?

No for day-to-day course building. Developers can extend Sikshya with [hooks and filters](/hooks-filters) and the [REST API](/api-reference).

### What's the difference between Sikshya and Sikshya Pro?

Sikshya is the free plugin. Sikshya Pro is a separate plugin that requires Sikshya to be installed first. Pro unlocks licensed add-ons and premium gateways.

### What URLs does Sikshya create?

| URL              | What it shows                       |
| ---              | ---                                 |
| `/courses/`      | Public course catalog               |
| `/{course-slug}/`| Single course page                  |
| `/cart/`         | Cart                                |
| `/checkout/`     | Checkout                            |
| `/my-learning/`  | Learner account                     |
| `/learn/`        | Learn hub (after enrolling)         |
| `/login/`        | Login form                          |
| `/order/`        | Order receipt                       |

You can rename any slug under <span class="screen-path">Sikshya → Settings → Permalinks</span>.

## Compatibility

### Does Sikshya work with any WordPress theme?

Yes — designed for broad theme compatibility. If layouts clash, briefly switch to a default theme (Twenty Twenty-Five) to isolate theme CSS. You can override any Sikshya template by copying it from `wp-content/plugins/sikshya/templates/` to `wp-content/themes/{theme}/sikshya/`.

### Does Sikshya work with the block editor?

Yes. Use Shortcode blocks for `[sikshya_courses]`, `[sikshya_login]`, and `[sikshya_registration]`. Course pages and learner templates work alongside block-based pages and FSE themes.

### Does Sikshya work with Elementor / Divi / Bricks / Oxygen?

Yes — all of them. Use a Posts widget targeting the `sik_course` post type, plus a Shortcode widget for catalog or auth forms. See [Blocks & page builders](/elementor-integration).

### Can I use WooCommerce instead?

The free core emphasizes native course checkout for speed and clarity. WooCommerce can run **alongside** Sikshya — see [WooCommerce co-existence](/woocommerce-integration).

### Is Sikshya multisite compatible?

Yes — `Network: true`. Each subsite has its own data. The Pro **Multisite & network license tools** add-on helps you manage licenses across subsites.

## Selling courses

### How do I sell courses?

<ol class="step-list">
  <li>Create a paid course, set a price.</li>
  <li>Connect <strong>PayPal</strong> (free) or <strong>Stripe / Razorpay / Mollie / Paystack / Square / Authorize.Net</strong> <span class="pro-pill">PRO</span> under <span class="screen-path">Sikshya → Settings → Payment</span>.</li>
  <li>Run a test transaction with sandbox keys.</li>
  <li>Switch to live keys.</li>
</ol>

See [Payments](/payment-settings) for the full guide.

### What payment gateways does the free plugin support?

The free plugin ships **PayPal** (fully working) and **Offline / manual** (admin marks orders paid). **Stripe is not in the free plugin** — Stripe is a Pro-only add-on, along with **Razorpay**, **Mollie**, **Paystack**, **Square**, **Authorize.Net**, and **Bank Transfer**. Activate Sikshya Pro and toggle the gateway on under <span class="screen-path">Sikshya → Add-ons</span>.

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Six premium gateways + bank transfer</span>
  </div>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Compare Sikshya Pro plans →</a>
</div>

### Does Sikshya support subscriptions?

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Recurring memberships</span>
  </div>
  <p class="pro-callout__desc">Recurring billing is part of the <strong>Subscriptions</strong> add-on (Growth tier). The free tier focuses on one-time and free-course selling.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Unlock subscriptions →</a>
</div>

### Can I issue refunds?

You can mark an order as **Refunded** in Sikshya, which revokes enrollment and writes the refund metadata. The actual money movement happens in the gateway dashboard. Refund first in the gateway dashboard, then mark refunded in Sikshya — that's the most reliable workflow.

### How do coupons work?

The free plugin supports percentage or fixed discounts, redemption limits, and optional date windows. The Pro **Advanced coupons** add-on adds minimum cart total, exclusions, first-time-buyer rules, and stacking guards. See [Enrollment & access](/enrollment-settings#coupons-free).

## Learners

### How do learners enroll?

- **Free courses:** sign in, click **Enroll**.
- **Paid courses:** sign in, add to cart, pay at checkout.
- **Manual:** an admin enrolls them from <span class="screen-path">People → Enrollments</span>.

### What happens after a learner completes a course?

Sikshya marks the course complete, fires `sikshya_course_completed`, issues a **certificate** (basic in free; advanced builder + QR in Pro), sends the **Course completed** + **Certificate issued** emails, and updates progress.

### Can learners see only their own data?

Yes. Capability checks are enforced everywhere. Learners get the `sikshya_student` role, scoped to their own enrollments, attempts, certificates, and account.

### Do you support drip / cohort programs?

The free plugin supports **sequential progression** (each lesson unlocks after the previous).

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Drip + drip notifications + prerequisites</span>
  </div>
  <p class="pro-callout__desc">Date-based, X-days, and cohort drip — plus "lesson unlocked" emails — live in the <strong>Content drip</strong>, <strong>Drip notifications</strong>, and <strong>Prerequisites</strong> add-ons.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Unlock drip &amp; cohorts →</a>
</div>

## Quizzes & assessment

### What quiz types are supported?

Free: **multiple choice**, **true / false**, **short answer**, **fill in the blank**.

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Question banks &amp; advanced quizzes</span>
  </div>
  <p class="pro-callout__desc">Question banks, randomization, random pools per learner, and advanced types are part of the <strong>Advanced quiz types</strong> add-on.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Unlock advanced quizzes →</a>
</div>

### Do you support assignments?

Yes — basic in free (file upload + pass / fail). Advanced (rubrics, restricted file types, resubmissions, grading queue) is the **Advanced assignments** + **Gradebook** Pro add-ons.

### Do you support a gradebook?

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Gradebook</span>
  </div>
  <p class="pro-callout__desc">The <strong>Gradebook</strong> add-on consolidates quiz scores and graded assignments into a per-learner / per-course view, with export and drilldown.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Unlock the gradebook →</a>
</div>

## Certificates

### Are certificates included?

Yes — the free plugin issues certificates on course completion using two presets (Regalia and Vertex).

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Advanced certificates with QR verification</span>
  </div>
  <p class="pro-callout__desc">The <strong>Advanced certificates</strong> add-on adds a drag-and-drop builder, more merge fields, and QR codes that link to a public verify page.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Unlock advanced certificates →</a>
</div>

### Can certificates be verified externally?

Yes (Pro). The QR code on the certificate links to a public verify URL (`/wp-json/sikshya/v1/public/certificates/verify?serial=...`). Anyone can verify a certificate without authentication.

## Privacy, GDPR, data ownership

### Is my data shared with Mantrabrain?

No. Sikshya is self-hosted — every learner record, order, certificate, and quiz attempt lives in your WordPress database. Optional, opt-in **usage insights** can be enabled / disabled (off by default).

### Is Sikshya GDPR-compliant?

Sikshya is built on WordPress and stores user data in your own site. WordPress's standard **Tools → Export Personal Data** and **Erase Personal Data** flows work for Sikshya data.

### How do I report a security vulnerability?

Email `mantrabrain@gmail.com` privately with details. Don't post exploit steps in public reviews.

## Translation

### Can I translate Sikshya?

Yes — text domain is `sikshya` (free) and `sikshya-pro` (Pro). Loco Translate, WPML, TranslatePress, Polylang, and Weglot all work.

### Multilingual catalog?

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Multilingual (WPML / Weglot)</span>
  </div>
  <p class="pro-callout__desc">The <strong>Multilingual</strong> add-on registers Sikshya strings for translation in WPML / Weglot.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Unlock multilingual →</a>
</div>

## Performance

### How many courses / students can Sikshya handle?

There are no hardcoded limits. Performance is driven by your hosting (PHP-FPM workers, MySQL configuration, page cache). For 10k+ learners and heavy reporting, the Pro **Advanced analytics & exports** + **Enterprise reporting** add-ons + a managed-WordPress host or VPS is the right combination.

### Will Sikshya hurt my SEO?

No. Sikshya outputs normal WordPress pages and URLs. Yoast / Rank Math / SEOPress all index Sikshya correctly.

## Developer

### Where's the REST API documentation?

[REST API](/api-reference). Routes live under `/wp-json/sikshya/v1/`.

### Where are the hooks and filters?

[Hooks & filters](/hooks-filters). Free + Pro share the same `sikshya_*` action / filter naming.

## Pricing & support

### Where can I get help?

- [Sikshya LMS Facebook Community](https://www.facebook.com/groups/sikshyalms/) — peer discussion.
- [WordPress.org support forum](https://wordpress.org/support/plugin/sikshya/) — public threads.
- [GitHub](https://github.com/MantraBrain) — bug reports.
- [Mantrabrain priority support](https://mantrabrain.com/contact/) — Pro license holders.

See [Support](/support) for routing details.
