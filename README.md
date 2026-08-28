# Laferla Sports - Official Capapie Dealer

Professional e-commerce website for Laferla Sports, South Africa's authorized Capapie dealer specializing in ISSF shooting sports equipment.

## Features

- Product catalog with ISSF discipline-based categories
- Product detail pages with technical specifications
- Enquiry cart system (no payment processing)
- Order request form with automated email notifications
- Mobile-first responsive design
- SEO-optimized structure

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (state management)
- React Hook Form + Zod (form validation)
- Nodemailer (email notifications)

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
Create a `.env.local` file (copy from `.env.example`):
```
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
ORDER_EMAIL=info@laferlasports.com
CONTACT_EMAIL=info@laferlasports.com
```

**Note:** For development, email sending may fail if SMTP is not configured. The site will still function, but order request emails won't be sent. In production, ensure SMTP credentials are properly configured.

**Canonical domain:** the production domain is `https://www.laferlasports.com`, hard-coded as the default `SITE_URL` in `lib/seo.ts`. It drives every canonical tag, OpenGraph/Twitter URL, JSON-LD `url`, `sitemap.xml` and `robots.txt` host, so there is nothing else to change if the domain moves.

`NEXT_PUBLIC_SITE_URL` overrides it and is intended only for preview/staging deploys. **Leave it unset in production** — a stale value silently rewrites every canonical URL on the site and is invisible in the source.

3. Populate / refresh products (scrapes capapiesports.com, downloads images, regenerates data):
```bash
pnpm scrape-products
```
See `lib/README-CAPAPIE-PRODUCTS.md` for details. Products are quote-based (no prices).

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
/app              - Next.js app router pages
/components       - React components
/lib              - Utilities and configurations
/types            - TypeScript type definitions
/public           - Static assets
```

## Order Flow

1. Users browse products and add to enquiry cart
2. Users submit order request form (no payment)
3. Email notification sent to site owner
4. Business issues manual invoice via email

