import { NextRequest, NextResponse } from 'next/server'
import { ClientResponseError } from 'pocketbase'

import { getPocketBaseAdmin } from '@/lib/pocketbase'
import { isValidEmail } from '@/lib/email-validation'
import { buildWaitlistPbPayload } from '@/lib/waitlist-pocketbase-fields'
import { isWaitlistDuplicateError } from '@/lib/waitlist-errors'

const SQUEEZE_LANDING_PAGES: readonly string[] = ['/acx-checker', '/audiobook-ready', '/stop-overpaying']

export async function POST(req: NextRequest) {
  try {
    let body: unknown
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 })
    }

    const b = body as Record<string, unknown>
    const emailRaw = typeof b.email === 'string' ? b.email.trim().toLowerCase() : ''
    const landing_page =
      typeof b.landing_page === 'string' && b.landing_page.trim() ? b.landing_page.trim() : undefined

    if (!emailRaw || !isValidEmail(emailRaw)) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const pb = await getPocketBaseAdmin()
    const filter = pb.filter('email = {:email}', { email: emailRaw })

    let onWaitlist = false
    try {
      await pb.collection('waitlist').getFirstListItem(filter)
      onWaitlist = true
    } catch (err) {
      if (err instanceof ClientResponseError && err.status === 404) {
        onWaitlist = false
      } else {
        throw err
      }
    }

    if (onWaitlist) {
      return NextResponse.json({ ok: true, outcome: 'on_waitlist' })
    }

    const fromSqueeze =
      landing_page !== undefined && SQUEEZE_LANDING_PAGES.includes(landing_page)

    if (fromSqueeze) {
      try {
        await pb.collection('waitlist').create(
          buildWaitlistPbPayload({
            email: emailRaw,
            source: 'squeeze_checker',
          })
        )
        return NextResponse.json({ ok: true, outcome: 'squeeze_added' })
      } catch (err) {
        if (isWaitlistDuplicateError(err)) {
          return NextResponse.json({ ok: true, outcome: 'on_waitlist' })
        }
        throw err
      }
    }

    return NextResponse.json(
      {
        ok: false,
        error: 'Email not found on waitlist. Please join the waitlist first.',
      },
      { status: 400 }
    )
  } catch (err) {
    console.error('POST /api/waitlist/verify:', err)
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500 })
  }
}
