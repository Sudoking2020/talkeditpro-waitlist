import { NextRequest, NextResponse } from 'next/server'
import { ClientResponseError } from 'pocketbase'

import { getPocketBaseAdmin } from '@/lib/pocketbase'
import { isValidEmail } from '@/lib/email-validation'
import { parseWaitlistName } from '@/lib/parse-waitlist-name'
import {
  buildWaitlistPbPayload,
  pbWaitlistDisplayName,
} from '@/lib/waitlist-pocketbase-fields'
import { isWaitlistDuplicateError } from '@/lib/waitlist-errors'

async function findWaitlistByEmail(pb: Awaited<ReturnType<typeof getPocketBaseAdmin>>, email: string) {
  const filter = pb.filter('email = {:email}', { email })
  try {
    return await pb.collection('waitlist').getFirstListItem(filter)
  } catch (err) {
    if (err instanceof ClientResponseError && err.status === 404) {
      return null
    }
    throw err
  }
}

export async function POST(req: NextRequest) {
  try {
    let parsed: Record<string, unknown>
    try {
      parsed = (await req.json()) as Record<string, unknown>
    } catch {
      return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 })
    }

    const emailRaw = typeof parsed.email === 'string' ? parsed.email.trim().toLowerCase() : ''
    const name = parseWaitlistName(parsed)
    const source =
      typeof parsed.source === 'string' && parsed.source.trim() ? parsed.source.trim() : undefined

    if (!emailRaw || !isValidEmail(emailRaw)) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const pb = await getPocketBaseAdmin()

    const existing = await findWaitlistByEmail(pb, emailRaw)
    const existingPlain = existing ? (existing as unknown as Record<string, unknown>) : null

    if (existing && existingPlain) {
      if (name !== undefined && name !== pbWaitlistDisplayName(existingPlain)) {
        await pb.collection('waitlist').update(existing.id, { Name: name })
      }
      return NextResponse.json({
        ok: true,
        alreadySubscribed: true,
        message: "You're already on the list — welcome back!",
      })
    }

    const payload = buildWaitlistPbPayload({
      email: emailRaw,
      ...(name !== undefined ? { name } : {}),
      ...(source !== undefined ? { source } : {}),
    })

    try {
      await pb.collection('waitlist').create(payload)
      return NextResponse.json({ ok: true })
    } catch (err) {
      if (isWaitlistDuplicateError(err)) {
        const again = await findWaitlistByEmail(pb, emailRaw)
        const againPlain = again ? (again as unknown as Record<string, unknown>) : null
        if (again && againPlain && name !== undefined && name !== pbWaitlistDisplayName(againPlain)) {
          await pb.collection('waitlist').update(again.id, { Name: name })
        }
        return NextResponse.json({
          ok: true,
          alreadySubscribed: true,
          message: "You're already on the list — welcome back!",
        })
      }
      throw err
    }
  } catch (err) {
    console.error('POST /api/waitlist:', err)
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500 })
  }
}
