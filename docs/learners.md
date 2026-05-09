---
title: Learners, instructors & enrollments
description: Manage students, instructors, and assistants — plus the People hub, enrollment list, manual enroll, instructor approvals, certificates, and the learner account.
---

# Learners, instructors & enrollments

Sikshya keeps four kinds of users in mind:

- **Administrators** — run the academy.
- **Instructors** — build and teach courses.
- **Assistants** — help with grading, support, and reports (no full admin power).
- **Students** — the learners.

This page is the practical "where do I click to manage these people" guide.

## The People hub

Open <span class="screen-path">Sikshya → People → Students &amp; Instructors</span>.

You'll see three tabs:

- **Students** — every learner account.
- **Instructors** — every instructor account.
- **Applications** — pending instructor applications (people who want to teach).

Each tab uses the same list layout: **Search**, **Sort**, **Bulk actions**, paginated rows.

### Students tab

Columns: avatar, name, email, courses enrolled, last activity, registered date.

Click any row to open the standard WordPress user profile page with extra Sikshya tabs (enrollments, attempts, certificates).

Bulk actions: send password reset, deactivate, delete (with the standard WordPress user-removal confirmations).

### Instructors tab

Same columns plus **Courses authored**.

You can promote any user to **Sikshya Instructor** by editing their WordPress profile and adding the role — but the cleaner path is the **Applications** workflow below.

### Applications tab

When someone signs up as an instructor (via `[sikshya_registration type="instructor"]` or by clicking "Apply to teach" in their account), they don't immediately get the instructor role. Instead, an **application** appears here.

For each application you'll see:

- Applicant name and email.
- Their bio / why-they-want-to-teach text.
- **Approve** button → grants the `sikshya_instructor` role and they can now create courses.
- **Reject** button → declines (you can write a short note).

<div class="ui-tip"><strong>Why two-step approval?</strong> Approving manually is intentional friction — it stops random sign-ups from appearing as authors on your site. If you trust everyone, automate it with a small custom plugin (see <a href="/hooks-filters#authentication-instructor-lifecycle">hooks reference</a>).</div>

## Enrollments

Open <span class="screen-path">Sikshya → People → Enrollments</span>.

This is the master list of every "this learner is in this course" record on your site.

You'll see:

- **Search** by learner name, email, or course title.
- **Status filter** — Enrolled, Completed, Refunded, Cancelled.
- A table with columns: Learner, Course, Enrolled date, Status, Progress, Source (Free / Paid / Manual / Coupon).
- A **Manual enroll** panel at the top of the page.

### Manual enroll

Use this when you give someone a course outside the normal flow — comp accounts, gifts, B2B sales done over invoice.

<ol class="step-list">
  <li>Type the learner's name in the <strong>Student</strong> autocomplete (it searches existing users).</li>
  <li>Pick the <strong>Course</strong> from the autocomplete.</li>
  <li>Click <strong>Enroll {student}</strong>. The button shows "Enrolling…" until done.</li>
</ol>

The enrollment row is created instantly. The learner gets the standard enrollment email (unless you disable it in <span class="screen-path">Settings → Email</span>).

## Roles & capabilities

Sikshya creates three custom WordPress roles, each with sensible defaults:

| Role                  | What they can do                                                   |
| ---                   | ---                                                                |
| **Sikshya Instructor** | Build courses, lessons, quizzes, assignments. Edit their own content, view their own course reports. |
| **Sikshya Student**   | Enroll, learn, take quizzes, submit assignments, view certificates. |
| **Sikshya Assistant** | Editor-style support staff. Grade assignments, view reports, but can't publish courses. |
| **Administrator**     | Full Sikshya control (default WordPress admin capabilities + every Sikshya capability). |

### Capability matrix

| Capability                              | Admin | Instructor | Assistant | Student |
| ---                                     | ---   | ---        | ---       | ---     |
| Manage Sikshya (master switch)          | ✅     | —          | —         | —       |
| Open the Sikshya admin app              | ✅     | ✅          | ✅         | —       |
| Edit own courses / lessons / quizzes    | ✅     | ✅          | —         | —       |
| Publish a course                        | ✅     | ✅          | —         | —       |
| Manage students                         | ✅     | ✅          | ✅         | —       |
| View reports                            | ✅     | ✅          | ✅         | —       |
| Enroll on free courses                  | ✅     | ✅          | ✅         | ✅       |
| Take quizzes                            | ✅     | —          | —         | ✅       |
| Submit assignments                      | ✅     | —          | —         | ✅       |
| View own certificates                   | ✅     | —          | —         | ✅       |

