'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Mic, Type, Wand2, CheckCircle, Download } from 'lucide-react'
import WaitlistForm from '@/components/WaitlistForm'
import ThankYou from '@/components/ThankYou'

export default function ContentB({ variant }: { variant: 'A' | 'B' }) {
  const [hasSignedUp, setHasSignedUp] = useState(false)

  const handleWaitlistSuccess = () => {
    setHasSignedUp(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-tep-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-tep-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 px-6 py-12 md:py-20">
        {/* Header / Logo */}
        <header className="max-w-4xl mx-auto text-center mb-12 md:mb-16 opacity-0 animate-fade-in">
          <div className="inline-flex items-center justify-center mb-6">
            <Image
              src="/logo.png"
              alt="Talk Edit Pro Studio"
              width={80}
              height={80}
              className="rounded-2xl"
            />
          </div>
          {!hasSignedUp && (
            <p className="text-tep-blue-400 font-medium tracking-wide uppercase text-sm">
              Early Access
            </p>
          )}
        </header>

        {/* Conditional Content */}
        {hasSignedUp ? (
          <ThankYou />
        ) : (
          <>
            {/* Hero Section */}
            <section className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6 
                           leading-tight opacity-0 animate-fade-in-up">
                Narrate Your Audiobook Professionally
                <span className="text-tep-blue-500"> — Without a Studio</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed
                          opacity-0 animate-fade-in-up delay-100">
                Turn your manuscript into an ACX-ready audiobook using a guided browser studio
                built specifically for authors. No audio engineering. No expensive editors.
                Just a step-by-step path to a finished book.
              </p>

              {/* Waitlist Form */}
              <div className="opacity-0 animate-fade-in-up delay-200">
                <WaitlistForm variant={variant} onSuccess={handleWaitlistSuccess} />
              </div>

              <p className="mt-4 text-gray-400 text-sm opacity-0 animate-fade-in delay-300">
                Founding members get lifetime launch pricing
              </p>
            </section>

            {/* Trust Strip */}
            <section className="max-w-4xl mx-auto mb-20 text-center opacity-0 animate-fade-in-up delay-300">
              <div className="inline-flex flex-wrap items-center justify-center gap-x-8 gap-y-4 px-8 py-4 rounded-full bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-tep-blue-500" />
                  <p className="text-gray-600 font-medium text-sm md:text-base">ACX-Compliant Files</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-tep-blue-500" />
                  <p className="text-gray-600 font-medium text-sm md:text-base">No Monthly Subscription</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-tep-blue-500" />
                  <p className="text-gray-600 font-medium text-sm md:text-base">Expert Guidance Built In</p>
                </div>
              </div>
            </section>

            {/* Problem Section */}
            <section className="max-w-3xl mx-auto mb-20 text-center">
              <div className="p-8 md:p-12 rounded-3xl bg-gray-50 border border-gray-100
                            opacity-0 animate-fade-in-up delay-400">
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-gray-900 mb-6 max-w-2xl mx-auto">
                  Recording an audiobook shouldn't feel like <span className="text-tep-blue-500">learning audio engineering</span>.
                </h2>

                <p className="text-gray-600 mb-6">Most authors hit the same wall:</p>

                <ul className="space-y-3 mb-8 inline-block text-left">
                  <li className="flex items-start gap-3 text-gray-700">
                    <span className="text-red-500 mt-1">✕</span>
                    <span>Expensive studios charge thousands</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <span className="text-red-500 mt-1">✕</span>
                    <span>DIY software is confusing and technical</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <span className="text-red-500 mt-1">✕</span>
                    <span>ACX rejects files over tiny mistakes</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <span className="text-red-500 mt-1">✕</span>
                    <span>Weeks of editing steal time from writing</span>
                  </li>
                </ul>

                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  Many authors give up before their audiobook ever launches.
                </p>
                <p className="text-gray-500 leading-relaxed">
                  It's not because they lack talent.<br />
                  It's because the workflow is broken.
                </p>
              </div>
            </section>

            {/* Solution Section */}
            <section className="max-w-5xl mx-auto mb-20">
              <div className="text-center mb-12 opacity-0 animate-fade-in-up delay-300">
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                  A studio that guides you from manuscript to finished audiobook
                </h2>
                <p className="text-gray-600">
                  TalkEdit Pro Studio walks you through production step-by-step:
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Feature 1 */}
                <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm
                              opacity-0 animate-fade-in-up delay-400">
                  <div className="w-12 h-12 rounded-xl bg-tep-blue-50 flex items-center justify-center mb-4">
                    <Mic className="w-6 h-6 text-tep-blue-500" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">
                    Guided Recording
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Read chapter-by-chapter with voice-activated scrolling that follows your manuscript.
                    No stopping to click. No losing your place.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm
                              opacity-0 animate-fade-in-up delay-500">
                  <div className="w-12 h-12 rounded-xl bg-tep-blue-50 flex items-center justify-center mb-4">
                    <Type className="w-6 h-6 text-tep-blue-500" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">
                    Text-Based Editing
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Fix mistakes by editing text instead of waveforms.
                    Hear changes instantly.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm
                              opacity-0 animate-fade-in-up delay-600">
                  <div className="w-12 h-12 rounded-xl bg-tep-blue-50 flex items-center justify-center mb-4">
                    <Wand2 className="w-6 h-6 text-tep-blue-500" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">
                    Smart Auto Fix
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Automatically repair small errors using your own cloned voice —
                    preserving your performance while saving hours of retakes.
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm
                              opacity-0 animate-fade-in-up delay-700">
                  <div className="w-12 h-12 rounded-xl bg-tep-blue-50 flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-tep-blue-500" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">
                    ACX Compliance Built In
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    One click checks and fixes your chapter to meet Audible standards.
                  </p>
                </div>

                {/* Feature 5 */}
                <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm
                              opacity-0 animate-fade-in-up delay-800">
                  <div className="w-12 h-12 rounded-xl bg-tep-blue-50 flex items-center justify-center mb-4">
                    <Download className="w-6 h-6 text-tep-blue-500" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">
                    Instant Export
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Download distribution-ready files or publish directly.
                  </p>
                </div>

                {/* Feature 6 */}
                <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm
                              opacity-0 animate-fade-in-up delay-900">
                  <div className="w-12 h-12 rounded-xl bg-tep-blue-50 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-tep-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 18.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z" /><path d="m19 19-3.5-3.5" /></svg>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">
                    Vetted Professionals
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Need help? Hire a vetted audio engineer or editor directly through the platform for advanced polish.
                  </p>
                </div>
              </div>
            </section>

            {/* Outcome Section */}
            <section className="max-w-3xl mx-auto mb-20 text-center">
              <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-b from-tep-blue-50 to-white 
                            border border-tep-blue-100 opacity-0 animate-fade-in-up delay-400 shadow-sm">
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
                  From manuscript to published audiobook — in days, not months
                </h2>

                <p className="text-gray-600 mb-6">Instead of fighting software, you:</p>

                <ul className="space-y-3 mb-8 inline-block text-left">
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="text-tep-blue-500">✓</span>
                    <span>Record confidently</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="text-tep-blue-500">✓</span>
                    <span>Fix mistakes quickly</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="text-tep-blue-500">✓</span>
                    <span>Pass compliance on the first try</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="text-tep-blue-500">✓</span>
                    <span>Publish faster</span>
                  </li>
                </ul>

                <p className="text-gray-900 text-lg font-medium">
                  Your voice. Your story. Professionally produced.
                </p>
              </div>
            </section>

            {/* Pricing Preview */}
            <section className="max-w-2xl mx-auto mb-20 text-center opacity-0 animate-fade-in-up delay-400">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                Simple project-based pricing
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Audiobook production should be predictable.<br />
                Pricing is based on book length — no subscriptions, no hidden fees.
              </p>
              <p className="text-gray-500 text-sm">
                Early access members receive exclusive founding rates.<br />
                Join the waitlist to lock in launch pricing.
              </p>
            </section>

            {/* Final CTA */}
            <section className="max-w-2xl mx-auto mb-20 text-center">
              <div className="p-8 md:p-12 rounded-3xl bg-gray-50 border border-gray-100
                            opacity-0 animate-fade-in-up delay-500">
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                  Your audiobook is already written.
                </h2>
                <p className="text-gray-600 text-lg mb-8">
                  Now it's time to let readers hear it.
                </p>

                <WaitlistForm variant={variant} onSuccess={handleWaitlistSuccess} />
              </div>
            </section>
          </>
        )}

        {/* Footer */}
        <footer className="max-w-4xl mx-auto text-center pt-12 border-t border-gray-200">
          <p className="text-gray-600 text-sm mb-2">
            Built by a producer with 1,000+ hours of audio production experience.
          </p>
          <p className="text-gray-400 text-sm mb-4">
            © {new Date().getFullYear()} Talk Edit Pro Studio. All rights reserved.
          </p>
          <a
            href="https://www.linkedin.com/in/jm-alexandre"
            target="_blank"
            rel="noopener noreferrer"
            className="text-tep-blue-500 hover:text-tep-blue-600 transition-colors text-sm font-medium hover:underline"
          >
            Connect on LinkedIn
          </a>
        </footer>
      </div>
    </main>
  )
}
