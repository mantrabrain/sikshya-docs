---
title: Enrollment & access
description: Configure who can enroll in a Sikshya course, how lessons unlock, and what guests vs members can see — including drip, prerequisites, and bundles.
---

# Enrollment & access

This page covers every way a learner gets **into** a course, and every way you control what they see **after** they're in.

## The four ways to enroll

| Mode             | When                                                  | What happens                                                  |
| ---              | ---                                                   | ---                                                           |
| **Free**         | The course price is `0`                               | Learner clicks **Enroll** → instantly enrolled.               |
| **Paid**         | The course has a price                                | Learner buys at checkout (PayPal, etc.). On success → enrolled. |
| **Manual**       | Anything bespoke — gifts, B2B, refund recovery        | Admin enrolls the user from <span class="screen-path">People → Enrollments</span>. |
| **Coupon**       | Promotions or partial discount                        | Admin issues a coupon. Learner applies it at checkout.        |

All four routes write the same enrollment record and trigger the same email + downstream automation.

## Settings → Enrollment

Open <span class="screen-path">Sikshya → Settings → Enrollment</span>. Sections:

### Purchase & enrollment

- **Auto-enroll on purchase** — leave on. When a learner pays, they're enrolled automatically.
- **Button text on paid courses** — what the catalog button says (default: "Buy now").
- **Button text on free courses** — default: "Enroll now".
- **Let administrators enroll without purchase** — leave on so manual enroll works.
- **Enable guest checkout** — let buyers pay without creating an account first. We auto-create the account on success.

### Dynamic checkout fields <span class="pro-pill">PRO</span>

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Custom checkout questions</span>
  </div>
  <p class="pro-callout__desc">Add VAT IDs, referral source, consent checkboxes, or T-shirt size to checkout. Every field can be text, select, or checkbox — with simple visibility rules (show this field only when the buyer picks "Other"). Answers are stored on the order and the learner profile.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Unlock dynamic fields →</a>
</div>

### Course completion

- **When is a course complete?** — pick the rule (All lessons done / All lessons + quizzes + assignments / Pass all quizzes / Manual mark).
- **Minimum progress %** — issue completion at e.g. 95% so a single forgotten lesson doesn't block the cert.

### Enrollment limits

- **Max learners per course** — optional cap.
- **Access length after enroll (days)** — useful for time-limited courses. Empty = forever.
- **Max active courses per student** — if you want to throttle free users.

### Unenrollment

- **Let students leave** — give learners a self-unenroll button on their account.
- **Try to refund automatically when a student leaves** — best-effort, depends on the gateway. We recommend processing refunds in your gateway dashboard for safety.
- **Days after signup they can still drop** — refund-window logic.

### Enrollment periods

- **Limit enrollment to date ranges** — for cohorts.
- **Default enrollment opens / closes** — site-wide default. Per-course overrides live in the Course Builder → Pricing & access tab.

## Sequential progression (free)

This is the free plugin's "drip light". With it on, learners must complete each lesson in order before the next unlocks.

Toggle per-course in the Course Builder → **Course options** → **Track student progress**. With the option on, the learn hub locks future lessons until earlier ones are marked complete.

## Drip — release lessons by schedule <span class="pro-pill">PRO</span>

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Content drip — date / X-days / cohort schedules</span>
  </div>
  <p class="pro-callout__desc">Want lessons to release "on March 15", "7 days after each learner enrolls", or "on day 14 of cohort A"? That's <strong>Content drip</strong>. Visit <span class="screen-path">Sikshya → Course → Learning rules → Scheduled access</span> after enabling the add-on.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Unlock content drip →</a>
</div>

Drip rules live on a dedicated screen. Each rule specifies:

- **Course** — which course it applies to.
- **Mode** — Date, X days from enrollment, Cohort start, or After lesson.
- **Schedule** — date / day count / cohort id.
- **Targets** — which lessons to unlock (all lessons in chapter X, specific lessons, etc.).

Combine drip with **Drip notifications** <span class="pro-pill">PRO</span> for "your next lesson is now available" emails.

## Prerequisites <span class="pro-pill">PRO</span>

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Require courses or lessons before unlocking the next</span>
  </div>
  <p class="pro-callout__desc">Lock <strong>Course B</strong> until the learner has finished <strong>Course A</strong>. Or lock the "Final exam" lesson until the prep lessons are complete. Friendly "what to do next" messaging is built in.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Unlock prerequisites →</a>
</div>

Find prerequisites under <span class="screen-path">Sikshya → Course → Learning rules → Prerequisites</span> after enabling the add-on, or set per-course in the Course Builder → **Pricing & access** tab.

## Coupons (free)

Open <span class="screen-path">Sikshya → Commerce → Coupons</span>. Click **+ New coupon**.

Fields:

- **Coupon code** — what learners type at checkout.
- **Type** — Percentage off or Fixed amount off.
- **Amount** — `25` for 25% off (percentage) or `25` for $25 off (fixed).
- **Minimum order** — skip if you don't want a floor.
- **Usage limit (total)** — total times the coupon can be redeemed.
- **Usage limit per customer** — per-learner cap (typically 1).
- **Valid from / Valid until** — optional date window.
- **Applies to** — All courses, or specific courses (multi-select).

Click **Save**. Test the coupon at checkout in a private window before sharing it.

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Advanced coupons</span>
  </div>
  <p class="pro-callout__desc">Add minimum cart total, course / category exclusions, "first-time buyer only" rules, and stacking guards (allow / deny combining coupons).</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Unlock advanced coupons →</a>
</div>

## Bundles & subscriptions <span class="pro-pill">PRO</span>

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Sell bundles and recurring subscriptions</span>
  </div>
  <p class="pro-callout__desc">Bundle several courses for one bundled price (Course Bundles add-on). Or charge monthly / yearly for member-only access (Subscriptions add-on). Both unlock new "course type" options in the Course Builder.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Unlock bundles &amp; subscriptions →</a>
</div>

Bundles live under <span class="screen-path">Sikshya → Commerce → Bundles</span> and have their own builder. Subscriptions add a **Subscriptions** menu and a **Plans** sub-screen for monthly / yearly tier configuration.

## Marketplace <span class="pro-pill">PRO</span>

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Multi-vendor marketplace</span>
  </div>
  <p class="pro-callout__desc">Open the academy to many independent sellers (vendors). Each vendor has their own storefront. Set per-vendor / per-course commission, manage payouts, and report on GMV.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Unlock the marketplace →</a>
</div>

Find it under <span class="screen-path">Sikshya → Commerce → Marketplace</span> after the **Marketplace multi-vendor** add-on is on.

## Refunds & unenroll

You can revoke an enrollment two ways:

- **From Enrollments** → tick the row → bulk action **Cancel enrollment**.
- **From the order** → open <span class="screen-path">Commerce → Sales → Orders</span> → click the order → **Refund**.

Refunding marks the enrollment **Refunded** and writes a refund row. If you set "Try to refund automatically" in Settings → Enrollment, Sikshya attempts the API call to your gateway. **For safety**, refund first in the gateway dashboard, then mark refunded in Sikshya.

## What's next

- [Payments](/payment-settings) — gateway-by-gateway setup.
- [Email & notifications](/email-settings) — the messages that fire on enrollment.
- [Pro add-ons](/third-party-integrations) — every Pro feature listed.
