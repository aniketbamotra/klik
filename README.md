# Klik

A small shop of everyday jewellery and decorative objects for the house, plus
the admin the owner runs it from.

Next.js 16 (App Router) and Tailwind v4 on the front, Supabase for auth,
database and image storage. See `PRODUCT.md` for what the product is and what is
still undecided, `DESIGN.md` for the design system, and `PLACEHOLDERS.md` for
what is stand-in content.

## Running it

```bash
npm install
cp .env.example .env.local   # fill in from Supabase → Project settings → API
npm run dev
```

`.env.local` needs two values, both safe in the browser:

| Variable | Where it comes from |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Project settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Project settings → API → publishable key |

There is deliberately no service-role key. Nothing in the app needs to bypass
row-level security, and adding one would create a way to.

### Behind a corporate proxy

On a network that intercepts TLS (Zscaler and similar), `next dev` fails every
Supabase call with `TypeError: fetch failed` — macOS `curl` trusts the
interception root through Keychain, but Node does not. Export the system roots
once and point Node at them:

```bash
security find-certificate -a -p /Library/Keychains/System.keychain > ~/.corp-roots.pem
export NODE_EXTRA_CA_CERTS=~/.corp-roots.pem
```

Put the `export` in your shell profile so `next dev` inherits it. The bundle is
machine-specific — do not commit it.

## Accounts

Three kinds of visitor, all deliberate:

- **Guest** — browses, fills a bag and checks out with no account at all. The
  storefront never requires signing in; only `/account` and `/admin` do. A guest
  leaves checkout with a tokenised link to their order.
- **Customer** — signs in at `/sign-in`, and their orders collect at `/account`.
- **Admin** — the shop owner. Same accounts table, same sign-in; being an admin
  is `profiles.role = 'admin'`, checked in the admin layout next to the data.

### Making the first admin

Roles are not editable from any screen: the `authenticated` role only holds an
`UPDATE` grant on `profiles(full_name, phone)`, so nobody can promote
themselves. Creating an admin is an operator action in SQL.

1. Create the account through `/join` in the app (or the Supabase dashboard →
   Authentication → Users → Add user, which lets you skip email confirmation).
2. Promote it:

```sql
update public.profiles
set role = 'admin'
where id = (select id from auth.users where email = 'you@example.com');
```

3. Sign in at `/admin/sign-in`.

> **Email confirmation is off for v1** (Authentication → Providers → Email →
> Confirm email). Sign-up returns a session and the shopper is signed straight
> in. If you turn it back on, configure a real SMTP provider first — Supabase's
> built-in one is rate limited to a handful of messages an hour.

## How the data is protected

- **RLS on every table.** Guests and customers can read only active products;
  customers read only their own orders; admins are allowed the rest by policy,
  not by a query remembering to filter.
- **Orders are never inserted by a client.** `place_order` is the only way in.
  It reads prices from the `products` table rather than from the cart, locks the
  rows it is selling `FOR UPDATE`, refuses to oversell, and decrements stock in
  the same transaction. A tampered cart cannot change a price.
- **Guest orders are reached by token**, not by order number, so knowing a
  number reveals nothing.
- **Table grants are narrowed past what the policies allow**, as a second line —
  most notably `profiles.role`, which no client role can write at all.

## Layout

```
app/(shop)      storefront: home, shop, counters, piece, search, bag,
                checkout, order confirmation, sign-in, join, account
app/admin       overview, products, inventory, orders — admin-gated
lib/supabase    browser / server / proxy clients and generated DB types
lib/data        the data access layer; every read lives here
lib/*/actions   server actions: auth, checkout, admin writes
proxy.ts        session refresh on every request (Next 16's middleware)
```

Regenerate `lib/supabase/database.types.ts` after any migration rather than
hand-editing it.

## Still not connected

Payment. Checkout records a real order and reserves stock, but takes no card —
every surface that touches this says so rather than implying otherwise.
Delivery charges and returns are undecided too (see `PRODUCT.md`), so shipping
is stored as 0 and shown as "not yet published".
