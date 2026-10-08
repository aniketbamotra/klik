import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in — Klik admin",
  robots: { index: false, follow: false },
};

/* This lives in its own route group so it sits OUTSIDE app/admin/layout.tsx.
   A nested layout would have rendered inside the authenticated shell — there
   is no navigation, and no Sign out, to offer someone who is not in yet. */
export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
