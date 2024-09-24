/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [

            {
                source: '/',
                destination: '/sesion',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;