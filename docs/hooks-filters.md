---
title: Hooks & filters
description: The actions and filters Sikshya LMS exposes for enrollments, lessons, quizzes, payments, certificates, settings, and add-ons.
---

# Hooks & filters

Sikshya is built around the standard WordPress action / filter system. Drop these into your child theme's `functions.php` or a small custom plugin.

## Plugin lifecycle

| Hook                              | Type   | Args                              | When                                                   |
| ---                               | ---    | ---                               | ---                                                    |
| `sikshya_init`                    | action | —                                 | Sikshya boots (`Plugin.php:295+`)                      |
| `sikshya_loaded`                  | action | —                                 | All free + Pro hooks registered                        |
| `sikshya_admin_init`              | action | —                                 | Admin context ready                                    |
| `sikshya_activated`               | action | —                                 | First activation (`Installer.php:62`)                  |
| `sikshya_deactivated`             | action | —                                 | On deactivation (`Deactivator.php:33`)                 |
| `sikshya_register_addon_rest_routes` | action | `WP_REST_Server $server`       | REST init for add-on routes (`Api.php:612`)            |

## Enrollment, progress, and learner journey

| Hook                              | Type   | Args                                          | Notes                                              |
| ---                               | ---    | ---                                           | ---                                                |
| `sikshya_user_enrolled`           | action | `$user_id, $course_id, $context`              | Fires after enrollment row written                 |
| `sikshya_user_unenrolled`         | action | `$user_id, $course_id, $context`              | Manual or self-unenroll                            |
| `sikshya_lesson_completed`        | action | `$user_id, $lesson_id, $course_id`            | After progress row updated                         |
| `sikshya_quiz_completed`          | action | `$user_id, $quiz_id, $score, $passed`         | After attempt finalized                            |
| `sikshya_assignment_submitted`    | action | `$user_id, $assignment_id, $submission_id`    | After upload                                       |
| `sikshya_assignment_completed`    | action | `$user_id, $assignment_id, $course_id`        | After grading marks assignment complete            |
| `sikshya_course_completed`        | action | `$user_id, $course_id`                        | All requirements met                               |
| `sikshya_can_complete_lesson`     | filter | `bool $can, $user_id, $lesson_id`             | Veto auto-complete                                 |
| `sikshya_enroll_free_redirect_url` | filter | `string $url, $user_id, $course_id`          | Redirect target after free self-enroll             |

## Commerce, checkout, payments

| Hook                                          | Type   | Args                                              | Notes                                                  |
| ---                                           | ---    | ---                                               | ---                                                    |
| `sikshya_order_fulfilled`                     | action | `$order_id, $context`                             | After fulfillment service runs                         |
| `sikshya_invoice_issued`                      | action | `$invoice_id, $order_id`                          | After invoice service                                  |
| `sikshya_checkout_start_gateway_session`      | filter | `array $session, $order, $gateway_id`             | Wrap third-party gateway session start                 |
| `sikshya_checkout_confirm_gateway`            | action | `$order_id, $gateway_id, array $payload`          | Confirm an order from a gateway webhook                |
| `sikshya_coupon_discount_amount`              | filter | `$amount, $coupon, $cart, $line, $context`        | Modify coupon discount math                            |
| `sikshya_payment_gateways_registry`           | filter | `array $registry`                                 | Add / remove gateways                                  |
| `sikshya_webhook_stripe_subscription_event`   | action | `array $event, $order_id`                         | Stripe `customer.subscription.*`                       |
| `sikshya_webhook_stripe_invoice_payment`      | action | `array $event, $order_id`                         | Stripe `invoice.*`                                     |
| `sikshya_webhook_paypal_subscription_event`   | action | `array $event, $order_id`                         | PayPal subscription events                             |

## Certificates

| Hook                                | Type   | Args                                              | Notes                                          |
| ---                                 | ---    | ---                                               | ---                                            |
| `sikshya_certificate_issued`        | action | `$certificate_id, $user_id, $course_id`           | After certificate row + email                  |
| `sikshya_certificate_row_created`   | action | `$certificate_id, $user_id, $course_id`           | Fires after the DB row is created              |

## Settings, pages, navigation

| Hook                                | Type   | Args                                | Notes                                  |
| ---                                 | ---    | ---                                 | ---                                    |
| `sikshya_settings_tabs`             | filter | `array $tabs`                       | Add a settings tab                     |
| `sikshya_settings_tab_{$tab}`       | filter | `array $sections`                   | Add sections to a specific tab         |
| `sikshya_addons_registry`           | filter | `array $registry`                   | Register a custom add-on               |
| `sikshya_account_dashboard_after`   | action | `$user`                             | Inject UI after the account dashboard  |
| `sikshya_learn_template_data`       | filter | `array $data, $context`             | Modify learn-page payload (legacy hook + new model)  |
| `sikshya_learn_sidebar_footer`      | action | `$context`                          | Inject UI in the learn sidebar footer  |

## Authentication & instructor lifecycle

| Hook                                          | Type   | Args                          | Notes                                        |
| ---                                           | ---    | ---                           | ---                                          |
| `sikshya_send_new_user_notifications`         | filter | `bool $send, $user_id`        | Disable core new-user emails                 |
| `sikshya_instructor_application_submitted`    | action | `$user_id, array $payload`    | Pending instructor application recorded      |

## Licensing / Pro feature gating (free side)

