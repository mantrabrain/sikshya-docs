---
title: Enrollment & access
description: Configure how learners enroll in Sikshya LMS courses — free self-enroll, paid checkout, manual enroll, sequential progression, and Pro drip / prerequisites / bundles / subscriptions.
---

# Enrollment & access

This page covers every way a learner can get into a course, and every way you control **what they can see when they're in**.

## Enrollment modes (free)

| Mode             | When to use                                            | How it works                                                         |
| ---              | ---                                                    | ---                                                                  |
| **Free** (auto)  | The course price is `0`                                | Learner clicks **Enroll**. `POST /me/enroll` → instant access.       |
| **Paid**         | The course has a price                                 | Learner buys via cart / checkout (Stripe or PayPal). On gateway success → enrolled. |
| **Manual**       | Anything bespoke (gifts, refunds, bulk offline buyers) | Admin enrolls a user from **Sikshya → Enrollments → Add new**.       |
| **Coupon**       | Promotions, partial discounts, free for some           | Admin issues a coupon. Learner applies it at checkout.               |

All four routes write a row to the `sikshya_enrollments` table and fire `sikshya_user_enrolled`.

## Self-enroll on free courses

When **Allow self-enroll on free courses** is on (default), any logged-in learner can click **Enroll** and land in the course.

The endpoint is `POST /wp-json/sikshya/v1/me/enroll`. The frontend redirect is filtered by `sikshya_enroll_free_redirect_url` (`CartFormHandler.php:86`) — by default it sends learners to the learn hub, but you can intercept it to e.g. a "Welcome" page.

## Paid checkout

The native checkout (no WooCommerce required) works like this:

1. Learner clicks **Buy** on a course page → `[sikshya_courses]` → cart (`/cart/`).
2. **Cart** shows line items, coupons, totals.
3. **Checkout** (`/checkout/`) renders the gateway (PayPal / Stripe). If a Pro **Dynamic checkout fields** add-on is enabled, conditional fields render here.
4. Gateway redirect or inline payment → back to the order confirmation (`/order/`).
5. `Sikshya\Services\OrderFulfillmentService::fulfill()` creates enrollment(s) and fires `sikshya_order_fulfilled`.

Hooks you can use to extend checkout:

- `sikshya_checkout_start_gateway_session` — wrap a third-party gateway session (`CheckoutService.php:519`).
- `sikshya_checkout_confirm_gateway` — confirm a payment from a gateway-specific webhook (`CheckoutRestRoutes.php:983`).
- `sikshya_coupon_discount_amount` — modify how a discount is computed (`CheckoutService.php:186`).

## Coupons

The free coupon engine supports:

- **Type** — percentage or fixed amount.
- **Redemption limits** — total uses, per-customer, or unlimited.
- **Date window** — optional start / end.
- **Course list** — apply to all, or a specific list of courses.

Coupons live in the `sikshya_coupons` table; redemptions in `sikshya_coupon_redemptions`. Manage under **Sikshya → Coupons**.

The **Advanced coupons** Pro add-on adds:

- Minimum cart total.
- Exclusions (specific courses / categories).
- "First-time buyer only" rules.
- Stacking and conflict rules.
- Per-coupon settings via REST: `GET / POST /pro/coupons/{id}/advanced`.

## Sequential progression (free)

When **Sequential progression** is on at the course level, lessons must be completed in order. The next lesson is locked until the previous one is marked complete (and any inline quiz is passed). This is the free baseline drip.

Toggle per-course in the course builder → **Settings → Progression**.

## Drip & scheduled unlock (Pro add-on `content_drip`)

The **Content drip** add-on unlocks lessons based on a rule rather than completion order. Available modes:

| Mode                      | Example                                                         |
| ---                       | ---                                                             |
| **Date**                  | "Module 2 unlocks on March 15."                                 |
| **X days from enrollment**| "Module 2 unlocks 7 days after the learner enrolls."            |
| **Cohort start**          | "Module 2 unlocks on day 7 of cohort A; cohort B starts later." |
| **After lesson**          | "Module 2 unlocks once Module 1 is fully completed."            |

Drip rules are managed via the REST routes:

- `GET / POST /pro/drip-rules` — list and create rules.

