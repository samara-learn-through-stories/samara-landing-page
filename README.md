# Samara

**Learn Arabic through stories.**

Samara is a mobile app that teaches Arabic vocabulary by embedding words inside short, illustrated stories. Tap any word to see its meaning, memorise it, and revisit it through a 5-day spaced repetition cycle until it sticks. Named after Samarkand — the Silk Road crossroads where languages met.

This repo is the **landing page** for Samara, built with React + Vite.

## Features

- Interactive demo of the tap-to-learn flow
- 3D card showcase of the spaced repetition system
- Scroll-driven Silk Road origin animation
- Waitlist signup via Tally

## Getting started

### Prerequisites

- Node.js 18+
- npm

### Install & run

```bash
git clone https://github.com/your-org/samara-landing-page.git
cd samara-landing-page
npm install
```

Create a `.env` file (or copy the example):

```bash
cp .env.example .env
```

Set your Tally form ID:

```
VITE_TALLY_FORM_ID=EkVqAX
```

Start the dev server:

```bash
npm run dev
```

The site runs at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deploy

Deploy to Vercel, Netlify, or any static host. Set `VITE_TALLY_FORM_ID` as an environment variable in your hosting dashboard.

### Vercel

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo in the Vercel dashboard — it auto-detects Vite.

## Tech stack

- **React 19** + **Vite 8**
- **Fonts**: Bodoni Moda (display), Amiri (Arabic), Inter Tight (UI)
- **Styling**: vanilla CSS with CSS custom properties
- **Linting**: oxlint

## Waitlist

The landing page links to a **Tally** form for waitlist signups — no email fields on the site itself. Email and survey answers are collected only on Tally (Submissions tab).
