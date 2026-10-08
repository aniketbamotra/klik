---
name: Klik
description: One brand in two registers — a storefront made of its own mark that persuades, and an admin in the same palette that operates.
colors:
  plum: "#3c2848"
  plum-deep: "#2b1c34"
  cream: "#ffe4c4"
  orange: "#ffa444"
  paper: "#fbf1e2"
  card: "#fffdf8"
  line: "#ebdcc8"
  haze: "#ffdcae"
  shell: "#2b1c34"
  adm-bg: "#f6f3ee"
  adm-surface: "#ffffff"
  adm-line: "#e7e1d7"
  ok: "#2f6f4f"
  alert: "#a3341f"
typography:
  display:
    fontFamily: "Instrument Serif, ui-serif, Georgia, serif"
    fontSize: "clamp(2.9rem, 6vw, 4rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Instrument Serif, ui-serif, Georgia, serif"
    fontSize: "clamp(2rem, 4.5vw, 2.6rem)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Instrument Serif, ui-serif, Georgia, serif"
    fontSize: "clamp(1.5rem, 3vw, 1.85rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "normal"
  body-large:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  body-small:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.375
    letterSpacing: "normal"
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.16em"
  adm-h1:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  adm-h2:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  adm-body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  adm-label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.04em"
rounded:
  control: "0.75rem"
  tile: "0.85rem"
  card: "1.25rem"
  plane: "2rem"
  pill: "999px"
  adm-card: "0.75rem"
  adm-control: "0.5rem"
  adm-sm: "0.375rem"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2.25rem"
  xl: "2.5rem"
  sticky-offset: "7rem"
  section: "4rem"
  section-wide: "5rem"
components:
  button-primary:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.cream}"
    rounded: "{rounded.pill}"
    padding: "1rem 2rem"
    typography: "{typography.body-small}"
  button-primary-hover:
    backgroundColor: "{colors.plum-deep}"
    textColor: "{colors.cream}"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.plum}"
    rounded: "{rounded.pill}"
    padding: "0.875rem 1.5rem"
    typography: "{typography.body-small}"
  button-quiet-hover:
    backgroundColor: "{colors.card}"
    textColor: "{colors.plum}"
  button-accent:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.plum-deep}"
    rounded: "{rounded.pill}"
    padding: "0.875rem 1.5rem"
    typography: "{typography.body-small}"
  button-disabled:
    backgroundColor: "transparent"
    textColor: "{colors.plum}"
    rounded: "{rounded.pill}"
    padding: "0.875rem 1.75rem"
    typography: "{typography.body-small}"
  button-filter:
    backgroundColor: "transparent"
    textColor: "{colors.plum}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.25rem"
    typography: "{typography.body-small}"
  button-filter-selected:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.cream}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.25rem"
    typography: "{typography.body-small}"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.plum}"
    rounded: "{rounded.card}"
    padding: "0.875rem"
  card-inverted:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.cream}"
    rounded: "{rounded.card}"
    padding: "2rem"
  card-object:
    backgroundColor: "{colors.card}"
    textColor: "{colors.plum}"
    rounded: "{rounded.card}"
    padding: "1rem"
  tile:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.tile}"
    padding: "1.25rem"
  plane:
    backgroundColor: "color-mix(in srgb, #ffe4c4 45%, transparent)"
    rounded: "{rounded.plane}"
    padding: "1.75rem"
  input-email:
    backgroundColor: "{colors.card}"
    textColor: "{colors.plum}"
    rounded: "{rounded.pill}"
    padding: "0.875rem 1.25rem"
    typography: "{typography.body-small}"
  input-search:
    backgroundColor: "{colors.card}"
    textColor: "{colors.plum}"
    rounded: "{rounded.pill}"
    padding: "1rem 1.25rem 1rem 3.5rem"
    typography: "{typography.body}"
  stepper:
    backgroundColor: "transparent"
    textColor: "{colors.plum}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 0.875rem"
    typography: "{typography.body}"
  chip-provisional:
    backgroundColor: "transparent"
    textColor: "{colors.plum}"
    rounded: "{rounded.pill}"
    padding: "0.375rem 0.875rem"
    typography: "{typography.label}"
  chip-proof:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.plum-deep}"
    rounded: "{rounded.pill}"
    padding: "0.375rem 0.875rem"
    typography: "{typography.label}"
  brand-bar:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.cream}"
    padding: "0.625rem 1rem"
    typography: "{typography.body-small}"
  header:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.plum}"
    height: "4.5rem"
    padding: "0 1.5rem"
  adm-button-primary:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.cream}"
    rounded: "{rounded.adm-control}"
    padding: "0.625rem 1rem"
    typography: "{typography.adm-body}"
  adm-button-primary-hover:
    backgroundColor: "{colors.plum-deep}"
    textColor: "{colors.cream}"
  adm-button-secondary:
    backgroundColor: "{colors.adm-surface}"
    textColor: "{colors.plum}"
    rounded: "{rounded.adm-control}"
    padding: "0.625rem 1rem"
    typography: "{typography.adm-body}"
  adm-button-danger:
    backgroundColor: "transparent"
    textColor: "{colors.alert}"
    rounded: "{rounded.adm-control}"
    padding: "0.625rem 1rem"
    typography: "{typography.adm-body}"
  adm-field:
    backgroundColor: "{colors.adm-surface}"
    textColor: "{colors.plum}"
    rounded: "{rounded.adm-control}"
    padding: "0.625rem 0.75rem"
    typography: "{typography.adm-body}"
  adm-field-disabled:
    backgroundColor: "{colors.adm-bg}"
    textColor: "color-mix(in srgb, #3c2848 45%, transparent)"
    rounded: "{rounded.adm-control}"
    padding: "0.625rem 0.75rem"
  adm-card:
    backgroundColor: "{colors.adm-surface}"
    textColor: "{colors.plum}"
    rounded: "{rounded.adm-card}"
    padding: "1.25rem"
  adm-sidebar:
    backgroundColor: "{colors.shell}"
    textColor: "{colors.cream}"
    padding: "1rem"
    width: "15rem"
  adm-topbar:
    backgroundColor: "{colors.adm-surface}"
    textColor: "{colors.plum}"
    padding: "0.75rem 1.5rem"
  adm-nav-item:
    backgroundColor: "transparent"
    textColor: "color-mix(in srgb, #ffe4c4 70%, transparent)"
    rounded: "0.5rem"
    padding: "0.625rem 0.75rem"
    typography: "{typography.adm-body}"
  adm-nav-item-current:
    backgroundColor: "color-mix(in srgb, #ffe4c4 12%, transparent)"
    textColor: "{colors.cream}"
    rounded: "0.5rem"
    padding: "0.625rem 0.75rem"
    typography: "{typography.adm-body}"
  adm-nav-count:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.plum-deep}"
    rounded: "{rounded.pill}"
    padding: "0.125rem 0.375rem"
  adm-pill-new:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.cream}"
    rounded: "{rounded.pill}"
    padding: "0.25rem 0.625rem"
  adm-pill-warn:
    backgroundColor: "color-mix(in srgb, #ffa444 25%, transparent)"
    textColor: "{colors.plum}"
    rounded: "{rounded.pill}"
    padding: "0.25rem 0.625rem"
  adm-pill-ok:
    backgroundColor: "color-mix(in srgb, #2f6f4f 12%, transparent)"
    textColor: "{colors.ok}"
    rounded: "{rounded.pill}"
    padding: "0.25rem 0.625rem"
  adm-pill-alert:
    backgroundColor: "color-mix(in srgb, #a3341f 10%, transparent)"
    textColor: "{colors.alert}"
    rounded: "{rounded.pill}"
    padding: "0.25rem 0.625rem"
  adm-pill-settled:
    backgroundColor: "{colors.adm-bg}"
    textColor: "color-mix(in srgb, #3c2848 70%, transparent)"
    rounded: "{rounded.pill}"
    padding: "0.25rem 0.625rem"
  adm-chip-honest:
    backgroundColor: "transparent"
    textColor: "color-mix(in srgb, #3c2848 70%, transparent)"
    rounded: "{rounded.pill}"
    padding: "0.375rem 0.75rem"
    typography: "{typography.adm-label}"
  adm-metric-tile:
    backgroundColor: "{colors.adm-surface}"
    textColor: "{colors.plum}"
    rounded: "{rounded.adm-card}"
    padding: "1.25rem"
