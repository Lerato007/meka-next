# MekaWC

MekaWC is a full-stack e-commerce platform built for online clothing and lifestyle shopping in South Africa.

## Features

- Customer registration and authentication
- Google OAuth authentication
- Product catalogue and search
- Category filtering and sorting
- Shopping cart
- Wishlist
- Customer reviews
- Address management
- Secure authenticated checkout
- PayFast payment integration
- Order tracking
- Email notifications
- Customer account dashboard
- Administrative dashboard
- Product and category management
- Order management
- Responsive mobile navigation
- SEO metadata and structured product data

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma ORM
- Auth.js
- Supabase Storage
- PayFast
- Resend
- Vercel

## Project Structure

```text
meka-next/
├── app/                 # Next.js App Router
│   ├── account/
│   ├── admin/
│   ├── api/
│   ├── cart/
│   ├── checkout/
│   ├── payment/
│   └── products/
├── components/          # Reusable UI components
├── lib/                 # Services and application utilities
├── prisma/              # Database schema and migrations
├── public/              # Static assets
├── types/               # TypeScript definitions
├── auth.ts              # Authentication configuration
├── next.config.ts       # Next.js configuration
└── prisma.config.ts     # Prisma configuration