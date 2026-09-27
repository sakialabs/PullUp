# PullUp Design System

> Warm enough to feel like home. Clear enough to trust with one.

**Version:** 1.3  
**Status:** Visual and interaction direction  
**Date:** September 20, 2026

## 1. Design thesis

PullUp should combine:

- the immediacy of a great discovery app;
- the calm of a well-run library;
- the honesty of a utility bill that finally explains itself;
- the warmth of arriving somewhere people expected you;
- the seriousness required for housing, rights, money, and safety.

The interface can be playful around discovery and community. It becomes direct around applications, agreements, payments, access, repairs, privacy, and appeals.

## 2. Brand character

PullUp is:

- warm, not cute;
- fresh, not trendy for its own sake;
- confident, not corporate;
- grounded, not beige bureaucracy;
- optimistic, not naive;
- political, not preachy;
- smart, not chatty;
- communal, not intrusive;
- sustainable, not greenwashed.

### Voice test

If the copy sounds like a landlord wearing a bucket hat, rewrite it.

## 3. Core message system

### Primary line

**Homes made for chillin’ not flipping.**

Keep this as one clean, conversational line. The missing comma is intentional: the short parallel phrase reads like spoken language and avoids a punctuation pile-up after the dropped **g**.

### Product lines

- **Find your place. PullUp.**
- **Your people. Your place. PullUp.**
- **See the place. Know the damage. PullUp.**
- **Find your fLOKr. PullUp to your place. TapIn.**

### Day One line

**One trusted person. More ways to move together.**

### Relationship naming

- **Day One** is the feature and navigation destination.
- **Twin Up** is the primary action for inviting or connecting a trusted person.
- **Twin** is the person the user chooses.
- Never use **Day One** and **Twin Up** as interchangeable labels: one names the place; the other names the move.

### Plain-language rule

Every expressive name used for material information receives a plain-language partner:

| Expressive label | Plain-language partner |
|---|---|
| Total Damage | Full expected housing cost |
| Where It Goes | Cost breakdown |
| Pull Up | Book or request a tour |
| Fine Print | Agreements, rights, and responsibilities |
| Where We At? | Application status |
| Max Pass | Day One permissions and expiry |
| Receipts | Day One access and action history |

## 4. Visual direction

The direction is **grounded solarpunk with neighbourhood afterglow**.

PullUp should feel like a lively block at sunset: warm homes, open doors, blue windows, gardens, porch lights, shared tools, and people moving together. The colour and motion can be expressive. The information must remain calm and trustworthy.

This means:

- sun, clay, leaves, brick, linen, wood, brushed metal, and community noticeboards;
- coral roofs, deep plum shadows, bright windows, gardens, and porch-light yellow;
- real apartments and shared spaces;
- visible repair, care, reuse, accessibility, and energy systems;
- generous daylight and human scale;
- bold editorial type, confident Place cards, and clear areas of flat colour;
- asymmetry through composition and spacing rather than decorative overlays;
- no sci-fi city renders;
- no sterile luxury towers;
- no fake eco dashboards glowing neon green;
- no default beige-and-sage startup theme;
- no untouched component-library aesthetic;
- no sad stock photography used to manufacture pity.

### Visual test

PullUp should look like a community platform with something to say, not a property-management dashboard that changed its button colour.

## 5. Temporary brand mark

Use the hut pair as PullUp's temporary visual identity:

- **`hut-static.png`** is the default brand mark for navigation, sign-in, metadata, social previews, and other still surfaces.
- **`hut-animated.png`** appears only in brief moments of welcome, arrival, successful move completion, or an intentional loading state.
- Pair the mark with a clear **PullUp** wordmark. The image supports the name and never replaces it where recognition or accessibility matters.
- Use the supplied image asset instead of a system emoji glyph so the mark stays consistent across platforms.
- Keep the transparent background. Do not place the hut inside a generic app-icon circle unless the platform requires one.
- Keep the mark unframed in both themes. Adjust the surrounding surface or mark size if it needs more separation.
- Treat both files as placeholders until PullUp has an original vector mark and confirmed production usage rights.

