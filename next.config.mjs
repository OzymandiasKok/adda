/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/register',
        destination: '/api/register/route.ts',
      },
    ]
  },
  trailingSlash: true,
}

export default nextConfig
