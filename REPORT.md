Executive Summary

- Above the fold is generic and splits attention across two CTAs. Updated hero copy to directly target three services (Web • Merch • Soundtracks) and changed the primary CTA to a single action: Get a quote in 24h. Added lightweight trust strip. (CreativeTrinity.tsx)
- “Get a quote” wasn’t persistently reachable on mobile. Added a sticky mobile CTA that respects safe areas. (layout.tsx)
- Portfolio section referenced in nav but not present. Added a minimal, uniform portfolio grid to make samples scannable and keep a clear path back to the quote CTA. (PortfolioSection.tsx, page.tsx)
- Quote form uses mailto (fine for now) but lacked mobile-friendly input types and autofill hints. Added inputMode/autoComplete for name/email/tel/url. (SimpleQuoteForm.tsx)
- LCP image was not prioritized. Marked hero image as priority to improve LCP. (CreativeTrinity.tsx)
- Minor metadata polish pending (title template em dash) — recommended but non-blocking. (layout.tsx)

Critical Paths (desktop + mobile)

- / → Hero CTA → #quote form → mailto submit
- / → scroll → Portfolio grid → click sample (anchors point back to #quote) → Get a quote
- /quote → dedicated minimal page for linking and campaigns

Evidence-Based Audit

- Clarity Above the Fold
  - Problem: H1 generic, dual CTAs dilute action. Evidence: app/components/CreativeTrinity.tsx:35–64, 79–97
  - Fix: Specific H1, one primary CTA; trust strip. Evidence: app/components/CreativeTrinity.tsx:35–46, 49–57, 103–121

- Navigation/IA
  - Problem: “Portfolio” link exists but no section. Evidence: app/components/NavBar.tsx:59–84 references #portfolio; no component exists.
  - Fix: Added PortfolioSection and wired into home. Evidence: app/components/PortfolioSection.tsx:1, app/page.tsx:18–23, 41–47

- Forms & Friction
  - Problem: Missing mobile keyboard types/autofill. Evidence: app/components/SimpleQuoteForm.tsx:56–61, 74–80, 95–101, 137–143, 154–160
  - Fix: Add autoComplete/inputMode types. Evidence: app/components/SimpleQuoteForm.tsx (patched lines around those ids)

- Trust
  - Problem: No immediate proofs near hero. Evidence: live hero shows copy and buttons only.
  - Fix: Added trust strip (turnaround, portfolio cue, revisions). Evidence: app/components/CreativeTrinity.tsx:103–121

- Mobile
  - Problem: Primary CTA not always visible while scrolling. Evidence: No sticky CTA.
  - Fix: Sticky mobile CTA. Evidence: app/layout.tsx:... added fixed link near bottom.

- Accessibility (WCAG 2.2 AA)
  - Good: Skip link present (app/layout.tsx:61–69), ARIA in Nav.
  - Gaps: Focus-visible styles missing on desktop CTA. Evidence: app/components/NavBar.tsx:121–131 (before patch)
  - Fix: Added focus-visible rings to CTAs. Evidence: app/components/NavBar.tsx:121–130; CreativeTrinity.tsx:49–57

- Performance (Core Web Vitals)
  - LCP candidate: Hero image (/images/hero-media.jpeg). Evidence: app/components/CreativeTrinity.tsx:146–171
  - Fix: Added priority attribute to Next/Image. Evidence: same file, image tag

- SEO Basics
  - metadataBase set. Title template contains a broken char. Evidence: app/layout.tsx:31–34
  - Recommendation: Change template to “%s — damiagency” (patch candidate)

- Analytics
  - No events wired. Recommendation: Track quote_viewed, quote_started, quote_submitted (see tracking.md)

Top 10 (Impact × Effort)

1) Hero clarity + single CTA (5×2)
2) Sticky mobile CTA (5×2)
3) Add Portfolio grid (4×3)
4) LCP priority on hero image (4×1)
5) Quote form input modes/autofill (3×1)
6) Focus-visible on CTAs (3×1)
7) /quote landing (3×2)
8) Metadata title template polish (2×1)
9) Add OG image asset (2×2)
10) Portfolio cards link back to quote (2×1)

