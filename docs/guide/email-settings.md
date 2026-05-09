---
title: Email & notifications
description: Configure transactional email templates, merge tags, deliverability, and the Pro CRM / ESP / Zapier add-ons that wrap Sikshya emails with branded templates and recurring automation.
---

# Email & notifications

Sikshya sends transactional email at every important moment — enrollment, purchase, course completion, certificate issuance — using WordPress's built-in `wp_mail()` plus a template catalog you can customize without code.

## Transactional emails (free)

Templates are defined in `Sikshya\Services\EmailTemplateCatalog::definitions()` (`src/Services/EmailTemplateCatalog.php`). Common IDs that ship in the free plugin:

| Template ID                          | Trigger                                                  | To                              |
| ---                                  | ---                                                      | ---                             |
| `learner_welcome`                    | New user registration (`user_register`)                  | Learner                         |
| `learner_enrollment`                 | Enrolled in a course                                     | Learner                         |
| `admin_new_enrollment`               | Enrolled in a course                                     | Admin / academy email           |
| `instructor_new_enrollment`          | Enrolled in a course                                     | Course's primary instructor     |
| `learner_payment_receipt`            | Order fulfilled                                          | Learner (buyer)                 |
| `admin_order_fulfilled_notice`       | Order fulfilled                                          | Admin                           |
| `learner_course_completed`           | Course completion                                        | Learner                         |
| `learner_certificate_issued`         | Certificate issued                                       | Learner                         |
| `learner_progress_reminder`          | Inactivity reminder (Pro extends)                        | Learner                         |

When a Pro add-on is on, additional templates appear:

- `instructor_qa_question` (Community discussions / Q&A)
- `drip_lesson_unlocked`, `drip_course_unlocked`, `drip_lessons_unlocked_digest` (Drip notifications)

## Edit a template

**Sikshya → Settings → Email → Templates** lists every template with:

- **Subject** — supports merge tags.
- **Heading** — visible at the top of the email layout.
- **Content** — full HTML or rich-text body.
- **Recipient(s)** — for admin templates only.
- **Enabled** toggle.

Click **Reset to default** any time to revert to the seeded copy.

## Merge tags

The most common merge tags supported in subject + content:

| Tag                         | Renders                                |
| ---                         | ---                                    |
| `{{site_name}}`             | The WordPress site title              |
| `{{site_url}}`              | Site root URL                          |
| `{{learner_name}}`          | The learner's display name             |
| `{{learner_first_name}}`    | First name (parsed from display name)  |
| `{{learner_email}}`         | Learner email                          |
| `{{course_title}}`          | Course post title                      |
| `{{course_url}}`            | Permalink to the course                |
| `{{lesson_title}}`          | Lesson title (where applicable)        |
| `{{quiz_title}}`            | Quiz title                             |
| `{{order_id}}`              | Sikshya order id                       |
| `{{order_total}}`           | Total in display currency              |
| `{{order_url}}`             | Order detail URL                       |
| `{{certificate_url}}`       | Issued certificate URL                 |
| `{{instructor_name}}`       | Course's primary instructor            |
| `{{login_url}}`             | Login URL (`/login/`)                  |
| `{{account_url}}`           | Learner account URL (`/my-learning/`)  |
| `{{date}}` / `{{time}}`     | Now (site timezone)                    |

The full list is rendered in the template editor's right-hand sidebar so authors can copy them in. Tags use double braces and tolerate optional whitespace inside (`{{ course_title }}` works).

## Email layout (header / footer)

Sikshya wraps every email in a global layout (HTML "shell" with header, body, and footer). Configure under **Sikshya → Settings → Email → Layout**:

- **From name** — defaults to site name.
- **From email** — defaults to `{admin_email}`. Use a `noreply@` on your domain for deliverability.
- **Header logo** — optional image URL.
- **Brand color** — accent color for buttons / dividers.
- **Footer text** — short legal / footer copy.

## Sender & deliverability

Out of the box, Sikshya uses `wp_mail()`. That's fine for staging but unreliable for production. We strongly recommend:

