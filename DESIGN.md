# Design System - BookPath

## Source Priority

`docs/specs/bookpath_ai_agent_spec.md` has higher authority than this design system. This file translates the BookPath spec into the current visual and interaction direction; it must not redefine the product away from the spec unless the user explicitly asks for that change.

Read `PRODUCT.md` after the full spec for the short daily product constitution.

## Product Context

- **What this is:** BookPath is a static reading-decision prototype for Chinese readers who want a humane entry point into literary movements.
- **Who it is for:** Curious non-specialist readers who are interested in classics but often freeze at the question of which book to read first.
- **Current content scope:** Literature and literature-related books only; pure philosophy and other non-literary categories are out of the active prototype.
- **Space:** Book-world navigation, literary education, reader decision support.
- **Project type:** Map-like reading guidance prototype, not a general book site, encyclopedia, dashboard, editor tool, or publishing platform.

## Aesthetic Direction

- **Direction:** Book-world guide map.
- **Decoration level:** Intentional, content-supporting, restrained.
- **Mood:** It should feel like entering a carefully drawn map of the book world: regions are literary movements, roads are reading paths, landmarks are works, and warnings protect beginners from starting in the wrong place. The tone is warm, selective, and decisive, not academic or decorative.
- **Core metaphor:** Map routes, trail markers, reading-order lines, book landmarks, and caution signs. Paper texture is allowed, but it should support navigation rather than imply an editor's private workspace.

## Typography

- **Display/Hero:** Local CJK serif stack: `"Noto Serif SC", "Songti SC", "SimSun", Georgia, serif`.
  - Use for the brand-scale hero, major movement titles, and large editorial statements.
  - Rationale: the product is literary and Chinese-first; a serif voice gives the prototype more editorial authority than a generic SaaS sans.
- **Body:** Same CJK serif stack for long reading copy.
  - Rationale: guide pages are meant to be read, not scanned like a metrics tool.
- **UI/Labels:** Local CJK sans stack: `"Noto Sans SC", "Microsoft YaHei", sans-serif`.
  - Use for eyebrows, tags, controls, compact labels, and CTA buttons.
- **Data/Tables:** Not currently needed. If test logs become tabular, use the UI sans stack with tabular numeric settings where supported.
- **Code:** Default monospace is acceptable for README command snippets only.
- **Loading strategy:** Do not add web fonts or external font URLs in the static MVP. Keep the prototype openable from local files with no network dependency.
- **Scale:**
  - Hero title: `clamp(76px, 12vw, 172px)`.
  - Page section title: `clamp(36px, 5vw, 70px)`.
  - Card title: `clamp(22px, 2.3vw, 34px)`.
  - Body: `16px` to `18px`.
  - Metadata labels: `12px`, bold, uppercase when English is used.
- **Letter spacing:** Keep at `0`. Do not use negative letter spacing.

## Color

- **Approach:** Restrained warm paper-map palette with a few semantic navigation accents.
- **Paper:** `#f6f1e8` - page background and calm reading surface.
- **Paper strong:** `#fffaf0` - raised sheets, cards, text areas, and high-contrast paper surfaces.
- **Ink:** `#211c18` - primary text, dark panels, strong UI elements.
- **Muted:** `#665d54` - explanatory copy and secondary text.
- **Line:** `#d8cbbb` - grids, dividers, and subtle structure.
- **Primary accent:** `#8f3f2b` - route emphasis, labels, small highlights.
- **Primary accent strong:** `#642616` - selected tabs and active CTA states.
- **Moss:** `#536b4c` - optional secondary editorial accent for later states.
- **Teal:** `#2f6f73` - optional contrast accent, especially for focus-adjacent information.
- **Gold:** `#c28b2c` - warning or validation emphasis when used sparingly.
- **Focus:** `#0f5f7a` - accessible keyboard focus ring.
- **Semantic strategy:** Prefer text and structure over bright semantic colors. If success/error/info states are added, keep them low-saturation and ensure they pass contrast on paper.
- **Dark mode:** Not part of the current MVP. If added later, redesign surfaces instead of simply inverting the palette.

## Spacing

- **Base unit:** 8px.
- **Density:** Comfortable map-and-guide density. The page should feel readable but not like a marketing landing page.
- **Scale:** `2xs 4px`, `xs 8px`, `sm 12px`, `md 16px`, `lg 24px`, `xl 32px`, `2xl 48px`, `3xl 64px`, `4xl 72px`.
- **Section rhythm:** Use generous vertical separation between movement overview, path, guide cards, and feedback because each is a decision step.
- **Card rhythm:** Keep card internals tight enough for scanning: role, suitability, and next step visible before expansion.

## Layout

