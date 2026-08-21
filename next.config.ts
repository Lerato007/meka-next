import type { NextConfig } from "next"

const isDevelopment =
  process.env.NODE_ENV === "development"

const contentSecurityPolicy = `
  default-src 'self';
  base-uri 'self';
  form-action 'self' https://www.payfast.co.za/eng/process https://sandbox.payfast.co.za/eng/process;
  frame-ancestors 'none';
  object-src 'none';

  script-src
    'self'
    'unsafe-inline'
    ${isDevelopment ? "'unsafe-eval'" : ""}
    https://accounts.google.com
    https://*.vercel-insights.com;

  style-src
    'self'
    'unsafe-inline';

  img-src
    'self'
    data:
    blob:
    https://auieyynwtskqhewkcutw.supabase.co
    https://lh3.googleusercontent.com;

  font-src
    'self'
    data:;

  connect-src
    'self'
    https://auieyynwtskqhewkcutw.supabase.co
    https://accounts.google.com
    https://*.googleapis.com
    https://*.vercel-insights.com
    https://vitals.vercel-insights.com
    ${isDevelopment ? "ws: wss:" : ""};

  frame-src
    'self'
    https://accounts.google.com;

  worker-src
    'self'
    blob:;

  manifest-src
    'self';

  media-src
    'self';

  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim()

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin-allow-popups",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
]

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "peroxide-museum-bottling.ngrok-free.dev",
  ],

  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "auieyynwtskqhewkcutw.supabase.co",
        port: "",
        pathname:
          "/storage/v1/object/public/product-images/**",
        search: "",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig