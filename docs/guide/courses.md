---
title: Courses & curriculum
description: Build courses, chapters, lessons, quizzes, assignments, and certificates with Sikshya LMS — including categories, tags, difficulty taxonomies, and the React course builder.
---

# Courses & curriculum

Sikshya stores courses and learning content as WordPress custom post types so they live alongside your posts and pages, follow theme templates, and work with caching, SEO, and translation plugins.

## Custom post types

Registered by `Sikshya\Services\PostTypeService` on `init`. All slugs are intentionally short to keep URLs readable.

| Slug                   | Public | Hierarchical | Purpose                                       |
| ---                    | ---    | ---          | ---                                           |
| `sik_course`           | yes    | no           | The course itself; main entity learners enroll in |
| `sik_lesson`           | yes    | no           | A unit of content within a chapter            |
| `sik_quiz`             | yes    | no           | A set of questions with passing logic         |
| `sik_question`         | no     | no           | Individual quiz question (linked to quizzes)  |
| `sik_assignment`       | yes    | no           | Submitted-work assignment                     |
| `sik_chapter`          | no     | **yes**      | Container that orders lessons inside a course |
| `sikshya_certificate`  | yes    | no           | Issued certificate template / record          |

Constants live in `Sikshya\Constants\PostTypes`. Slugs are stable across releases and are used by REST routes, page builders, and search.

## Custom taxonomies

Registered by `Sikshya\Services\TaxonomyService`.

| Taxonomy                   | Applies to             | Hierarchical | Default rewrite slug |
| ---                        | ---                    | ---          | ---                  |
| `sikshya_course_category`  | `sik_course`           | yes          | `course-category` (configurable in Permalinks) |
| `sikshya_course_tag`       | `sik_course`           | no           | `course-tag`          |
| `sikshya_difficulty`       | `sik_course`, `sik_lesson` | yes      | `difficulty`          |
| `sikshya_lesson_type`      | `sik_lesson`           | yes          | `lesson-type`         |
| `sikshya_question_type`    | `sik_quiz`             | yes          | `question-type`       |

## The course builder

**Sikshya → Courses → Add New** opens a React-powered builder with three primary tabs:

### 1. Details

- **Title, summary, content** — standard WordPress fields backed by the editor.
- **Featured image** — used on the catalog card and course header.
- **Pricing** — set free, regular, or sale price. Sale price needs a regular price to apply.
- **Categories & tags** — `sikshya_course_category`, `sikshya_course_tag`. Add new on the fly.
- **Difficulty** — `sikshya_difficulty` (Beginner / Intermediate / Advanced — extend via the standard taxonomy admin).
- **Outcomes & FAQs** — meta fields rendered on the public course page.
- **Preview lessons** — flag specific lessons as **preview** so anonymous visitors can sample before buying.

### 2. Curriculum

The curriculum tab is the heart of the builder. It lets you:

- Create **chapters** (`sik_chapter`) — these are hierarchical containers, persisted as a post type, ordered with drag-and-drop.
- Create **lessons** (`sik_lesson`) under chapters.
- Create **quizzes** (`sik_quiz`) under chapters.
- Create **assignments** (`sik_assignment`) under chapters.

The builder talks to these REST routes (`sikshya/v1`):

- `POST /course-builder/save` — persist the entire course tree.
- `GET /course-builder/bootstrap?course_id=` — load the tree.
- `GET /admin/course-curriculum-tree` — fetch the tree alone.
- `POST /curriculum/chapter-order`, `/curriculum/lesson-order` — drag-and-drop ordering.
- `POST /curriculum/content` — create a lesson / quiz / assignment.
- `POST /curriculum/bulk-delete` — delete one or many items.

See [REST API](/guide/api-reference) for the full route list.

### 3. Settings

- **Access** — free, paid, or restricted.
- **Drip / progression** — sequential by default in free; date-based / X-days / cohort if **Content drip** add-on (Pro) is enabled.
- **Prerequisites** (Pro) — list of lessons or whole courses that must be completed first.
- **Reviews** — accept course reviews? (Pro add-on **Course reviews & ratings**.)
- **Q&A / discussions** — toggle the in-course Q&A panel (Pro add-on **Course discussions & Q&A**).

