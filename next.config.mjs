import fs from 'fs'
import path from 'path'

const envPath = path.resolve(process.cwd(), '.env.production')
console.log('ENV PATH:', envPath)
console.log('FILE EXISTS:', fs.existsSync(envPath))

const envFile = fs.readFileSync(envPath, 'utf-8')
console.log('ENV FILE CONTENT:', envFile)

const env = Object.fromEntries(
  envFile.split('\n')
    .filter(line => line.trim() && !line.startsWith('#'))
    .map(line => line.split('='))
)

console.log('PARSED ENV:', env)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SERVER_BACKEND_URL: env.NEXT_PUBLIC_SERVER_BACKEND_URL
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