---

# Design System: Klik

## Overview

**Creative North Star: "The Shop Made Of Its Own Mark"**

Klik is a conventional storefront — brand bar, sticky header, hero, category
counters, catalogue grids, product pages, a bag, search, footer — whose entire
colour supply is taken from `klik logo.png`. Plum is the ink, the logo's cream
is the paper and the fill inside every drawing, and its orange is the one
accent. Nothing on any page is a colour the mark does not already contain. The
structure stays familiar on purpose; the identity does all of the
distinguishing, so the logo never reads as a sticker dropped onto a theme.

Depth is the second half of the identity. This world does not signal layers by
outlining them or by fading things back — it stacks physical planes at
measurable heights and lights them with one shadow scale. A product card is an
object on paper; every catalogue grid sits on a translucent cream plane; the
product page floats the object on its own sticky plane beside the description;
the homepage hero has three planes at three heights and three tilts; blurred
warm haze sits behind every page as atmosphere. Rounded throughout, warm
throughout, restrained in motion: exactly one authored animation exists in the
whole app.

The shop is now a multi-route storefront. Header and footer live in the root
layout rather than in one page, so the brand bar, the sticky navigation with
its current-page marker, and the disclosure footer are invariant across
`/`, `/shop`, `/shop/[counter]`, `/piece/[slug]`, `/bag`, `/search` and the
not-built-yet catch-all. A client bag context wraps the whole tree. Two prior
worlds were built and rejected, and both are confirmed anti-references. A
distinctive Indian-matchbox-litho world (Label Press) was rejected as too
idiosyncratic for a brand nobody knows yet; the devices PRODUCT.md names for it
are off the table. A plain white-and-plum DTC canon was rejected in the user's
words as "too one dimensional… no depth in the website as in the Z index… very
template like and it doesn't look international at all." Anything that flattens
this world back toward a white template, or that reaches for a hue outside the
mark, is regression.

The app now ships **two registers of one brand**. The storefront persuades; the
admin operates. Both are the same plum, cream and orange in the same Archivo,
and they are deliberately not the same surface. The storefront lives in
`app/(shop)/` under the brand shell — brand bar, sticky header, footer, bag
context. The admin lives in `app/admin/` under its own shell — a plum sidebar,
a plain top bar, no serif, no elevation, tighter radii — and sign-in sits alone
in `app/(admin-auth)/` so it renders outside the authenticated chrome. Where a
rule below is marked **shop-only** or **admin-only**, that scope is load-bearing
and is not a contradiction waiting to be tidied: the admin's flat outlined card
and its two semantic hues are *deliberate inversions*, taken because a tool
disappears into the task while a storefront is the task. Flattening the admin
into the shop's clothes, or dressing the shop in the admin's, is regression in
both directions.

**Key Characteristics:**

- Every colour sampled from the logo; no fourth hue anywhere
- Depth as literal elevation — one shadow scale, planes at real heights
- Instrument Serif with a true italic for display, Archivo for everything else
- Three display steps and nothing between them
- Warm cream paper, near-white planes, plum ink
- Rounded on every corner, from 0.75rem controls to 2rem planes
- One authored motion moment; everything else is a state transition
- Every summarising number in the app computed from the catalogue
- Every grid answers a short last row the same way, from one shared rule
- Controls that cannot finish are shipped disabled and say why
- Two registers: a serif, lifted, clamped storefront; a sans, flat, fixed-rem admin
- One honesty apparatus across both surfaces — nothing anywhere writes anything

## Colors

Three colours lifted from the mark itself — plum at 82% of the artwork, cream
at 15%, orange at 0.7% — plus two warm neutrals derived off the cream so the
cream still reads when placed on them.

### Primary
- **Logo Plum** (`{colors.plum}`): The ink. Body text, headings, icon strokes,
  the brand bar, the primary button, the selected filter tab, the brand band,
  illustration linework and the focus ring. Anything that must be read is this
  colour. Its opacity ladder is the system's only secondary-text device: 75%
  for supporting prose and definition terms, 72% for notes and provisional
  values, 65–60% for a card's material line, 35% for a disabled stepper arm.
- **Deep Plum** (`{colors.plum-deep}`): The pressed and settled state. Primary
  button hover, bag button hover, the footer ground, and text laid on orange
  fields.

### Secondary
- **Logo Cream** (`{colors.cream}`): The reverse ink and the fill. Type on plum
  grounds, the body fill inside every product illustration, the translucent
  catalogue plane (at 45%), the selection highlight, one of the two haze
  blooms, and the footer's hairline rule at 15%.

### Tertiary
- **Logo Orange** (`{colors.orange}`): The single accent, used with the same
  rarity it has in the mark. The tilted hero plane, the bag count badge, the
  small dot before a count, the accent button on the plum end-card, the footer
  proof stamp, the current-page underline in the header, the hover colour of a
  link inside dense interface copy (breadcrumb, bag line, footer), and the
  flame in the two illustrations that genuinely carry one.

### Neutral
- **Warm Paper** (`{colors.paper}`): The page ground, lifted one step off the
  logo's cream so cream elements stay visible on it. Also the ground of the
  product tile behind each illustration.
- **Lit Plane** (`{colors.card}`): The near-white surface of every raised card,
  the product page's object frame, the bag line, the summary panel and form
  inputs. The plane a product sits on.
- **Warm Line** (`{colors.line}`): The only border colour — header rule,
  section dividers, spec-row rules, input stroke, stepper stroke, quiet-button
  and disabled-button stroke.
- **Haze** (`{colors.haze}`): Never a surface. Used exclusively inside 80px
  blurred circles behind sections as atmosphere, at 45–50% opacity.

### Admin Surfaces (admin-only)

The admin inherits plum, plum-deep, cream and orange unchanged and adds four
neutrals plus two semantic hues. It uses no `{colors.paper}`, no
`{colors.card}`, no `{colors.haze}`.

- **Shell** (`{colors.shell}`): The sidebar ground — the same value as deep
  plum, named separately because it is a *layer role*, not an ink. It is
  `reference/operate.md`'s required second neutral layer: the shell must be
  visibly a different plane from the content, so a screen reads as
  chrome-plus-work rather than one field.
