---
title: Pro add-ons
description: The complete Sikshya Pro add-on catalog — content drip, prerequisites, gradebook, multi-instructor, subscriptions, course bundles, marketplace, webhooks, Zapier, public API, SCORM, multilingual, and more.
---

# Pro add-ons

Sikshya Pro is shipped as a **separate plugin** (`sikshya-pro`). Once installed and licensed, you toggle individual **add-ons** under **Sikshya → Add-ons**. Each add-on is a self-contained feature — gradebook, drip, multi-instructor, etc. — that you enable only if you need it.

License plans gate which add-ons you can turn on:

- **Starter** — content drip, course reviews, prerequisites, instructor dashboard, drip notifications, calendar.
- **Pro / Growth** — everything Starter, plus advanced certificates, gradebook, advanced assignments, advanced quizzes, course bundles, subscriptions, multi-instructor, advanced coupons, dynamic checkout fields, course discussions / Q&A, live classes, social login, SCORM/H5P, advanced analytics, activity log, professional email delivery, email marketing.
- **Scale** — everything Pro, plus marketplace multivendor, white label, webhooks, Zapier, public API keys, multisite tools, enterprise reports, multilingual.

Each add-on entry below explains what it does, the routes it registers, the `FeatureRegistry` id (used for plan / addon checks), and the user-facing impact.

## Build (curriculum & assets)

### Course bundles
- **Id:** `course_bundles`
- **What:** Sell several courses for one bundled price ("bootcamp", "all-access pack"). Buyers are auto-enrolled in every course in the bundle.
- **Routes:** `/pro/bundles`, `/pro/bundles/{id}/courses`, `/pro/bundles/{id}/purchase-link`.
- **Account UI:** Optional "My bundles" panel on `/my-learning/` (`sikshya_account_dashboard_after`). Filterable via `sikshya_course_bundles_account_panel_bundles`.
- **Hooks:** `sikshya_bundle_pricing_resolved`, `sikshya_course_bundles_after_create`, `sikshya_course_bundles_allow_trash`.

### Course reviews & ratings
- **Id:** `course_reviews`
- **What:** Star ratings + written reviews on the course page with admin moderation. Display average ratings on cards.
- **Catalog impact:** Cards show stars + count; single-course page renders a reviews section.

### Course discussions & Q&A
- **Id:** `community_discussions`
- **What:** In-course Q&A and discussion threads with instructor moderation.
- **Email:** Adds template `instructor_qa_question`.

### Multi-instructor & co-authors
- **Id:** `multi_instructor`
- **What:** Assign multiple instructors per course with optional revenue split.
- **Routes:** `/pro/multi-instructor/course-staff`, `/pro/multi-instructor/earnings`, `/pro/multi-instructor/earnings/set-status`.

### Instructor dashboard
- **Id:** `instructor_dashboard`
- **What:** A focused instructor home (course-by-course enrollments, completions, recent activity) without exposing the full WP admin.

### Live classes (Zoom / Meet / Classroom)
- **Id:** `live_classes`
- **What:** Persist a meeting URL + platform label on a lesson. Learners click to join; the URL is fetched live (instructors can rotate it without re-publishing).

### SCORM / H5P
- **Id:** `scorm_h5p`
- **What:** Embed packaged SCORM or H5P content as a lesson type. Tracks progress / completion via the SCORM API.

## Teach (assessment, automation, learner journey)

### Content drip & scheduled unlock
- **Id:** `content_drip`
- **What:** Unlock lessons by date / X-days / cohort / after-lesson rules.
- **Cron:** `sikshya_pro_drip_cron`.
- **Routes:** `/pro/drip-rules`.

### Drip & automation emails
- **Id:** `drip_notifications`
- **What:** "Lesson unlocked" / "Course unlocked" / "Daily digest" emails. Templates `drip_lesson_unlocked`, `drip_course_unlocked`, `drip_lessons_unlocked_digest`.

### Prerequisites (lessons & courses)
- **Id:** `prerequisites`
- **What:** Require completion of chosen lessons or whole courses before the next step unlocks. Friendly lock messaging.

### Calendar
- **Id:** `calendar`
- **What:** Dated schedule on `/my-learning/` — enrollments, drip unlocks, due dates. REST data for custom UIs.

