# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js + Tailwind CSS. Chosen by the user from a recommended set. Rationale recorded for later work: image-heavy product photography benefits from Next.js image handling, product and collection pages need real SEO, and the framework leaves an open path to a commerce backend (Shopify, Stripe, or similar) without a rewrite. No deploy target has been named yet.

## Users

Primary user: a buyer evaluating a purchase. They arrive without an existing relationship to Klik, browse to see whether anything appeals, and decide whether to trust the shop and buy. The job is evaluation and decision, not repeat task completion — sessions are exploratory, driven by the pieces themselves, and end in either a purchase intent or a bounce.

**Second confirmed audience: the shop owner**, working in an admin panel. Their job is operational rather than evaluative — add and edit products, upload photographs, adjust stock, and work the order queue. They are in a task, not a decision, so that surface is Operate where the storefront is Persuade.

No further audience (wholesale, press, retail partners) has been confirmed.

## Product Purpose

Klik is an e-commerce store selling jewelry alongside interior decorating and decorative items for the home. It exists to let buyers discover and purchase those pieces online. Success is a visitor who understands what Klik sells, believes it is worth buying, and completes a purchase.

The shop is also run by someone. A **shop admin** surface exists for the owner: products and images, inventory, and orders. Its success is different — the owner finishes a task quickly and trusts what the screen tells them.

## Positioning

**Confirmed: everyday, not occasion.** Chosen by the user from three labelled options (the alternatives were a curation claim — "one person chose all of it" — and an edit claim — "small catalogue, on purpose"). The differentiating mechanism is *use*: pieces are priced and selected to be worn on an ordinary morning and to sit somewhere in the house you actually walk past, rather than saved for an occasion or kept in the good cupboard. The accessible price band is an expression of this position, not a separate claim.

This is now the storefront's stated position. The homepage brand band carries it in full, replacing the earlier "Proof · copy not approved" placeholder, and the hero and header subordinate to it.

**Still not confirmed, and still not to be invented:** sourcing story, making method, provenance, materials origin, price tier relative to competitors, or any artisan, handmade, sustainable, luxury, or heritage claim. Positioning being settled does not unlock those.

## Operating Context

Buyers shop on the open web, arriving on desktop and mobile browsers. Because both categories are visual and tactile, the decision to buy is made almost entirely from imagery and description; the buyer cannot hold, wear, or place the object before purchase. Jewelry is bought at body scale (worn, sized, gifted); decor is bought at room scale (placed, matched to an existing interior). These are two genuinely different evaluation contexts sharing one store.

## Capabilities and Constraints

Confirmed scope: **storefront and admin, now against Supabase.** Storefront: home, shop, both counters, product detail, bag, search, checkout, order confirmation, sign in, join, account. Admin: overview, products (list, create, edit, withdraw), image upload, inventory, orders (list, detail, status), and a sign-in screen.

**Backend connected:** Supabase provides auth, the catalogue, orders and image storage. The catalogue moved out of `lib/catalog.ts` into the `products` table; the demonstration orders and stock table are gone. Admin writes are real.

**Three roles, by design.** A guest can browse and buy with no account — the storefront never gates. A customer signs in and their orders collect in one place. An admin is the owner, and admin is a property of the account (`profiles.role`), not a separate door. Roles are only changeable in SQL; there is no screen for it and the database grants forbid it.

The bag remains a browser-side object (localStorage), so it belongs to the browser rather than to a user and survives signing in. Prices in it are resolved from the live catalogue, and checkout re-prices everything server-side regardless.

**Payment is still not connected**, and is the one place the surfaces still disclose rather than deliver: checkout records an order and reserves stock, but takes no card. Because shipping terms are undecided, shipping is stored as 0 and shown as "not yet published" rather than as free.

Undecided and not to be fabricated:
- catalog size and category structure (how many products, how collections are organized)
- pricing, currency, shipping regions, and return policy
- whether jewelry needs variants (size, metal, length) and decor needs variants (size, finish, color)
- commerce backend for a later phase
- deploy target
- domain, contact details, and any legal/policy copy

## Brand Commitments

