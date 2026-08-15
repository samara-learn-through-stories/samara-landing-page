# Samara landing page

React + Vite site for Samara — learn Arabic through stories.

## Run locally

```bash
npm install
cp .env.example .env   # set VITE_TALLY_FORM_ID=EkVqAX
npm run dev
```

## Waitlist

The landing page links to your **Tally** form — no email field on the site.

- Hero + footer: **Request an invite** → `https://tally.so/r/YOUR_ID`
- Nav: **Join the waitlist** → same link
- Email + survey answers are collected **only on Tally** (Submissions tab)

Optional: Tally → Integrations → **Google Sheets** for a backup export.

## Build

```bash
npm run build
```

Set `VITE_TALLY_FORM_ID` in your host environment (Vercel, Netlify, etc.).