The hut is intentionally broader than a private suburban-house symbol. It represents shelter, arrival, shared roots, and the basic human idea of home. The wider interface must show apartments, co-ops, rooms, supportive housing, multigenerational homes, and many ways of living so the symbol never narrows the product story.

### Mark behaviour

- Navigation mark: 28 to 32 pixels.
- Compact mark: 20 pixels only after checking that the doorway remains readable.
- App or social mark: 48 pixels or larger.
- Animated mark: one short play, then settle. Never loop continuously beside serious content.
- If the PullUp wordmark is already visible beside the mark, use empty alternative text on the image to avoid duplicate screen-reader output.

## 6. Colour

### Theme: Block Party

The palette takes the hut's warmth and surrounds it with the energy of a neighbourhood at sunset. Coral and plum anchor the identity. Sky, garden, and porch-light yellow add freshness without turning PullUp into another green-and-beige sustainability product.

### Brand colours

| Name | Value | Meaning |
|---|---:|---|
| Roof Coral | #F2573F | PullUp identity, primary actions, arrival, and confident emphasis |
| Doorstep | #2A1726 | Deep plum anchor, strong contrast, and night-time warmth |
| Window Sky | #29B6E8 | Useful information, links, navigation, and digital systems |
| Garden | #2FCB78 | Community benefit, sustainability, repair, and confirmed progress |
| Porch Light | #FFC44D | Total Damage, highlights, savings, and useful attention |
| Warm Canvas | #FFF8F4 | Human light-mode background without beige bureaucracy |

### Semantic theme tokens

These values are the accessible sRGB reference palette. The implementation should expose equivalent semantic CSS variables in OKLCH so themes and state variations can be tuned predictably.

| Token | Light | Dark | Use |
|---|---:|---:|---|
| Background | #FFF8F4 | #170F16 | App canvas |
| Foreground | #261820 | #FFF6F1 | Primary text |
| Card | #FFFFFF | #251820 | Cards, forms, and menus |
| Raised surface | #F4E8E3 | #31222B | Secondary panels and selected areas |
| Muted foreground | #6D5962 | #CDBDC4 | Supporting text |
| Primary | #F2573F | #FF7058 | Main branded action |
| Primary foreground | #2A1726 | #2A1726 | Text and icons on primary |
| Information | #29B6E8 | #5CCBEE | Links, information, and active navigation |
| Information foreground | #261820 | #170F16 | Text and icons on information |
| Positive | #2FCB78 | #4ED88C | Confirmed, repaired, or community-positive state |
| Positive foreground | #261820 | #170F16 | Text and icons on positive |
| Highlight | #FFC44D | #FFD36A | Cost, savings, progress, and useful context |
| Highlight foreground | #261820 | #170F16 | Text and icons on highlight |
| Border | #E6D7D9 | #523A46 | Controls, groups, and dividers |
| Destructive | #A23737 | #FF7A7E | Actual danger or destructive action |
| Focus ring | #B9382F | #5CCBEE | Keyboard and assistive focus |

### Contrast references

- Foreground on light Background: 16.20:1.
- Muted foreground on light Background: 6.14:1.
- Doorstep on Roof Coral: 4.97:1.
- Foreground on Window Sky: 7.25:1.
- Foreground on Garden: 8.05:1.
- Foreground on Porch Light: 10.74:1.
- Foreground on dark Background: 17.65:1.
- Muted foreground on dark Background: 10.46:1.
- Doorstep on dark-mode Primary: 6.17:1.

Do not place white text on Roof Coral. Use Doorstep. Verify contrast again whenever a token is converted, tinted, composited, or placed over imagery.

### Semantic use

- Roof Coral means a deliberate PullUp action or active branded state.
- Window Sky means useful information, a link, or a navigational relationship.
- Garden means a positive outcome, shared benefit, care, repair, or sustainability.
- Porch Light calls attention to money, savings, progress, or a useful heads-up.
- Doorstep gives the system depth and anchors both modes.
- Destructive colour appears only for actual risk or destructive action.
- Colour never carries meaning alone.

### Flat surfaces and visual restraint

