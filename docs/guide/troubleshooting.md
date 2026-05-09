---
title: Troubleshooting
description: Diagnose and fix common Sikshya LMS issues — REST 404s, permalinks, gateway sandbox mode, email deliverability, role / capability oddities, cache plugins, and the white screen.
---

# Troubleshooting

This page lists the issues we see most often and the fastest way through them.

## "REST returns 404 / nothing loads in the admin"

**Symptom:** The admin React shell shows blank panels; the network tab shows `404` for `/wp-json/sikshya/v1/...`.

**Cause:** Pretty permalinks are off, or a security plugin is blocking REST.

**Fix:**

1. **Settings → Permalinks** — pick **Post name** (or any non-Plain). Save (this also flushes rewrite rules).
2. Visit `/wp-json/sikshya/v1/` directly in a browser. You should see JSON, not a 404.
3. If you have **Wordfence**, **iThemes Security**, **All in One Security**, etc., temporarily allow `wp-json` for your IP and retry. Then add a permanent rule for the admin IP only.

## "Permalinks 404 on the front of the site"

**Symptom:** `/courses/`, `/cart/`, `/checkout/`, `/my-learning/` all return 404.

**Cause:** Rewrite rules aren't flushed.

**Fix:**

1. **Settings → Permalinks** → **Save Changes** (no need to actually change anything; saving flushes).
2. Or via WP-CLI: `wp rewrite flush`.
3. If you renamed virtual page slugs, double-check **Sikshya → Settings → Permalinks** matches the published WP page slugs.

## "Stripe is locked at checkout"

**Symptom:** PayPal works fine, but Stripe is greyed out / says "available with Pro".

**Cause:** Stripe is registered with `tier: 'pro'`. It only goes live at checkout when `TierCapabilities::isActive()` returns true — which happens when Sikshya Pro is installed and a license is active.

**Fix:** Install Sikshya Pro and activate your license. PayPal alone is enough for free-only deployments.

## "PayPal webhook shows but no order is fulfilled"

**Symptom:** PayPal sandbox / live webhook logs show a 200 from your site, but the order stays **pending**.

**Cause:** Webhook ID mismatch (sandbox vs live), missing client id / secret, or REST routes are blocked by a security layer.

**Fix:**

1. **Sikshya → Settings → Payment → PayPal** — confirm **Mode** matches the webhook (sandbox vs live), and **Webhook ID** matches the PayPal dashboard's webhook id.
2. Open `/wp-json/sikshya/v1/webhooks/paypal` in a browser — you should get a `405` (method not allowed) or `404` for GET. If you get `403` from a security plugin, allow this URL.
3. Check **Sikshya → Tools → Logs** for webhook errors.

## "Stripe webhook signature mismatch"

**Symptom:** Stripe dashboard says webhook delivery failed; Sikshya logs say "invalid signature".

**Cause:** Webhook secret in Sikshya doesn't match Stripe's webhook endpoint secret.

**Fix:**

1. In Stripe → **Developers → Webhooks** → click your endpoint → **Reveal secret** under **Signing secret** (`whsec_...`).
2. Paste it into **Sikshya → Settings → Payment → Stripe → Webhook secret**.
3. Save.
4. Re-send a test event in Stripe → it should succeed.

## "Emails aren't arriving"

**Symptom:** No enrollment / receipt / completion emails reach the learner.

**Cause:** The hosting environment's `wp_mail()` is dropping mail (either because of misconfigured sender or no SPF / DKIM).

**Fix:**

