---
title: Payments
description: Configure Stripe, PayPal, and the Sikshya Pro premium gateways (Razorpay, Mollie, Paystack, Square, Authorize.Net, Bank Transfer, Subscriptions). Includes refund flow, webhook URLs, and test mode.
---

# Payments

Sikshya's free plugin includes **PayPal** as a fully working gateway, and **Stripe** is registered but **gated to Pro** at checkout. Sikshya Pro unlocks Stripe at checkout plus six more premium gateways and recurring subscriptions.

## What's included

| Gateway              | Free     | Pro      | Capabilities                                   |
| ---                  | ---      | ---      | ---                                            |
| **PayPal** (REST)    | ✅       | ✅       | One-time. Webhook + IPN supported.             |
| **PayPal IPN** (legacy) | ✅    | ✅       | Simple mode for legacy buyers.                 |
| **Stripe**           | (locked\*) | ✅     | One-time + recurring (with subscriptions add-on). |
| **Razorpay**         | —        | ✅       | One-time + UPI / cards / wallets (India).      |
| **Mollie**           | —        | ✅       | iDEAL, Bancontact, SEPA, cards (EU).           |
| **Paystack**         | —        | ✅       | Africa-first; one-time + recurring.            |
| **Square**           | —        | ✅       | One-time; cards.                               |
| **Authorize.Net**    | —        | ✅       | Cards (US-centric).                            |
| **Bank Transfer**    | —        | ✅       | Manual / offline reconciliation.               |

\* Stripe is registered in the gateway registry (`PaymentGatewayRegistry.php`) with `tier: 'pro'`. Without an active Pro license, `clientPayload()` flags it `locked: true` and `CheckoutTemplateData::gatewaysConfigured()` only returns Stripe when `TierCapabilities::isActive()` is true. **PayPal does not require Pro** to function on checkout.

## Where to configure

**Sikshya → Settings → Payment**. Each gateway has a row with:

- **Enable** toggle.
- **Test mode** toggle (where supported).
- **Live keys** + **Test keys** sections.
- **Webhook URL** — copy this and paste it into your gateway's dashboard.
- **Webhook secret** — paste back from the gateway dashboard.

## PayPal

Configured fields (`paypal_*` setting keys):

- **Integration mode** — `simple` (IPN) or `rest` (recommended).
- **PayPal email** — your live PayPal account.
- **Client ID + Secret** — REST API credentials from the PayPal developer dashboard.
- **Mode** — `sandbox` or `live`.
- **Webhook ID** — set up a PayPal webhook for `BILLING.SUBSCRIPTION.*` and `CHECKOUT.ORDER.APPROVED`.

Webhook URL: `POST /wp-json/sikshya/v1/webhooks/paypal` (REST) or `/webhooks/paypal-ipn` (legacy IPN). The handlers call:

- `Sikshya\Api\WebhooksRestRoutes::handlePaypalWebhook()` — verifies the webhook id and signs.
- `sikshya_webhook_paypal_subscription_event` — fires for subscription events (`WebhooksRestRoutes.php:200`).

## Stripe

Configured fields (`stripe_*` setting keys):

- **Publishable key** + **Secret key** (live).
- **Test publishable key** + **Test secret key**.
- **Webhook secret** — paste from the Stripe dashboard (required for webhook handler to accept events).
- **Test mode** toggle.

Webhook URL: `POST /wp-json/sikshya/v1/webhooks/stripe`. The handler:

1. Reads the raw body and `Stripe-Signature` header.
2. Verifies against the configured `stripe_webhook_secret`.
3. Routes the event:
   - One-time `checkout.session.completed` → fulfillment via `OrderFulfillmentService`.
   - `customer.subscription.*` → fires `sikshya_webhook_stripe_subscription_event`.
   - `invoice.*` → fires `sikshya_webhook_stripe_invoice_payment`.

## Pro premium gateways

All Pro gateways live under `sikshya-pro/src/PaymentGateways/<Name>/`. They follow the same pattern: settings rows under **Payment**, webhook URL `/wp-json/sikshya/v1/webhooks/{gateway}` (where supported), and refund-marking hooks.

### Razorpay

- Cards, UPI, netbanking, wallets — popular in India.
- Configure with **Key ID** + **Key Secret** + (optional) **Webhook secret**.
- Live and test keys are paired; the test keys are clearly suffixed in the Razorpay dashboard.

### Mollie

- European-friendly; iDEAL (NL), Bancontact (BE), SEPA, cards.
- Configure with **API key** (one key contains live or test depending on the prefix).
- Mollie issues a profile per website — make sure your live profile is approved before going live.

### Paystack

- Africa-first; cards, transfers, mobile money.
- Configure with **Public key** + **Secret key**.
- Supports recurring (works with the subscriptions add-on).

### Square

- North America / UK / AU / JP cards.
- Configure with **Application ID** + **Access token** + **Location ID**.
- Square sandbox mode is its own set of credentials.