### Advanced assignments
- **Id:** `assignments_advanced`
- **What:** Rubrics, restricted file types, resubmissions / revision cycles, grading queue with filters.

### Advanced quiz types
- **Id:** `quiz_advanced`
- **What:** Question banks / pools (assemble many quizzes from a reusable bank), randomization, advanced types.

### Gradebook
- **Id:** `gradebook`
- **What:** Per-learner / per-course grades view across quizzes + graded assignments. Export.
- **Routes:** `/pro/gradebook`, `/pro/gradebook/grid`, `/pro/gradebook/drilldown`, `/pro/gradebook/learner`, `/pro/gradebook/assignment-grade`, `/pro/gradebook/override`, `/pro/gradebook/export`, `/pro/grade-scales`.

### Advanced certificates (builder, QR, verification)
- **Id:** `certificates_advanced`
- **What:** Drag-and-drop certificate builder, QR codes, public verify pages.
- **Routes:** `/pro/certificates/advanced` (URL templates, merge fields, settings, hook names).

## Sell (revenue growth)

### Subscriptions & memberships
- **Id:** `subscriptions`
- **What:** Recurring billing (monthly / yearly), member-only access, auto-renewal handling.
- **Routes:** `/pro/subscriptions`, `/pro/subscriptions/cancel`, `/pro/plans`, `/pro/plans/{id}`.

### Advanced coupons & upsells
- **Id:** `coupons_advanced`
- **What:** Minimum cart total, course / category restrictions, first-time buyer rules, stacking guards.
- **Routes:** `/pro/coupons/{id}/advanced`, plus core admin `PATCH /admin/coupons/{id}`.
- **Storefront hooks:** `sikshya_pro_single_course_price_after`, `sikshya_coupon_blocked_message`, `sikshya_coupon_discount_amount`, `sikshya_coupons_advanced_blocked_message`, `sikshya_coupons_advanced_normalize_save_meta`.

### Dynamic checkout fields
- **Id:** `dynamic_checkout_fields`
- **What:** Configurable checkout questions (text, select, checkbox) with conditional visibility. Stores answers on orders / profiles.
- **Architecture:** Server-rendered HTML via `Sikshya\Frontend\Site\CheckoutDynamicFieldsView` (free); the Pro JavaScript binds events, syncs values, applies conditional visibility instead of rebuilding the form on the client.

### Social login
- **Id:** `social_login`
- **What:** Sign-in with Google (and other providers your policy allows).

## Operate (analytics, reporting, audit)

### Advanced analytics & exports
- **Id:** `reports_advanced`
- **What:** Detailed enrollment / progress exports for Excel / Sheets.
- **Routes:** `/pro/reports-advanced/export` and `/me/reports-advanced/export` (learner self-export, gated by `allow_learner_self_export`).

### Student activity log
- **Id:** `activity_log`
- **What:** Timeline of milestones (enrollment, completions, quiz, submissions, checkout). Configurable retention.
- **Routes:** `/pro/extended/activity-log` (filters: page, per_page, user_id, course_id, action, search, date_from, date_to).
- **Cron:** `sikshya_activity_log_retention_cron`.
- **Hooks:** `sikshya_activity_log_action_label`, `sikshya_activity_log_allow_insert`, `sikshya_activity_log_scope_course_ids`, `sikshya_activity_log_show_learn_sidebar`, `sikshya_activity_log_recorded`.

### Enterprise reporting
- **Id:** `enterprise_reports`
- **What:** Weekly KPI rollup emails for inbox-friendly executive snapshots.

## Communication & automation

### Professional email delivery & branded templates
- **Id:** `email_delivery_pro`
- **What:** First-class ESP setup (SendGrid-style) + branded multi-template kit.

### Email advanced customization
- **Id:** `email_advanced`
- **What:** Per-template HTML overrides + extra layout slots.

### CRM email automation
- **Id:** `crm_email_automation`
- **What:** Trigger sequences (Day 0/3/7) on enrollment / completion / abandon.

### Email marketing (Mailchimp / MailerLite)
- **Id:** `email_marketing`
- **What:** Sync enrollments / completions to mailing lists.
- **Cron:** `sikshya_email_marketing_run_job`.

