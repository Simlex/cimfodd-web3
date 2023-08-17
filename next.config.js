/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    env: {
        // NEXTAUTH_URL: 'http://localhost:3000',
        NEXTAUTH_URL: 'https://cimfodd.netlify.app',
        JWT_SECRET: 'SDVEWFQWEQWS',
        APP_NAME: 'Cimfodd',
    },
    images: {
        domains: ["res.cloudinary.com"]
    }
}

module.exports = nextConfig
