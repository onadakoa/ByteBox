import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        unoptimized: true
    },
    output: "export",
    basePath: process.env.BASE_PATH || undefined,
};

export default nextConfig;
