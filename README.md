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
ORDER_EMAIL=orders@laferlasports.co.za
```

**Note:** For development, email sending may fail if SMTP is not configured. The site will still function, but order request emails won't be sent. In production, ensure SMTP credentials are properly configured.

3. Add product images:
Place product images in `public/images/products/` directory. Images should be named according to the product slugs defined in `lib/products.ts` (e.g., `capapie-pistol-01-1.jpg`).

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