The name is **Klik**. One existing asset: `klik logo.png` at the project root — a custom lowercase rounded-geometric wordmark, cream letterforms on a deep plum field with a single orange dot forming the "i". This is the only confirmed piece of identity; it is a real asset to work from, not a full brand system. No confirmed voice, tagline, typeface license, or brand guidelines exist.

**The admin is a tool, not a shop window.** Asked how branded it should be, the user chose *"working tool, brand in details"* over matching the storefront: plum shell, orange for selection and state, one typeface at a fixed scale, near-white content ground for density. They also asked for a designed sign-in screen even though nothing can authenticate yet. Admin surfaces follow Operate rules — familiarity is a feature, and expression must never obscure the task.

**Conventional interface, as a standing preference.** The user has asked that Klik's design follow the category standard rather than a distinctive visual world: *"I want something traditional, something that the users are already used to navigating."* The reasoning is that Klik is a new brand, and an unfamiliar interface costs trust it has not earned yet. This is durable and applies to future surfaces, not only the homepage — do not propose a distinctive visual world for Klik again without the user raising it first.

The craft bar is **warm premium DTC — Glossier, Mejuri**, chosen by the user from four labelled mockups (the alternatives were Aesop/COS editorial, Jacquemus/Bottega fashion, and Muji/Scandinavian). Rounded shapes, generous whitespace, and **depth from real elevation** — planes at measurable heights, not flat outlines. The user asked specifically for "layered depth with restrained motion" after rejecting an earlier flat build as "too one dimensional… no depth in the website as in the Z index."

**The palette is the logo.** The user's correction: *"it doesn't look like the color of logos is getting used properly. The logo should be the part of the website — if I add logo directly onto the second version it will stand out a lot."* So the page palette is sampled directly from `klik logo.png` — plum `#3c2848` as ink, its cream `#ffe4c4` as paper and fills, its orange `#ffa444` as accent — and the product illustrations are drawn in the same three colours. Do not introduce a fourth hue. Two logo lockups exist: `klik-lockup.png` (plum letterforms, transparent, for light grounds) and `klik-mark.png` (cream letterforms, transparent, for dark grounds); `klik-logo.png` keeps the original plum plate and should not be used on the light page, because a boxed plate is exactly what the user objected to.

A distinctive "Label Press" world (Indian matchbox litho — plum sheet, cream labels, four spot inks, halftone illustration) was built first and deliberately replaced. It is anti-reference now: do not reintroduce its devices — butted keylines, reverse-printed labels, halftone tints, misregistration, perforated tabs, printer's furniture.

## Evidence on Hand

The logo file is the only real content that exists.

**There is no product photography, no product names, no prices, no descriptions, and no brand or story copy.** Every product, price, review, customer, and claim in the built storefront will therefore be placeholder content that the user replaces. Placeholders must be obviously placeholder and must not be presented as real: no invented testimonials, no fabricated press mentions, no made-up material or sourcing claims, no fake ratings or sold-out counts, no invented shipping or return terms.

## Product Principles

1. **The object sells itself.** Buyers cannot touch the piece, so imagery and product presentation carry the entire decision. Every layout choice is judged by whether it lets the product be seen better.
2. **One store, two evaluation contexts.** Jewelry is judged at body scale and decor at room scale. The store must serve both without feeling like two disconnected shops bolted together.
3. **Earn trust before asking for money.** A first-time visitor with no prior relationship to Klik needs reasons to believe the shop is real and the purchase is safe.
4. **Never fake what does not exist yet.** With no real catalog or copy, credibility comes from honest structure, not invented proof. Absent terms — delivery, returns, payment — are stated as absent wherever a shop would normally promise them, and that has not changed.

   **Amended by the user's decision:** the second half of this principle used to read "placeholders stay visibly provisional", enforced by a proof stamp in the footer. That stamp was removed while the catalogue was still invented, so placeholder *content* — names, prices, materials, descriptions — is no longer marked as provisional anywhere a customer can see. `PLACEHOLDERS.md` is now the only record of what is stand-in. Do not restore the stamp without asking; do not take its absence as licence to invent new claims either.
5. **Front-end now, commerce later.** Build the storefront so that a real backend can be attached without redesigning the experience.

## Accessibility & Inclusion

No product-specific requirement or standard has been established by the user. Baseline web accessibility applies as ordinary craft.
