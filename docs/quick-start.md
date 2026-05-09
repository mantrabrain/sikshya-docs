---
title: Quick start (the setup wizard)
description: Use the Sikshya setup wizard to pick pages and currency, connect a payment method, and publish your first paid course in under an hour.
---

# Quick start

**Tip:** The **Sikshya** admin is one big app with a sidebar. Use [Your WordPress admin (Sikshya)](/admin-dashboard) if you’re not sure where **Courses**, **Sales**, or **Addons** live.

This walkthrough takes you from a freshly activated Sikshya plugin to a **published, sellable course** in under an hour. We recommend doing it on a staging site, then re-doing it on production once you're happy.

## Overview

Here's what you'll do:

1. Run the **Setup wizard** (5 minutes).
2. Confirm WordPress permalinks are set up.
3. Connect a payment method (or skip for now if you only sell free courses).
4. Build and publish your first course.
5. Make a test purchase.
6. Verify the learner experience.

## Step 1 — Run the setup wizard

After you activate Sikshya for the first time, you'll see a notice prompting you to **Run the setup wizard**. The wizard has 5 small steps:

<ol class="step-list">
  <li><strong>Welcome</strong> — optionally tick "Help improve Sikshya by sharing anonymous usage data." This is opt-in and never collects learner personal information.</li>
  <li><strong>Pages</strong> — Sikshya creates the pages it needs (Cart, Checkout, Student account, Learning area, Order receipt). You can keep the defaults or pick existing pages.</li>
  <li><strong>Currency</strong> — pick your currency (USD, EUR, INR, NPR, etc.), symbol position, and decimal options. There's a live preview showing how prices will look.</li>
  <li><strong>Lesson links</strong> — choose <strong>Stable (recommended)</strong> for SEO-friendly URLs, or <strong>Shorter URL</strong> for compact links.</li>
  <li><strong>Finish</strong> — review the summary. You can also click <strong>Add sample course</strong> here to seed one course, one lesson, and one quiz so you have something to play with.</li>
</ol>

<div class="ui-tip"><strong>Want to re-run the wizard later?</strong> Open <span class="screen-path">Sikshya → Tools → Maintenance → Open setup wizard</span>. It's non-destructive — already saved settings stay in place.</div>

## Step 2 — Confirm permalinks

Sikshya needs WordPress to use pretty permalinks. Open <span class="screen-path">Settings → Permalinks</span> and make sure **Plain** is **not** selected. Pick **Post name** if you're not sure.

Click **Save Changes** even if you didn't change anything — saving flushes the rewrite rules so all of Sikshya's URLs work.

After this, these URLs should resolve on the front of your site:

| URL              | What it shows                       |
| ---              | ---                                 |
| `/courses/`      | Public course catalog               |
| `/cart/`         | Cart page                           |
| `/checkout/`     | Checkout page                       |
| `/my-learning/`  | Learner account / "My courses"      |
| `/learn/`        | Learn hub (after enrolling)         |
| `/login/`        | Sikshya login form                  |

You can rename any of these slugs later in <span class="screen-path">Sikshya → Settings → Permalinks</span>.

## Step 3 — Connect a payment method

If your courses are **free**, skip to Step 4. Otherwise:

