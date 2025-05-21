/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*'
            }
        ]
    },
    devIndicators: {
        position: 'bottom-left'
    }
};

export default nextConfig;
