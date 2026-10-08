"use server";

import { redirect } from "next/navigation";
import { refresh } from "next/cache";
import { createClient } from "@/lib/supabase/server";

/* Sign in, join, sign out. Deliberately small: Klik does not require an account
   to browse or to buy, so these screens are an offer, never a gate. The only
   place an account is genuinely required is the admin. */

export type AuthState = { error?: string; notice?: string };

/** Only ever send people to a path inside this app. A `next` value arrives from
 *  the query string, which anyone can write. */
function safeNext(value: FormDataEntryValue | null, fallback: string) {
  const next = typeof value === "string" ? value : "";
  return next.startsWith("/") && !next.startsWith("//") ? next : fallback;
}

const readCredentials = (formData: FormData) => ({
  email: String(formData.get("email") ?? "").trim().toLowerCase(),
  password: String(formData.get("password") ?? ""),
});

export async function signIn(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const { email, password } = readCredentials(formData);
  const next = safeNext(formData.get("next"), "/account");

  if (!email || !password) {
    return { error: "Enter your email address and password." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    /* Deliberately does not distinguish "no such account" from "wrong
       password": that difference tells a stranger who shops here. */
    return { error: "That email address and password do not match an account." };
  }

  redirect(next);
}

export async function signUp(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const { email, password } = readCredentials(formData);
  const fullName = String(formData.get("full_name") ?? "").trim();
  const next = safeNext(formData.get("next"), "/account");

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { error: "That email address does not look right." };
  }
  if (password.length < 8) {
    return { error: "Use a password of at least 8 characters." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    // read by the database trigger that creates the profile row
    options: { data: { full_name: fullName } },
  });

  if (error) {
    return { error: error.message };
  }

  /* With email confirmation switched on there is no session yet, so there is
     nowhere to send them — say so rather than bouncing them to a page that
     will just redirect back here. */
  if (!data.session) {
    return {
      notice: `Check ${email} for a link to confirm the address, then sign in.`,
    };
  }

  redirect(next);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  refresh();
  redirect("/");
}

export async function updateProfile(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  const userId = claims?.claims?.sub;
  if (!userId) return { error: "You are signed out. Sign in and try again." };

  const fullName = String(formData.get("full_name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();

  /* role is absent on purpose, and the database would refuse it anyway:
     authenticated only holds an UPDATE grant on these two columns. */
  const { error } = await supabase
    .from("profiles")
    .update({ full_name: fullName || null, phone: phone || null })
    .eq("id", userId);

  if (error) return { error: `Could not save that: ${error.message}` };

  refresh();
  return { notice: "Saved." };
}
