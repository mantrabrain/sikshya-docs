---
title: Payments & gateways
description: Connect PayPal in the free Sikshya plugin, plus the Pro premium gateways — Stripe, Razorpay, Mollie, Paystack, Square, Authorize.Net, and Bank Transfer.
---

# Payments & gateways

<div class="doc-pro-callout">
  <span class="doc-pro-pill">Pro</span>
  <span><strong>Stripe &amp; other premium gateways are Sikshya Pro.</strong> The free plugin ships PayPal &amp; Offline. Activate a license under <em>Sikshya → License</em> to unlock the rest.</span>
  <a class="doc-pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing" target="_blank" rel="noopener">View pricing →</a>
</div>

Sikshya's free plugin includes **PayPal** as a fully-working gateway and **Offline / manual** for B2B or invoiced sales. **Stripe is not in the free plugin** — Stripe and the other premium gateways (Razorpay, Mollie, Paystack, Square, Authorize.Net, Bank Transfer) are **Pro-only add-ons** that you turn on under <span class="screen-path">Sikshya → Add-ons</span> after activating a license.

## What's included

| Gateway              | Free    | Pro    | Notes                                          |
| ---                  | ---     | ---    | ---                                            |
| **PayPal**           | ✅      | ✅      | Simple (email + IPN) and Advanced (REST + webhooks) modes. |
| **Offline / manual** | ✅      | ✅      | Bank deposit, Stripe outside Sikshya, B2B invoices. Admin marks orders paid. |
| **Stripe**           | —       | ✅      | Pro-only add-on. One-time + recurring (with the Subscriptions add-on). |
| **Razorpay**         | — <span class="pro-pill">PRO</span>  | ✅      | India: cards, UPI, netbanking, wallets.        |
| **Mollie**           | — <span class="pro-pill">PRO</span>  | ✅      | Europe: iDEAL, Bancontact, SEPA, cards.        |
| **Paystack**         | — <span class="pro-pill">PRO</span>  | ✅      | Africa-first; cards, transfers, mobile money.  |
| **Square**           | — <span class="pro-pill">PRO</span>  | ✅      | North America / UK / AU / JP cards.            |
| **Authorize.Net**    | — <span class="pro-pill">PRO</span>  | ✅      | US-centric cards.                              |
| **Bank Transfer**    | — <span class="pro-pill">PRO</span>  | ✅      | Manual settlement, with bank details on the order. |

## Where to configure

Open <span class="screen-path">Sikshya → Settings → Payment</span>.

The screen has three sections:

1. **Pricing & taxes** — tax rate (%), "prices include tax", currency.
2. **Discounts & coupons** — allow coupons site-wide, max discount, default coupon lifetime.
3. **Invoicing** — auto-create invoices on success, invoice number prefix.

Below those is the **Payment gateways** section. Each gateway is a row you can toggle on / off. Pro-gated gateways display a **PRO** badge until you have an active license.

For each enabled gateway, expand the row to see its specific fields (described below).

## PayPal (free)

PayPal is the primary free gateway. Two modes:

### Simple mode

Easy setup — just an email address.

<ol class="step-list">
  <li>Tick <strong>Enable PayPal</strong>.</li>
  <li>Set <strong>Integration mode</strong> to <strong>Simple (email + IPN)</strong>.</li>
  <li>Paste your <strong>PayPal email</strong>.</li>
  <li>Tick <strong>Test mode (sandbox)</strong> until you've tested.</li>
  <li>Save.</li>
</ol>

The buy button redirects to PayPal. PayPal posts a notification (IPN) back to `/wp-json/sikshya/v1/webhooks/paypal-ipn`. Sikshya verifies and fulfills the order.

### Advanced (REST) mode

Full webhook support, recurring payments, and better reporting. Requires PayPal developer credentials.

<ol class="step-list">
  <li>In your PayPal developer dashboard, create an app and copy the <strong>Client ID</strong> and <strong>Secret</strong>.</li>
  <li>Set up a webhook on the PayPal app pointing to <code>https://yoursite.com/wp-json/sikshya/v1/webhooks/paypal</code>.</li>
  <li>Copy the <strong>Webhook ID</strong>.</li>
  <li>In Sikshya, set <strong>Integration mode</strong> to <strong>Advanced (REST)</strong>, paste the three values.</li>
  <li>Save.</li>
</ol>

## Offline / manual (free)

Useful for B2B, invoices, or "wire to our bank account" customers.

<ol class="step-list">
  <li>Tick <strong>Enable offline / manual payment</strong>.</li>
  <li>Type the <strong>Offline payment instructions</strong> learners see at checkout (e.g. wire details, contact info).</li>
  <li>Tick <strong>Auto-enroll after offline checkout</strong> if you want learners enrolled immediately, or leave off if you want to verify payment first.</li>
</ol>

When a learner picks **Offline** at checkout, Sikshya creates a **Pending** order. Once you've received the money:

- Open <span class="screen-path">Commerce → Sales → Orders</span>.
- Click the row → **Mark paid**.
- Choose **Mark paid and enroll now** (the learner gets enrolled and emailed).

## Stripe <span class="pro-pill">PRO</span>

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Stripe — cards, wallets, and recurring billing</span>
  </div>
  <p class="pro-callout__desc">Stripe is a <strong>Pro-only</strong> gateway — it isn't bundled with the free Sikshya plugin. After activating a Pro license and toggling the Stripe add-on under <span class="screen-path">Sikshya → Add-ons</span>, the gateway shows up in <span class="screen-path">Settings → Payment</span>. With Pro you can also pair Stripe with the <strong>Subscriptions</strong> add-on for recurring courses.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Unlock Stripe →</a>
</div>

Setup (after activating Pro):