- **Admin Ground** (`{colors.adm-bg}`): The content ground behind every admin
  card. Lighter and less saturated than the storefront's paper, because dense
  data needs the surface to recede. Also the hover fill of a table row, the
  ground of a disabled field, and the tile behind a thumbnail.
- **Admin Surface** (`{colors.adm-surface}`): Plain white — every card, the top
  bar, every field, the secondary button. The only true white in the system,
  and admin-only.
- **Admin Line** (`{colors.adm-line}`): The admin's single border colour. Card
  borders, table row rules, field strokes, the top bar's bottom rule.
- **Ok** (`{colors.ok}`): Shipped, and in-stock. Never a fill at full strength
  — it appears as 12% ground with the hue itself as the type.
- **Alert** (`{colors.alert}`): Cancelled, out of stock, a field's invalid
  state, an error message, and the destructive button's outline and type.

### Named Rules

**The Mark Is The Material Rule.** Every colour on any Klik **shop** surface is
one of the logo's three colours or a warm neutral derived from them.
Introducing a fourth hue — a green success state, a blue link, a cool grey —
breaks the thesis of the entire build, which is that the brand is the substance
of the page rather than a badge placed on it. The shop's no-fourth-hue rule is
unchanged and still absolute.

**The Two Semantic Hues Rule (admin-only).** `{colors.ok}` and
`{colors.alert}` exist on admin routes and nowhere else, because
`reference/operate.md` requires a state-rich semantic vocabulary that plum and
orange alone cannot carry — an operator must read *cancelled* apart from
*delivered* at a glance. This is a scoped adaptation a finish reviewer ruled
correct, not a loosening of the shop's palette. There is no third semantic hue,
and neither of these two may appear on a storefront route.

**The Word Rides With The Colour Rule (admin-only).** Every status pill carries
its word — "Shipped", "Cancelled", "Low", "Out of stock" — so status never
rests on colour alone. A colour-only dot, swatch or bar is not a status
indicator here. The stock pill goes further and carries its number too
(`12 · In stock`).

**The Tool Is Not A Dashboard Rule (admin-only).** Colour in the admin is
confined to pills. Plum carries primary actions and the current nav row; orange
carries count badges and the warning state only; metric numbers are plain plum
at one weight and one size. No coloured figures, no tinted KPI cards, no charts
in brand colours. This single restraint is what keeps the panel reading as a
tool, and it is the easiest thing in the system to dilute one tinted number at
a time.

**The Orange Never Speaks Rule.** Orange never carries small text on a light
ground. It is a field with dark type standing on it (`{colors.plum-deep}`), a
plain shape, a 2px underline, or type on plum. Orange body copy on paper is a
contrast failure and a tonal one. Orange *is* permitted as a hover colour on
plum type, where it is a momentary state rather than the resting reading
colour.

**The Ink-Weight Rule.** Secondary emphasis is plum at reduced opacity, never a
second grey and never a lighter hue. If a value is provisional, it drops to
72%; if it is disabled, to 35%. The colour never changes, only its weight in
the ink.

**The Three Lockups Rule.** One lockup per ground: `/klik-lockup.png` (plum
letterforms, transparent) on light grounds, `/klik-mark.png` (cream
letterforms, transparent) on plum and plum-deep. `/klik-logo.png` — the
original boxed plum plate — is retired and appears on no ground in the app. A
boxed logo plate on a light ground is precisely the "logo dropped on top"
effect the user objected to.

## Typography

**Display Font:** Instrument Serif (with ui-serif, Georgia, serif) — weight 400
only, with a real italic loaded.
**Body Font:** Archivo (with ui-sans-serif, system-ui, sans-serif) — 400, 500,
600.

**Character:** A high-contrast literary serif doing all the speaking, against a
grotesque that never raises its voice. The serif appears at exactly three sizes
and never below 1.5rem; everything functional — prices, materials, navigation,
breadcrumbs, quantities, notes — is Archivo at Tailwind's default steps. The
italic is a genuine cut, not a slant, and is used as an emphasis phrase inside
a display line ("*for the house.*", "*why it picked these.*"), never for a
whole heading.

### Hierarchy
- **Display** (400, `clamp(2.9rem, 6vw, 4rem)`, 1.02, -0.015em): `.display-1`.
  The page headline — one per route. Every route has one: "Everything in the
  shop.", the piece name, "Your bag.", "Search."
- **Headline** (400, `clamp(2rem, 4.5vw, 2.6rem)`, 1.06, -0.01em):
  `.display-2`. Section headings — the counters, the catalogue, "Also at this
  counter.", the empty-bag statement.
- **Title** (400, `clamp(1.5rem, 3vw, 1.85rem)`, 1.1): `.display-3`. Category
  tile titles, the newsletter heading, the end-card line, the bag summary
  heading, and the bag subtotal figure.
- **Body Large** (400, 1.125rem, relaxed): The one-line product note directly
  under a price on the product page. Used at exactly one place per page.
- **Body** (400, 1rem, relaxed): Introductory and explanatory paragraphs and
  the product story, measured to 38–58ch.
- **Body Small** (400–500, 0.875rem, snug): The working size — product names,
  prices, navigation, breadcrumbs, counts, spec rows, service notes.
- **Label** (600, 0.72rem, 0.16em tracking, uppercase): `.label`. Footer column
  headings, provisional-status chips, and the note under a disabled control.
  Nothing else.

### Admin Hierarchy (admin-only)

One family, four fixed rem steps at roughly a 1.15 ratio, no clamps:

- **Admin H1** (600, 1.5rem, 1.2, -0.01em): `.adm-h1`. One per admin route, set
  by `PageHead` and by the loading shell so the skeleton state keeps the same
  heading.
- **Admin H2** (600, 1.125rem, 1.3): `.adm-h2`. Card and section headings —
  "Recent orders", "Needs restock", each form section, the empty state's line.
- **Admin Body** (400, 0.875rem, 1.5): `.adm-body`. The admin's working size:
  every table cell, field label, hint, meta line and back link. Secondary text
  is this size at 70% plum ink.
- **Admin Label** (600, 0.75rem, 0.04em): `.adm-label`. Table column headers,
  metric-tile captions, the sidebar's "Shop admin" line and the honesty chips.
  Not uppercase-tracked like the shop's `.label`; a column header is read, not
  displayed.

### Named Rules

**The No Serif In The Tool Rule (admin-only).** Instrument Serif appears on no
admin surface. The storefront's three clamped display steps are a brand-surface
device: they exist to make a headline behave like a poster. A tool's headings
are labels for regions, so the admin uses fixed rem values that do not move
with the viewport — a table header that resizes with the window is a
readability cost with no persuasive return. No admin heading is fluid, and no
admin type steps outside the four `.adm-*` classes.

**The Three Steps Rule (shop-only).** There are exactly three display steps
(`.display-1/2/3`) and nothing between them. Everything else uses Tailwind's
default scale. No arbitrary `text-[…]` literal exists in the shop routes and
none should be added; a heading that does not fit one of the three steps is a
heading at the wrong level.

**The Label Is Not An Eyebrow Rule.** `.label` marks a footer column, a
provisional-status chip, or the honest note beneath a disabled control. It is
never set above a heading as a kicker or an eyebrow. A section here opens with
its display heading and nothing above it. `.adm-label` is bound by the same
rule: it labels a table column or captions a figure inside a metric tile, and
is never set above a heading as a kicker.

