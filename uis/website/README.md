# Nexova Solutions — public website

Milestone 1: the company's first public website. Static site built with **HTML + Tailwind CSS** and vanilla JavaScript for form validation.

| File | What it is |
|---|---|
| `index.html` | Landing page with the sections required in `BRIEFING.md`, in order: header (Home, Services, Talent, Contact), hero, services (3 columns), why Nexova (2 columns), contact and footer. Schema.org `Organization` in JSON-LD, exactly as given in the briefing. |
| `application.html` | Talent registration form for professionals in active or passive job search, with the 11 fields from `BRIEFING.md` and the notice for companies. |
| `validation.js` | Real-time validation (on blur and while typing), the exact error messages from the briefing, blocks invalid submissions and shows the briefing's success message. |
| `assets/tailwind.css` | Tailwind CSS compiled and minified from `src/input.css`. No hand-written CSS. |
| `tailwind.config.js`, `src/input.css` | Tailwind build configuration. |

Base language: English. The full briefing is in [`BRIEFING.md`](../../BRIEFING.md) at the repository root (unmodified copy of `nexova-BRIEFING.en.md`).

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

## Form fields (from BRIEFING.md)

| Field | `name` | Type | Rule | Required |
|---|---|---|---|---|
| Full name | `fullName` | text | At least 2 words (first and last name) | Yes |
| Email | `email` | email | Contains @ and a valid domain (`user@domain.com`) | Yes |
| Phone | `phone` | tel | `+` + country code + number, e.g. `+34 612 345 678` | Yes |
| Country of residence | `country` | select | Spain / United States / Other | Yes |
| Years of experience | `yearsExperience` | number | Whole number between 0 and 50 | Yes |
| Sector of interest | `sector` | select | Technology / Retail / Financial Services / Consulting / Other | Yes |
| English level | `englishLevel` | select | Basic / Intermediate / Advanced / Native | Yes |
| Availability | `availability` | radio | Immediate / 1 month / 2-3 months / Just exploring | Yes |
| LinkedIn (profile URL) | `linkedin` | url | If filled in, must start with `http://` or `https://` | No |
| Additional comments | `comments` | textarea | Max 500 characters, visible counter | No |
| I accept the data policy | `dataPolicy` | checkbox | Must be checked | Yes |

Each field shows the error message defined in the briefing. Because the form is only for job seekers, it shows the notice "Are you a company looking for talent? Write to us at contacto@nexova.com". "Clear form" resets every field and removes all error and success states. There is no backend yet: a valid submission shows the briefing's success message.

## Accessibility and SEO

- Semantic landmarks (`header`, `nav`, `main`, `section`, `article`, `footer`, `address`), skip link, one `h1` per page.
- Every input has a `<label for>`, related fields are grouped in `<fieldset>`/`<legend>`, errors are linked with `aria-describedby` and flagged with `aria-invalid`; the error summary uses `role="alert"` and the success message `role="status"`.
- Visible focus rings on every interactive element; mobile menu uses native `<details>` so it works with the keyboard and without JavaScript.
- Checked with axe-core (WCAG 2 A/AA + best practices): 0 violations on both pages. No horizontal scroll at 360, 768 and 1440 px.
- Schema.org JSON-LD, meta description, canonical URL, descriptive `alt` on all images, lazy loading below the fold.
