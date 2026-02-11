'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Mic, Wand2, Upload, Headphones } from 'lucide-react'
import WaitlistForm from '@/components/WaitlistForm'
import FeatureCard from '@/components/FeatureCard'
import ThankYou from '@/components/ThankYou'
import AcxCheckerPromo from '@/components/AcxCheckerPromo'

export default function ContentA({ variant }: { variant: 'A' | 'B' }) {
  const [hasSignedUp, setHasSignedUp] = useState(false)

  const handleWaitlistSuccess = () => {
    setHasSignedUp(true)
    // Scroll to top to show the thank you message
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-tep-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-tep-blue-600/5 rounded-full blur-3xl" />
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
              className="rounded-2xl shadow-lg"
            />
          </div>
          {!hasSignedUp && (
            <p className="text-tep-blue-500 font-medium tracking-wide uppercase text-xl">
              Coming Soon
            </p>
          )}
        </header>

        {/* Conditional Content */}
        {hasSignedUp ? (
          /* Thank You Screen */
          <ThankYou />
        ) : (
          /* Landing Page Content */
          <>
            {/* Hero Section */}
            <section className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6 
                           leading-tight opacity-0 animate-fade-in-up">
                Record, Edit, And Publish Your Audiobook
                <span className="text-tep-blue-500"> — All In Your Browser.</span>
              </h1>

              <p className="text-2xl md:text-3xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed
                          opacity-0 animate-fade-in-up delay-100">
                No expensive software. No hiring editors. No confusing workflows.
                Just you, your manuscript, and a finished audiobook ready for Audible.
              </p>

              {/* Waitlist Form */}
              <div className="opacity-0 animate-fade-in-up delay-200">
                <WaitlistForm variant={variant} onSuccess={handleWaitlistSuccess} />
              </div>

              <p className="mt-4 text-gray-500 text-xl opacity-0 animate-fade-in delay-300">
                Join the waitlist for early access and founding member pricing.
              </p>
            </section>

            {/* Features Section */}
            <section className="max-w-5xl mx-auto mb-20">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-12
                           opacity-0 animate-fade-in-up delay-300">
                Everything you need to publish your audiobook
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <FeatureCard
                  icon={Mic}
                  title="Record in Browser"
                  description="Guided chapter-by-chapter recording. No DAW required."
                  delay="400ms"
                />
                <FeatureCard
                  icon={Wand2}
                  title="Auto Processing"
                  description="Built-in editing, noise removal, and mastering."
                  delay="500ms"
                />
                <FeatureCard
                  icon={Headphones}
                  title="ACX Ready"
                  description="Audio that meets ACX and distributor specs automatically."
                  delay="600ms"
                />
                <FeatureCard
                  icon={Upload}
                  title="One-Click Export"
                  description="Export files ready for Audible, Findaway, or any platform."
                  delay="700ms"
                />
              </div>
            </section>

            {/* ACX Checker promo - free tool for visitors */}
            <section className="max-w-2xl mx-auto mb-20">
              <AcxCheckerPromo />
            </section>

            {/* Problem Section */}
            <section className="max-w-3xl mx-auto mb-20 text-center">
              <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-tep-blue-50 to-blue-50 border border-tep-blue-100
                            opacity-0 animate-fade-in-up delay-400">
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
                  Audiobook production shouldn't be this hard.
                </h2>
                <p className="text-gray-700 text-2xl leading-relaxed mb-6">
                  Most authors either pay thousands for professional production or spend weeks
                  wrestling with software they never signed up to learn. The ones who try DIY
                  get buried in technical specs, audio plugins, and ACX rejections.
                </p>
                <p className="text-gray-700 text-2xl leading-relaxed">
                  Talk Edit Pro Studio walks you through the entire process — chapter by chapter —
                  so you can focus on what matters: telling your story.
                </p>
              </div>
            </section>
          </>
        )}

        {/* Footer */}
        <footer className="max-w-4xl mx-auto text-center pt-12 border-t border-gray-200">
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
