---
title: WooCommerce & co-existence
description: How Sikshya runs alongside WooCommerce on the same WordPress site, plus notes on caching, multilingual, multisite, and common conflicts.
---

# WooCommerce & co-existence

Sikshya is intentionally **not** built on top of WooCommerce. The free plugin ships its own native cart, checkout, gateways, orders, and coupons — so a single course is one click from "publish" to "sell" without bolting on another commerce stack.

That said, plenty of sites already run WooCommerce for physical products or memberships. Sikshya **co-exists** with WooCommerce on the same site. This page is the practical guide to making them play nicely.

## Mental model

- **WooCommerce** sells products, carts, taxes, and shipping for shippable / digital goods.
- **Sikshya** sells courses, enrollments, certificates, and learner experience.

You'll have two checkouts — one for Woo products, one for Sikshya courses — each with its own customer / order tables, gateway configs, and email templates.

## Should I use Woo for courses too?

Short answer: **no, not unless you have a specific reason**.

| Situation                                                     | Recommendation                                       |
| ---                                                           | ---                                                  |
| Most of your revenue is courses                               | Use **Sikshya checkout** (faster, simpler).          |
| You sell digital products *and* a few courses                 | Either works; pick the cart with the most SKUs.      |
| You need **subscriptions** for memberships                    | **Sikshya Pro Subscriptions** add-on works without Woo Subscriptions. |
| You need exotic shipping / tax / Woo extensions               | Use Woo for *those* SKUs; Sikshya for courses.       |

## Two-checkout site

A typical co-existing site has:

- `/shop/` — Woo product catalog.
- `/cart/`, `/checkout/`, `/my-account/` — Woo virtual pages.
- `/courses/` — Sikshya catalog.
- `/cart/`, `/checkout/`, `/my-learning/` — Sikshya virtual pages on the same paths.

**Slug collision risk:** Woo also uses `/cart/` and `/checkout/`. Two safe configurations:

1. **Sikshya wins** — leave Sikshya at `/cart/` and `/checkout/`. Move Woo to `/shop-cart/` and `/shop-checkout/`.
2. **Woo wins** — rename Sikshya virtual pages to `/learn-cart/`, `/learn-checkout/`, `/my-learning/`. Leave Woo at `/cart/` and `/checkout/`.

Pick one strategy and stick to it. Don't try to share `/cart/` between both — payment debugging gets miserable.

## Account pages

Two account pages is normal:

- `/my-account/` — Woo (orders, addresses, downloads, subscriptions).
- `/my-learning/` — Sikshya (courses, wishlist, certificates, payments, profile).

Add cross-links from each to the other so customers don't get lost.

## Single sign-on

Sikshya uses standard WordPress users. A user buying via Woo *and* enrolling via Sikshya is the same WP user — their progress and orders are linked automatically.

## Cross-selling courses from Woo products

If a Woo product becomes a course-access voucher, hook into Woo's payment-complete and call Sikshya's enrollment hook:

```php
add_action('woocommerce_payment_complete', function ($order_id) {
    $order = wc_get_order($order_id);
    foreach ($order->get_items() as $item) {
        if ($item->get_product_id() === 1234) {
            $course_id = 9876;
            $user_id = $order->get_user_id();
            if ($user_id) {
                do_action('sikshya_user_enrolled', $user_id, $course_id, ['source' => 'woo']);
            }
        }
    }
});
```

## Caching

Standard advice — exclude:

- `/cart/`, `/checkout/`, `/my-account/`, `/my-learning/`, `/learn/`, `/order/`
- `/wp-json/*` (especially `/sikshya/v1/checkout/*` and `/me/*` routes)
- Logged-in cookies on course-detail pages

## Plugins that often conflict (and the fix)

| Plugin                                               | Symptom                                | Fix                                          |
| ---                                                  | ---                                    | ---                                          |
| Heavy CSS frameworks (Avada, Total)                  | Course card layout shifts              | Override `card.php` in your child theme.     |
| Aggressive minifiers (Autoptimize)                   | React admin shell breaks               | Exclude `/wp-admin/` from minification.       |
| Login redirect plugins                               | Sikshya virtual login fails            | Whitelist `?sikshya_page=login`.              |
| Membership plugins (MemberPress, Restrict Content Pro)| Lock Sikshya's `/learn/`              | Add Sikshya pages to the plugin's exclusion list. |
| 2FA / SSO plugins                                    | Account creation at checkout fails     | Whitelist `sikshya_*` actions.                |

## What's next

- [Payments](/payment-settings) — gateway setup.
- [Pro add-ons](/third-party-integrations).
- [Troubleshooting](/troubleshooting).
