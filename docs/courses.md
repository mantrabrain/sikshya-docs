---
title: Courses & curriculum
description: A field-by-field walkthrough of the Sikshya Course Builder — every tab, every option — so you can build a great course on the first try.
---

# Courses & curriculum

This page walks you through every screen and field for building a Sikshya course. If you just want to ship something fast, follow the [Quick start](/quick-start) first, then come back here when you need to fine-tune.

## The Courses list

Open <span class="screen-path">Sikshya → Course → Courses</span>.

You'll see a table of every course on your site with:

- A **Search** box (search by title).
- **Status pills** at the top: All, Published, Draft, Pending, Scheduled, Private, Trash.
- **Course type** dropdown: All types, Regular, Subscription <span class="pro-pill">PRO</span>, Bundle <span class="pro-pill">PRO</span>.
- **Sort by**: Title, Published, Last modified, ID, Author.
- A **+ Add new course** button in the top right.

Each row shows: ID, image, title (with a Bundle / Subscription chip if applicable), categories, price, level, published / updated dates, and status.

Click any row to **Edit in builder**. Tick rows for **Bulk actions**: Move to trash, Publish, Move to draft, Mark pending review, Move to private. (In the Trash tab the bulk options become **Restore to draft** or **Delete permanently**.)

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Manage course staff (multi-instructor)</span>
  </div>
  <p class="pro-callout__desc">When the <strong>Multi-instructor</strong> add-on is on, each row gets a <strong>Manage staff</strong> action so you can add co-instructors, set roles (Owner / Editor / Grader), and split revenue.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Unlock multi-instructor →</a>
</div>

## The Course Builder — 4 tabs

Click **+ Add new course** (or click any course title) to open the **Course Builder**. It has four tabs at the top:

1. **Course details** — what the course is.
2. **Pricing & access** — how learners get in.
3. **Curriculum** — the actual lessons, quizzes, and assignments.
4. **Course options** — visibility, completion rules, certificates, reviews.

Top-right buttons stay sticky while you work: **Preview**, **Save draft**, **Publish**.

## Tab 1 — Course details

This is everything visible on the public course page. Sections in order:

### Basic information

| Field                     | What it does                                                              |
| ---                       | ---                                                                       |
| **Course title**          | The headline learners see.                                                |
| **URL slug** (permalink)  | Auto-generated from the title; click to edit.                              |
| **Short teaser**          | One-line subtitle on the catalog card.                                    |
| **Full description**      | The long pitch, rendered in the WordPress editor.                          |
| **Primary category**      | Pick from your course categories (manage them under <span class="screen-path">Course → Categories</span>). |
| **Difficulty level**      | Beginner / Intermediate / Advanced. Used in catalog filters.              |
| **Estimated length**      | In hours. Shows on the catalog card.                                       |
| **Instruction language**  | English, Spanish, etc. Useful for multilingual catalogs.                   |
| **Target audience**       | Who this course is for, in plain language.                                |

### Images & video

- **Featured image** — the big image at the top of the course page and in catalog cards.
- **Course trailer video (URL)** — paste a YouTube or Vimeo link. Plays inline on the course page.

### What students will learn

- **Learning outcomes** — a bulleted list. Click **+ Add outcome** to append more.
- **Course highlights** — 4–6 short brag points (e.g. "30+ lessons", "Lifetime access").
- **FAQ** — Question + Answer pairs. Click **+ Add FAQ item** for more.
- **Downloadable resources** — files learners can download. Each has a Title, a media file, or a direct URL.
- **Announcements** — pinned notes for enrolled learners (Title, Message, Date).

### Instructor

- **Who teaches this course?** — pick a user with the **Sikshya Instructor** role.

### Search engine listing (SEO)

- **SEO title** — overrides the page title for search engines.
- **Meta description** — the snippet under your link in search results.
- **Focus keywords** — for tracking with Yoast / Rank Math / SEOPress.

## Tab 2 — Pricing & access

How learners pay and who can join.

### How people pay

