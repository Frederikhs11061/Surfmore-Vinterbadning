/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow iframe embedding for Shopify integration
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // X-Frame-Options removed - using CSP frame-ancestors instead for better control
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://*.myshopify.com https://*.shopify.com;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
