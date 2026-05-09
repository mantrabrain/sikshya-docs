---
title: Shortcodes
description: Every Sikshya LMS shortcode — [sikshya_courses], [sikshya_login], [sikshya_registration] — with attributes, defaults, and copy-paste examples sourced from the plugin code.
---

# Shortcodes

Sikshya registers three frontend shortcodes. Drop them into any page, post, widget, Shortcode block (Gutenberg), or theme template that runs `do_shortcode()`. Attribute names are lowercase. Defaults below come from the plugin source.

## `[sikshya_courses]`

Renders a grid or list of published courses using the same course-card partial as the catalog.

### Attributes

| Attribute     | Default | Notes                                                                                |
| ---           | ---     | ---                                                                                  |
| `per_page`    | `9`     | Min `1`, max `50`.                                                                   |
| `columns`     | (auto)  | `3` forces a 3-column grid; positive values up to `6`; `0` or omitted = auto layout. |
| `view`        | `grid`  | `grid` or `list`.                                                                    |
| `category`    | —       | Slug of a `sikshya_course_category` term (not numeric ID).                           |
| `tag`         | —       | Slug of a `sikshya_course_tag` term.                                                 |
| `search`      | —       | Free-text search.                                                                    |
| `orderby`     | `date`  | `date`, `title`, or `price`.                                                         |
| `order`       | `desc`  | `asc` or `desc`.                                                                     |
| `pagination`  | `1`     | `1` shows pagination; `0` is single page. Page links use the `sikshya_courses_page` query arg so they don't collide with the main query. |

### Examples

A simple grid:

```text
[sikshya_courses]
```

A specific category, sorted by price:

```text
[sikshya_courses per_page="12" view="grid" category="web-design" orderby="price" order="asc" pagination="1"]
```

A filtered list view:

```text
[sikshya_courses view="list" search="wordpress" pagination="0"]
```

Six bestselling courses on a homepage:

```text
[sikshya_courses per_page="6" columns="3" orderby="title" order="asc" pagination="0"]
```

## `[sikshya_login]`

Renders an email-or-username + password sign-in form. Submissions go to Sikshya's `admin-post` handler which calls `wp_signon()`. **Failed logins stay on the same URL** (no redirect to `wp-login.php`). Used inside the virtual `/login/` page and on the checkout step when guests need to sign in.

### Attributes

| Attribute      | Default | Notes                                                                            |
| ---            | ---     | ---                                                                              |
| `redirect_to`  | (auto)  | Absolute or relative URL after successful login. Validated with `wp_validate_redirect`. Falls back to `HTTP_REFERER` then site home. |

### Examples

Default behavior:

```text
[sikshya_login]
```

Always send to the account page:

```text
[sikshya_login redirect_to="/my-learning/"]
```

Send to checkout after sign-in (paid funnel):

```text
[sikshya_login redirect_to="https://example.com/checkout/"]
```

## `[sikshya_registration]`

Creates a Sikshya **student** account. Uses standard WordPress new-user notifications (`wp_send_new_user_notifications`) so admin and user receive their core emails — disable via the `sikshya_send_new_user_notifications` filter if you replace them.

### Attributes

| Attribute      | Default    | Notes                                                                              |
| ---            | ---        | ---                                                                                |
| `type`         | `student`  | `student` or `instructor`. **`instructor` does not assign the instructor role.** It records a pending instructor application using the same meta as the account "Apply to teach" flow. An admin must approve in **Sikshya → Instructors**; only then is `sikshya_instructor` granted. |
| `redirect_to`  | (auto)     | Same behavior as `[sikshya_login]`.                                                |

### Examples

A regular sign-up form:

```text
[sikshya_registration]
```

Same form, explicit student:

```text
[sikshya_registration type="student"]
```

"Apply to teach" landing page (records pending application, redirects to the courses page):

```text
[sikshya_registration type="instructor" redirect_to="/courses/"]
```

## Combining the auth shortcodes

A two-column "Sign in or join us" page:

```text
<div class="row">
  <div class="col">
    <h2>Sign in</h2>
    [sikshya_login redirect_to="/my-learning/"]
  </div>
  <div class="col">
    <h2>Create an account</h2>
    [sikshya_registration redirect_to="/my-learning/"]
  </div>
</div>
```

## Templating tips

- The `[sikshya_courses]` cards are rendered by `templates/partials/courses/card.php` (and friends). You can override by copying the file into `wp-content/themes/{theme}/sikshya/partials/courses/card.php`.
- Login + registration views are in `templates/login.php` and the registration partial under `templates/partials/auth/`. Override the same way.
- All shortcodes respect Sikshya's permalinks so `redirect_to="/my-learning/"` resolves to whatever slug the **Account** page is using.

## Block editor (Gutenberg)

Sikshya does not (yet) ship a custom Sikshya block. Use the **Shortcode block** to wrap any of the three shortcodes above, or the **Custom HTML block** for the two-column auth example.

For richer page-builder integration with Elementor, Divi, and friends, see [Blocks & page builders](/guide/elementor-integration).

## Hooks for shortcode customization

```php
// Replace the registration emails with your own
add_filter('sikshya_send_new_user_notifications', '__return_false');

// Inject extra fields into [sikshya_registration]
add_action('sikshya_registration_form_fields', function () {
    echo '<label>Phone <input name="phone" /></label>';
});

// Save those fields after a successful registration
add_action('user_register', function ($user_id) {
    if (!empty($_POST['phone'])) {
        update_user_meta($user_id, 'phone', sanitize_text_field($_POST['phone']));
    }
});
```

## Related

- [Courses & curriculum](/guide/courses) — what `[sikshya_courses]` is showing.
- [Blocks & page builders](/guide/elementor-integration).
- [Learners](/guide/learners) — what happens after registration / login.
- [Hooks & filters](/guide/hooks-filters).
