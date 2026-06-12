import nextEnv from '@next/env'
const { loadEnvConfig } = nextEnv

const { combinedEnv } = loadEnvConfig(process.cwd())

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: combinedEnv.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SERVER_BACKEND_URL: combinedEnv.NEXT_PUBLIC_SERVER_BACKEND_URL
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