---
title: Learners, roles & progress
description: Sikshya LMS roles, capabilities, the student dashboard, wishlist, certificates, progress tracking, and instructor workflows.
---

# Learners, roles & progress

Sikshya separates **administrators** (run the academy), **instructors** (build and teach), **assistants** (support staff), and **students** (learners) using standard WordPress roles and capabilities.

## Roles

Created by `Sikshya\Core\Installer::installRoles()` on activation:

| Role                  | Slug                  | Notes                                                           |
| ---                   | ---                   | ---                                                             |
| Sikshya Instructor    | `sikshya_instructor`  | Builds courses, lessons, quizzes; can be the sole instructor or one of many (Pro multi-instructor). |
| Sikshya Student       | `sikshya_student`     | Default role for learners. Created automatically when learners register through `[sikshya_registration]` or checkout. |
| Sikshya Assistant     | `sikshya_assistant`   | Editor-style support role; can view reports and grade assignments. Useful for a TA or success manager. |
| Administrator         | (WP built-in)         | Granted full Sikshya capabilities (`manage_sikshya`, all CRUD). |

## Key capabilities

| Capability                          | Held by                                  | Used for                                    |
| ---                                 | ---                                      | ---                                         |
| `manage_sikshya`                    | Admin                                    | Master switch for Sikshya admin             |
| `sikshya_access_admin_app`          | Admin, Instructor, Assistant             | Loads the React admin shell                 |
| `edit_sikshya_courses` etc.         | Instructor, Admin                        | Edit own / all courses                      |
| `publish_sikshya_courses`           | Instructor, Admin                        | Publish a course                            |
| `manage_sikshya_students`           | Instructor, Admin, Assistant             | Enroll, unenroll, view learner data         |
| `view_sikshya_reports`              | Instructor, Admin, Assistant             | Reports + dashboards                        |
| `enroll_sikshya_courses`            | Student                                  | Self-enroll on free courses                 |
| `take_sikshya_quizzes`              | Student                                  | Submit quiz attempts                        |
| `submit_sikshya_assignments`        | Student                                  | Upload assignment submissions               |
| `view_sikshya_certificates`         | Student                                  | View / download issued certificates         |
| `access_sikshya_courses`            | Student                                  | Open enrolled lessons                       |

Granular `edit_*` / `delete_*` / `publish_*` / `read_private_*` / `edit_private_*` / `edit_others_*` capabilities exist for the `sik_course`, `sik_lesson`, and `sik_quiz` post types so you can fine-tune third-party role plugins (e.g. Members, User Role Editor).

## How learners sign up

Three doors lead a visitor into the academy:

1. **Native registration** — `[sikshya_registration]` shortcode, or the virtual login + register page (`/login/`). New accounts get the `sikshya_student` role and the standard WordPress new-user notification (filterable via `sikshya_send_new_user_notifications`).
2. **Checkout** — the checkout flow includes a "Create account" affordance. Buyers are auto-created as students if not signed in.
3. **Manual enrollment** — admins / instructors can enroll any user from **Sikshya → Enrollments → Add new**.

For the **Apply to teach** flow, learners can submit `[sikshya_registration type="instructor"]` or use the "Apply to teach" CTA on their account. This **does not** assign the instructor role — it records a pending application using the action `sikshya_instructor_application_submitted`. An admin approves applications in **Sikshya → Instructors**, and only then does the user gain `sikshya_instructor`.

## The learner account

Sikshya provides a virtual page at `/my-learning/` (default; renameable in **Sikshya → Settings → Permalinks**). It shows:

- **My learning** — courses the user is enrolled in, with progress bars.
- **Wishlist** — saved courses (toggle saved on any course card).
- **Quiz attempts** — completed and in-progress quizzes.
- **Certificates** — issued certificates (download / verify).
- **Payments** — order history and receipts.
- **Profile** — display name, email, password change.
- **Apply to teach** — instructor application form (when allowed).

The shell is rendered by `templates/account.php` with view partials in `templates/partials/account/` (`my-learning.php`, `wishlist.php`, `quiz-attempts.php`, `certificates.php`, `payments.php`, `profile.php`, `instructor-apply.php`, `teach.php`).

