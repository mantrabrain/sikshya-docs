---
title: Quick start (setup wizard)
description: Run the Sikshya LMS setup wizard, configure required pages, currency, and gateways, and publish your first course in under an hour.
---

# Quick start

This walkthrough takes a fresh WordPress site to a **published, paid course** in under an hour. We recommend doing it on staging, then importing or re-creating on production once you're happy.

## Step 1 — Run the setup wizard

After you activate Sikshya for the first time, the dashboard opens an admin notice prompting you to run the **Setup wizard** (`templates/admin/setup-wizard.php`). Click it. The wizard walks through:

1. **Store / academy details** — site title, default country, default currency, currency position (`$199`, `199$`, `$ 199`, `199 $`), thousand and decimal separators.
2. **Required pages** — Sikshya creates virtual pages for cart, checkout, learner account, learn hub, login, and order. You can let the wizard pick defaults or map existing pages.
3. **Payment gateways** — toggle PayPal and Stripe, paste keys (test or live).
4. **Sample data** — install a sample course (one course, one chapter, one lesson, one quiz). Useful on staging; skip on production.
5. **Finish** — the wizard hands you back to the Sikshya dashboard.

> You can **re-run** the setup wizard any time from **Sikshya → Tools → Setup wizard**. It is non-destructive — settings you have already changed are pre-filled.

## Step 2 — Confirm permalinks

Sikshya needs pretty permalinks. Open **Settings → Permalinks** and pick **Post name** (or any non-Plain option). Save.

The plugin registers a query var `sikshya_page` and rewrites for the virtual pages:

| Virtual page | Pretty URL                           | Plain fallback              |
| ---          | ---                                  | ---                         |
| Cart         | `/cart/`                             | `/?sikshya_page=cart`       |
| Checkout     | `/checkout/`                         | `/?sikshya_page=checkout`   |
| Account      | `/my-learning/` (default)            | `/?sikshya_page=account`    |
| Learn hub    | `/learn/`                            | `/?sikshya_page=learn`      |
| Login        | `/login/`                            | `/?sikshya_page=login`      |
| Order        | `/order/`                            | `/?sikshya_page=order`      |

You can rename slugs under **Sikshya → Settings → Permalinks**.

## Step 3 — Pick a default theme behavior

Sikshya works with any well-coded WordPress theme. If layouts break:

- Switch temporarily to **Twenty Twenty-Five** to isolate theme CSS conflicts.
- Or override the templates by copying any file from `wp-content/plugins/sikshya/templates/` into `wp-content/themes/{your-theme}/sikshya/`.

## Step 4 — Configure a payment gateway

Without a gateway, you can still publish **free** courses and accept manual enrollments. To take real money:

1. Open **Sikshya → Settings → Payments**.
2. Enable a gateway (Stripe or PayPal in the free core; Razorpay / Mollie / Paystack / Square / Authorize.Net / Bank Transfer with Pro).
3. Paste your **test** keys first.
4. Save. Run a test purchase. Then switch to live keys.

> **Important:** Stripe lives in the free plugin's gateway registry but only activates at checkout when a Pro license is active (`PaymentGatewayRegistry::clientPayload()` returns `locked: true` for tier `pro` when `TierCapabilities::isActive()` is false). If you don't have Pro, **PayPal** is the active gateway out of the box.

See [Payments](/guide/payment-settings) for the full gateway reference.

## Step 5 — Publish your first course

1. **Sikshya → Courses → Add New** opens the React course builder.
2. Fill the **Course details**: title, summary, full description, featured image, category and tag (taxonomies `sikshya_course_category` and `sikshya_course_tag`), difficulty (`sikshya_difficulty`), price.
3. Switch to the **Curriculum** tab. Add a **chapter** (`sik_chapter`), then a **lesson** (`sik_lesson`) — text, video URL, or downloadable. Save lesson order with drag-and-drop.
4. Add a **quiz** (`sik_quiz`) with a couple of multiple-choice questions. Set passing score, attempts, and time limit if applicable.
5. **Publish**.
6. Visit the public course URL in a private window — you should see the catalog card and the single-course page.

## Step 6 — Make a test purchase

1. Sign out of the admin account (or use a private window).
2. Open the course page → **Enroll** / **Buy**.
3. The cart and checkout render via Sikshya's virtual pages. Sign up as a new student or sign in.
4. Complete the test transaction with a test card / sandbox PayPal account.
5. Land on the order confirmation page. The order should appear under **Sikshya → Orders** as **completed**, and the test student should be enrolled in **Sikshya → Enrollments**.

## Step 7 — Verify the learner experience

As the freshly enrolled student:

1. Open **My learning** (`/my-learning/`) — you should see the course you bought.
2. Click **Start learning** — the learn hub (`/learn/`) opens with the lesson player and curriculum sidebar.
3. Mark the first lesson as complete — progress bumps to 1/N.
4. Take the quiz. Pass it. Complete the course.
5. The certificate (basic / Regalia or Vertex preset) should be issued and visible from the account page.

You're done — that's a working LMS.

## Recommended next steps

- Add at least one **coupon** to test discount flow (**Sikshya → Coupons**).
- Send yourself the **Welcome email** to confirm SMTP / deliverability — see [Email & notifications](/guide/email-settings).
- Connect a **CRM** or **Mailchimp** (Pro) — see [Pro add-ons](/guide/third-party-integrations).
- Plan upgrade triggers — drip and prerequisites unlock the moment a learner needs structure (Pro). See [Enrollment & access](/guide/enrollment-settings).