### Authorize.Net

- US-centric cards.
- Configure with **API login ID** + **Transaction key** + (optional) **Signature key** for webhooks.
- Use sandbox.authorize.net for testing.

### Bank Transfer

- Manual / offline gateway. Useful for B2B, schools, or markets where online cards aren't accepted.
- Configure with bank account details and instructions to display on the order page.
- Orders are created as **pending**. Admin marks them **paid** in **Sikshya → Orders → Order detail → Mark paid** which calls `POST /admin/orders/{id}/mark-paid`.

## Refunds

Sikshya tracks refunds **as data** on the order:

- The order can be marked **refunded** from the order detail screen.
- The `sikshya_payments` row gets a `refund_date` and `refund_amount`.
- Enrollments tied to that order are revoked (with `sikshya_user_unenrolled` hook).

Whether the **money actually moves** is up to the gateway:

- **Stripe / PayPal** — refund first in the gateway dashboard, then mark refunded in Sikshya. (More reliable than auto-call which can fail silently if keys / state are off.)
- **Bank Transfer** — refund the customer manually via your bank, then mark refunded.
- **Razorpay / Mollie / Paystack / Square / Authorize.Net** — same pattern.

The setting **"Try to refund automatically on unenroll"** exists (`SettingsManager.php`) but its reliability depends on the gateway adapter; treat it as a convenience, not a guarantee.

## Test mode workflow

A safe test plan:

1. Toggle **Test mode** on for the gateway.
2. Paste **test keys**.
3. Set up the webhook in the gateway sandbox pointing to your **staging** URL — never your live URL with test keys, and never your live keys with localhost.
4. Buy a course as a fresh learner.
5. Confirm:
   - The order shows as **completed** in Sikshya → Orders.
   - Enrollment row is created in Sikshya → Enrollments.
   - The `sikshya_user_enrolled` and `sikshya_order_fulfilled` actions fire.
   - The receipt email lands.
6. Switch to **Live mode** and run **one tiny live transaction** with a real card (e.g. $1) and refund it via the gateway dashboard. Confirm the refund mark in Sikshya.

## Currency

Set under **Sikshya → Settings → General**:

- **Currency** — code (USD, EUR, INR, NPR, …).
- **Currency position** — `$199`, `199$`, `$ 199`, or `199 $`.
- **Thousand separator** — `,` or `.`.
- **Decimal separator** — `.` or `,`.

> Sikshya stores prices as **floats**. For high-cardinality fiat use cases (e.g. tens of thousands of orders / month), switch your DB columns to higher precision via a custom migration.

## Webhook URLs (cheat sheet)

```
https://example.com/wp-json/sikshya/v1/webhooks/stripe
https://example.com/wp-json/sikshya/v1/webhooks/paypal
https://example.com/wp-json/sikshya/v1/webhooks/paypal-ipn
https://example.com/wp-json/sikshya/v1/webhooks/razorpay     (Pro)
https://example.com/wp-json/sikshya/v1/webhooks/mollie       (Pro)
https://example.com/wp-json/sikshya/v1/webhooks/paystack     (Pro)
https://example.com/wp-json/sikshya/v1/webhooks/square       (Pro)
https://example.com/wp-json/sikshya/v1/webhooks/authorize-net (Pro)
```

## Tax & invoices

- Free Sikshya supports a **simple tax** rate at checkout (toggle + percent).
- Invoices: `Sikshya\Services\InvoiceIssuanceService` issues an invoice on a successful order and fires `sikshya_invoice_issued` (`InvoiceIssuanceService.php:77`).
- Invoice template: `templates/order-invoice.php`.

For complex tax (VAT, GST per region) you'll want a tax engine plugin or to extend via the order fulfillment hooks.

## Hooks for gateway extension

```php
// Add a custom gateway to the registry
add_filter('sikshya_payment_gateways_registry', function ($registry) {
    $registry['mygateway'] = [
        'id'          => 'mygateway',
        'label'       => 'My gateway',
        'description' => 'Pay with ACME',
        'tier'        => 'free', // or 'pro' if licensed
        'enabled'     => true,
        'settings'    => [...],
    ];
    return $registry;
});

// Wrap a third-party gateway session at checkout start
add_filter('sikshya_checkout_start_gateway_session', function ($session, $order, $gatewayId) {
    if ($gatewayId !== 'mygateway') return $session;
    return [
        'redirect_url' => 'https://gateway.example.com/pay?...',
    ];
}, 10, 3);

// Confirm the order from your gateway's webhook
do_action('sikshya_checkout_confirm_gateway', $order_id, 'mygateway', $payload);
```

## Related

- [Enrollment & access](/guide/enrollment-settings) — what payment unlocks.
- [Pro add-ons → Subscriptions](/guide/third-party-integrations#subscriptions-memberships).
- [Hooks & filters](/guide/hooks-filters) — full list of payment-related hooks.
- [REST API](/guide/api-reference) — checkout and webhook routes.
