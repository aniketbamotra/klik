"use client";

import Link from "next/link";
import { useActionState } from "react";
import { ArrowRight } from "@/components/icons";
import { signIn, signUp, type AuthState } from "@/lib/auth/actions";

/* One form, two modes. Klik's account is optional, so both screens lead with
   what an account is *for* and keep a way back to shopping without one — the
   sign-in page is an offer, not a toll gate. */

const EMPTY: AuthState = {};

export function AuthForm({ mode, next }: { mode: "sign-in" | "join"; next: string }) {
  const joining = mode === "join";
  const [state, action, pending] = useActionState(joining ? signUp : signIn, EMPTY);

  return (
    <form action={action} className="card p-6 sm:p-8">
      <input type="hidden" name="next" value={next} />

      <div className="space-y-5">
        {joining && (
          <div>
            <label htmlFor="full_name" className="field-label">
              Name
            </label>
            <input
              id="full_name"
              name="full_name"
              autoComplete="name"
              className="field mt-2"
              placeholder="Ananya Rao"
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="field-label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="field mt-2"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="field-label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={joining ? 8 : undefined}
            autoComplete={joining ? "new-password" : "current-password"}
            className="field mt-2"
            placeholder="••••••••"
          />
          {joining && (
            <p className="mt-2 text-sm text-plum/75">At least 8 characters.</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="btn btn-primary mt-7 w-full px-7 py-4 text-sm disabled:cursor-wait disabled:opacity-70"
      >
        {pending
          ? joining
            ? "Creating your account…"
            : "Signing in…"
          : joining
            ? "Create account"
            : "Sign in"}
        {!pending && <ArrowRight className="h-4 w-4" />}
      </button>

      {state.error && (
        <p
          role="alert"
          className="mt-4 rounded-control bg-alert/8 px-3.5 py-2.5 text-sm text-alert"
        >
          {state.error}
        </p>
      )}

      {state.notice && (
        <p
          role="status"
          className="mt-4 rounded-control bg-ok/8 px-3.5 py-2.5 text-sm text-ok"
        >
          {state.notice}
        </p>
      )}

      <p className="mt-6 border-t border-line pt-5 text-sm text-plum/75">
        {joining ? (
          <>
            Already have an account?{" "}
            <Link
              href={`/sign-in?next=${encodeURIComponent(next)}`}
              className="underline underline-offset-4 hover:text-orange"
            >
              Sign in
            </Link>
            .
          </>
        ) : (
          <>
            No account?{" "}
            <Link
              href={`/join?next=${encodeURIComponent(next)}`}
              className="underline underline-offset-4 hover:text-orange"
            >
              Create one
            </Link>
            , or keep shopping as a guest.
          </>
        )}
      </p>
    </form>
  );
}
