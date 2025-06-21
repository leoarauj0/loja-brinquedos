/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "api.ts", "api.tsx", ".tsx"],

  basePath: "/loja-brinquedos",
  reactStrictMode: false,

  images: {
    domains: [],
  },

  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