**The Subtotal Is The Heaviest Thing Rule.** In any block that ends in a
figure, the figure carries the largest type. The bag summary sets its subtotal
at `.display-3` while the checkout control below it is quiet and outlined —
the number the visitor came for outweighs the button they cannot yet press.

## Layout

A single centred column, `max-width: 1240px`, with a 1rem gutter that opens to
1.5rem at `sm`. Two-column arrangements (hero, counters, product page,
newsletter, footer) collapse to one below `md`; every catalogue grid runs two
columns on mobile and four from `lg`.

Vertical rhythm is coarse and consistent. Homepage content sections use 4rem of
padding opening to 5rem from `md`; interior routes open at 3rem and step to
4rem from `md`, so a listing starts closer to the header than a marketing
section does. Denser bands — the service row, the newsletter — sit at
2.25–3.5rem. Grid gaps step 1rem / 1.5rem / 1.75rem / 2.25rem / 2.5rem
depending on the density of what is being separated: 1rem between product cards
on mobile, 1.5rem from `sm`, 2.5rem between the two category tiles.

Sections are separated by a single `{colors.line}` hairline (`border-t`,
`border-y`), never by a colour change alone — except where a section
deliberately inverts to plum. Every interior route opens with one blurred haze
bloom pinned off the top corner as atmosphere behind the heading.

The header is sticky at `z-50` with a translucent paper ground and a backdrop
blur, so content passes visibly beneath it. The plum brand bar above it scrolls
away; only the 4.5rem bar itself stays. Below `md` the navigation moves to a
horizontally scrolling second row under the header rather than into a
hamburger.

### Admin Layout (admin-only)

A fixed 15rem plum sidebar from `lg`, with the content column offset by the
same amount; below `lg` the sidebar becomes a real overlay drawer (a 16rem
panel over a `plum-deep/50` scrim), never a squeezed rail. The content column
carries a sticky top bar — white at 95% with a backdrop blur and a hairline
bottom rule — holding the menu button on the left and the honesty chip pushed
right. Admin content sits at 1rem padding opening to 1.5rem, with 1.5rem–2rem
of vertical padding; there is no max-width, because a table should use the
screen it is given.

Admin rhythm is tight and uniform: 0.75rem grid gaps between metric tiles,
1.5rem between major blocks, 1.25rem card padding, `px-5 py-3` table cells.
Metric tiles run 1-up, 2-up at `sm`, 4-up at `xl`. The overview splits
`1.5fr / 1fr` at `xl` and stacks below it.

Breakpoints are Tailwind defaults: `sm` 640px, `md` 768px, `lg` 1024px.

### Named Rules

**The Sticky Clearance Rule.** Anything that sticks below the header sticks at
`{spacing.sticky-offset}` (7rem) — the product page's object frame at
`md:sticky md:top-28`, the bag summary at `lg:sticky lg:top-28`. That is the
4.5rem header plus roughly 40px of breathing room, so a stuck panel never
appears welded to the bar above it. One offset, used everywhere; do not
hand-tune a second.

**The Terminal Rule.** A 4-up grid fills its short last row with the plum
`EndCard` only when **two or more** cells would sit empty —
`needsTerminal(count) = ((4 - (count % 4)) % 4) >= 2`. A single trailing gap is
an ordinary ragged end and needs nothing. A filled `.plane` with two empty
cells reads as content that failed to load, which is the defect this exists to
prevent; a terminal card dropped after a one-cell gap is padding. The predicate
lives beside the `EndCard` component and is imported by the homepage, `/shop`,
the counters and `/search` — a reviewer caught the same widow twice while the
threshold lived in a single page file, so a new grid must import it rather than
re-derive it.

**The Grid Is The Page Rule.** On a listing route nothing sits between the
heading block and the products: display heading, one line of prose, the counter
filter and a computed count, then the plane. Editorial bands belong on the
homepage.

**The Table Restructures, It Does Not Scroll (admin-only).** All three admin
tables — recent orders, orders, inventory — are `hidden lg:block` beside a
`lg:hidden` stack of cards carrying the same fields. No admin table is wrapped
in `overflow-x-auto`. An earlier scrolling table pushed Inventory's stock
steppers off-canvas on mobile, which is the entire purpose of that screen; a
horizontally scrolled table hides its rightmost column, and the rightmost
column is usually the action. A new admin table ships both forms or it does not
ship.

**The Two Shells Rule.** Neither surface inherits the other's furniture. The
storefront's header, footer and bag provider live in `app/(shop)/layout.tsx`;
the admin's sidebar and top bar live in `app/admin/layout.tsx`; sign-in lives
in its own `(admin-auth)` group precisely so it renders *outside* the
authenticated shell — there is no navigation and no "Sign out" to offer someone
who is not in yet. The root layout carries fonts and nothing visual.

## Elevation & Depth

This system is layered and lit. Depth is produced by real elevation — a surface
sits at a height, casts a shadow with both offset and blur, and moves up when
you reach for it. There is one shadow scale with three rungs and no ambient
halos, no flat glow, no inset bevels. Behind the raised material, blurred 80px
circles of `{colors.haze}` and `{colors.cream}` sit at `z-0` as atmosphere;
they are light, not objects, and never take a shadow or a border.

Set-back is expressed as scale and vertical position, never as opacity. In the
category emblem — used on the homepage and again on the empty bag — three
illustrations are grouped with the centre one at 104% height raised 4px at
`z-10`, and its neighbours at 82% pushed down 8px, a grouping read entirely
through size and height. An earlier opacity-based version of this was removed
in review.

### Shadow Vocabulary
- **Lift** (`box-shadow: 0 3px 10px -4px rgba(60, 40, 72, 0.22)`): The lowest
  rung. Shapes resting just off the page — the tilted orange hero plane, a
  quiet button on hover.
- **Raised** (`box-shadow: 0 12px 26px -12px rgba(60, 40, 72, 0.34)`): The
  resting height of every card and of the primary button. The default for
  anything that is an object rather than a region.
- **Float** (`box-shadow: 0 26px 52px -18px rgba(60, 40, 72, 0.42)`): Reached
  for. Card hover and primary-button hover only.

All three are tinted with the plum ink (`rgba(60, 40, 72, …)`) rather than
neutral black, so the shadow belongs to the same warm world as the surface.

### Named Rules

**The Elevation-Not-Fade Rule.** Depth is height, scale and shadow. Opacity is
never a depth signal. If an element needs to sit behind another, make it
smaller and lower it — do not fade it.

**The One Scale Rule.** Three shadows exist and no fourth is authored. Every
raised surface picks one of Lift / Raised / Float. A bespoke `box-shadow` in a
component is a defect, with two documented exceptions, both borders drawn as
shadows so they do not shift layout: the quiet button's 1px inset ring and the
disabled checkout control's `inset 0 0 0 1px var(--color-line)`.

**The Reach Rule.** Cards rise exactly 6px on hover with their shadow stepping
Raised → Float over 400ms; buttons rise 2px over 300ms. Both use
`cubic-bezier(0.2, 0.8, 0.2, 1)`. Nothing in this app moves further than 6px.