### Webhooks
- **Id:** `webhooks` / `automation_zapier_webhooks`
- **What:** Deliver signed JSON to your HTTPS endpoints on LMS lifecycle events.
- **Routes:** `/scale/automation/webhooks`, `/scale/automation/webhooks/{id}`.
- **Cron:** `sikshya_webhooks_outbound_deliver`.

### Zapier
- **Id:** `zapier`
- **What:** First-class Zapier triggers / actions. Sikshya events fan out into thousands of Zaps without bespoke code.

### Public API & API keys
- **Id:** `public_api_keys`
- **What:** Issue revocable secrets for bespoke apps / partners over REST without sharing WP passwords.
- **Routes:** `/scale/public-api/keys`, `/scale/public-api/keys/{id}`, `/scale/public-api/ping`.

## Scale & enterprise

### Multi-vendor marketplace
- **Id:** `marketplace_multivendor`
- **What:** Multi-vendor academy with per-vendor course ownership, commission splits, payouts, withdrawals, marketplace reports.
- **Routes:** `/scale/vendors`, `/scale/withdrawals`, `/scale/reports/commissions`.
- **Cron:** `sikshya_marketplace_release_due_earnings`.

### White label & branding
- **Id:** `white_label`
- **What:** Tune Sikshya-facing labels and learner / admin chrome to your agency or customer brand. Custom logo, naming, optional "powered by" toggle.

### Multisite & network license tools
- **Id:** `multisite_scale`
- **What:** License management across subsites on true WordPress networks.

### Multilingual (WPML / Weglot)
- **Id:** `multilingual_enterprise`
- **What:** Bridge Sikshya's front-end / interface strings into WPML / Weglot translation stacks.

## Add-on lifecycle

### Enabling an add-on

1. Activate Sikshya Pro and enter your license under **Sikshya → License**.
2. Open **Sikshya → Add-ons**.
3. Toggle the add-on **on**. The catalog respects your plan tier:
   - If your plan **doesn't include** the add-on, the toggle is locked with an upgrade prompt (`sikshya_plan_feature_required`).
   - If your plan includes it but it's off, the toggle is enabled.
4. Sikshya boots only **enabled** add-ons (`AddonInterface::boot()`), so unused features stay off the request path.

### How code checks for an add-on at runtime

```php
use Sikshya\Licensing\TierCapabilities;
use Sikshya\Addons\Addons;

if (TierCapabilities::feature('content_drip') && Addons::isEnabled('content_drip')) {
    // Drip features are available
}
```

REST routes registered by Pro are **always present** when Sikshya Pro is loaded — they return HTTP `403` with code `sikshya_plan_feature_required` or `sikshya_addon_disabled` if the user's plan / addon state is wrong. This avoids ambiguous 404s for API clients.

### Disabling an add-on

Toggle off in **Sikshya → Add-ons**. The add-on's hooks unregister, its cron unschedules where applicable, but stored data (drip rules, gradebook overrides, certificates) is preserved so you can re-enable later without loss.

## Adding a custom add-on (developer)

Both Free and Pro can register add-ons through `sikshya_addons_registry`:

```php
add_filter('sikshya_addons_registry', function ($registry) {
    $registry['my_custom_addon'] = [
        'id'          => 'my_custom_addon',
        'label'       => 'My custom add-on',
        'description' => 'Sends order data to ACME',
        'tier'        => 'pro',           // or 'free'
        'category'    => 'integrations',  // matches built-in groups
        'icon'        => 'plug',
    ];
    return $registry;
});
```

Implement an `AddonInterface` class with a `boot()` method, register it via the AddonResolver pattern (`sikshya-pro/src/Addons/AddonResolver.php` is the upstream reference), and the toggle appears under **Sikshya → Add-ons**. See `docs/ARCHITECTURE.md` and `docs/AI_ADDON_PREMIUM_UX_IMPLEMENTATION_BLUEPRINT.md` inside the plugin for the canonical pattern.

## Related

- [Hooks & filters](/guide/hooks-filters) — extension points add-ons hook into.
- [REST API](/guide/api-reference) — Pro routes.
- [Payments](/guide/payment-settings) — Pro gateways.
