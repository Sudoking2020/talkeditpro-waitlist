'use client'

import { Suspense, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { getStoredUtmData } from '@/lib/utm'
import { trackLead } from '@/components/FacebookPixel'

interface WaitlistFormProps {
  variant?: 'A' | 'B'
  onSuccess: () => void
  /** When true, shows first name field. Defaults to true so name is collected unless you pass false. */
  showFirstName?: boolean
  /** Optional source override (e.g. 'tool'); otherwise `?ref=` or pathname is used */
  source?: string
}

function WaitlistFormFallback(props: WaitlistFormProps) {
  const showFirstName = props.showFirstName ?? true
  return (
    <div className={`w-full mx-auto ${showFirstName ? 'max-w-xl' : 'max-w-md'} animate-pulse`}>
      <div className="flex flex-col sm:flex-row gap-3">
        {showFirstName && <div className="w-full sm:w-36 h-[60px] rounded-xl bg-gray-200" />}
        <div className="flex-1 h-[60px] rounded-xl bg-gray-200" />
        <div className="min-w-[160px] h-[60px] rounded-xl bg-tep-blue-200" />
      </div>
    </div>
  )
}

function WaitlistFormInner({ variant, onSuccess, showFirstName: showFirstNameProp, source }: WaitlistFormProps) {
  const showFirstName = showFirstNameProp ?? true
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const attributionSource = source ?? searchParams.get('ref') ?? pathname ?? '/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address')
      setStatus('error')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const trimmedName = firstName.trim()
      const payload: Record<string, string> = {
        email: email.toLowerCase(),
        source: attributionSource,
      }
      if (trimmedName) payload.name = trimmedName

      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      let data: { ok?: boolean; error?: string; alreadySubscribed?: boolean } = {}
      try {
        data = await res.json()
      } catch {
        throw new Error('Invalid response')
      }

      if (!res.ok || data.ok === false) {
        setErrorMessage(data.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      const utm = getStoredUtmData()

      fetch('/api/mailerlite/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.toLowerCase(),
          name: showFirstName ? firstName.trim() || undefined : undefined,
          source: source ?? attributionSource,
          variant: variant ?? undefined,
          utm_source: utm?.utm_source,
          utm_medium: utm?.utm_medium,
          utm_campaign: utm?.utm_campaign,
          utm_content: utm?.utm_content,
          landing_page: utm?.landing_page,
        }),
      }).catch(() => {})

      if (!data.alreadySubscribed) {
        trackLead(utm?.landing_page ?? undefined)
      }

      setStatus('success')
      setTimeout(onSuccess, 1500)
    } catch (err) {
      console.error('Waitlist signup error:', err)
      setErrorMessage('Unable to save your email right now. Please try again in a moment.')
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`w-full mx-auto ${showFirstName ? 'max-w-xl' : 'max-w-md'}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        {showFirstName && (
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            disabled={status === 'loading' || status === 'success'}
            className="w-full sm:w-36 sm:min-w-[120px] px-5 py-4 rounded-xl bg-white border border-gray-300 
                     text-gray-900 placeholder:text-gray-500 text-lg
                     focus:border-tep-blue-500 focus:ring-2 focus:ring-tep-blue-100
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-300 shadow-sm"
          />
        )}
        <div className="flex-1 min-w-0">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={status === 'loading' || status === 'success'}
            className="w-full px-5 py-4 rounded-xl bg-white border border-gray-300 
                     text-gray-900 placeholder:text-gray-500 text-lg
                     focus:border-tep-blue-500 focus:ring-2 focus:ring-tep-blue-100
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-300 shadow-sm"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="px-8 py-4 rounded-xl font-semibold text-lg
                   bg-tep-blue-500 hover:bg-tep-blue-600 
                   disabled:opacity-70 disabled:cursor-not-allowed
                   text-white shadow-md shadow-tep-blue-500/20
                   hover:shadow-lg hover:shadow-tep-blue-500/30
                   transform hover:-translate-y-0.5
                   transition-all duration-300
                   flex items-center justify-center gap-2 min-w-[160px] shrink-0"
        >
          {status === 'loading' && (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Joining...</span>
            </>
          )}
          {status === 'success' && (
            <>
              <Check className="w-5 h-5" />
              <span>You're in!</span>
            </>
          )}
          {(status === 'idle' || status === 'error') && (
            <>
              <span>Join Waitlist</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>

      {status === 'error' && errorMessage && (
        <p className="mt-3 text-red-600 text-xl text-center">{errorMessage}</p>
      )}

      {status === 'success' && (
        <p className="mt-3 text-green-600 text-xl text-center">
          🎉 Welcome aboard! Check below for a free tool while you wait.
        </p>
      )}
    </form>
  )
}

export default function WaitlistForm(props: WaitlistFormProps) {
  return (
    <Suspense fallback={<WaitlistFormFallback {...props} />}>
      <WaitlistFormInner {...props} />
    </Suspense>
  )
}
