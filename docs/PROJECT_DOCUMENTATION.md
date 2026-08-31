# Digital Literacy for Rural Communication — Project Documentation

## 1. Abstract
Digital Literacy for Rural Communication is a web-based platform that helps rural
citizens learn essential digital skills: using computers and smartphones, browsing
the internet safely, making UPI and wallet payments, using online banking, and
accessing government services such as Aadhaar, DigiLocker, UMANG and PM-Kisan.
The system offers self-paced courses, short low-bandwidth video tutorials, a
centralised directory of official government links, learner dashboards with
progress tracking, feedback collection and downloadable completion certificates.

## 2. Objectives
1. Improve basic digital awareness among first-time users.
2. Promote safe cashless transactions (UPI, wallets, cards).
3. Encourage online education and scholarship access.
4. Support farmers with mandi prices, weather and scheme information.
5. Improve cyber safety and reduce OTP/phishing fraud.
6. Simplify access to e-government services.
7. Link trained youth to employment opportunities.

## 3. Modules
| Module | Description |
|---|---|
| Home | Hero, statistics, highlights, testimonials, announcements |
| About | Project background, vision and mission |
| Objectives | Programme goals |
| Features | Searchable directory of platform capabilities |
| Training | Course catalogue, search, enrolment and progress |
| Video Learning | Category-filtered tutorials with modal player |
| Gov Services | Centralised official government portal links |
| Login / Register | Client-side validated authentication forms |
| Dashboard | Charts for progress, enrolments and activity |
| Profile | View/edit personal details, change password |
| Feedback | Star rating and course feedback |
| Certificate | Certificate preview and download list |
| FAQ | Accordion of common questions |
| Contact | Enquiry form, map placeholder, social links |

## 4. Technology Stack
- Front end: HTML5, CSS3, modern JavaScript (ES6+), React + TypeScript, Tailwind-based green/white design system, responsive layout.
- Charts: Recharts. Icons: Lucide.
- Optional backend: PHP 8 (procedural or PDO) with MySQL 8, or the built-in server functions.
- Database: MySQL — see `database/digital_literacy.sql`.

## 5. Database Design
Ten tables: `users`, `trainers`, `courses`, `enrollments`, `videos`,
`gov_services`, `feedback`, `contact_messages`, `certificates`, `announcements`,
plus two reporting views.

### 5.1 ER (text form)
```text
users 1---N enrollments N---1 courses N---1 trainers
users 1---N feedback     N---1 courses
users 1---N certificates N---1 courses
gov_services, videos, announcements, contact_messages : independent entities
```

### 5.2 Key relationships
- A learner may enrol in many courses; a course has many learners (M:N via `enrollments`).
- A trainer teaches many courses (1:N).
- A certificate is issued for one completed enrolment (user + course).

## 6. Data Flow Diagram

### Level 0 (Context)
```text
        +--------------------+
Learner |                    | Admin
  ---->|  Digital Literacy   |<----
        |      System        |
  <----|                    |---->
 reports+--------------------+ manage
                |
                v
          MySQL Database
```

### Level 1
```text
Learner -> [1.0 Register/Login] -> users
Learner -> [2.0 Browse Courses] -> courses
Learner -> [3.0 Enrol & Learn]  -> enrollments (progress)
Learner -> [4.0 Watch Videos]   -> videos
Learner -> [5.0 Submit Feedback]-> feedback
Learner -> [6.0 Get Certificate]-> certificates
Admin   -> [7.0 Manage Content] -> courses, videos, gov_services, announcements
Admin   -> [8.0 View Reports]   <- v_course_enrollment_counts, v_user_progress
```

## 7. Sample Use Cases
- **Enrol in a course:** learner logs in → Training page → Enrol → progress recorded.
- **Report fraud:** learner opens Cyber Security course → learns 1930 helpline flow.
- **Download certificate:** progress reaches 100% → Certificate page → download.

## 8. Testing (sample cases)
| # | Test | Expected |
|---|---|---|
| 1 | Register with invalid mobile | Validation error shown |
| 2 | Login with empty fields | Field-level errors |
| 3 | Search a course by keyword | Filtered list |
| 4 | Filter videos by category | Only matching videos |
| 5 | Submit feedback without rating | Error prompt |
| 6 | Open a government service link | Opens official portal in new tab |
| 7 | Toggle dark mode | Theme persists after reload |
| 8 | Mobile viewport | Navbar collapses into drawer |

## 9. Future Scope
Multi-language voice narration, offline-first PWA support, SMS/IVR lessons for
feature phones, trainer attendance tracking, and live integration with state
e-district APIs.

## 10. Setup
1. Import the database: `mysql -u root -p < database/digital_literacy.sql`
2. Run the web app in development and open the preview.
3. For a PHP backend, point your connection string at the `digital_literacy` database.