| Option              | What it means                                              |
| ---                 | ---                                                        |
| **Free Course**     | Learners enroll with one click. No checkout step.          |
| **Paid Course**     | Standard one-time purchase via your active gateway.        |
| **Subscription only** <span class="pro-pill">PRO</span> | Course is part of a subscription plan (membership). |

### Pricing fields

- **Regular price** — the normal price.
- **Sale price** — optional. When set, this is the price learners pay.
- **Membership plan** <span class="pro-pill">PRO</span> — if you picked Subscription Only, choose the plan.

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Course bundles &amp; subscriptions</span>
  </div>
  <p class="pro-callout__desc">Sell several courses for one bundled price (Course Bundles add-on), or charge monthly / yearly recurring fees for member-only access (Subscriptions add-on).</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Unlock pricing options →</a>
</div>

### Who can sign up?

- **Open** — anyone can buy / enroll.
- **Closed** — disabled for now.
- **Invite only** — admin enrollment only.

### Other access fields

- **Maximum students** — optional cap.
- **Course start / end** — optional schedule.
- **Enrollment opens / closes** — optional date range.

### Prerequisites & requirements

- **Prerequisites** <span class="pro-pill">PRO</span> — courses or lessons that must be completed before enrolling.
- **Course requirements** — text-only "you need a Mac and Photoshop" style notes (free).

## Tab 3 — Curriculum

This is where you build the actual learning experience. Curriculum is organized as:

```
Course
└── Chapter
    ├── Lesson
    ├── Quiz
    └── Assignment
```

You'll see an **outline** down the left and a **builder** on the right.

<ol class="step-list">
  <li>Click <strong>+ Add chapter</strong> at the top. Type a chapter name like "Module 1 — Foundations" and click Save.</li>
  <li>Inside the chapter, click <strong>+ Add lesson</strong>. A modal opens with lesson types: <strong>Text</strong>, <strong>Video</strong>, plus Live class <span class="pro-pill">PRO</span>, SCORM <span class="pro-pill">PRO</span>, H5P <span class="pro-pill">PRO</span>.</li>
  <li>Pick <strong>Text</strong>, type a lesson title, click <strong>Create</strong>. The lesson opens in the editor — write the body, attach downloadable files, save.</li>
  <li>Back in the curriculum, drag chapters and lessons to reorder. Click any lesson to re-edit it.</li>
  <li>Repeat: <strong>+ Add quiz</strong>, <strong>+ Add assignment</strong>. Quizzes have their own editor — see below.</li>
</ol>

### Lesson types

- **Text** — paragraphs, headings, images, embedded media. The standard WordPress editor.
- **Video** — paste a YouTube, Vimeo, or any embeddable video URL.

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Live classes, SCORM, and H5P</span>
  </div>
  <p class="pro-callout__desc">Pin a Zoom or Google Meet URL to a lesson so learners always click the right link (Live classes add-on). Or embed a packaged SCORM / H5P interactive (SCORM/H5P add-on).</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Unlock these lesson types →</a>
</div>

### Quizzes

Click any quiz to open the quiz editor. It has three sub-tabs:

- **Content** — title, description, intro text.
- **Settings** — passing score (%), attempts allowed, time limit (minutes).
- **Questions** — pick from your **Question library** or click **+ New question** to write one.

Free question types:

- Multiple choice (single or multi-correct answers).
- True / false.
- Short answer (one line of text).
- Fill in the blank.

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Advanced quiz types &amp; question banks</span>
  </div>
  <p class="pro-callout__desc">Reuse questions across many quizzes from a central <strong>Question bank</strong>. Add advanced question types, randomize order, draw a random pool of questions per learner, or shuffle answers each attempt — all in the <strong>Advanced quiz types</strong> add-on.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Unlock advanced quizzes →</a>
</div>

### Assignments

