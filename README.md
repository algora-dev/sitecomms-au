# SiteComms Australia

Australian research, education, planning and enquiry resource for IP paging, PA, bell, intercom and integrated communication systems.

## Core routes

- `/pricing-tool` — indicative installed pricing in AUD
- `/pricing` — crawlable pricing guidance
- `/compare` — platform comparison
- `/schools` — Australian school communications planning
- `/tools/funding-check` — holding page pending dedicated Australian funding rebuild
- `/tools/finance-check` — preliminary finance/leasing fit check
- `/industries/aged-care-retirement-villages` — aged-care and retirement-village communications guidance

## Local development

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run lint
npm run test:pricing
npm run test:finance
npm run test:aged-care
npm run build
```

Set `NEXT_PUBLIC_SITE_URL=https://sitecomms.com.au` for production builds.
