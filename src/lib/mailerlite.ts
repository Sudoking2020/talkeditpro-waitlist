/**
 * MailerLite API client for server-side use.
 * Base URL: https://connect.mailerlite.com/api
 * Auth: Bearer token in Authorization header
 */

const BASE_URL = 'https://connect.mailerlite.com/api'

function getApiToken(): string | null {
  return process.env.MAILERLITE_API_TOKEN ?? null
}

function getHeaders(): Record<string, string> {
  const token = getApiToken()
  if (!token) {
    throw new Error('MAILERLITE_API_TOKEN is not configured')
  }
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

/** Check if MailerLite is configured */
export function isMailerLiteConfigured(): boolean {
  return Boolean(getApiToken())
}

/** Create or upsert a subscriber. Returns 201 created or 200 updated. */
export async function addSubscriber(params: {
  email: string
  fields?: Record<string, string | null>
  groups?: string[]
  status?: 'active' | 'unsubscribed' | 'unconfirmed' | 'bounced' | 'junk'
}) {
  const body: Record<string, unknown> = {
    email: params.email.toLowerCase(),
  }
  if (params.fields && Object.keys(params.fields).length > 0) {
    body.fields = params.fields
  }
  if (params.groups && params.groups.length > 0) {
    body.groups = params.groups
  }
  if (params.status) {
    body.status = params.status
  }

  const res = await fetch(`${BASE_URL}/subscribers`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message ?? `MailerLite API error: ${res.status}`)
  }

  return res.json()
}

/** List all groups */
export async function listGroups(params?: { limit?: number; page?: number }) {
  const searchParams = new URLSearchParams()
  if (params?.limit) searchParams.set('limit', String(params.limit))
  if (params?.page) searchParams.set('page', String(params.page))

  const url = `${BASE_URL}/groups${searchParams.toString() ? `?${searchParams}` : ''}`
  const res = await fetch(url, {
    headers: getHeaders(),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message ?? `MailerLite API error: ${res.status}`)
  }

  return res.json()
}

/** List campaigns */
export async function listCampaigns(params?: {
  status?: 'sent' | 'draft' | 'ready'
  type?: 'regular' | 'ab' | 'resend' | 'rss'
  limit?: number
  page?: number
}) {
  const searchParams = new URLSearchParams()
  if (params?.status) searchParams.set('filter[status]', params.status)
  if (params?.type) searchParams.set('filter[type]', params.type)
  if (params?.limit) searchParams.set('limit', String(params.limit))
  if (params?.page) searchParams.set('page', String(params.page))

  const url = `${BASE_URL}/campaigns${searchParams.toString() ? `?${searchParams}` : ''}`
  const res = await fetch(url, {
    headers: getHeaders(),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message ?? `MailerLite API error: ${res.status}`)
  }

  return res.json()
}

/** Create a regular campaign (draft) */
export async function createCampaign(params: {
  name: string
  groups?: string[]
  segments?: string[]
  emails: Array<{
    subject: string
    from: string
    from_name: string
    reply_to?: string
    content?: string
  }>
}) {
  const body = {
    name: params.name,
    type: 'regular' as const,
    groups: params.groups ?? [],
    segments: params.segments ?? [],
    emails: params.emails,
  }

  const res = await fetch(`${BASE_URL}/campaigns`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message ?? `MailerLite API error: ${res.status}`)
  }

  return res.json()
}

/** Create a group */
export async function createGroup(name: string) {
  const res = await fetch(`${BASE_URL}/groups`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ name }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message ?? `MailerLite API error: ${res.status}`)
  }

  return res.json()
}
