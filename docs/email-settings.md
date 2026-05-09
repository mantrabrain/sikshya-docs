---
title: Email & notifications
description: Edit the transactional emails Sikshya sends, configure deliverability, and unlock branded templates, drip notifications, ESP delivery, and CRM automation with Sikshya Pro.
---

# Email & notifications

<div class="doc-pro-callout">
  <span class="doc-pro-pill">Pro</span>
  <span><strong>Branded templates, drip notifications, ESP delivery &amp; CRM automation are Sikshya Pro.</strong> The free plugin sends every transactional email out of the box.</span>
  <a class="doc-pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing" target="_blank" rel="noopener">View pricing →</a>
</div>

Sikshya sends transactional emails at every important moment — welcome, enrollment, purchase, completion, certificate issued. This page is the practical guide for editing them, making them deliverable, and unlocking branded / automated email with Pro.

## The Email hub

Open <span class="screen-path">Sikshya → Email</span>. Two tabs:

- **Delivery** — site-wide sender settings.
- **Templates** — every transactional email, listed individually.

## Delivery settings

The Delivery tab covers the **basics that decide whether your emails land in inboxes or spam**:

- **Main LMS contact email** — the academy's contact address (used in receipts, "reply to" headers).
- **Where to send admin notices** — admin notifications go here. Default: site admin email.
- **From address** — the visible "From" address. Use a `noreply@yourdomain.com` on a domain you control.
- **From name** — usually your academy / company name.
- **Reply address** — where replies go (default: same as From).
- **Allow Sikshya to send transactional email** — master kill-switch. Leave on.
- **Email the certificate to the learner** — toggle to also attach / link the certificate in the Course completed email.

<div class="ui-tip"><strong>Important:</strong> WordPress's built-in <code>wp_mail()</code> is unreliable on most hosts. Connect a real ESP (SendGrid, Postmark, Mailgun, Amazon SES) using a transport plugin like <strong>WP Mail SMTP</strong>, <strong>FluentSMTP</strong>, or <strong>Post SMTP</strong>. Then configure SPF, DKIM, and DMARC for the From domain.</div>

## Templates

The Templates tab lists every email type in your store, with columns:

- **Name** — what the template does.
- **Audience** — admin, instructor, or learner.
- **Trigger** — what fires it (event name).
- **Status** — Active or Inactive.

Search the list by name. Tick rows to **Enable selected**, **Disable selected**, or bulk-delete custom templates.

### Free transactional emails

These ship with the free plugin and are seeded on activation:

| Template                          | Audience  | Triggered by                              |
| ---                               | ---       | ---                                       |
| **Welcome email**                 | Learner   | New user registration                     |
| **Course enrollment**             | Learner   | Enrolled in a course                       |
| **New enrollment notice**         | Admin     | Enrolled in a course                       |
| **Instructor's new enrollment**   | Instructor| Enrolled in a course                       |
| **Payment receipt**               | Learner   | Order fulfilled                            |
| **Order fulfilled notice**        | Admin     | Order fulfilled                            |
| **Course completed**              | Learner   | Course completion                          |
| **Certificate issued**            | Learner   | Certificate issued                         |
| **Progress reminder**             | Learner   | Inactivity reminder (Pro extends)         |

### Pro-only templates

When a Pro add-on is active, more templates appear here. Examples:

| Template                              | Available with                                |
| ---                                   | ---                                           |
| **Drip lesson unlocked** <span class="pro-pill">PRO</span> | Drip notifications add-on   |
| **Drip course unlocked** <span class="pro-pill">PRO</span> | Drip notifications add-on   |
| **Daily drip digest** <span class="pro-pill">PRO</span>    | Drip notifications add-on   |
| **New question** (instructor) <span class="pro-pill">PRO</span> | Community discussions / Q&A |

## Edit a template

Click any template name to open the editor:

### Top of the page

- **← Back to templates** — list view.
- **Preview** — opens a sample render in a new tab.
- **Save template** — persists changes.
- **Status toggle** — Active / Inactive.

### Fields

