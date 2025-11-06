Tighten hero copy & single CTA
- Update H1 to “Web, Merch, and Soundtracks — shipped clean and fast.”
- Change primary CTA to “Get a quote in 24h”

Sticky CTA on mobile
- Add fixed bottom CTA linking to #quote (safe-area aware)

Portfolio grid: uniform cards, quick filters
- Add minimal grid with consistent card sizes and labels (Web/Merch/OST)
- Ensure each card links back to #quote

Add /quote minimal form (name, email, service, budget range, brief)
- Reuse existing SimpleQuoteForm inside /quote page

Inline validation + success/next steps
- Keep mailto for now; confirm fields have inputMode/autoComplete

Contrast/focus pass (WCAG 2.2 AA)
- Add focus-visible rings to primary CTAs
- Verify nav links have adequate contrast

Optimize LCP image (Next/Image, explicit width/height, priority)
- Mark hero image as priority

Fonts: subset + display: swap
- Already using Google fonts with display: swap
- Optional: later swap to local subsets

Metadata + OG/Twitter + canonical
- Polish title template em dash
- Add OG image asset (follow-up)

Analytics: quote_viewed, quote_started, quote_submitted
- See tracking.md for event schema

