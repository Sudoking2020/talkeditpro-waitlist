import { NextRequest, NextResponse } from 'next/server'
import { listGroups, createGroup, isMailerLiteConfigured } from '@/lib/mailerlite'

/**
 * GET /api/mailerlite/groups
 * List all groups. Use this to find group IDs for MAILERLITE_WAITLIST_GROUP_ID
 * or when configuring campaigns.
 */
export async function GET(req: NextRequest) {
  try {
    if (!isMailerLiteConfigured()) {
      return NextResponse.json(
        { error: 'MailerLite not configured. Set MAILERLITE_API_TOKEN.' },
        { status: 503 }
      )
    }

    const { searchParams } = new URL(req.url)
    const limit = searchParams.get('limit')
    const page = searchParams.get('page')

    const data = await listGroups({
      limit: limit ? parseInt(limit, 10) : undefined,
      page: page ? parseInt(page, 10) : undefined,
    })

    return NextResponse.json(data)
  } catch (err) {
    console.error('MailerLite groups error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to list groups' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/mailerlite/groups
 * Create a new group. Body: { name: string }
 */
export async function POST(req: NextRequest) {
  try {
    if (!isMailerLiteConfigured()) {
      return NextResponse.json(
        { error: 'MailerLite not configured. Set MAILERLITE_API_TOKEN.' },
        { status: 503 }
      )
    }

    const body = await req.json()
    const name = typeof body?.name === 'string' ? body.name.trim() : null
    if (!name) {
      return NextResponse.json(
        { error: 'Group name is required' },
        { status: 400 }
      )
    }

    const data = await createGroup(name)
    return NextResponse.json(data)
  } catch (err) {
    console.error('MailerLite create group error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to create group' },
      { status: 500 }
    )
  }
}
