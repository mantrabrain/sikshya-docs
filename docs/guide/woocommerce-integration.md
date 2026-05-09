---
title: WooCommerce & co-existence
description: How Sikshya LMS runs alongside WooCommerce, and notes on multilingual, caching, SEO, and multisite environments.
---

# WooCommerce & co-existence

Sikshya is intentionally **not** built on top of WooCommerce. The free plugin ships its own native cart, checkout, gateways, orders, and coupons — so a single course is one click from "publish" to "sell" without touching another commerce stack.

That said, plenty of sites already run WooCommerce for physical products, memberships, or another use case. Sikshya **co-exists** with WooCommerce on the same site. This page is the practical guide to making that work cleanly.

## Mental model

- **WooCommerce** sells products, carts, taxes for shippable / digital goods.
- **Sikshya** sells courses, enrollments, certificates, and learner experience.

You'll have two checkouts — a Woo checkout (for Woo products) and a Sikshya checkout (for courses). They each have their own:

- Customer / order tables.
- Payment gateway configuration.
- Email templates.
- "Account" page (Woo `My Account`, Sikshya `My Learning`).

## Should I use Woo for courses too?

Short answer: **no, not unless you have a specific need**.

| Situation                                                   | Recommendation                              |
| ---                                                         | ---                                         |
| Most of your revenue is courses                              | **Use Sikshya checkout** (faster, simpler).|
| You sell digital products *and* a few courses               | Either works; pick the cart that owns the most SKUs. |
| You need **Subscriptions** for memberships                  | Sikshya Pro **Subscriptions** add-on. Woo Subscriptions is a separate paid add-on. |
| You need exotic shipping / tax / WooCommerce extensions      | Use Woo for *those* SKUs; keep Sikshya for courses. |
| You need a unified marketing funnel + Pixel / GA4 events    | Either works; the Pro Pixel / GA4 add-ons fire from Sikshya. Woo has its own.|

## Two-checkout site

A typical co-existing site:

- `/shop/` — Woo product catalog.
- `/cart/`, `/checkout/`, `/my-account/` — Woo virtual pages.
- `/courses/` — Sikshya catalog.
- `/cart/`, `/checkout/`, `/my-learning/` — **Sikshya virtual pages**, but on the same path namespaces.

Slug collision risk: WooCommerce also uses `/cart/` and `/checkout/`. Sikshya rewrites are configurable under **Sikshya → Settings → Permalinks**. Two safe configurations:

1. **Sikshya wins** — leave Sikshya at `/cart/` and `/checkout/`. Move Woo to `/shop-cart/` and `/shop-checkout/` (Woo lets you reassign these to any pages).
2. **Woo wins** — rename Sikshya virtual pages to `/learn-cart/`, `/learn-checkout/`, `/my-learning/`. Leave Woo at `/cart/` and `/checkout/`.

> Pick one strategy and stick to it. Don't try to share `/cart/` between both — it makes payment debugging miserable.

## Account page

Two account pages is normal:

- `/my-account/` — Woo (orders, addresses, downloads, subscriptions).
- `/my-learning/` — Sikshya (courses, wishlist, certificates, payments, profile).

Add cross-links from each to the other so customers don't get lost. The simplest way: put a navigation menu under each header with both links.

## Email co-existence

Both plugins send transactional email. To avoid duplicate notifications:

- Decide which plugin owns the **welcome** email (recommend Sikshya for course-only users; Woo for shop-only users).
- Decide which sends the **purchase receipt** (each sends its own; that's fine).
- Configure your SMTP / ESP plugin to forward all `wp_mail()` traffic — both plugins use the standard pipeline.

## Reporting & analytics

Each plugin reports its own revenue. To get a unified view:

- **Free / Pro** — the Sikshya **Enterprise reporting** add-on emails weekly KPI rollups for LMS revenue.
- **Manual** — export Sikshya orders + Woo orders to CSV monthly and combine in a spreadsheet.
- **Pro** — pipe both to a CRM (FluentCRM / HubSpot / Mailchimp) via the relevant add-ons.

## Single sign-on

Sikshya uses standard WordPress users. A user buying via Woo *and* enrolling via Sikshya is the same WP user. Their progress and orders are linked through their `user_id` automatically.

## Avoiding double-counting

If you cross-sell (one product becomes a course access voucher), pick one source of truth:

- A simple route is to handle the Woo product as a **gift code** that grants Sikshya enrollment via a small custom plugin listening on `woocommerce_payment_complete`:

  ```php
  add_action('woocommerce_payment_complete', function ($order_id) {
      $order = wc_get_order($order_id);
      foreach ($order->get_items() as $item) {
          if ($item->get_product_id() === 1234) {
              // Enroll the buyer in Sikshya course 9876
              $course_id = 9876;
              $user_id = $order->get_user_id();
              if ($user_id) {
                  do_action('sikshya_user_enrolled', $user_id, $course_id, ['source' => 'woo']);
              }
          }
      }
  });
  ```

  Hook into `sikshya_user_enrolled` properly via the enrollment service so progress, certificates, and emails all fire correctly.

## Caching

Standard advice — exclude **all** of:

- `/cart/`, `/checkout/`, `/my-account/`, `/my-learning/`, `/learn/`, `/order/`
- `/wp-json/*` (especially the `/sikshya/v1/checkout/*` and `/me/*` routes)
- Logged-in cookies on course-detail pages (so progress is fresh)

## Multilingual

WPML, Polylang, TranslatePress all work with both plugins. The Sikshya **Multilingual (WPML / Weglot)** Pro add-on registers all Sikshya-managed strings with WPML's String Translation. For Polylang, register CPTs and taxonomies in Polylang settings and Polylang will manage their translations.

## Multisite

Sikshya is `Network: true`. WooCommerce can also run on multisite. Two patterns:

- **One academy per subsite** — each subsite has its own Sikshya install + content. The Pro **Multisite & network license tools** add-on helps manage licenses across subsites.
- **Network-wide marketing site + per-subsite academy** — landing on `example.com` redirects to `school.example.com/courses/`.

## Plugins that often conflict (and the fix)

| Plugin                                  | Symptom                                         | Fix                                          |
| ---                                     | ---                                             | ---                                          |
| Heavy CSS frameworks (Avada, Total)     | Course card layout shifts                       | Override `card.php` in your child theme.     |
| Aggressive minifiers (Autoptimize)      | React admin shell breaks                        | Exclude `/wp-admin/` from minification.       |
| Login redirect plugins                  | Sikshya virtual login fails                     | Whitelist `?sikshya_page=login`.              |
| Membership plugins (MemberPress, Restrict Content Pro) | Lock Sikshya's `/learn/`         | Add Sikshya virtual pages to the plugin's exclusion list. |
| 2FA / SSO plugins                        | Account creation at checkout fails              | Allow programmatic user creation; whitelist `sikshya_*` actions. |

## Related

- [Payments](/guide/payment-settings) — gateway configuration.
- [Pro add-ons](/guide/third-party-integrations).
- [Troubleshooting](/guide/troubleshooting).