- **Template name** — internal label (won't change behavior).
- **Description** — short note for your team.
- **Trigger event** — system templates show this as read-only; custom templates let you pick from the trigger list.
- **Send to (merge tags)** — who receives this. Use tags like `{{learner_email}}`, `{{instructor_email}}`, `{{admin_email}}`.
- **Subject line** — supports merge tags (e.g. "Welcome to {{site_name}}!").
- **Email body (HTML)** — the full message. The right rail lists every variable you can use; click one to copy.

### Available merge tags

The most-used:

| Tag                         | Renders                              |
| ---                         | ---                                  |
| `{{site_name}}`             | Your site / academy name             |
| `{{site_url}}`              | Site root URL                         |
| `{{learner_name}}`          | Learner's display name                |
| `{{learner_first_name}}`    | First name (parsed)                   |
| `{{learner_email}}`         | Learner's email                       |
| `{{course_title}}`          | Course title                          |
| `{{course_url}}`            | Permalink to the course               |
| `{{lesson_title}}`          | Lesson title (where applicable)       |
| `{{quiz_title}}`            | Quiz title                            |
| `{{order_id}}`              | Sikshya order id                      |
| `{{order_total}}`           | Total in display currency             |
| `{{order_url}}`             | Order detail URL                      |
| `{{certificate_url}}`       | Issued certificate URL                |
| `{{instructor_name}}`       | Instructor display name               |
| `{{login_url}}`             | Login URL                             |
| `{{account_url}}`           | Learner account URL                   |
| `{{date}}` / `{{time}}`     | Now (site timezone)                   |

Whitespace inside braces is OK — `{{ course_title }}` works the same as `{{course_title}}`.

### Locked templates

Some rows show a lock icon and "Add-on required" text. These templates only render when the corresponding Pro add-on is on.

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Drip notifications</span>
  </div>
  <p class="pro-callout__desc">When you use the <strong>Content drip</strong> add-on, the <strong>Drip notifications</strong> add-on emails learners when their next lesson unlocks. Three templates: lesson unlocked, course unlocked, daily digest. Combine them with drip rules for a paced cohort experience.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Unlock drip notifications →</a>
</div>

## Test a template

The fastest test: enroll yourself in a course in a private window and watch the **Welcome** + **Enrollment** + **Receipt** emails land. Or:

- Click the **Preview** button on the template editor — opens a rendered preview without sending.
- Send yourself a manual test enrollment from <span class="screen-path">People → Enrollments</span> → manual enroll.

If a template doesn't fire:

- Check the template **Status** is Active.
- Check delivery is on (<span class="screen-path">Email → Delivery → Allow Sikshya to send transactional email</span>).
- Check your SMTP / ESP plugin shows the message in its log.

## Pro email features

Sikshya Pro layers four email-related add-ons on top of the free transactional pipeline:

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Professional email delivery &amp; branded templates</span>
  </div>
  <p class="pro-callout__desc">Plug Sikshya into a real transactional ESP with a guided UI (no third-party plugin needed) and wrap every message in a branded multi-template kit (header, footer, accent color, logo).</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Unlock branded delivery →</a>
</div>

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Email advanced customization</span>
  </div>
  <p class="pro-callout__desc">Per-template HTML overrides, extra layout slots, conditional content blocks (different copy for different course categories).</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Unlock advanced customization →</a>
</div>

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">CRM email automation</span>
  </div>
  <p class="pro-callout__desc">Trigger sequences (Day 0 → Day 3 → Day 7 → Day 14) on enrollment, completion, abandoned cart. Each step is a template; the engine handles timing and branching.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Unlock CRM sequences →</a>
</div>

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Email marketing (Mailchimp / MailerLite)</span>
  </div>
  <p class="pro-callout__desc">Sync enrollments and completions to a Mailchimp or MailerLite list / segment automatically. Run drip campaigns and broadcasts in your marketing tool, fed by Sikshya activity.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Unlock marketing sync →</a>
</div>

## Logs

If you've enabled email logging (in <span class="screen-path">Tools</span>), every email send is recorded with timestamp, recipient, template, and status. Open <span class="screen-path">Tools → Activity log</span> <span class="pro-pill">PRO</span> for the full audit trail.

## What's next

- [Pro add-ons](/third-party-integrations) — every Pro feature listed.
- [Troubleshooting](/troubleshooting) — fix bounced or missing email.
- [Hooks & filters](/hooks-filters) — extend email behavior in code.