1. Install a transactional email plugin: **WP Mail SMTP**, **Post SMTP**, **FluentSMTP**, or **Gravity SMTP**.
2. Connect to a transactional ESP: SendGrid, Postmark, Amazon SES, Mailgun, SparkPost.
3. Set **From name** and **From email** to a `noreply@` on your sending domain.
4. Configure **SPF**, **DKIM**, and **DMARC** for the sending domain.
5. Test deliverability via [mail-tester.com](https://www.mail-tester.com/) before launch.

For the Pro **Professional email delivery & branded templates** add-on, the configuration UI is more polished, but the underlying need (real ESP + DNS records) is the same.

## "The 'Apply to teach' application doesn't grant the role"

**Symptom:** A user submits the instructor application but doesn't get the `sikshya_instructor` role automatically.

**Cause:** This is by design. `[sikshya_registration type="instructor"]` records a **pending application** (action `sikshya_instructor_application_submitted`). An admin must approve it under **Sikshya → Instructors** before the role is granted.

**Fix:** Go to **Sikshya → Instructors** and approve the application. Or auto-approve via:

```php
add_action('sikshya_instructor_application_submitted', function ($user_id) {
    $user = get_userdata($user_id);
    $user->add_role('sikshya_instructor');
}, 10, 1);
```

Use that filter sparingly — instructor approval is intentional friction.

## "Setup wizard never finishes / can't reach the dashboard"

**Symptom:** After activation, you can't get past the setup wizard.

**Cause:** The wizard tries to create virtual pages and can fail if your role plugin restricts post creation, or if a server-side firewall blocks `POST` to `/wp-json/sikshya/v1/settings/save`.

**Fix:**

1. Make sure the user running the wizard is a true administrator with `manage_options`.
2. Disable WAF / Security plugins temporarily, run the wizard, then re-enable.
3. If still stuck: open **Sikshya → Tools → Setup wizard** to re-run.

## "I deactivated Pro and now my courses lost data"

**Symptom:** After turning off Sikshya Pro, gradebook / drip / advanced certificates disappear.

**Cause:** Pro features render only when the corresponding add-on is on. Disabling the add-on hides UI, but stored data (drip rules, gradebook overrides, certificate templates) is preserved in the database.

**Fix:** Re-enable the add-on under **Sikshya → Add-ons** to bring back the UI. No data was lost — it's just hidden.

## "Course content shows but progression is locked"

**Symptom:** A learner is enrolled but can't open the next lesson.

**Cause:** Sequential progression is on (default in free) and a previous lesson hasn't been marked complete; or a Pro **drip** or **prerequisite** rule applies.

**Fix:**

1. Have the learner mark the current lesson complete (the **Mark complete** button at the bottom of the lesson player).
2. If they did and it's still locked, check the prerequisite / drip rule on the course settings.
3. As an admin, you can manually mark lessons complete via REST: `POST /wp-json/sikshya/v1/me/lesson-complete` (impersonating the learner) or directly via the database.

## "Cache plugin breaks checkout / login"

**Symptom:** Login form keeps showing logged-out state; checkout looks blank.

**Cause:** Page cache is serving the logged-out version of a page that should be unique per session.

**Fix:** Exclude these from your page cache:

- `/cart/`, `/checkout/`, `/my-learning/`, `/learn/`, `/order/`, `/login/`
- `/wp-json/sikshya/v1/checkout/*`, `/wp-json/sikshya/v1/me/*`

Most cache plugins (WP Super Cache, W3 Total Cache, WP Rocket, FlyingPress, Cloudflare APO) accept URL exclusions. Add them and retest.

## "I see PHP fatal errors after enabling Pro"

**Symptom:** White screen of death right after activating Sikshya Pro.

**Cause:** Mismatched plugin versions (a recent Pro release expects a recent free release), or the Pro plugin was activated before the free plugin.

**Fix:**

1. Add `define('WP_DEBUG', true); define('WP_DEBUG_LOG', true);` to `wp-config.php` to capture the error.
2. Re-read the error message in `wp-content/debug.log`.
3. Update both plugins to the latest versions.
4. Activate Sikshya **first**, then Sikshya Pro.

## "I'm on a case-sensitive Linux host and templates don't load"

**Symptom:** A template override in your theme isn't picked up.

**Cause:** macOS dev environment is case-insensitive; the production Linux server is case-sensitive. A template with the wrong case in the path will silently fail.

**Fix:** Match Sikshya's exact casing — `templates/single-course.php`, `templates/partials/courses/card.php`, etc.

## "REST returns 403 for an admin user"

**Symptom:** Even as a super-admin, hitting an admin REST route returns `rest_forbidden`.

**Cause:** Cookie session expired, missing `X-WP-Nonce`, or you've revoked a capability via a role plugin.

**Fix:**

1. Refresh the WordPress admin page (re-issues a new nonce).
2. Confirm your user has `manage_sikshya` and `sikshya_access_admin_app`.
3. Check that a role plugin (Members, User Role Editor) hasn't accidentally removed those caps from administrator.

## "Pro license shows valid in Mantrabrain dashboard but Sikshya says invalid"

**Symptom:** Account dashboard says "Active"; **Sikshya → License** says invalid.

**Cause:** License key was activated on too many sites, or the site URL in the dashboard differs from the WordPress URL (e.g. `www.` mismatch).

**Fix:**

1. Open the Mantrabrain account dashboard and confirm site limits.
2. Deactivate the license slot for any old / dev URLs.
3. Click **Re-check license** in **Sikshya → License**.

## Diagnostics tools

- **Sikshya → Status** — PHP, WP, server, plugin versions and a config snapshot.
- **Sikshya → Tools → Logs** — webhook + email + general logs.
- **Sikshya → Tools → System Info** — copy / paste-friendly diagnostics for support tickets.
- WP-CLI: `wp sikshya doctor` (planned) and standard commands like `wp rewrite flush`, `wp cache flush`.

## When to file a bug

Before filing, please:

1. Update both Sikshya and Sikshya Pro to the latest versions.
2. Disable other plugins (one by one) to rule out conflicts.
3. Switch to a default theme briefly to rule out theme conflicts.
4. Capture the exact steps + a `WP_DEBUG` log of the error.

Then [file a bug on GitHub](https://github.com/MantraBrain) (free) or open a [priority support ticket](https://mantrabrain.com/contact/) (Pro).

## Related

- [Installation](/guide/installation)
- [Payments](/guide/payment-settings)
- [Email & notifications](/guide/email-settings)
- [Support](/guide/support)
