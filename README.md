# Talk Edit Pro Studio - Waitlist & ACX Checker

Landing page and waitlist for Talk Edit Pro Studio, plus a free ACX Compliance Checker tool for waitlist members.

## Features

- **Waitlist signup** - Captures emails to a self-hosted PocketBase collection via server-side API routes; optionally syncs to MailerLite
- **ACX Compliance Checker** - Analyzes audio files against ACX/Audible requirements
  - Peak level analysis
  - RMS loudness measurement
  - Noise floor detection
  - Sample rate verification

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Database**: PocketBase (self-hosted)
- **Hosting**: Vercel

## Setup

### 1. Clone and install dependencies

```bash
git clone <your-repo-url>
cd talkeditpro-waitlist
npm install
```

### 2. Set up PocketBase

Create a collection named `waitlist` with:

| Field | Type | Notes |
|-------|------|--------|
| `email` | Email | Required, unique |
| `name` | Text | Optional |
| `source` | Text | Optional (attribution; e.g. pathname or `?ref=` ) |

Recommended API rules: **Create** open for public signups; **List / View / Update / Delete** restricted (this app uses a superuser account from Next.js API routes only).

### 3. Configure environment variables

Create a `.env.local` file (see `.env.example`):

```
POCKETBASE_URL=https://your-pocketbase-host.example.com
POCKETBASE_ADMIN_EMAIL=your_superuser_email
POCKETBASE_ADMIN_PASSWORD=your_superuser_password
NEXT_PUBLIC_FB_PIXEL_ID=your_facebook_pixel_id
```

`NEXT_PUBLIC_FB_PIXEL_ID` is optional; used for squeeze pages (PageView, ViewContent, Lead).

### MailerLite integration (optional)

Sync waitlist signups to MailerLite for email campaigns:

1. In [MailerLite](https://dashboard.mailerlite.com/) go to **Integrations → API** and click **Generate new token**
2. Add to `.env.local`:

```
MAILERLITE_API_TOKEN=your_api_token_here
```

3. Add group IDs (from `GET /api/mailerlite/groups`):

```
# Checker Users: squeeze → checker flow (/tool, /check verify)
MAILERLITE_CHECKER_USERS_GROUP_ID=your_checker_group_id
# Founders Waitlist Only: main page, /waitlist (never touched checker)
MAILERLITE_WAITLIST_ONLY_GROUP_ID=your_waitlist_group_id
```

`MAILERLITE_WAITLIST_GROUP_ID` is still supported as a fallback for Founders Waitlist Only.

**API routes** (for campaign configuration via AI or scripts):

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/mailerlite/subscribe` | POST | Add subscriber (used internally after signup) |
| `/api/mailerlite/groups` | GET | List groups |
| `/api/mailerlite/groups` | POST | Create group |
| `/api/mailerlite/campaigns` | GET | List campaigns |
| `/api/mailerlite/campaigns` | POST | Create draft campaign |

**Flow:** Checker Users (squeeze → checker) go to one group; Founders Waitlist Only (main page, never touched checker) go to another. Create custom fields in MailerLite (Subscribers → Fields): `name`, `variant`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `landing_page`, `source`.

### Squeeze pages (Facebook ads)

Three lightweight landing pages for ad campaigns:

| Route | Purpose |
|-------|--------|
| `/acx-checker` | ACX rejection angle → checker tool |
| `/audiobook-ready` | Spotify FOMO → checker or waitlist |
| `/stop-overpaying` | Cost shock → checker tool |
| `/tool` | Direct link to ACX checker (no gate) + signup with first name under founder photo |

UTM parameters are captured on arrival and passed to MailerLite on signup. Waitlist rows store `email`, optional `name`, and optional `source` (from `?ref=` or the page pathname). No nav, no footer links, mobile-first.

**API routes (waitlist):**

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/waitlist` | POST | Sign up (`{ email, name?, source? }`) |
| `/api/waitlist/verify` | POST | ACX checker gate: verify email or add squeeze-page visitors (`{ email, landing_page? }`) |

### 4. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`

### 5. Deploy to Vercel

1. Push your code to GitHub
2. Import the repo in Vercel
3. Add environment variables in Vercel project settings
4. Deploy

## Domain Setup

### Main domain (talkeditpro.com)

Add these DNS records:

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

### Subdomain for ACX Checker (check.talkeditpro.com)

| Type | Name | Value |
|------|------|-------|
| CNAME | check | cname.vercel-dns.com |

**Important**: Keep your existing MX records unchanged to preserve email functionality.

## Project Structure

```
src/
├── app/
│   ├── api/waitlist/
│   │   ├── route.ts          # POST waitlist signup (PocketBase)
│   │   └── verify/route.ts   # POST email verification for /check
│   ├── page.tsx              # Main landing page
│   ├── check/page.tsx        # ACX Checker page
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── WaitlistForm.tsx
│   ├── FileUpload.tsx
│   └── ...
└── lib/
    └── pocketbase.ts         # Server-only PocketBase admin client
```

## Future Enhancements

- [ ] Railway backend for more accurate audio analysis (FFmpeg)
- [ ] PDF report download
- [ ] Email verification flow
- [ ] Analytics dashboard for waitlist growth

---

Built by Jeanmarc Alexandre
