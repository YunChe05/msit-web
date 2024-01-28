/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        APP_PUBLIC_API_URL: process.env.APP_PUBLIC_API_URL,
        APP_DEVELOPMENT_API_URL: process.env.APP_DEVELOPMENT_API_URL
      },
}

module.exports = nextConfig