- Use flat colour surfaces. Do not use gradients unless a future brief explicitly asks for one.
- Do not use decorative line patterns, left-edge selection rails, stacked-card outlines, or ornamental borders.
- Show active and selected states through a tonal fill, icon colour, text weight, or contrast change.
- Keep borders only when they clarify a control, group, input, focus state, or information boundary.
- Keep brand marks on transparent backgrounds without app-icon circles, tiles, or backing shapes unless the platform requires one.
- Give light and dark themes deliberately different navigation surfaces. Do not keep a permanently dark sidebar in both modes.
- Texture should come from photography, illustration, spacing, and typography rather than background effects.
- Never simulate dirt, damage, or distressed housing for aesthetic effect.

## 7. Interface libraries and styling architecture

PullUp uses a small, owned interface stack. Libraries accelerate the work, but the visual identity belongs to PullUp.

| Library | Role | PullUp rule |
|---|---|---|
| Tailwind CSS 4 | Semantic tokens, responsive layout, states, and theme composition | Use CSS-first configuration and semantic utilities. Do not scatter raw brand hex values through components. |
| shadcn/ui | Accessible, editable component foundations | Own and restyle the source. Never ship the default neutral theme as the PullUp aesthetic. |
| Radix UI primitives | Keyboard, focus, overlay, and interaction behaviour | Prefer proven primitives for dialogs, menus, tabs, tooltips, and popovers. Preserve their accessibility behaviour when styling. |
| Motion for React, formerly Framer Motion | Flow gestures, shared layout, card transitions, sheets, and tactile feedback | Motion explains state and direction. Every animation needs a reduced-motion alternative. |
| Lucide React | Supporting interface icons | Use consistent two-pixel rounded strokes and visible text for unfamiliar actions. |
| Class Variance Authority | Typed component variants | Keep size, tone, state, and emphasis variants explicit instead of building class-name puzzles. |
| next-themes | Light, dark, high-contrast, and system preference | Apply the theme before paint and avoid flashing the wrong mode. |

### Token architecture

- Store colour, type, radius, spacing, shadow, and motion values as semantic CSS variables.
- Map shadcn variables such as `--background`, `--foreground`, `--primary`, `--accent`, `--border`, and `--ring` to PullUp tokens.
- Keep brand names in design documentation and semantic names in component APIs.
- Components consume tokens rather than checking the current theme.
- User preference may select light, dark, system, high contrast, and reduced stimulation independently where the platform permits.
- Test theme changes at 200 percent zoom, with forced colours, and with reduced motion.

### Component ownership

- Start with the smallest suitable shadcn or Radix primitive.
- Remove demo styling before adding PullUp styling.
- Wrap repeated housing patterns such as Place Card, Total Damage, Heads Up, Max Pass, Status Chip, and Fix Update as domain components.
- Keep legal, financial, consent, and access components visually calm even when discovery surfaces are playful.
- Document component variants beside the tokens they consume.
- Add visual-regression and accessibility tests before a component becomes shared infrastructure.

## 8. Typography

### Recommended family

- **Display and headings:** Bricolage Grotesque Variable
- **Body and interface:** Atkinson Hyperlegible Next
- **Arabic:** Noto Sans Arabic
- **Other scripts:** an appropriate Noto Sans companion where the primary families lack complete glyph coverage
- **Data and identifiers:** a platform monospace stack

The display family adds personality without turning housing into entertainment. The body family prioritizes clarity. If font delivery fails, use the system sans stack without layout breakage. Never use faux bold or faux italics for unsupported scripts.

### Scale

| Token | Size and line height | Use |
|---|---|---|
| Display | 56/60 | Marketing statement on wide screens |
| H1 | 40/44 | Main screen title |
| H2 | 30/36 | Major section |
| H3 | 22/28 | Card group or panel |
| Body large | 18/28 | Key explanation |
| Body | 16/24 | Default copy |
| Small | 14/20 | Supporting information |
| Label | 13/16 | Metadata and input labels |

Minimum body text is 16 pixels. Dense operator tables may use 14 pixels with generous line height and user zoom support.

### Rules

- Sentence case by default.
- Avoid all-caps except short eyebrow labels.
- Use tabular numbers for costs and comparisons.
- Never communicate hierarchy through weight alone.
- Legal and financial copy gets more space, not a smaller font.

## 9. Spacing and layout

Use a four-pixel base grid.

### Spacing tokens

4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80

### Content widths

- readable prose: 680 pixels;
- forms: 760 pixels;
- resident dashboard: 1180 pixels;
- operator workspace: 1440 pixels;
- Place Flow card: 520 pixels maximum;
- mobile safe padding: 16 pixels minimum.

### Responsive behaviour

- Mobile: one primary task and bottom navigation.
- Tablet: card plus supporting context where useful.
- Desktop: persistent navigation with split views for discovery, comparisons, and operations.
- At 200 percent zoom, content reflows without horizontal page scrolling.

## 10. Shape and surface

### Radius

- small controls: 10 pixels;
- inputs: 14 pixels;
- cards: 20 pixels;
- major feature panels: 28 pixels;
- pills only for short status or filters.

Cards should feel soft, not inflated. Avoid making every container a floating rounded rectangle.

Use a mix of full-bleed sections, quiet dividers, grouped lists, and cards. Rounded rectangles are a tool, not the page layout.

### Borders

- one-pixel neutral borders on interactive and grouped surfaces;
- stronger focus ring outside the component;
- dividers inside data-heavy panels;
- no low-contrast ghost inputs.

### Elevation

Use three levels:

1. flat information;
2. raised interactive card;
3. temporary overlay.

Large blurry shadows make housing look like e-commerce. Keep them restrained.

## 11. Iconography

Use Lucide React line icons with:

- two-pixel visual weight;
- rounded joins;
- text labels for unfamiliar actions;
- no house icon beside every housing noun;
- no brain, sparkle, or robot icon to announce AI.

Important actions receive a verb label. Icons support understanding rather than replacing it.

## 12. Imagery

### Show

- attainable homes;
- real materials and daylight;
- visible accessibility;
- repairs and care;
- people using Commons naturally;
- mixed-age, mixed-household community without staged tokenism;
- winter and weather reality;
- transit, bikes, gardens, tools, solar, shade, and shared rooms.

### Avoid

- luxury penthouses;
- key handoffs with suit sleeves;
- empty white apartments pretending to be universal;
- surveillance devices as lifestyle decoration;
- homeless people used as anonymous tragedy;
- futuristic eco-city fantasy;
- people posing at a fake community table.

Every Place photo includes date, source, and what it represents. Generated or illustrative images never impersonate a real listing.

## 13. Motion

Motion provides orientation and tactility.

Motion for React provides the implementation layer. Prefer transform and opacity changes that remain smooth on modest devices. Never let animation delay access to cost, rights, safety, or application information.

### Timing

- immediate feedback: 100 to 140 milliseconds;
- panel transition: 180 to 240 milliseconds;
- Place-card decision: 220 to 300 milliseconds;
- no decorative loop longer than needed.

### Easing

Use a calm deceleration curve for entering surfaces and a short acceleration for exit.

### Flow gestures

- right: Keep;
- left: Not It;
- up: Pull Up.

Every gesture has a visible button, keyboard command, screen-reader action, and undo. The card does not commit before release.

Respect reduced motion by removing travel and using short opacity or state changes.

## 14. Navigation

### Resident navigation

- Flow
- Keepers
- My Place
- Commons
- Day One

Account, My Business, Need a Hand?, and notifications live in the utility area.

### Operator navigation

- Places
- Applications
- Residents
- Fixes
- Commons
- The Board
- Reports
- Settings

### Mobile

Use no more than five primary bottom-navigation items. Labels remain visible.

## 15. Core components

### Place card

Order:

1. representative image;
2. Total Damage;
3. tenure and availability;
4. accessibility facts;
5. essential fit;
6. Heads Up;
7. action row.

Primary actions:

- Not It;
- Keep;
- Pull Up.

No paid boost, popularity badge, fake countdown, or “twelve people are looking.”

### Total Damage block

Always shows:

- complete amount or honest range;
- period;
- included items;
- estimated items;
- move-in amount;
- link to Where It Goes;
- freshness date.

### Status chip

Contains text and icon where helpful:

