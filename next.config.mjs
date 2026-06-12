/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: 'https://demoshop.site/api',
    NEXT_PUBLIC_SERVER_BACKEND_URL: 'https://demoshop.site'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com'
      }
    ]
  }
}

export default nextConfig
