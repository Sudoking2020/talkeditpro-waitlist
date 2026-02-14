'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'
import AcxCheckerTool from '@/components/AcxCheckerTool'
import { getSupabase } from '@/lib/supabase'
import { captureUtmFromUrl, getStoredUtmData } from '@/lib/utm'
import { trackLead } from '@/components/FacebookPixel'

export default function AcxCheckerPage() {
  const [email, setEmail] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verifyError, setVerifyError] = useState('')

  useEffect(() => {
    captureUtmFromUrl('/check')
  }, [])

  // Check localStorage for previously verified email
  useEffect(() => {
    const savedEmail = localStorage.getItem('tep_verified_email')
    if (savedEmail) {
      setEmail(savedEmail)
      setIsVerified(true)
    }
  }, [])

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)
    setVerifyError('')

    try {
      const supabase = getSupabase()
      if (!supabase) {
        setVerifyError('Checker is temporarily unavailable. Please try again later.')
        setIsVerifying(false)
        return
      }

      const { data: existing, error: selectError } = await supabase
        .from('waitlist')
        .select('email')
        .eq('email', email.toLowerCase())
        .single()

      if (existing) {
        const utmData = getStoredUtmData()
        fetch('/api/mailerlite/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email.toLowerCase(),
            source: 'acx_checker_verify',
            utm_source: utmData?.utm_source,
            utm_medium: utmData?.utm_medium,
            utm_campaign: utmData?.utm_campaign,
            utm_content: utmData?.utm_content,
            landing_page: utmData?.landing_page,
          }),
        }).catch(() => {})
        localStorage.setItem('tep_verified_email', email.toLowerCase())
        setIsVerified(true)
        trackLead(utmData?.landing_page ?? undefined)
        return
      }

      // Not on waitlist: if they came from a squeeze page (have UTM/landing), add them and let them in
      const utm = getStoredUtmData()
      const fromSqueeze = utm?.landing_page && ['/acx-checker', '/audiobook-ready', '/stop-overpaying'].includes(utm.landing_page)

      if (fromSqueeze && utm) {
        const row: Record<string, unknown> = {
          email: email.toLowerCase(),
          variant: null,
          source: 'squeeze_checker',
        }
        if (utm.utm_source) row.utm_source = utm.utm_source
        if (utm.utm_medium) row.utm_medium = utm.utm_medium
        if (utm.utm_campaign) row.utm_campaign = utm.utm_campaign
        if (utm.utm_content) row.utm_content = utm.utm_content
        if (utm.landing_page) row.landing_page = utm.landing_page
        if (utm.landed_at) row.landed_at = utm.landed_at

        const { error: insertError } = await supabase.from('waitlist').insert([row])
        if (insertError) throw insertError

        fetch('/api/mailerlite/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email.toLowerCase(),
            source: 'squeeze_checker',
            utm_source: utm.utm_source,
            utm_medium: utm.utm_medium,
            utm_campaign: utm.utm_campaign,
            utm_content: utm.utm_content,
            landing_page: utm.landing_page,
          }),
        }).catch(() => {})

        localStorage.setItem('tep_verified_email', email.toLowerCase())
        setIsVerified(true)
        trackLead(utm.landing_page ?? undefined)
        return
      }

      setVerifyError('Email not found on waitlist. Please join the waitlist first.')
    } catch (err) {
      setVerifyError('Something went wrong. Please try again.')
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-tep-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-tep-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 px-6 py-12 md:py-20 font-body">
        {/* Header */}
        <header className="max-w-4xl mx-auto mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to waitlist</span>
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <Image
              src="/logo.png"
              alt="Talk Edit Pro Studio"
              width={80}
              height={80}
              className="rounded-2xl shadow-lg"
            />
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-semibold text-gray-900">
                ACX Compliance Checker
              </h1>
              <p className="text-gray-600 text-xl">
                Check if your audiobook files meet ACX/Audible requirements
              </p>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto">
          {/* Email Verification Gate */}
          {!isVerified ? (
            <div className="p-8 rounded-3xl bg-gradient-to-br from-tep-blue-50 to-blue-50 border border-tep-blue-100 shadow-sm">
              <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">
                Verify your email to continue
              </h2>
              <p className="text-gray-700 text-xl mb-6">
                This tool is available to waitlist members. Enter the email you used to join the waitlist.
              </p>

              <form onSubmit={handleVerifyEmail} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-4 rounded-xl bg-white border border-gray-300 
                           text-gray-900 placeholder:text-gray-500 text-lg
                           focus:border-tep-blue-500 focus:ring-2 focus:ring-tep-blue-100
                           transition-all duration-300 shadow-sm"
                />
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="px-8 py-4 rounded-xl font-semibold text-lg
                           bg-tep-blue-500 hover:bg-tep-blue-600 
                           disabled:opacity-70 disabled:cursor-not-allowed
                           text-white shadow-md shadow-tep-blue-500/20
                           transition-all duration-300
                           flex items-center justify-center gap-2"
                >
                  {isVerifying ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Verify'
                  )}
                </button>
              </form>

              {verifyError && (
                <p className="mt-4 text-red-600 text-xl">{verifyError}</p>
              )}

              <p className="mt-6 text-gray-600 text-lg">
                Not on the waitlist yet?{' '}
                <Link href="/" className="text-tep-blue-500 hover:text-tep-blue-600 transition-colors font-medium hover:underline">
                  Join here
                </Link>
              </p>
            </div>
          ) : (
            <AcxCheckerTool
              pitchCopy={
                (() => {
                  const landing = getStoredUtmData()?.landing_page
                  const isStopOverpaying = landing === '/stop-overpaying'
                  return isStopOverpaying ? (
                    <p className="text-gray-800 text-lg">
                      Join the early access waitlist. First 500 members get{' '}
                      <strong>founding member pricing</strong> when we launch.{' '}
                      <Link href="/waitlist" className="text-tep-blue-500 hover:text-tep-blue-600 transition-colors font-semibold hover:underline">
                        Join the waitlist →
                      </Link>
                    </p>
                  ) : (
                    <p className="text-gray-800 text-lg">
                      You&apos;re on the list. We&apos;ll email you when we launch. In the meantime, check your files below.
                    </p>
                  )
                })()
              }
            />
          )}
        </div>

        {/* Footer */}
        <footer className="max-w-4xl mx-auto text-center mt-20 pt-12 border-t border-gray-200">
          <p className="text-gray-600 text-sm mb-2">
            Built by a producer with 1,000+ hours of audio production experience.{' '}
            <a
              href="https://www.linkedin.com/in/jm-alexandre"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tep-blue-500 hover:text-tep-blue-600 transition-colors font-medium hover:underline"
            >
              Connect on LinkedIn
            </a>
          </p>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Talk Edit Pro Studio. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  )
}