- **Approach:** Hybrid map grid.
- **Page structure:** Full-width bands with constrained inner content. Avoid floating section cards.
- **App shell:** The validated reading flow is `movements -> movement detail -> reading path -> guide card detail -> feedback`. The full product shell also reserves `works`, `paths`, `awards`, `lists`, `search`, `admin`, and `about` so the project can migrate toward the larger BookPath spec without hiding scope.
- **Hero:** First viewport must immediately signal BookPath and the reading-decision job. The visual should read as a guide map through books, not a private editor desk or admin workspace.
- **Movement atlas:** Five movement entries should behave like map regions. Desktop can use a compact region grid; mobile should collapse into a simple vertical list that can later become a native list screen.
- **Movement switcher:** Sticky below the hero or at content top, never blocking the active heading.
- **Movement overview:** Two-column intro on desktop, one column on mobile.
- **Reading path:** Five ordered steps in a visible sequence. This sequence is the core product object.
- **Route marks:** Use route lines, numbered markers, landmarks, and caution zones to make the reading order feel like navigation through a book world.
- **Guide cards:** Desktop 3 columns, tablet 2 columns, mobile 1 column. Cards are individual repeated items, not nested card systems.
- **Feedback panel:** A strong dark band is acceptable because it marks the test moment. Keep the CTA, reason field, and copyable summary close together.
- **Max content width:** Use viewport padding (`7vw` desktop, `20px` mobile) and let editorial grids set local width. Avoid narrow centered marketing sections.
- **Border radius:** Small and purposeful.
  - Tags: `4px`
  - Inputs: `6px`
  - Cards and major panels: `8px`
  - Pills and circular marks: `999px` only for controls or sequence dots.

## Components

- **Tabs:** Must clearly show active state with `#642616` fill and paper text. They must be keyboard focusable.
- **Guide cards:** Default visible fields are role, suitability, and next step. Details stay behind an expand control with `aria-expanded`.
- **Caution card:** Exactly one per movement in the MVP. It marks the book that should not be the beginner default.
- **Feedback choices:** Exactly three per movement: `我会先读这本`, `我还是不知道先读哪本`, `我想看另一个流派`.
- **Textarea:** The reason field is part of the test instrument, not a decorative form. Empty reason must show an inline prompt.
- **Copy summary:** Clipboard failure must leave the summary visible for manual copying.
- **Focus states:** Buttons, tabs, links, expand controls, textarea, and copy button need a visible `#0f5f7a` focus ring.

## Motion

- **Approach:** Minimal-functional.
- **Allowed:** Small fades, slight rise on entry, subtle hover lift for tappable cards and controls.
- **Avoid:** Scroll choreography, parallax, decorative animation, or motion that slows down reading.
- **Durations:** Micro `50-100ms`, short `150-250ms`, medium `250-400ms`.
- **Reduced motion:** Always respect `prefers-reduced-motion: reduce`.

## Content Experience Rules

- The product promise is "choose the next book", not "learn every fact about the movement".
- Every visible section should reduce decision anxiety.
- Avoid encyclopedia tone, taxonomy expansion, awards, rankings, and version debates during the static MVP.
- Keep the first screen direct: brand, purpose, five flows, and a visual cue for ordered reading.
- Guide copy should explain why a book is placed there, not merely describe the book.
- Newcomer protection is a feature. It is okay to tell readers not to start with the hardest classic.

## Do Not Drift Into

- Generic SaaS landing page patterns.
- Purple or blue gradient hero sections.
- Abstract feature grids with icon circles.
- Search-first book database UI.
- Overly academic movement encyclopedia.
- Decorative cards inside decorative cards.
- External images, fonts, APIs, packages, or build tooling.

## QA Checklist

- Can a reader understand the page's job within the first viewport?
- Can they switch between exactly five movements without losing context?
- Does the first viewport clearly read as a book-world guide map?
- Are the five path steps visibly ordered?
- Can guide cards be scanned before expanding?
- Does the caution card protect beginners instead of merely labeling difficulty?
- Does the feedback panel capture choice, reason, and copyable summary?
- At 375px width, do hero, switcher, cards, and buttons fit without overlap?
- Is the keyboard path obvious from tabs through feedback?
- Does `npm run verify` pass after visual edits?

## Decisions Log

| Date | Decision | Rationale |
| --- | --- | --- |
| 2026-05-18 | Use paper-map navigation as the core visual direction | BookPath is a reading-decision tool; the visual metaphor should signal routes, landmarks, order, and reader protection. |
| 2026-05-18 | Keep local font stacks and no external assets | The static MVP must open directly from `index.html` and remain dependency-free. |
| 2026-05-18 | Prioritize path and guide-card hierarchy over search or browsing | The MVP validates whether high-quality flows help readers pick a first book. |
| 2026-05-18 | Keep motion minimal and functional | The prototype should support careful reading and accessibility, not perform as a marketing page. |
| 2026-05-19 | Expand the product skeleton to five movements | The next iteration should look like an extensible BookPath product while still avoiding backend, search, accounts, and AI generation. |
| 2026-05-19 | Add static App Shell route pages | The project should stop being only a long page and start expressing the future mobile app information architecture. |
| 2026-05-19 | Add full-product route shells from the large spec | Missing modules should be visible as inert architecture contracts, not silently absent or prematurely implemented. |
