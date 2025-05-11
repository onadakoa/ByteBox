import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        unoptimized: true
    },
    output: "standalone",
    basePath: process.env.BASE_PATH || undefined,
    async rewrites() {
        return ([{
            source: "/api/:path*",
            destination: "http://localhost:8080/:path*"
        }]);
    }
};

export default nextConfig;
