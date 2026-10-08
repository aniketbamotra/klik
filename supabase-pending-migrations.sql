-- PENDING — could not be applied: the Supabase project host stopped resolving
-- mid-session. Apply both, in order, once it is reachable.

-- ============================================================
-- migration: klik_restock_on_cancel
-- ============================================================

-- Cancelling an order returns its stock to the shelf.
--
-- This belongs in the database for the same reason place_order does: the
-- decrement happens inside a locked transaction, and the reverse should be
-- just as impossible to forget. An admin action that remembered to restock
-- would be one that could also be written not to.
--
-- The trigger's WHEN clause is the safety: it only fires on the transition
-- *into* cancelled, so re-cancelling an already-cancelled order cannot credit
-- the same units twice.

create function private.restock_cancelled_order()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.products p
  set stock = p.stock + i.qty
  from public.order_items i
  where i.order_id = new.id
    -- a line whose product was hard-deleted has nothing to credit back
    and i.product_id is not null
    and p.id = i.product_id;

  return new;
end;
$$;

create trigger orders_restock_on_cancel
  after update on public.orders
  for each row
  when (old.status is distinct from 'cancelled' and new.status = 'cancelled')
  execute function private.restock_cancelled_order();

-- Only the trigger calls this. Nothing should be able to invoke it directly.
revoke execute on function private.restock_cancelled_order() from public, anon, authenticated;


-- ============================================================
-- migration: klik_product_dimensions
-- ============================================================

-- How big the thing is, in the owner's own words.
--
-- Free text rather than height/width/depth columns: a chain, a pair of bangles
-- and a mirror do not share three axes, and structured numbers would invent a
-- precision the shop does not have. Blank means unmeasured, and the product
-- page drops the row entirely rather than advertising the gap.
alter table public.products
  add column dimensions text not null default '';

comment on column public.products.dimensions is
  'Free-text size, e.g. "8 cm across, 2 cm deep". Blank means unmeasured.';
