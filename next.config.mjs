/** @type {import('next').NextConfig} */
const nextConfig = {
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