- Draft;
- Submitted;
- Action needed;
- Under review;
- Eligible;
- Waitlisted;
- Offer;
- Complete;
- Closed.

### Heads Up block

Uses neutral warning language. It is visually noticeable without looking like an emergency unless the issue is one.

### Day One card

Shows:

- Twin identity;
- active Max Pass;
- shared task or request;
- action needed;
- expiry;
- Receipts link.

It never exposes unrelated activity.

### Need a Hand?

Opens a small choice sheet:

- explain this;
- guide me;
- ask my Twin;
- contact a person;
- urgent help.

It does not open with a blank chat box.

## 16. Forms

- Put the label above the field.
- Explain why sensitive data is needed before requesting it.
- Mark optional fields in words.
- Save drafts.
- Offer step-by-step and full-form views.
- Use error summaries and inline errors.
- Preserve entered data after errors.
- Never validate aggressively while someone is typing.
- Show upload previews, source, expiry, and replacement controls.
- Use direct language for consent.

### Serious actions

Buttons use:

- Apply;
- Sign;
- Pay;
- Withdraw;
- Appeal;
- Report an emergency;
- Revoke access.

No slang on a button that changes rights, money, access, or legal position.

## 17. Data visualization

Charts are used only when they improve a decision.

Good uses:

- Where It Goes;
- repair completion and recurrence;
- energy and cost trends;
- Commons utilization;
- budget options;
- fairness monitoring.

Every chart includes a table or text summary. Do not rank residents.

## 18. Accessibility standard

Target WCAG 2.2 AA plus:

- 44 by 44 pixel preferred touch targets;
- visible keyboard focus;
- logical focus order;
- skip links and landmarks;
- 200 percent zoom and text spacing;
- captions and transcripts;
- reduced motion;
- high-contrast theme;
- plain-language mode;
- translation;
- screen-reader status announcements;
- no gesture-only action;
- no colour-only meaning;
- accessible map alternative;
- print, phone, kiosk, and assisted routes.

The W3C minimum target criterion is 24 by 24 CSS pixels in qualifying cases. PullUp aims higher for primary controls.

## 19. Content patterns

### Good

“Total Damage is about $1,184 each month. Electricity may change by about $35.”

“Heads Up: the elevator will be replaced from October 6 to October 20. An accessible temporary route is available.”

“Your Max Pass lets Ahmed compare these three Places until Friday. He cannot see your documents or payments.”

### Avoid

“Only $999*”

“This won’t last!!!”

“AI has found your perfect home.”

“Your helper has account access.”

## 20. Empty, loading, error, and success states

### Empty

Explain why the area is empty and offer one useful next move.

### Loading

Reserve layout space. Do not use motion that resembles progress when none is known.

### Error

State what happened, what remains safe, whether data was saved, and what the person can do.

### Success

Confirm the result, provide a receipt or reference, and explain the next step.

## 21. Initial mockup set

The first reviewable prototype covers:

1. Flow;
2. The Rundown;
3. Total Damage and Where It Goes;
4. Keep and Not It;
5. Pull Up tour request;
6. My Place;
7. Fixes;
8. Commons;
9. Day One;
10. responsive navigation.

It uses realistic sample data and demonstrates the visual system. It does not pretend to be a live housing service.

The next visual pass must also prove:

- the hut and PullUp wordmark lockup;
- Block Party in light and dark modes;
- branded shadcn components that no longer resemble their defaults;
- expressive Flow surfaces beside calm legal and financial surfaces;
- reduced-motion and high-contrast alternatives;
- responsive behaviour from small phones through wide operator screens.

## 22. Sources

- [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [W3C: Understanding dragging movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html)
- [W3C: Understanding target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [Atkinson Hyperlegible Next](https://www.brailleinstitute.org/freefont/)
- [Bricolage Grotesque](https://github.com/atelier-anchor/Bricolage)
- [Noto Sans Arabic](https://fonts.google.com/noto/specimen/Noto+Sans+Arabic)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix Primitives](https://www.radix-ui.com/primitives)
- [Motion for React](https://motion.dev/docs/react)
- [Lucide](https://lucide.dev/)

---

Built with 💖 for interfaces that feel welcoming and institutions that behave that way too.