<ol class="step-list">
  <li>Open <span class="screen-path">Sikshya → Settings → Payment</span>.</li>
  <li>Tick <strong>Enable PayPal</strong> (the free plugin's primary gateway).</li>
  <li>Choose the integration mode (<strong>Simple</strong> for IPN-only with just an email, or <strong>Advanced (REST)</strong> for full webhook support).</li>
  <li>Paste your <strong>Client ID</strong>, <strong>Secret</strong>, and (for REST) <strong>Webhook ID</strong> from the PayPal developer dashboard.</li>
  <li>Tick <strong>Test mode (sandbox)</strong> for now.</li>
  <li>Click <strong>Save</strong>.</li>
</ol>

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Need Stripe, Razorpay, Mollie, Paystack, Square, Authorize.Net, or Bank Transfer?</span>
  </div>
  <p class="pro-callout__desc">These gateways are part of <strong>Sikshya Pro</strong>. You'll see them listed in <span class="screen-path">Settings → Payment</span> with a <strong>PRO</strong> badge — enabling them requires an active Pro license.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Compare Pro plans →</a>
</div>

The full gateway-by-gateway guide lives on the [Payments](/payment-settings) page.

## Step 4 — Build your first course

Now the fun part.

<ol class="step-list">
  <li>Click <span class="screen-path">Sikshya → Courses</span>, then click <strong>+ Add new course</strong> in the top right.</li>
  <li>The Course Builder opens with four tabs across the top: <strong>Course details</strong>, <strong>Pricing &amp; access</strong>, <strong>Curriculum</strong>, <strong>Course options</strong>.</li>
  <li>On the <strong>Course details</strong> tab, type a <strong>Course title</strong>, a one-line <strong>Short teaser</strong>, and a <strong>Full description</strong>. Pick a <strong>Primary category</strong>, set a <strong>Difficulty level</strong>, and upload a <strong>Featured image</strong>.</li>
  <li>On the <strong>Pricing &amp; access</strong> tab, choose <strong>Free Course</strong> or <strong>Paid Course</strong> and set the price. Leave <strong>Who can sign up?</strong> at <strong>Open</strong> for now.</li>
  <li>On the <strong>Curriculum</strong> tab, click <strong>+ Add chapter</strong>, give it a name like "Introduction", then click <strong>+ Add lesson</strong> inside. Pick <strong>Text lesson</strong> and add a few paragraphs.</li>
  <li>Add a <strong>Quiz</strong> next to the lesson — even one multiple-choice question is enough to test the flow.</li>
  <li>Click <strong>Publish</strong> in the top right.</li>
</ol>

Open the course URL in a private browser window (so you're not signed in as admin). You should see the public course page with an **Enroll** or **Buy** button.

## Step 5 — Make a test purchase

While in your private window:

<ol class="step-list">
  <li>Click <strong>Enroll</strong> (free) or <strong>Buy</strong> (paid).</li>
  <li>Sikshya's checkout opens. If you're not signed in, you'll see fields to create a learner account inline.</li>
  <li>For paid: pay with your gateway's test card / sandbox account.</li>
  <li>You should land on the <strong>Order confirmation</strong> page.</li>
</ol>

Back in the admin:

- Open <span class="screen-path">Sikshya → Sales → Orders</span> — the order should be **Paid**.
- Open <span class="screen-path">Sikshya → People → Enrollments</span> — the test learner should be enrolled.
- Check email — the **Welcome / enrollment** and **Receipt** templates should have arrived.

## Step 6 — Verify the learner experience

Still as the test learner:

<ol class="step-list">
  <li>Open <code>/my-learning/</code> — the course should be in <strong>My courses</strong>.</li>
  <li>Click <strong>Start learning</strong> → the lesson opens in the learn player with a curriculum sidebar on the left.</li>
  <li>Click <strong>Mark complete</strong> at the bottom of the lesson — progress bumps to 1 of N.</li>
  <li>Take the quiz, pass it, finish the course.</li>
  <li>The certificate should appear under <strong>My learning → Certificates</strong>.</li>
</ol>

That's a working LMS.

## Recommended next moves

- Add a **discount code** under <span class="screen-path">Sikshya → Commerce → Coupons</span> to test the discount flow.
- Connect a real **transactional email service** (SendGrid, Postmark, Mailgun) — `wp_mail()` alone is unreliable for production. See [Email & notifications](/email-settings).

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Drip courses for cohorts and paced programs</span>
  </div>
  <p class="pro-callout__desc">Want to release lessons by date, X-days-after-enrollment, or per cohort instead of "complete in order"? That's the <strong>Content drip</strong> add-on.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Upgrade to Sikshya Pro →</a>
</div>