<ol class="step-list">
  <li>Tick <strong>Enable Stripe</strong>.</li>
  <li>Paste <strong>Publishable key</strong> and <strong>Secret key</strong> from your Stripe dashboard.</li>
  <li>Create a webhook in Stripe pointing to <code>https://yoursite.com/wp-json/sikshya/v1/webhooks/stripe</code>.</li>
  <li>Copy the webhook signing secret (<code>whsec_...</code>) and paste into <strong>Webhook secret</strong>.</li>
  <li>Tick <strong>Test mode (sandbox)</strong>, save, run a test transaction with card <code>4242 4242 4242 4242</code>.</li>
  <li>Switch to live keys and run one tiny live transaction, then refund it via the Stripe dashboard to verify the full loop.</li>
</ol>

## Razorpay <span class="pro-pill">PRO</span>

Popular in India.

- **Key ID** + **Key Secret** from the Razorpay dashboard.
- Webhook URL: `https://yoursite.com/wp-json/sikshya/v1/webhooks/razorpay`.
- Optional **Webhook secret**.

## Mollie <span class="pro-pill">PRO</span>

Strong in Europe (Netherlands, Belgium, Germany, France).

- **API key** (one key for live or test, prefixed `live_` / `test_`).
- Optional list of **Payment methods** to offer (iDEAL, Bancontact, etc.).
- Optional **Webhook secret**.

## Paystack <span class="pro-pill">PRO</span>

Africa-first; supports recurring (works with **Subscriptions** add-on).

- **Public key** + **Secret key** from the Paystack dashboard.
- Optional **Payment channels** (e.g. card-only, bank-only).
- Optional **Webhook secret**.

## Square <span class="pro-pill">PRO</span>

US, UK, Canada, Australia, Japan.

- **Application ID**, **Access token**, **Location ID**, **Webhook signature key**.
- Sandbox has its own credentials.

## Authorize.Net <span class="pro-pill">PRO</span>

US-centric; popular with established merchants.

- **API Login ID**, **Public client key**, **Transaction key**, **Signature key**.
- Sandbox URL: `https://sandbox.authorize.net`.

## Bank Transfer <span class="pro-pill">PRO</span>

For accountants who need a real bank reference.

Fields:

- **Bank name**, **Account name**, **Account number**, **Routing / SWIFT**, **Instructions**.

These details show on the order page. The order is **Pending** until you mark it paid, just like Offline / manual.

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Six premium gateways + bank transfer</span>
  </div>
  <p class="pro-callout__desc">Razorpay, Mollie, Paystack, Square, Authorize.Net, and Bank Transfer are all part of Sikshya Pro. One license, every gateway you'll need.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Compare Pro plans →</a>
</div>

## Refunds

The order detail page has a **Refund** action. Three patterns:

| Gateway              | Recommended refund flow                                              |
| ---                  | ---                                                                  |
| **PayPal / Stripe**  | Refund in the gateway dashboard first, then mark refunded in Sikshya. |
| **Razorpay / Mollie / Paystack / Square / Authorize.Net** | Same — gateway dashboard first, then mark refunded. |
| **Offline / Bank Transfer** | Refund manually via your bank, then mark refunded.            |

When you mark refunded:

- The order status changes to **Refunded**.
- The enrollment is cancelled.
- A refund row is written in your payments table.
- The `sikshya_user_unenrolled` action fires (so any downstream automation runs).

The setting **Try to refund automatically when a student leaves** under Enrollment exists but its reliability depends on the gateway adapter. Treat it as a convenience, not a guarantee.

## Test mode workflow

A safe way to test any gateway:

<ol class="step-list">
  <li>Toggle <strong>Test mode (sandbox)</strong> on for the gateway.</li>
  <li>Paste sandbox / test keys.</li>
  <li>Set up the gateway webhook in <em>sandbox</em> mode pointing to your <strong>staging</strong> URL — never live URL with test keys, never live keys with localhost.</li>
  <li>Buy a course as a fresh test learner with the gateway's test card or sandbox account.</li>
  <li>Verify: order shows <strong>Paid</strong>, learner shows under <strong>Enrollments</strong>, the receipt email arrives.</li>
  <li>Switch to <strong>Live</strong> mode, paste live keys, change the webhook to live mode, and run one small live transaction with a real card. Refund it via the gateway dashboard.</li>
</ol>

## Currency

Set under <span class="screen-path">Settings → General</span>:

- **Currency** — code (USD, EUR, INR, NPR, …).
- **Currency position** — `$199`, `199$`, `$ 199`, or `199 $`.
- **Thousand separator** — `,` or `.` or space.
- **Decimal separator** — `.` or `,`.
- **Number of decimals** — usually 2 (or 0 for JPY).

> Sikshya stores prices as floats. For very high transaction volume, ask your developer about high-precision migrations.

## Webhook URLs (cheat sheet)

Copy these into the corresponding gateway dashboard:

```
https://yoursite.com/wp-json/sikshya/v1/webhooks/paypal
https://yoursite.com/wp-json/sikshya/v1/webhooks/paypal-ipn
https://yoursite.com/wp-json/sikshya/v1/webhooks/stripe
https://yoursite.com/wp-json/sikshya/v1/webhooks/razorpay
https://yoursite.com/wp-json/sikshya/v1/webhooks/mollie
https://yoursite.com/wp-json/sikshya/v1/webhooks/paystack
https://yoursite.com/wp-json/sikshya/v1/webhooks/square
https://yoursite.com/wp-json/sikshya/v1/webhooks/authorize-net
```

## What's next

- [Email & notifications](/email-settings) — the receipts and welcome emails that fire after payment.
- [Pro add-ons](/third-party-integrations) — every Pro feature, including subscriptions.
- [Troubleshooting](/troubleshooting) — what to do when payments don't show up.
