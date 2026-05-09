---
title: Shortcodes
description: The three Sikshya shortcodes — sikshya_courses, sikshya_login, sikshya_registration — with attributes, defaults, and copy-paste examples.
---

# Shortcodes

Sikshya registers three frontend shortcodes. Drop them into any page, post, widget, or Shortcode block (Gutenberg). Attribute names are lowercase. Defaults below come from the plugin source.

## `[sikshya_courses]`

Renders a grid or list of published courses using the same course-card design as the public catalog. Useful when you want a curated catalog on a landing page or sales funnel.

### Attributes

| Attribute     | Default | Notes                                                                                |
| ---           | ---     | ---                                                                                  |
| `per_page`    | `9`     | Min `1`, max `50`.                                                                   |
| `columns`     | (auto)  | `3` forces a 3-column grid; positive values up to `6`; `0` or omitted = auto layout. |
| `view`        | `grid`  | `grid` or `list`.                                                                    |
| `category`    | —       | Slug of a course category (not numeric ID).                                          |
| `tag`         | —       | Slug of a course tag.                                                                |
| `search`      | —       | Free-text search.                                                                    |
| `orderby`     | `date`  | `date`, `title`, or `price`.                                                         |
| `order`       | `desc`  | `asc` or `desc`.                                                                     |
| `pagination`  | `1`     | `1` shows pagination; `0` is single page. Pagination uses `sikshya_courses_page`.    |

### Examples

A simple grid:

```text
[sikshya_courses]
```

A specific category, sorted by price:

```text
[sikshya_courses per_page="12" view="grid" category="web-design" orderby="price" order="asc" pagination="1"]
```

Six bestsellers on a homepage:

```text
[sikshya_courses per_page="6" columns="3" orderby="title" order="asc" pagination="0"]
```

## `[sikshya_login]`

Renders an email-or-username + password sign-in form. Failed logins stay on the same page (no redirect to `wp-login.php`). Used inside the virtual `/login/` page and on the checkout step when guests need to sign in.

### Attributes

| Attribute      | Default | Notes                                                                            |
| ---            | ---     | ---                                                                              |
| `redirect_to`  | (auto)  | Absolute or relative URL after successful login. Falls back to referrer then home. |

### Examples

```text
[sikshya_login]

[sikshya_login redirect_to="/my-learning/"]

[sikshya_login redirect_to="https://example.com/checkout/"]
```

## `[sikshya_registration]`

Creates a Sikshya **student** account. Triggers WordPress's standard new-user emails (admin + user).

### Attributes

| Attribute      | Default    | Notes                                                                              |
| ---            | ---        | ---                                                                                |
| `type`         | `student`  | `student` or `instructor`. **`instructor` does not assign the instructor role** — it records a pending application that an admin must approve. |
| `redirect_to`  | (auto)     | Same behavior as `[sikshya_login]`.                                                |

### Examples

```text
[sikshya_registration]

[sikshya_registration type="student"]

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

## Block editor (Gutenberg)

Sikshya doesn't (yet) ship a custom block. Use the WordPress **Shortcode block** to wrap any of the three shortcodes above. For richer page-builder integration, see [Blocks & page builders](/elementor-integration).

## What's next

- [Blocks & page builders](/elementor-integration) — how Sikshya works with Elementor, Divi, Bricks.
- [Learners](/learners) — what happens after registration / login.
