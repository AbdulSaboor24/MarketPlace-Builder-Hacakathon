/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.sanity.io']
    },
    experimental: {
        appDir: true,
      },
      reactStrictMode: true,
      output: "standalone",
};

export default nextConfig;