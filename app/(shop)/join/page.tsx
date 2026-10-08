import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "Create an account · Klik",
  description: "Keep your orders in one place. Shopping works without one.",
};

export default async function JoinPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const target = next?.startsWith("/") && !next.startsWith("//") ? next : "/account";

  return (
    <section className="relative overflow-hidden">
      <span
        className="haze -right-40 -top-24 h-[28rem] w-[28rem] bg-haze opacity-45"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[30rem] px-4 py-12 sm:px-6 md:py-20">
        <h1 className="display-1">Create an account.</h1>
        <p className="mt-5 text-base leading-relaxed text-plum/75">
          It keeps your orders and your address in one place. That is all it does
          — the shop is open either way.
        </p>

        <div className="mt-8">
          <AuthForm mode="join" next={target} />
        </div>
      </div>
    </section>
  );
}
