# What has to be replaced before this shop is real

Everything below is authored stand-in material. It exists so the storefront
could be designed, built and reviewed at full fidelity. None of it is a
commercial claim, and none of it should reach a customer as-is.

## Must be replaced

| What | Where | Note |
| --- | --- | --- |
| All 14 product names | `products` table (Admin → Products) | Invented. |
| All 14 prices | `products` table (Admin → Products) | Invented. Range chosen to match the "accessible / everyday" register you confirmed (₹490–₹2,740). |
| All 14 product notes | `products` table (Admin → Products) | Invented copy. |
| All 14 product descriptions | `products.story` (Admin → Products) | Two paragraphs per piece, written to describe the object and how its material behaves — deliberately free of sourcing, making or provenance claims, because PRODUCT.md holds those undecided. Replace with your own words; if you add anything about how a piece is made or where it comes from, that is a new claim and needs to be true. |
| All 14 materials | `products` table (Admin → Products) | Invented. These now print on every label as the buyer's evidence, so wrong values are more visible than most — fix them early. Not sourcing claims; do not ship them as such. |
| Product illustrations | `components/goods.tsx` | Flat two-tone drawings standing in for product photography, which does not exist. **This is the biggest gap.** A DTC storefront of this kind is carried by photography; illustrations read as placeholder to anyone shopping. Shoot the real pieces and replace these. |
| ~~The brand band~~ | `app/(shop)/page.tsx` | **Resolved.** You confirmed the positioning — *everyday, not occasion* — and the band now carries it: "Made to be used, not saved." The "Proof · copy not approved" stamp is gone and PRODUCT.md records the decision. This is written copy, not placeholder; edit it as your own words rather than replacing it as a stand-in. |
| Service row | `app/page.tsx` | Delivery / Returns / Secure checkout read "not yet published" and "not yet connected". Every storefront in this category promises free shipping and easy returns here — I could not, because you have not set those terms. Fill them in and this row starts doing real work. |
| Announcement bar | `app/page.tsx` | Currently states a true fact about the catalogue. Most shops run a promotion here instead. |
| ~~Newsletter form~~ | — | **Removed** for v1. Add it back when there is an email provider to post to. |
| The price ceiling in the hero | `app/(shop)/page.tsx` | Computed from the catalogue (`priceCeiling`), so it follows real prices in automatically. Nothing to replace. |
| ~~Footer links~~ | `components/site-footer.tsx` | **Resolved.** The Help and Klik columns linked pages that did not exist and were cut; only the Shop column remains. Add links back as their pages are written. |
| ~~Search / account routes~~ | — | **Resolved.** Both are built: `/search` filters the live catalogue, and `/account` holds a real order history behind sign-in. |

## The proof stamp — removed

The footer used to carry a stamp reading *"Proof — placeholder catalogue"* with
a line naming what was stand-in. The instruction here was to remove it only in
the commit that landed the real catalogue.

**It was removed before that, by the owner's decision**, while the catalogue is
still invented. So: nothing on the storefront now tells a visitor that the
names, prices, materials and descriptions are placeholder content. This file is
the only remaining record.

What still discloses, and should stay until it is no longer true:

- the service rows on the home and product pages — "Terms not yet published",
  "Payments not yet connected"
- the checkout and bag notes — "No card taken — payment arranged after"
- the admin shell badge — "Live data · payments not connected"
- the product page's "Drawing, not a photograph" note, which now appears only
  on pieces that have not been photographed yet

Those describe things that genuinely do not exist yet, which is a different
claim from "this product is not real". If the shop is put in front of customers
before the catalogue is replaced, that gap is the thing to think about.

## Where the catalogue lives now

The placeholder catalogue has moved out of `lib/catalog.ts` and into Supabase.
Replacing it is no longer an edit to a source file — it is ordinary work in
**Admin → Products**, and the shop follows immediately. `lib/catalog.ts` now
holds only the shape of a piece and the copy derived from whatever is stocked,
so counts and price ranges in prose cannot go stale.

## Not built yet

Payment. Checkout writes a real order and reserves stock but takes no card, and
every surface that touches it says so. Delivery and returns terms are still
undecided, so shipping is stored as 0 and shown as "not yet published" — do not
let it render as free shipping.

Delivery, returns, contact, about, journal and stockists pages. Their footer
links were cut; unknown addresses now get a real 404 from
`app/(shop)/not-found.tsx`.

## Still open in PRODUCT.md

Positioning, catalogue size and category structure, shipping and returns,
product variants (ring sizes, chain lengths, finishes), the commerce backend,
and the deploy target.

## Authored assets you now own

Two things were produced during the build and are yours to keep or replace:

- `public/klik-mark.png` — your logo with its plum background knocked out by a
  proper alpha matte and cropped to the ink. The current design uses the
  original `public/klik-logo.png` (plum tile) everywhere, since the page is
  white and the tile reads as a mark; the knocked-out version is there if you
  ever put the logo on a dark ground.
- The icon set in `components/icons.tsx` — search, bag, account, arrow, and the
  three service icons, all drawn on one 24px grid at one stroke weight.

## A note on the design change

A distinctive visual world ("Label Press" — Indian matchbox litho) was built
first and then replaced at your request with the category standard, using
modern DTC storefronts as the craft bar. That preference is recorded in
PRODUCT.md as a standing brand commitment, so future surfaces follow the
conventional path without re-litigating it.

The practical consequence: a conventional storefront leans on product
photography far harder than a distinctive one does. The Label Press design
could carry illustrated goods because illustration was native to it. This one
cannot — the flat drawings are visibly stand-ins. **Photography is now the
highest-value thing you can add.**
