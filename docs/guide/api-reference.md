---
title: REST API
description: The Sikshya LMS REST API — namespace sikshya/v1, course builder, curriculum, learner self-service, checkout, certificates, license, and Pro add-on routes.
---

# REST API

Sikshya exposes a REST API under the namespace `sikshya/v1`, mounted at `/wp-json/sikshya/v1/`. The same REST surface powers Sikshya's React admin, the learn-hub frontend, and external integrations.

## Authentication

| Path family            | Auth                                                                     |
| ---                    | ---                                                                      |
| `/admin/*`             | WordPress cookie + `X-WP-Nonce` (logged-in admin)                        |
| `/me/*`                | WordPress cookie (logged-in learner) — or Bearer JWT                     |
| `/public/*`            | Open                                                                     |
| `/checkout/*`          | Open (cart session) + capability where state-changing                    |
| `/scale/public-api/*`  | Bearer key + scopes (Pro Scale `public_api_keys` add-on)                 |

JWT is supported via `POST /sikshya/v1/auth/login` (returns a HS256 token signed with the `sikshya_jwt_secret` option). Send subsequent requests with `Authorization: Bearer {jwt}`.

## Free plugin routes (`sikshya/v1`)

### Admin / course builder

| Route                                            | Methods            | Source                  |
| ---                                              | ---                | ---                     |
| `/course-builder/save`                           | POST               | `AdminRestRoutes`       |
| `/course-builder/bootstrap`                      | GET (`?course_id=`)| `AdminRestRoutes`       |
| `/admin/course-chapters`                         | GET                | `AdminRestRoutes`       |
| `/admin/course-curriculum-tree`                  | GET                | `AdminRestRoutes`       |

### Curriculum (chapters / lessons / quizzes)

| Route                                            | Methods                     |
| ---                                              | ---                         |
| `/curriculum/content`                            | POST                        |
| `/curriculum/content/link`                       | POST                        |
| `/curriculum/content-item`                       | POST                        |
| `/curriculum/chapter-order`                      | POST                        |
| `/curriculum/lesson-order`                       | POST                        |
| `/curriculum/outline-structure`                  | POST                        |
| `/curriculum/bulk-delete`                        | POST                        |
| `/curriculum/chapters`                           | POST                        |
| `/curriculum/chapters/{id}`                      | GET, PUT, DELETE            |

### Taxonomies

| Route                                                  | Methods                     |
| ---                                                    | ---                         |
| `/taxonomies/course-category`                          | GET, POST                   |
| `/taxonomies/course-category/{id}`                     | GET, PUT, DELETE            |

### Settings

| Route                                            | Methods       | Notes                                      |
| ---                                              | ---           | ---                                        |
| `/settings/schema`                               | GET           | Full settings schema                       |
| `/settings/values`                               | GET           | Current values; `?tab=` to scope           |
| `/settings/save`                                 | POST          | Save values                                |
| `/settings/reset`                                | POST          | Reset to defaults                          |
| `/tools`                                         | POST          | Maintenance / permission tools             |

### Admin overview & data tables

| Route                                              | Methods   |
| ---                                                | ---       |
| `/admin/post-status-counts`                        | GET       |
| `/admin/overview`                                  | GET       |
| `/admin/licensing`                                 | GET       |
| `/admin/shell-meta?view=`                          | GET       |
| `/admin/reports-snapshot`                          | GET       |
| `/admin/enrollments`                               | GET       |
| `/admin/quiz-attempts`                             | GET       |
| `/admin/payments`                                  | GET       |
| `/admin/issued-certificates`                       | GET       |
| `/admin/issued-certificates/revoke`                | POST      |
| `/admin/orders`                                    | GET       |
| `/admin/orders/{id}/mark-paid`                     | POST      |
| `/admin/coupons`                                   | GET, POST |
| `/admin/coupons/{id}` (PATCH for advanced coupons) | PATCH     |
| `/admin/addons`                                    | GET       |
| `/admin/addons/{id}/enable`                        | POST      |
| `/admin/addons/{id}/disable`                       | POST      |

### License (free side bridges to Pro)

| Route                                | Methods | Notes                                   |
| ---                                  | ---     | ---                                     |
| `/admin/license`                     | GET     | License status + product info           |
| `/admin/license/activate`            | POST    | Activate with `license_key`             |
| `/admin/license/save`                | POST    | Save key without activating             |
| `/admin/license/deactivate`          | POST    | Deactivate this site's slot             |
| `/admin/license/check`               | POST    | Force re-check                          |

### Resource CRUD

