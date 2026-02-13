import { NextRequest, NextResponse } from 'next/server'
import { addSubscriber, isMailerLiteConfigured } from '@/lib/mailerlite'

/**
 * POST /api/mailerlite/subscribe
 * Adds a subscriber to MailerLite (create or upsert).
 * Call this after a successful waitlist signup to sync to your email list.
 */
export async function POST(req: NextRequest) {
  try {
    if (!isMailerLiteConfigured()) {
      return NextResponse.json(
        { ok: true, skipped: true, reason: 'MailerLite not configured' },
        { status: 200 }
      )
    }

    const body = await req.json()
    const email = typeof body?.email === 'string' ? body.email.trim() : null
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { ok: false, error: 'Valid email is required' },
        { status: 400 }
      )
    }

    const groups: string[] = []
    const waitlistGroupId = process.env.MAILERLITE_WAITLIST_GROUP_ID
    if (waitlistGroupId) {
      groups.push(waitlistGroupId)
    }
    if (Array.isArray(body.groups)) {
      for (const g of body.groups) {
        if (typeof g === 'string') groups.push(g)
      }
    }

    const fields: Record<string, string | null> = {}
    if (body.variant && typeof body.variant === 'string') {
      fields.variant = body.variant
    }
    if (body.utm_source && typeof body.utm_source === 'string') {
      fields.utm_source = body.utm_source
    }
    if (body.utm_medium && typeof body.utm_medium === 'string') {
      fields.utm_medium = body.utm_medium
    }
    if (body.utm_campaign && typeof body.utm_campaign === 'string') {
      fields.utm_campaign = body.utm_campaign
    }
    if (body.landing_page && typeof body.landing_page === 'string') {
      fields.landing_page = body.landing_page
    }
    if (body.source && typeof body.source === 'string') {
      fields.source = body.source
    }

    await addSubscriber({
      email: email.toLowerCase(),
      fields: Object.keys(fields).length > 0 ? fields : undefined,
      groups: groups.length > 0 ? groups : undefined,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('MailerLite subscribe error:', err)
    return NextResponse.json(
      { ok: false, error: 'Failed to add subscriber' },
      { status: 500 }
    )
  }
}
