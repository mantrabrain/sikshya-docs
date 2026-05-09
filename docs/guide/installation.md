---
title: Installation
description: System requirements, install Sikshya LMS (free) and Sikshya Pro on your WordPress site, and confirm the bootstrap is healthy.
---

# Installation

Sikshya is a self-hosted **WordPress LMS plugin**. You install it like any other plugin (`wp-content/plugins/sikshya/`) — there is no SaaS to sign up for. **Sikshya Pro** is a separate companion plugin that requires the free plugin to be installed and activated first.

## System requirements

| Component   | Minimum            | Recommended          |
| ---         | ---                | ---                  |
| WordPress   | **6.0**            | 6.4+                 |
| PHP         | **7.4**            | 8.1+                 |
| MySQL       | 5.7 / MariaDB 10.3 | MySQL 8 / MariaDB 11 |
| Memory      | 128 MB             | 256 MB               |
| HTTPS       | Required for live payments | Always |

The plugin headers (`sikshya.php`) declare `Requires at least: 6.0` and `Requires PHP: 7.4`. The plugin is also `Network: true` — it can be activated network-wide on multisite, but verify roles and capabilities per subsite before going live.

> A note on PHP: a guard inside `Installer::ensureRequirements()` mentions PHP 8.1+, but the plugin's actual minimum is 7.4 (`SIKSHYA_MINIMUM_PHP_VERSION`). Run on PHP 8.1+ if you can — that's our recommended baseline.

## Install the free plugin

There are three common paths.

### 1. From WordPress.org (recommended)

1. **Plugins → Add New**.
2. Search for **Sikshya LMS**.
3. Click **Install Now**, then **Activate**.

### 2. Upload the ZIP

1. Download `sikshya.zip`.
2. **Plugins → Add New → Upload Plugin**.
3. Choose the ZIP, **Install**, then **Activate**.

### 3. Drop into `wp-content/plugins`

```bash
cd wp-content/plugins
unzip ~/Downloads/sikshya.zip
```

Then activate in **Plugins**.

After activation, Sikshya runs first-time installation:

- Roles are created — `sikshya_instructor`, `sikshya_student`, `sikshya_assistant`.
- The administrator role is granted Sikshya capabilities (`manage_sikshya`, `sikshya_access_admin_app`, `edit_*` / `delete_*` / `publish_*` for `sik_course`, `sik_lesson`, `sik_quiz`).
- Custom database tables are created (`sikshya_enrollments`, `sikshya_progress`, `sikshya_orders`, `sikshya_quiz_attempts`, `sikshya_certificates`, `sikshya_coupons`, `sikshya_payments`, …).
- Default email templates are seeded.
- The setup wizard is offered the first time you open **Sikshya** in the admin menu.

## Install Sikshya Pro

Sikshya Pro is a **separate plugin** that depends on the free plugin. It enables licensed Pro add-ons (drip, prerequisites, gradebook, subscriptions, premium gateways, etc.) and is shipped as a ZIP from your Mantrabrain account.

### Prerequisites

1. Sikshya **free** is installed and activated.
2. You have a valid Pro license key from [mantrabrain.com](https://mantrabrain.com/plugins/sikshya/#pricing).

### Install steps

1. **Plugins → Add New → Upload Plugin**.
2. Choose `sikshya-pro.zip`, **Install**, then **Activate**.
3. From the plugin directory, install the production Composer dependencies (only required if you cloned the source — distributed ZIPs already include them):

   ```bash
   cd wp-content/plugins/sikshya-pro
   composer install --no-dev --optimize-autoloader
   ```

4. Open **Sikshya → License**, paste your license key, click **Activate**.
5. Under **Sikshya → Add-ons**, enable the modules included in your plan (Starter / Pro / Scale).

> **Order matters.** Activate Sikshya **first**, then Sikshya Pro. Pro hooks into the free plugin on `plugins_loaded`. If Pro activates before free, simply deactivate Pro and reactivate after free is running — no data is lost.

## Confirm a healthy install

Run this short checklist before adding real content.

| Check                                                                        | Where                                       |
| ---                                                                          | ---                                         |
| Sikshya menu appears in the WordPress admin sidebar                          | Admin sidebar                               |
| **Sikshya → Status** (or System Info) shows your PHP, WordPress, server data | Admin                                       |
| Permalinks are **not** "Plain"                                               | **Settings → Permalinks**                   |
| Visiting `/wp-json/sikshya/v1/` returns JSON (not 404)                       | Browser or `curl`                           |
| `sik_course` rewrite — `/{course_slug}/` resolves a published course         | Front of site                               |
| Required Sikshya virtual pages render (`?sikshya_page=cart`, `=checkout`, `=account`, `=login`) | Front of site                               |
| Pro license shows **Active** under **Sikshya → License**                     | Admin (Pro only)                            |

If any of these are red, jump to [Troubleshooting](/guide/troubleshooting) before continuing.

## Multisite

Sikshya is `Network: true`. For a network deploy:

1. Place `sikshya/` and `sikshya-pro/` into `wp-content/plugins/` on the network filesystem.
2. **Network Activate** in **My Sites → Network Admin → Plugins**.
3. Visit each subsite once so `Installer::activate()` runs (creates per-site tables and seeds roles).
4. Activate the Pro license per subsite (one license per site by default; multi-site license tools are part of the **Multisite & network license tools** Scale add-on).

## What's next

- Run the [Quick start (setup wizard)](/guide/quick-start) — picks pages, currency, gateways, and seeds the catalog.
- Build your first course — see [Courses & curriculum](/guide/courses).
- Connect a gateway — see [Payments](/guide/payment-settings).