| Hook                                  | Type   | Args                  | Notes                                        |
| ---                                   | ---    | ---                   | ---                                          |
| `sikshya_commercial_is_active`        | filter | `bool $active`        | Pro flips this true via `LicenseBootstrap`   |
| `sikshya_commercial_site_tier`        | filter | `string $tier`        | `free` / `starter` / `pro` / `scale`         |
| `sikshya_commercial_feature_states`   | filter | `array $states`       | Override per-feature plan availability       |

## Reviews, discussions, Q&A (free + Pro)

| Hook                                          | Type   | Args             | Notes                                  |
| ---                                           | ---    | ---              | ---                                    |
| `sikshya_feature_reviews_available`           | filter | `bool $on`       | Flip review UI                         |
| `sikshya_feature_discussions_available`       | filter | `bool $on`       | Flip in-course discussions             |
| `sikshya_feature_qa_available`                | filter | `bool $on`       | Flip Q&A panel                         |

## Pro add-on examples (already defined)

These ship with Pro add-ons but are listed here for discoverability:

| Hook                                                 | When                                                    |
| ---                                                  | ---                                                     |
| `sikshya_bundle_pricing_resolved`                    | Course bundle price resolved at checkout                |
| `sikshya_course_bundles_after_create`                | New bundle created                                      |
| `sikshya_course_bundles_allow_trash`                 | Veto bundle deletion                                    |
| `sikshya_coupon_blocked_message`                     | Coupon UX blocked-coupon message                        |
| `sikshya_coupons_advanced_blocked_message`           | Advanced coupon blocked message                         |
| `sikshya_coupons_advanced_normalize_save_meta`       | Normalize advanced coupon meta on save                  |
| `sikshya_activity_log_action_label`                  | Re-label an activity action                             |
| `sikshya_activity_log_allow_insert`                  | Veto an activity log insert                             |
| `sikshya_activity_log_scope_course_ids`              | Limit activity log scope                                |
| `sikshya_activity_log_show_learn_sidebar`            | Show / hide the activity log on the learn sidebar       |
| `sikshya_activity_log_recorded`                      | After a row is stored                                   |

## Cron events

Free:

| Cron hook                         | Frequency  | Purpose                           |
| ---                               | ---        | ---                               |
| `sikshya_usage_tracking_event`    | weekly     | Optional usage insights (opt-in)  |
| `sikshya_usage_tracking_immediate`| once       | Initial usage ping                |
| `sikshya_run_legacy_migration_batch` | single  | Conditional migration runner      |

Pro (samples — only scheduled when add-on is on):

| Cron hook                                         | Purpose                                |
| ---                                               | ---                                    |
| `sikshya_pro_daily_license_check`                 | License heartbeat                      |
| `sikshya_pro_drip_cron`                           | Content drip unlocks                   |
| `sikshya_activity_log_retention_cron`             | Purge old activity log rows            |
| `sikshya_pro_enterprise_reports_tick`             | Enterprise report scheduler            |
| `sikshya_pro_enterprise_reports_run`              | Run a scheduled report                 |
| `sikshya_pro_enterprise_report_cron`              | Backwards-compat scheduled hook        |
| `sikshya_marketplace_release_due_earnings`        | Release marketplace earnings           |
| `sikshya_pro_scorm_h5p_retention_sweep`           | Clean up SCORM artifacts               |
| `sikshya_email_marketing_run_job`                 | Run an email-marketing sync            |
| `sikshya_webhooks_outbound_deliver`               | Deliver outbound webhooks              |

## Patterns

### Send a Slack message on every enrollment

```php
add_action('sikshya_user_enrolled', function ($user_id, $course_id, $context) {
    $user = get_userdata($user_id);
    $course = get_post($course_id);
    wp_remote_post('https://hooks.slack.com/services/T.../B.../X...', [
        'body' => wp_json_encode([
            'text' => sprintf(
                ':books: %s enrolled in *%s*',
                $user->display_name,
                get_the_title($course)
            ),
        ]),
        'headers' => ['Content-Type' => 'application/json'],
    ]);
}, 10, 3);
```

### Issue a shop coupon when a learner completes a course

```php
add_action('sikshya_course_completed', function ($user_id, $course_id) {
    $code = 'COURSE_' . $course_id . '_' . $user_id;
    // Create a 10% off coupon via your shop (Woo example)
    if (!function_exists('wc_create_coupon')) return;
    wc_create_coupon([
        'code' => $code,
        'discount_type' => 'percent',
        'amount' => 10,
        'usage_limit' => 1,
        'email_restrictions' => [get_userdata($user_id)->user_email],
    ]);
}, 10, 2);
```

### Disable a Pro add-on for a specific user / role

```php
add_filter('sikshya_commercial_feature_states', function ($states) {
    if (current_user_can('subscriber')) {
        $states['gradebook'] = false;
    }
    return $states;
});
```

### Inject extra data into the certificate email

```php
add_filter('sikshya_email_body', function ($body, $template_id, $context) {
    if ($template_id === 'learner_certificate_issued') {
        $body .= "\n\nDownload PDF: " . esc_url($context['certificate_url']);
    }
    return $body;
}, 10, 3);
```

### Restrict who can use the public REST API (Scale add-on)

```php
add_filter('sikshya_public_api_allowed_user_ids', function ($ids) {
    return [1, 2]; // only super-admins issue / use keys
});
```

## Related

- [REST API](/api-reference) — every route on `/wp-json/sikshya/v1/`.
- [Pro add-ons](/third-party-integrations) — features behind feature flags.
- [Architecture](https://github.com/MantraBrain/sikshya/blob/main/docs/ARCHITECTURE.md) — layered design (controller → service → repo → model → template).
