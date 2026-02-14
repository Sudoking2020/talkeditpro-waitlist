import { NextRequest, NextResponse } from 'next/server'
import { addSubscriber, isMailerLiteConfigured } from '@/lib/mailerlite'

const CHECKER_SOURCES = ['tool', 'acx_checker_verify', 'squeeze_checker']

/**
 * POST /api/mailerlite/subscribe
 * Adds a subscriber to MailerLite (create or upsert).
 * Uses the correct group based on flow:
 * - Checker Users: source is tool, acx_checker_verify, or squeeze_checker
 * - Founders Waitlist Only: main page, /waitlist, or any other signup
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

    const source = typeof body?.source === 'string' ? body.source : ''
    const usedChecker = CHECKER_SOURCES.includes(source)

    const groups: string[] = []
    const checkerGroupId = process.env.MAILERLITE_CHECKER_USERS_GROUP_ID
    const waitlistOnlyGroupId =
      process.env.MAILERLITE_WAITLIST_ONLY_GROUP_ID ||
      process.env.MAILERLITE_WAITLIST_GROUP_ID // backwards compat

    if (usedChecker && checkerGroupId) {
      groups.push(checkerGroupId)
    } else if (!usedChecker && waitlistOnlyGroupId) {
      groups.push(waitlistOnlyGroupId)
    }
    if (Array.isArray(body.groups)) {
      for (const g of body.groups) {
        if (typeof g === 'string') groups.push(g)
      }
    }

    const fields: Record<string, string | null> = {}
    if (body.name && typeof body.name === 'string' && body.name.trim()) {
      fields.name = body.name.trim()
    }
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
    if (body.utm_content && typeof body.utm_content === 'string') {
      fields.utm_content = body.utm_content
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