**The Still Card Rule.** The hover lift belongs to a card that is a link to
somewhere else. A card that is a container the visitor works inside — the bag
line, the summary panel, the product page's object frame — carries Raised at
rest and does not rise. Elevation announces navigation, not the presence of a
box.

**The Flat Tool Rule (admin-only, a deliberate inversion).** The storefront's
doctrine is "depth comes from real elevation, never a flat outline". The admin
inverts it: `.adm-card` is white with a 1px `{colors.adm-line}` border and **no
shadow at all**, and no admin surface uses Lift, Raised or Float. This is not
the rejected DTC-canon world leaking in — it is scoped, reasoned and
intentional. Shadows cost vertical space and visual noise per element, and an
admin screen puts twenty bordered regions where a product page puts three; and
`reference/operate.md` asks that the tool disappear into the task, which a
lit, floating plane does not do. Depth in the admin is the shell/ground/surface
tonal step — plum shell, warm-grey ground, white card — not light. A future
session must not "fix" the admin by giving it the shop's shadow scale, and must
not carry the admin's flat outline back onto a shop surface.

**The Press Is The Feedback Rule (admin-only).** With no elevation to change,
an admin control confirms itself by moving: all three button variants take
`transform: translateY(1px)` on `:active`. That 1px press is the admin's entire
motion vocabulary alongside the skeleton shimmer; there are no hover lifts
anywhere in the panel.

## Shapes

Rounded throughout, on a four-step radius ladder that maps to how large the
thing is: controls and focus rings at 0.75rem, product tiles at 0.85rem, cards
at 1.25rem, catalogue planes at 2rem. Anything pill-shaped — buttons, filter
tabs, chips, input fields, badges, the quantity stepper, the accent dot — is
fully rounded at 999px. There are no square corners in the system.

Borders are hairlines in `{colors.line}` and are used for structure (section
rules, spec-row rules, input strokes, the stepper's enclosure), never for
depth. The one deliberate variation is the dashed hairline, reserved as a
status device (see Components).

The homepage hero introduces the system's only rotation: three planes at
`-9deg`, `+5deg` and `-4deg`, each held in a `--tilt` custom property so the
settle animation can preserve its plane's angle while it moves. Tilt is a hero
device and does not propagate into any catalogue grid or interior route.

### Named Rules

**The Two Radius Scales Rule.** The shop's ladder (0.75rem controls, 0.85rem
tiles, 1.25rem cards, 2rem planes, 999px pills) governs shop surfaces. The
admin runs its own tighter ladder — `{rounded.adm-card}` for cards and
sections, `{rounded.adm-control}` for buttons, fields and steppers,
`{rounded.adm-sm}` for skeleton bars and thumbnails — because a tool's controls
sit closer together and a large radius on a dense row reads as slack. Pills
survive the crossing intact: every status pill, count badge and honesty chip is
999px on both surfaces. Do not use a shop radius on an admin control or the
reverse.

**The Focus Ring Owns No Radius Rule.** The global `:focus-visible` sets a 2px
plum outline at 3px offset and **deliberately sets no `border-radius`**. The
outline follows the element's own corner. An earlier version set a radius on
the focus rule and visibly reshaped focused buttons mid-interaction; do not
reintroduce it in either register.

**The Single Inset Rule.** A framed object gets one inset, not two. The product
page's object card and the tile inside it each carry `p-3 sm:p-4`, deliberately
lighter than the catalogue card's `p-3.5` / tile `p-5`, because a doubled inset
made the frame read as the subject instead of the object. When nesting a plane
inside a plane, reduce the padding rather than repeat it.

## Components

### Buttons
- **Shape:** Fully rounded pill (999px), inline-flex with a 0.55rem gap so a
  leading or trailing icon is part of the button rather than beside it.
- **Primary:** Plum ground, cream type, resting at Raised elevation. Generous
  padding — 2rem × 1rem for the hero and the add-to-bag action, tightening to
  1.75rem × 0.875rem in denser bands and 1.25rem × 0.75rem for a filter tab.
- **Hover / Focus:** Ground deepens to `{colors.plum-deep}`, the button rises
  2px and steps to Float over 300ms. Focus is the global 2px plum outline at
  3px offset.
- **Quiet:** Transparent with a 1px inset `{colors.line}` ring; on hover the
  ring turns plum, the ground becomes `{colors.card}` and Lift appears. The
  secondary action everywhere — "View all", "Search", "Back to the homepage",
  an unselected filter tab.
- **Accent:** Orange ground with `{colors.plum-deep}` type. Used only on the
  plum end-card, where orange is the one thing that can be seen.
- **Disabled:** A quiet outlined pill in plum at 72%, `cursor-not-allowed`, no
  lift and no hover, its ring drawn as an inset shadow. It always carries a
  `.label` note directly beneath naming the reason, tied to it with
  `aria-describedby`. It is never the heaviest element in its block.

### Filter Tabs
- **Style:** A row of pills that are literally the primary and quiet buttons at
  a tighter padding — selected is `button-filter-selected` (plum ground, cream
  type), unselected is `button-filter` (transparent, hairline ring).
- **Semantics:** Real links to real routes, carrying `aria-current="page"` when
  selected, so a filtered view is a shareable URL rather than a client state.
- **Companion:** The row ends with a computed count and price range, preceded
  by a 0.5rem orange dot: "7 of 14 · ₹780 to ₹2,740".

### Chips
- **Provisional (dashed):** A pill with a dashed hairline border at 30–45% ink
  opacity, `.label` type, no fill. Marks the artefact as unfinished — the
  service-row note, the brand band's proof stamp, the listing's placeholder
  disclosure, and the product page's "Drawing, not a photograph — real imagery
  to come".
- **Proof (solid):** The footer's placeholder stamp is the same pill in solid
  `{colors.orange}` with `{colors.plum-deep}` type, because on the plum-deep
  footer a dashed cream hairline disappears. Same device, ground-appropriate.
- **Voice:** These chips describe the artefact and never instruct the shop's
  owner. "Delivery, returns and payment are being finalised", not "add your
  delivery terms".

### Cards / Containers
- **Corner Style:** 1.25rem.
- **Background:** `{colors.card}`. The inverted end-card uses `{colors.plum}`
  with cream type.
- **Shadow Strategy:** Raised at rest; Float on hover of the wrapping
  `group/card` with a 6px lift, for link cards only. See The Still Card Rule.
- **Border:** None. A card is defined by its shadow and its lighter ground, not
  an outline.
- **Internal Padding:** 0.875rem for a catalogue card, 1rem for a category tile
  and a hero card, 1rem–1.25rem for a bag line, 1.5rem–1.75rem for the summary
  panel, 2rem for the inverted end-card and the product page's object frame is
  0.75rem–1rem. The image tile inside a catalogue card carries its own
  1.25rem.
- **Image tile:** A `{colors.paper}` square (0.85rem radius) holding the
  illustration; on card hover the drawing inside scales to 1.05 over 500ms.

### Inputs / Fields
- **Email:** Pill, `{colors.card}` ground, 1px `{colors.line}` stroke,
  0.875rem type, placeholder at 70% ink.
- **Search:** The same pill at the larger working size — 1rem type, 1rem
  vertical padding, and a 3.5rem left inset holding a 20px search icon that is
  `pointer-events-none` so the whole field remains the target. The label is
  visually hidden but present. No `autoFocus`.
