import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "Sign in · Klik",
  description: "Sign in to see your orders. You do not need an account to shop.",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const target = next?.startsWith("/") && !next.startsWith("//") ? next : "/account";

  return (
    <section className="relative overflow-hidden">
      <span
        className="haze -left-40 -top-24 h-[28rem] w-[28rem] bg-haze opacity-45"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[30rem] px-4 py-12 sm:px-6 md:py-20">
        <h1 className="display-1">Sign in.</h1>
        <p className="mt-5 text-base leading-relaxed text-plum/75">
          An account keeps your orders in one place. Buying does not need one —
          you can check out as a guest and still get a link to follow your order.
        </p>

        <div className="mt-8">
          <AuthForm mode="sign-in" next={target} />
        </div>
      </div>
    </section>
  );
}