Use a role plugin like **Members** or **User Role Editor** to fine-tune individual capabilities without writing code.

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Multi-instructor &amp; revenue split</span>
  </div>
  <p class="pro-callout__desc">Assign multiple instructors per course (Owner / Editor / Grader roles) and split revenue automatically. Instructors get their own dashboard with earnings and payout requests.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Unlock multi-instructor →</a>
</div>

## Quiz attempts

Open <span class="screen-path">Sikshya → People → Quiz attempts</span> (or under **Reports** depending on your version).

Each row is one attempt:

- Learner name and email.
- Quiz title and parent course.
- Score (with a pass / fail badge).
- Time taken.
- Submitted at.

Click any row for a **drilldown** — the exact answers the learner gave, per question.

Bulk actions include **Reset attempts** (so a stuck learner can try again).

## Assignment grading

For assignments, open <span class="screen-path">Sikshya → Grading &amp; submissions → Assignment submissions</span> <span class="pro-pill">PRO</span>.

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Gradebook &amp; assignment grading queue</span>
  </div>
  <p class="pro-callout__desc">Without Pro, you grade assignments one at a time from each lesson's editor. With <strong>Gradebook</strong> + <strong>Advanced assignments</strong> on, you get a unified queue with filters (ungraded, late, failed), rubric-based grading, restricted file types, and per-learner / per-course score export.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Unlock the gradebook →</a>
</div>

## Certificates

Open <span class="screen-path">Sikshya → Certificates</span>. This hub has three tabs:

### Templates

The list of certificate **designs**. The free plugin ships **Regalia** (formal) and **Vertex** (modern, minimal).

Click **+ Create** to add a new template. The certificate editor opens full-screen — type a name, pick a paper size and orientation, and save. (For the visual builder with drag-and-drop placement, you need the **Advanced certificates** add-on — see below.)

### Issued

Every certificate ever issued, in one list:

- **Search** by learner or course.
- Columns: Learner, Course, Issued date, Serial number, Status.
- Row action: **Revoke** — opens a confirmation. Revoked certificates won't verify.

### Add-on defaults <span class="pro-pill">PRO</span>

Visible only when **Advanced certificates** is on. Set defaults like QR placement, verification URL pattern, learner download options.

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Advanced certificates (drag-drop builder + QR verification)</span>
  </div>
  <p class="pro-callout__desc">Replace the basic presets with your own branded templates designed visually. Add merge fields (instructor name, score, serial number, completion date), and a <strong>QR code</strong> that links to a public verify page (<code>/certificate-verify?serial=...</code>) so anyone can confirm authenticity.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/sikshya/#pricing">Unlock advanced certificates →</a>
</div>

## What learners actually see

The learner experience runs on three screens. Visit them in a private browser window after enrolling a test learner:

### 1. Course catalog `/courses/`

The public list of every published, non-hidden course. Filterable by category, tag, level, and price. Each card shows the title, image, instructor, level, length, and price.

### 2. Single course page `/{course-slug}/`

Sections (in order): Hero (image, title, instructor, price, **Enroll** / **Buy** CTA), Description, Curriculum preview (with preview lessons playable inline), FAQ, Reviews <span class="pro-pill">PRO</span>, Instructor card, Related courses.

### 3. My learning `/my-learning/`

The signed-in learner's home. Sub-sections in the left rail:

- **My courses** — every enrolled course with a progress bar and a **Resume learning** button.
- **Wishlist** — courses saved with the heart icon.
- **Quiz attempts** — every quiz the learner has taken, with scores.
- **Certificates** — issued certificates (download / verify link).
- **Payments** — order history, receipts, invoice PDFs.
- **Profile** — display name, email, password change.
- **Apply to teach** — instructor application form.

## The learn hub `/learn/`

Once enrolled, learners click into the actual lesson player at `/learn/`:

- **Curriculum sidebar** on the left — chapters, lessons, quizzes, assignments. The current item is highlighted; locked items show a small lock icon.
- **Lesson body** in the middle — the text, video, or downloadable file.
- **Mark complete** button at the bottom — clicking this fires `sikshya_lesson_completed` and unlocks the next lesson.
- **Next / previous** navigation respects sequential progression (free) and any drip / prerequisite rules <span class="pro-pill">PRO</span>.

When a learner completes the final lesson, the course is marked complete, a certificate issues automatically, and the **Course completed** + **Certificate issued** emails fire.

## Where to go next

- [Enrollment & access](/enrollment-settings) — how learners get into courses.
- [Email & notifications](/email-settings) — what we send them.
- [Pro add-ons](/third-party-integrations) — every Pro feature, with Buy CTA.
