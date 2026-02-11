# Talk Edit Pro Studio - Waitlist & ACX Checker

Landing page and waitlist for Talk Edit Pro Studio, plus a free ACX Compliance Checker tool for waitlist members.

## Features

- **Waitlist signup** - Captures emails to Supabase
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
  source TEXT DEFAULT 'landing_page',
  variant TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- If you already have the table, add the variant column for A/B tracking:
-- ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS variant TEXT;

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

Signups store `email` and `variant` ('A' or 'B') for landing A/B tests.

### 3. Configure environment variables

Create a `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

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
