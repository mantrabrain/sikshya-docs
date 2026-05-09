---
title: Support
description: Get support for Sikshya LMS — WordPress.org forum, GitHub bug reports, the Facebook community, Pro priority support, and how to file a useful bug report.
---

# Support

Sikshya is supported in three places, depending on what you need.

## Where to ask

| Channel                                                                                                | Best for                                       | SLA           |
| ---                                                                                                    | ---                                            | ---           |
| [WordPress.org plugin forum](https://wordpress.org/support/plugin/sikshya/)                            | Public Q&A on free plugin                       | Best effort   |
| [Sikshya LMS Facebook Community](https://www.facebook.com/groups/sikshyalms/)                          | Peer discussion + tips                          | Peer-led      |
| [GitHub issues](https://github.com/MantraBrain)                                                        | Bug reports, feature requests, code-level talk  | Best effort   |
| [Mantrabrain priority support](https://mantrabrain.com/contact/)                                       | Pro license holders, billing, urgent issues     | Per plan      |

## Filing a useful bug report

A good bug report saves a round-trip and gets your issue fixed faster. Include:

### 1. Environment

- WordPress version (Settings → General).
- PHP version (Tools → Site Health → Info).
- Sikshya version + Sikshya Pro version (Plugins → Installed Plugins).
- Active theme (Appearance → Themes).
- Active plugins list.

### 2. Steps to reproduce

A numbered list a stranger could follow:

```
1. Go to /courses/.
2. Click "Web design 101".
3. Click "Buy now".
4. Pay with Stripe sandbox card 4242 4242 4242 4242.
5. Land back on /order/.
   Expected: order shows "completed".
   Actual: order shows "pending" and the learner is not enrolled.
```

### 3. Expected vs actual

What you expected to happen, what actually happened, and any error messages from `WP_DEBUG`.

### 4. Logs

If applicable:

- Browser console errors.
- Network tab failed requests (URL + status + response body).
- `WP_DEBUG` log lines from `wp-content/debug.log`.
- Sikshya logs from **Sikshya → Tools → Logs**.

Wrap them in fenced code blocks. Redact secrets (license keys, gateway secrets, JWTs).

### 5. Screenshots / videos

A 5-second screen capture of the issue in action is gold. Loom, CleanShot X, ShareX, or just QuickTime work.

## Sikshya Pro priority support

If you have a Pro license, you can open a ticket via the [Mantrabrain contact page](https://mantrabrain.com/contact/). Include:

- License key (last 4 characters are enough for routing).
- The same diagnostic information above.
- A short summary of business impact ("checkout broken" vs "minor UI shift").

Tickets are answered during Mantrabrain's working hours; severity-1 ("site down") tickets are escalated.

## Common request templates

### "Stripe checkout fails for some learners"

```
Site: example.com
Sikshya: 1.0.3
Sikshya Pro: 1.0.0
Stripe mode: live

What I tried:
- Re-tested with a sandbox card on staging — works.
- Re-checked the Stripe webhook secret — matches.
- /wp-json/sikshya/v1/webhooks/stripe is reachable from a curl POST — returns 200.

What's broken:
- About 1 in 8 live transactions land on /order/?failed=1.
- Stripe dashboard shows the payment as succeeded but the order stays pending.
- Logs (Sikshya → Tools → Logs) show "Order not found" for the affected payment intents.

Steps to reproduce: not 100% reproducible — happens on real cards in production.

Attached: 3 sample payment intent IDs from Stripe + the corresponding session_id from /sikshya/v1/checkout/session.
```

### "Gradebook page is blank"

```
Site: school.example.com
Sikshya: 1.0.3
Sikshya Pro: 1.0.0
Pro plan: Pro
Gradebook add-on: enabled

What I tried:
- Disabled all other plugins → still blank.
- Switched to Twenty Twenty-Five → still blank.
- Browser console shows: "TypeError: Cannot read properties of undefined (reading 'id')" in /pro/gradebook/grid response.

Attached: console error stack + Network tab payload for /pro/gradebook/grid.
```

## What to expect

- **First response** — within a working day for free, or per plan SLA for Pro.
- **Triage** — your report is classified (bug / question / feature / can't reproduce).
- **Fix or workaround** — bugs are routed to engineering; ETA depends on severity.
- **Release** — fixes ship in the next release. If urgent, we publish a hotfix patch.

## Escalating a critical issue

If a fix is blocking production revenue:

1. Reply to the ticket with **"BLOCKING REVENUE"** in the subject + a quantitative impact statement (e.g. "$5k / day").
2. Include a working contact (phone / WhatsApp) for outside-of-email coordination.
3. We will attempt to provide a workaround within hours, and a release within days.

## Feature requests

Roadmap input is welcome on:

- [GitHub issues](https://github.com/MantraBrain) labeled **enhancement**.
- The Facebook community.
- Direct conversation with your account manager (Pro / Scale plan customers).

We prioritize features that:

- Solve a problem that affects many sites (not one specific deployment).
- Fit Sikshya's "WordPress-native LMS" positioning.
- Are reasonable to maintain in the long run.

## Security disclosures

Please **do not** open a public GitHub issue or forum post for security vulnerabilities. Email `mantrabrain@gmail.com` privately with details. We follow coordinated disclosure: confirm, fix, release, then publicly credit the reporter (if desired) after the patch is in users' hands.

## Useful links

- 📖 [Sikshya documentation](https://docs.mantrabrain.com/sikshya-wordpress-plugin/) — official docs hub.
- 🧪 [Try Sikshya in Playground](https://try.new/plugins/sikshya/) — kick the tires without installing locally.
- 🛒 [Buy Sikshya Pro](https://mantrabrain.com/plugins/sikshya/#pricing) — license plans.
- 👥 [Facebook Community](https://www.facebook.com/groups/sikshyalms/) — peer chat.
- 🐙 [GitHub](https://github.com/MantraBrain) — issues and source.
- 📨 [Contact Mantrabrain](https://mantrabrain.com/contact/) — sales + support.

## Related

- [Installation](/guide/installation)
- [Troubleshooting](/guide/troubleshooting)
- [FAQs](/guide/faqs)
- [Changelog](/guide/changelog)