Each assignment has a title, description, due date, and a file-upload field for learner submissions. After submission, you grade pass / fail with a free-text note.

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Advanced assignments &amp; gradebook</span>
  </div>
  <p class="pro-callout__desc">Score against a rubric, restrict the file types learners can upload, allow resubmissions, and see a per-learner / per-course grade view with the <strong>Advanced assignments</strong> + <strong>Gradebook</strong> add-ons.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Unlock grading workflows →</a>
</div>

## Tab 4 — Course options

Final settings: visibility, completion rules, reviews, certificates.

### Visibility & catalog

- **Who can see this course?** — Draft, Published, Private, Password protected.
- **Course password** — if Password protected.
- **Featured course** — show with a badge in the catalog.
- **Featured badge text** — the badge label (e.g. "Editor's pick").
- **Hide from catalog** — useful for invite-only or bundled-only courses.
- **Require prerequisites before enrollment** <span class="pro-pill">PRO</span>.
- **Disable email marketing sync for this course** <span class="pro-pill">PRO</span> — when integrated with Mailchimp / MailerLite, exclude this course from list syncs.

### Completion & progress

- **When is the course finished?** — All lessons complete / All lessons + quizzes + assignments / Pass all quizzes / Manual.
- **Minimum quiz score (%)** — only relevant for the "Pass all quizzes" rule.
- **Require a final quiz** — last quiz must be passed for completion.
- **Track student progress** — leave on. Powers the progress bar and certificate.

### Reviews <span class="pro-pill">PRO</span>

- **Allow course reviews** — when **Course reviews & ratings** add-on is on, this section shows up. Toggle reviews on / off per course.

### Certificates

- **Enable completion certificate** — toggle on to issue a certificate when the course is complete.
- **Certificate requires course completion** — vs. "issue at progress threshold."
- **Certificate template** — pick from your installed templates (free presets: **Regalia**, **Vertex**).
- **Progress threshold for certificate (%)** — issue early at e.g. 80% if you'd rather not require 100%.

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Advanced certificates with verification</span>
  </div>
  <p class="pro-callout__desc">Build certificates with a drag-and-drop designer, more merge fields (instructor, score, serial), and add a <strong>QR code</strong> that links to a public verify page so anyone can confirm authenticity.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Unlock advanced certificates →</a>
</div>

## Categories

Open <span class="screen-path">Sikshya → Course → Categories</span> to manage course categories. Each category has:

- **Name** — visible in catalogs and on the card.
- **Description** — long form, rich text. Shows on the category archive.
- **Slug** — auto-generated; edit if you want a specific URL.
- **Parent** — categories are hierarchical. "Web development → Frontend → CSS" is fine.
- **Image** — optional category image used on archive headers.

You can search, sort, and bulk-delete categories from this screen.

## Other content libraries

Open <span class="screen-path">Sikshya → Course → Content library</span> for direct access to your stand-alone content:

- **Lessons** — all lessons across all courses.
- **Quizzes** — all quizzes.
- **Assignments** — all assignments.
- **Questions** — your question library (reusable across quizzes).
- **Chapters** — chapters across courses.
- **Question banks** <span class="pro-pill">PRO</span> — only visible when **Advanced quiz types** is on.

These tabs use the same WordPress list pattern (search, status pills, sort, bulk actions). Use them when you want to clean up unused lessons or move a question between quizzes.

## Tips & best practices

- **Keep chapter titles short** (under 60 characters). They show in the curriculum sidebar.
- **Use preview lessons.** Tag the first lesson of each chapter as a preview lesson so anonymous visitors can sample before they buy.
- **Aim for short lessons** (5–10 minutes). Completion rates go up dramatically.
- **Use categories for level**, **tags for topics**. Both feed your catalog filters.
- **One course, one outcome.** "Master Excel pivot tables" beats "Become a spreadsheet wizard" because it's specific.

## Where to go next

- [Learners & roles](/learners) — manage students, instructors, and enrollments.
- [Enrollment & access](/enrollment-settings) — drip, prerequisites, manual enroll.
- [Payments](/payment-settings) — gateways and refunds.
- [Pro add-ons](/third-party-integrations) — every Pro feature listed.
