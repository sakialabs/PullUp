# PullUp project guidance

## Product character

PullUp should feel warm, human, communal, direct, and politically aware without looking corporate, cute, or preachy. The visual direction is grounded solarpunk with neighbourhood energy.

## Standing visual preferences

- Default to flat colour surfaces.
- Do not add gradients unless the user explicitly requests them.
- Do not add decorative line patterns, left-edge selection rails, stacked-card outlines, or ornamental borders.
- Use borders only when they clarify controls, focus, grouping, or information structure.
- Show active states with a tonal fill, icon colour, text weight, or contrast change.
- Keep logos and favicons on transparent backgrounds without tiles, circles, or backing shapes unless a platform requires one.
- Give light and dark themes deliberately different surfaces, especially sidebars and navigation.
- Keep layouts expressive through composition, typography, photography, spacing, and confident blocks of colour.
- Avoid default shadcn styling and generic beige-and-green startup aesthetics.

## Interface stack

- Tailwind CSS 4 for tokens, responsive layout, and states.
- shadcn/ui and Radix primitives as accessible foundations, always restyled for PullUp.
- Motion for React for purposeful state and directional feedback, with reduced-motion support.
- Lucide React for interface icons.
- next-themes for theme handling without hydration mismatch or a flash of the wrong mode.
- Bricolage Grotesque for display type and Atkinson Hyperlegible Next for body and interface copy.

## Quality bar

- Preserve keyboard access, visible focus, semantic labels, and adequate contrast.
- Test light mode, dark mode, mobile layout, core flows, and horizontal overflow after visual changes.
- Run `npm run lint`, `npm run build`, and `node --test tests/rendered-html.test.mjs` before handoff.
- Keep serious housing, money, consent, accessibility, and legal information plain and calm.
