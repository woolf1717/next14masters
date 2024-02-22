import { createRequire } from "module";
const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  experimental: { typedRoutes: true, mdxRs: true },
  images: {
    domains: ["static-ourstore.hyperfunctor.com"],
  },
  redirects: async () => {
    return [
      {
        source: "/categories/t-shirts",
        destination: "/categories/t-shirts/1",
        permanent: false,
      },
      {
        source: "/categories/hoodies",
        destination: "/categories/hoodies/1",
        permanent: false,
      },
      {
        source: "/categories/accessories",
        destination: "/categories/accessories/1",
        permanent: false,
      },
    ];
  },
};

const withMDX = require("@next/mdx")();
export default withMDX(nextConfig);
