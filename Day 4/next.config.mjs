/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.sanity.io']
    },
    reactStrictMode: true,
    experimental: {
        serverActions: true, // Enable server actions (optional)
    },
};

export default nextConfig;