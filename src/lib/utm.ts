const STORAGE_KEY = 'tep_utm'

export interface UtmData {
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
  landing_page: string | null
  landed_at: string | null
}

const SQUEEZE_PATHS = ['/acx-checker', '/audiobook-ready', '/stop-overpaying']

/** Capture UTM params from current URL and persist to sessionStorage. Call on page load. On /waitlist or /check, merges URL params but keeps existing landing_page from squeeze. */
export function captureUtmFromUrl(pathname: string): UtmData {
  if (typeof window === 'undefined') return getEmptyUtm()
  const params = new URLSearchParams(window.location.search)
  const isSqueeze = SQUEEZE_PATHS.includes(pathname || window.location.pathname)

  if (!isSqueeze && (pathname === '/waitlist' || pathname === '/check')) {
    const existing = getStoredUtmData()
    if (existing) {
      const merged: UtmData = {
        utm_source: params.get('utm_source') ?? existing.utm_source,
        utm_medium: params.get('utm_medium') ?? existing.utm_medium,
        utm_campaign: params.get('utm_campaign') ?? existing.utm_campaign,
        utm_content: params.get('utm_content') ?? existing.utm_content,
        landing_page: existing.landing_page,
        landed_at: existing.landed_at,
      }
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
      } catch (_) {}
      return merged
    }
  }

  const data: UtmData = {
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
    utm_content: params.get('utm_content'),
    landing_page: pathname || window.location.pathname,
    landed_at: new Date().toISOString(),
  }
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (_) {}
  return data
}

/** Read stored UTM data (e.g. when submitting waitlist form). */
export function getStoredUtmData(): UtmData | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as UtmData
  } catch {
    return null
  }
}

/** Build query string from current UTM params for passing to /check or /waitlist. */
export function getUtmQueryString(): string {
  if (typeof window === 'undefined') return ''
  const params = new URLSearchParams(window.location.search)
  const q = new URLSearchParams()
  ;['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach((key) => {
    const v = params.get(key)
    if (v) q.set(key, v)
  })
  const s = q.toString()
  return s ? `?${s}` : ''
}

function getEmptyUtm(): UtmData {
  return {
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_content: null,
    landing_page: null,
    landed_at: null,
  }
}
