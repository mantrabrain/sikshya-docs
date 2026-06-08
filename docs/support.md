---
title: Support
description: Get help with Sikshya — WordPress.org forum, GitHub bug reports, the Facebook community, Pro priority support, and how to file a useful bug report.
---

# Support

Sikshya is supported in four places, depending on what you need.

## Where to ask

| Channel                                                                         | Best for                                       | Response       |
| ---                                                                             | ---                                            | ---            |
| [WordPress.org plugin forum](https://wordpress.org/support/plugin/sikshya/)     | Public Q&A on the free plugin                   | Best effort    |
| [Sikshya LMS Facebook Community](https://www.facebook.com/groups/sikshyalms/)   | Peer discussion + tips                          | Peer-led       |
| [GitHub issues](https://github.com/MantraBrain)                                 | Bug reports, feature requests, code-level talk  | Best effort    |
| [Mantrabrain priority support](https://mantrabrain.com/contact/)                | Pro license holders, billing, urgent issues    | Per plan SLA   |

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Priority support is included with every Pro plan</span>
  </div>
  <p class="pro-callout__desc">Pro license holders get faster response times via the priority queue. Severity-1 ("site down") tickets are escalated.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya-lms/pricing/">Compare Pro plans →</a>
</div>

## Filing a useful bug report

A good bug report saves a round-trip and gets your issue fixed faster. Include:

### 1. Environment

- WordPress version (<span class="screen-path">Settings → General</span>).
- PHP version (<span class="screen-path">Tools → Site Health → Info</span>).
- Sikshya version + Sikshya Pro version.
- Active theme.
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
- Network tab failed requests.
- `WP_DEBUG` log lines from `wp-content/debug.log`.
- Sikshya activity log.

Wrap in fenced code blocks. Redact license keys, gateway secrets, JWTs.

### 5. Screenshots / videos

A 5-second screen capture of the issue is gold. Loom, CleanShot X, ShareX, or QuickTime all work.

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

Attached: console error stack + Network tab payload.
```

## What to expect

- **First response** — within a working day for free, or per plan SLA for Pro.
- **Triage** — your report is classified (bug / question / feature / can't reproduce).
- **Fix or workaround** — bugs are routed to engineering; ETA depends on severity.
- **Release** — fixes ship in the next release. Hotfix patches when urgent.

## Escalating a critical issue

If a fix is blocking production revenue:

<ol class="step-list">
  <li>Reply to the ticket with <strong>"BLOCKING REVENUE"</strong> in the subject + a quantitative impact (e.g. "$5k / day").</li>
  <li>Include a working contact (phone / WhatsApp).</li>
  <li>We attempt a workaround within hours and a release within days.</li>
</ol>

## Feature requests

Welcome on:

- [GitHub issues](https://github.com/MantraBrain) labeled **enhancement**.
- The Facebook community.
- Direct conversation with your account manager (Pro / Scale plan customers).

We prioritize features that solve a problem affecting many sites, fit Sikshya's "WordPress-native LMS" positioning, and are reasonable to maintain long-term.

## Security disclosures

**Do not** open a public GitHub issue or forum post for security vulnerabilities. Email `mantrabrain@gmail.com` privately. We follow coordinated disclosure: confirm, fix, release, then publicly credit the reporter (if desired) after the patch is in users' hands.

## Useful links

- 📖 [Sikshya documentation](https://sikshya.mantrabrain.com/docs/) — official docs hub.
- 🧪 [Try Sikshya in Playground](https://try.new/plugins/sikshya/) — kick the tires without installing locally.
- 🛒 [Buy Sikshya Pro](https://mantrabrain.com/plugins/sikshya-lms/pricing/) — license plans.
- 👥 [Facebook Community](https://www.facebook.com/groups/sikshyalms/) — peer chat.
- 🐙 [GitHub](https://github.com/MantraBrain) — issues and source.
- 📨 [Contact Mantrabrain](https://mantrabrain.com/contact/) — sales + support.

## What's next

- [Installation](/installation)
- [Troubleshooting](/troubleshooting)
- [FAQs](/faqs)
- [Changelog](/changelog)
