/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "sukushocloud.mdusercontent.com",
                port: "",
                pathname: "/**/*",
            },
            {
                protocol: "https",
                hostname: "cdn.mdusercontent.com",
                port: "",
                pathname: "/**/*",
            },
        ],
    },
    redirects: async () => {
        return [
            {
                source: "/",
                destination: "https://sukusho.cloud/",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
