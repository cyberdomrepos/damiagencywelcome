## Prioritized TODO — Current site state & next steps

This file lists the highest-impact improvements, current status, and rough effort estimates. Use it as a short roadmap for the next sprints.

1. Accessibility sweep (High)

   - Status: partial (reduced-motion supported; form labels need review)
   - Tasks:
     - Add aria-labels and fieldset/legend where applicable
     - Ensure all interactive elements are keyboard-focusable and have visible focus styles
     - Run axe or similar accessibility scanner and fix top 10 issues
   - Effort: 1–2 days

2. Forms: server-side processing & validation (High)

   - Status: current form uses mailto (client-side)
   - Tasks:
     - Add a lightweight serverless function or API route to accept form POSTs
     - Implement server-side validation and spam protection (honeypot + rate limit)
     - Optionally integrate with an email provider or CRM
   - Effort: 1–2 days

3. Automated tests (Medium)

   - Status: none
   - Tasks:
     - Add unit tests for key components (CreativeTrinity, ServiceCard, QuoteForm)
     - Add a small E2E happy-path test (form submission flow) using Playwright
   - Effort: 1–3 days

4. CI / Lint / Typecheck (High)

   - Status: Git hooks and CI may be present but should be enforced
   - Tasks:
     - Add a GitHub Actions workflow to run typecheck, lint, and build on PRs
     - Ensure pre-commit linting and formatting (husky + lint-staged)
   - Effort: 0.5–1 day

5. Performance & monitoring (Medium)

   - Status: baseline optimizations applied
   - Tasks:
     - Add Lighthouse CI to monitor regressions
     - Add Sentry or a lightweight error reporting tool for runtime issues
   - Effort: 1 day

6. Content & copy pass (Low)

   - Status: copy present, may need marketing review
   - Tasks:
     - Review all headings, CTAs, and form text
     - Ensure consistent messaging and CTAs across breakpoints
   - Effort: 0.5–1 day

7. Visual QA and responsive polish (High)

   - Status: many responsive fixes applied, some reverted by the user
   - Tasks:
     - Run a full QA pass across device widths (320–1440px)
     - Fix any overset wrapping, spacing, or tappable target issues
     - Reconcile user-reverted component edits and prepare a diff/PR for reapplying agreed fixes
   - Effort: 1–2 days

8. Documentation consolidation (Low)
   - Status: this set of docs has been replaced/streamlined
   - Tasks:
     - Expand component prop reference (optional)
     - Add CONTRIBUTING.md and CODE_OF_CONDUCT if repo is public
   - Effort: 0.5–1 day

Notes:

- If you want, I can open a PR with the responsive fixes re-applied so you can review the visual diffs before merging.
- I can also generate the serverless form handler and wire it to an example email backend (SendGrid/SES) if you'd like that implemented.
