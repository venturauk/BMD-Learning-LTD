# BMD Learning Website

Marketing website for **BMD Learning**, a training, consultancy and coaching
company helping people and organisations perform better.

**BMD = Behaviour · Mindset · Development**

## Stack

A fast, dependency-free static site built with plain HTML, CSS and a small amount of
vanilla JavaScript. No build step, no framework. It deploys to any static host
(Netlify, Vercel, GitHub Pages, etc.) by serving the repository root.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home: hero, who we are, services overview, approach, sectors |
| `about.html` | About: meaning of BMD, purpose/mission/vision, personality, sectors |
| `services.html` | Services: Learning & Development, Consultancy, Coaching, Assessment & Insight |
| `approach.html` | Approach: Understand, Design, Deliver, Embed, Evaluate |
| `contact.html` | Contact: enquiry form and contact details |

## Structure

```
.
├── index.html / about.html / services.html / approach.html / contact.html
├── css/styles.css      # Brand stylesheet (design tokens + components)
├── js/main.js          # Nav, scroll reveal, sticky header, form handling
├── assets/             # Logo, mark, favicon (SVG)
├── BRAND.md            # Brand guidelines
└── README.md
```

## Run locally

It's a static site, so just open `index.html`, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Notes

- The contact form is a HubSpot embedded form (EU region, portal `144888725`,
  form `f8a9b017-3f34-4eff-885b-b4d25455083a`), loaded via HubSpot's `v2.js`
  embed on `contact.html` and styled to match the brand in `css/styles.css`
  (`.hs-embed` rules). Submissions and notifications are managed in HubSpot.
- Fonts load from Google Fonts with a system-font fallback, so the site still
  renders cleanly offline.
- The displayed contact email is `info@bmdlearning.com`; make sure that mailbox
  exists and the HubSpot form notification goes there.
