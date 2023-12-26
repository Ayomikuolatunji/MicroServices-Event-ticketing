/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (nextConfig) => {
        nextConfig.watchOptions.poll = 300
        return nextConfig
    }
}

module.exports = nextConfig
