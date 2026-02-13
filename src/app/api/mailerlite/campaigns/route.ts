import { NextRequest, NextResponse } from 'next/server'
import {
  listCampaigns,
  createCampaign,
  isMailerLiteConfigured,
} from '@/lib/mailerlite'

/**
 * GET /api/mailerlite/campaigns
 * List campaigns. Query params: status (sent|draft|ready), type, limit, page
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
    const status = searchParams.get('status') as
      | 'sent'
      | 'draft'
      | 'ready'
      | null
    const type = searchParams.get('type') as
      | 'regular'
      | 'ab'
      | 'resend'
      | 'rss'
      | null
    const limit = searchParams.get('limit')
    const page = searchParams.get('page')

    const data = await listCampaigns({
      status: status ?? undefined,
      type: type ?? undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
      page: page ? parseInt(page, 10) : undefined,
    })

    return NextResponse.json(data)
  } catch (err) {
    console.error('MailerLite campaigns error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to list campaigns' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/mailerlite/campaigns
 * Create a draft campaign.
 * Body: {
 *   name: string,
 *   groups?: string[],
 *   segments?: string[],
 *   emails: [{ subject, from, from_name, reply_to?, content? }]
 * }
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
    const emails = Array.isArray(body?.emails) ? body.emails : null

    if (!name || !emails || emails.length === 0) {
      return NextResponse.json(
        {
          error:
            'name and emails array are required. Each email needs subject, from, from_name.',
        },
        { status: 400 }
      )
    }

    const validatedEmails = emails.map((e: Record<string, unknown>) => {
      if (
        typeof e.subject !== 'string' ||
        typeof e.from !== 'string' ||
        typeof e.from_name !== 'string'
      ) {
        throw new Error('Each email must have subject, from, from_name')
      }
      return {
        subject: e.subject,
        from: e.from,
        from_name: e.from_name,
        reply_to: typeof e.reply_to === 'string' ? e.reply_to : undefined,
        content: typeof e.content === 'string' ? e.content : undefined,
      }
    })

    const data = await createCampaign({
      name,
      groups: Array.isArray(body.groups) ? body.groups : undefined,
      segments: Array.isArray(body.segments) ? body.segments : undefined,
      emails: validatedEmails,
    })

    return NextResponse.json(data)
  } catch (err) {
    console.error('MailerLite create campaign error:', err)
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : 'Failed to create campaign',
      },
      { status: 500 }
    )
  }
}
