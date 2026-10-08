import Image from "next/image";
import Link from "next/link";
import { AdminSignInForm } from "@/components/admin/sign-in-form";

export default async function SignIn({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; denied?: string }>;
}) {
  const { next, denied } = await searchParams;
  const target =
    next?.startsWith("/admin") && !next.startsWith("//") ? next : "/admin";

  return (
    <div className="flex min-h-screen flex-col bg-adm-bg text-plum">
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <Link href="/" className="mb-8 block">
            <Image
              src="/klik-lockup.png"
              alt="Klik"
              width={435}
              height={266}
              priority
              className="h-8 w-auto"
            />
          </Link>

          <h1 className="adm-h1">Shop admin</h1>
          <p className="adm-body mt-1.5 text-plum/70">
            Sign in to manage products, inventory and orders.
          </p>

          {/* A signed-in customer who tried /admin lands here. Saying so beats
              a second sign-in prompt that would succeed and change nothing. */}
          {denied && (
            <p
              role="alert"
              className="adm-body mt-4 rounded-lg bg-alert/8 px-3.5 py-2.5 text-alert"
            >
              That account is not an admin of this shop. Sign in with the owner
              account, or go back to the shop.
            </p>
          )}

          <AdminSignInForm next={target} />

          <Link
            href="/"
            className="adm-body mt-5 block text-center text-plum/70 hover:text-plum"
          >
            Back to the shop
          </Link>
        </div>
      </div>
    </div>
  );
}