## Learn hub & lesson player

Open a course and learners go to the **learn hub** (`/learn/`):

- Curriculum sidebar with chapters, lessons, quizzes, and assignments.
- Lesson player area (text, video, downloadable, or Pro live class / SCORM).
- Next / previous navigation respecting **sequential progression** (free) and **drip** + **prerequisites** (Pro).
- Mark-as-complete button → fires `sikshya_lesson_completed`.
- Quiz inline → fires `sikshya_quiz_completed` on pass.
- "Course completed" celebration → fires `sikshya_course_completed`, issues a certificate, fires `sikshya_certificate_issued`.

The learn hub is built from `Sikshya\Services\Frontend\LearnPageService` + `Sikshya\Presentation\Models\LearnPageModel`, with the template at `templates/learn.php`. Pro filters `sikshya_learn_template_data` to inject add-on payloads (calendar widget, activity log toggle, drip badges, etc.).

## Progress tracking

Progress is stored in two places:

- `sikshya_progress` (custom table) — per-user, per-course, per-lesson row with timestamps, completion state, last-seen.
- `sikshya_quiz_attempts` / `sikshya_quiz_attempt_items` — quiz answer trail.

REST endpoints under `/me/*` expose this data to the React account UI:

- `GET /me/progress` — full per-course progress payload.
- `POST /me/lesson-complete` — mark a lesson done.
- `POST /me/quiz-submit` — submit a quiz attempt.
- `POST /me/unenroll` — self-unenroll (if allowed).
- `POST /me/assignments` / `/me/assignment-submit` / `/me/assignment-feedback` — when **Assignments** add-on is on.

See [REST API](/guide/api-reference).

## Hooks for learner lifecycle

Use these in custom plugins or theme `functions.php`:

```php
add_action('sikshya_user_enrolled', function ($user_id, $course_id, $context) {
    // notify Slack, sync to CRM, etc.
}, 10, 3);

add_action('sikshya_lesson_completed', function ($user_id, $lesson_id, $course_id) {
    // award points, sync to gamification plugin
}, 10, 3);

add_action('sikshya_quiz_completed', function ($user_id, $quiz_id, $score, $passed) {
    // log to LRS, send notification
}, 10, 4);

add_action('sikshya_course_completed', function ($user_id, $course_id) {
    // certificate is issued automatically; you can chain further
}, 10, 2);

add_action('sikshya_certificate_issued', function ($certificate_id, $user_id, $course_id) {
    // upload to badge platform, etc.
}, 10, 3);
```

The full list lives on the [Hooks & filters](/guide/hooks-filters) page.

## Wishlist

Learners can save courses to a wishlist directly from any course card (heart icon) or single course page. Wishlist is persisted on the user object and shown under **My learning → Wishlist**. The wishlist works for both signed-in and freshly signed-up visitors.

## Certificates

When a learner completes a course, Sikshya issues a certificate using the active template. Free presets are **Regalia** and **Vertex**. The certificate is rendered as a printable/downloadable view and a row is inserted into `sikshya_certificates` so it survives template changes.

Pro adds the **Advanced certificates** add-on with:

- Drag-and-drop builder.
- QR codes that link to a verify URL: `GET /wp-json/sikshya/v1/public/certificates/verify?serial=...`.
- Multiple branded templates per academy.
- More merge fields (instructor, score, serial, completion timestamp).

## Privacy & data

Sikshya is built for self-hosted ownership:

- All learner data lives in your WordPress database (no third-party LMS-as-service hop).
- Optional, opt-in **usage insights** can be enabled / disabled — see the privacy section in the [Sikshya documentation](https://docs.mantrabrain.com/sikshya-wordpress-plugin/).
- Provide a way to export / delete user data via the standard WordPress **Tools → Export Personal Data** and **Erase Personal Data** flows.

## Related

- [Courses & curriculum](/guide/courses) — what learners actually consume.
- [Enrollment & access](/guide/enrollment-settings) — control how they get in.
- [Email & notifications](/guide/email-settings) — what we send them.
- [Pro add-ons](/guide/third-party-integrations) — gradebook, activity log, calendar, drip notifications.
