import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const nextConfig: NextConfig = {
  images: {
    /* Product photographs are served from the public Storage bucket.
       next/image refuses any remote host that is not listed here, so without
       this every uploaded photograph 400s. Scoped to the one bucket rather
       than the whole project, so nothing else on the domain is optimisable. */
    remotePatterns: supabaseUrl
      ? [new URL(`${supabaseUrl}/storage/v1/object/public/product-images/**`)]
      : [],
  },
};

export default nextConfig;
