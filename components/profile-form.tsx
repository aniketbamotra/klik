"use client";

import { useActionState } from "react";
import { signOut, updateProfile, type AuthState } from "@/lib/auth/actions";

const EMPTY: AuthState = {};

/* Name and phone are the only two things a shopper can change about themselves.
   Their role is not on this form and not in the update grant either — the
   database would refuse it even if this form asked. */
export function ProfileForm({ name, phone }: { name: string; phone: string }) {
  const [state, action, pending] = useActionState(updateProfile, EMPTY);

  return (
    <div className="card p-6 sm:p-7">
      <h2 className="display-3">Your details</h2>
      <p className="mt-2 text-sm text-plum/75">
        Used to fill in checkout. Change them whenever.
      </p>

      <form action={action} className="mt-6 space-y-5">
        <div>
          <label htmlFor="profile-name" className="field-label">
            Name
          </label>
          <input
            id="profile-name"
            name="full_name"
            defaultValue={name}
            autoComplete="name"
            className="field mt-2"
            placeholder="Ananya Rao"
          />
        </div>

        <div>
          <label htmlFor="profile-phone" className="field-label">
            Phone
          </label>
          <input
            id="profile-phone"
            name="phone"
            type="tel"
            defaultValue={phone}
            autoComplete="tel"
            className="field mt-2"
            placeholder="Optional"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="btn btn-quiet w-full px-6 py-3.5 text-sm disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? "Saving…" : "Save"}
        </button>

        {state.error && (
          <p role="alert" className="text-sm text-alert">
            {state.error}
          </p>
        )}
        {state.notice && (
          <p role="status" className="text-sm text-ok">
            {state.notice}
          </p>
        )}
      </form>

      <form action={signOut} className="mt-6 border-t border-line pt-5">
        <button
          type="submit"
          className="text-sm text-plum/75 underline underline-offset-4 hover:text-orange"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
