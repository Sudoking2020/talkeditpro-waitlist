import { NextResponse } from 'next/server'

/**
 * GET /api/mailerlite/debug
 * Helps troubleshoot auth: confirms token is loaded and attempts one API call.
 * Remove or protect this route before production.
 */
export async function GET() {
  const token = process.env.MAILERLITE_API_TOKEN
  const hasToken = Boolean(token?.trim())
  const tokenLength = token?.length ?? 0
  const tokenPreview = hasToken
    ? `${token!.slice(0, 6)}...${token!.slice(-4)}`
    : null

  if (!hasToken) {
    return NextResponse.json({
      configured: false,
      error: 'MAILERLITE_API_TOKEN is not set or empty in .env.local',
      hint: 'Add MAILERLITE_API_TOKEN and restart the dev server.',
    })
  }

  // Try a minimal API call
  try {
    const res = await fetch('https://connect.mailerlite.com/api/groups?limit=1', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token!.trim()}`,
      },
    })

    const body = await res.json().catch(() => ({}))
    const ok = res.ok

    return NextResponse.json({
      configured: true,
      tokenLength,
      tokenPreview,
      apiTest: {
        status: res.status,
        ok,
        message: body?.message ?? (ok ? 'OK' : 'See message'),
      },
      hints: !ok
        ? [
            'Token may be invalid—generate a new one in MailerLite → Integrations → API.',
            'If you set IP restrictions when creating the token, ensure your IP is allowed (or use "Any IP").',
            'Remove any quotes or extra spaces around the token in .env.local.',
            'Restart the dev server after changing .env.local.',
          ]
        : [],
    })
  } catch (err) {
    return NextResponse.json({
      configured: true,
      tokenLength,
      tokenPreview,
      apiTest: { error: err instanceof Error ? err.message : 'Request failed' },
    })
  }
}