- **Focus:** The stroke shifts to plum and the default outline is suppressed on
  the field itself.

### Quantity Stepper
- **Style:** A pill enclosure with a 1px `{colors.line}` stroke holding
  `−`, a `tabular-nums` count with `aria-live="polite"`, and `+`. The arms are
  bare text buttons at 1rem, hovering to orange.
- **Disabled arm:** `−` is disabled at quantity 1 and drops to 35% ink with
  `cursor-not-allowed`.
- **Removal:** A separate underlined "Remove" text control beside the stepper.

### Navigation
- **Style:** 0.875rem Archivo at weight 500, plum, no underline. Hover drops to
  60% opacity — the one place opacity is an interaction signal rather than a
  depth one.
- **Current page:** A 2px orange underline at 6px offset, plus
  `aria-current="page"`. This is the only underline in the navigation system
  and the only place a nav item takes the accent.
- **Header:** 4.5rem tall, translucent paper with backdrop blur, hairline
  bottom rule, lockup at left with `priority`. Icon actions are 20px strokes in
  a circular hit area that fills with `{colors.card}` on hover; the bag is a
  plum pill with an orange count badge.
- **Mobile:** The nav moves to a scrolling row beneath the header at the same
  type size, carrying the same current-page underline. The account icon is
  hidden below `sm`.
- **Breadcrumb:** 0.875rem plum at 75%, separated by a middot marked
  `aria-hidden`, links hovering to full plum, the current piece at full plum
  and not a link. An ordered list inside `nav[aria-label="Breadcrumb"]`.

### Product Illustrations (signature)
Flat two-tone drawings on a 160×160 grid, rendered by one component. They are
stand-ins until real photography exists, but their rules are the system's.

- **One owned palette, no per-piece hue coding.** Plum linework, cream body, a
  lighter cream for secondary areas. Every piece uses the same three values, so
  fourteen drawings read as one shop rather than fourteen products from
  fourteen brands.
- **Variance comes from `scale`, not colour.** Each piece carries an optical
  size from 0.68 (studs) to 1.0 (mirror, candle holder), applied by insetting
  the viewBox. A stud must not present at the visual weight of a mirror.
- **Orange only where there is a flame.** Two of fourteen pieces — the diya and
  the candle holder — carry the accent, because they actually burn. Orange is
  not decoration inside a drawing.
- **Every figure has a contact shadow.** A radial-gradient ellipse at 20% ink
  fading to zero sits at the base of every drawing, so the object rests on
  something instead of floating in its tile.
- **Strokes are deliberately heavier than the interface icons** — 5.5 and 8.5
  against the icon set's 1.6 on an equivalent grid — so a product never reads
  as a control.
- **Two documented relaxations, both compositional.** The grouped category
  emblem raises `scale` by 0.18 (capped at 1.0) because it is a composition
  rather than a comparable row; the product page raises it by 0.12 (capped at
  1.0) because that is the one place the object should crowd its frame. Every
  grid keeps true comparative scale.

### Interface Icons
A single closed set: 24px grid, 1.6 stroke, round caps and joins, no fill,
`currentColor`. Rendered at 16–20px. New icons are drawn into this set at these
exact parameters; no icon font, no third-party pack, no emoji glyph.

The admin's set (`components/admin/icons.tsx`) is a second file at the *same*
parameters — 24px grid, 1.6 stroke, round caps, `currentColor`, `aria-hidden`,
rendered at 16–20px — so the two surfaces share one drawing hand. A new admin
icon is drawn to these numbers, never imported from a pack.

### Product Page Composition (signature)
Two columns from `md`, 2.5rem gap opening to 3.5rem. The object sits left in a
lit-plane frame that is `self-start` and `md:sticky md:top-28`, so it hugs its
own content rather than stretching to the description's height, and stays in
view while the story is read. The right column runs: display heading, price at
1.5rem, the one-line note at `body-large`, then the two-paragraph story at
`body` in plum at 75% measured to 46ch. Below it the add-to-bag block, then two
hairline-ruled blocks — the three-up service row and the specification list —
and the illustration disclosure chip last.

### Admin Buttons (admin-only)
- **Shape:** `{rounded.adm-control}` (0.5rem), inline-flex, 0.45rem gap,
  0.875rem type at weight 500, `0.625rem 1rem` padding.
- **Primary:** Plum ground, cream type. Hover deepens to plum-deep; `:active`
  is plum-deep plus a 1px press.
- **Secondary:** White ground, plum type, 1px `{colors.adm-line}` border. Hover
  darkens the border to 45% plum; `:active` fills with `{colors.adm-bg}` and
  presses 1px.
- **Danger:** Transparent with a 35% `{colors.alert}` border and alert type.
  Hover fills at 8% alert, `:active` at 14% plus the press. Used once — the
  disabled delete control on the product form.
- **Disabled:** `opacity: 0.5` and `cursor-not-allowed` on any variant. Every
  disabled control names what it needs in adjacent text, never in a tooltip.
- **States:** Every admin control ships default, hover, focus-visible, active
  and disabled; fields add hover, focus, disabled and error.

### Admin Fields (admin-only)
- **Style:** `.adm-field` — full-width, white, 1px `{colors.adm-line}`,
  `{rounded.adm-control}`, `0.625rem 0.75rem`, 0.875rem plum. Placeholders are
  plum at 70%, the floor for instructional copy on white.
- **Hover:** Border darkens to 40% plum.
- **Focus:** Border goes solid plum with a 3px 14% plum halo; the element's own
  outline is suppressed because the halo *is* the ring.
- **Error:** Driven by `aria-invalid="true"` — the border turns
  `{colors.alert}` and the focus halo turns 16% alert. The message sits below
  in alert type and is tied to the field with `aria-describedby`.
- **Disabled:** `{colors.adm-bg}` ground, plum at 45%, `cursor-not-allowed`.

### Admin Cards (admin-only)
- **Corner Style:** `{rounded.adm-card}` (0.75rem).
- **Background:** `{colors.adm-surface}` (white).
- **Border:** 1px `{colors.adm-line}` — the definition of the card. See The
  Flat Tool Rule.
- **Shadow Strategy:** None, at rest or on hover.
- **Internal Padding:** 1rem for a stacked list card, 1.25rem for a metric tile
  or panel, 1.25–1.5rem for a form section, 2–2.5rem for an empty state.
  Table-bearing cards take `overflow-hidden` and zero padding; the rows carry
  their own `px-5 py-3`.

### Status Pills (admin-only, signature)
- **Style:** 999px, `0.25rem 0.625rem`, 0.75rem at weight 500, always
  word-bearing. One vocabulary, defined once in `components/admin/status.tsx`
  and used on every screen.
- **Order statuses:** New is solid plum on cream type (the one that needs
  action reads heaviest); Packing is 25% orange with plum type; Shipped is 12%
  ok with ok type; Delivered is `{colors.adm-bg}` with plum at 70% — a settled
  order goes quiet; Cancelled is 10% alert with alert type.
- **Stock:** One pill carrying the number, a middot and the word — "0 · Out of
  stock" in alert, "3 · Low" in 25% orange, "14 · In stock" in ok.

### Admin Navigation (admin-only)
- **Style:** Rows in the plum shell, 0.875rem, cream at 70%, 0.5rem radius,
  18px icon at left. Hover raises to cream on an 8% cream wash.