1. Connect a transactional ESP (SendGrid, Postmark, Amazon SES, Mailgun, SparkPost).
2. Install a transport plugin (WP Mail SMTP / Post SMTP / FluentSMTP / Gravity SMTP).
3. Configure SPF, DKIM, and DMARC for the sending domain.
4. Test deliverability via [mail-tester.com](https://www.mail-tester.com/) before launch.

The Pro **Professional email delivery & branded templates** add-on streamlines this: SendGrid-style configuration plus richer branded layouts.

## Resending failed emails

The order detail screen has a **Resend receipt** button. The enrollment detail screen has **Resend welcome**.

If a hook ate an email earlier and you want to back-fill, you can call the service from a plugin or `wp-cli`:

```php
$service = sikshya()->get(\Sikshya\Services\EmailNotificationService::class);
$service->sendEnrollmentEmail($user_id, $course_id);
$service->sendCertificateEmail($certificate_id);
```

## Pro email & automation add-ons

| Add-on                                          | What it does                                                         |
| ---                                             | ---                                                                  |
| **Drip notifications**                          | "Lesson unlocked" / "Course unlocked" / weekly digest emails wired to drip rules. Templates `drip_*`. |
| **Email advanced customization**                | Per-template HTML overrides + extra layout slots.                    |
| **Professional email delivery & branded templates** | Branded multi-template kit + first-class ESP setup guidance.       |
| **CRM email automation**                        | Trigger sequences (Day 0 / 3 / 7 …) on enrollment, completion, abandon. |
| **Email marketing (Mailchimp / MailerLite)**    | Sync enrollments / completions to mailing lists for marketing campaigns. |
| **Webhooks**                                    | Deliver signed JSON to your HTTPS endpoint for any LMS event (alternative to email for backend automation). |
| **Zapier**                                      | First-class trigger entry points for Zapier Zaps.                    |
| **Enterprise reporting**                        | Weekly KPI rollup emails to operators / executives.                  |

See [Pro add-ons](/guide/third-party-integrations) for each one.

## CRM / Mailchimp / MailerLite

The free core does **not** push to a marketing tool by default. Two routes:

1. **Pro Email marketing add-on** — toggle Mailchimp or MailerLite, paste the API key, map list IDs per course.
2. **Webhooks (Pro Scale)** — subscribe to events like `enrollment.created`, `course.completed`, deliver to your CRM directly.
3. **Zapier (Pro Scale)** — same events, surfaced as Zapier triggers.

Free-plugin route (no Pro): use a generic webhook plugin (e.g. `WP Webhooks`) and listen for the Sikshya hooks like `sikshya_user_enrolled`, `sikshya_course_completed`, then forward to your tool.

## Logs

If logs are enabled, every email send is logged in `sikshya_logs` with timestamp, recipient, template id, and a status flag. Useful for debugging "did the email actually send?". Tail logs from **Sikshya → Tools → Logs**.

## Hooks & filters for email

```php
// Skip the WordPress new-user notification on registration
add_filter('sikshya_send_new_user_notifications', function ($send, $user_id) {
    return false; // I send my own welcome
}, 10, 2);

// Modify a transactional email body
add_filter('sikshya_email_body', function ($html, $template_id, $context) {
    if ($template_id === 'learner_enrollment') {
        $html = str_replace('{{custom_promo}}', 'Use code SIKSHYA10', $html);
    }
    return $html;
}, 10, 3);

// React to certificate email send
add_action('sikshya_certificate_issued', function ($certificate_id, $user_id, $course_id) {
    // Push to credentials platform
}, 10, 3);
```

The full list lives on [Hooks & filters](/guide/hooks-filters).

## Related

- [Pro add-ons](/guide/third-party-integrations) — drip notifications, CRM, Zapier, webhooks.
- [Hooks & filters](/guide/hooks-filters) — extension points around email.
- [Troubleshooting](/guide/troubleshooting) — fix bounced, missing, or HTML-broken email.