A daily WP-Cron event (`sikshya_pro_drip_cron`) sweeps and grants access. You can also send "Lesson unlocked" emails by enabling **Drip notifications** (Pro). Templates `drip_lesson_unlocked`, `drip_course_unlocked`, `drip_lessons_unlocked_digest` are in the email catalog.

## Prerequisites (Pro add-on `prerequisites`)

The **Prerequisites** add-on lets you require:

- A specific lesson before another lesson.
- A whole course before another course.
- Combinations of both, with friendly "What to do next" lock messaging.

Prerequisites are evaluated whenever a learner opens a course or attempts to start a lesson. If a prerequisite is unmet, the lesson is locked with a guided message.

## Course bundles (Pro add-on `course_bundles`)

Sell a group of courses for one bundled price. Learners who buy a bundle are auto-enrolled in every course in it. Bundles can also be used as the SKU for a subscription tier.

REST routes:

- `GET / POST /pro/bundles`
- `GET / POST /pro/bundles/{id}/courses`
- `DELETE /pro/bundles/{id}/courses/{course_id}`
- `DELETE /pro/bundles/{id}`
- `GET /pro/bundles/{id}/purchase-link`

## Subscriptions & memberships (Pro add-on `subscriptions`)

Sell **recurring** access instead of one-shot course sales. Useful for memberships, all-access programs, or "library" SKUs.

- Plans (with price + interval) are stored as `sikshya_plans`.
- Active subscriptions are stored as `sikshya_subscriptions`.
- The cancel endpoint is `POST /pro/subscriptions/cancel`.
- Subscriptions integrate with Stripe / PayPal recurring or any gateway you wire via the gateway extension points.

## Multi-instructor (Pro add-on `multi_instructor`)

Assign multiple instructors to a course with optional revenue split:

- `GET / POST / DELETE /pro/multi-instructor/course-staff` — manage course staff.
- `GET /pro/multi-instructor/earnings` — earnings per instructor.
- `POST /pro/multi-instructor/earnings/set-status` — mark earnings as paid (admin only).

## Marketplace (Pro Scale add-on `marketplace_multivendor`)

Open the academy to multiple **vendors** (independent sellers) with their own storefronts:

- `GET / POST /scale/vendors`
- `POST /scale/withdrawals`
- `GET /scale/reports/commissions`

Each vendor sells their courses; commissions are split per global / per-vendor / per-course rules.

## Refunds & unenroll

- **Manual unenroll** — admins remove a learner from **Sikshya → Enrollments**. Fires `sikshya_user_unenrolled`.
- **Self-unenroll** — `POST /me/unenroll` (if allowed in settings). Same hook.
- **Refunds** — orders can be marked **refunded** (`AdminRestRoutes.php`). The `sikshya_payments` table has `refund_date` / `refund_amount` columns. The setting "Try to refund automatically on unenroll" is configurable but the actual gateway refund call depends on the gateway (most reliable: process it inside the gateway dashboard, then mark refunded in Sikshya).

## Settings reference

Open **Sikshya → Settings**. Enrollment-related options live primarily under:

- **General** — currency, basic LMS labels.
- **Enrollment** — allow self-enroll on free, expire after X days, manual approval, default redirect.
- **Courses** — default access mode, archive layout, sort defaults.
- **Lessons** — sequential progression default.
- **Quizzes**, **Assignments**, **Progress**, **Notifications**.
- **Permalinks** — slugs for `cart`, `checkout`, `account`, `learn`, `login`, `order`.
- **Security** — capability tweaks.
- **Advanced** — debug + maintainer tools.

The full schema is built in `Sikshya\Settings\SettingsManager::getAllSettings()` and is filterable per tab via `sikshya_settings_tab_{$tab}`. Read the schema via `GET /wp-json/sikshya/v1/settings/schema`.

## Related

- [Courses & curriculum](/guide/courses) — content learners enroll in.
- [Payments](/guide/payment-settings) — gateways used at checkout.
- [Pro add-ons](/guide/third-party-integrations) — drip, prerequisites, bundles, subscriptions, marketplace.
- [Hooks & filters](/guide/hooks-filters) — extension points around enrollment.