- **Current:** 12% cream fill, full cream type, weight 500, plus
  `aria-current="page"`. Nested routes match by prefix; `/admin` matches
  exactly.
- **Counts, not dots:** A nav row shows an orange pill with a **number** —
  open orders, pieces needing restock — and shows nothing when the count is
  zero. A bare coloured dot reads as "needs attention" when the fill and
  `aria-current` already say "you are here"; if it is worth marking, it is
  worth counting.
- **Footer of the shell:** "View the shop" and "Sign out" sit at the bottom in
  the same quiet row style, separated from the sections by `mt-auto`.
- **Mobile:** Drawer over a scrim, with a labelled close button; every nav row
  closes it on click.

### Loading States (admin-only, signature)
- **Skeleton of the thing.** `components/admin/skeletons.tsx` provides
  `TableSkeleton` (rows at the real row height with a thumbnail block, two text
  bars and a trailing figure) and `TilesSkeleton` (the metric grid at its real
  shape), mounted by `loading.tsx` at all four list routes inside
  `LoadingShell`, which keeps the same `.adm-h1` as the loaded page and adds a
  `role="status"` "Loading…" line.
- **Never a spinner over content.** The shimmer is a 1.4s linear-gradient sweep
  over `{colors.adm-bg}`, `aria-hidden`, and disabled entirely under
  `prefers-reduced-motion: reduce`.

### Stock Stepper (admin-only)
- **Style:** A 0.5rem-radius enclosure, 1px `{colors.adm-line}` on white,
  holding `−`, a `tabular-nums` count with `aria-live="polite"` and `+`. Arms
  hover to orange, both carry a per-piece `aria-label`.
- **Steppers never destroy.** `−` is disabled at 0 and drops to 30% plum with
  `cursor-not-allowed` — the same rule the bag's stepper follows at its own
  floor of 1. Neither stepper is a delete control.
- **Dirty state:** A "Reset" text control appears beside the stepper only once
  the value differs from the stored one, so the screen never implies a save.

### Queue Controls (admin-only)
- **Filter row:** The status filters are the admin's primary and secondary
  buttons at `px-3 py-1.5`, each carrying its own computed count, with
  `aria-pressed` and a `role="group"` label.
- **URL is the state.** Status and search sync to the query string through a
  250ms debounced `router.replace(..., { scroll: false })` and initialise from
  `useSearchParams` inside `Suspense`, so a shop owner's view survives a
  refresh, a back, and a second tab. A live result count sits above the results
  in an `aria-live="polite"` line.
- **Empty state:** `EmptyState` teaches the screen instead of announcing
  absence — it names what was searched and what an order number looks like
  ("Order numbers look like KLK-1042").

### The Honesty Apparatus (signature, both surfaces)
Nothing anywhere in this app writes anything, and the app says so exactly as
many times as it needs to and no more. This is a system, not decoration, and a
reviewer ruled it legible rather than noisy: do not thin it, do not multiply
it, do not drop it.

- **One chip in the admin top bar** — dashed 999px, `.adm-label`, plum at 70%:
  "Interface only · not connected". It is the panel-wide statement.
- **One dashed line per surface**, naming that surface's limit at the point of
  use: "Adjustments are local to this screen until Supabase is connected".
- **Every write-capable control is `disabled` and names what it needs** —
  "Saving needs Supabase", "Actions need Supabase", "Payments not yet
  connected". A disabled control is never the heaviest element in its block.
