---
title: Troubleshooting
description: Diagnose and fix the most common Sikshya LMS issues — REST 404s, permalinks, gateway sandbox mode, email deliverability, role / capability oddities, cache plugins, and PHP fatals.
---

# Troubleshooting

This page lists the issues we see most often and the fastest way through them.

## "REST returns 404 / nothing loads in the admin"

**Symptom:** The admin React shell shows blank panels; the network tab shows `404` for `/wp-json/sikshya/v1/...`.

**Cause:** Pretty permalinks are off, or a security plugin is blocking REST.

**Fix:**

<ol class="step-list">
  <li>Go to <span class="screen-path">Settings → Permalinks</span>. Pick <strong>Post name</strong> (or any non-Plain). Click <strong>Save Changes</strong>.</li>
  <li>Visit <code>/wp-json/sikshya/v1/</code> in a browser. You should see JSON, not 404.</li>
  <li>If you have <strong>Wordfence</strong>, <strong>iThemes Security</strong>, etc., temporarily allow <code>wp-json</code> for your IP.</li>
</ol>

## "Permalinks 404 on the front of the site"

**Symptom:** `/courses/`, `/cart/`, `/checkout/`, `/my-learning/` all return 404.

**Fix:** Open <span class="screen-path">Settings → Permalinks</span> and click **Save Changes** (no need to change anything; saving flushes rewrite rules). Or run `wp rewrite flush` via WP-CLI.

## "Stripe doesn't show up under Settings → Payment" <span class="pro-pill">PRO</span>

**Symptom:** PayPal is listed, but you can't find Stripe — or you see only an "Upgrade to enable" prompt where Stripe should appear.

**Cause:** **Stripe is a Pro-only add-on** — it isn't bundled with the free Sikshya plugin. The gateway list under <span class="screen-path">Settings → Payment</span> only contains the gateways your Pro license unlocks.

**Fix:**

<ol class="step-list">
  <li>Install Sikshya Pro alongside the free plugin and activate your license under <span class="screen-path">Sikshya → License</span>.</li>
  <li>Open <span class="screen-path">Sikshya → Add-ons</span>, find <strong>Stripe</strong>, and toggle it on.</li>
  <li>Stripe now appears under <span class="screen-path">Sikshya → Settings → Payment</span> — paste your keys and webhook secret.</li>
</ol>

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Unlock Stripe + 5 more gateways</span>
  </div>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Compare Pro plans →</a>
</div>

## "PayPal webhook shows but no order is fulfilled"

**Symptom:** PayPal logs show 200 from your site, but the order stays **pending**.

**Cause:** Webhook ID mismatch (sandbox vs live), missing client id / secret, or REST routes blocked by security.

**Fix:**

<ol class="step-list">
  <li>Open <span class="screen-path">Sikshya → Settings → Payment → PayPal</span>. Confirm <strong>Mode</strong> matches the webhook (sandbox vs live), and <strong>Webhook ID</strong> matches the PayPal dashboard.</li>
  <li>Confirm REST is reachable — visit <code>/wp-json/sikshya/v1/webhooks/paypal</code> (you should get a 405 method-not-allowed for a GET, not a 403).</li>
  <li>Check <span class="screen-path">Tools → Activity log</span> for webhook errors.</li>
</ol>

## "Stripe webhook signature mismatch"

**Symptom:** Stripe says webhook delivery failed; Sikshya logs say "invalid signature".

**Cause:** Webhook secret in Sikshya doesn't match Stripe's webhook signing secret.

**Fix:**

<ol class="step-list">
  <li>In Stripe → <strong>Developers → Webhooks</strong> → click your endpoint → <strong>Reveal secret</strong> under <strong>Signing secret</strong> (<code>whsec_...</code>).</li>
  <li>Paste it into <span class="screen-path">Sikshya → Settings → Payment → Stripe → Webhook secret</span>.</li>
  <li>Save. Re-send a test event in Stripe.</li>
</ol>

## "Emails aren't arriving"

**Symptom:** No enrollment / receipt / completion emails reach the learner.

**Fix:**

<ol class="step-list">
  <li>Install a transactional email plugin: <strong>WP Mail SMTP</strong>, <strong>FluentSMTP</strong>, or <strong>Post SMTP</strong>.</li>
  <li>Connect to a transactional ESP: SendGrid, Postmark, Amazon SES, Mailgun.</li>
  <li>Set <strong>From name</strong> and <strong>From email</strong> to a <code>noreply@</code> on your sending domain.</li>
  <li>Configure <strong>SPF</strong>, <strong>DKIM</strong>, and <strong>DMARC</strong> on the From domain.</li>
  <li>Test deliverability via <a href="https://www.mail-tester.com/">mail-tester.com</a>.</li>
</ol>

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Professional email delivery</span>
  </div>
  <p class="pro-callout__desc">The Pro <strong>Professional email delivery &amp; branded templates</strong> add-on streamlines ESP setup with a guided UI and adds a branded multi-template kit.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Unlock branded delivery →</a>
</div>

## "Apply to teach doesn't grant the role"

