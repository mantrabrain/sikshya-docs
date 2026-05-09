---
title: Privacy & usage tracking
description: Exactly what data Sikshya's optional usage tracking collects, what it never collects, where it's sent, how often, and how to enable / disable it. Privacy-safe and minimal.
---

# Privacy & usage tracking

Sikshya includes an optional **usage tracking** feature so we (MantraBrain) can understand how the plugin is used in real-world environments and prioritise improvements.

> Usage tracking is **opt-in** and **disabled by default** unless you say "Yes" during the setup wizard. You can flip it on or off any time.

## You are in control

Usage tracking can be enabled or disabled any time from:

<div class="screen-path">Sikshya → Settings → Advanced → Privacy &amp; Usage → "Share anonymous usage data"</div>

The first-time **setup wizard** also asks for explicit consent. Choosing "No" means nothing is sent — ever.

## Where the data is sent

When enabled, Sikshya sends a small JSON payload to MantraBrain's collection endpoint:

```
https://usage.mantrabrain.com/index.php?rest_route=/mantrabrain/v1/collect
```

The payload is signed with your site's instance ID (a random UUID generated locally — not your name, not your email).

## How often the data is sent

When enabled, Sikshya may send usage data:

- **Once weekly** via a scheduled background sync (`wp-cron`).
- **Shortly after enabling tracking** — an immediate first sync so we know it's wired up.
- **Fallback inside wp-admin** if the scheduled cron event didn't run, so the weekly cadence isn't missed on low-traffic sites.

If a send fails (network blip, MantraBrain endpoint slow), Sikshya retries later with a backoff delay.

## What data IS collected

Below is the **exact** payload structure. Nothing more is sent.

### 1. Product + instance identifiers

| Field | Example |
| --- | --- |
| `product` | `sikshya` |
| `instance_id` | A random UUID like `8c1b9d62-...` — saved on your site so we can distinguish one site from another **without identifying a person** |
| `sent_at` | UTC timestamp when the payload was sent |

### 2. Site information

| Field | Example |
| --- | --- |
| `site_url` | Your site's home URL (e.g. `https://example.com`) |
| `locale` | Site language / locale (e.g. `en_US`, `de_DE`) |

### 3. Environment information

| Field | Example |
| --- | --- |
| `wp_version` | WordPress version (e.g. `6.5.2`) |
| `php_version` | PHP version (e.g. `8.2.10`) |
| `multisite` | `true` or `false` |

### 4. Plugin information

| Field | Example |
| --- | --- |
| `plugin_version` | Sikshya plugin version (e.g. `1.4.2`) |

### 5. Coarse usage signals (counts / status)

| Field | Example |
| --- | --- |
| `published_courses_count` | Integer count of published courses |
| `published_lessons_count` | Integer count of published lessons |
| `setup_completed` | `true` if the setup wizard was completed |

That's it. No emails, no names, no order data, no learner data.

## What is NOT tracked

Sikshya usage tracking is intentionally minimal. The payload **never** contains:

- Student / learner names
- Student / learner email addresses
- Customer billing / shipping details
- Order or payment data, transaction IDs
- Course content or lesson content
- Quiz answers, assignment submissions, gradebook entries
- Individual user activity / per-user progress
- IP addresses
- Browser user-agent strings
- Any WordPress admin username or password

## Privacy commitments

- The data is anonymous and aggregated.
- Disabling usage tracking immediately stops future sends.
- Existing data already collected is aggregated and not tied back to a person.
- We do not share the data with third parties for advertising.
- This applies to **Sikshya Free and Sikshya Pro** equally.

## How to disable

<ol class="step-list">
  <li>Open <span class="screen-path">Sikshya → Settings → Advanced</span>.</li>
  <li>Find the <strong>Privacy &amp; Usage</strong> section.</li>
  <li>Untick <strong>Share anonymous usage data with MantraBrain</strong>.</li>
  <li>Click <strong>Save</strong>.</li>
</ol>

Future sends are stopped immediately. The cron event is unscheduled on the next pageload.

## How to verify what was sent

If you want a paper trail of payloads:

- Enable WP-Cron logging via your favourite cron logger plugin.
- Or run `wp cron event run sikshya_usage_send` via WP-CLI (verbose output) — Sikshya prints the JSON it would send.

## Questions?

If you have questions or want a copy of the data we hold for your `instance_id`, reach out via the [Support](/support) page or open a ticket from <span class="screen-path">Sikshya → Help</span>.

Reference: this page mirrors the upstream privacy notice at [docs.mantrabrain.com/sikshya-wordpress-plugin/which-types-of-data-are-being-tracked](https://docs.mantrabrain.com/sikshya-wordpress-plugin/which-types-of-data-are-being-tracked/).
