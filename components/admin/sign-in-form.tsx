"use client";

import { useActionState, useState } from "react";
import { signIn, type AuthState } from "@/lib/auth/actions";

const EMPTY: AuthState = {};

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/* The same password sign-in the storefront uses — there is one account system,
   and being an admin is a property of the account rather than a separate door.
   Where the two differ is afterwards: the admin layout checks the role. */
export function AdminSignInForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(signIn, EMPTY);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);

  const emailBad = touched && !EMAIL.test(email);
  const pwBad = touched && password.length < 8;

  return (
    <form
      action={action}
      noValidate
      onSubmit={(e) => {
        setTouched(true);
        if (!EMAIL.test(email) || password.length < 8) e.preventDefault();
      }}
      className="adm-card mt-6 space-y-4 p-5 sm:p-6"
    >
      <input type="hidden" name="next" value={next} />

      <div>
        <label htmlFor="email" className="adm-body block font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={emailBad || undefined}
          aria-describedby={emailBad ? "email-err" : undefined}
          className="adm-field mt-2"
          placeholder="you@example.com"
        />
        {emailBad && (
          <p id="email-err" className="adm-body mt-1.5 text-alert">
            Enter a valid email address.
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="adm-body block font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={pwBad || undefined}
          aria-describedby={pwBad ? "pw-err" : undefined}
          className="adm-field mt-2"
          placeholder="••••••••"
        />
        {/* the message names the correction, not the rule */}
        {pwBad && (
          <p id="pw-err" className="adm-body mt-1.5 text-alert">
            Use at least 8 characters.
          </p>
        )}
      </div>

      <button type="submit" disabled={pending} className="adm-btn adm-btn-primary w-full">
        {pending ? "Signing in…" : "Sign in"}
      </button>

      {state.error && (
        <p role="alert" className="adm-body rounded-lg bg-alert/8 px-3.5 py-2.5 text-alert">
          {state.error}
        </p>
      )}
    </form>
  );
}