**Symptom:** A user submits the instructor application but doesn't get the `sikshya_instructor` role automatically.

**Cause:** This is by design. Applications are recorded as **pending** — an admin must approve them.

**Fix:** Go to <span class="screen-path">Sikshya → People → Applications</span> and click **Approve**.

## "Setup wizard never finishes"

**Symptom:** After activation, you can't get past the setup wizard.

**Fix:**

<ol class="step-list">
  <li>Make sure your account has <code>manage_options</code>.</li>
  <li>Disable WAF / Security plugins temporarily, run the wizard, re-enable.</li>
  <li>If still stuck: open <span class="screen-path">Sikshya → Tools → Maintenance → Open setup wizard</span> to re-run.</li>
</ol>

## "I deactivated Pro and lost some data"

**Symptom:** After turning off Sikshya Pro, gradebook / drip / advanced certificates disappear.

**Cause:** Pro features render only when their add-on is on. **Stored data is preserved.**

**Fix:** Re-enable the add-on under <span class="screen-path">Sikshya → Add-ons</span> to bring back the UI.

## "Course content shows but progression is locked"

**Symptom:** A learner is enrolled but can't open the next lesson.

**Cause:** Sequential progression is on (default in free) and a previous lesson hasn't been completed; or a Pro **drip** or **prerequisite** rule applies.

**Fix:** Have the learner mark the current lesson complete. Or, as admin, manually mark lessons complete.

## "Cache plugin breaks checkout / login"

**Symptom:** Login form keeps showing logged-out state; checkout looks blank.

**Cause:** Page cache is serving the logged-out version of a session-specific page.

**Fix:** Exclude these from your page cache:

- `/cart/`, `/checkout/`, `/my-learning/`, `/learn/`, `/order/`, `/login/`
- `/wp-json/sikshya/v1/checkout/*`, `/wp-json/sikshya/v1/me/*`

## "PHP fatal errors after enabling Pro"

**Symptom:** White screen of death right after activating Sikshya Pro.

**Cause:** Mismatched plugin versions, or Pro was activated before Free.

**Fix:**

<ol class="step-list">
  <li>Add <code>define('WP_DEBUG', true); define('WP_DEBUG_LOG', true);</code> to <code>wp-config.php</code>.</li>
  <li>Re-read the error in <code>wp-content/debug.log</code>.</li>
  <li>Update both plugins to the latest versions.</li>
  <li>Activate Sikshya <strong>first</strong>, then Sikshya Pro.</li>
</ol>

## "I'm on a case-sensitive Linux host and templates don't load"

**Symptom:** A template override in your theme isn't picked up.

**Cause:** macOS dev is case-insensitive; production Linux is case-sensitive. A template with the wrong case in the path silently fails.

**Fix:** Match Sikshya's exact casing — `templates/single-course.php`, `templates/partials/courses/card.php`, etc.

## "REST returns 403 for an admin user"

**Symptom:** Admin REST routes return `rest_forbidden`.

**Cause:** Cookie session expired, missing `X-WP-Nonce`, or a role plugin removed a capability.

**Fix:**

<ol class="step-list">
  <li>Refresh the WordPress admin page (re-issues a fresh nonce).</li>
  <li>Confirm your user has <code>manage_sikshya</code> and <code>sikshya_access_admin_app</code>.</li>
  <li>Check that a role plugin (Members, User Role Editor) didn't remove those caps from administrator.</li>
</ol>

## "Pro license shows valid in Mantrabrain dashboard but Sikshya says invalid"

**Symptom:** Account dashboard says **Active**; <span class="screen-path">Sikshya → License</span> says invalid.

**Cause:** License key activated on too many sites, or the site URL differs (`www.` mismatch).

**Fix:**

<ol class="step-list">
  <li>Open the Mantrabrain account dashboard and confirm site limits.</li>
  <li>Deactivate old / dev URLs.</li>
  <li>Click <strong>Check status</strong> in <span class="screen-path">Sikshya → License</span>.</li>
</ol>

## Diagnostics tools

- <span class="screen-path">Sikshya → Tools → System status</span> — PHP, WP, server, plugin versions.
- <span class="screen-path">Sikshya → Tools → Maintenance</span> — clear cache, reset settings, import sample data.
- <span class="screen-path">Sikshya → Tools → Activity log</span> <span class="pro-pill">PRO</span> — webhook + email + general logs.

## When to file a bug

Before filing, please:

<ol class="step-list">
  <li>Update both Sikshya and Sikshya Pro to the latest.</li>
  <li>Disable other plugins one by one to rule out conflicts.</li>
  <li>Switch to a default theme briefly to rule out theme conflicts.</li>
  <li>Capture the exact steps + a <code>WP_DEBUG</code> log of the error.</li>
</ol>

Then [file a bug on GitHub](https://github.com/MantraBrain) (free) or open a [priority support ticket](https://mantrabrain.com/contact/) (Pro).

## What's next

- [Installation](/installation)
- [Payments](/payment-settings)
- [Email & notifications](/email-settings)
- [Support](/support)
