'use client'

import { useEffect } from 'react'

/** Fires a custom event on mount. Use on squeeze pages to compare variant performance. Pixel must already be loaded (layout). */
export function FacebookPixelCustomEvent({ eventName }: { eventName: string }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', eventName)
    }
  }, [eventName])
  return null
}

/** Call from WaitlistForm / check page when email is captured. */
export function trackLead(landingPage?: string) {
  if (typeof window === 'undefined' || !(window as any).fbq) return
  ;(window as any).fbq('track', 'Lead', {
    content_name: 'email_capture',
    landing_page: landingPage ?? (typeof window !== 'undefined' ? window.location.pathname : ''),
  })
}
