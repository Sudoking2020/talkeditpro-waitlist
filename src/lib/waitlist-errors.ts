import { ClientResponseError } from 'pocketbase'

/** PocketBase returns validation_not_unique on duplicate email when the field is unique. */
export function isWaitlistDuplicateError(err: unknown): boolean {
  if (!(err instanceof ClientResponseError)) return false
  if (err.status !== 400) return false

  const data = err.response?.data as { data?: { email?: { code?: string } } } | undefined
  const code = data?.data?.email?.code
  if (code === 'validation_not_unique') return true

  const msg = typeof err.message === 'string' ? err.message.toLowerCase() : ''
  return msg.includes('unique') || msg.includes('must be unique')
}