## Lesson types

Out of the box (free):

- **Text** — rich content in the WordPress editor.
- **Video (URL or embed)** — paste a YouTube/Vimeo URL or any embeddable URL.
- **Downloadable materials** — attach PDFs, slides, source files.

Pro extends with:

- **Live class** (Zoom / Meet / Classroom) — persisted meeting URL on the lesson — see [Pro add-ons](/guide/third-party-integrations).
- **SCORM / H5P** — embed packaged interactive content.

## Quizzes

Free quiz types:

- **Multiple choice** — single or multi-correct answers.
- **True / false**
- **Short answer** — a single line of text.

Quiz settings include:

- **Passing score** (percentage).
- **Attempts allowed** (limited or unlimited).
- **Time limit** (per quiz, single timer in free).
- **Sequential progression** — locks the next lesson until the quiz is passed.
- **Review** — basic attempt summary.

**Pro extensions** (`quiz_advanced`, `prerequisites`):

- Question banks / pools (assemble many quizzes from a reusable bank).
- Question randomization & shuffling.
- Cooldown between attempts.
- Detailed per-attempt analytics.
- Image-matching, fill-in-the-blank, and other advanced types.

## Assignments

The free core ships **basic assignments**:

- Title, description, due date.
- File upload (bounded by your WordPress upload limits).
- Manual pass/fail grading + free-text feedback.

The **Advanced assignments** Pro add-on adds:

- Rubric-style grading guidance.
- Restricted file types per assignment.
- Resubmissions / revision cycle.
- Grading queue with filters.

## Certificates

Free Sikshya ships two presets:

- **Regalia** — formal, traditional layout.
- **Vertex** — modern, minimal layout.

Both render on course completion with merge fields (student name, course name, completion date). Issued certificates are stored in `sikshya_certificates` and surfaced on the learner's account.

The **Advanced certificates** Pro add-on adds:

- Drag-and-drop builder.
- More merge fields (instructor, score, serial, custom).
- **QR verification** + a public verify URL (`/wp-json/sikshya/v1/public/certificates/verify`).
- Multiple branded templates per academy.

## Course catalog

The public catalog is rendered by templates under `templates/courses/` and `templates/archive-sik_course.php`:

- `archive-sik_course.php` → the main `/courses/` archive.
- `taxonomy-course-category.php`, `taxonomy-course-category-root.php`, `taxonomy-course-tag.php` → category and tag archives.
- `partials/courses/*` → course card components.
- `single-course.php` → single course page (description, curriculum preview, reviews, enroll CTA).

You can also drop the catalog into any page with the [`[sikshya_courses]` shortcode](/guide/shortcodes).

## Course URLs

| URL                                | Renders                          |
| ---                                | ---                              |
| `/courses/`                        | All published courses             |
| `/{slug}/` (course post)           | Single course page                |
| `/course-category/{slug}/`         | Category archive                  |
| `/course-tag/{slug}/`              | Tag archive                       |
| `/learn/?course_id={id}` etc.      | Learn hub for the enrolled course |
| `/learn/lesson/{slug}/`            | Lesson player view                |

URLs are configurable under **Sikshya → Settings → Permalinks** (`PermalinkService`).

## Tips & best practices

- Keep chapter titles short (<60 chars) — they show in the curriculum sidebar.
- Use **preview lessons** as your sales tool — let visitors sample before they pay.
- Use **categories** for level (Beginner / Intermediate) and **tags** for topics. Both are searchable in the catalog.
- For long courses, split into many short lessons (<10 min) — completion rates climb.
- Combine **drip** (Pro) with **prerequisites** (Pro) for paced cohort programs without writing code.

## Related

- [Learners, roles & progress](/guide/learners) — how the learner experiences the course.
- [Enrollment & access](/guide/enrollment-settings) — paid, free, manual enroll, drip.
- [Payments](/guide/payment-settings) — selling courses.
- [Shortcodes](/guide/shortcodes) — drop courses into any page.
- [Hooks & filters](/guide/hooks-filters) — customize behavior in code.
