/**
 * This project's PocketBase `waitlist` collection uses PascalCase field names (`Name`, `Source`).
 * Sending lowercase `name` / `source` is ignored by PocketBase (unknown fields are dropped).
 */

export function pbWaitlistDisplayName(record: Record<string, unknown>): string {
  const v = record.Name ?? record.name
  return typeof v === 'string' ? v : String(v ?? '')
}

export function pbWaitlistDisplaySource(record: Record<string, unknown>): string {
  const v = record.Source ?? record.source
  return typeof v === 'string' ? v : String(v ?? '')
}

export function buildWaitlistPbPayload(params: {
  email: string
  name?: string
  source?: string
}): Record<string, string> {
  const out: Record<string, string> = { email: params.email }
  if (params.name !== undefined) out.Name = params.name
  if (params.source !== undefined) out.Source = params.source
  return out
}
