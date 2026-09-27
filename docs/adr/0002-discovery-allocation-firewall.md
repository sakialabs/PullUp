# ADR-0002: Separate discovery from allocation

- **Status:** Accepted
- **Date:** 2026-09-26

## Decision

Flow may explain why a Place matches a person's stated preferences. Those explanations cannot affect eligibility, offer order, price, repair priority, rights, or tenure. Providers cannot receive Not It activity or hidden engagement scores.

## Enforcement in the proof

- Match counts are derived from published, human-readable criteria.
- The public contract carries an explicit allocation-firewall statement.
- The API is read-only and contains no applicant, allocation, ranking, payment, or write route.
- Keep and Not It stay in the local review session with an undo path.

## Consequence

Any future allocation workflow requires separate rules, authorization, reasons, audit, human review, appeal, and fairness tests. Discovery signals are not eligible inputs.
