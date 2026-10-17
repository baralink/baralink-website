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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Analytics (BaraLink analytics plan, AN-5)

Google Tag Manager with Consent Mode v2, in **strict basic mode**: Tag Manager itself is loaded only after the visitor
clicks **Accept** in the banner (`components/analytics/Analytics.tsx`). Before a choice, and after **Refuse**, nothing
is requested from Google. "Cookies" in the footer and the button on `/privacy#analytics` reopen the choice.

| Variable (Vercel) | Where | What |
|---|---|---|
| `NEXT_PUBLIC_GTM_ID` | **Production only** | The web container's id, `GTM-XXXXXXX`. Empty (local, previews): no banner, nothing loaded |
| `NEXT_PUBLIC_PLAY_STORE_URL` | Production | `https://play.google.com/store/apps/details?id=org.baralink.app`, once the app is listed |
| `NEXT_PUBLIC_APP_STORE_URL` | Production | The App Store page, once listed |

Events (`lib/analytics.ts`, sent only after Accept): `download_click {store, placement}`, `contact_click {method}`,
`social_click {network}`, and `contact_submit {topic}` when the contact form is sent (the topic only). A link opts in with `data-analytics="…"` and `data-store` / `data-placement` / `data-method` /
`data-network`; page views come from the GA4 tag. A visitor arriving from a campaign link (`?blc=CODE&utm_…`) sees
"Your invitation code: CODE", and the Google Play button keeps the values in `referrer` for the app.

In Tag Manager: one Google tag (the GA4 measurement id) on All Pages with **Additional consent checks →
analytics_storage**; one GA4 Event tag per event above, on a Custom Event trigger of the same name, with its parameters
from Data Layer Variables. Test with Tag Assistant: no request to Google before Accept.

## Languages and search engines

One address per language: French at `/` (most visitors read it), English at `/en` (`proxy.ts`, pages in
`app/[lang]/`). `/` sends a visitor to `/en` when they chose English with the switch (cookie `baralink-locale`) or when
their browser's first language is English; the query (a campaign code) is kept. Each page has its own title,
description, `hreflang` links (also in `sitemap.xml`), a share image (`app/[lang]/opengraph-image.tsx`) and, on the home
page, schema.org data (organisation, Conakry, Guinea, phone numbers). Paths inside the site: `useI18n().href('/privacy')`.

## Contact form

`components/sections/ContactForm.tsx` sends to the backend, `POST /api/v1/marketing/contact/` (staff read it in the
Admin → Contact messages; the superusers get an email naming the topic). Topics: `lib/contact.ts`, which also holds the
phone numbers and the email shown (`support@baralink.org`, a placeholder until the mailbox exists).

| Variable (Vercel) | What |
|---|---|
| `NEXT_PUBLIC_API_URL` | The backend. Default `https://api.baralink.org`; the backend's `CORS_ALLOWED_ORIGINS` must list this site |

`/privacy` is a **draft** (analytics plan AN-11): BaraLink approves it, with a lawyer's review, before it is merged.
