# Talk Edit Pro Studio - Waitlist & ACX Checker

Landing page and waitlist for Talk Edit Pro Studio, plus a free ACX Compliance Checker tool for waitlist members.

## Features

- **Waitlist signup** - Captures emails to Supabase and optionally syncs to MailerLite
- **ACX Compliance Checker** - Analyzes audio files against ACX/Audible requirements
  - Peak level analysis
  - RMS loudness measurement
  - Noise floor detection
  - Sample rate verification

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Database**: Supabase
- **Hosting**: Vercel

## Setup

### 1. Clone and install dependencies

```bash
git clone <your-repo-url>
cd talkeditpro-waitlist
npm install
```

### 2. Set up Supabase

Create a `waitlist` table in your Supabase project:

```sql
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  source TEXT DEFAULT 'landing_page',
  variant TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  landing_page TEXT,
  landed_at TIMESTAMPTZ,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- If you already have the table, add new columns:
-- ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS first_name TEXT;
-- ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS variant TEXT;
-- ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS utm_source TEXT;
-- ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS utm_medium TEXT;
-- ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS utm_campaign TEXT;
-- ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS utm_content TEXT;
-- ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS landing_page TEXT;
-- ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS landed_at TIMESTAMPTZ;

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anonymous users (for signups)
CREATE POLICY "Allow anonymous inserts" ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow reading own email (for verification)
CREATE POLICY "Allow reading by email" ON waitlist
  FOR SELECT
  TO anon
  USING (true);
```

Signups store `email`, `variant` ('A' or 'B'), and optional UTM/landing fields (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `landing_page`, `landed_at`) for squeeze pages and ad attribution.

### 3. Configure environment variables

Create a `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
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

UTM parameters are captured on arrival and attached to email signups. No nav, no footer links, mobile-first.

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
│   ├── page.tsx          # Main landing page
│   ├── check/
│   │   └── page.tsx      # ACX Checker page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── WaitlistForm.tsx  # Email signup form
│   ├── FileUpload.tsx    # Audio file uploader
│   ├── ResultsDisplay.tsx # ACX analysis results
│   ├── FeatureCard.tsx   # Feature cards
│   └── AcxCheckerPromo.tsx # Promo after signup
└── lib/
    └── supabase.ts       # Supabase client
```

## Future Enhancements

- [ ] Railway backend for more accurate audio analysis (FFmpeg)
- [ ] PDF report download
- [ ] Email verification flow
- [ ] Analytics dashboard for waitlist growth

---

Built by Jeanmarc Alexandre
