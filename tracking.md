Quote Funnel Events

- quote_viewed
  - When: User sees the quote section (observe #quote in viewport) or visits /quote
  - Props: { route: string, referrer?: string }

- quote_started
  - When: User focuses any field in SimpleQuoteForm
  - Props: { route: string, service?: string }

- quote_submitted
  - When: User clicks submit (mailto triggered)
  - Props: { route: string, service?: string, budget?: string, timeline?: string }

- portfolio_viewed
  - When: Portfolio grid enters viewport
  - Props: { route: string }

- portfolio_item_clicked
  - When: User clicks any portfolio card
  - Props: { route: string, kind: "Web" | "Merch" | "OST", title: string }

Implementation Notes
- Prefer a lightweight client hook that dispatches to your analytics provider (e.g., Vercel Analytics, Plausible, PostHog).
- Use IntersectionObserver for *_viewed events with 0.4 threshold.
- Batch props minimally to avoid PII.

