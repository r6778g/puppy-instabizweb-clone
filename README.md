This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Contact enquiry email

The contact form saves enquiries in Supabase and sends an email notification to
`mohitpaladiya150@gmail.com` through Resend. To enable email delivery:

1. Create a Resend API key and verify the sender domain or email address in Resend.
2. Add these server-only variables to `.env.local` and to your deployment environment:

   ```env
   RESEND_API_KEY=re_your_resend_api_key
   ENQUIRY_FROM_EMAIL=TeddyPups <enquiries@your-verified-domain.com>
   ENQUIRY_TO_EMAIL=mohitpaladiya150@gmail.com
   ```

`ENQUIRY_TO_EMAIL` is optional; it defaults to `mohitpaladiya150@gmail.com`.
Never expose the Resend API key with a `NEXT_PUBLIC_` prefix.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
