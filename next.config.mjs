/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            // Basic redirect
            {
                source: '/',
                destination: '/sesion',
                permanent: true,
            },

        ]
    },
};

export default nextConfig;