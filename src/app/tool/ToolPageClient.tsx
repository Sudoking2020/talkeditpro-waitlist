'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import AcxCheckerTool from '@/components/AcxCheckerTool'
import WaitlistForm from '@/components/WaitlistForm'
import { captureUtmFromUrl } from '@/lib/utm'

export default function ToolPageClient() {
  useEffect(() => {
    captureUtmFromUrl('/tool')
  }, [])

  return (
    <main className="min-h-screen bg-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-tep-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-tep-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 px-6 py-12 md:py-20 font-body">
        <header className="max-w-4xl mx-auto mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to home</span>
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

        <div className="max-w-4xl mx-auto space-y-16">
          {/* ACX Tool - no gate, direct access */}
          <AcxCheckerTool />

          {/* Signup section */}
          <section className="p-8 rounded-3xl bg-gradient-to-br from-tep-blue-50 to-blue-50 border border-tep-blue-100 shadow-sm">
            <div className="max-w-md mx-auto text-center">
              <h2 className="font-display text-2xl font-semibold text-gray-900 mb-2">
                Get early access to the full studio
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                Join the waitlist for Talk Edit Pro Studio — browser-based audiobook production launching Spring 2026.
              </p>
              <WaitlistForm
                showFirstName
                source="tool"
                onSuccess={() => {}}
              />
            </div>
          </section>
        </div>

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