| Route                                  | Methods                                     |
| ---                                    | ---                                         |
| `/courses`, `/courses/{id}`            | GET, POST, PUT, DELETE                      |
| `/lessons`, `/lessons/{id}`            | GET, POST, PUT, DELETE                      |
| `/quizzes`, `/quizzes/{id}`            | GET, POST, PUT, DELETE                      |
| `/users`, `/users/{id}`                | GET, POST, PUT, DELETE                      |
| `/enrollments`, `/enrollments/{id}`    | GET, POST, PUT, DELETE                      |
| `/progress`                            | GET                                         |
| `/certificates`                        | GET                                         |
| `/payments`                            | GET                                         |

### Learner self-service (`/me/*`)

| Route                                  | Methods | Notes                                              |
| ---                                    | ---     | ---                                                |
| `/me/progress`                         | GET     | Per-course progress payload                        |
| `/me/lesson-complete`                  | POST    | Mark a lesson done                                 |
| `/me/quiz-submit`                      | POST    | Submit a quiz attempt                              |
| `/me/unenroll`                         | POST    | Self-unenroll                                      |
| `/me/assignments`                      | GET     | If `assignments_basic` add-on is on                |
| `/me/assignment-submit`                | POST    | Submit an assignment                               |
| `/me/assignment-feedback`              | GET     | Read feedback                                      |
| `/me/reports-advanced/export`          | GET     | Pro `reports_advanced` learner CSV (`?type=my_enrollments` / `my_quiz_attempts`); requires plan + addon + `allow_learner_self_export` |

### Checkout

| Route                                  | Methods | Notes                                              |
| ---                                    | ---     | ---                                                |
| `/checkout/session`                    | POST    | Create / resume cart session                       |
| `/checkout/quote`                      | POST    | Compute totals (with coupons / tax)                |
| `/checkout/confirm`                    | POST    | Confirm a payment                                  |

### Webhooks

| Route                                  | Methods | Notes                                              |
| ---                                    | ---     | ---                                                |
| `/webhooks/stripe`                     | POST    | Verifies `Stripe-Signature` against `stripe_webhook_secret` |
| `/webhooks/paypal`                     | POST    | REST webhooks (requires PayPal client id + secret + webhook id) |
| `/webhooks/paypal-ipn`                 | POST    | Legacy IPN; respects the global `enable_test_mode` |

### Public

| Route                                  | Methods | Notes                                              |
| ---                                    | ---     | ---                                                |
| `/public/certificates/verify`          | GET     | Verify a certificate by serial                     |
| `/auth/login`                          | POST    | Issue a JWT                                        |
| `/me/enroll`                           | POST    | Self-enroll on a free course                       |

## Pro plugin routes (`sikshya/v1`)

Registered on `rest_api_init` (priority 20) when the Pro plugin is loaded. Each route checks plan + add-on; access is denied with HTTP 403 (`rest_forbidden`, `sikshya_plan_feature_required`, or `sikshya_addon_disabled`) instead of returning 404, so API clients get unambiguous failures.

### Drip & access

| Route                          | Methods    | FeatureRegistry id |
| ---                            | ---        | ---                |
| `/pro/drip-rules`              | GET, POST  | `content_drip`     |

### Subscriptions

| Route                          | Methods             |
| ---                            | ---                 |
| `/pro/subscriptions`           | GET, POST           |
| `/pro/subscriptions/cancel`    | POST                |
| `/pro/plans`                   | GET, POST           |
| `/pro/plans/{id}`              | PUT/PATCH, DELETE   |

### Gradebook

| Route                                  | Methods   |
| ---                                    | ---       |
| `/pro/gradebook`                       | GET       |
| `/pro/gradebook/export`                | GET       |
| `/pro/gradebook/grid`                  | GET       |
| `/pro/gradebook/drilldown`             | GET       |
| `/pro/gradebook/assignment-grade`      | POST      |
| `/pro/gradebook/learner`               | GET       |
| `/pro/gradebook/override`              | POST      |
| `/pro/grade-scales`                    | GET, POST |
| `/pro/grade-scales/{id}`               | GET, PUT/PATCH, DELETE |

### Multi-instructor

| Route                                          | Methods                          |
| ---                                            | ---                              |
| `/pro/multi-instructor/course-staff`           | GET, POST, DELETE                |
| `/pro/multi-instructor/earnings`               | GET                              |
| `/pro/multi-instructor/earnings/set-status`    | POST (admin only)                |

### Activity log, advanced reports, certificates, bundles, coupons

