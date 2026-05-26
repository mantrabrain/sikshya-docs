---
title: Install Sikshya
description: Install the free Sikshya LMS plugin (and Sikshya Pro) on your WordPress site, then confirm everything is working.
---

# Install Sikshya

You install Sikshya LMS the same way you install any WordPress plugin — there is **no SaaS to sign up for**. Sikshya runs entirely on your own site.

**First time in WordPress?** After you activate the plugin, open **Sikshya** in the left sidebar and use [Your WordPress admin (Sikshya)](/admin-dashboard) as a plain-English map of every section.

## Before you start

Make sure your site meets these:

| What            | Minimum  | Recommended |
| ---             | ---      | ---         |
| WordPress       | 6.0      | 6.4 or newer |
| PHP             | 7.4      | 8.1 or newer |
| MySQL / MariaDB | 5.7 / 10.3 | MySQL 8 / MariaDB 11 |
| Memory          | 128 MB   | 256 MB or more |
| HTTPS           | Required to take live payments | Always recommended |

::: tip Not sure what your hosting has?
Open <span class="screen-path">Tools → Site Health → Info</span> in WordPress. The PHP and database versions are listed there.
:::

## Step 1 — Install the free plugin

The free **Sikshya LMS** plugin gives you a complete LMS — courses, lessons, quizzes, certificates, native checkout (PayPal), coupons, and learner dashboards.

You have three options:

<ol class="step-list">
  <li>The easy way — In WordPress, go to <span class="screen-path">Plugins → Add New</span>, search <strong>Sikshya LMS</strong>, click <strong>Install Now</strong>, then <strong>Activate</strong>.</li>
  <li>If you have the ZIP file — Go to <span class="screen-path">Plugins → Add New → Upload Plugin</span>, choose <code>sikshya.zip</code>, click <strong>Install Now</strong>, then <strong>Activate</strong>.</li>
  <li>The technical way — drop the <code>sikshya/</code> folder into <code>wp-content/plugins/</code> over SFTP, then activate from the Plugins screen.</li>
</ol>

When you activate, Sikshya does a one-time setup behind the scenes:

- Creates three new user roles (Sikshya Instructor, Sikshya Student, Sikshya Assistant).
- Creates the database tables for enrollments, orders, certificates, and progress tracking.
- Seeds the default email templates.

You'll see a new **Sikshya** item appear in the WordPress admin sidebar.

## Step 2 — Install Sikshya Pro

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Sikshya Pro is the upgrade plugin</span>
  </div>
  <p class="pro-callout__desc">Sikshya Pro is a separate plugin that unlocks licensed add-ons — Stripe, Razorpay, Mollie, Paystack, Square, Authorize.Net, Bank Transfer gateways; subscriptions; bundles; multi-instructor; gradebook; advanced certificates; drip; prerequisites; webhooks; marketplace; and more. The free plugin must be installed and active first.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya-lms/pricing/">View Sikshya Pro plans →</a>
</div>

If you bought a Pro license:

<ol class="step-list">
  <li>Make sure the free <strong>Sikshya LMS</strong> plugin is installed and active first. Sikshya Pro depends on it.</li>
  <li>Download <code>sikshya-pro.zip</code> from your Mantrabrain account.</li>
  <li>Go to <span class="screen-path">Plugins → Add New → Upload Plugin</span>, choose the ZIP, <strong>Install</strong>, and <strong>Activate</strong>.</li>
  <li>Open <span class="screen-path">Sikshya → License</span>. Paste your license key into <strong>License key</strong>, then click <strong>Save &amp; activate</strong>.</li>
  <li>Open <span class="screen-path">Sikshya → Add-ons</span> and turn on the add-ons your plan includes.</li>
</ol>

<div class="ui-tip"><strong>Tip:</strong> If you cloned the source from Git instead of downloading a release ZIP, run <code>composer install --no-dev --optimize-autoloader</code> from the <code>sikshya-pro</code> folder before activating.</div>

## Step 3 — Confirm Sikshya is healthy

Run this quick checklist before adding real content.

| Check                                                                              | Where                                              |
| ---                                                                                | ---                                                |
| The **Sikshya** item appears in the admin sidebar                                  | Admin sidebar                                      |
| Permalinks are not set to **Plain**                                                | <span class="screen-path">Settings → Permalinks</span> |
| Visiting `/wp-json/sikshya/v1/` returns JSON (not a 404)                           | Browser address bar                                |
| Visiting `/cart/` and `/checkout/` shows a page (even if empty)                    | Front of your site                                 |
| **License** says **Active** <span class="pro-pill">PRO</span>                      | <span class="screen-path">Sikshya → License</span> |

If any of these are red, head over to [Troubleshooting](/troubleshooting).

## Multisite

Sikshya is **Network: true** — it can be activated across a WordPress multisite network.

<ol class="step-list">
  <li>Place the <code>sikshya/</code> (and <code>sikshya-pro/</code>) folder into <code>wp-content/plugins/</code>.</li>
  <li>Go to <span class="screen-path">Network Admin → Plugins</span> and choose <strong>Network Activate</strong>.</li>
  <li>Visit each subsite once to let Sikshya create that subsite's tables and roles.</li>
  <li>Activate the Pro license per subsite (one license slot each by default).</li>
</ol>

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Multisite license tools</span>
  </div>
  <p class="pro-callout__desc">If you run a network with many subsites, the <strong>Multisite &amp; network license tools</strong> add-on (Scale plan) helps you manage license slots across the network.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya-lms/pricing/">See Scale plan →</a>
</div>

## What's next

- Run the [Quick start](/quick-start) — picks pages, currency, and gateways and gets you to your first published course in under an hour.
- Or jump straight to [Courses & curriculum](/courses) to start building.
