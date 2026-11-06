# Nexova Solutions — public website

Milestone 1: the company's first public website. Static site built with **HTML + Tailwind CSS** and vanilla JavaScript for form validation.

| File | What it is |
|---|---|
| `index.html` | Landing page: header and navigation, hero, key figures, services, why Nexova, how a search works, call to action and footer. Schema.org `EmploymentAgency` (a `LocalBusiness` type) in JSON-LD. |
| `application.html` | Candidate application form to join Nexova's talent network. |
| `validation.js` | Real-time validation (on blur and while typing), specific error messages, blocks invalid submissions and simulates a successful one. |
| `assets/tailwind.css` | Tailwind CSS compiled and minified from `src/input.css`. No hand-written CSS. |
| `tailwind.config.js`, `src/input.css` | Tailwind build configuration. |

## Run it locally (Codespaces)

From the repository root:

```bash
npx --yes http-server uis/website -p 3000 -a 0.0.0.0 -c-1
```

Open port 3000 in the **Ports** tab. To audit it with PageSpeed Insights, right-click the port → **Port Visibility → Public** and use that URL.

## Rebuild the CSS

Tailwind is compiled instead of loaded from the Play CDN, so the page ships ~18 KB of CSS and no runtime script (better PageSpeed score). After changing classes in the HTML or JS:

```bash
cd uis/website
npx --yes tailwindcss@3.4.17 -i ./src/input.css -o ./assets/tailwind.css --minify
```

## Why this form (context)

The briefing (`CONTEXT.md`) places Nexova's core business in **Talent Selection Operations**: 40 consultants screen 30–80 CVs per search by hand, matching depends on intuition, and candidates have no status visibility. The form captures exactly what a consultant (and, later, the CV screening agent in `company-choice.md`) needs to match a candidate to a vacancy: role, sector, seniority, years of experience, English level, location, salary range, availability, LinkedIn and CV.

### Fields and domain rules

| Field (`name`) | Type | Rule |
|---|---|---|
| `firstName`, `lastName` | text | Required, at least 2 characters, letters only (accents, spaces, hyphens, apostrophes allowed) |
| `email` | email | Required, valid email format |
| `phone` | tel | Required, international format with country code; `+34` + 9 digits if country is Spain, `+1` + 10 digits if United States |
| `country` | select | Required: Spain, United States, Other (Nexova's two markets) |
| `city` | text | Required, at least 2 characters |
| `desiredRole` | text | Required, at least 3 characters |
| `sector` | select | Required: technology, retail, financial services (Nexova's client sectors) or other |
| `seniority` | select | Required: mid-management, senior management, executive (Nexova headhunts executive and mid-management profiles) |
| `yearsExperience` | number | Required, whole number 0–50; senior management needs ≥ 5, executive needs ≥ 8 |
| `englishLevel` | select | Required, CEFR scale (A2–C2, native) |
| `salaryExpectation` + `salaryCurrency` | number + select | Required, 20,000–400,000 per year, EUR or USD |
| `availableFrom` | date | Required, from today up to 12 months ahead |
| `linkedinUrl` | url | Required, `https://` + `linkedin.com/in/<profile>` |
| `cv` | file | Required, PDF or DOCX, max 5 MB |
| `summary` | textarea | Required, 50–1,000 characters, live counter |
| `privacyConsent` | checkbox | Required |

"Clear form" resets every field and removes all error and success states. There is no backend yet: a valid submission shows a confirmation message.

## Accessibility and SEO

- Semantic landmarks (`header`, `nav`, `main`, `section`, `article`, `footer`, `address`), skip link, one `h1` per page.
- Every input has a `<label for>`, related fields are grouped in `<fieldset>`/`<legend>`, errors are linked with `aria-describedby` and flagged with `aria-invalid`; the error summary uses `role="alert"` and the success message `role="status"`.
- Visible focus rings on every interactive element; mobile menu uses native `<details>` so it works with the keyboard and without JavaScript.
- Checked with axe-core (WCAG 2 A/AA + best practices): 0 violations on both pages. No horizontal scroll from 360 px to 1440 px.
- Schema.org JSON-LD, meta description, canonical URL, descriptive `alt` on all images, lazy loading below the fold.