| Route                                         | Methods   | Add-on                  |
| ---                                           | ---       | ---                     |
| `/pro/extended/activity-log`                  | GET       | `activity_log`          |
| `/pro/reports-advanced/export`                | GET       | `reports_advanced`      |
| `/pro/certificates/advanced`                  | GET       | `certificates_advanced` |
| `/pro/bundles`                                | GET, POST | `course_bundles`        |
| `/pro/bundles/{id}/courses`                   | GET, POST | `course_bundles`        |
| `/pro/bundles/{id}/courses/{course_id}`       | DELETE    | `course_bundles`        |
| `/pro/bundles/{id}`                           | DELETE    | `course_bundles`        |
| `/pro/bundles/{id}/purchase-link`             | GET       | `course_bundles`        |
| `/pro/coupons/{id}/advanced`                  | GET, POST | `coupons_advanced`      |

### Scale tier (marketplace, automation, public API)

| Route                                              | Methods   | Add-on                          |
| ---                                                | ---       | ---                             |
| `/scale/vendors`                                   | GET, POST | `marketplace_multivendor`       |
| `/scale/withdrawals`                               | POST      | `marketplace_multivendor`       |
| `/scale/reports/commissions`                       | GET       | `marketplace_multivendor`       |
| `/scale/automation/webhooks`                       | GET, POST | `automation_zapier_webhooks`    |
| `/scale/automation/webhooks/{id}`                  | DELETE    | `automation_zapier_webhooks`    |
| `/scale/public-api/keys`                           | GET, POST | `public_api_keys`               |
| `/scale/public-api/keys/{id}`                      | DELETE    | `public_api_keys`               |
| `/scale/public-api/ping`                           | GET       | `public_api_keys` (auth via Bearer key) |

## Error codes

| Code (`code` in JSON)             | Status | When                                                                |
| ---                               | ---    | ---                                                                 |
| `rest_forbidden`                  | 403    | Logged-in user lacks capability                                     |
| `sikshya_plan_feature_required`   | 403    | Plan does not include this feature (see also `legacy_error_code`)   |
| `sikshya_addon_disabled`          | 403    | Plan covers it, but the add-on is off                               |
| `sikshya_pro_required`            | 403    | Legacy; new clients should rely on `sikshya_plan_feature_required`  |
| `rest_no_route`                   | 404    | Route not registered                                                |
| `rest_invalid_param`              | 400    | Invalid request parameter                                           |
| `rest_cannot_create`              | 403    | Permission to create this resource is missing                       |

## Examples

### Authenticate and get progress (JWT)

```bash
TOKEN=$(curl -s -X POST https://example.com/wp-json/sikshya/v1/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"learner@example.com","password":"...."}' | jq -r .token)

curl -s https://example.com/wp-json/sikshya/v1/me/progress \
  -H "Authorization: Bearer $TOKEN" | jq
```

### Fetch courses (admin)

```bash
curl -s https://example.com/wp-json/sikshya/v1/courses?per_page=20 \
  -H 'X-WP-Nonce: NONCE_HERE' \
  --cookie 'wordpress_logged_in_xxx=...'
```

### Manually fulfill an order

```bash
curl -s -X POST https://example.com/wp-json/sikshya/v1/admin/orders/123/mark-paid \
  -H 'X-WP-Nonce: NONCE_HERE' \
  --cookie 'wordpress_logged_in_xxx=...'
```

### Pro: list drip rules

```bash
curl -s https://example.com/wp-json/sikshya/v1/pro/drip-rules \
  -H 'X-WP-Nonce: NONCE_HERE' \
  --cookie 'wordpress_logged_in_xxx=...'
```

### Verify a certificate publicly

```bash
curl -s 'https://example.com/wp-json/sikshya/v1/public/certificates/verify?serial=ABC-123-XYZ'
```

## Adding your own REST routes

Register your routes the standard way and gate them behind Sikshya's helpers if relevant:

```php
add_action('rest_api_init', function () {
    register_rest_route('myplugin/v1', '/sync', [
        'methods' => 'POST',
        'permission_callback' => function () {
            return current_user_can('manage_sikshya');
        },
        'callback' => function (WP_REST_Request $r) {
            // ...
            return rest_ensure_response(['ok' => true]);
        },
    ]);
});
```

Or hook into Sikshya's REST init:

```php
add_action('sikshya_register_addon_rest_routes', function ($server) {
    register_rest_route('sikshya/v1', '/my-addon/data', [
        'methods' => 'GET',
        'permission_callback' => '__return_true',
        'callback' => 'my_addon_data',
    ]);
});
```

## Related

- [Hooks & filters](/guide/hooks-filters) — when in doubt, hooks beat polling REST.
- [Pro add-ons](/guide/third-party-integrations) — REST routes per add-on.
- [Architecture](https://github.com/MantraBrain/sikshya/blob/main/docs/ARCHITECTURE.md) — layered design behind every REST handler.
