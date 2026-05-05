/** Supports client payloads that use `name`, `firstName`, or `first_name`. */
export function parseWaitlistName(body: Record<string, unknown>): string | undefined {
  const candidates = [body.name, body.firstName, body.first_name]
  for (const c of candidates) {
    if (typeof c === 'string' && c.trim()) return c.trim()
  }
  return undefined
}