- **Sign-in is honest end to end:** it validates properly (`aria-invalid`,
  described errors), shows a real "Signing in…" busy state, then returns an
  error naming the missing backend ("Authentication is not connected yet.
  Supabase Auth goes here.") in a `role="alert"` panel, and carries a dashed
  panel stating that the screen protects nothing yet with a plain link onward.
- **The dashed hairline is the device** on both surfaces; the shop's solid
  orange proof stamp is the same device restated for a plum ground.

### The Settle (signature motion)
The app has exactly one authored animation. On homepage load the two hero
product planes fade up 18px into register over 900ms on
`cubic-bezier(0.2, 0.8, 0.2, 1)`, staggered 120ms, each preserving its own
`--tilt` through the keyframes. Under `prefers-reduced-motion: reduce` the
animation is removed, every transition collapses to 1ms, and both hover
transforms are cancelled. Restrained motion was an explicit user choice. No
interior route adds one.

## Do's and Don'ts

### Do:
- **Do** take every new colour from the mark: plum `{colors.plum}`, cream
  `{colors.cream}`, orange `{colors.orange}`, or a warm neutral derived from
  them.
- **Do** express depth as elevation — pick one of Lift / Raised / Float and set
  the element's height and scale.
- **Do** compute anything that summarises the shop from `lib/catalog.ts`, never
  write it in prose. The piece count, `priceFloor`, `priceCeiling`, per-counter
  ranges and the material vocabulary (`materialRange` + `sentenceList`) are all
  derived, and the vocabulary is filtered against `PIECES` so an unstocked
  material cannot reach the page.
- **Do** read a price from the catalogue at render. The bag stores quantities
  keyed by slug and nothing else, under `klik.bag.v1`; a stored price is a
  price that can disagree with the shop.
- **Do** gate any persisted client state behind a `ready` flag so the server
  and first client render are identical, and drop unknown slugs on load. The
  header count renders 0 until the bag has been read.
- **Do** put a result set in the URL. Search syncs `q` through a debounced
  `router.replace`, initialises from `useSearchParams` and is wrapped in
  `Suspense`, so a result set is linkable and survives back and refresh.
- **Do** import `needsTerminal` from `components/end-card` for any new 4-up
  grid rather than re-deriving the threshold.
- **Do** use `/klik-lockup.png` on light grounds and `/klik-mark.png` on plum
  and plum-deep.
- **Do** keep footer and below-the-fold imagery `loading="eager"`. The lazy
  path left the mark unpainted in captures; this is deliberate, not an
  oversight to tidy away.
- **Do** name the provisional honestly with a status chip that describes the
  artefact, and keep its voice pointed at the reader of the proof, never at the
  shop's owner.
- **Do** add any new class of placeholder content to the disclosure line in the
  footer and on the listing chip. It currently names names, prices, materials,
  descriptions and illustrations.
- **Do** give a new illustration a `scale` that matches its real-world size and
  keep it on the shared palette.
- **Do** state what does not exist yet — "Terms not yet published", "Not yet
  measured" — as a row, rather than omitting the row and implying the answer is
  elsewhere.
- **Do** describe a piece by what it is, what it is made of and how that
  material behaves in use.
- **Do** keep the two registers apart on purpose: serif, clamped and lifted on
  the shop; sans, fixed-rem and flat in the admin. Read the scope tag on a rule
  before applying it to the other surface.
- **Do** compute every admin figure too — order totals, item counts, stock
  value, open-order value, restock counts — from `lib/catalog.ts` and
  `lib/admin-data.ts`. No number anywhere in this app is typed into markup.
- **Do** give every new admin control its full set of states: default, hover,
  `:focus-visible`, `:active` (the 1px press), disabled, and error where a
  field can be wrong.
- **Do** ship an admin table in both forms — a `lg:` table and a stacked card
  list below it — carrying the same fields and the same actions.
- **Do** make a status pill carry its word, and its number where it has one.
- **Do** put a queue's filter and search in the URL through a debounced
  `router.replace`, initialised from `useSearchParams` inside `Suspense`.
- **Do** show a skeleton shaped like the content it replaces, from
  `components/admin/skeletons.tsx`, mounted by the route's `loading.tsx`.
- **Do** read persisted client state through a module-level store and
  `useSyncExternalStore`, with an empty server snapshot and a real client one
  (`lib/bag.tsx`). Hydrating storage inside an effect cascades a second render
  and trips `react-hooks/set-state-in-effect`.
- **Do** state the limit at the point of use, once, and name the backend that
  would remove it.

### Don't:
- **Don't** introduce a fourth hue for any reason, including status, error and
  success states. Use ink weight, the accent, or the plum/cream inversion.
- **Don't** set small text in orange on a light ground.
- **Don't** use `/klik-logo.png`, the boxed plum plate. A logo on a plate over
  a light ground is the exact effect the palette rebuild was done to remove.
- **Don't** use opacity to push something back in space. Depth is size and
  height.
- **Don't** author a fourth shadow, a hard offset shadow, or a flat halo. This
  world is lit, not printed.
- **Don't** add a display size between the three steps, and don't reintroduce
  arbitrary `text-[…]` values.
- **Don't** set `.label` as a kicker or eyebrow above a heading.
- **Don't** write where a piece was made, who made it, or where its material
  came from. Descriptions describe the object and its material only; sourcing
  and provenance are undecided in PRODUCT.md, and claims of that class were
  removed twice in review — including two that predated the storefront batch.
- **Don't** let a quantity control destroy a line. `−` is disabled at 1;
  removal is an explicit, separately named control.
- **Don't** ship an enabled control for a capability that does not exist. Ship
  it disabled with a `.label` note naming the reason, and never make it the
  heaviest element in its block.
- **Don't** hover-lift a card the visitor works inside. The lift means "this
  goes somewhere".
- **Don't** double the inset when nesting a frame inside a frame.
- **Don't** drop a terminal card after a single trailing gap, and don't leave
  two or more empty cells in a filled plane.
- **Don't** flatten a section to a plain white ground with an outline standing
  in for structure — that is the rejected DTC-canon world ("no depth… very
  template like").
- **Don't** reach for the rejected Label Press vocabulary PRODUCT.md names
  (matchbox-litho registration marks, printed plates, halftone). That world was
  declined as too idiosyncratic for a new brand.
- **Don't** add a second authored animation. `.settle` is the only one;
  everything else is a state transition under 500ms.
- **Don't** colour-code an illustration per product, and don't put orange in a
  drawing that is not on fire.
- **Don't** give the admin the storefront's shadow scale, serif display steps,
  fluid clamps, warm paper ground or haze. The flat, white, fixed-rem register
  is the decision, not an unfinished edge.
- **Don't** carry `{colors.ok}` or `{colors.alert}` onto a storefront route, and
  don't add a third semantic hue to the admin. Two, scoped, is the whole
  allowance.
- **Don't** colour a metric number, tint a KPI card, or let colour into the
  admin anywhere but a pill, a count badge and the primary action.
- **Don't** set a `border-radius` inside the `:focus-visible` rule; the outline
  follows the element's own corner.
- **Don't** wrap an admin table in `overflow-x-auto`. Restructure it into cards
  below `lg` instead — a scrolled table hides its action column.
- **Don't** put a bare status dot on a nav row. Show a count, or show nothing.
- **Don't** let a stepper destroy a line, in the bag or in inventory: `−` is
  disabled at its floor and removal is a separately named control.
- **Don't** ship an enabled control in the admin. Every write is disabled and
  says what it needs; an enabled button that silently does nothing is the one
  dishonest thing this build refuses.
- **Don't** thin, multiply or drop the honesty apparatus. One panel-wide chip,
  one line per surface, one named reason per disabled control.

## Open items

Recorded as unresolved, not as system rules:

- **Positioning is undecided** in PRODUCT.md, so the homepage brand band ships
  behind a proof stamp with its copy explicitly unwritten. Its typographic
  treatment is settled; its content is not.
- **The whole catalogue is placeholder** per PLACEHOLDERS.md — names, prices,
  materials, descriptions and illustrations.
- **There is no product photography.** The flat illustrations are stand-ins,
  and PLACEHOLDERS.md records photography as the highest-value addition. When
  photography lands, the illustration rules above govern only what remains
  illustrated.
- **No dimensions exist.** The product page ships a "Dimensions — Not yet
  measured" row rather than omitting it. That is the honest treatment, not a
  finished spec table.
- **No price filter.** The listing filters by counter only; a price filter was
  deliberately deferred, not forgotten.
- **Delivery, returns and payments are unwritten**, and the app says so in the
  footer, the service row, the product page and the bag summary rather than
  implying otherwise.
- **`/account`, the policy pages and the journal are unbuilt** and land on the
  catch-all, which names what *is* built rather than apologising vaguely.
- **The catch-all's heading is outside the three display steps.** It sets the
  display family at `text-4xl sm:text-5xl` instead of `.display-1`. This is a
  standing exception to fix, not a fourth step and not a licence.
- **The listing disclosure chip omits "illustrations"** while the footer line
  includes it. The footer line is the canonical wording; the chip should be
  reconciled to it.
- **Verification status.** The finish reviewer scored eight material fixes on
  these routes: six resolved, one partial (the product page's object scale),
  and two regressions (a search-grid widow; undisclosed descriptions plus a
  making claim). All three were subsequently fixed, but the reviewer's session
  expired before it could score that batch — those three are self-verified
  only, not reviewer-confirmed. The detector reports zero findings across all
  17 source files.- **Verification status.** On the storefront batch the finish reviewer scored
  eight material fixes: six resolved, one partial (the product page's object
  scale), and two regressions (a search-grid widow; undisclosed descriptions
  plus a making claim). All three were subsequently fixed, but the reviewer's
  session expired before it could score that batch — those three are
  self-verified only. On the admin batch a finish reviewer explicitly ruled the
  two scoped semantic hues correct and the honesty apparatus legible rather
  than noise. The detector reports zero findings across all 46 source files;
  ESLint and the production build are clean.
- **One-off admin values not canonized.** The out-of-stock row tint
  (`bg-alert/4` in the inventory table) sits on no scale and is used once; it
  is a row shading, not a system token, and the row's stock pill is what
  actually carries the state. Do not build a tint ladder from it.
- **The admin has no auth, no persistence and no real orders.** Supabase is the
  named backend for all three, and every screen says so. Nothing in the admin
  writes anywhere; `/admin` is reachable without signing in.
- **`lib/admin-data.ts` is demonstration data** — nine mock orders and a stock
  table — and is headed as such in the file. Its totals are computed from the
  real catalogue so shapes are honest even though the rows are not. Replace the
  whole file when Supabase lands.
- **`/admin/sign-in` authenticates no one.** It validates, shows a busy state,
  and returns an honest error naming Supabase Auth.
- **Divergence from the direction contract.** The contract's OWN-WORLD block
  names a `#fdf5ea` ground and `#fffaf2` planes. The build ships `#fbf1e2` and
  `#fffdf8`, which are warmer. The built values are canonical here.
