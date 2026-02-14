'use client'

import { useState, useEffect } from 'react'
import WaitlistForm from '@/components/WaitlistForm'
import { captureUtmFromUrl } from '@/lib/utm'

export default function WaitlistSqueezeClient() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    captureUtmFromUrl('/waitlist')
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <main className="min-h-screen flex flex-col bg-white">
        <div className="flex-1 flex items-center justify-center px-5 py-12" />
        <footer className="py-5 px-5 bg-[#f8f8f8] border-t border-[#eee]">
          <p className="text-center text-[#999] text-sm">🎧 Launching Spring 2026 · Browser-based · No credit card needed</p>
        </footer>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <section className="flex-1 px-5 py-12 sm:py-16 max-w-md mx-auto w-full">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Join the waitlist</h1>
        <p className="text-gray-600 text-center mb-8">Early access to Talk Edit Pro Studio. No credit card.</p>
        <WaitlistForm onSuccess={() => {}} />
      </section>
      <footer className="mt-auto py-5 px-5 bg-[#f8f8f8] border-t border-[#eee]">
        <p className="text-center text-[#999] text-sm">
          🎧 Launching Spring 2026 · Browser-based · No credit card needed
        </p>
      </footer>
    </main>
  )
}
