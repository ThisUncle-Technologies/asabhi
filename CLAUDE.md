# ASABHI COMPANY LIMITED — tut-exhibit-01

## Client
- **Company:** ASABHI Company Limited
- **MD:** Ibrahim Matayi
- **Phone 1:** +255 787 844 040 (also WhatsApp)
- **Phone 2:** +255 754 262 402
- **Status:** Website Complete — awaiting client assets & EmailJS credentials
- **Location:** Dar es Salaam, Tanzania

## Brand Tokens
```
--navy:   #0A1628   (primary background)
--navy-2: #122040
--gold:   #C9A84C   (accent)
--gold-2: #E2C06A
--cream:  #F7F3EC   (section backgrounds)

--font-heading: 'Playfair Display' (400, 600, 700, 900)
--font-body:    'Outfit' (300, 400, 500, 600)
```

## File Structure
```
tut-exhibit-01/
├── index.html              Home page
├── pages/
│   ├── about.html          Story, Mission/Vision, Team
│   ├── services.html       4 services with detail rows
│   ├── products.html       Filtered product catalogue (9 cards)
│   └── contact.html        Contact form + quick actions
├── css/
│   ├── style.css           Global styles (tokens, nav, hero, footer, etc.)
│   └── pages/
│       ├── about.css
│       ├── services.css
│       ├── products.css
│       └── contact.css
├── js/
│   ├── main.js             Cursor, loader, nav, hero GSAP, counters
│   └── pages/
│       ├── about.js
│       ├── services.js
│       ├── products.js     Filter logic included
│       └── contact.js      EmailJS form (needs credentials)
└── assets/
    └── images/             (empty — all images are Unsplash CDN)
```

## Key JS Functions (main.js)
- `lerpRing()` — cursor ring lerp animation (RAF loop)
- `initHeroAnimations()` — called after loader exits, fires GSAP timeline
- `animateCounter(el)` — count-up animation, triggered by IntersectionObserver

## Known TODOs
- [ ] Replace Unsplash images with real client photos after sale
- [ ] Add real logo (currently text-based)
- [ ] Configure EmailJS: set `EMAILJS_PUBLIC_KEY`, `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID` at top of `js/pages/contact.js` — form currently falls back to WhatsApp automatically
- [ ] Add real client/partner logos to clients strip on home page (index.html `.clients__logos`)
- [ ] Update Google Maps embed in contact.html once client confirms exact office address
- [ ] Add real social media links to all footer `href="#"` anchors

## Completed
- [x] All 5 pages built (index, about, services, products, contact)
- [x] Full CSS — global + per-page, responsive down to 375px
- [x] All animations (GSAP, Lenis smooth scroll, ScrollTrigger, counters)
- [x] Contact form with WhatsApp fallback (functional without EmailJS)
- [x] Google Maps placeholder (Dar es Salaam) on contact page
- [x] Footer copyright year updated to 2026
- [x] content-loader.js wired for web dashboard integration

## CDN Dependencies
- GSAP 3.12.5 + ScrollTrigger — animations
- RemixIcon v4.2.0 — icons
- EmailJS v4 — contact form (contact page only)
- Google Fonts — Playfair Display + Outfit

## Pitch Notes
- Warmest lead — proposal already accepted
- MD: Ibrahim Matayi
- Emphasise: no website at all currently, only a phone number in the CRM
- Show the site on mobile too — most Tanzanian clients view on mobile first
